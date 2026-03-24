const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  buttonText: { type: String, default: 'Khám phá ngay' },
  buttonLink: { type: String, default: '#' },
  image: { type: String, required: true }, // URL ảnh
  position: { type: String, enum: ['hero', 'promo'], default: 'hero' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  titleColor: { type: String, default: '#ffffff' },
  overlayOpacity: { type: Number, default: 0.55 }
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);
