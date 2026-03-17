const express      = require('express');
const router       = express.Router();
const multer       = require('multer');
const path         = require('path');
const fs           = require('fs');
const PromoBanner  = require('../models/PromoBanner');
const { protect, adminOnly } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, 'promo-banner-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/jpeg|jpg|png|webp|gif/.test(path.extname(file.originalname).toLowerCase())) cb(null, true);
    else cb(new Error('Chỉ cho phép ảnh JPG, PNG, WEBP'));
  }
});

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
    if (req.file) body.bgImage = '/uploads/' + req.file.filename;
    if (body.active !== undefined) body.active = body.active === 'true' || body.active === true;
    const banner = await PromoBanner.create(body);
    res.status(201).json({ success: true, message: 'Đã thêm băng rôn', data: banner });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// PUT update
router.put('/:id', protect, adminOnly, upload.single('bgImage'), async (req, res) => {
  try {
    const body = { ...req.body };
    if (req.file) body.bgImage = '/uploads/' + req.file.filename;
    if (body.active !== undefined) body.active = body.active === 'true' || body.active === true;
    const banner = await PromoBanner.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
    if (!banner) return res.status(404).json({ success: false, message: 'Không tìm thấy' });
    res.json({ success: true, message: 'Đã cập nhật', data: banner });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// DELETE
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const banner = await PromoBanner.findByIdAndDelete(req.params.id);
    if (banner?.bgImage) {
      const filePath = path.join(__dirname, '..', banner.bgImage);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    res.json({ success: true, message: 'Đã xóa băng rôn' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
