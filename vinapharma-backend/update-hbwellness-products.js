// Cập nhật thông tin đầy đủ cho sản phẩm HB Wellness từ catalogue chính thức
// Chạy: node update-hbwellness-products.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');
const Brand = require('./models/Brand');

const BRAND_NAME = 'HB Wellness';

// Dữ liệu cập nhật: key = tên sản phẩm trong DB
const updates = {
  'Ginseng And Pomegranate Drink': {
    price: 590000,
    weight: '100ml (10ml x 10 gói)',
    ageGroup: 'Nữ',
    description: 'Tinh chất hồng sâm cô đặc 6 năm tuổi kết hợp nước lựu đỏ cô đặc dành cho nữ. Hỗ trợ tăng sinh collagen, làm đẹp da và duy trì vóc dáng, hỗ trợ phục hồi làn da hư tổn. Hỗ trợ cải thiện sinh lý nữ, cải thiện tâm trạng và giảm stress.',
    badge: '',
    featured: false,
  },
  'Red Ginseng Essence': {
    price: 590000,
    weight: '100ml (10ml x 10 gói)',
    ageGroup: 'Nam',
    description: 'Tinh chất nhân sâm cô đặc dành cho nam, kết hợp mật ong Seyang, hỗn hợp thực vật cô đặc, chất xơ rau diếp xoăn và dưa chuột lên men. Hỗ trợ cải thiện sức khỏe tổng thể, tăng cường sinh lực, hỗ trợ cải thiện chức năng sinh lý nam giới. Hỗ trợ hệ miễn dịch và tăng cường trí nhớ, sự tập trung.',
    badge: 'Bán chạy',
    featured: true,
  },
  'Red Ginseng Drink For Kids': {
    price: 590000,
    weight: '100ml (10ml x 10 gói)',
    ageGroup: 'Trẻ em',
    description: 'Tinh chất hồng sâm dạng thạch dành cho trẻ em. Hỗ trợ phát triển hệ xương, hỗ trợ tăng trưởng chiều cao cho trẻ. Hỗ trợ cải thiện sức khỏe tim mạch và hệ thần kinh. Hỗ trợ giảm táo bón và cải thiện sức khỏe đường ruột, giúp tiêu hóa tốt hơn cho trẻ.',
    badge: '',
    featured: false,
  },
  'Korean One Ginseng Tea': {
    price: 450000,
    weight: '50 gói/hộp (dùng được 1,5 – 2 tháng)',
    ageGroup: 'Tất cả',
    description: 'Trà hồng sâm Hàn Quốc thượng hạng. Thành phần nổi bật: Saponin 4,5% mg/g, Glucose Anhydrocrystalline 88%, chiết xuất táo đỏ 2%. Hỗ trợ chống lão hóa, làm đẹp da và hỗ trợ cải thiện hệ tiêu hóa. Hỗ trợ tăng cường tuần hoàn máu và cải thiện sức khỏe toàn diện.',
    badge: '',
    featured: false,
  },
  'Black Garlic Drink': {
    price: 1450000,
    weight: 'Hộp 30 gói x 60ml',
    ageGroup: 'Tất cả',
    description: 'Nước uống tinh chất tỏi đen Hàn Quốc 90%, kết hợp táo đỏ Hàn Quốc, quả Hovenia Dulcis và đường oligosaccharides. Chứa S-allylcysteine và cysteine, hỗ trợ sức khỏe tim mạch nhờ khả năng hỗ trợ giảm mỡ máu. Hỗ trợ ổn định huyết áp và tăng cường sức đề kháng tự nhiên nhờ các acid amin và polyphenol quý giá.',
    badge: 'Hot',
    featured: true,
  },
  'Pomegranate Juice': {
    price: 900000,
    weight: 'Hộp 30 gói x 100ml',
    ageGroup: 'Nữ',
    description: 'Nước ép lựu đỏ 100% nguyên chất. Nguồn dưỡng chất quý giá giúp tăng cường miễn dịch. Hỗ trợ sức khỏe xương khớp và tim mạch, hỗ trợ ổn định đường huyết. Hỗ trợ chống lão hóa, giúp da sáng và mịn màng. Hỗ trợ giảm stress và nâng cao chất lượng giấc ngủ.',
    badge: '',
    featured: false,
  },
  'Korean Honeyed Red Ginseng 450g': {
    price: 2690000,
    weight: 'Hộp 450g (30g x 15 củ)',
    ageGroup: 'Tất cả',
    description: 'Hồng sâm nguyên củ tẩm mật ong — 100% hồng sâm Hàn Quốc và mật ong nội địa Hàn Quốc. Phiên bản quà tặng cao cấp. Hỗ trợ chống lão hóa, tăng cường thể lực, giảm mệt mỏi. Hỗ trợ ổn định huyết áp, hỗ trợ giảm cholesterol và sức khỏe tim mạch. Hỗ trợ tăng cường tuần hoàn máu, hỗ trợ thải độc gan và cải thiện trí nhớ.',
    badge: '',
    featured: false,
  },
  'Korean Honeyed Red Ginseng 220g': {
    price: 1450000,
    weight: 'Hộp 220g (22g x 10 củ)',
    ageGroup: 'Tất cả',
    description: 'Hồng sâm nguyên củ tẩm mật ong — 100% hồng sâm Hàn Quốc và mật ong nội địa Hàn Quốc. Hỗ trợ chống lão hóa, tăng cường thể lực, giảm mệt mỏi. Hỗ trợ ổn định huyết áp, hỗ trợ giảm cholesterol và sức khỏe tim mạch. Hỗ trợ tăng cường tuần hoàn máu, hỗ trợ thải độc gan và cải thiện trí nhớ.',
    badge: '',
    featured: false,
  },
  'Slice Korea Red Ginseng': {
    price: 1450000,
    weight: '20g x 10 hộp nhỏ',
    ageGroup: 'Tất cả',
    description: 'Nhân sâm 100% nguyên chất và mật ong Hàn Quốc. Hỗ trợ cải thiện tình trạng mất ngủ và tăng cường khả năng ghi nhớ. Bồi bổ sức khỏe và tinh thần. Hỗ trợ ổn định huyết áp và tăng cường khả năng miễn dịch. Hỗ trợ nuôi dưỡng gan thận.',
    badge: '',
    featured: false,
  },
  'Honeyed Korean Red Ginseng Slices': {
    price: 1800000,
    weight: '2g/gói (10 gói/hộp)',
    ageGroup: 'Tất cả',
    description: 'Sâm lát tẩm mật ong Hàn Quốc — chiết xuất từ hồng sâm với hàm lượng Saponin cao kết hợp mật ong Hàn Quốc. Hỗ trợ cải thiện tình trạng mất ngủ và tăng cường khả năng ghi nhớ. Bồi bổ sức khỏe và tinh thần. Hỗ trợ ổn định huyết áp, tăng cường miễn dịch và hỗ trợ nuôi dưỡng gan thận.',
    badge: 'Hot',
    featured: true,
  },
  'Korean Red Ginseng Root 300g': {
    price: 4900000,
    weight: '300g/hộp',
    ageGroup: 'Người già',
    description: 'Hồng sâm củ khô 6 năm tuổi nguyên chất 300g — không đường, không hương liệu, không chất bảo quản. Hỗ trợ tăng cường hệ miễn dịch, tăng sức đề kháng, giảm mệt mỏi. Hỗ trợ cải thiện trí nhớ và tăng cường trí não. Hỗ trợ cải thiện chất lượng giấc ngủ và cung cấp năng lượng cho cơ thể.',
    badge: '',
    featured: false,
  },
  'Korean Red Ginseng Root 150g': {
    price: 2500000,
    weight: '150g/hộp',
    ageGroup: 'Người già',
    description: 'Hồng sâm củ khô 6 năm tuổi nguyên chất 150g — không đường, không hương liệu, không chất bảo quản. Hỗ trợ tăng cường hệ miễn dịch, tăng sức đề kháng, giảm mệt mỏi. Hỗ trợ cải thiện trí nhớ và tăng cường trí não. Hỗ trợ cải thiện chất lượng giấc ngủ và cung cấp năng lượng cho cơ thể.',
    badge: '',
    featured: false,
  },
  'Triple Red Ginseng Pill': {
    price: 1500000,
    weight: 'Hộp 30 viên x 3.75g',
    ageGroup: 'Tất cả',
    description: 'Viên hoàn bổ não từ 100% nhân sâm Hàn Quốc và các thảo dược Hàn Quốc, được công nhận bởi KFDA. Hỗ trợ cải thiện lưu lượng máu và trí nhớ, hỗ trợ chống oxy hóa. Hỗ trợ tăng cường miễn dịch và giúp giảm mệt mỏi. Phù hợp cho mọi đối tượng, đặc biệt tốt cho người cao tuổi.',
    badge: 'Mới',
    featured: true,
  },
  'Korean Red Ginseng Capsule': {
    price: 1200000,
    weight: 'Hộp sắt 120 viên x 830mg',
    ageGroup: 'Tất cả',
    description: 'Viên đạm hồng sâm Hàn Quốc 6 năm tuổi kết hợp nhung hươu Hàn Quốc, nấm linh chi Young Ji, sữa ong chúa, vitamin B2, C và tocopherol. Hỗ trợ bồi bổ sức khỏe, nâng cao sức đề kháng và tăng cường khí huyết. Hỗ trợ cơ thể phục hồi nhanh chóng, hỗ trợ thải độc gan và tăng cường hấp thu dưỡng chất.',
    badge: '',
    featured: false,
  },
  'Chim Hyangdan Gold': {
    price: 2300000,
    weight: '30 viên/hộp',
    ageGroup: 'Người già',
    description: 'An cung trầm hương cao cấp. Thành phần: Trầm hương Indonesia 5%, đương quy, mẫu đơn, địa hoàng, cam thảo, quế, táo đỏ, lộc nhung, hồng sâm, mật ong và các thảo dược Đông y. Hỗ trợ tuần hoàn máu não, hỗ trợ ổn định hoạt động mạch máu và giúp tỉnh táo. Không dùng cho phụ nữ mang thai.',
    badge: 'Hot',
    featured: true,
  },
  'Ginseng Ara Power': {
    price: 790000,
    weight: '60 viên/lọ',
    ageGroup: 'Nam',
    description: 'Viên uống hồng sâm Hàn Quốc 6 năm tuổi kết hợp Niacinamide, Biotin, Folic acid, Kẽm, Canxi, Vitamin B1 & B2. Hỗ trợ tăng cường sức khỏe sinh lý và sức đề kháng, hỗ trợ chống lão hóa, giảm mệt mỏi. Hỗ trợ tăng cường tuần hoàn máu và hỗ trợ ổn định huyết áp, cải thiện trí nhớ.',
    badge: '',
    featured: false,
  },
  'Ginseng Gold Ball 1 viên': {
    price: 790000,
    weight: '1 viên (3.75g)/hộp',
    ageGroup: 'Tất cả',
    description: 'An ngưu cung hoàng hoàn — thành phần: Ngưu hoàng, xạ hương, hồng sâm Hàn Quốc, nhung hươu, L.Arginine, vàng lá và các thảo dược quý. Hỗ trợ tăng cường sức đề kháng, hỗ trợ tăng hồng cầu và lưu thông máu. Hỗ trợ ổn định nhịp tim, nâng cao khả năng tập trung và trí nhớ, hỗ trợ thanh nhiệt giải độc và ổn định hoạt động thần kinh. Trẻ em dưới 3 tuổi dùng 1/4 viên/ngày.',
    badge: '',
    featured: false,
  },
  'Ginseng Gold Ball 3 viên': {
    price: 2200000,
    weight: 'Hộp 3 viên (3.75g/viên)',
    ageGroup: 'Tất cả',
    description: 'An ngưu cung hoàng hoàn bộ 3 viên — thành phần: Ngưu hoàng, xạ hương, hồng sâm Hàn Quốc, nhung hươu, L.Arginine, vàng lá và các thảo dược quý. Hỗ trợ tăng cường sức đề kháng, hỗ trợ tăng hồng cầu và lưu thông máu. Hỗ trợ ổn định nhịp tim, nâng cao khả năng tập trung và trí nhớ, hỗ trợ thanh nhiệt giải độc và ổn định hoạt động thần kinh.',
    badge: '',
    featured: false,
  },
  'Real Ginseng Drink': {
    price: 750000,
    weight: '120ml/chai, hộp 10 chai (kèm 1 củ sâm tươi)',
    ageGroup: 'Tất cả',
    description: 'Nước sâm có củ — mỗi chai chứa 1 củ sâm tươi, chiết xuất hồng sâm 0.15%, mật ong và nước tinh khiết. Hỗ trợ tăng cường miễn dịch và cải thiện sức khỏe. Hỗ trợ tăng khả năng tập trung. Hỗ trợ cải thiện chức năng dạ dày và đường tiêu hóa. Hỗ trợ phục hồi chức năng gan và tăng cường sinh lực.',
    badge: '',
    featured: false,
  },
  'Cheon Jong Sansam Baeyangggwan': {
    price: 1800000,
    weight: '20ml x 20 ống',
    ageGroup: 'Người già',
    description: 'Sâm núi cao cấp dạng nước có rễ — chiết xuất từ rễ sâm hàm lượng cao cấp, ứng dụng công nghệ Hàn Quốc. Hỗ trợ tăng cường sức đề kháng cho người suy nhược, người ốm yếu. Hỗ trợ giảm các chất độc hại trong cơ thể, hỗ trợ giảm đau dạ dày. Hỗ trợ tăng cường trí nhớ, giảm stress. Hỗ trợ làm đẹp da ở cả nam và nữ.',
    badge: '',
    featured: false,
  },
  'Korean Red Ginseng Drink 1800ml': {
    price: 800000,
    weight: 'Hộp lớn 60ml x 30 gói (6 hộp nhỏ)',
    ageGroup: 'Tất cả',
    description: 'Nước sâm túi xách tiện lợi — tinh chất hồng sâm bằng công nghệ cao, hàm lượng hồng sâm trên 70mg/g. Hỗ trợ phục hồi cơ thể suy nhược, kém ăn, giảm mệt mỏi. Hỗ trợ tăng cường hệ miễn dịch, bồi bổ sức khỏe cho người lớn tuổi và sau ốm. Hỗ trợ cân bằng quá trình trao đổi chất và tăng cường lưu thông khí huyết.',
    badge: '',
    featured: false,
  },
  'Hovenia Red Ginseng Drink': {
    price: 800000,
    weight: 'Hộp lớn 60ml x 30 gói (6 hộp nhỏ)',
    ageGroup: 'Tất cả',
    description: 'Nước uống giải rượu từ chiết xuất quả khúng khéng (Hovenia dulcis Hàn Quốc 19.5%) kết hợp oligosaccharide, thực vật cô đặc và chiết xuất hạt bưởi. Hỗ trợ thanh lọc cơ thể và tăng cường miễn dịch. Hỗ trợ thải độc gan, là lựa chọn phù hợp cho người muốn bảo vệ và nâng cao sức khỏe gan.',
    category: 'Detox',
    badge: '',
    featured: false,
  },
  'Red Ginseng Deer Antlers Premium Drink': {
    price: 1250000,
    weight: 'Hộp lớn 70ml x 30 gói (6 hộp nhỏ)',
    ageGroup: 'Người già',
    description: 'Nước uống hồng sâm nhung hươu cao cấp — 100% hồng sâm Hàn Quốc, nhung hươu và linh chi thượng hạng. Hỗ trợ tăng cường sinh khí và bổ máu, hỗ trợ lưu thông máu. Hỗ trợ bổ thận và tăng cường sinh lực. Hỗ trợ sức khỏe đường hô hấp. Không dùng cho phụ nữ mang thai và trẻ em.',
    badge: 'Hot',
    featured: true,
  },
  'Korean Red Ginseng Kids Drink': {
    price: 1150000,
    weight: 'Hộp lớn 20ml x 30 gói (3 hộp nhỏ)',
    ageGroup: 'Trẻ em',
    description: 'Nước hồng sâm mật ong dành cho trẻ biếng ăn từ 2–9 tuổi. Chiết xuất 100% hồng sâm cô đặc với mật ong nguyên chất. Hỗ trợ tăng cường hệ miễn dịch, giúp giảm nguy cơ cảm cúm và ốm vặt. Hỗ trợ phát triển trí não và cải thiện trí nhớ cho bé.',
    badge: '',
    featured: false,
  },
  'Ginseng Mask': {
    price: 27000,
    weight: '30ml/miếng',
    ageGroup: 'Nữ',
    description: 'Mặt nạ lụa dưỡng da từ nhân sâm. Thành phần: Chiết xuất nhân sâm Panax, Collagen, Astaxanthin, Glutathione, Alpha-Arbutin, Hyaluronate, Vitamin E. Hỗ trợ cấp ẩm cho da, giúp da sáng mịn, hỗ trợ kích hoạt tốc độ đổi mới tế bào giúp trẻ hóa da. Hỗ trợ giảm nếp nhăn và phục hồi các tổn thương trên da. Dùng 2–3 lần/tuần.',
    badge: '',
    featured: false,
  },
  'Inner Luxe Collagen Elixir': {
    price: 1200000,
    weight: 'Hộp 20ml x 30 lọ + viên nén Hyaluronic Acid',
    ageGroup: 'Nữ',
    description: 'Collagen đẹp da cao cấp kết hợp vitamin tổng hợp và hồng sâm. Mỗi lọ 20ml chứa 5000mg Collagen sinh học thủy phân từ cá, Hyaluronic Acid 63.25mg, chiết xuất hồng sâm, lựu đỏ, Vitamin C, E, B1, B2, B6 và Biotin. Hỗ trợ nuôi dưỡng làn da trắng sáng, đều màu, cấp ẩm và trẻ hóa da. Hỗ trợ tạo môi trường lý tưởng để collagen phát triển từ bên trong.',
    badge: 'Mới',
    featured: true,
  },
  'Korean Red Ginseng Extract Plus': {
    price: 590000,
    weight: 'Hộp 300g',
    ageGroup: 'Tất cả',
    description: 'Cao hồng sâm cô đặc cao cấp tinh chế từ sâm tươi 6 năm tuổi, kết hợp linh chi, bạch chỉ và xuyên khung. Hỗ trợ phục hồi thể trạng cho người sức khỏe yếu hoặc sau ốm. Hỗ trợ bổ thận và cải thiện tuần hoàn máu, hỗ trợ hệ miễn dịch. Hỗ trợ làm chậm quá trình lão hóa và tăng cường sức khỏe từ bên trong.',
    badge: 'Bán chạy',
    featured: false,
  },
};

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công\n');

    const brand = await Brand.findOne({ name: BRAND_NAME });
    if (!brand) {
      console.error(`❌ Không tìm thấy thương hiệu ${BRAND_NAME}`);
      process.exit(1);
    }

    const BRAND_ID = brand._id.toString();
    let updated = 0, notFound = 0;

    for (const [name, data] of Object.entries(updates)) {
      const product = await Product.findOne({ name, brand: BRAND_ID });
      if (!product) {
        console.log(`⚠️  Không tìm thấy: ${name}`);
        notFound++;
        continue;
      }
      await Product.findByIdAndUpdate(product._id, data);
      console.log(`✅ Cập nhật: ${name} — ${data.price?.toLocaleString('vi-VN')}đ`);
      updated++;
    }

    console.log(`\n📦 Xong! Cập nhật: ${updated}, Không tìm thấy: ${notFound}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
}

main();
