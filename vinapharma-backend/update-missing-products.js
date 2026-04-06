/**
 * Script cập nhật thông tin thành phần cho các sản phẩm VinPharma, VPharma, EU Vision, Cemio
 * Tất cả nội dung tuân thủ luật quảng cáo dược phẩm Việt Nam:
 * - Không dùng "điều trị", "chữa bệnh"
 * - Chỉ dùng "hỗ trợ cải thiện", "hỗ trợ tăng cường", "giúp giảm nguy cơ"
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const updates = [
  // ===================== VINPHARMA =====================
  {
    name: 'VINCOOL',
    ingredients: 'Cao Xuyên tâm liên 80mg, Bột Đại hồi 80mg, Cao Tô tử 60mg, Bột Bạch thược 50mg, Bột Bạch linh 45mg, Cao Cát cánh 45mg, Tá dược vừa đủ 1 viên',
    dosage: 'Trẻ em 2–6 tuổi: 1 viên/lần, 1–2 lần/ngày. Trẻ em 6–12 tuổi: 1 viên/lần, 2–3 lần/ngày. Người lớn: 2 viên/lần, 2–3 lần/ngày. Dùng sau bữa ăn.',
  },
  {
    name: 'SUPER BABY',
    ingredients: 'Thymomodulin 40mg, L-Lysine HCl 100mg, Amylase 150 DU, Protease 75 HUT, Cellulase 50 CU, Lactase 25 ALU, Tá dược vừa đủ 1 ống 10ml',
    dosage: 'Trẻ em 1–3 tuổi: 1/2 ống/lần, 1–2 lần/ngày. Trẻ em 3–15 tuổi: 1 ống/lần/ngày. Người lớn: 1–2 ống/lần/ngày. Uống trực tiếp hoặc pha với nước.',
  },
  {
    name: 'BỔ PHỔI',
    ingredients: 'Cao Cát cánh 100mg, Cao Mạch môn 100mg, Cao Bán hạ 80mg, Cao Bạch linh 80mg, Tinh dầu Bạc hà 5mg, Tá dược vừa đủ 1 viên',
    dosage: 'Người lớn: 2 viên/lần, 2–3 lần/ngày. Trẻ em 6–12 tuổi: 1 viên/lần, 2–3 lần/ngày. Dùng sau bữa ăn.',
  },
  {
    name: 'MINUS TC',
    ingredients: 'Cao Xuyên tâm liên 150mg/10ml, Cao Cát cánh 100mg/10ml, Cao Mạch môn 80mg/10ml, Mật ong vừa đủ, Tá dược vừa đủ 1 chai 30ml',
    dosage: 'Trẻ em 2–6 tuổi: 2,5ml/lần, 2–3 lần/ngày. Trẻ em 6–12 tuổi: 5ml/lần, 2–3 lần/ngày. Người lớn: 10ml/lần, 2–3 lần/ngày. Lắc đều trước khi dùng.',
  },
  {
    name: 'GEL VỆ SINH QUEEN LOVE Hương Hoa Hồng',
    ingredients: 'Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Lactic Acid, Rosa Damascena Flower Extract, Chamomilla Recutita Extract, Aloe Barbadensis Leaf Juice, Panthenol, Glycerin, Parfum',
    dosage: 'Dùng ngoài. Lấy một lượng vừa đủ ra tay, rửa vùng kín hàng ngày trong khi tắm, sau đó rửa sạch bằng nước.',
  },
  {
    name: 'GEL VỆ SINH QUEEN LOVE Hương Hoa Nhài',
    ingredients: 'Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Lactic Acid, Jasminum Sambac Flower Extract, Chamomilla Recutita Extract, Aloe Barbadensis Leaf Juice, Panthenol, Glycerin, Parfum',
    dosage: 'Dùng ngoài. Lấy một lượng vừa đủ ra tay, rửa vùng kín hàng ngày trong khi tắm, sau đó rửa sạch bằng nước.',
  },
  {
    name: 'FE TC',
    ingredients: 'Sắt III polymaltose (Fe3+ tương đương 50mg), Acid folic (Vitamin B9) 400mcg, Vitamin B12 5mcg, Tá dược vừa đủ 1 chai 30ml',
    dosage: 'Trẻ em 6–12 tuổi: 5ml/lần/ngày. Người lớn và phụ nữ mang thai: 10ml/lần/ngày. Lắc đều trước khi dùng. Uống sau bữa ăn.',
  },
  {
    name: 'TRINH NỮ ĐAN 60 viên',
    ingredients: 'Cao Trinh nữ hoàng cung 200mg, Cao Náng hoa trắng 100mg, Nano Curcumin 50mg, Tá dược vừa đủ 1 viên nén',
    dosage: 'Người lớn: 2 viên/lần, 2 lần/ngày (sáng và tối). Uống sau bữa ăn với nhiều nước. Nên dùng liên tục ít nhất 3 tháng để có kết quả tốt.',
  },
  {
    name: 'TRINH NỮ ĐAN 30 viên',
    ingredients: 'Cao Trinh nữ hoàng cung 200mg, Cao Náng hoa trắng 100mg, Nano Curcumin 50mg, Tá dược vừa đủ 1 viên nén',
    dosage: 'Người lớn: 2 viên/lần, 2 lần/ngày (sáng và tối). Uống sau bữa ăn với nhiều nước.',
  },
  {
    name: 'BỔ MẮT NÃO BRAIN EYES',
    ingredients: 'Cao Quả óc chó 100mg, Chiết xuất Việt quất (Blueberry extract) 80mg, DHA 50mg, Beta Glucan 30mg, Choline bitartrate 20mg, Vitamin B1 1,4mg, Vitamin C 80mg, Tá dược vừa đủ 1 ống 10ml',
    dosage: 'Người lớn: 1–2 ống/ngày. Trẻ em 6–12 tuổi: 1/2–1 ống/ngày. Uống trực tiếp hoặc pha với nước. Dùng sau bữa ăn.',
  },
  {
    name: 'D3 TC',
    ingredients: 'Vitamin D3 (Cholecalciferol) 800 IU (20mcg)/10ml, Tá dược vừa đủ 1 chai 30ml',
    dosage: 'Trẻ sơ sinh đến 12 tháng: 2,5ml/ngày. Trẻ 1–10 tuổi: 5ml/ngày. Người lớn và phụ nữ mang thai: 10ml/ngày. Lắc đều trước khi dùng. Uống vào buổi sáng sau bữa ăn.',
  },
  {
    name: 'ĐÔNG TRÙNG HẠ THẢO',
    ingredients: 'Đông trùng hạ thảo (Cordyceps sinensis) 200mg, Cordycepin 0,2%, Adenosin, Tá dược vừa đủ 1 viên nang',
    dosage: 'Người lớn: 2 viên/lần, 2 lần/ngày (sáng và tối sau bữa ăn). Nên dùng liên tục 1–3 tháng để đạt hiệu quả tốt nhất.',
  },
  {
    name: 'ĐẠI TRÀNG VINPHARMA',
    ingredients: 'Cao Bạch truật 200mg, Cao Bạch thược 150mg, Cao Hoàng liên 100mg, Cao Mộc hương 80mg, Cao Chỉ thực 80mg, Tá dược vừa đủ 1 ống 10ml',
    dosage: 'Người lớn: 1–2 ống/lần, 2 lần/ngày (sáng và tối). Trẻ em 6–12 tuổi: 1/2–1 ống/lần, 2 lần/ngày. Lắc đều trước khi dùng.',
  },

  // ===================== VPHARMA =====================
  {
    name: 'LIVER PLUS VP',
    ingredients: 'Silymarin 40% 100mg, Cao Actiso (Cynara scolymus) 150mg, Cao Diệp hạ châu (Phyllanthus amarus) 100mg, Cao Cà gai leo (Solanum procumbens) 100mg, Cao Giảo cổ lam 50mg, Tá dược vừa đủ 1 viên nén bao phim',
    dosage: 'Người lớn: 1–2 viên/lần, 2 lần/ngày sau bữa ăn sáng và tối. Uống với nhiều nước.',
  },
  {
    name: 'CENORVA NEW VP',
    ingredients: 'Cao Bạch quả (Ginkgo biloba) chuẩn hoá 24% Ginkgoflavonglycosides 40mg, Cao Đinh lăng 60mg, Cao Rau đắng biển (Bacopa monnieri) 50mg, Citicoline 10mg, Rutin 4mg, Vitamin B1 1,4mg, Vitamin B6 1,4mg, Tá dược vừa đủ 1 viên nén bao phim',
    dosage: 'Người lớn: 1–2 viên/lần, 2 lần/ngày sau bữa ăn. Uống với nhiều nước. Nên dùng liên tục ít nhất 4–8 tuần.',
  },
  {
    name: 'BIOFLEX VP',
    ingredients: 'Glucosamine sulfate potassium 500mg, Chondroitin sulfate 400mg, Collagen type II thủy phân 100mg, Vitamin C 40mg, Tá dược vừa đủ 1 viên nén',
    dosage: 'Người lớn: 1–2 viên/lần, 2 lần/ngày sau bữa ăn. Uống với nhiều nước. Nên dùng liên tục ít nhất 3 tháng.',
  },
  {
    name: 'ENTERO BIO A5',
    ingredients: 'Bacillus clausii 1×10⁹ CFU/10ml, Lactobacillus acidophilus 5×10⁸ CFU/10ml, Bifidobacterium longum 5×10⁸ CFU/10ml, FOS (Fructooligosaccharides) 500mg/10ml, Tá dược vừa đủ 1 ống 10ml',
    dosage: 'Người lớn: 1–2 ống/lần, 2 lần/ngày. Trẻ em 2–12 tuổi: 1 ống/lần, 1–2 lần/ngày. Trẻ sơ sinh đến 2 tuổi: 1/2 ống/lần, 1–2 lần/ngày. Uống trước hoặc sau bữa ăn. Lắc đều trước khi dùng.',
  },
  {
    name: 'CALNUTIL VP',
    ingredients: 'Calcium carbonate (tương đương 500mg Ca2+) 1250mg, Vitamin D3 (Cholecalciferol) 400 IU (10mcg), Vitamin K2 (MK-7) 45mcg, Tá dược vừa đủ 1 ống 10ml',
    dosage: 'Trẻ em 1–6 tuổi: 5ml/ngày. Trẻ em 6–12 tuổi: 10ml/ngày. Người lớn và phụ nữ mang thai: 10–15ml/ngày. Lắc đều trước khi dùng.',
  },

  // ===================== EU VISION =====================
  {
    name: 'MAS CALCI DK2',
    ingredients: 'Calcium citrate (tương đương 143mg Ca2+) 571,42mg, Magnesium citrate (tương đương 58mg Mg) 348mg, Vitamin K2 (MK-7) 150mcg, Vitamin D3 (Cholecalciferol) 400 IU, Zinc sulfate (tương đương 1mg Zn) 4,12mg, Tá dược vừa đủ 1 chai 150ml',
    dosage: 'Trẻ 1–3 tuổi: 2,5ml/lần/ngày. Trẻ 3–6 tuổi: 5ml/lần/ngày. Thiếu niên và người lớn: 10ml/lần/ngày. Lắc đều trước khi dùng. Trẻ dưới 1 tuổi cần tư vấn bác sĩ.',
  },
  {
    name: 'VIÊN ĐẶT ÂM ĐẠO VITREX PLUS',
    ingredients: 'Hyaluronic acid 0,2%, Chlorhexidine dihydrochloride 0,1%, Vitamin E (Tocopheryl acetate) 0,5%, Chiết xuất Lô hội (Aloe vera) 1%, C10-18 triglycerides, Tá dược vừa đủ 1 viên đặt',
    dosage: 'Đặt 1 viên vào âm đạo mỗi tối trước khi đi ngủ, trong 7 ngày liên tiếp. Nên đặt theo tư thế nằm ngửa để viên tan đều. Rửa tay sạch trước khi dùng.',
  },
  {
    name: 'ISOPLUS-ZT',
    ingredients: 'Tinh dầu hoa anh thảo (Evening primrose oil) 800mg, Gamma Linolenic Acid (GLA) 80mg, Vitamin E (Tocopheryl acetate) 15,07mg, Coenzyme Q10 50mg, Tá dược vừa đủ 1 viên nang mềm',
    dosage: 'Uống 1–2 viên/ngày sau bữa ăn. Không nên vượt quá 2 viên/ngày. Nên dùng liên tục ít nhất 4–8 tuần.',
  },
  {
    name: 'MUMMACAL-ZT',
    ingredients: 'Calcium carbonate (tương đương 240mg Ca2+) 600mg, Vitamin D3 (Cholecalciferol) 400 IU (10mcg), Tá dược vừa đủ 1 viên nang mềm',
    dosage: 'Uống 1 viên/ngày sau bữa ăn sáng. Phụ nữ mang thai và cho con bú: theo chỉ định của bác sĩ.',
  },
  {
    name: 'MUMFOLATE DIAMOND',
    ingredients: 'Sắt hữu cơ Bisglycinate (Iron bisglycinate, tương đương 14mg Fe) 77mg, Acid Folate (5-MTHF – Methylfolate) 400mcg, Vitamin C 40mg, Vitamin B12 2,5mcg, Tá dược vừa đủ 1 viên nang mềm',
    dosage: 'Uống 1 viên/ngày sau bữa ăn. Phụ nữ trước và trong thai kỳ: 1–2 viên/ngày theo chỉ định bác sĩ. Nuốt nguyên viên với nhiều nước.',
  },
  {
    name: 'EPO QUEEN',
    ingredients: 'Tinh dầu hoa anh thảo (Evening primrose oil) 800mg, Gamma Linolenic Acid (GLA) 80mg, Vitamin E (Tocopheryl acetate) 15,07mg, Coenzyme Q10 50mg, Tá dược vừa đủ 1 viên nang mềm',
    dosage: 'Uống 1–2 viên/ngày sau bữa ăn. Nên dùng liên tục ít nhất 3 tháng để thấy hiệu quả rõ rệt.',
  },
  {
    name: 'MAS MULTIGLUCAN',
    ingredients: 'Sắt hữu cơ Bisglycinate (Iron bisglycinate) 25mg, Zinc citrate (tương đương 5mg Zn) 16,5mg, Beta Glucan 10mg, Vitamin A 400mcg, Vitamin C 40mg, Vitamin D3 5mcg, Vitamin E 6mg, Vitamin B1 0,7mg, Vitamin B2 0,8mg, Vitamin B6 1mg, Tá dược vừa đủ 1 chai 150ml',
    dosage: 'Trẻ em 1–3 tuổi: 2,5ml/ngày. Trẻ 3–6 tuổi: 5ml/ngày. Trẻ 6–12 tuổi và người lớn: 10ml/ngày. Lắc đều trước khi dùng.',
  },
  {
    name: 'Clover FOLATE',
    ingredients: 'Acid Folic (Vitamin B9) 400mcg, Vitamin B12 (Methylcobalamin) 2,5mcg, Vitamin C 40mg, Sắt hữu cơ Bisglycinate (tương đương 7mg Fe) 38,5mg, Tá dược vừa đủ 1 viên nang mềm',
    dosage: 'Uống 1 viên/ngày sau bữa ăn. Phụ nữ chuẩn bị và trong thai kỳ: nên dùng ít nhất 3 tháng trước khi mang thai và trong suốt thai kỳ. Nuốt nguyên viên với nước.',
  },
  {
    name: 'Clover DHA',
    ingredients: 'DHA (Docosahexaenoic acid) từ dầu gan cá tuyết 250mg, EPA (Eicosapentaenoic acid) 30mg, Vitamin A 400mcg, Vitamin D3 5mcg, Tá dược vừa đủ 1 viên nang mềm',
    dosage: 'Uống 1 viên/ngày sau bữa ăn. Phụ nữ mang thai và cho con bú: 1–2 viên/ngày theo chỉ định bác sĩ. Nuốt nguyên viên với nước, không nhai.',
  },

  // ===================== CEMIO =====================
  {
    name: 'CEMIO CALCI MAGNESIUM ZINC',
    ingredients: 'Calcium carbonate (tương đương 200mg Ca2+) 500mg, Magnesium oxide (tương đương 60mg Mg) 100mg, Zinc gluconate (tương đương 5mg Zn) 35mg, Biotin (Vitamin B7) 30mcg, Tá dược vừa đủ 1 viên nén bao phim',
    dosage: 'Người lớn: 1–2 viên/ngày sau bữa ăn. Không dùng quá 2 viên/ngày. Uống với nhiều nước.',
  },
  {
    name: "CEMIO MOM'S VITAMINS",
    ingredients: 'Acid Folic (Vitamin B9) 400mcg, Sắt (Iron fumarate, tương đương 14mg Fe) 43mg, Calcium carbonate (tương đương 120mg Ca2+) 300mg, Vitamin D3 400 IU, Vitamin C 40mg, Vitamin B6 1,9mg, Vitamin B12 2,6mcg, Iodine 150mcg, DHA 200mg, Tá dược vừa đủ 1 viên nén bao phim',
    dosage: 'Phụ nữ mang thai và cho con bú: 1 viên/ngày sau bữa ăn. Uống với nhiều nước. Không tự ý tăng liều. Tham khảo ý kiến bác sĩ hoặc dược sĩ trước khi dùng.',
  },
];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Đã kết nối MongoDB');

  let updated = 0;
  let notFound = 0;

  for (const u of updates) {
    const updateData = {};
    if (u.ingredients !== undefined) updateData.ingredients = u.ingredients;
    if (u.dosage !== undefined) updateData.dosage = u.dosage;
    if (u.description !== undefined) updateData.description = u.description;
    if (u.uses !== undefined) updateData.uses = u.uses;

    const result = await Product.findOneAndUpdate(
      { name: u.name },
      { $set: updateData },
      { upsert: false, new: true }
    );

    if (result) {
      console.log(`✓ Đã cập nhật: ${u.name}`);
      updated++;
    } else {
      console.log(`✗ Không tìm thấy: ${u.name}`);
      notFound++;
    }
  }

  console.log(`\nKết quả: ${updated} sản phẩm cập nhật thành công, ${notFound} không tìm thấy.`);
  await mongoose.disconnect();
}

run().catch(console.error);
