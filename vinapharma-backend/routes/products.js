const express = require('express');
const router  = express.Router();
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/auth');
const { createUpload, fileUrl } = require('../utils/cloudinaryUpload');

const upload = createUpload('products', 20);

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { brand, category, featured, search, page = 1, limit = 20 } = req.query;
    const filter = { active: true };
    if (brand)    filter.brand    = brand;
    if (category) filter.category = category;
    if (featured) filter.featured = true;
    if (search)   filter.name     = { $regex: search, $options: 'i' };
    const skip  = (page - 1) * limit;
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
    res.json({ success: true, total, page: Number(page), totalPages: Math.ceil(total / limit), data: products });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
    res.json({ success: true, data: product });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// POST /api/products
router.post('/', protect, adminOnly, upload.array('images', 10), async (req, res) => {
  try {
    const body = { ...req.body };
    if (req.files && req.files.length > 0) {
      body.images = req.files.map(f => f.path);
      body.image  = body.images[0];
    }
    const product = new Product(body);
    await product.save();
    res.status(201).json({ success: true, message: 'Thêm sản phẩm thành công', data: product });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// PUT /api/products/:id
router.put('/:id', protect, adminOnly, upload.array('images', 10), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
    const body = { ...req.body };
    if (req.files && req.files.length > 0) {
      body.images = req.files.map(f => f.path);
      body.image  = body.images[0];
    }
    // Nếu giữ ảnh cũ (không upload mới)
    if (body.keepImages) {
      try { body.images = JSON.parse(body.keepImages); } catch(e) {}
      if (body.images.length > 0) body.image = body.images[0];
      delete body.keepImages;
    }
    Object.assign(product, body);
    await product.save();
    res.json({ success: true, message: 'Cập nhật thành công', data: product });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// DELETE /api/products/:id
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { active: false });
    res.json({ success: true, message: 'Đã xóa sản phẩm' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
