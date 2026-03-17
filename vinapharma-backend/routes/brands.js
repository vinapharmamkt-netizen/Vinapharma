const express  = require('express');
const router   = express.Router();
const multer   = require('multer');
const path     = require('path');
const fs       = require('fs');
const Brand    = require('../models/Brand');
const { protect, adminOnly } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, 'brand-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/jpeg|jpg|png|webp|svg/.test(path.extname(file.originalname).toLowerCase())) cb(null, true);
    else cb(new Error('Chỉ cho phép ảnh JPG, PNG, WEBP, SVG'));
  }
});

// GET /api/brands — public
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find().sort({ code: 1 });
    res.json({ success: true, data: brands });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/brands — admin
router.post('/', protect, adminOnly, upload.single('logo'), async (req, res) => {
  try {
    const { code, name, description, active } = req.body;
    if (!code || !name) return res.status(400).json({ success: false, message: 'Thiếu code hoặc tên' });
    const body = { code: code.toUpperCase(), name, description };
    if (active !== undefined) body.active = active === 'true' || active === true;
    if (req.file) body.logo = '/uploads/' + req.file.filename;
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
    const { code, name, description, active } = req.body;
    const update = { name, description };
    if (code) update.code = code.toUpperCase();
    if (active !== undefined) update.active = active === 'true' || active === true;
    if (req.file) update.logo = '/uploads/' + req.file.filename;
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
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (brand?.logo) {
      const fp = path.join(__dirname, '..', brand.logo);
      if (fs.existsSync(fp)) fs.unlinkSync(fp);
    }
    res.json({ success: true, message: 'Đã xóa thương hiệu' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
