const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const Post    = require('../models/Post');
const { protect, adminOnly } = require('../middleware/auth');

// ── Upload ──
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, 'post-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 8 * 1024 * 1024 } });

// ── helpers ──
function parseTags(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val.map(t => t.trim()).filter(Boolean);
  return val.split(',').map(t => t.trim()).filter(Boolean);
}

// POST /api/posts/upload-image — admin, upload ảnh vào nội dung bài viết
router.post('/upload-image', protect, adminOnly, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'Không có file' });
  res.json({ success: true, url: '/uploads/' + req.file.filename });
});

// GET public list
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10, featured } = req.query;
    const filter = { published: true };
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (search) filter.title = { $regex: search, $options: 'i' };
    const skip = (page - 1) * limit;
    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .populate('author', 'name')
      .sort({ order: 1, featured: -1, publishedAt: -1 })
      .skip(skip).limit(Number(limit))
      .select('-content');
    res.json({ success: true, total, page: Number(page), totalPages: Math.ceil(total / limit), data: posts });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// GET all (admin)
router.get('/admin/all', protect, adminOnly, async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name').sort({ order: 1, createdAt: -1 });
    res.json({ success: true, total: posts.length, data: posts });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// GET single
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id, { $inc: { views: 1 } }, { new: true }
    ).populate('author', 'name');
    if (!post || !post.published) return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
    res.json({ success: true, data: post });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// POST create
router.post('/', protect, adminOnly, upload.single('thumbnail'), async (req, res) => {
  try {
    const body = { ...req.body, author: req.user._id };
    if (req.file) body.thumbnail = '/uploads/' + req.file.filename;
    body.tags = parseTags(body.tags);
    body.featured = body.featured === 'true' || body.featured === true;
    body.published = body.published === 'true' || body.published === true;
    if (body.published && !body.publishedAt) body.publishedAt = new Date();
    const post = await Post.create(body);
    res.status(201).json({ success: true, message: 'Đăng bài thành công', data: post });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// PUT update
router.put('/:id', protect, adminOnly, upload.single('thumbnail'), async (req, res) => {
  try {
    const body = { ...req.body };
    if (req.file) body.thumbnail = '/uploads/' + req.file.filename;
    body.tags = parseTags(body.tags);
    body.featured = body.featured === 'true' || body.featured === true;
    body.published = body.published === 'true' || body.published === true;
    const existing = await Post.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
    if (body.published && !existing.publishedAt) body.publishedAt = new Date();
    const post = await Post.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
    res.json({ success: true, message: 'Cập nhật thành công', data: post });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// DELETE
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post?.thumbnail && post.thumbnail.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', post.thumbnail);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    res.json({ success: true, message: 'Đã xóa bài viết' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
