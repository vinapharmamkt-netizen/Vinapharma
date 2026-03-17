const express      = require('express');
const router       = express.Router();
const PromoBanner  = require('../models/PromoBanner');
const { protect, adminOnly } = require('../middleware/auth');
const { createUpload } = require('../utils/cloudinaryUpload');

const upload = createUpload('promo-banners', 5);

// GET active banners (public)
router.get('/', async (req, res) => {
  try {
    const data = await PromoBanner.find({ active: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// GET all (admin)
router.get('/admin/all', protect, adminOnly, async (req, res) => {
  try {
    const data = await PromoBanner.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// POST create
router.post('/', protect, adminOnly, upload.single('bgImage'), async (req, res) => {
  try {
    const body = { ...req.body };
    if (req.file) body.bgImage = req.file.path;
    if (body.active !== undefined) body.active = body.active === 'true' || body.active === true;
    const banner = await PromoBanner.create(body);
    res.status(201).json({ success: true, message: 'Đã thêm băng rôn', data: banner });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// PUT update
router.put('/:id', protect, adminOnly, upload.single('bgImage'), async (req, res) => {
  try {
    const body = { ...req.body };
    if (req.file) body.bgImage = req.file.path;
    if (body.active !== undefined) body.active = body.active === 'true' || body.active === true;
    const banner = await PromoBanner.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
    if (!banner) return res.status(404).json({ success: false, message: 'Không tìm thấy' });
    res.json({ success: true, message: 'Đã cập nhật', data: banner });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// DELETE
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await PromoBanner.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Đã xóa băng rôn' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
