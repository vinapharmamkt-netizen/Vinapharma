const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Vui lòng nhập email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email không hợp lệ']
  },
  source: {
    type: String,
    default: 'popup'
  }
}, { timestamps: true });

module.exports = mongoose.model('NewsletterSubscriber', newsletterSchema);
