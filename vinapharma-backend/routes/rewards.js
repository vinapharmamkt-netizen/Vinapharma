const express = require('express');
const router  = express.Router();
const Reward  = require('../models/Reward');
const { protect, adminOnly } = require('../middleware/auth');
const { createUpload } = require('../utils/cloudinaryUpload');

const upload = createUpload('rewards', 5);

// POST upload ảnh (admin)
router.post('/upload-image', protect, adminOnly, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'Không có file' });
  res.json({ success: true, url: req.file.path });
});

// GET all rewards (public)
router.get('/', async (req, res) => {
  try {
    const rewards = await Reward.find({ active: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: rewards });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// GET all rewards (admin)
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
    const image = req.file ? req.file.path : (req.body.image || '');
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
    if (req.file) updates.image = req.file.path;
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
