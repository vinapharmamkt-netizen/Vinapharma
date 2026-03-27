const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Vui lòng nhập tiêu đề bài viết'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Góc sức khỏe', 'Góc làm đẹp', 'Góc dinh dưỡng', 'Vấn đề thường gặp', 'Tin Y tế', 'Tin Tuyển dụng', 'Truyền thông', 'Dinh dưỡng', 'Sức khỏe', 'Lối sống', 'Thể hình', 'Làm đẹp', 'Tim mạch', 'Khác']
  },
  tags: {
    type: [String],
    default: []
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 999
  },
  excerpt: {
    type: String,
    required: [true, 'Vui lòng nhập tóm tắt']
  },
  content: {
    type: String,
    default: ''
  },
  thumbnail: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: '📰'
  },
  readTime: {
    type: Number,
    default: 5
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

postSchema.pre('save', function() {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim() + '-' + Date.now();
  }
  if (this.isModified('published') && this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

module.exports = mongoose.model('Post', postSchema);
