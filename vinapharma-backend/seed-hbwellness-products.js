// Thêm sản phẩm HB Wellness từ catalogue
// Chạy: node seed-hbwellness-products.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');
const Brand = require('./models/Brand');

const BRAND_CODE = 'HBWELLNESS';
const BRAND_NAME = 'HB Wellness';

const productList = [
  // ── Tinh chất Hồng Sâm cô đặc (dạng gói) ─────────────────
  {
    name: 'Ginseng And Pomegranate Drink',
    category: 'Tăng đề kháng',
    ageGroup: 'Tất cả',
    description: 'Nước uống tinh chất hồng sâm kết hợp lựu đỏ. Tăng cường sức đề kháng, bổ sung năng lượng và chống oxy hóa từ chiết xuất hồng sâm Hàn Quốc và lựu đỏ tự nhiên.',
    weight: '30 gói x 10ml',
    price: 590000,
    badge: '',
    icon: '🍎',
    featured: false,
  },
  {
    name: 'Red Ginseng Essence',
    category: 'Tăng đề kháng',
    ageGroup: 'Tất cả',
    description: 'Tinh chất hồng sâm cô đặc nguyên chất. Bổ sung Ginsenoside từ hồng sâm Hàn Quốc 6 năm tuổi, tăng cường miễn dịch, phục hồi sức khỏe và chống mệt mỏi.',
    weight: '30 gói x 10ml',
    price: 590000,
    badge: 'Bán chạy',
    icon: '🌿',
    featured: true,
  },
  {
    name: 'Red Ginseng Drink For Kids',
    category: 'Tăng đề kháng',
    ageGroup: 'Trẻ em',
    description: 'Nước uống hồng sâm dành cho trẻ em. Bổ sung dưỡng chất thiết yếu, tăng cường sức đề kháng và hỗ trợ phát triển thể chất, trí tuệ cho trẻ em.',
    weight: '30 gói x 10ml',
    price: 590000,
    badge: '',
    icon: '🧒',
    featured: false,
  },

  // ── Trà Sâm ───────────────────────────────────────────────
  {
    name: 'Korean One Ginseng Tea',
    category: 'Tăng đề kháng',
    ageGroup: 'Tất cả',
    description: 'Trà nhân sâm Hàn Quốc cao cấp. Được chế biến từ nhân sâm tươi, giúp tăng cường sức đề kháng, giảm mệt mỏi và cải thiện tuần hoàn máu. Hương vị thơm ngon tự nhiên.',
    weight: '50 gói',
    price: 450000,
    badge: '',
    icon: '🍵',
    featured: false,
  },

  // ── Tinh chất thiên nhiên ──────────────────────────────────
  {
    name: 'Black Garlic Drink',
    category: 'Tim mạch',
    ageGroup: 'Tất cả',
    description: 'Nước uống tỏi đen lên men tự nhiên. Giàu S-Allylcysteine, hỗ trợ điều hòa huyết áp, cholesterol, tăng cường miễn dịch và bảo vệ tim mạch. Không hôi, dễ uống.',
    weight: '30 gói x 20ml',
    price: 1450000,
    badge: 'Hot',
    icon: '🧄',
    featured: true,
  },
  {
    name: 'Pomegranate Juice',
    category: 'Làm đẹp',
    ageGroup: 'Nữ',
    description: 'Nước ép lựu đỏ nguyên chất Hàn Quốc. Giàu Ellagic Acid và Punicalagin — chất chống oxy hóa mạnh giúp làm đẹp da, ngăn ngừa lão hóa và bảo vệ sức khỏe tim mạch.',
    weight: '30 gói x 80ml',
    price: 900000,
    badge: '',
    icon: '🍷',
    featured: false,
  },

  // ── Hồng Sâm Mỹ Vị ────────────────────────────────────────
  {
    name: 'Korean Honeyed Red Ginseng 450g',
    category: 'Tăng đề kháng',
    ageGroup: 'Tất cả',
    description: 'Hồng sâm tẩm mật ong Hàn Quốc hộp lớn 450g. Kết hợp hoàn hảo giữa hồng sâm 6 năm tuổi và mật ong tự nhiên, bổ dưỡng toàn diện, tăng cường sinh lực và miễn dịch.',
    weight: '450g',
    price: 2690000,
    badge: '',
    icon: '🍯',
    featured: false,
  },
  {
    name: 'Korean Honeyed Red Ginseng 220g',
    category: 'Tăng đề kháng',
    ageGroup: 'Tất cả',
    description: 'Hồng sâm tẩm mật ong Hàn Quốc hộp vừa 220g. Kết hợp hoàn hảo giữa hồng sâm 6 năm tuổi và mật ong tự nhiên, bổ dưỡng toàn diện, tăng cường sinh lực và miễn dịch.',
    weight: '220g',
    price: 1450000,
    badge: '',
    icon: '🍯',
    featured: false,
  },
  {
    name: 'Slice Korea Red Ginseng',
    category: 'Tăng đề kháng',
    ageGroup: 'Tất cả',
    description: 'Lát hồng sâm Hàn Quốc sấy khô cao cấp. Hồng sâm 6 năm tuổi thái lát mỏng, giữ nguyên dưỡng chất Ginsenoside, tiện dụng ăn trực tiếp hoặc pha trà.',
    weight: '200g',
    price: 1450000,
    badge: '',
    icon: '🌿',
    featured: false,
  },
  {
    name: 'Honeyed Korean Red Ginseng Slices',
    category: 'Tăng đề kháng',
    ageGroup: 'Tất cả',
    description: 'Lát hồng sâm Hàn Quốc tẩm mật ong. Hồng sâm thái lát ngâm mật ong tự nhiên, thơm ngon dễ dùng, bổ sung Ginsenoside và dưỡng chất thiết yếu, tăng cường sức đề kháng.',
    weight: '200g',
    price: 1800000,
    badge: 'Hot',
    icon: '🍯',
    featured: true,
  },

  // ── Hồng Sâm củ khô ────────────────────────────────────────
  {
    name: 'Korean Red Ginseng Root 300g',
    category: 'Tăng đề kháng',
    ageGroup: 'Người già',
    description: 'Củ hồng sâm Hàn Quốc sấy khô nguyên củ 300g. Hồng sâm 6 năm tuổi nguyên củ giữ nguyên hàm lượng Ginsenoside cao nhất, bổ khí huyết, tăng sinh lực và kéo dài tuổi thọ.',
    weight: '300g',
    price: 4900000,
    badge: '',
    icon: '🌱',
    featured: false,
  },
  {
    name: 'Korean Red Ginseng Root 150g',
    category: 'Tăng đề kháng',
    ageGroup: 'Người già',
    description: 'Củ hồng sâm Hàn Quốc sấy khô nguyên củ 150g. Hồng sâm 6 năm tuổi nguyên củ giữ nguyên hàm lượng Ginsenoside cao nhất, bổ khí huyết, tăng sinh lực và kéo dài tuổi thọ.',
    weight: '150g',
    price: 2500000,
    badge: '',
    icon: '🌱',
    featured: false,
  },

  // ── Thực phẩm chức năng từ nhân sâm ───────────────────────
  {
    name: 'Triple Red Ginseng Pill',
    category: 'Tăng đề kháng',
    ageGroup: 'Tất cả',
    description: 'Viên hồng sâm tam bảo. Kết hợp 3 loại sâm quý: Hồng sâm Hàn Quốc, Nhân sâm trắng và Sâm Mỹ, tổng hợp Ginsenoside đa dạng giúp tăng cường miễn dịch và phục hồi sức khỏe toàn diện.',
    weight: '1 hộp / 100 viên',
    price: 1500000,
    badge: 'Mới',
    icon: '💊',
    featured: true,
  },
  {
    name: 'Korean Red Ginseng Capsule',
    category: 'Tăng đề kháng',
    ageGroup: 'Tất cả',
    description: 'Viên đạm hồng sâm Hàn Quốc. Chiết xuất hồng sâm 6 năm tuổi được đóng gói dạng viên đạm tiện dụng, bổ sung Ginsenoside tự nhiên, tăng cường sức đề kháng và chống mệt mỏi.',
    weight: '1 hộp / 120 viên',
    price: 1200000,
    badge: '',
    icon: '💊',
    featured: false,
  },
  {
    name: 'Chim Hyangdan Gold',
    category: 'Tăng đề kháng',
    ageGroup: 'Người già',
    description: 'Viên hoàn hồng sâm vàng cao cấp Chim Hyangdan. Bài thuốc truyền thống Hàn Quốc với hồng sâm, lộc nhung và thảo dược quý, bổ thận tráng dương, tăng cường sinh lực và tuổi thọ.',
    weight: '1 hộp / 60 viên',
    price: 2300000,
    badge: 'Hot',
    icon: '⭐',
    featured: true,
  },
  {
    name: 'Ginseng Ara Power',
    category: 'Tăng cơ',
    ageGroup: 'Nam',
    description: 'Viên hồng sâm tăng cường sinh lực nam giới. Kết hợp hồng sâm Hàn Quốc với các dưỡng chất hỗ trợ tăng cơ, cải thiện sức bền và sinh lý nam giới.',
    weight: '1 hộp / 60 viên',
    price: 790000,
    badge: '',
    icon: '💪',
    featured: false,
  },
  {
    name: 'Ginseng Gold Ball 1 viên',
    category: 'Tăng đề kháng',
    ageGroup: 'Tất cả',
    description: 'Viên hồng sâm vàng cao cấp. Hồng sâm Hàn Quốc 6 năm tuổi bọc vàng, bổ sung Ginsenoside và khoáng chất quý, tăng cường miễn dịch và phục hồi sức khỏe.',
    weight: '1 viên',
    price: 790000,
    badge: '',
    icon: '🟡',
    featured: false,
  },
  {
    name: 'Ginseng Gold Ball 3 viên',
    category: 'Tăng đề kháng',
    ageGroup: 'Tất cả',
    description: 'Bộ 3 viên hồng sâm vàng cao cấp. Hồng sâm Hàn Quốc 6 năm tuổi bọc vàng, bổ sung Ginsenoside và khoáng chất quý, tăng cường miễn dịch và phục hồi sức khỏe.',
    weight: '3 viên',
    price: 2200000,
    badge: '',
    icon: '🟡',
    featured: false,
  },

  // ── Sâm nước ──────────────────────────────────────────────
  {
    name: 'Real Ginseng Drink',
    category: 'Tăng đề kháng',
    ageGroup: 'Tất cả',
    description: 'Nước uống nhân sâm tươi nguyên chất. Chiết xuất từ nhân sâm tươi, giữ nguyên hoạt chất Ginsenoside tự nhiên, tăng cường năng lượng và sức đề kháng.',
    weight: '30 chai x 100ml',
    price: 750000,
    badge: '',
    icon: '🥤',
    featured: false,
  },
  {
    name: 'Cheon Jong Sansam Baeyangggwan',
    category: 'Tăng đề kháng',
    ageGroup: 'Người già',
    description: 'Nước bổ dưỡng sâm núi Hàn Quốc Cheon Jong. Kết hợp sâm núi hoang dã với thảo dược truyền thống, bổ khí huyết, tăng cường miễn dịch và phục hồi sức khỏe toàn diện.',
    weight: '30 chai x 100ml',
    price: 1800000,
    badge: '',
    icon: '🍶',
    featured: false,
  },
  {
    name: 'Korean Red Ginseng Drink 1800ml',
    category: 'Tăng đề kháng',
    ageGroup: 'Tất cả',
    description: 'Nước uống hồng sâm Hàn Quốc chai lớn 1800ml. Tinh chất hồng sâm 6 năm tuổi pha sẵn, tiện lợi hàng ngày, tăng cường sức đề kháng và sinh lực.',
    weight: '1 chai 1800ml',
    price: 800000,
    badge: '',
    icon: '🍾',
    featured: false,
  },
  {
    name: 'Hovenia Red Ginseng Drink',
    category: 'Detox',
    ageGroup: 'Tất cả',
    description: 'Nước uống hồng sâm kết hợp Hovenia (cây chỉ câu). Hỗ trợ giải độc gan, bảo vệ gan khỏi tác hại của rượu bia, giảm mệt mỏi và tăng cường chức năng gan.',
    weight: '30 chai x 100ml',
    price: 800000,
    badge: '',
    icon: '🌿',
    featured: false,
  },
  {
    name: 'Red Ginseng Deer Antlers Premium Drink',
    category: 'Tăng đề kháng',
    ageGroup: 'Người già',
    description: 'Nước uống hồng sâm lộc nhung cao cấp. Kết hợp hồng sâm Hàn Quốc 6 năm tuổi và lộc nhung tươi, bổ thận tráng dương, tăng sinh lực, xương khớp và sức đề kháng.',
    weight: '30 chai x 100ml',
    price: 1250000,
    badge: 'Hot',
    icon: '🦌',
    featured: true,
  },
  {
    name: 'Korean Red Ginseng Kids Drink',
    category: 'Tăng đề kháng',
    ageGroup: 'Trẻ em',
    description: 'Nước uống hồng sâm dành cho trẻ em 600ml. Công thức nhẹ nhàng từ hồng sâm Hàn Quốc, bổ sung dưỡng chất, tăng cường miễn dịch và hỗ trợ phát triển toàn diện cho trẻ.',
    weight: '1 chai 600ml',
    price: 1150000,
    badge: '',
    icon: '🧒',
    featured: false,
  },

  // ── Làm đẹp ───────────────────────────────────────────────
  {
    name: 'Ginseng Mask',
    category: 'Làm đẹp',
    ageGroup: 'Nữ',
    description: 'Mặt nạ tinh chất hồng sâm Hàn Quốc. Cung cấp ẩm sâu, nuôi dưỡng và tái tạo da với chiết xuất hồng sâm, giúp da căng mịn, sáng khỏe và chống lão hóa hiệu quả.',
    weight: '1 miếng',
    price: 27000,
    badge: '',
    icon: '✨',
    featured: false,
  },
  {
    name: 'Inner Luxe Collagen Elixir',
    category: 'Làm đẹp',
    ageGroup: 'Nữ',
    description: 'Tinh chất Collagen cao cấp Inner Luxe. Kết hợp Hydrolyzed Collagen, hồng sâm Hàn Quốc và vitamin C giúp tăng sinh collagen, cải thiện độ đàn hồi da, chống lão hóa từ bên trong.',
    weight: '30 gói x 10ml',
    price: 1200000,
    badge: 'Mới',
    icon: '💎',
    featured: true,
  },

  // ── Cao Hồng Sâm ──────────────────────────────────────────
  {
    name: 'Korean Red Ginseng Extract Plus',
    category: 'Tăng đề kháng',
    ageGroup: 'Tất cả',
    description: 'Cao hồng sâm Hàn Quốc cô đặc Plus. Chiết xuất hồng sâm 6 năm tuổi cô đặc hàm lượng cao Ginsenoside, tăng cường miễn dịch, phục hồi sức khỏe và chống lão hóa tế bào.',
    weight: '1 hũ 240g',
    price: 590000,
    badge: 'Bán chạy',
    icon: '🌿',
    featured: false,
  },
];

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công');

    let brand = await Brand.findOne({ code: BRAND_CODE });
    if (!brand) {
      brand = await Brand.create({
        code: BRAND_CODE,
        name: BRAND_NAME,
        description: 'Thương hiệu hồng sâm Hàn Quốc cao cấp. Chuyên cung cấp các sản phẩm từ hồng sâm 6 năm tuổi và thảo dược truyền thống Hàn Quốc.',
        active: true,
      });
      console.log(`✅ Tạo thương hiệu mới: ${BRAND_NAME} (ID: ${brand._id})`);
    } else {
      console.log(`✅ Đã tìm thấy thương hiệu: ${BRAND_NAME} (ID: ${brand._id})`);
    }

    const BRAND_ID = brand._id.toString();
    let created = 0, skipped = 0;

    for (const p of productList) {
      const exists = await Product.findOne({ name: p.name, brand: BRAND_ID });
      if (exists) {
        console.log(`⏭️  Đã tồn tại: ${p.name}`);
        skipped++;
        continue;
      }
      await Product.create({
        ...p,
        brand: BRAND_ID,
        brandName: BRAND_NAME,
        inStock: true,
        active: true,
      });
      console.log(`✅ Thêm: ${p.name}`);
      created++;
    }

    console.log(`\n📦 Xong! Đã tạo ${created} sản phẩm, bỏ qua ${skipped} sản phẩm đã tồn tại.`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
}

main();
