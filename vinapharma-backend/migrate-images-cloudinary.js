/**
 * Script migrate ảnh từ local uploads lên Cloudinary
 * Chạy: node migrate-images-cloudinary.js
 */
const mongoose = require('mongoose');
const dns = require('dns');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Product = require('./models/Product');

async function uploadToCloudinary(localPath, folder) {
  const result = await cloudinary.uploader.upload(localPath, {
    folder: `vinapharma/${folder}`,
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  });
  return result.secure_url;
}

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
  console.log('✅ Kết nối MongoDB');

  const products = await Product.find({});
  console.log(`📦 Tổng sản phẩm: ${products.length}`);

  let updated = 0, skipped = 0, errors = 0;

  for (const p of products) {
    const needsMigration =
      (p.image && p.image.startsWith('/uploads/')) ||
      (p.images && p.images.some(u => u.startsWith('/uploads/')));

    if (!needsMigration) { skipped++; continue; }

    try {
      const newImages = [];

      const allPaths = p.images && p.images.length > 0 ? p.images : (p.image ? [p.image] : []);
      for (const imgPath of allPaths) {
        if (!imgPath.startsWith('/uploads/')) {
          newImages.push(imgPath); // giữ nguyên nếu đã là URL
          continue;
        }
        const localFile = path.join(__dirname, imgPath);
        if (!fs.existsSync(localFile)) {
          console.log(`  ⚠️  File không tồn tại: ${localFile}`);
          continue;
        }
        const url = await uploadToCloudinary(localFile, 'products');
        newImages.push(url);
        process.stdout.write('.');
      }

      if (newImages.length > 0) {
        p.images = newImages;
        p.image  = newImages[0];
        await p.save();
        updated++;
        console.log(`\n✅ [${updated}] ${p.name}`);
      } else {
        skipped++;
      }
    } catch (e) {
      errors++;
      console.log(`\n❌ Lỗi ${p.name}: ${e.message}`);
    }
  }

  console.log(`\n🎉 Hoàn thành: ${updated} cập nhật, ${skipped} bỏ qua, ${errors} lỗi`);
  await mongoose.disconnect();
}

migrate().catch(e => { console.error(e); process.exit(1); });
