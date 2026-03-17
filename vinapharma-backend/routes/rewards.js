const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const Reward  = require('../models/Reward');
const { protect, adminOnly } = require('../middleware/auth');

// ── Upload ảnh quà ──
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, 'reward-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// POST upload ảnh (admin)
router.post('/upload-image', protect, adminOnly, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'Không có file' });
  res.json({ success: true, url: '/uploads/' + req.file.filename });
});

// GET all rewards (public – filtered by type on frontend)
router.get('/', async (req, res) => {
  try {
    const rewards = await Reward.find({ active: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: rewards });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// GET all rewards (admin – kể cả inactive)
router.get('/admin', protect, adminOnly, async (req, res) => {
  try {
    const rewards = await Reward.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: rewards });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// POST create reward (admin)
router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { name, description, pointsRequired, type, stock, active, order } = req.body;
    const image = req.file ? '/uploads/' + req.file.filename : (req.body.image || '');
    const reward = await Reward.create({
      name, description,
      pointsRequired: Number(pointsRequired),
      type: type || 'all',
      stock: stock !== undefined ? Number(stock) : -1,
      active: active !== 'false',
      order:  Number(order) || 0,
      image
    });
    res.json({ success: true, data: reward });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// PUT update reward (admin)
router.put('/:id', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { name, description, pointsRequired, type, stock, active, order } = req.body;
    const updates = {
      name, description,
      pointsRequired: Number(pointsRequired),
      type: type || 'all',
      stock: stock !== undefined ? Number(stock) : -1,
      active: active !== 'false',
      order:  Number(order) || 0
    };
    if (req.file) updates.image = '/uploads/' + req.file.filename;
    else if (req.body.image !== undefined) updates.image = req.body.image;
    const reward = await Reward.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!reward) return res.status(404).json({ success: false, message: 'Không tìm thấy' });
    res.json({ success: true, data: reward });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// DELETE reward (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Reward.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Đã xóa phần thưởng' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
