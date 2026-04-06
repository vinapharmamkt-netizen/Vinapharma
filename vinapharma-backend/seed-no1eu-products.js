// Thêm sản phẩm No1EU từ catalogue
// Chạy: node seed-no1eu-products.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');

const BRAND_ID = '69b3a064e4ea0cc6bcbf931e'; // No1EU brand ID

const products = [
  // ── Dòng hỗ trợ điều trị ──────────────────────────────
  {
    name: 'Beauty Biocell Elixir',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Làm đẹp',
    ageGroup: 'Nữ',
    description: 'Nuôi dưỡng và phục hồi làn da. Chứa Hydrolysed Collagen type I 5000mg và Snow Lotus Stem Cell giúp chống lão hóa, cung cấp độ ẩm, làm da trở nên rạng rỡ và đàn hồi hơn.',
    weight: '14 lọ x 25ml',
    price: 890000,
    badge: 'Mới',
    icon: '✨',
    inStock: true,
    featured: false,
    active: true
  },
  {
    name: 'Track Support',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Khác',
    ageGroup: 'Nữ',
    description: 'Hỗ trợ điều trị viêm đường tiết niệu. Giúp ức chế sự hình thành màng sinh học và sự bám dính của vi khuẩn nhờ PAC (Proanthocyanidin) từ nam việt quất và D-Mannose.',
    weight: '5 lọ x 10ml',
    price: 590000,
    badge: '',
    icon: '💧',
    inStock: true,
    featured: false,
    active: true
  },
  {
    name: 'Helpaid',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Detox',
    ageGroup: 'Tất cả',
    description: 'Đào thải độc tố gan/thận, phòng ngừa béo phì. Tăng cường quá trình trao đổi chất, giúp cơ thể chuyển đổi chất béo thành năng lượng và hỗ trợ duy trì cân nặng ổn định.',
    weight: '20 lọ x 10ml',
    price: 690000,
    badge: '',
    icon: '🌿',
    inStock: true,
    featured: false,
    active: true
  },
  {
    name: 'Veins Aid',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Tim mạch',
    ageGroup: 'Tất cả',
    description: 'Hỗ trợ điều trị giãn tĩnh mạch. Điều hòa trương lực mạch máu, ngăn ngừa biến đổi nội mạch máu và bảo vệ nội mô nhờ khả năng chống oxy hóa.',
    weight: '20 lọ x 10ml',
    price: 790000,
    badge: '',
    icon: '❤️',
    inStock: true,
    featured: false,
    active: true
  },
  {
    name: 'Ginseng Royal 2000',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Khác',
    ageGroup: 'Nam',
    description: 'Cải thiện sức khỏe sinh lý nam giới. Hỗ trợ tăng cường hoạt động thể chất và tinh thần bằng cách phục hồi, nuôi dưỡng và cân bằng năng lượng. Chiết xuất nhân sâm chuẩn hóa 20% Ginsenosides.',
    weight: '20 lọ x 10ml',
    price: 890000,
    badge: 'Hot',
    icon: '💪',
    inStock: true,
    featured: true,
    active: true
  },
  {
    name: 'Gluco Aid',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Khác',
    ageGroup: 'Người già',
    description: 'Hỗ trợ điều trị đường huyết. Quế có tác dụng tái tạo Insulin, giúp điều hòa hấp thu Glucose và cân bằng thành phần Lipid. Crom giúp tăng độ nhạy cảm với hoạt động của Insulin.',
    weight: '1 hộp / 30 viên',
    price: 590000,
    badge: '',
    icon: '🩸',
    inStock: true,
    featured: false,
    active: true
  },
  {
    name: 'Focus+Memo',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Trí não',
    ageGroup: 'Tất cả',
    description: 'Tăng khả năng tập trung, cải thiện trí nhớ, giúp ổn định hoạt động não bộ và tăng khả năng tiếp nhận và xử lý thông tin. Chứa Sữa ong chúa, Nhân sâm Hàn Quốc, Soybean lecithin.',
    weight: '1 hộp / 30 viên',
    price: 590000,
    badge: '',
    icon: '🧠',
    inStock: true,
    featured: false,
    active: true
  },
  {
    name: 'Krill Ocean',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Omega',
    ageGroup: 'Người già',
    description: 'Bảo vệ sức khỏe tim mạch, trí não và thị lực với hàm lượng cao DHA và EPA. Viên uống bổ sung Omega-3 cao cấp từ dầu nhuyễn thể Nam Cực, giàu DHA, EPA và Phosphatidylcholine.',
    weight: '1 hộp / 60 viên nang',
    price: 890000,
    badge: 'Mới',
    icon: '🐟',
    inStock: true,
    featured: true,
    active: true
  },

  // ── Dòng Vitaline ─────────────────────────────────────
  {
    name: 'Vitaline A',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Vitamin',
    ageGroup: 'Tất cả',
    description: 'Vitamin A 5000 IU. Tăng tốc đổi mới tế bào, tăng cường miễn dịch, duy trì hoạt động của các mô bề mặt, phát triển thị lực và ngăn ngừa nhiễm trùng. Dành cho người trên 15 tuổi.',
    weight: '1 lọ x 120 viên',
    price: 390000,
    badge: '',
    icon: '🅰️',
    inStock: true,
    featured: false,
    active: true
  },
  {
    name: 'Vitaline C',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Vitamin',
    ageGroup: 'Tất cả',
    description: 'Vitamin C 1000mg. Chống oxy hóa, gốc tự do. Giúp giảm stress và hỗ trợ làm sáng da, tăng sức đề kháng, ngăn ngừa cảm cúm và giúp tăng sinh collagen.',
    weight: '1 lọ x 60 viên',
    price: 390000,
    badge: '',
    icon: '🍋',
    inStock: true,
    featured: false,
    active: true
  },
  {
    name: 'Vitaline D3',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Vitamin',
    ageGroup: 'Tất cả',
    description: 'Natural Vitamin D3 4000 IU. Tăng khả năng hấp thu Canxi để xương và răng chắc khỏe, ngăn ngừa chuột rút, mệt mỏi cơ thể và tăng cường khả năng miễn dịch. Dành cho người trên 4 tuổi.',
    weight: '1 lọ x 120 viên',
    price: 390000,
    badge: '',
    icon: '☀️',
    inStock: true,
    featured: false,
    active: true
  },
  {
    name: 'Vitaline Mg',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Khoáng chất',
    ageGroup: 'Tất cả',
    description: 'Multisource Magnesium 375mg. Hỗ trợ tăng chất lượng giấc ngủ, giúp xương chắc khỏe, ổn định đường huyết, giảm nguy cơ đột quỵ và giảm căng cơ, chuột rút. Dành cho người trên 18 tuổi.',
    weight: '1 lọ x 60 viên',
    price: 390000,
    badge: '',
    icon: '💎',
    inStock: true,
    featured: false,
    active: true
  },
  {
    name: 'Vitaline Se',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Khoáng chất',
    ageGroup: 'Tất cả',
    description: 'Selenium 200μg. Hỗ trợ điều hòa hormon tuyến giáp (nội tiết), chống oxy hoá, chống gốc tự do, cải thiện sức khỏe sinh sản và giúp tóc và móng phát triển khỏe mạnh. Dành cho người trên 12 tuổi.',
    weight: '1 lọ x 60 viên',
    price: 350000,
    badge: '',
    icon: '⚡',
    inStock: true,
    featured: false,
    active: true
  },
  {
    name: 'Vitaline Zn',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Khoáng chất',
    ageGroup: 'Tất cả',
    description: 'Zinc 25mg. Giúp vết thương mau lành, điều trị mụn, cải thiện sức khỏe sinh lý, tăng khả năng tập trung, giúp cơ bắp và xương khớp phát triển khỏe mạnh. Dành cho người trên 18 tuổi.',
    weight: '1 lọ x 60 viên',
    price: 350000,
    badge: '',
    icon: '🔩',
    inStock: true,
    featured: false,
    active: true
  },

  // ── Dòng trẻ em ───────────────────────────────────────
  {
    name: 'Kids Royal Jelly',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Tăng đề kháng',
    ageGroup: 'Trẻ em',
    description: 'Siro tăng cường hệ miễn dịch, săn chắc xương dành cho trẻ em từ 5 tuổi. Cung cấp năng lượng hoạt động hàng ngày nhờ sữa ong chúa giàu dinh dưỡng. Hương vị trái cây rừng.',
    weight: '125ml/hộp',
    price: 490000,
    badge: '',
    icon: '🐝',
    inStock: true,
    featured: false,
    active: true
  },
  {
    name: 'Smart Kids',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Trí não',
    ageGroup: 'Trẻ em',
    description: 'Tăng cường EPA + DHA cho trí não và mắt dành cho trẻ em từ 4 tuổi. Bổ sung Omega 3 giúp hỗ trợ tăng trưởng và phát triển ở trẻ em. Hương chanh.',
    weight: '125ml/hộp',
    price: 490000,
    badge: '',
    icon: '🧠',
    inStock: true,
    featured: false,
    active: true
  },
  {
    name: 'Special Kids',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Vitamin',
    ageGroup: 'Trẻ em',
    description: 'Săn chắc xương, tăng cường tuần hoàn máu dành cho trẻ sơ sinh trở lên. Cung cấp 100% Vitamin theo giá trị tham chiếu dinh dưỡng (NRV). Dạng giọt nhỏ tiện dụng.',
    weight: '30ml/hộp',
    price: 390000,
    badge: '',
    icon: '⭐',
    inStock: true,
    featured: false,
    active: true
  },
  {
    name: 'K2D3 Drops',
    brand: BRAND_ID,
    brandName: 'No1EU',
    category: 'Vitamin',
    ageGroup: 'Trẻ em',
    description: 'Tăng chiều cao, bổ sung Canxi, chắc răng dành cho trẻ sơ sinh trở lên. Cung cấp Vitamin K2 và D3 ở dạng dễ hấp thu, giúp tăng mật độ xương lên 4% và vùng thắt lưng lên đến hơn 40%.',
    weight: '30ml/hộp',
    price: 490000,
    badge: 'Hot',
    icon: '🦴',
    inStock: true,
    featured: true,
    active: true
  }
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công');

    let added = 0, skipped = 0;

    for (const p of products) {
      const exists = await Product.findOne({ name: p.name, brand: BRAND_ID });
      if (exists) {
        console.log(`⏭️  Đã tồn tại: ${p.name}`);
        skipped++;
      } else {
        await Product.create(p);
        console.log(`✅ Thêm: ${p.name}`);
        added++;
      }
    }

    console.log(`\n📦 Xong! Thêm: ${added}, Bỏ qua (đã có): ${skipped}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
};

run();
