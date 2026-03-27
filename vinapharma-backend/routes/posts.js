const express = require('express');
const router  = express.Router();
const Post    = require('../models/Post');
const { protect, adminOnly } = require('../middleware/auth');
const { createUpload, fileUrl } = require('../utils/cloudinaryUpload');

const upload = createUpload('posts', 8);

function parseTags(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val.map(t => t.trim()).filter(Boolean);
  return val.split(',').map(t => t.trim()).filter(Boolean);
}

// POST /api/posts/upload-image — admin, upload ảnh vào nội dung bài viết
router.post('/upload-image', protect, adminOnly, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'Không có file' });
  res.json({ success: true, url: fileUrl(req, req.file) });
});

// GET public list
router.get('/', async (req, res) => {
  try {
    const { category, topic, search, page = 1, limit = 10, featured } = req.query;
    const filter = { published: true };
    if (category) filter.category = category;
    if (topic) filter.topic = topic;
    if (featured === 'true') filter.featured = true;
    if (search) filter.$or = [
      { title:   { $regex: search, $options: 'i' } },
      { summary: { $regex: search, $options: 'i' } },
      { tags:    { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
    const skip = (page - 1) * limit;
    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .populate('author', 'name')
      .sort({ featured: -1, publishedAt: -1 })
      .skip(skip).limit(Number(limit))
      .select('-content');
    res.json({ success: true, total, page: Number(page), totalPages: Math.ceil(total / limit), data: posts });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// GET all (admin)
router.get('/admin/all', protect, adminOnly, async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name').sort({ publishedAt: -1, createdAt: -1 });
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
    if (req.file) body.thumbnail = req.file.path;
    body.tags = parseTags(body.tags);
    body.featured = body.featured === 'true' || body.featured === true;
    body.published = body.published === 'true' || body.published === true;
    if (body.order !== undefined) body.order = parseInt(body.order) >= 0 ? parseInt(body.order) : 999;
    if (body.published && !body.publishedAt) body.publishedAt = new Date();
    const post = await Post.create(body);
    res.status(201).json({ success: true, message: 'Đăng bài thành công', data: post });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// PUT update
router.put('/:id', protect, adminOnly, upload.single('thumbnail'), async (req, res) => {
  try {
    const body = { ...req.body };
    if (req.file) body.thumbnail = req.file.path;
    body.tags = parseTags(body.tags);
    body.featured = body.featured === 'true' || body.featured === true;
    body.published = body.published === 'true' || body.published === true;
    if (body.order !== undefined) body.order = parseInt(body.order) >= 0 ? parseInt(body.order) : 999;
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
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Đã xóa bài viết' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
