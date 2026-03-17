const mongoose = require('mongoose');

const promoBannerSchema = new mongoose.Schema({
  label: { type: String, default: 'Ưu đãi tháng này' },
  title: { type: String, required: [true, 'Vui lòng nhập tiêu đề'], trim: true },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' },
  buttonText: { type: String, default: 'Mua ngay' },
  buttonLink: { type: String, default: 'san-pham.html' },
  bgColor: { type: String, default: '' },
  bgImage: { type: String, default: '' },
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('PromoBanner', promoBannerSchema);
