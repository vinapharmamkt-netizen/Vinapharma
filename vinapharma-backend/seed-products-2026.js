// Seed sản phẩm từ Bảng báo giá 16/03/2026
// Chạy: node seed-products-2026.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');
const Brand   = require('./models/Brand');

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công\n');

    // Lấy toàn bộ brand theo code
    const brandList = await Brand.find();
    const bMap = {};
    brandList.forEach(b => { bMap[b.code] = b; });

    const ref = (code) => {
      const br = bMap[code];
      if (!br) throw new Error(`❌ Không tìm thấy brand: ${code}`);
      return { brand: br._id.toString(), brandName: br.name };
    };

    const products = [

      // ── EU VISION ──────────────────────────────────────────
      {
        name: 'MAS CALCI DK2',
        ...ref('EUV'), category: 'Khoáng chất', ageGroup: 'Trẻ em',
        weight: 'Hộp 1 chai 150ml', price: 350000,
        description: 'Bổ sung canxi hữu cơ, Vitamin D3, K2, Magie, Kẽm cho trẻ em trong quá trình phát triển',
        icon: '🦴',
      },
      {
        name: 'VIÊN ĐẶT ÂM ĐẠO VITREX PLUS',
        ...ref('EUV'), category: 'Khác', ageGroup: 'Nữ',
        weight: 'Hộp 1 vỉ x 7 viên', price: 260000,
        description: 'Giúp kháng viêm, kháng nấm, cải thiện tình trạng khô hạn, cân bằng môi trường âm đạo. Dùng được cho phụ nữ đang mang thai, cho con bú, sau sinh, sau phẫu thuật phụ khoa',
        icon: '💊',
      },
      {
        name: 'ISOPLUS-ZT',
        ...ref('EUV'), category: 'Làm đẹp', ageGroup: 'Nữ',
        weight: 'Hộp 2 vỉ x 15 viên nang mềm', price: 370000,
        description: 'Giúp cân bằng nội tiết, giảm sạn da, nám, tàn nhang, giúp làm đẹp da, cải thiện sinh lý',
        icon: '✨',
      },
      {
        name: 'MUMMACAL-ZT',
        ...ref('EUV'), category: 'Khoáng chất', ageGroup: 'Nữ',
        weight: 'Hộp 2 vỉ x 15 viên nang mềm', price: 365000,
        description: 'Viên uống bổ sung Canxi hữu cơ chiết xuất thực vật từ tảo biển đỏ Bắc Ireland',
        icon: '🦴',
      },
      {
        name: 'MUMFOLATE DIAMOND',
        ...ref('EUV'), category: 'Vitamin', ageGroup: 'Nữ',
        weight: 'Hộp 2 vỉ x 15 viên nang mềm', price: 365000,
        description: 'Viên uống bổ sung sắt hữu cơ Bisglycinate và acid Folate',
        icon: '💊',
      },
      {
        name: 'EPO QUEEN',
        ...ref('EUV'), category: 'Khác', ageGroup: 'Nữ',
        weight: 'Hộp 2 vỉ x 15 viên nang mềm', price: 390000,
        description: 'Sản phẩm bổ sung nội tiết tố nữ',
        icon: '👑',
      },
      {
        name: 'MAS MULTIGLUCAN',
        ...ref('EUV'), category: 'Tăng đề kháng', ageGroup: 'Tất cả',
        weight: 'Hộp 1 chai 150ml', price: 350000,
        description: 'Bổ sung sắt hữu cơ (Bisglycinate), Kẽm, Các vitamin và khoáng chất, Betaglucan; giúp tăng khả năng sinh sản hồng cầu hemoglobin',
        icon: '💊',
      },
      {
        name: 'Clover FOLATE',
        ...ref('EUV'), category: 'Vitamin', ageGroup: 'Nữ',
        weight: 'Hộp 30 viên nang mềm', price: 205000,
        description: 'Bổ sung Acid Folic cho phụ nữ trước, trong và sau sinh đang cho con bú',
        icon: '🌿',
      },
      {
        name: 'Clover DHA',
        ...ref('EUV'), category: 'Omega', ageGroup: 'Nữ',
        weight: 'Hộp 30 viên nang mềm', price: 370000,
        description: 'Bổ sung DHA, EPA từ gan cá tuyết cho phụ nữ mang thai, sau sinh, cho con bú, người trưởng thành',
        icon: '🐟',
      },

      // ── VINPHARMA ──────────────────────────────────────────
      {
        name: 'VINCOOL',
        ...ref('VINPHA'), category: 'Tăng đề kháng', ageGroup: 'Tất cả',
        weight: 'Hộp 8 vỉ x 10 viên', price: 205000,
        description: 'Hỗ trợ nhuận phế, giảm đờm, giảm ho, giúp hạn chế biểu hiện hắt hơi, chảy nước mũi do cảm lạnh',
        icon: '🌡️',
      },
      {
        name: 'SUPER BABY',
        ...ref('VINPHA'), category: 'Tăng đề kháng', ageGroup: 'Trẻ em',
        weight: 'Hộp 12 túi x 10ml', price: 135000,
        description: 'Bổ sung Thymomodulin, L-Lysine và Enzyme tiêu hóa, hỗ trợ tăng cường sức đề kháng, giúp ăn ngon miệng, cải thiện triệu chứng và giảm nguy cơ viêm đường hô hấp',
        icon: '👶',
      },
      {
        name: 'BỔ PHỔI',
        ...ref('VINPHA'), category: 'Tăng đề kháng', ageGroup: 'Tất cả',
        weight: 'Hộp 3 vỉ x 10 viên', price: 115000,
        description: 'Hỗ trợ bổ phổi, giảm ho, giảm đờm, hỗ trợ giảm đau rát họng, khàn tiếng do viêm họng, viêm phế quản',
        icon: '🫁',
      },
      {
        name: 'MINUS TC',
        ...ref('VINPHA'), category: 'Tăng đề kháng', ageGroup: 'Tất cả',
        weight: 'Hộp 1 chai 30ml', price: 95000,
        description: 'Hỗ trợ giảm ho, giảm đờm do viêm phế quản',
        icon: '💊',
      },
      {
        name: 'GEL VỆ SINH QUEEN LOVE Hương Hoa Hồng',
        ...ref('VINPHA'), category: 'Khác', ageGroup: 'Nữ',
        weight: 'Chai 100ml', price: 115000,
        description: 'Chăm sóc và làm sạch vùng kín hàng ngày; khử mùi hôi; ngăn ngừa viêm, ngứa; duy trì ổn định độ PH vùng kín',
        icon: '🌹',
      },
      {
        name: 'GEL VỆ SINH QUEEN LOVE Hương Hoa Nhài',
        ...ref('VINPHA'), category: 'Khác', ageGroup: 'Nữ',
        weight: 'Chai 100ml', price: 115000,
        description: 'Chăm sóc và làm sạch vùng kín hàng ngày; khử mùi hôi; ngăn ngừa viêm, ngứa; duy trì ổn định độ PH vùng kín',
        icon: '🌸',
      },
      {
        name: 'FE TC',
        ...ref('VINPHA'), category: 'Khoáng chất', ageGroup: 'Tất cả',
        weight: 'Hộp 1 chai 30ml', price: 160000,
        description: 'Bổ sung sắt và acid folic cho cơ thể, hỗ trợ giảm nguy cơ thiếu máu do thiếu sắt và acid folic',
        icon: '💊',
      },
      {
        name: 'TRINH NỮ ĐAN 60 viên',
        ...ref('VINPHA'), category: 'Khác', ageGroup: 'Tất cả',
        weight: 'Hộp 1 lọ 60 viên', price: 160000,
        description: 'Hỗ trợ giảm sự phát triển của u xơ, giúp giảm u xơ tử cung ở phụ nữ và u xơ tiền liệt tuyến ở nam giới',
        icon: '🌿',
      },
      {
        name: 'TRINH NỮ ĐAN 30 viên',
        ...ref('VINPHA'), category: 'Khác', ageGroup: 'Tất cả',
        weight: 'Hộp 3 vỉ x 10 viên', price: 110000,
        description: 'Hỗ trợ giảm sự phát triển của u xơ tử cung ở phụ nữ và u xơ tiền liệt tuyến ở nam giới',
        icon: '🌿',
      },
      {
        name: 'BỔ MẮT NÃO BRAIN EYES',
        ...ref('VINPHA'), category: 'Trí não', ageGroup: 'Tất cả',
        weight: 'Hộp 20 gói x 10ml', price: 130000,
        description: 'Hỗ trợ tốt cho não bộ và thị lực',
        icon: '🧠',
      },
      {
        name: 'D3 TC',
        ...ref('VINPHA'), category: 'Vitamin', ageGroup: 'Tất cả',
        weight: 'Hộp 1 chai 30ml', price: 110000,
        description: 'Giúp bổ sung vitamin D3 cho cơ thể. Hỗ trợ tăng cường hấp thu canxi vào xương, hỗ trợ giảm nguy cơ còi xương ở trẻ, loãng xương ở người lớn do thiếu vitamin D3',
        icon: '☀️',
      },
      {
        name: 'ĐÔNG TRÙNG HẠ THẢO',
        ...ref('VINPHA'), category: 'Tăng đề kháng', ageGroup: 'Tất cả',
        weight: 'Hộp 2 lọ x 30 viên', price: 470000,
        description: 'Hỗ trợ tăng cường sức khỏe, giảm mệt mỏi',
        icon: '🍄',
      },
      {
        name: 'ĐẠI TRÀNG VINPHARMA',
        ...ref('VINPHA'), category: 'Probiotics', ageGroup: 'Tất cả',
        weight: 'Hộp 10 ống x 10ml', price: 200000,
        description: 'Hỗ trợ các triệu chứng rối loạn tiêu hóa do viêm đại tràng',
        icon: '💊',
      },
      {
        name: 'CEMIO CALCI MAGNESIUM ZINC',
        ...ref('VINPHA'), category: 'Khoáng chất', ageGroup: 'Tất cả',
        weight: 'Hộp 4 vỉ x 10 viên', price: 320000,
        description: 'Hỗ trợ bổ sung calci, magnesium, biotin và kẽm cho cơ thể. Hỗ trợ duy trì sự chắc khỏe của xương và tóc',
        icon: '🦴',
      },
      {
        name: "CEMIO MOM'S VITAMINS",
        ...ref('VINPHA'), category: 'Vitamin', ageGroup: 'Nữ',
        weight: 'Hộp 4 vỉ x 10 viên', price: 370000,
        description: 'Bổ sung vitamin và khoáng chất cho phụ nữ mang thai và cho con bú',
        icon: '🤰',
      },

      // ── VP ─────────────────────────────────────────────────
      {
        name: 'LIVER PLUS VP',
        ...ref('VP'), category: 'Detox', ageGroup: 'Tất cả',
        weight: 'Hộp 4 vỉ x 10 viên', price: 220000,
        description: 'Hỗ trợ mát gan, giải độc gan. Hỗ trợ tăng cường chức năng gan',
        icon: '🫀',
      },
      {
        name: 'CENORVA NEW VP',
        ...ref('VP'), category: 'Tim mạch', ageGroup: 'Người già',
        weight: 'Hộp 3 vỉ x 10 viên', price: 170000,
        description: 'Hỗ trợ hoạt huyết, tăng tuần hoàn máu não. Hỗ trợ giảm các biểu hiện do thiếu năng tuần hoàn não',
        icon: '🧠',
      },
      {
        name: 'BIOFLEX VP',
        ...ref('VP'), category: 'Xương khớp', ageGroup: 'Người già',
        weight: 'Hộp 30 viên', price: 195000,
        description: 'Hỗ trợ làm trơn ổ khớp, hỗ trợ hạn chế lão hóa khớp. Hỗ trợ giảm triệu chứng đau khớp, khô khớp do viêm khớp, thoái hóa khớp',
        icon: '🦴',
      },
      {
        name: 'ENTERO BIO A5',
        ...ref('VP'), category: 'Probiotics', ageGroup: 'Tất cả',
        weight: 'Hộp 20 ống x 10ml', price: 198000,
        description: 'Bổ sung lợi khuẩn đường ruột. Hỗ trợ giảm các triệu chứng rối loạn tiêu hóa do loạn khuẩn đường ruột',
        icon: '🦠',
      },
      {
        name: 'CALNUTIL VP',
        ...ref('VP'), category: 'Khoáng chất', ageGroup: 'Tất cả',
        weight: 'Hộp 20 ống x 10ml', price: 165000,
        description: 'Bổ sung canxi và vitamin D3 cho cơ thể, hỗ trợ xương và răng chắc khỏe, hỗ trợ giảm nguy cơ còi xương ở trẻ em và loãng xương ở người lớn',
        icon: '🦷',
      },

      // ── FRESH QUEEN ────────────────────────────────────────
      {
        name: 'Fresh Queen Hương Bạc Hà',
        ...ref('FRQ'), category: 'Khác', ageGroup: 'Nữ',
        weight: 'Chai 250ml', price: 255000,
        description: 'Sản phẩm dung dịch phụ nữ giúp hỗ trợ phòng ngừa và điều trị các bệnh viêm nhiễm vùng âm đạo. Chiết xuất từ bạc hà giúp hỗ trợ kháng khuẩn và tránh các tình trạng viêm nhiễm',
        icon: '🌿',
      },
      {
        name: 'Fresh Queen Hương Hoa',
        ...ref('FRQ'), category: 'Khác', ageGroup: 'Nữ',
        weight: 'Chai 250ml', price: 255000,
        description: 'Sản phẩm dung dịch giúp hỗ trợ phòng ngừa và điều trị các bệnh viêm nhiễm vùng âm đạo. Chiết xuất từ các loại hoa giúp hỗ trợ kháng khuẩn và tránh các tình trạng viêm nhiễm',
        icon: '🌸',
      },

      // ── HERA ───────────────────────────────────────────────
      {
        name: 'PLACENTA ROYAL COLLAGEN 30000 PREMIUM',
        ...ref('HERA'), category: 'Làm đẹp', ageGroup: 'Nữ',
        weight: 'Hộp 10 chai x 50ml', price: 2050000,
        description: 'Thức uống bổ sung collagen và các chất dinh dưỡng cần thiết hỗ trợ làm đẹp da, hạn chế lão hóa',
        icon: '💎', badge: 'Hot', featured: true,
      },
      {
        name: 'Double Perfect Miracle Drink',
        ...ref('HERA'), category: 'Làm đẹp', ageGroup: 'Nữ',
        weight: '25ml x 1 viên nang x 10 ống/hộp', price: 1020000,
        description: 'Cung cấp Collagen và Elastin hỗ trợ da phòng ngừa và cải thiện các nếp nhăn, tăng độ đàn hồi cho da, tái tạo nền da khoẻ, trẻ hoá da giúp căng mịn, mờ nám, trắng da đều màu',
        icon: '✨', badge: 'Bán chạy', featured: true,
      },
      {
        name: 'HỒNG SÂM GINSENG ARA POWER',
        ...ref('HERA'), category: 'Tăng đề kháng', ageGroup: 'Tất cả',
        weight: 'Hộp 60 viên/lọ', price: 820000,
        description: 'Hỗ trợ tăng cường sức khỏe sinh lực, phòng ngừa đột quỵ, giảm mệt mỏi, tăng cường tuần hoàn máu và tăng trí nhớ',
        icon: '🌿',
      },
      {
        name: 'AN NGƯU CUNG HOÀNG HOÀN hộp 1 viên',
        ...ref('HERA'), category: 'Tim mạch', ageGroup: 'Người già',
        weight: '1 viên/hộp', price: 805000,
        description: 'Viên uống hỗ trợ phòng ngừa đột quỵ, tăng sức đề kháng, điều hòa tuần hoàn máu',
        icon: '❤️',
      },
      {
        name: 'AN NGƯU CUNG HOÀNG HOÀN hộp 3 viên',
        ...ref('HERA'), category: 'Tim mạch', ageGroup: 'Người già',
        weight: '3 viên/hộp', price: 2230000,
        description: 'Viên uống hỗ trợ phòng ngừa đột quỵ, tăng sức đề kháng, điều hòa tuần hoàn máu',
        icon: '❤️',
      },
      {
        name: 'DẦU LĂN XOA BÓP XƯƠNG KHỚP FIERY HOT',
        ...ref('HERA'), category: 'Xương khớp', ageGroup: 'Tất cả',
        weight: 'Chai 50ml', price: 110000,
        description: 'Hỗ trợ giảm đau cơ bắp và chấn thương cơ sau vận động. Thúc đẩy tuần hoàn máu, giảm nhanh đau nhức, tê thấp, đau lưng, cảm mạo',
        icon: '🔥',
      },
      {
        name: 'DẦU XOA BÓP XỊT LẠNH SPRAY',
        ...ref('HERA'), category: 'Xương khớp', ageGroup: 'Tất cả',
        weight: 'Chai 100ml', price: 120000,
        description: 'Sử dụng trực tiếp lên vùng cơ bắp bị đau nhức hoặc chấn thương, giảm sưng tức thời. Hỗ trợ giảm đau nhanh các cơn đau căng cơ, mỏi cơ, bong gân, bầm tím',
        icon: '❄️',
      },
    ];

    console.log(`📦 Chuẩn bị thêm ${products.length} sản phẩm...\n`);

    let added = 0, skipped = 0;
    for (const p of products) {
      const exists = await Product.findOne({ name: p.name });
      if (exists) {
        console.log(`⏭️  Bỏ qua (đã có): ${p.name}`);
        skipped++;
      } else {
        await new Product(p).save();
        console.log(`✅ Thêm: ${p.name}`);
        added++;
      }
    }

    console.log(`\n─────────────────────────────────`);
    console.log(`✅ Hoàn tất! Thêm mới: ${added} · Bỏ qua: ${skipped}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
};

run();
