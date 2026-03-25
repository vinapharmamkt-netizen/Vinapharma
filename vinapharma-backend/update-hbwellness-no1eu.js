/**
 * Cập nhật thông tin HB Wellness (26 sản phẩm) + No1EU (18 sản phẩm)
 * Chạy: node update-hbwellness-no1eu.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

const productInfo = [
  // ── HB Wellness ──────────────────────────────────────────────────────────
  {
    name: 'Ginseng And Pomegranate Drink',
    uses: 'Hỗ trợ tăng sinh collagen và hỗ trợ chống lão hóa từ bên trong. Hỗ trợ làm đẹp da, cải thiện sinh lý nữ và giảm stress nhờ sự kết hợp hồng sâm và nước lựu đỏ.',
    dosage: 'Người lớn: 1–2 gói/ngày. Mỗi lần 1 gói, nhai kỹ khi sử dụng.',
    ingredients: 'Hồng sâm cô đặc 6 năm tuổi, nước lựu đỏ cô đặc. Xuất xứ Hàn Quốc 100%.',
    packaging: 'Hộp 100 ml (10 ml x 10 gói).'
  },
  {
    name: 'Red Ginseng Essence',
    uses: 'Hỗ trợ cải thiện sức khỏe tổng thể, tăng cường sinh lực và hỗ trợ chức năng sinh lý. Hỗ trợ hệ miễn dịch, tăng cường trí nhớ và khả năng tập trung.',
    dosage: 'Người lớn: 1–2 gói/ngày. Mỗi lần 1 gói, nhai kỹ khi sử dụng.',
    ingredients: 'Nhân sâm cô đặc, mật ong Seyang, hỗn hợp thực vật cô đặc, chất xơ rau diếp xoăn, mật hoa Agave, dưa chuột lên men. Xuất xứ Hàn Quốc.',
    packaging: 'Hộp 100 ml (10 ml x 10 gói).'
  },
  {
    name: 'Red Ginseng Drink For Kids',
    uses: 'Hỗ trợ tăng cường hệ miễn dịch và sức đề kháng cho trẻ. Hỗ trợ phát triển trí não, cải thiện sức khỏe đường ruột và hỗ trợ phát triển chiều cao.',
    dosage: 'Dành cho trẻ từ 2–9 tuổi: 1 gói/ngày.',
    ingredients: 'Chiết xuất hồng sâm 0,2%, chiết xuất hồng sâm lên men 1,8%, Vitamin C, Bifidobacterium, chiết xuất táo tàu 0,6%, chiết xuất hạt bưởi.',
    packaging: 'Hộp 100 ml (10 ml x 10 gói).'
  },
  {
    name: 'Korean One Ginseng Tea',
    uses: 'Hỗ trợ chống lão hóa, cải thiện hệ tiêu hóa và tăng cường tuần hoàn máu. Hỗ trợ làm đẹp da và cải thiện sức khỏe toàn diện.',
    dosage: 'Mỗi ngày 2–3 lần, mỗi lần 1 gói pha với nước ấm.',
    ingredients: 'Saponin 4,5 mg/g, Glucose Anhydrocrystalline 88%, chiết xuất táo đỏ 2% và các dưỡng chất thảo dược Hàn Quốc.',
    packaging: 'Hộp 50 gói.'
  },
  {
    name: 'Black Garlic Drink',
    uses: 'Hỗ trợ sức khỏe tim mạch và hỗ trợ giảm mỡ máu nhờ polyphenol và acid amin từ tỏi đen Hàn Quốc. Hỗ trợ ổn định huyết áp và tăng cường sức đề kháng tự nhiên.',
    dosage: 'Người lớn: 1–2 gói/ngày, uống sau khi ăn 30 phút. Không uống vào buổi tối muộn.',
    ingredients: 'Chiết xuất tỏi đen Hàn Quốc 90%, táo đỏ Hàn Quốc, quả Hovenia dulcis, đường Fructose, oligosaccharides.',
    packaging: 'Hộp 30 gói x 60 ml.'
  },
  {
    name: 'Pomegranate Juice',
    uses: 'Hỗ trợ tăng cường miễn dịch và hỗ trợ sức khỏe tim mạch. Hỗ trợ chống lão hóa, giúp da sáng mịn và cải thiện chất lượng giấc ngủ nhờ antioxidant từ lựu.',
    dosage: 'Có thể uống 1–2 gói/ngày tùy theo nhu cầu.',
    ingredients: '100% nước ép lựu nguyên chất Hàn Quốc.',
    packaging: 'Hộp 30 gói x 100 ml.'
  },
  {
    name: 'Korean Honeyed Red Ginseng 450g',
    uses: 'Hỗ trợ chống lão hóa, tăng cường thể lực và giảm mệt mỏi. Hỗ trợ ổn định huyết áp, hỗ trợ giảm cholesterol và cải thiện tuần hoàn máu, trí nhớ.',
    dosage: 'Ngày dùng 2–3 lần. Có thể ăn nguyên củ hoặc cắt nhỏ, ngậm hoặc pha trà.',
    ingredients: 'Hồng sâm nguyên củ Hàn Quốc 6 năm tuổi tẩm mật ong nội địa Hàn Quốc.',
    packaging: 'Hộp 450 g (30 g x 15 củ).'
  },
  {
    name: 'Korean Honeyed Red Ginseng 220g',
    uses: 'Hỗ trợ chống lão hóa, tăng cường thể lực và giảm mệt mỏi. Hỗ trợ ổn định huyết áp, hỗ trợ giảm cholesterol và cải thiện tuần hoàn máu, trí nhớ.',
    dosage: 'Ngày dùng 2–3 lần. Có thể ăn nguyên củ hoặc cắt nhỏ, ngậm hoặc pha trà.',
    ingredients: 'Hồng sâm nguyên củ Hàn Quốc 6 năm tuổi tẩm mật ong nội địa Hàn Quốc.',
    packaging: 'Hộp 220 g (22 g x 10 củ).'
  },
  {
    name: 'Slice Korea Red Ginseng',
    uses: 'Hỗ trợ cải thiện tình trạng mất ngủ và tăng cường trí nhớ. Hỗ trợ ổn định huyết áp, tăng cường miễn dịch và bồi bổ sức khỏe toàn diện.',
    dosage: 'Dùng 2–3 lần/ngày, mỗi lần 1 lát. Có thể nhai, ngậm hoặc ngâm nước nóng 10 phút rồi uống.',
    ingredients: 'Nhân sâm nguyên chất 100% và mật ong Hàn Quốc.',
    packaging: 'Hộp 20 g x 10 hộp nhỏ.'
  },
  {
    name: 'Honeyed Korean Red Ginseng Slices',
    uses: 'Hỗ trợ cải thiện tình trạng mất ngủ và tăng cường trí nhớ. Hỗ trợ ổn định huyết áp, tăng cường miễn dịch và bồi bổ sức khỏe toàn diện.',
    dosage: 'Dùng 2–3 lần/ngày, mỗi lần 1 lát. Có thể nhai, ngậm hoặc ngâm nước nóng 10 phút rồi uống.',
    ingredients: 'Chiết xuất hồng sâm Hàn Quốc hàm lượng Saponin cao và mật ong.',
    packaging: 'Hộp 2 g/gói (10 gói/hộp).'
  },
  {
    name: 'Korean Red Ginseng Root 300g',
    uses: 'Hỗ trợ tăng cường hệ miễn dịch, giảm mệt mỏi và cải thiện trí nhớ. Hỗ trợ cải thiện chất lượng giấc ngủ và cung cấp năng lượng cho cơ thể.',
    dosage: 'Dùng trực tiếp 2–3 lát sau tập thể dục hoặc khi mệt mỏi. Có thể pha trà cùng 2–3 lát nhân sâm.',
    ingredients: '100% hồng sâm 6 năm tuổi Hàn Quốc (không đường, không hương liệu, không chất bảo quản).',
    packaging: 'Hộp 300 g.'
  },
  {
    name: 'Korean Red Ginseng Root 150g',
    uses: 'Hỗ trợ tăng cường hệ miễn dịch, giảm mệt mỏi và cải thiện trí nhớ. Hỗ trợ cải thiện chất lượng giấc ngủ và cung cấp năng lượng cho cơ thể.',
    dosage: 'Dùng trực tiếp 2–3 lát sau tập thể dục hoặc khi mệt mỏi. Có thể pha trà cùng 2–3 lát nhân sâm.',
    ingredients: '100% hồng sâm 6 năm tuổi Hàn Quốc (không đường, không hương liệu, không chất bảo quản).',
    packaging: 'Hộp 150 g.'
  },
  {
    name: 'Triple Red Ginseng Pill',
    uses: 'Hỗ trợ cải thiện lưu lượng máu, tăng cường trí nhớ và hỗ trợ chống oxy hóa. Hỗ trợ tăng cường miễn dịch và giảm mệt mỏi, đặc biệt phù hợp cho người cao tuổi.',
    dosage: 'Người lớn: 1 viên/ngày, nhai kỹ rồi nuốt.',
    ingredients: '100% hồng sâm và các thảo dược Hàn Quốc thượng hạng.',
    packaging: 'Hộp 30 viên x 3,75 g.'
  },
  {
    name: 'Korean Red Ginseng Capsule',
    uses: 'Hỗ trợ bồi bổ sức khỏe, nâng cao sức đề kháng và tăng cường khí huyết. Hỗ trợ thải độc gan và tăng cường hấp thu dưỡng chất, giúp cơ thể phục hồi nhanh chóng.',
    dosage: 'Uống 2 lần/ngày, mỗi lần 2 viên với nước ấm.',
    ingredients: 'Hồng sâm Hàn Quốc 6 năm tuổi, nhung hươu, nấm linh chi Young Ji, Vitamin B2, Vitamin C, sữa ong chúa, dầu đậu nành, tocopherol.',
    packaging: 'Hộp sắt 120 viên x 830 mg.'
  },
  {
    name: 'Chim Hyangdan Gold',
    uses: 'Hỗ trợ tuần hoàn máu não và hỗ trợ ổn định hoạt động mạch máu. Hỗ trợ thanh nhiệt, tỉnh táo và ổn định thần kinh theo y học cổ truyền Hàn Quốc. Không dùng cho phụ nữ mang thai.',
    dosage: 'Người lớn: 1 viên/ngày.',
    ingredients: 'Trầm hương Indonesia, đương quy, mẫu đơn, địa hoàng, cam thảo, quế, táo đỏ, doraji, ngũ vị tử, lộc nhung, hồng sâm, mật ong, glycerin và các thảo dược Đông y.',
    packaging: 'Hộp 30 viên.'
  },
  {
    name: 'Ginseng Ara Power',
    uses: 'Hỗ trợ tăng cường sức khỏe sinh lý và sức đề kháng nhờ hồng sâm Hàn Quốc 6 năm tuổi. Hỗ trợ chống lão hóa, giảm mệt mỏi và cải thiện tuần hoàn máu.',
    dosage: 'Người lớn: 1 viên/lần x 2 lần/ngày.',
    ingredients: 'Hồng sâm Hàn Quốc 6 năm tuổi, Niacinamide, Biotin, Folic acid, Kẽm, Canxi, Vitamin B1, B2.',
    packaging: 'Lọ 60 viên.'
  },
  {
    name: 'Ginseng Gold Ball 1 viên',
    uses: 'Hỗ trợ tăng cường sức đề kháng, lưu thông máu và ổn định nhịp tim. Hỗ trợ nâng cao khả năng tập trung, trí nhớ và thanh nhiệt giải độc theo y học cổ truyền.',
    dosage: 'Người lớn: 1 viên/ngày. Trẻ em 4–6 tuổi: 1/2 viên/ngày (hỏi ý kiến bác sĩ).',
    ingredients: 'Ngưu hoàng, xạ hương, hồng sâm Hàn Quốc, nhung hươu, L-Arginine, vàng lá, mật ong, đương quy, địa hoàng, ngũ vị tử, câu kỷ tử, hoàng kỳ, cam thảo, táo tàu, quế.',
    packaging: 'Hộp 1 viên (3,75 g/viên).'
  },
  {
    name: 'Ginseng Gold Ball 3 viên',
    uses: 'Hỗ trợ tăng cường sức đề kháng, lưu thông máu và ổn định nhịp tim. Hỗ trợ nâng cao khả năng tập trung, trí nhớ và thanh nhiệt giải độc theo y học cổ truyền.',
    dosage: 'Người lớn: 1 viên/ngày. Trẻ em 4–6 tuổi: 1/2 viên/ngày (hỏi ý kiến bác sĩ).',
    ingredients: 'Ngưu hoàng, xạ hương, hồng sâm Hàn Quốc, nhung hươu, L-Arginine, vàng lá, mật ong, đương quy, địa hoàng, ngũ vị tử, câu kỷ tử, hoàng kỳ, cam thảo, táo tàu, quế.',
    packaging: 'Hộp 3 viên (3,75 g/viên).'
  },
  {
    name: 'Real Ginseng Drink',
    uses: 'Hỗ trợ tăng cường miễn dịch, cải thiện chức năng dạ dày và hỗ trợ phục hồi chức năng gan. Hỗ trợ tăng khả năng tập trung và cải thiện sức khỏe tổng thể.',
    dosage: 'Lắc đều trước khi sử dụng. Dùng 1 chai/ngày.',
    ingredients: 'Củ sâm tươi Hàn Quốc, chiết xuất hồng sâm 0,15%, mật ong, axit citric, sodium citrate, nước tinh khiết.',
    packaging: 'Hộp 10 chai x 120 ml.'
  },
  {
    name: 'Cheon Jong Sansam Baeyangggwan',
    uses: 'Hỗ trợ tăng cường sức đề kháng cho người suy nhược, ốm yếu và sau bệnh. Hỗ trợ giảm chất độc hại, tăng cường trí nhớ và giảm stress.',
    dosage: 'Mỗi ngày 1 ống, lắc đều trước khi mở và sử dụng.',
    ingredients: 'Chiết xuất rễ sâm Hàn Quốc hàm lượng cao cấp, ứng dụng công nghệ chiết xuất tiên tiến.',
    packaging: 'Hộp 20 ml x 20 ống.'
  },
  {
    name: 'Korean Red Ginseng Drink 1800ml',
    uses: 'Hỗ trợ phục hồi cơ thể suy nhược, giảm mệt mỏi và tăng cường miễn dịch. Hỗ trợ cân bằng trao đổi chất và tăng cường lưu thông khí huyết, đặc biệt cho người lớn tuổi.',
    dosage: 'Ngày uống 1–2 gói trước hoặc sau ăn 30 phút. Không uống vào buổi tối muộn.',
    ingredients: 'Tinh chất hồng sâm Hàn Quốc (hàm lượng trên 70 mg/g), thảo dược Hàn Quốc.',
    packaging: 'Hộp lớn 60 ml x 30 gói (6 hộp nhỏ).'
  },
  {
    name: 'Hovenia Red Ginseng Drink',
    uses: 'Hỗ trợ thanh lọc cơ thể, tăng cường miễn dịch và hỗ trợ thải độc gan. Hỗ trợ giảm tác hại của rượu bia và bảo vệ sức khỏe gan.',
    dosage: 'Ngày uống 1 gói, xé trực tiếp hoặc đổ ra cốc uống.',
    ingredients: 'Chiết xuất quả khúng khéng (Hovenia dulcis Hàn Quốc 19,5%), isomaltooligosaccharide, đường xi-rô tinh bột, axit citric, chiết xuất hạt bưởi.',
    packaging: 'Hộp lớn 60 ml x 30 gói (6 hộp nhỏ).'
  },
  {
    name: 'Red Ginseng Deer Antlers Premium Drink',
    uses: 'Hỗ trợ tăng cường sinh khí, bổ máu và lưu thông máu. Hỗ trợ bổ thận và tăng cường sinh lực nhờ sự kết hợp hồng sâm và nhung hươu. Không dùng cho phụ nữ mang thai và trẻ em.',
    dosage: 'Người lớn: 1 gói/ngày.',
    ingredients: '100% hồng sâm Hàn Quốc, nhung hươu và linh chi thượng hạng.',
    packaging: 'Hộp lớn 70 ml x 30 gói.'
  },
  {
    name: 'Korean Red Ginseng Kids Drink',
    uses: 'Hỗ trợ tăng cường hệ miễn dịch, giảm nguy cơ cảm cúm và ốm vặt ở trẻ. Hỗ trợ phát triển trí não và cải thiện trí nhớ cho bé.',
    dosage: 'Dành cho trẻ từ 2–9 tuổi: 1 gói/ngày.',
    ingredients: '100% hồng sâm cô đặc Hàn Quốc và mật ong nguyên chất.',
    packaging: 'Hộp lớn 20 ml x 30 gói (3 hộp nhỏ).'
  },
  {
    name: 'Ginseng Mask',
    uses: 'Hỗ trợ cấp ẩm sâu cho da, giúp da sáng mịn và kích hoạt tái tạo tế bào da. Hỗ trợ giảm nếp nhăn và phục hồi các tổn thương trên da nhờ hồng sâm Hàn Quốc.',
    dosage: 'Dùng 2–3 lần/tuần. Áp mặt nạ lên khuôn mặt sạch 15–20 phút rồi rửa lại với nước.',
    ingredients: 'Aqua, Glycerin, Panax Ginseng Root Extract, Collagen, Astaxanthin, Glutathione, Alpha-Arbutin, Niacinamide, Sodium Hyaluronate, Vitamin E, Panax Ginseng Seed Oil.',
    packaging: '30 ml/miếng mặt nạ.'
  },
  {
    name: 'Inner Luxe Collagen Elixir',
    uses: 'Hỗ trợ nuôi dưỡng làn da trắng sáng, đều màu và cấp ẩm từ bên trong. Hỗ trợ trẻ hóa da và tạo môi trường lý tưởng để collagen phát triển.',
    dosage: 'Liều duy trì: 1 lọ/ngày sau khi ăn sáng. Liều tăng cường: 2 lọ/ngày (sáng và trưa) trong 1 tháng.',
    ingredients: 'Fish Collagen Peptide 3.240 mg, Hyaluronic Acid 63 mg, chiết xuất hồng sâm 35 mg, Pomegranate Concentrate 100 mg, Vitamin C 81 mg, Vitamin E, B1, B2, B6, Biotin, L-cysteine.',
    packaging: 'Hộp 20 ml x 30 lọ.'
  },
  {
    name: 'Korean Red Ginseng Extract Plus',
    uses: 'Hỗ trợ phục hồi thể trạng cho người sức khỏe yếu hoặc sau ốm dậy. Hỗ trợ bổ thận, cải thiện tuần hoàn máu và hỗ trợ hệ miễn dịch, làm chậm lão hóa.',
    dosage: 'Uống 1–2 lần/ngày, mỗi lần 1–2 thìa cà phê với nước ấm. Dùng trước hoặc sau khi ăn 30 phút.',
    ingredients: 'Sâm tươi Hàn Quốc 6 năm tuổi cô đặc, linh chi, bạch chỉ, xuyên khung.',
    packaging: 'Hộp 300 g.'
  },

  // ── No1EU ─────────────────────────────────────────────────────────────────
  {
    name: 'Beauty Biocell Elixir',
    uses: 'Hỗ trợ nuôi dưỡng và phục hồi làn da, hỗ trợ chống lão hóa da sớm. Cung cấp độ ẩm, làm da rạng rỡ, săn chắc và đàn hồi hơn nhờ collagen và hyaluronic acid.',
    dosage: 'Người lớn: 1 lọ/ngày sau khi ăn sáng.',
    ingredients: 'Collagen thủy phân type I 5.000 mg, chiết xuất hạt nho (OPC 95%), Niacin (B3), Hyaluronic Acid, Vitamin E, Kẽm, Vitamin B5, B6, B2, A, Selen, Biotin, B12.',
    packaging: 'Hộp 14 lọ x 25 ml.'
  },
  {
    name: 'Track Support',
    uses: 'Hỗ trợ giảm triệu chứng liên quan đến nhiễm trùng đường tiết niệu. Hỗ trợ ức chế sự bám dính của vi khuẩn vào thành đường tiết niệu nhờ PAC từ nam việt quất và D-Mannose. Hỗ trợ giảm nguy cơ tái phát.',
    dosage: 'Phụ nữ: 1 lọ/ngày sau khi ăn sáng.',
    ingredients: 'D-Mannose, Nam việt quất (Proanthocyanidin – PAC), Kẽm, Vitamin C, Hà thủ ô, Hương thảo, Vitamin E, Vitamin A.',
    packaging: 'Hộp 5 lọ x 10 ml.'
  },
  {
    name: 'Helpaid',
    uses: 'Hỗ trợ tăng cường quá trình trao đổi chất và hỗ trợ chuyển đổi chất béo thành năng lượng. Hỗ trợ duy trì cân nặng ổn định và cân bằng lượng lipid trong cơ thể.',
    dosage: 'Người lớn: 1 lọ/ngày sau khi ăn sáng.',
    ingredients: 'Yerba Mate, Fennel (Hồi hương), Guarana, Nước dừa, Chổi cây bách xù, Dịch nụ bạch dương, Trà xanh.',
    packaging: 'Hộp 20 lọ x 10 ml.'
  },
  {
    name: 'Veins Aid',
    uses: 'Hỗ trợ điều hòa trương lực mạch máu và duy trì sự co giãn của mạch máu. Hỗ trợ ngăn ngừa biến đổi nội mạch máu và bảo vệ nội mô nhờ khả năng chống oxy hóa.',
    dosage: 'Người lớn: 1 lọ/ngày sau khi ăn sáng.',
    ingredients: 'Cam đắng, Cây nham lê, Vitamin C, Taurine, L-Arginine, Niacin, Citri Bio Flavonoid, Kẽm, Vitamin E, β-Caroten, Riboflavin, Thiamine, Crom, Selen.',
    packaging: 'Hộp 20 lọ x 10 ml.'
  },
  {
    name: 'Ginseng Royal 2000',
    uses: 'Hỗ trợ tăng cường hoạt động thể chất và tinh thần, hỗ trợ phục hồi và cân bằng năng lượng. Hỗ trợ bảo vệ các cơ quan nhờ sự kết hợp nhân sâm, sữa ong chúa và Vitamin C.',
    dosage: 'Nam giới: 1 lọ/ngày sau khi ăn sáng.',
    ingredients: 'Sữa ong chúa, Tinh chất nhân sâm (chuẩn hóa ≥20% Ginsenosides), Vitamin C.',
    packaging: 'Hộp 20 lọ x 10 ml.'
  },
  {
    name: 'Gluco Aid',
    uses: 'Hỗ trợ điều chỉnh chỉ số đường huyết về mức ổn định nhờ quế và Crom. Hỗ trợ điều hòa hấp thu Glucose và cân bằng Lipid, hỗ trợ chống oxy hóa và bảo vệ nội tạng.',
    dosage: 'Người lớn: 1 viên/ngày sau khi ăn sáng.',
    ingredients: 'Quế (Cinnamon Extract) 1.000 mg, Vitamin C, Vitamin E, β-Caroten, Crom (Chromium) 150 mg.',
    packaging: 'Hộp 30 viên nang rau củ.'
  },
  {
    name: 'Focus+Memo',
    uses: 'Hỗ trợ tăng khả năng tập trung và cải thiện trí nhớ. Hỗ trợ ổn định hoạt động não bộ và tăng khả năng tiếp nhận, xử lý thông tin.',
    dosage: 'Người lớn: 1 viên/ngày sau khi ăn.',
    ingredients: 'Sữa ong chúa cô đặc 100 mg (tương đương 300 mg sữa ong chúa tươi), Nhân sâm Hàn Quốc 100 mg, Soybean Lecithin 100 mg, Dicalcium Phosphate 100 mg.',
    packaging: 'Hộp 30 viên.'
  },
  {
    name: 'Krill Ocean',
    uses: 'Hỗ trợ tăng cường tuần hoàn máu, hỗ trợ giảm cholesterol và bảo vệ sức khỏe tim mạch. Hỗ trợ cải thiện trí nhớ, khả năng tập trung và hỗ trợ tăng cường thị lực.',
    dosage: 'Người lớn: 2 viên/ngày cùng bữa ăn.',
    ingredients: 'Fish Oil 235 mg, Krill Oil 165 mg, Soy Lecithin 120 mg. Cung cấp DHA 118 mg, EPA 43 mg, Phospholipids 82 mg, Choline 9,5 mg.',
    packaging: 'Hộp 60 viên nang.'
  },
  {
    name: 'Vitaline A',
    uses: 'Hỗ trợ tăng tốc đổi mới tế bào và tăng cường miễn dịch. Hỗ trợ duy trì hoạt động của các mô bề mặt và phát triển thị lực, ngăn ngừa nguy cơ nhiễm trùng.',
    dosage: 'Người lớn (trên 15 tuổi): 1 viên/ngày sau khi ăn.',
    ingredients: 'Vitamin A (Retinyl Palmitate) 2,75 mg RE (5.000 IU).',
    packaging: 'Lọ 120 viên.'
  },
  {
    name: 'Vitaline C',
    uses: 'Hỗ trợ chống oxy hóa, hỗ trợ tăng sức đề kháng và giảm nguy cơ cảm cúm. Hỗ trợ tăng sinh collagen, trẻ hóa da và cải thiện sức khỏe sụn khớp.',
    dosage: 'Người lớn: 1 viên/ngày sau khi ăn sáng.',
    ingredients: 'Vitamin C (L-Ascorbic Acid) 1.000 mg.',
    packaging: 'Lọ 60 viên.'
  },
  {
    name: 'Vitaline D3',
    uses: 'Hỗ trợ tăng khả năng hấp thu Canxi để xương và răng chắc khỏe. Hỗ trợ ngăn ngừa chuột rút, mệt mỏi cơ thể và tăng cường khả năng miễn dịch.',
    dosage: 'Người lớn (trên 4 tuổi): 1 viên/ngày sau khi ăn.',
    ingredients: 'Vitamin D3 (Cholecalciferol) 4.000 IU.',
    packaging: 'Lọ 120 viên.'
  },
  {
    name: 'Vitaline Mg',
    uses: 'Hỗ trợ tăng chất lượng giấc ngủ và xương chắc khỏe. Hỗ trợ giảm nguy cơ đột quỵ, bảo vệ tim mạch, giảm chuột rút và căng thẳng thần kinh.',
    dosage: 'Người lớn (trên 18 tuổi): 1 viên/ngày sau khi ăn sáng.',
    ingredients: 'Magnesium Glycinate 375 mg.',
    packaging: 'Lọ 60 viên.'
  },
  {
    name: 'Vitaline Se',
    uses: 'Hỗ trợ điều hòa hormon tuyến giáp và hỗ trợ chống oxy hóa, chống gốc tự do. Hỗ trợ cải thiện sức khỏe sinh sản và giúp tóc, móng phát triển khỏe mạnh.',
    dosage: 'Người lớn (trên 12 tuổi): 1 viên/ngày sau khi ăn.',
    ingredients: 'Selenium (Sodium Selenite) 200 mcg.',
    packaging: 'Lọ 60 viên.'
  },
  {
    name: 'Vitaline Zn',
    uses: 'Hỗ trợ vết thương mau lành, hỗ trợ giảm mụn và tăng khả năng miễn dịch. Hỗ trợ cải thiện sức khỏe sinh lý và tăng khả năng tập trung.',
    dosage: 'Người lớn (trên 18 tuổi): 1 viên/ngày sau khi ăn.',
    ingredients: 'Zinc Citrate 25 mg.',
    packaging: 'Lọ 60 viên.'
  },
  {
    name: 'Kids Royal Jelly',
    uses: 'Hỗ trợ cung cấp năng lượng hàng ngày và tăng cường hệ miễn dịch cho trẻ. Hỗ trợ phát triển hệ thần kinh nhờ Vitamin B tổng hợp và hỗ trợ phát triển xương với Vitamin A, D.',
    dosage: 'Trẻ 5–12 tuổi: 5 ml/ngày. Trẻ từ 12 tuổi trở lên: 10 ml/ngày.',
    ingredients: 'Sữa ong chúa, Vitamin C, Niacin (B3), Vitamin E, Axit Pantothenic (B5), B6, Riboflavin (B2), Thiamine (B1), Vitamin A, Axit Folic, Biotin, Vitamin D, B12.',
    packaging: 'Hộp 125 ml. Hương vị trái cây rừng, không màu nhân tạo.'
  },
  {
    name: 'Smart Kids',
    uses: 'Hỗ trợ bổ sung Omega-3 giúp phát triển trí não ở trẻ em. Hỗ trợ bảo vệ tim mạch, hỗ trợ điều hòa cholesterol và tăng cường trí nhớ, khả năng học tập.',
    dosage: 'Trẻ 4–8 tuổi: 1,25 ml/ngày. Trẻ 9–11 tuổi: 2,5 ml/ngày. Trẻ từ 12 tuổi: 5 ml/ngày.',
    ingredients: 'Acid béo Omega-3, EPA (Axit Eicosapentaenoic), DHA (Axit Docosahexaenoic). Hương chanh tự nhiên.',
    packaging: 'Hộp 125 ml.'
  },
  {
    name: 'Special Kids',
    uses: 'Hỗ trợ tăng cường nhận thức, khả năng ghi nhớ và học tập. Hỗ trợ duy trì thị lực khỏe mạnh và hỗ trợ chắc xương với Vitamin A, D. Cung cấp 100% Vitamin theo giá trị tham chiếu dinh dưỡng (NRV).',
    dosage: 'Trẻ sơ sinh – 3 tuổi: 7 giọt/ngày. Trẻ 4–6 tuổi: 14 giọt/ngày. Trẻ 7–9 tuổi: 18 giọt/ngày. Trẻ 10–18 tuổi: 28 giọt/ngày.',
    ingredients: 'Vitamin C, Niacin (B3), Vitamin B6, Thiamine (B1), Vitamin A, Vitamin D.',
    packaging: 'Hộp 30 ml dạng ống nhỏ giọt.'
  },
  {
    name: 'K2D3 Drops',
    uses: 'Hỗ trợ tăng chiều cao và bổ sung Canxi cho xương và răng chắc khỏe ở trẻ em. Hỗ trợ tăng mật độ xương, giảm nguy cơ gãy xương và hỗ trợ sức khỏe tim mạch.',
    dosage: 'Liều khuyến nghị: 0,5 ml/ngày.',
    ingredients: 'Vitamin K2 (Menaquinone-7), Vitamin D3 (Cholecalciferol).',
    packaging: 'Hộp 30 ml dạng ống nhỏ giọt.'
  },
];

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Đã kết nối MongoDB');

    let updated = 0;
    let notFound = 0;

    for (const info of productInfo) {
      const escaped = info.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const update = {};
      if (info.uses)        update.uses = info.uses;
      if (info.dosage)      update.dosage = info.dosage;
      if (info.ingredients) update.ingredients = info.ingredients;
      if (info.packaging)   update.packaging = info.packaging;

      const result = await Product.updateOne(
        { name: { $regex: new RegExp('^' + escaped + '$', 'i') } },
        { $set: update }
      );

      if (result.modifiedCount > 0) {
        console.log(`  ✅ ${info.name}`);
        updated++;
      } else if (result.matchedCount === 0) {
        console.log(`  ⚠️  Không tìm thấy: ${info.name}`);
        notFound++;
      } else {
        console.log(`  ℹ️  Không đổi: ${info.name}`);
      }
    }

    console.log(`\n✅ Hoàn tất! Đã cập nhật: ${updated}, Không tìm thấy: ${notFound}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
}

run();
