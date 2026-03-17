// Script tạo dữ liệu mẫu ban đầu
// Chạy: node seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Product = require('./models/Product');
const Post = require('./models/Post');
const Brand = require('./models/Brand');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công');

    // Xóa dữ liệu cũ
    await User.deleteMany();
    await Product.deleteMany();
    await Post.deleteMany();
    await Brand.deleteMany();
    console.log('🗑️  Đã xóa dữ liệu cũ');

    // Tạo tài khoản Admin
    const admin = await User.create({
      name: 'Admin Vinapharma',
      email: 'admin@vinapharma.vn',
      password: 'Admin@123456',
      role: 'admin'
    });
    console.log('👤 Tạo admin:', admin.email);

    // Tạo Brands
    const brands = await Brand.create([
      { code: 'ACTIVLAB', name: 'ACTIVLAB', active: true },
      { code: 'HBW', name: 'HBW', active: true },
      { code: 'NOIEU', name: 'NO1EU', active: true },
      { code: 'NOUSA', name: 'NO1USA', active: true },
      { code: 'ROYAL', name: 'ROYAL', active: true }
    ]);
    console.log(`✅ Tạo ${brands.length} thương hiệu`);

    console.log('\n✅ Seed data thành công!');
    console.log('─────────────────────────────');
    console.log('🔑 Tài khoản admin:');
    console.log('   Email:    admin@vinapharma.vn');
    console.log('   Password: Admin@123456');
    console.log('─────────────────────────────\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi seed data:', error.message);
    process.exit(1);
  }
};

seedData();
