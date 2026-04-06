// Thêm 3 sản phẩm bổ sung vào HB Wellness
// Chạy: node seed-hbwellness-extra.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');
const Brand = require('./models/Brand');

const BRAND_CODE = 'HBWELLNESS';
const BRAND_NAME = 'HB Wellness';

const productList = [
  {
    name: 'Dong Chung Ha Cho Premium',
    category: 'Tăng đề kháng',
    ageGroup: 'Người già',
    description: 'Nước uống đông trùng hạ thảo cao cấp từ Hàn Quốc. Thành phần chính: Cao đông trùng hạ thảo japonica 70%, hỗn hợp thảo dược (quế, bạch truật, phục linh, linh chi, cam thảo...) 26%. Hỗ trợ bồi bổ sức khỏe, tăng cường sức đề kháng và giảm mệt mỏi. Dùng tốt nhất cho người mới ốm dậy và người già.',
    weight: '1800ml (30ml x 60 gói)',
    price: 0,
    badge: '',
    icon: '🍄',
    featured: false,
  },
  {
    name: 'Viên Hồng Sâm Gold Hàn Quốc',
    category: 'Tăng đề kháng',
    ageGroup: 'Người già',
    description: 'Viên hồng sâm gold kết hợp hồng sâm cô đặc, sữa ong chúa tươi, linh chi cô đặc, đông trùng hạ thảo và nhung hươu cùng các vitamin và khoáng chất (Vitamin C, B1, B2, B6, kẽm). Hỗ trợ sức khỏe nhanh chóng cho người mới ốm dậy hoặc người gầy yếu. Không dùng cho trẻ em, phụ nữ mang thai và cho con bú.',
    weight: 'Hộp 90 viên',
    price: 0,
    badge: '',
    icon: '💊',
    featured: false,
  },
  {
    name: 'Silkworm Dongchoog Hacho Gold',
    category: 'Tăng đề kháng',
    ageGroup: 'Người già',
    description: 'Nước uống đông trùng hạ thảo tằm vàng từ Hàn Quốc. Thành phần: Đông trùng hạ thảo 34.4%, nấm Sanghwang 34.4%, hồng sâm khô 17.2%, linh chi, mật ong và thảo dược tổng hợp. Hỗ trợ tăng cường sức đề kháng, giảm mệt mỏi và làm chậm quá trình lão hóa.',
    weight: '400ml (20ml x 20 ống)',
    price: 0,
    badge: '',
    icon: '🍄',
    featured: false,
  },
];

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công');

    let brand = await Brand.findOne({ code: BRAND_CODE });
    if (!brand) brand = await Brand.findOne({ name: BRAND_NAME });
    if (!brand) {
      console.error(`❌ Không tìm thấy thương hiệu ${BRAND_CODE}`);
      process.exit(1);
    }
    console.log(`✅ Thương hiệu: ${BRAND_NAME} (ID: ${brand._id})`);

    const BRAND_ID = brand._id.toString();
    let created = 0, skipped = 0;

    for (const p of productList) {
      const exists = await Product.findOne({ name: p.name, brand: BRAND_ID });
      if (exists) {
        console.log(`⏭️  Đã tồn tại: ${p.name}`);
        skipped++;
        continue;
      }
      await Product.create({ ...p, brand: BRAND_ID, brandName: BRAND_NAME, inStock: true, active: true });
      console.log(`✅ Thêm: ${p.name}`);
      created++;
    }

    console.log(`\n📦 Xong! Đã tạo ${created} sản phẩm, bỏ qua ${skipped} đã tồn tại.`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
}

main();
