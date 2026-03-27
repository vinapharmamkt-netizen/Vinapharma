const express = require('express');
const router  = express.Router();
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const { protect, adminOnly } = require('../middleware/auth');

// POST /api/newsletter/subscribe — public
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Vui lòng nhập email' });

    const existing = await NewsletterSubscriber.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.json({ success: true, message: 'Email đã được đăng ký trước đó!' });
    }

    await NewsletterSubscriber.create({ email, source: req.body.source || 'popup' });
    res.status(201).json({ success: true, message: 'Đăng ký thành công!' });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
});

// GET /api/newsletter — admin only
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip  = (page - 1) * limit;
    const total = await NewsletterSubscriber.countDocuments();
    const data  = await NewsletterSubscriber.find().sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
    res.json({ success: true, total, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
