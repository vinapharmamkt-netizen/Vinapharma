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

const Brand = require('./models/Brand');

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
  console.log('✅ Kết nối MongoDB');

  const brands = await Brand.find({});
  console.log(`📦 Tổng thương hiệu: ${brands.length}`);

  let updated = 0;

  for (const b of brands) {
    if (!b.logo) continue;
    // Extract filename from URL like http://localhost:5000/uploads/posts/xxx.png
    const match = b.logo.match(/\/uploads\/(?:posts|brands)\/([^?]+)/);
    if (!match) { console.log(`⏭️  ${b.name}: không phải local URL`); continue; }

    const filename = match[1];
    const localFile = path.join(__dirname, 'uploads', 'posts', filename);

    if (!fs.existsSync(localFile)) {
      console.log(`⚠️  ${b.name}: file không tồn tại ${localFile}`);
      continue;
    }

    try {
      const result = await cloudinary.uploader.upload(localFile, {
        folder: 'vinapharma/brands',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      });
      b.logo = result.secure_url;
      await b.save();
      updated++;
      console.log(`✅ ${b.name}: ${result.secure_url}`);
    } catch (e) {
      console.log(`❌ ${b.name}: ${e.message}`);
    }
  }

  console.log(`\n🎉 Xong: ${updated} thương hiệu cập nhật`);
  await mongoose.disconnect();
}

migrate().catch(e => { console.error(e); process.exit(1); });
