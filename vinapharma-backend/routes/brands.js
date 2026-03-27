const express  = require('express');
const router   = express.Router();
const Brand    = require('../models/Brand');
const { protect, adminOnly } = require('../middleware/auth');
const { createUpload, fileUrl } = require('../utils/cloudinaryUpload');

const upload = createUpload('brands', 2);

// GET /api/brands — public
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find().sort({ order: 1, code: 1 });
    res.json({ success: true, data: brands });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/brands — admin
router.post('/', protect, adminOnly, upload.single('logo'), async (req, res) => {
  try {
    const { code, name, description, active, logo, order } = req.body;
    if (!code || !name) return res.status(400).json({ success: false, message: 'Thiếu code hoặc tên' });
    const body = { code: code.toUpperCase(), name, description };
    if (active !== undefined) body.active = active === 'true' || active === true;
    if (order !== undefined) body.order = parseInt(order) || 0;
    if (req.file) body.logo = fileUrl(req, req.file, 'brands');
    else if (logo) body.logo = logo;
    const brand = await Brand.create(body);
    res.json({ success: true, data: brand });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ success: false, message: 'Mã thương hiệu đã tồn tại' });
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/brands/:id — admin
router.put('/:id', protect, adminOnly, upload.single('logo'), async (req, res) => {
  try {
    const { code, name, description, active, logo, order } = req.body;
    const update = { name, description };
    if (code) update.code = code.toUpperCase();
    if (active !== undefined) update.active = active === 'true' || active === true;
    if (order !== undefined) update.order = parseInt(order) || 0;
    if (req.file) update.logo = fileUrl(req, req.file, 'brands');
    else if (logo !== undefined) update.logo = logo;
    const brand = await Brand.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!brand) return res.status(404).json({ success: false, message: 'Không tìm thấy' });
    res.json({ success: true, data: brand });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/brands/:id — admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Đã xóa thương hiệu' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
