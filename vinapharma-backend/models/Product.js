const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng nhập tên sản phẩm'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  brand: {
    type: String,
    required: [true, 'Vui lòng chọn thương hiệu'],
  },
  brandName: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: [true, 'Vui lòng chọn danh mục'],
    enum: [
      'Tăng đề kháng', 'Xương khớp', 'Tim mạch', 'Làm đẹp',
      'Sinh lý', 'Trí não', 'Giấc ngủ', 'Detox',
      'Vitamin', 'Khoáng chất', 'Omega', 'Probiotics', 'Khác'
    ]
  },
  ageGroup: {
    type: String,
    enum: ['Trẻ em', 'Nam', 'Nữ', 'Người già', 'Tất cả'],
    default: 'Tất cả'
  },
  description: {
    type: String,
    required: [true, 'Vui lòng nhập mô tả sản phẩm']
  },
  uses: {
    type: String,
    default: ''
  },
  dosage: {
    type: String,
    default: ''
  },
  ingredients: {
    type: String,
    default: ''
  },
  packaging: {
    type: String,
    default: ''
  },
  weight: {
    type: String, // VD: "60 viên · 500mg"
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Vui lòng nhập giá sản phẩm'],
    min: 0
  },
  originalPrice: {
    type: Number, // Giá gốc (nếu đang giảm)
    min: 0
  },
  badge: {
    type: String,
    enum: ['Bán chạy', 'Mới', 'Hot', 'Sale', ''],
    default: ''
  },
  icon: {
    type: String, // emoji hoặc URL ảnh
    default: '💊'
  },
  image: {
    type: String // URL ảnh thật (ảnh đầu tiên, backward compat)
  },
  images: {
    type: [String], // Mảng URL nhiều ảnh
    default: []
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Tự tạo slug từ tên sản phẩm, tự xử lý trùng
productSchema.pre('save', async function() {
  if (this.isModified('name')) {
    const base = this.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    let slug = base;
    let count = 1;
    while (await mongoose.model('Product').findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${base}-${count++}`;
    }
    this.slug = slug;
  }
});

module.exports = mongoose.model('Product', productSchema);
