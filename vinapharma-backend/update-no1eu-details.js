// Cập nhật chi tiết 18 sản phẩm No1EU từ catalogue
// Chạy: node update-no1eu-details.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Product = require('./models/Product');

const updates = [
  {
    name: 'Beauty Biocell Elixir',
    uses: '• Nuôi dưỡng và phục hồi làn da, chống lão hóa da sớm\n• Cung cấp độ ẩm, làm da trở nên rạng rỡ, săn chắc và đàn hồi hơn\n• Ngăn ngừa stress oxy hóa và giảm quá trình lão hóa da',
    dosage: '1 lọ/ngày sau khi ăn sáng',
    ingredients: 'Collagen thủy phân (Hydrolysed Collagen type I 5000mg), Hạt nho (chứa 95% OPC – Oligomeric Proanthocyanidin), Niacin (B3), Axit Hyaluronic, DNA & RNA, Snow Lotus Stem Cell, Vitamin E, Kẽm, Axit Panthothenic (B5), Vitamin B6, Riboflavin, Vitamin A, Selenium, Biotin, Vitamin B12',
    packaging: '14 lọ x 25ml'
  },
  {
    name: 'Track Support',
    uses: '• Giải quyết các triệu chứng liên quan đến nhiễm trùng đường tiết niệu\n• Ức chế sự hình thành màng sinh học và sự bám dính của vi khuẩn vào thành đường tiết niệu nhờ PAC từ nam việt quất và D-Mannose\n• Giảm nguy cơ tái phát nhiễm trùng đường tiết niệu (UTI)\n• Hỗ trợ hoạt động của hệ thống miễn dịch và cân bằng hoạt động oxy hóa thông qua Vitamin C, A, E và Kẽm',
    dosage: '1 lọ/ngày sau khi ăn sáng',
    ingredients: 'D-Mannose, Nam việt quất (chứa Proanthocyanidin – PAC), Kẽm (từ kẽm Gluconat), Vitamin C, Hà thủ ô, Hương thảo, Vitamin E, Vitamin A',
    packaging: '5 lọ x 10ml'
  },
  {
    name: 'Helpaid',
    uses: '• Tăng cường quá trình trao đổi chất, giúp cơ thể chuyển đổi chất béo thành năng lượng dễ dàng tiêu thụ\n• Hỗ trợ duy trì cân nặng ổn định, giảm nguy cơ tích tụ mỡ thừa\n• Cân bằng lượng lipid trong cơ thể, điều chỉnh hàm lượng mỡ trong máu hiệu quả\n• Đảm bảo sự hấp thụ dồi dào các chất dinh dưỡng từ thức ăn, hỗ trợ chức năng tiêu hóa',
    dosage: '1 lọ/ngày sau khi ăn sáng',
    ingredients: 'Yerba Mate, Fennel (Hồi hương), Guarana, Nước dừa, Chổi cây bách xù, Dịch nụ bạch dương, Trà xanh',
    packaging: '20 lọ x 10ml'
  },
  {
    name: 'Veins Aid',
    uses: '• Điều hòa trương lực mạch máu và duy trì sự co giãn của mạch máu\n• Ngăn ngừa biến đổi nội mạch máu và cục máu đông\n• Bảo vệ nội mô nhờ khả năng chống oxy hóa\n• Thành phần đa dạng, giàu dinh dưỡng hơn so với các loại thuốc tĩnh mạch khác trên thị trường',
    dosage: '1 lọ/ngày sau khi ăn sáng',
    ingredients: 'Cam đắng, Cây nham lê, Vitamin C, Taurine, L-Arginine, Niacin, Citri Bio Lavonoid, Kẽm, Vitamin E, β-Caroten, Ribo Lavin, Thiamine, Crom, Selen',
    packaging: '20 lọ x 10ml'
  },
  {
    name: 'Ginseng Royal 2000',
    uses: '• Hỗ trợ tăng cường hoạt động thể chất và tinh thần bằng cách phục hồi, nuôi dưỡng và cân bằng năng lượng\n• Bảo vệ các cơ quan hiệu quả nhờ sự kết hợp của nhân sâm, sữa ong chúa và Vitamin C\n• Điều chỉnh quá trình trao đổi chất và chống lại tác động oxy hóa\n• Cải thiện sức khỏe sinh lý nam giới',
    dosage: '1 lọ/ngày sau khi ăn sáng',
    ingredients: 'Sữa ong chúa, Tinh chất nhân sâm (chuẩn hóa tối thiểu 20% Ginsenosides), Vitamin C',
    packaging: '20 lọ x 10ml'
  },
  {
    name: 'Gluco Aid',
    uses: '• Hỗ trợ điều chỉnh chỉ số đường huyết về mức bình thường\n• Quế tái tạo Insulin, điều hòa hấp thu Glucose, tổng hợp Glycogen và cân bằng thành phần Lipid\n• Vitamin C, E và β-Caroten giảm đáng kể sự giải phóng các gốc tự do, chống oxy hóa và bảo vệ các cơ quan nội tạng\n• Crom giúp tăng độ nhạy cảm với hoạt động của Insulin và giảm trọng lượng cơ thể',
    dosage: '1 viên/ngày sau khi ăn sáng',
    ingredients: 'Quế (Cinnamon Extract 1000mg), Vitamin C, Vitamin E, β-Caroten, Crom (Chromium 150mg)',
    packaging: '1 hộp / 30 viên nang rau củ'
  },
  {
    name: 'Focus+Memo',
    uses: '• Tăng khả năng tập trung\n• Cải thiện trí nhớ\n• Giúp ổn định hoạt động não bộ\n• Tăng khả năng tiếp nhận và xử lý thông tin não bộ',
    dosage: '1 viên mỗi ngày sau khi ăn\n(Đối với những ai mẫn cảm với các sản phẩm từ ong, vui lòng hỏi ý kiến bác sĩ trước khi sử dụng)',
    ingredients: 'Sữa ong chúa cô đặc 100mg (≈ 300mg sữa ong chúa), Nhân sâm Hàn Quốc 100mg, Soybean Lecithin 100mg, Dicalcium Phosphate 100mg',
    packaging: '1 hộp / 30 viên'
  },
  {
    name: 'Krill Ocean',
    uses: '• Hỗ trợ tăng cường tuần hoàn máu, giảm cholesterol, bảo vệ sức khỏe tim mạch\n• Hỗ trợ ngăn ngừa tình trạng mỡ máu cao, duy trì chức năng gan khỏe mạnh\n• Hỗ trợ cải thiện trí nhớ, khả năng tập trung, giảm căng thẳng, mệt mỏi trí não\n• Hỗ trợ tăng cường thị lực\n• Hỗ trợ chống oxy hoá',
    dosage: '2 viên/ngày (uống cùng bữa ăn)',
    ingredients: 'Fish Oil 235mg, Krill Oil 165mg, Soy Lecithin 120mg\n(Cung cấp 118.4mg DHA, 43.3mg EPA, 82mg Phospholipids và 9.5mg Choline)',
    packaging: '1 hộp / 60 viên nang'
  },
  {
    name: 'Vitaline A',
    uses: '• Tăng tốc đổi mới tế bào\n• Tăng cường miễn dịch\n• Duy trì hoạt động của các mô bề mặt\n• Phát triển thị lực\n• Ngăn ngừa nhiễm trùng',
    dosage: '1 viên mỗi ngày sau khi ăn\n(Dành cho người trên 15 tuổi)',
    ingredients: 'Vitamin A (Retinyl Palmitate) 2.75mg RE (5000 IU)',
    packaging: '1 lọ x 120 viên'
  },
  {
    name: 'Vitaline C',
    uses: '• Chống oxy hóa, gốc tự do\n• Giúp giảm stress và hỗ trợ làm sáng da\n• Tăng sức đề kháng, ngăn ngừa cảm cúm\n• Tỉnh táo và giảm tình trạng mệt mỏi\n• Giúp tăng sinh collagen, trẻ hoá da và cải thiện sức khỏe sụn khớp',
    dosage: '1 viên mỗi ngày sau khi ăn sáng',
    ingredients: 'Vitamin C (L-Ascorbic Acid) 1000mg',
    packaging: '1 lọ x 60 viên'
  },
  {
    name: 'Vitaline D3',
    uses: '• Tăng khả năng hấp thu Canxi để xương và răng chắc khỏe\n• Ngăn ngừa chuột rút, mệt mỏi cơ thể\n• Tăng cường khả năng miễn dịch',
    dosage: '1 viên mỗi ngày sau khi ăn\n(Dành cho người trên 4 tuổi)',
    ingredients: 'Vitamin D3 (Cholecalciferol) 4000 IU',
    packaging: '1 lọ x 120 viên'
  },
  {
    name: 'Vitaline Mg',
    uses: '• Hỗ trợ tăng chất lượng giấc ngủ\n• Giúp xương chắc khỏe, ổn định đường huyết\n• Giảm nguy cơ đột quỵ, bảo vệ tim mạch\n• Giảm căng cơ, chuột rút\n• Giảm căng thẳng thần kinh, stress, dấu hiệu trầm cảm\n• Tăng cường sức khỏe thể chất, đẩy nhanh tiến độ phục hồi cơ',
    dosage: '1 viên mỗi ngày sau khi ăn sáng\n(Dành cho người trên 18 tuổi)',
    ingredients: 'Magie/Magnesium Glycinate 375mg',
    packaging: '1 lọ x 60 viên'
  },
  {
    name: 'Vitaline Se',
    uses: '• Hỗ trợ điều hòa hormon tuyến giáp (nội tiết)\n• Chống oxy hoá, chống gốc tự do\n• Cải thiện sức khỏe sinh sản\n• Giúp tóc và móng phát triển khỏe mạnh',
    dosage: '1 viên mỗi ngày sau khi ăn\n(Dành cho người trên 12 tuổi)',
    ingredients: 'Selenium (Sodium Selenite) 200μg',
    packaging: '1 lọ x 60 viên'
  },
  {
    name: 'Vitaline Zn',
    uses: '• Giúp vết thương mau lành, điều trị mụn, ngăn ngừa tiêu chảy\n• Cải thiện sức khỏe sinh lý cho bệnh nhân hiếm muộn, tinh trùng yếu\n• Tăng khả năng tập trung, cải thiện hoạt động thần kinh\n• Giúp cơ bắp và xương khớp phát triển khỏe mạnh\n• Giúp tóc phát triển khỏe mạnh\n• Chống lại các phản ứng viêm',
    dosage: '1 viên mỗi ngày sau khi ăn\n(Dành cho người trên 18 tuổi)',
    ingredients: 'Zinc (Zinc Citrate) 25mg',
    packaging: '1 lọ x 60 viên'
  },
  {
    name: 'Kids Royal Jelly',
    uses: '• Cung cấp năng lượng hoạt động hàng ngày nhờ sữa ong chúa giàu dinh dưỡng\n• Vitamin B tổng hợp hỗ trợ quá trình phát triển và trưởng thành của hệ thần kinh, cùng hệ thống miễn dịch\n• Vitamin C và E bảo vệ cơ thể nhờ khả năng chống oxy hóa\n• Vitamin A và D giúp cải thiện thị lực và khoáng hóa xương',
    dosage: 'Trẻ em từ 5–12 tuổi: 5ml/ngày\nTrẻ em từ 12 tuổi trở lên: 10ml/ngày',
    ingredients: 'Sữa ong chúa, Vitamin C, Niacin (B3), Vitamin E, Axit Pantothenic (B5), Vitamin B6, Riboflavin (B2), Thiamine (B1), Vitamin A, Axit Folic, Biotin, Vitamin D, Vitamin B12',
    packaging: '125ml/hộp – Hương vị trái cây rừng (không màu nhân tạo)'
  },
  {
    name: 'Smart Kids',
    uses: '• Góp phần cải thiện hoạt động của chức năng tim và thần kinh\n• Bổ sung Omega-3 giúp hỗ trợ tăng trưởng và phát triển ở trẻ em\n• Hỗ trợ bảo vệ tim mạch, điều hòa cholesterol và huyết áp\n• Tăng cường trí nhớ, khả năng học tập',
    dosage: 'Trẻ em từ 4–8 tuổi: 1.25ml/ngày\nTrẻ em từ 9–11 tuổi: 2.5ml/ngày\nTrẻ em từ 12 tuổi trở lên: 5ml/ngày',
    ingredients: 'Axit béo Omega-3, Axit Eicosapentaenoic (EPA), Axit Docosahexaenoic (DHA), Axit béo Omega-3 khác',
    packaging: '125ml/hộp – Hương chanh'
  },
  {
    name: 'Special Kids',
    uses: '• Hỗ trợ tăng cường nhận thức, khả năng ghi nhớ và học tập\n• Với Vitamin C giúp bảo vệ cơ thể và chống oxy hóa\n• Giúp duy trì thị lực khỏe mạnh và chắc khỏe xương với Vitamin A, D\n• Cung cấp 100% Vitamin theo giá trị tham chiếu dinh dưỡng (NRV)',
    dosage: 'Trẻ sơ sinh đến 3 tuổi: 7 giọt (0.25ml)/ngày\nTrẻ em từ 4–6 tuổi: 14 giọt (0.5ml)/ngày\nTrẻ em từ 7–9 tuổi: 18 giọt/ngày\nTrẻ em từ 10–18 tuổi: 28 giọt (1ml)/ngày',
    ingredients: 'Vitamin C, Niacin (B3), Vitamin B6, Thiamine (B1), Vitamin A, Vitamin D',
    packaging: '30ml/hộp – Dạng ống nhỏ giọt tiện dụng'
  },
  {
    name: 'K2D3 Drops',
    uses: '• Cung cấp Vitamin K2 và D3 ở dạng dễ hấp thu và ổn định\n• Tăng chiều cao và bổ sung Canxi, chắc răng\n• Giúp giảm nguy cơ gãy xương và hỗ trợ sức khỏe tim mạch\n• Tăng mật độ xương lên 4%, vùng thắt lưng lên đến hơn 40%\n• Cải thiện chuyển hóa xương 28% ở trẻ em mắc bệnh về xương',
    dosage: 'Liều khuyến nghị: 0.5ml/ngày',
    ingredients: 'Vitamin K2 (Menaquinone-7), Vitamin D3 (Cholecalciferol)',
    packaging: '30ml/hộp – Dạng ống nhỏ giọt, dễ uống và dễ sử dụng'
  }
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công');

    let updated = 0, notFound = 0;

    for (const u of updates) {
      const result = await Product.updateOne(
        { name: u.name },
        { $set: { uses: u.uses, dosage: u.dosage, ingredients: u.ingredients, packaging: u.packaging } }
      );
      if (result.matchedCount > 0) {
        console.log(`✅ Cập nhật: ${u.name}`);
        updated++;
      } else {
        console.log(`❌ Không tìm thấy: ${u.name}`);
        notFound++;
      }
    }

    console.log(`\n📦 Xong! Cập nhật: ${updated}, Không tìm thấy: ${notFound}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
};

run();
