const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Vui lòng nhập tiêu đề'],
    trim: true
  },
  content: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    required: true,
    enum: ['khach-le', 'khach-si'],
    default: 'khach-le'
  },
  published: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Promotion', promotionSchema);
