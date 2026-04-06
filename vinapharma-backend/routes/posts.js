const express    = require('express');
const router     = express.Router();
const Post       = require('../models/Post');
const User       = require('../models/User');
const cloudinary = require('cloudinary').v2;
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
    const { category, topic, tag, search, page = 1, limit = 10, featured, sort } = req.query;
    const filter = { published: true, publishedAt: { $lte: new Date() } };
    if (category) filter.category = category;
    if (topic) filter.topic = topic;
    if (tag) filter.tags = tag;
    if (featured === 'true') filter.featured = true;
    if (search) filter.$or = [
      { title:   { $regex: search, $options: 'i' } },
      { summary: { $regex: search, $options: 'i' } },
      { tags:    { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
    const skip = (page - 1) * limit;
    const total = await Post.countDocuments(filter);
    const sortObj = sort === '-publishedAt'
      ? { publishedAt: -1, _id: -1 }
      : { featured: -1, publishedAt: -1, _id: -1 };
    const posts = await Post.find(filter)
      .populate('author', 'name')
      .sort(sortObj)
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

// ── SEED: upload ảnh lên Cloudinary + lưu bài vào MongoDB ──
async function uploadToCloudinary(url, folder = 'vinapharma/posts') {
  const result = await cloudinary.uploader.upload(url, {
    folder,
    transformation: [{ quality: 'auto', fetch_format: 'auto' }]
  });
  return result.secure_url;
}

async function replaceContentImages(html, folder) {
  const regex = /src="(https:\/\/images\.unsplash\.com\/[^"]+)"/g;
  const matches = [...new Set([...html.matchAll(regex)].map(m => m[1]))];
  let updated = html;
  for (const url of matches) {
    try {
      const cdnUrl = await uploadToCloudinary(url, folder);
      updated = updated.replaceAll(url, cdnUrl);
    } catch (e) { /* giữ nguyên nếu upload lỗi */ }
  }
  return updated;
}

// POST fix ảnh Unsplash → Cloudinary cho tất cả bài viết
router.post('/admin-fix-images', protect, adminOnly, async (req, res) => {
  try {
    const posts = await Post.find({
      $or: [
        { thumbnail: /unsplash\.com/ },
        { content:   /unsplash\.com/ }
      ]
    });
    if (!posts.length) return res.json({ success: true, message: 'Không có bài nào cần sửa', fixed: 0 });

    const results = [];
    for (const post of posts) {
      const update = {};
      if (post.thumbnail && /unsplash\.com/.test(post.thumbnail)) {
        try { update.thumbnail = await uploadToCloudinary(post.thumbnail, 'vinapharma/posts'); } catch (e) {}
      }
      if (post.content && /unsplash\.com/.test(post.content)) {
        try { update.content = await replaceContentImages(post.content, 'vinapharma/posts'); } catch (e) {}
      }
      if (Object.keys(update).length) {
        await Post.findByIdAndUpdate(post._id, update);
        results.push({ title: post.title, status: 'fixed' });
      }
    }
    res.json({ success: true, fixed: results.length, results });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// PATCH fix publishedAt cho các bài đã seed
router.patch('/admin-fix-dates', protect, adminOnly, async (req, res) => {
  try {
    const { updates } = req.body; // [{ title, publishedAt }]
    if (!Array.isArray(updates)) return res.status(400).json({ success: false, message: 'updates phải là array' });
    const results = [];
    for (const u of updates) {
      const r = await Post.findOneAndUpdate({ title: u.title }, { publishedAt: new Date(u.publishedAt) }, { new: true });
      results.push({ title: u.title, status: r ? 'updated' : 'not_found' });
    }
    res.json({ success: true, results });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.post('/admin-seed', protect, adminOnly, async (req, res) => {
  try {
    const { seedKey } = req.body;
    const seedFiles = {
      'goc-suc-khoe-2':    '../seed-goc-suc-khoe-2',
      'goc-suc-khoe-3':    '../seed-goc-suc-khoe-3',
      'goc-lam-dep':       '../seed-goc-lam-dep',
      'goc-dinh-duong':    '../seed-goc-dinh-duong',
      'tin-y-te':          '../seed-tin-y-te',
      'van-de-thuong-gap': '../seed-van-de-thuong-gap',
    };
    if (!seedFiles[seedKey]) return res.status(400).json({ success: false, message: 'seedKey không hợp lệ' });
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) return res.status(500).json({ success: false, message: 'Không tìm thấy admin' });

    const SEED_POSTS = require(seedFiles[seedKey]).SEED_DATA;
    const results = [];

    for (const p of SEED_POSTS) {
      const exists = await Post.findOne({ title: p.title });
      if (exists) { results.push({ title: p.title, status: 'skip' }); continue; }

      // Upload thumbnail
      let thumbnail = p.thumbnail;
      try { thumbnail = await uploadToCloudinary(p.thumbnail, 'vinapharma/posts'); } catch (e) {}

      // Upload ảnh trong content
      let content = p.content;
      try { content = await replaceContentImages(p.content, 'vinapharma/posts'); } catch (e) {}

      await Post.create({ ...p, thumbnail, content, author: admin._id });
      results.push({ title: p.title, status: 'added' });
    }

    res.json({ success: true, results });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
