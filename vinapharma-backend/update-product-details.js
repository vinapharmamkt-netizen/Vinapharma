// Cập nhật thông tin chi tiết sản phẩm từ bảng báo giá
// Chạy: node update-product-details.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Product = require('./models/Product');

const updates = [
  // ── EU VISION ───────────────────────────────────────────────
  {
    name: 'MAS CALCI DK2',
    uses: '• Bổ sung canxi hữu cơ, Vitamin D3, K2, Magie, Kẽm cho trẻ em trong quá trình phát triển\n• Hỗ trợ xương và răng chắc khỏe\n• Hỗ trợ giảm nguy cơ còi xương ở trẻ em',
    packaging: 'Hộp 1 chai 150ml',
    dosage: 'Dùng theo hướng dẫn của bác sĩ hoặc nhà sản xuất',
  },
  {
    name: 'VIÊN ĐẶT ÂM ĐẠO VITREX PLUS',
    uses: '• Giúp kháng viêm, kháng nấm\n• Cải thiện tình trạng khô hạn, cân bằng môi trường âm đạo\n• Dùng được cho phụ nữ đang mang thai, cho con bú, sau sinh, sau phẫu thuật phụ khoa',
    packaging: 'Hộp 1 vỉ x 7 viên',
    dosage: 'Dùng theo chỉ dẫn của bác sĩ',
  },
  {
    name: 'ISOPLUS-ZT',
    uses: '• Giúp cân bằng nội tiết tố nữ\n• Giảm sạn da, nám, tàn nhang\n• Giúp làm đẹp da, cải thiện sinh lý',
    packaging: 'Hộp 2 vỉ x 15 viên nang mềm',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'MUMMACAL-ZT',
    uses: '• Viên uống bổ sung Canxi hữu cơ chiết xuất thực vật từ tảo biển đỏ Bắc Ireland\n• Hỗ trợ xương và răng chắc khỏe\n• Phù hợp cho phụ nữ mang thai và cho con bú',
    packaging: 'Hộp 2 vỉ x 15 viên nang mềm',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'MUMFOLATE DIAMOND',
    uses: '• Viên uống bổ sung sắt hữu cơ Bisglycinate và acid Folate\n• Hỗ trợ giảm nguy cơ thiếu máu do thiếu sắt\n• Phù hợp cho phụ nữ mang thai và cho con bú',
    packaging: 'Hộp 2 vỉ x 15 viên nang mềm',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'EPO QUEEN',
    uses: '• Sản phẩm bổ sung nội tiết tố nữ\n• Hỗ trợ cân bằng hormone\n• Phù hợp cho phụ nữ ở độ tuổi tiền mãn kinh và mãn kinh',
    packaging: 'Hộp 2 vỉ x 15 viên nang mềm',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'MAS MULTIGLUCAN',
    uses: '• Bổ sung sắt hữu cơ (Bisglycinate), Kẽm, Các vitamin và khoáng chất, Betaglucan\n• Giúp tăng khả năng sinh sản hồng cầu hemoglobin\n• Hỗ trợ tăng cường sức đề kháng',
    packaging: 'Hộp 1 chai 150ml',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'Clover FOLATE',
    uses: '• Bổ sung Acid Folic cho phụ nữ trước, trong và sau sinh\n• Hỗ trợ phát triển hệ thần kinh thai nhi\n• Phù hợp cho phụ nữ đang cho con bú',
    packaging: 'Hộp 30 viên nang mềm',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'Clover DHA',
    uses: '• Bổ sung DHA, EPA từ gan cá tuyết\n• Hỗ trợ phát triển não bộ và thị lực\n• Phù hợp cho phụ nữ mang thai, sau sinh, cho con bú, người trưởng thành',
    packaging: 'Hộp 30 viên nang mềm',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },

  // ── VINPHARMA ───────────────────────────────────────────────
  {
    name: 'VINCOOL',
    uses: '• Hỗ trợ nhuận phế, giảm đờm, giảm ho\n• Giúp hạn chế biểu hiện hắt hơi, chảy nước mũi do cảm lạnh',
    packaging: 'Hộp 8 vỉ x 10 viên',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'SUPER BABY',
    uses: '• Bổ sung Thymomodulin, L-Lysine và Enzyme tiêu hóa\n• Hỗ trợ tăng cường sức đề kháng\n• Giúp ăn ngon miệng, cải thiện triệu chứng và giảm nguy cơ viêm đường hô hấp do sức đề kháng kém',
    packaging: 'Hộp 12 túi x 10ml',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'BỔ PHỔI',
    uses: '• Hỗ trợ bổ phổi, giảm ho, giảm đờm\n• Hỗ trợ giảm đau rát họng, khàn tiếng do viêm họng, viêm phế quản',
    packaging: 'Hộp 3 vỉ x 10 viên',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'MINUS TC',
    uses: '• Hỗ trợ giảm ho, giảm đờm do viêm phế quản',
    packaging: 'Hộp 1 chai 30ml',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'GEL VỆ SINH QUEEN LOVE Hương Hoa Hồng',
    uses: '• Chăm sóc và làm sạch vùng kín hàng ngày\n• Khử mùi hôi, ngăn ngừa viêm, ngứa\n• Duy trì ổn định độ PH vùng kín',
    packaging: 'Chai 100ml',
    dosage: 'Dùng ngoài da, rửa vùng kín hàng ngày',
  },
  {
    name: 'GEL VỆ SINH QUEEN LOVE Hương Hoa Nhài',
    uses: '• Chăm sóc và làm sạch vùng kín hàng ngày\n• Khử mùi hôi, ngăn ngừa viêm, ngứa\n• Duy trì ổn định độ PH vùng kín',
    packaging: 'Chai 100ml',
    dosage: 'Dùng ngoài da, rửa vùng kín hàng ngày',
  },
  {
    name: 'FE TC',
    uses: '• Bổ sung sắt và acid folic cho cơ thể\n• Hỗ trợ giảm nguy cơ thiếu máu do thiếu sắt và acid folic',
    packaging: 'Hộp 1 chai 30ml',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'TRINH NỮ ĐAN 60 viên',
    uses: '• Hỗ trợ giảm sự phát triển của u xơ\n• Giúp giảm u xơ tử cung ở phụ nữ và u xơ tiền liệt tuyến ở nam giới',
    packaging: 'Hộp 1 lọ 60 viên',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'TRINH NỮ ĐAN 30 viên',
    uses: '• Hỗ trợ giảm sự phát triển của u xơ tử cung ở phụ nữ\n• Hỗ trợ giảm u xơ tiền liệt tuyến ở nam giới',
    packaging: 'Hộp 3 vỉ x 10 viên',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'BỔ MẮT NÃO BRAIN EYES',
    uses: '• Hỗ trợ tốt cho não bộ và thị lực\n• Hỗ trợ cải thiện trí nhớ và sức tập trung',
    packaging: 'Hộp 20 gói x 10ml',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'D3 TC',
    uses: '• Giúp bổ sung vitamin D3 cho cơ thể\n• Hỗ trợ tăng cường hấp thu canxi vào xương\n• Hỗ trợ giảm nguy cơ còi xương ở trẻ, loãng xương ở người lớn do thiếu vitamin D3',
    packaging: 'Hộp 1 chai 30ml',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'ĐÔNG TRÙNG HẠ THẢO',
    uses: '• Hỗ trợ tăng cường sức khỏe, giảm mệt mỏi\n• Hỗ trợ tăng cường sinh lực và sức đề kháng',
    packaging: 'Hộp 2 lọ x 30 viên',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'ĐẠI TRÀNG VINPHARMA',
    uses: '• Hỗ trợ các triệu chứng rối loạn tiêu hóa do viêm đại tràng',
    packaging: 'Hộp 10 ống x 10ml',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'CEMIO CALCI MAGNESIUM ZINC',
    uses: '• Hỗ trợ bổ sung calci, magnesium, biotin và kẽm cho cơ thể\n• Hỗ trợ duy trì sự chắc khỏe của xương và tóc',
    packaging: 'Hộp 4 vỉ x 10 viên',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: "CEMIO MOM'S VITAMINS",
    uses: '• Bổ sung vitamin và khoáng chất cho phụ nữ mang thai và cho con bú\n• Hỗ trợ sức khỏe mẹ và sự phát triển của thai nhi',
    packaging: 'Hộp 4 vỉ x 10 viên',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },

  // ── VP ──────────────────────────────────────────────────────
  {
    name: 'LIVER PLUS VP',
    uses: '• Hỗ trợ mát gan, giải độc gan\n• Hỗ trợ tăng cường chức năng gan',
    packaging: 'Hộp 4 vỉ x 10 viên',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'CENORVA NEW VP',
    uses: '• Hỗ trợ hoạt huyết, tăng tuần hoàn máu não\n• Hỗ trợ giảm các biểu hiện do thiếu năng tuần hoàn não',
    packaging: 'Hộp 3 vỉ x 10 viên',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'BIOFLEX VP',
    uses: '• Hỗ trợ làm trơn ổ khớp, hỗ trợ hạn chế lão hóa khớp\n• Hỗ trợ giảm triệu chứng đau khớp, khô khớp do viêm khớp, thoái hóa khớp',
    packaging: 'Hộp 30 viên',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'ENTERO BIO A5',
    uses: '• Bổ sung lợi khuẩn đường ruột\n• Hỗ trợ giảm các triệu chứng rối loạn tiêu hóa do loạn khuẩn đường ruột',
    packaging: 'Hộp 20 ống x 10ml',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'CALNUTIL VP',
    uses: '• Bổ sung canxi và vitamin D3 cho cơ thể\n• Hỗ trợ xương và răng chắc khỏe\n• Hỗ trợ giảm nguy cơ còi xương ở trẻ em và loãng xương ở người lớn\n• Giúp giảm nguy cơ thiếu hụt canxi ở phụ nữ mang thai và cho con bú',
    packaging: 'Hộp 20 ống x 10ml',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },

  // ── FRESH QUEEN ─────────────────────────────────────────────
  {
    name: 'Fresh Queen Hương Bạc Hà',
    uses: '• Hỗ trợ phòng ngừa và điều trị các bệnh viêm nhiễm vùng âm đạo\n• Hỗ trợ các bệnh liên quan đến phụ khoa\n• Chiết xuất từ bạc hà giúp hỗ trợ kháng khuẩn và tránh các tình trạng viêm nhiễm',
    packaging: 'Chai 250ml',
    dosage: 'Dùng ngoài, vệ sinh hàng ngày',
  },
  {
    name: 'Fresh Queen Hương Hoa',
    uses: '• Hỗ trợ phòng ngừa và điều trị các bệnh viêm nhiễm vùng âm đạo\n• Hỗ trợ các bệnh liên quan đến phụ khoa\n• Chiết xuất từ các loại hoa giúp hỗ trợ kháng khuẩn và tránh các tình trạng viêm nhiễm',
    packaging: 'Chai 250ml',
    dosage: 'Dùng ngoài, vệ sinh hàng ngày',
  },

  // ── HERA ────────────────────────────────────────────────────
  {
    name: 'PLACENTA ROYAL COLLAGEN 30000 PREMIUM',
    uses: '• Thức uống bổ sung collagen và các chất dinh dưỡng cần thiết\n• Hỗ trợ làm đẹp da, hạn chế lão hóa\n• Giúp da căng mịn, mờ nám, trắng da đều màu',
    packaging: 'Hộp 10 chai x 50ml',
    dosage: 'Uống 1 chai/ngày vào buổi sáng hoặc tối',
  },
  {
    name: 'Double Perfect Miracle Drink',
    uses: '• Cung cấp Collagen và Elastin hỗ trợ da phòng ngừa và cải thiện hiệu quả các nếp nhăn\n• Tăng độ đàn hồi cho da, tái tạo nền da khoẻ, trẻ hoá da giúp căng mịn, mờ nám, trắng da đều màu\n• Hỗ trợ cấp ẩm cho da, loại bỏ tình trạng thô ráp và các vấn đề sắc tố trên da\n• Hỗ trợ điều trị và cải thiện các vấn đề xương khớp như thoái hoá, viêm khớp, khô khớp\n• Hỗ trợ tăng cường độ ẩm cho võng mạc, phòng ngừa khô võng mạc, mỏi mắt\n• Hỗ trợ mái tóc và móng chắc khỏe\n• Cung cấp các khoáng chất cần thiết, phòng ngừa quá trình oxy hoá và gốc tự do trong cơ thể',
    packaging: '25ml x 1 viên nang x 10 ống/hộp',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'HỒNG SÂM GINSENG ARA POWER',
    uses: '• Hỗ trợ tăng cường sức khỏe sinh lực\n• Phòng ngừa đột quỵ, giảm mệt mỏi\n• Tăng cường tuần hoàn máu và tăng trí nhớ\n• Hỗ trợ tăng cường sức đề kháng',
    packaging: 'Hộp 60 viên/lọ',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất',
  },
  {
    name: 'AN NGƯU CUNG HOÀNG HOÀN hộp 1 viên',
    uses: '• Viên uống hỗ trợ phòng ngừa đột quỵ\n• Tăng sức đề kháng, điều hòa tuần hoàn máu',
    packaging: '1 viên/hộp',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất hoặc bác sĩ',
  },
  {
    name: 'AN NGƯU CUNG HOÀNG HOÀN hộp 3 viên',
    uses: '• Viên uống hỗ trợ phòng ngừa đột quỵ\n• Tăng sức đề kháng, điều hòa tuần hoàn máu',
    packaging: '3 viên/hộp',
    dosage: 'Dùng theo hướng dẫn của nhà sản xuất hoặc bác sĩ',
  },
  {
    name: 'DẦU LĂN XOA BÓP XƯƠNG KHỚP FIERY HOT',
    uses: '• Hỗ trợ giảm đau nhanh chóng các cơn đau căng cơ, mỏi cơ, bong gân, bầm tím\n• Hỗ trợ giảm đau cơ bắp và chấn thương cơ sau vận động, người chơi thể thao\n• Thúc đẩy tuần hoàn máu, giảm nhanh đau nhức, tê thấp, đau lưng, cảm mạo, cúm',
    packaging: 'Chai 50ml',
    dosage: 'Làm sạch và lau khô vùng da cần xoa bóp. Lấy một lượng dầu vừa phải thoa vào vùng đau nhức, massage đều từ 1–2 phút cho hoạt chất thấm sâu vào da',
    ingredients: 'Xem trên bao bì. Xuất xứ: Hàn Quốc',
  },
  {
    name: 'DẦU XOA BÓP XỊT LẠNH SPRAY',
    uses: '• Sử dụng trực tiếp lên vùng cơ bắp bị đau nhức hoặc chấn thương, giảm sưng tức thời\n• Hỗ trợ giảm đau nhanh chóng các cơn đau căng cơ, mỏi cơ, bong gân, bầm tím\n• Hỗ trợ giảm đau cơ bắp và chấn thương cơ sau vận động, người chơi thể thao\n• Thúc đẩy tuần hoàn máu, giảm nhanh đau nhức, tê thấp, đau lưng, cảm mạo, cúm',
    packaging: 'Chai 100ml',
    dosage: 'Làm sạch và lau khô vùng da cần xoa bóp. Xịt trực tiếp vào vùng đau nhức, massage đều từ 1–2 phút cho hoạt chất thấm sâu vào da',
    ingredients: 'Xem trên bao bì. Xuất xứ: Hàn Quốc',
  },
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công\n');

    let updated = 0, notFound = 0;

    for (const u of updates) {
      const { name, ...fields } = u;
      const result = await Product.findOneAndUpdate(
        { name },
        { $set: fields },
        { new: true }
      );
      if (result) {
        console.log(`✅ Cập nhật: ${name}`);
        updated++;
      } else {
        console.log(`⚠️  Không tìm thấy: ${name}`);
        notFound++;
      }
    }

    console.log(`\n─────────────────────────────────`);
    console.log(`✅ Hoàn tất! Cập nhật: ${updated} · Không tìm thấy: ${notFound}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
};

run();
