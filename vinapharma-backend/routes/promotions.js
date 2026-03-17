const express   = require('express');
const router    = express.Router();
const Promotion = require('../models/Promotion');
const { protect, adminOnly } = require('../middleware/auth');
const { createUpload } = require('../utils/cloudinaryUpload');

const upload = createUpload('promotions', 5);

// GET public (published)
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const filter = { published: true };
    if (type) filter.type = type;
    const data = await Promotion.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, total: data.length, data });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// GET all (admin)
router.get('/admin/all', protect, adminOnly, async (req, res) => {
  try {
    const data = await Promotion.find().sort({ type: 1, order: 1, createdAt: -1 });
    res.json({ success: true, total: data.length, data });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// POST create
router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const body = { ...req.body };
    if (req.file) body.image = req.file.path;
    if (body.published !== undefined) body.published = body.published === 'true' || body.published === true;
    const promo = await Promotion.create(body);
    res.status(201).json({ success: true, message: 'Đã thêm khuyến mãi', data: promo });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// PUT update
router.put('/:id', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const body = { ...req.body };
    if (req.file) body.image = req.file.path;
    if (body.published !== undefined) body.published = body.published === 'true' || body.published === true;
    const promo = await Promotion.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
    if (!promo) return res.status(404).json({ success: false, message: 'Không tìm thấy' });
    res.json({ success: true, message: 'Đã cập nhật', data: promo });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// DELETE
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Promotion.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Đã xóa khuyến mãi' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
