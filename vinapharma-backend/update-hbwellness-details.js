// Cập nhật uses, dosage, ingredients, packaging cho sản phẩm HB Wellness
// Chạy: node update-hbwellness-details.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');
const Brand = require('./models/Brand');

const details = {
  'Ginseng And Pomegranate Drink': {
    uses: 'Hỗ trợ tăng sinh collagen và hỗ trợ chống lão hóa. Hỗ trợ làm đẹp da, duy trì vóc dáng và hỗ trợ phục hồi làn da hư tổn. Hỗ trợ cải thiện sinh lý nữ, cải thiện tâm trạng và giảm stress.',
    dosage: 'Người lớn: 1–2 gói/ngày. Mỗi lần 1 gói, nhai kỹ khi sử dụng.',
    ingredients: 'Hồng sâm cô đặc 6 năm tuổi, nước lựu đỏ cô đặc. Xuất xứ Hàn Quốc 100%.',
    packaging: '100ml (10ml x 10 gói)',
  },
  'Red Ginseng Essence': {
    uses: 'Hỗ trợ cải thiện sức khỏe tổng thể, tăng cường sinh lực. Hỗ trợ cải thiện chức năng sinh lý nam giới. Hỗ trợ hệ miễn dịch, tăng cường trí nhớ và sự tập trung.',
    dosage: '1–2 gói/lần/ngày. Mỗi lần 1 gói, nhai kỹ khi sử dụng.',
    ingredients: 'Nhân sâm cô đặc, nước tinh khiết, axit citric, mật ong Seyang, hỗn hợp thực vật cô đặc, chất xơ rau diếp xoăn, mật hoa Agave, dưa chuột lên men. Xuất xứ Hàn Quốc 100%.',
    packaging: '100ml (10ml x 10 gói)',
  },
  'Red Ginseng Drink For Kids': {
    uses: 'Hỗ trợ phát triển hệ xương, hỗ trợ tăng trưởng chiều cao cho trẻ. Hỗ trợ cải thiện sức khỏe tim mạch và hệ thần kinh. Hỗ trợ giảm táo bón và cải thiện sức khỏe đường ruột.',
    dosage: 'Khuyến nghị sử dụng 1 bịch thạch sâm mỗi ngày.',
    ingredients: 'Chiết xuất hồng sâm 0.2%, chiết xuất hồng sâm lên men 1.8% (hồng sâm, nấm men, isomaltooligosaccharide, Vitamin C, Bifidobacterium), Fructose 9%, chiết xuất táo tàu 0.6%, Vitamin C 0.1%, chiết xuất hạt bưởi 0.02%, nước 88.01%.',
    packaging: '100ml (10ml x 10 gói)',
  },
  'Korean One Ginseng Tea': {
    uses: 'Hỗ trợ chống lão hóa, hỗ trợ làm đẹp da và cải thiện hệ tiêu hóa. Hỗ trợ tăng cường tuần hoàn máu. Hỗ trợ cải thiện sức khỏe toàn diện.',
    dosage: 'Mỗi lần 1 gói, mỗi ngày sử dụng 2–3 lần.',
    ingredients: 'Saponin 4.5% mg/g, Glucose Anhydrocrystalline 88%, chiết xuất táo đỏ 2% và các dưỡng chất khác.',
    packaging: '50 gói/hộp (dùng được 1.5–2 tháng)',
  },
  'Black Garlic Drink': {
    uses: 'Hỗ trợ sức khỏe tim mạch nhờ khả năng hỗ trợ giảm mỡ máu. Hỗ trợ ổn định huyết áp và tăng cường sức đề kháng tự nhiên nhờ acid amin và polyphenol quý giá.',
    dosage: 'Người lớn: 1–2 gói/ngày. Uống sau khi ăn 30 phút hoặc trước khi ngủ 2 tiếng. Có thể bảo quản tủ lạnh và uống lạnh.',
    ingredients: 'Chiết xuất tỏi đen Hàn Quốc 90%, táo đỏ Hàn Quốc, quả Hovenia Dulcis, thủy phân tinh bột dextrin, đường oligosaccharides, đường Fructose.',
    packaging: 'Hộp 30 gói x 60ml',
  },
  'Pomegranate Juice': {
    uses: 'Hỗ trợ tăng cường miễn dịch. Hỗ trợ sức khỏe xương khớp và tim mạch. Hỗ trợ ổn định đường huyết. Hỗ trợ chống lão hóa, giúp da sáng và mịn màng. Hỗ trợ giảm stress và nâng cao chất lượng giấc ngủ.',
    dosage: 'Không giới hạn số lượng uống, có thể uống 2–3 gói mỗi ngày tùy theo sở thích.',
    ingredients: '100% nước ép lựu nguyên chất.',
    packaging: 'Hộp 30 gói x 100ml',
  },
  'Korean Honeyed Red Ginseng 450g': {
    uses: 'Hỗ trợ chống lão hóa, tăng cường thể lực, giảm mệt mỏi. Hỗ trợ ổn định huyết áp, hỗ trợ giảm cholesterol và sức khỏe tim mạch. Hỗ trợ tăng cường tuần hoàn máu, hỗ trợ thải độc gan và cải thiện trí nhớ.',
    dosage: 'Ngày có thể ăn 2–3 lần, để nguyên củ hoặc cắt nhỏ tùy theo sở thích.',
    ingredients: 'Hồng sâm nguyên củ tẩm mật ong. 100% hồng sâm Hàn Quốc và mật ong nội địa Hàn Quốc.',
    packaging: 'Hộp 450g (30g x 15 củ)',
  },
  'Korean Honeyed Red Ginseng 220g': {
    uses: 'Hỗ trợ chống lão hóa, tăng cường thể lực, giảm mệt mỏi. Hỗ trợ ổn định huyết áp, hỗ trợ giảm cholesterol và sức khỏe tim mạch. Hỗ trợ tăng cường tuần hoàn máu, hỗ trợ thải độc gan và cải thiện trí nhớ.',
    dosage: 'Ngày có thể ăn 2–3 lần, để nguyên củ hoặc cắt nhỏ tùy theo sở thích.',
    ingredients: 'Hồng sâm nguyên củ tẩm mật ong. 100% hồng sâm Hàn Quốc và mật ong nội địa Hàn Quốc.',
    packaging: 'Hộp 220g (22g x 10 củ)',
  },
  'Slice Korea Red Ginseng': {
    uses: 'Hỗ trợ cải thiện tình trạng mất ngủ và tăng cường khả năng ghi nhớ. Bồi bổ sức khỏe và tinh thần. Hỗ trợ ổn định huyết áp và tăng cường khả năng miễn dịch. Hỗ trợ nuôi dưỡng gan thận.',
    dosage: 'Sử dụng 2–3 lần mỗi ngày, mỗi lần 1 lát. Có thể nhai, ngậm hay ăn trực tiếp hoặc ngâm nước nóng 10 phút rồi uống và ăn.',
    ingredients: 'Nhân sâm nguyên chất 100% và mật ong Hàn Quốc.',
    packaging: '20g x 10 hộp nhỏ',
  },
  'Honeyed Korean Red Ginseng Slices': {
    uses: 'Hỗ trợ cải thiện tình trạng mất ngủ và tăng cường khả năng ghi nhớ. Bồi bổ sức khỏe và tinh thần. Hỗ trợ ổn định huyết áp, tăng cường miễn dịch và hỗ trợ nuôi dưỡng gan thận.',
    dosage: 'Sử dụng 2–3 lần mỗi ngày, mỗi lần 1 lát. Có thể nhai, ngậm hay ăn trực tiếp hoặc ngâm nước nóng 10 phút rồi uống và ăn.',
    ingredients: 'Chiết xuất từ hồng sâm với hàm lượng Saponin cao, mật ong Hàn Quốc.',
    packaging: '2g/gói (10 gói/hộp)',
  },
  'Korean Red Ginseng Root 300g': {
    uses: 'Hỗ trợ tăng cường hệ miễn dịch, tăng sức đề kháng, giảm mệt mỏi. Hỗ trợ cải thiện trí nhớ và tăng cường trí não. Hỗ trợ cải thiện chất lượng giấc ngủ và cung cấp năng lượng cho cơ thể.',
    dosage: 'Sử dụng trực tiếp 2–3 lát sau khi tập thể dục hoặc khi mệt mỏi. Có thể pha trà cùng 2–3 lát nhân sâm.',
    ingredients: '100% hồng sâm 6 năm tuổi (không đường, không hương liệu, không chất bảo quản).',
    packaging: '300g/hộp',
  },
  'Korean Red Ginseng Root 150g': {
    uses: 'Hỗ trợ tăng cường hệ miễn dịch, tăng sức đề kháng, giảm mệt mỏi. Hỗ trợ cải thiện trí nhớ và tăng cường trí não. Hỗ trợ cải thiện chất lượng giấc ngủ và cung cấp năng lượng cho cơ thể.',
    dosage: 'Sử dụng trực tiếp 2–3 lát sau khi tập thể dục hoặc khi mệt mỏi. Có thể pha trà cùng 2–3 lát nhân sâm.',
    ingredients: '100% hồng sâm 6 năm tuổi (không đường, không hương liệu, không chất bảo quản).',
    packaging: '150g/hộp',
  },
  'Triple Red Ginseng Pill': {
    uses: 'Hỗ trợ cải thiện lưu lượng máu và trí nhớ. Hỗ trợ chống oxy hóa. Hỗ trợ tăng cường miễn dịch và giảm mệt mỏi. Phù hợp cho mọi đối tượng, đặc biệt tốt cho người cao tuổi.',
    dosage: 'Một ngày dùng 1 viên, nhai kỹ rồi mới nuốt.',
    ingredients: 'Hồng sâm, 100% nhân sâm Hàn Quốc và các loại thảo dược Hàn Quốc.',
    packaging: 'Hộp 30 viên x 3.75g',
  },
  'Korean Red Ginseng Capsule': {
    uses: 'Hỗ trợ bồi bổ sức khỏe, nâng cao sức đề kháng và tăng cường khí huyết. Hỗ trợ cơ thể phục hồi nhanh chóng. Hỗ trợ thải độc gan và tăng cường hấp thu dưỡng chất.',
    dosage: 'Uống ngày 2 lần, mỗi lần 2 viên với nước lọc ấm hoặc nguội.',
    ingredients: 'Hồng sâm Hàn Quốc 6 năm tuổi, chiết xuất nhung hươu Hàn Quốc, chiết xuất nấm linh chi Young Ji, Vitamin B2, Vitamin C, sáp ong, tocopherol, dầu đậu nành, sữa ong chúa.',
    packaging: 'Hộp sắt 120 viên x 830mg',
  },
  'Chim Hyangdan Gold': {
    uses: 'Hỗ trợ tuần hoàn máu não, hỗ trợ ổn định hoạt động mạch máu. Hỗ trợ thanh nhiệt, tỉnh táo và ổn định thần kinh. Không dùng cho phụ nữ mang thai.',
    dosage: '1 viên/ngày.',
    ingredients: 'Trầm hương Indonesia 5%, lactose, đương quy, mẫu đơn, địa hoàng, cam thảo, quế, táo đỏ, doraji, ngũ vị tử, lộc nhung, hồng sâm, mật ong, glycerin và các thảo dược Đông y.',
    packaging: '30 viên/hộp',
  },
  'Ginseng Ara Power': {
    uses: 'Hỗ trợ tăng cường sức khỏe sinh lý và sức đề kháng. Hỗ trợ chống lão hóa, giảm mệt mỏi. Hỗ trợ tăng cường tuần hoàn máu, hỗ trợ ổn định huyết áp và cải thiện trí nhớ.',
    dosage: 'Uống 1 viên/lần, 2 lần một ngày.',
    ingredients: 'Hồng sâm Hàn Quốc 6 năm tuổi, Niacinamide, Biotin, Folic acid, kẽm, canxi, Vitamin B1 & B2.',
    packaging: '60 viên/lọ',
  },
  'Ginseng Gold Ball 1 viên': {
    uses: 'Hỗ trợ tăng cường sức đề kháng, hỗ trợ tăng hồng cầu và lưu thông máu. Hỗ trợ ổn định nhịp tim, nâng cao khả năng tập trung và trí nhớ. Hỗ trợ thanh nhiệt giải độc và ổn định hoạt động thần kinh.',
    dosage: 'Người lớn: 1 viên/ngày. Trẻ em dưới 3 tuổi: 1/4 viên/ngày. Trẻ em 4–6 tuổi: 1/2 viên/ngày.',
    ingredients: 'Ngưu hoàng, xạ hương, hồng sâm Hàn Quốc, nhung hươu, L.Arginine, vàng lá, mật ong, đương quy, địa hoàng, ngũ vị tử, câu kỷ tử, hoàng kỳ, cam thảo, táo tàu, quế và các thảo dược quý.',
    packaging: '1 viên (3.75g)/hộp',
  },
  'Ginseng Gold Ball 3 viên': {
    uses: 'Hỗ trợ tăng cường sức đề kháng, hỗ trợ tăng hồng cầu và lưu thông máu. Hỗ trợ ổn định nhịp tim, nâng cao khả năng tập trung và trí nhớ. Hỗ trợ thanh nhiệt giải độc và ổn định hoạt động thần kinh.',
    dosage: 'Người lớn: 1 viên/ngày. Trẻ em dưới 3 tuổi: 1/4 viên/ngày. Trẻ em 4–6 tuổi: 1/2 viên/ngày.',
    ingredients: 'Ngưu hoàng, xạ hương, hồng sâm Hàn Quốc, nhung hươu, L.Arginine, vàng lá, mật ong, đương quy, địa hoàng, ngũ vị tử, câu kỷ tử, hoàng kỳ, cam thảo, táo tàu, quế và các thảo dược quý.',
    packaging: 'Hộp 3 viên (3.75g/viên)',
  },
  'Real Ginseng Drink': {
    uses: 'Hỗ trợ tăng cường miễn dịch và cải thiện sức khỏe. Hỗ trợ tăng khả năng tập trung. Hỗ trợ cải thiện chức năng dạ dày và đường tiêu hóa. Hỗ trợ phục hồi chức năng gan và tăng cường sinh lực.',
    dosage: 'Lắc đều trước khi sử dụng, 1 chai/ngày.',
    ingredients: 'Củ sâm tươi (1 củ), chiết xuất hồng sâm 0.15%, mật ong, axit citric, sodium citrate, nước tinh khiết.',
    packaging: '120ml/chai, hộp 10 chai',
  },
  'Cheon Jong Sansam Baeyangggwan': {
    uses: 'Hỗ trợ tăng cường sức đề kháng cho người suy nhược, người ốm yếu. Hỗ trợ giảm các chất độc hại trong cơ thể. Hỗ trợ tăng cường trí nhớ, giảm stress. Hỗ trợ làm đẹp da ở cả nam và nữ.',
    dosage: 'Mỗi ngày 1 ống, lắc đều mở ống và sử dụng.',
    ingredients: 'Chiết xuất từ rễ sâm hàm lượng cao cấp, ứng dụng công nghệ Hàn Quốc.',
    packaging: '20ml x 20 ống',
  },
  'Korean Red Ginseng Drink 1800ml': {
    uses: 'Hỗ trợ phục hồi cơ thể suy nhược, kém ăn, giảm mệt mỏi. Hỗ trợ tăng cường hệ miễn dịch, bồi bổ sức khỏe cho người lớn tuổi và sau ốm. Hỗ trợ cân bằng quá trình trao đổi chất và tăng cường lưu thông khí huyết.',
    dosage: 'Ngày uống 1–2 gói trước hoặc sau ăn 30 phút. Không uống vào buổi tối, dễ gây mất ngủ.',
    ingredients: 'Chiết xuất tinh chất hồng sâm, thảo dược bằng công nghệ cao, thành phần hồng sâm trên 70mg/g.',
    packaging: 'Hộp lớn 60ml x 30 gói (6 hộp nhỏ)',
  },
  'Hovenia Red Ginseng Drink': {
    uses: 'Hỗ trợ thanh lọc cơ thể và tăng cường miễn dịch. Hỗ trợ thải độc gan và hỗ trợ giải rượu. Là lựa chọn phù hợp cho người muốn bảo vệ và nâng cao sức khỏe gan.',
    dosage: 'Ngày uống 1 gói, xé trực tiếp gói hoặc đổ ra cốc uống.',
    ingredients: 'Chiết xuất quả khúng khéng (nước tinh khiết, thân cây hovenia dulcis Hàn Quốc 19.5%, isomaltooligosaccharide, đường xi-rô tinh bột, hỗn hợp thực vật cô đặc, axit citric, chiết xuất hạt bưởi).',
    packaging: 'Hộp lớn 60ml x 30 gói (6 hộp nhỏ)',
  },
  'Red Ginseng Deer Antlers Premium Drink': {
    uses: 'Hỗ trợ tăng cường sinh khí và bổ máu, hỗ trợ lưu thông máu. Hỗ trợ bổ thận và tăng cường sinh lực. Hỗ trợ sức khỏe đường hô hấp. Không dùng cho phụ nữ mang thai và trẻ em.',
    dosage: '1 gói/ngày.',
    ingredients: '100% hồng sâm Hàn Quốc, nhung hươu và linh chi thượng hạng.',
    packaging: 'Hộp lớn 70ml x 30 gói (6 hộp nhỏ)',
  },
  'Korean Red Ginseng Kids Drink': {
    uses: 'Hỗ trợ tăng cường hệ miễn dịch, giúp giảm nguy cơ cảm cúm và ốm vặt. Hỗ trợ phát triển trí não và cải thiện trí nhớ cho bé.',
    dosage: 'Sản phẩm dành cho trẻ từ 2–9 tuổi, mỗi ngày 1 gói.',
    ingredients: 'Chiết xuất 100% hồng sâm cô đặc với mật ong nguyên chất.',
    packaging: 'Hộp lớn 20ml x 30 gói (3 hộp nhỏ)',
  },
  'Ginseng Mask': {
    uses: 'Hỗ trợ cấp ẩm cho da, giúp da sáng mịn, hỗ trợ kích hoạt tốc độ đổi mới tế bào giúp trẻ hóa da. Hỗ trợ giảm nếp nhăn và phục hồi các tổn thương trên da.',
    dosage: 'Sử dụng 2–3 lần/tuần. Áp lên khuôn mặt 15 phút rồi rửa lại với nước.',
    ingredients: 'Aqua, Glycerin, Panax Ginseng Root Extract, Collagen, Astaxanthin, Glutathione, Alpha-Arbutin, Niacinamide, Sodium Hyaluronate, Vitamin E, Panax Ginseng Seed Oil.',
    packaging: '30ml/miếng',
  },
  'Ginseng Whitening Mask': {
    uses: 'Hỗ trợ cấp ẩm, giúp da sáng mịn, hỗ trợ giảm tình trạng tăng sắc tố da. Hỗ trợ chống lão hóa, phục hồi tổn thương do tia UV và làm đều màu da.',
    dosage: 'Sử dụng 2–3 lần/tuần. Áp lên khuôn mặt 15 phút rồi rửa lại với nước.',
    ingredients: 'Aqua, Niacinamide, chiết xuất cam thảo, chiết xuất dâu tây, Arbutin, 3-o-Ethyl Ascorbic Acid, Beta-glucan, Sodium Hyaluronate.',
    packaging: '30ml/miếng',
  },
  'Inner Luxe Collagen Elixir': {
    uses: 'Hỗ trợ nuôi dưỡng làn da trắng sáng, đều màu và cấp ẩm. Hỗ trợ trẻ hóa da và tạo môi trường lý tưởng để collagen phát triển từ bên trong.',
    dosage: 'Liều bổ sung (duy trì): 1 lọ/ngày sau khi ăn sáng. Liều tăng cường: 2 lọ/ngày vào buổi sáng và trưa, dùng trong 1 tháng hoặc hơn.',
    ingredients: 'Fish Collagen Peptide Liquid 3240mg, Hyaluronic Acid 63.25mg, chiết xuất hồng sâm 35.25mg, Pomegranate Concentrate 100mg, Vitamin C 81mg, Vitamin E, B1, B2, B6, Biotin, L-cysteine.',
    packaging: 'Hộp 20ml x 30 lọ + viên nén Hyaluronic Acid',
  },
  'Korean Red Ginseng Extract Plus': {
    uses: 'Hỗ trợ phục hồi thể trạng cho người sức khỏe yếu hoặc sau ốm. Hỗ trợ bổ thận và cải thiện tuần hoàn máu, hỗ trợ hệ miễn dịch. Hỗ trợ làm chậm quá trình lão hóa.',
    dosage: 'Uống 1–2 lần/ngày, mỗi lần 1–2 thìa với nước ấm. Nên dùng trước hoặc sau khi ăn 30 phút, tránh tối muộn.',
    ingredients: 'Sâm tươi 6 năm tuổi cô đặc, linh chi, bạch chỉ, xuyên khung.',
    packaging: 'Hộp 300g',
  },
  'Dong Chung Ha Cho Premium': {
    uses: 'Hỗ trợ bồi bổ sức khỏe. Hỗ trợ tăng cường sức đề kháng và giảm mệt mỏi. Hỗ trợ cơ thể suy kiệt.',
    dosage: 'Sử dụng trực tiếp trước khi ăn 30 phút, lắc đều trước khi sử dụng. Người lớn: 2 gói/lần/ngày. Trẻ em dưới 13 tuổi: ½–1 gói/lần/ngày.',
    ingredients: 'Cao đông trùng hạ thảo japonica (thành phần rắn >2%, Hàn Quốc) 70%, cao hỗn hợp thảo dược (quế, bạch truật, phục linh, linh chi, cam thảo, xà sàng) 26%, đường oligosaccharide.',
    packaging: '1800ml (30ml x 60 gói)',
  },
  'Viên Hồng Sâm Gold Hàn Quốc': {
    uses: 'Hỗ trợ sức khỏe nhanh chóng cho người mới ốm dậy hoặc người gầy yếu.',
    dosage: 'Ngày 2 viên, mỗi lần 1 viên. Sử dụng sau khi ăn. Không dành cho trẻ em, phụ nữ đang mang thai và cho con bú.',
    ingredients: 'Hồng sâm cô đặc, sữa ong chúa tươi, linh chi cô đặc, đông trùng hạ thảo, Vitamin C, nhung hươu cô đặc, D-a-tocopherol, oxit kẽm, Vitamin B6, B2, B1.',
    packaging: 'Hộp 90 viên',
  },
  'Silkworm Dongchoog Hacho Gold': {
    uses: 'Hỗ trợ tăng cường sức đề kháng, giảm mệt mỏi. Hỗ trợ làm chậm quá trình lão hóa của cơ thể.',
    dosage: 'Sử dụng trực tiếp trước khi ăn sáng. Lắc đều trước khi sử dụng. Người lớn: 1 ống/ngày.',
    ingredients: 'Chiết xuất đông trùng hạ thảo 34.4%, chiết xuất nấm Sanghwang 34.4%, chiết xuất hồng sâm khô 17.2%, oligosaccharides 12.55%, chiết xuất nấm linh chi 0.2%, chiết xuất hạt bưởi 0.05%, mật ong 27%, địa hoàng, quế, hoa mẫu đơn.',
    packaging: '400ml (20ml x 20 ống)',
  },
  'Kẹo Hồng Sâm ILKWANG': {
    uses: 'Hỗ trợ bồi bổ sức khỏe. Hỗ trợ bổ sung năng lượng và tinh thần minh mẫn cho ngày làm việc và học tập. Hỗ trợ giảm mệt mỏi và say tàu xe.',
    dosage: 'Nên sử dụng vào ban ngày. Phụ nữ có thai, cho con bú và trẻ em dưới 3 tuổi nên tham khảo ý kiến bác sĩ.',
    ingredients: 'Siro tinh bột, đường hoa quả, chiết xuất hồng sâm 0.4%, màu caramel, hương tổng hợp (hồng sâm, thảo dược), L-menthol.',
    packaging: '280g/gói',
  },
  'Kẹo Hắc Sâm ILKWANG': {
    uses: 'Hỗ trợ bồi bổ sức khỏe. Hỗ trợ bổ sung năng lượng và tinh thần minh mẫn. Hỗ trợ giảm mệt mỏi và say tàu xe.',
    dosage: 'Nên sử dụng vào ban ngày. Phụ nữ có thai, cho con bú và trẻ em dưới 3 tuổi nên tham khảo ý kiến bác sĩ.',
    ingredients: 'Siro tinh bột, đường hoa quả, muối, chất nhũ hoá, chiết xuất hắc sâm 0.1%, màu caramel, hương tổng hợp (hồng sâm, thảo dược), L-menthol.',
    packaging: '280g/gói',
  },
  'Gia Vị Nấu Súp Gà Thảo Mộc': {
    uses: 'Tăng cường hương vị, mùi thơm và độ ngọt tự nhiên cho món gà hầm. Hỗ trợ bồi bổ cơ thể sau ốm đau và căng thẳng.',
    dosage: 'Nhồi vào bụng gà 1.2kg cùng tỏi, gừng, gạo nếp rồi hầm 2 tiếng (dành cho 4 người). Không nên dùng nồi áp suất.',
    ingredients: 'Dâu tằm, sồi, ngũ gia bì, xương cựa, táo tàu, bạch chỉ.',
    packaging: '100g/gói',
  },
};

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công\n');

    const brand = await Brand.findOne({ name: 'HB Wellness' });
    const BRAND_ID = brand._id.toString();
    let updated = 0, notFound = 0;

    for (const [name, data] of Object.entries(details)) {
      const p = await Product.findOne({ name, brand: BRAND_ID });
      if (!p) { console.log(`⚠️  Không tìm thấy: ${name}`); notFound++; continue; }
      await Product.findByIdAndUpdate(p._id, data);
      console.log(`✅ ${name}`);
      updated++;
    }

    console.log(`\n📦 Xong! Cập nhật: ${updated}, không tìm thấy: ${notFound}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
}

main();
