/**
 * Migration: Cập nhật ageGroup + bổ sung thông tin sản phẩm
 * Chạy: node migrate-products-full.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

// ── 1. PHÂN LOẠI LẠIAGEGROUP ─────────────────────────────────────────────────
const ageGroupMap = [
  // === Vinapharma (seed-products-2026.js) ===
  { name: 'MAS MULTIGLUCAN',                        ageGroup: 'Nam' },       // Tăng đề kháng chung, phổ biến với nam
  { name: 'VINCOOL',                                ageGroup: 'Nam' },       // Thảo dược cảm lạnh, phổ thông
  { name: 'BỔ PHỔI',                                ageGroup: 'Người già' }, // Phổi, người cao tuổi
  { name: 'MINUS TC',                               ageGroup: 'Nam' },       // Cholesterol, nam giới
  { name: 'FE TC',                                  ageGroup: 'Nữ' },        // Sắt, phụ nữ
  { name: 'TRINH NỮ ĐAN 60 viên',                  ageGroup: 'Nữ' },        // U xơ tử cung
  { name: 'TRINH NỮ ĐAN 30 viên',                  ageGroup: 'Nữ' },        // U xơ tử cung
  { name: 'BỔ MẮT NÃO BRAIN EYES',                 ageGroup: 'Người già' }, // Não và mắt, người cao tuổi
  { name: 'D3 TC',                                  ageGroup: 'Trẻ em' },    // Vitamin D3 nhỏ giọt cho trẻ
  { name: 'ĐÔNG TRÙNG HẠ THẢO',                    ageGroup: 'Nam' },       // Sinh lực nam
  { name: 'ĐẠI TRÀNG VINPHARMA',                   ageGroup: 'Người già' }, // Đại tràng, người cao tuổi
  { name: 'CEMIO CALCI MAGNESIUM ZINC',             ageGroup: 'Nữ' },        // Canxi Mg Zn, phụ nữ
  { name: 'LIVER PLUS VP',                          ageGroup: 'Nam' },       // Gan, nam giới
  { name: 'ENTERO BIO A5',                          ageGroup: 'Người già' }, // Probiotic tiêu hóa
  { name: 'CALNUTIL VP',                            ageGroup: 'Trẻ em' },    // Canxi ống nhỏ cho trẻ
  { name: 'HỒNG SÂM GINSENG ARA POWER',            ageGroup: 'Nam' },       // Nhân sâm sinh lực nam
  { name: 'DẦU LĂN XOA BÓP XƯƠNG KHỚP FIERY HOT', ageGroup: 'Người già' }, // Khớp người cao tuổi
  { name: 'DẦU XOA BÓP XỊT LẠNH SPRAY',           ageGroup: 'Nam' },       // Thể thao, nam

  // === HB Wellness (seed-hbwellness-products.js) ===
  { name: 'Ginseng And Pomegranate Drink',   ageGroup: 'Người già' },
  { name: 'Red Ginseng Essence',             ageGroup: 'Người già' },
  { name: 'Korean One Ginseng Tea',          ageGroup: 'Người già' },
  { name: 'Black Garlic Drink',              ageGroup: 'Người già' },
  { name: 'Korean Honeyed Red Ginseng 450g', ageGroup: 'Người già' },
  { name: 'Korean Honeyed Red Ginseng 220g', ageGroup: 'Người già' },
  { name: 'Slice Korea Red Ginseng',         ageGroup: 'Người già' },
  { name: 'Honeyed Korean Red Ginseng Slices', ageGroup: 'Người già' },
  { name: 'Triple Red Ginseng Pill',         ageGroup: 'Người già' },
  { name: 'Korean Red Ginseng Capsule',      ageGroup: 'Người già' },
  { name: 'Ginseng Gold Ball 1 viên',        ageGroup: 'Người già' },
  { name: 'Ginseng Gold Ball 3 viên',        ageGroup: 'Người già' },
  { name: 'Real Ginseng Drink',              ageGroup: 'Người già' },
  { name: 'Korean Red Ginseng Drink 1800ml', ageGroup: 'Người già' },
  { name: 'Hovenia Red Ginseng Drink',       ageGroup: 'Người già' },
  { name: 'Korean Red Ginseng Extract Plus', ageGroup: 'Người già' },

  // === No1EU (seed-no1eu-products.js) ===
  { name: 'Helpaid',     ageGroup: 'Nam' },       // Thảo dược hỗ trợ sức khỏe nam
  { name: 'Veins Aid',   ageGroup: 'Người già' }, // Tĩnh mạch, người cao tuổi
  { name: 'Focus+Memo',  ageGroup: 'Người già' }, // Trí nhớ, người cao tuổi
  { name: 'Vitaline A',  ageGroup: 'Người già' }, // Vitamin A cho người cao tuổi
  { name: 'Vitaline C',  ageGroup: 'Nam' },       // Vitamin C chung
  { name: 'Vitaline D3', ageGroup: 'Người già' }, // Vitamin D3 chống loãng xương
  { name: 'Vitaline Mg', ageGroup: 'Nam' },       // Magie, nam giới
  { name: 'Vitaline Se', ageGroup: 'Nam' },       // Selen chống oxy hóa
  { name: 'Vitaline Zn', ageGroup: 'Nam' },       // Kẽm, miễn dịch nam

  // === ActivLab (seed-activlab-products.js) ===
  { name: 'Calci K2D3',                   ageGroup: 'Nữ' },        // Canxi cho phụ nữ
  { name: 'Osteoperos D3 2000 IU',        ageGroup: 'Người già' }, // Loãng xương cao tuổi
  { name: 'Bacopa',                       ageGroup: 'Người già' }, // Trí não người cao tuổi
  { name: 'Biloba Plus',                  ageGroup: 'Người già' }, // Tuần hoàn não
  { name: 'LipiCholester Extra',          ageGroup: 'Người già' }, // Cholesterol cao tuổi
  { name: 'Lutein Extra',                 ageGroup: 'Người già' }, // Mắt người cao tuổi
  { name: 'Omega 3 1000mg',               ageGroup: 'Người già' }, // Tim mạch cao tuổi
  { name: 'Biotin Forte 10mg',            ageGroup: 'Nữ' },
  { name: 'CycloGEL MAX',                 ageGroup: 'Nữ' },
  { name: 'CycloVenox 3',                 ageGroup: 'Nữ' },
  { name: 'Magnesium + Vit.B6 + Vit.D3', ageGroup: 'Nam' },       // Magie B6 D3 thể thao
  { name: 'Melatonin 1mg',               ageGroup: 'Người già' }, // Giấc ngủ cao tuổi
  { name: 'Melatonin Extra 5mg',          ageGroup: 'Người già' },
  { name: 'NeuroLip Extra 600',           ageGroup: 'Người già' }, // Thần kinh cao tuổi
  { name: 'Potassium 320mg',              ageGroup: 'Người già' }, // Kali tim mạch
  { name: 'SinuPure',                     ageGroup: 'Nam' },       // Xoang, hô hấp
  { name: 'Vitamin B-Complex',            ageGroup: 'Nam' },       // B-Complex năng lượng
  { name: 'DebuActiv 150',               ageGroup: 'Nam' },       // Tiêu hóa enzyme
  { name: 'SanBiotics Super Formula',    ageGroup: 'Người già' }, // Probiotic cao cấp
  { name: 'Essepatil Extra Softgel',     ageGroup: 'Nam' },       // Gan nam giới
  { name: 'HepaFit Forte',               ageGroup: 'Nam' },
  { name: 'Silymarin Extra 70mg',        ageGroup: 'Nam' },
  { name: 'KreoActiv Plus',              ageGroup: 'Nam' },
  { name: 'ElectroVit Cramp',            ageGroup: 'Nam' },       // Chuột rút thể thao
];

// ── 2. BỔ SUNG THÔNG TIN SẢN PHẨM ───────────────────────────────────────────
const productInfo = [
  {
    name: 'MAS CALCI DK2',
    uses: 'Hỗ trợ bổ sung canxi, Vitamin D3 và K2 cho trẻ em trong giai đoạn tăng trưởng. Hỗ trợ phát triển chiều cao, tăng cường hấp thu canxi vào xương và răng, giúp xương chắc khỏe. Hỗ trợ giảm nguy cơ còi xương, chậm phát triển chiều cao ở trẻ do thiếu canxi và Vitamin D3.',
    dosage: 'Trẻ 1–3 tuổi: 2,5 ml/lần, 1 lần/ngày. Trẻ 3–6 tuổi: 5 ml/lần, 1 lần/ngày. Trẻ trên 6 tuổi: 10 ml/lần, 1 lần/ngày. Lắc đều trước khi uống.',
    ingredients: 'Calcium citrate 571,42 mg, Magnesium citrate 348 mg, Vitamin K2 (MK-7) 150 mcg, Vitamin D3 (Cholecalciferol) 8 mcg, Zinc sulfate 4,12 mg.',
    packaging: 'Hộp 1 chai 150 ml dạng siro uống.'
  },
  {
    name: 'VIÊN ĐẶT ÂM ĐẠO VITREX PLUS',
    uses: 'Hỗ trợ cải thiện tình trạng khô âm đạo, cân bằng môi trường âm đạo và giảm ngứa, rát do viêm nhiễm. Hỗ trợ phục hồi niêm mạc âm đạo, giảm nguy cơ tái phát viêm nhiễm vùng kín.',
    dosage: 'Đặt 1 viên/ngày vào sâu trong âm đạo, liên tục 7 ngày. Nên dùng buổi tối trước khi đi ngủ. Rửa tay sạch trước khi sử dụng.',
    ingredients: 'Acid hyaluronic, Chlorhexidine digluconate, Vitamin E, Chiết xuất lô hội (Aloe vera), tá dược vừa đủ.',
    packaging: 'Hộp 1 vỉ x 7 viên đặt âm đạo.'
  },
  {
    name: 'ISOPLUS-ZT',
    uses: 'Hỗ trợ cân bằng nội tiết tố nữ, giảm triệu chứng do thiếu hụt estrogen như bốc hỏa, mất ngủ, thay đổi tâm trạng. Hỗ trợ cải thiện làn da, giảm lão hóa và cải thiện chức năng sinh lý nữ.',
    dosage: 'Người lớn: uống 1 viên nang mềm/lần, 1–2 lần/ngày sau bữa ăn.',
    ingredients: 'Chiết xuất đậu nành (Isoflavone), chiết xuất Ginkgo biloba, Vitamin E (Tocopherol), Magie.',
    packaging: 'Hộp 2 vỉ x 15 viên nang mềm (30 viên/hộp).'
  },
  {
    name: 'MUMMACAL-ZT',
    uses: 'Hỗ trợ bổ sung canxi hữu cơ, Vitamin D3 và K2 cho phụ nữ mang thai và cho con bú. Hỗ trợ phát triển hệ xương răng thai nhi, ngăn ngừa mất canxi ở mẹ trong thai kỳ.',
    dosage: 'Phụ nữ mang thai và cho con bú: uống 1 viên nang mềm/ngày sau bữa ăn tối.',
    ingredients: 'Aquamin (canxi hữu cơ từ tảo Lithothamnion) 406,2 mg (Ca 130 mg), Vitamin D3 200 IU, Magnesium 15 mg, Vitamin K2-MK7 25 mcg.',
    packaging: 'Hộp 2 vỉ x 15 viên nang mềm (30 viên/hộp).'
  },
  {
    name: 'MUMFOLATE DIAMOND',
    uses: 'Hỗ trợ bổ sung sắt hữu cơ dễ hấp thu và acid folate cho phụ nữ mang thai, chuẩn bị mang thai. Hỗ trợ giảm nguy cơ dị tật ống thần kinh thai nhi và thiếu máu do thiếu sắt trong thai kỳ.',
    dosage: 'Uống 1 viên nang mềm/ngày, buổi sáng trước bữa ăn 30 phút cùng ít nhất 250 ml nước.',
    ingredients: 'Ferrous bisglycinate 73,5 mg (sắt nguyên tố 14 mg), L-methylfolate (5-MTHF) 400 mcg, Inulin 100 mg.',
    packaging: 'Hộp 2 vỉ x 15 viên nang mềm (30 viên/hộp).'
  },
  {
    name: 'EPO QUEEN',
    uses: 'Hỗ trợ bổ sung nội tiết tố nữ, giảm triệu chứng tiền mãn kinh như bốc hỏa, mất ngủ, đau bụng kinh. Hỗ trợ làm đẹp da, chống lão hóa nhờ acid gamma-linolenic (GLA) và tăng cường sức khỏe sinh sản.',
    dosage: 'Người lớn: uống 1 viên nang mềm/lần, 1–2 lần/ngày trong bữa ăn. Không dùng cho phụ nữ mang thai.',
    ingredients: 'Tinh dầu hoa anh thảo (Evening Primrose Oil) 800 mg, GLA 80 mg, Vitamin E 15 mg, Coenzyme Q10 5 mg.',
    packaging: 'Hộp 2 vỉ x 15 viên nang mềm (30 viên/hộp).'
  },
  {
    name: 'MAS MULTIGLUCAN',
    uses: 'Hỗ trợ bổ sung Beta-glucan, sắt hữu cơ, kẽm và vitamin giúp tăng cường miễn dịch cho trẻ em và người lớn. Hỗ trợ cải thiện tình trạng biếng ăn, nâng cao sức đề kháng và phát triển toàn diện ở trẻ.',
    dosage: 'Trẻ 5–10 kg: 1,5 ml/ngày. Trẻ trên 10 kg và người lớn: 5–10 ml/ngày. Lắc đều trước khi dùng.',
    ingredients: 'Beta-glucan, Iron bisglycinate, Zinc citrate, Vitamin A, C, D3, E, B1, B2, B3, B5, B6, Magnesium.',
    packaging: 'Hộp 1 chai 150 ml dạng siro uống.'
  },
  {
    name: 'Clover FOLATE',
    uses: 'Hỗ trợ bổ sung acid folic (Vitamin B9) cho phụ nữ trước, trong và sau khi sinh. Hỗ trợ giảm nguy cơ dị tật ống thần kinh và tăng cường quá trình tạo máu lành mạnh.',
    dosage: 'Phụ nữ chuẩn bị mang thai: 1 viên/ngày. Phụ nữ mang thai: 1–2 viên/ngày theo chỉ định bác sĩ.',
    ingredients: 'Acid folic (Vitamin B9) 400 mcg/viên, tá dược vừa đủ.',
    packaging: 'Hộp 30 viên nang mềm.'
  },
  {
    name: 'Clover DHA',
    uses: 'Hỗ trợ bổ sung DHA và EPA cho phụ nữ mang thai, sau sinh, đang cho con bú. Hỗ trợ phát triển não bộ và thị lực thai nhi, tăng cường trí nhớ và chức năng thần kinh.',
    dosage: 'Phụ nữ mang thai và cho con bú: 1 viên nang mềm/ngày sau bữa ăn. Người trưởng thành: 1–2 viên/ngày.',
    ingredients: 'Dầu gan cá tuyết (Cod Liver Oil) giàu DHA (≥200 mg/viên) và EPA, Vitamin A, D3, E.',
    packaging: 'Hộp 30 viên nang mềm.'
  },
  {
    name: 'VINCOOL',
    uses: 'Hỗ trợ nhuận phế, giảm đờm, giảm ho do cảm lạnh và thay đổi thời tiết. Hỗ trợ làm dịu đau rát họng và giảm triệu chứng hắt hơi, chảy nước mũi.',
    dosage: 'Trẻ 2–6 tuổi: 1 viên/lần x 1–2 lần/ngày. Trẻ 6–12 tuổi: 1 viên/lần x 2–3 lần/ngày. Người lớn: 2 viên/lần x 2 lần/ngày sau bữa ăn.',
    ingredients: 'Chiết xuất Cát cánh (Platycodon grandiflorus), Hoa hồi (Illicium verum), Lá tía tô (Perilla frutescens), Bạch thược (Paeonia lactiflora).',
    packaging: 'Hộp 8 vỉ x 10 viên (80 viên/hộp).'
  },
  {
    name: 'SUPER BABY',
    uses: 'Hỗ trợ tăng cường sức đề kháng và hệ miễn dịch cho trẻ nhờ Thymomodulin. Hỗ trợ cải thiện biếng ăn, giúp ăn ngon và hấp thu dinh dưỡng tốt hơn nhờ enzyme tiêu hóa và L-Lysine.',
    dosage: 'Trẻ 6 tháng–3 tuổi: 1 túi/ngày. Trẻ 3–9 tuổi: 1 túi x 2 lần/ngày. Trẻ >9 tuổi: 1 túi x 3 lần/ngày. Pha với nước/sữa.',
    ingredients: 'Thymomodulin, L-Lysine HCl, Amylase, Protease, Cellulase, Maltase, Papain, Zinc gluconate.',
    packaging: 'Hộp 12 túi x 10 ml dạng dung dịch uống.'
  },
  {
    name: 'BỔ PHỔI',
    uses: 'Hỗ trợ bổ phổi, giảm ho, giảm đờm từ thảo dược quý như cát cánh, mạch môn đông. Hỗ trợ giảm đau rát họng, khàn tiếng do viêm họng và viêm phế quản mạn tính.',
    dosage: 'Người lớn: 2 viên/lần x 3 lần/ngày trước bữa ăn 30 phút. Dùng liên tục 4–8 tuần.',
    ingredients: 'Cao chiết Cát cánh (Platycodon), Mạch môn đông (Ophiopogon), Ngưu bàng tử (Arctium lappa), Bách bộ (Stemona), Hoa hồi.',
    packaging: 'Hộp 3 vỉ x 10 viên (30 viên/hộp).'
  },
  {
    name: 'MINUS TC',
    uses: 'Hỗ trợ giảm cholesterol xấu (LDL) và triglycerides trong máu, hỗ trợ tăng cholesterol tốt (HDL). Hỗ trợ cải thiện chức năng gan và giảm nguy cơ xơ vữa động mạch.',
    dosage: 'Người lớn: 1–2 viên/lần x 2 lần/ngày sau bữa ăn. Dùng liên tục ít nhất 1–3 tháng.',
    ingredients: 'Chiết xuất Giảo cổ lam, Artichoke (Actiso), Natto extract, Nấm linh chi (Ganoderma), Coenzyme Q10.',
    packaging: 'Hộp 4 vỉ x 10 viên (40 viên/hộp).'
  },
  {
    name: 'FE TC',
    uses: 'Hỗ trợ bổ sung sắt và acid folic, tăng cường tạo máu và giảm nguy cơ thiếu máu do thiếu sắt. Phù hợp cho phụ nữ mang thai, sau sinh, đang cho con bú và thiếu nữ tuổi dậy thì.',
    dosage: 'Người lớn: 10 ml/lần x 1 lần/ngày, uống buổi sáng trước bữa ăn để tăng hấp thu. Lắc đều trước khi dùng.',
    ingredients: 'Sắt III polymaltose 100 mg, Acid folic 100 mcg, Vitamin B12 5 mcg, Vitamin D3 200 IU, Kẽm gluconate 30 mg, DHA 10 mg.',
    packaging: 'Hộp 1 chai 30 ml dạng dung dịch uống.'
  },
  {
    name: 'TRINH NỮ ĐAN 60 viên',
    uses: 'Hỗ trợ hạn chế sự phát triển của u xơ tử cung nhờ hoạt chất từ cây Trinh nữ hoàng cung. Hỗ trợ giảm đau bụng, rối loạn kinh nguyệt do u xơ gây ra.',
    dosage: 'Người lớn: 1 viên/lần x 3 lần/ngày sau bữa ăn. Dùng liên tục 2–3 tháng.',
    ingredients: 'Cao chiết Trinh nữ hoàng cung (Crinum latifolium), Nano Curcumin, Náng hoa trắng, Hương phụ (Cyperus rotundus).',
    packaging: 'Hộp 1 lọ 60 viên nang.'
  },
  {
    name: 'TRINH NỮ ĐAN 30 viên',
    uses: 'Hỗ trợ hạn chế sự phát triển của u xơ tử cung nhờ hoạt chất từ cây Trinh nữ hoàng cung. Hỗ trợ giảm đau bụng, rối loạn kinh nguyệt do u xơ gây ra.',
    dosage: 'Người lớn: 1 viên/lần x 3 lần/ngày sau bữa ăn. Dùng liên tục 2–3 tháng.',
    ingredients: 'Cao chiết Trinh nữ hoàng cung (Crinum latifolium), Nano Curcumin, Náng hoa trắng, Hương phụ (Cyperus rotundus).',
    packaging: 'Hộp 3 vỉ x 10 viên (30 viên/hộp).'
  },
  {
    name: 'BỔ MẮT NÃO BRAIN EYES',
    uses: 'Hỗ trợ tăng cường tuần hoàn máu não và cải thiện chức năng thị lực. Hỗ trợ giảm hoa mắt, chóng mặt, đau đầu do rối loạn tuần hoàn máu não và bảo vệ tế bào não, võng mạc mắt.',
    dosage: 'Người lớn: 1 gói 10 ml/lần x 2 lần/ngày sau bữa ăn.',
    ingredients: 'Chiết xuất Ginkgo biloba, Việt quất (Blueberry), Vitamin A, B6, Choline bitartrate, Beta-glucan.',
    packaging: 'Hộp 20 gói x 10 ml dạng dung dịch uống.'
  },
  {
    name: 'D3 TC',
    uses: 'Hỗ trợ bổ sung Vitamin D3 cho cơ thể, giúp tăng cường hấp thu canxi và phospho vào xương. Hỗ trợ giảm nguy cơ còi xương ở trẻ em, loãng xương ở người lớn và tăng cường hệ miễn dịch.',
    dosage: 'Trẻ dưới 1 tuổi: 1 giọt/ngày. Trẻ 1–18 tuổi: 2–3 giọt/ngày. Người lớn: 5 giọt/ngày. Nhỏ trực tiếp vào miệng hoặc pha vào thức ăn.',
    ingredients: 'Vitamin D3 (Cholecalciferol) 400 IU/0,1 ml, dầu thực vật, tá dược vừa đủ.',
    packaging: 'Hộp 1 chai 30 ml dạng nhỏ giọt.'
  },
  {
    name: 'ĐÔNG TRÙNG HẠ THẢO',
    uses: 'Hỗ trợ tăng cường sức khỏe toàn diện, giảm mệt mỏi và suy nhược cơ thể nhờ cordycepin và adenosine từ nấm Đông trùng hạ thảo. Hỗ trợ nâng cao hệ miễn dịch, tăng cường sinh lực và bảo vệ thận, gan.',
    dosage: 'Người lớn: 1–2 viên/lần x 2 lần/ngày trước bữa ăn 30–45 phút. Dùng liên tục 3–4 tháng.',
    ingredients: 'Cao chiết Đông trùng hạ thảo (Cordyceps sinensis), Nhân sâm (Panax ginseng), Linh chi (Ganoderma), Nhung hươu.',
    packaging: 'Hộp 2 lọ x 30 viên nang (60 viên/hộp).'
  },
  {
    name: 'ĐẠI TRÀNG VINPHARMA',
    uses: 'Hỗ trợ bổ sung lợi khuẩn, cân bằng hệ vi sinh đường ruột và giảm triệu chứng rối loạn tiêu hóa do viêm đại tràng. Hỗ trợ giảm đầy bụng, khó tiêu, tiêu chảy và táo bón do loạn khuẩn đường ruột.',
    dosage: 'Người lớn: 1 ống 10 ml/lần x 2 lần/ngày. Lắc đều, uống trực tiếp hoặc pha với nước.',
    ingredients: 'Bacillus subtilis (2×10⁹ CFU/10 ml), Bacillus clausii, nước tinh khiết, tá dược vừa đủ.',
    packaging: 'Hộp 10 ống x 10 ml dạng dung dịch uống.'
  },
  {
    name: 'CEMIO CALCI MAGNESIUM ZINC',
    uses: 'Hỗ trợ bổ sung canxi, magie, kẽm và biotin giúp duy trì xương, răng và tóc chắc khỏe. Hỗ trợ giảm nguy cơ loãng xương, chuột rút cơ bắp và hệ thần kinh cơ hoạt động bình thường.',
    dosage: 'Người lớn: 1 viên/lần x 2–3 lần/ngày sau bữa ăn. Không dùng quá 3 viên/ngày.',
    ingredients: 'Calcium carbonate (Ca²⁺ 400 mg), Magnesium oxide (Mg 100 mg), Zinc oxide (Zn 5 mg), Biotin 30 mcg.',
    packaging: 'Hộp 4 vỉ x 10 viên (40 viên/hộp).'
  },
  {
    name: 'CEMIO MOM\'S VITAMINS',
    uses: 'Hỗ trợ bổ sung vitamin và khoáng chất toàn diện cho phụ nữ mang thai và cho con bú. Hỗ trợ phát triển hệ thần kinh, xương và thị lực của thai nhi và bảo vệ sức khỏe người mẹ.',
    dosage: 'Phụ nữ mang thai và cho con bú: 1 viên/ngày sau bữa ăn. Nên bắt đầu dùng từ 3 tháng trước khi mang thai.',
    ingredients: 'Acid folic 400 mcg, Sắt 30 mg, Canxi 200 mg, Vitamin D3 400 IU, C 70 mg, E 10 IU, B1, B2, B6, B12, Kẽm 7,5 mg, Iod 150 mcg.',
    packaging: 'Hộp 4 vỉ x 10 viên (40 viên/hộp).'
  },
  {
    name: 'LIVER PLUS VP',
    uses: 'Hỗ trợ thanh nhiệt, mát gan, giải độc gan và bảo vệ tế bào gan khỏi tác hại của rượu bia, hóa chất. Hỗ trợ tăng cường chức năng gan, giúp phục hồi men gan và cải thiện gan nhiễm mỡ.',
    dosage: 'Trẻ trên 10 tuổi và người lớn: 2 viên/lần x 2 lần/ngày sau bữa ăn. Dùng liên tục 1–3 tháng.',
    ingredients: 'Cao chiết Diệp hạ châu 500 mg, Actiso 400 mg, Cà gai leo 800 mg, Giảo cổ lam 400 mg, Silymarin 40% 200 mg, L-Ornithine L-Aspartate 200 mg.',
    packaging: 'Hộp 4 vỉ x 10 viên (40 viên/hộp).'
  },
  {
    name: 'CENORVA NEW VP',
    uses: 'Hỗ trợ hoạt huyết, tăng cường tuần hoàn máu não, cải thiện thiểu năng tuần hoàn não ở người cao tuổi. Hỗ trợ giảm đau đầu, hoa mắt, chóng mặt, mất ngủ và cải thiện trí nhớ.',
    dosage: 'Người lớn và người cao tuổi: 1–2 viên/lần x 2 lần/ngày sau bữa ăn.',
    ingredients: 'Chiết xuất Ginkgo biloba 500 mg, Rau đắng biển 200 mg, Thông đất 200 mg, Blueberry 20 mg, Nattokinase, Omega-3, Đinh lăng, Coenzyme Q10.',
    packaging: 'Hộp 3 vỉ x 10 viên (30 viên/hộp).'
  },
  {
    name: 'BIOFLEX VP',
    uses: 'Hỗ trợ làm trơn ổ khớp, hạn chế lão hóa sụn khớp nhờ glucosamine và chondroitin. Hỗ trợ giảm đau khớp, cứng khớp do viêm khớp và thoái hóa khớp ở người cao tuổi.',
    dosage: 'Người lớn: 1 viên/lần x 3 lần/ngày trong hoặc sau bữa ăn. Dùng liên tục ít nhất 2–3 tháng.',
    ingredients: 'Glucosamine sulfate 500 mg, Chondroitin sulfate 400 mg, chiết xuất Gừng (Zingiber officinale), Hoàng bá.',
    packaging: 'Hộp 30 viên nang.'
  },
  {
    name: 'ENTERO BIO A5',
    uses: 'Hỗ trợ bổ sung lợi khuẩn sống, cân bằng hệ vi sinh đường ruột và giảm rối loạn tiêu hóa do loạn khuẩn. Hỗ trợ giảm tiêu chảy, đầy bụng, khó tiêu sau khi dùng kháng sinh.',
    dosage: 'Trẻ dưới 1 tuổi: 10 ml/ngày. Trẻ 1–6 tuổi: 10 ml x 2 lần/ngày. Người lớn: 10 ml x 2–3 lần/ngày. Lắc đều, có thể pha với nước hoặc sữa.',
    ingredients: 'Bacillus subtilis (2×10⁹ CFU/10 ml), Bacillus clausii (2×10⁹ CFU/10 ml), tá dược vừa đủ.',
    packaging: 'Hộp 20 ống x 10 ml dạng dung dịch uống.'
  },
  {
    name: 'CALNUTIL VP',
    uses: 'Hỗ trợ bổ sung canxi và Vitamin D3, giúp xương và răng chắc khỏe. Hỗ trợ giảm nguy cơ còi xương ở trẻ em và loãng xương ở người lớn.',
    dosage: 'Trẻ dưới 1 tuổi: 1 ống/ngày. Trẻ 1–5 tuổi: 1 ống x 2 lần/ngày. Người lớn: 1 ống x 2–3 lần/ngày. Lắc đều trước khi dùng.',
    ingredients: 'Calcium gluconate (Ca²⁺ 50 mg/10 ml), Vitamin D3 200 IU/10 ml, tá dược vừa đủ.',
    packaging: 'Hộp 20 ống x 10 ml dạng dung dịch uống.'
  },
  {
    name: 'HỒNG SÂM GINSENG ARA POWER',
    uses: 'Hỗ trợ tăng cường sức khỏe, bồi bổ sinh lực và giảm mệt mỏi nhờ Ginsenoside và Saponin từ hồng sâm Hàn Quốc 6 năm tuổi. Hỗ trợ tăng cường tuần hoàn máu, cải thiện trí nhớ và nâng cao hệ miễn dịch.',
    dosage: 'Người lớn: 1 viên/lần x 2 lần/ngày sau bữa ăn (sáng và tối). Không dùng cho trẻ dưới 12 tuổi.',
    ingredients: 'Hồng sâm Hàn Quốc 6 năm tuổi (Panax ginseng) hàm lượng cao, Kẽm (Zinc), Biotin (B7), Thiamine (B1), Calcium.',
    packaging: 'Hộp 1 lọ 60 viên nang. Xuất xứ: Hàn Quốc.'
  },
  {
    name: 'AN NGƯU CUNG HOÀNG HOÀN hộp 1 viên',
    uses: 'Hỗ trợ điều hòa tuần hoàn máu não, hỗ trợ phòng ngừa biến chứng tai biến mạch máu não do tắc mạch theo y học cổ truyền. Hỗ trợ thanh nhiệt, giải độc và an thần theo y học cổ truyền.',
    dosage: 'Theo hướng dẫn của thầy thuốc y học cổ truyền. Thông thường: 1 viên/ngày, buổi sáng sau bữa ăn với nước ấm. Không dùng khi có xuất huyết não.',
    ingredients: 'Ngưu hoàng (mật bò kết tinh), Cao sừng trâu, Xạ hương, Trân châu, Băng phiến, Chi tử, Hoàng cầm, Hoàng liên, mật ong, sáp ong.',
    packaging: 'Hộp 1 viên hoàn 3 g.'
  },
  {
    name: 'AN NGƯU CUNG HOÀNG HOÀN hộp 3 viên',
    uses: 'Hỗ trợ điều hòa tuần hoàn máu não, hỗ trợ phòng ngừa biến chứng tai biến mạch máu não do tắc mạch theo y học cổ truyền. Hỗ trợ thanh nhiệt, giải độc và an thần theo y học cổ truyền.',
    dosage: 'Theo hướng dẫn của thầy thuốc y học cổ truyền. Thông thường: 1 viên/ngày, buổi sáng sau bữa ăn với nước ấm. Không dùng khi có xuất huyết não.',
    ingredients: 'Ngưu hoàng (mật bò kết tinh), Cao sừng trâu, Xạ hương, Trân châu, Băng phiến, Chi tử, Hoàng cầm, Hoàng liên, mật ong, sáp ong.',
    packaging: 'Hộp 3 viên hoàn 3 g/viên.'
  },
  {
    name: 'DẦU LĂN XOA BÓP XƯƠNG KHỚP FIERY HOT',
    uses: 'Hỗ trợ giảm đau cơ bắp, đau nhức xương khớp và cải thiện tình trạng chấn thương cơ sau vận động. Hỗ trợ thúc đẩy tuần hoàn máu tại chỗ, giảm đau lưng, cổ vai gáy và tê thấp.',
    dosage: 'Lăn hoặc thoa lượng vừa đủ lên vùng đau, xoa bóp nhẹ nhàng 2–3 phút. Dùng 2–3 lần/ngày. Không bôi lên mắt hoặc vùng da tổn thương.',
    ingredients: 'Methyl Salicylate, Menthol (tinh dầu bạc hà), Capsaicin (ớt), tinh dầu Khuynh diệp, tinh dầu Long não.',
    packaging: 'Chai 50 ml dạng dầu lăn.'
  },
  {
    name: 'DẦU XOA BÓP XỊT LẠNH SPRAY',
    uses: 'Hỗ trợ giảm đau nhanh cơn đau căng cơ, bong gân, bầm tím nhờ tác dụng làm lạnh từ Menthol. Hỗ trợ giảm sưng, phù nề sau chấn thương thể thao và đau mỏi vai gáy, đau lưng.',
    dosage: 'Xịt trực tiếp từ khoảng cách 15–20 cm, xoa nhẹ để thuốc thấm. Dùng 2–3 lần/ngày. Không dùng cho phụ nữ mang thai và trẻ dưới 12 tuổi.',
    ingredients: 'Menthol 3.000 mg, Methyl Salicylate, Nonivamide 12 mg, Isopropyl Alcohol, tá dược vừa đủ.',
    packaging: 'Chai xịt 100 ml.'
  },
  {
    name: 'GEL VỆ SINH QUEEN LOVE Hương Hoa Hồng',
    uses: 'Hỗ trợ vệ sinh vùng kín hàng ngày, cân bằng độ pH âm đạo và bảo vệ da vùng kín. Hỗ trợ giảm ngứa, rát, khó chịu và giữ ẩm tự nhiên cho vùng kín.',
    dosage: 'Dùng hàng ngày khi tắm. Lấy lượng vừa đủ, thoa nhẹ nhàng lên vùng cần vệ sinh, rồi rửa lại với nước sạch.',
    ingredients: 'Lactic acid, Niacinamide, Chiết xuất hoa hồng, Panthenol (Provitamin B5), Allantoin, Aloe vera.',
    packaging: 'Chai 150 ml dạng gel vệ sinh.'
  },
  {
    name: 'GEL VỆ SINH QUEEN LOVE Hương Hoa Nhài',
    uses: 'Hỗ trợ vệ sinh vùng kín hàng ngày, cân bằng độ pH âm đạo và bảo vệ da vùng kín. Hỗ trợ giảm ngứa, rát, khó chịu và giữ ẩm tự nhiên cho vùng kín.',
    dosage: 'Dùng hàng ngày khi tắm. Lấy lượng vừa đủ, thoa nhẹ nhàng lên vùng cần vệ sinh, rồi rửa lại với nước sạch.',
    ingredients: 'Lactic acid, Niacinamide, Chiết xuất hoa nhài (Jasmine), Panthenol (Provitamin B5), Allantoin, Aloe vera.',
    packaging: 'Chai 150 ml dạng gel vệ sinh.'
  },
  {
    name: 'Fresh Queen Hương Bạc Hà',
    uses: 'Hỗ trợ khử mùi, tạo cảm giác mát lạnh và duy trì sạch sẽ, khô thoáng cho vùng kín. Hỗ trợ cân bằng độ pH tự nhiên và bảo vệ hệ vi sinh có lợi của âm đạo.',
    dosage: 'Dùng ngoài da. Xịt hoặc thoa trực tiếp lên vùng cần sử dụng sau khi vệ sinh. Dùng hàng ngày.',
    ingredients: 'Tinh dầu bạc hà (Mentha piperita), Lactic acid, Lactobacillus ferment, Vitamin E.',
    packaging: 'Chai xịt 100 ml.'
  },
  {
    name: 'Fresh Queen Hương Hoa',
    uses: 'Hỗ trợ khử mùi, tạo hương thơm dễ chịu và duy trì sạch sẽ, khô thoáng cho vùng kín. Hỗ trợ cân bằng độ pH tự nhiên và bảo vệ hệ vi sinh có lợi của âm đạo.',
    dosage: 'Dùng ngoài da. Xịt hoặc thoa trực tiếp lên vùng cần sử dụng sau khi vệ sinh. Dùng hàng ngày.',
    ingredients: 'Chiết xuất hoa (Flower complex), Lactic acid, Lactobacillus ferment, Vitamin E.',
    packaging: 'Chai xịt 100 ml.'
  },
  {
    name: 'PLACENTA ROYAL COLLAGEN 30000 PREMIUM',
    uses: 'Hỗ trợ bổ sung collagen thủy phân và nhau thai cừu, giúp làm đẹp da từ bên trong, giảm nếp nhăn và tăng độ đàn hồi cho da. Hỗ trợ làm sáng da, mờ nám và cải thiện tình trạng da khô thiếu ẩm.',
    dosage: 'Người lớn: uống 1 chai/ngày. Lắc đều trước khi uống. Dùng liên tục để đạt hiệu quả.',
    ingredients: 'Collagen thủy phân (Marine Collagen) 30.000 mg, nhau thai cừu (Sheep Placenta), Coenzyme Q10, Vitamin C, Hyaluronic acid.',
    packaging: 'Hộp 6 chai x 50 ml dạng nước uống.'
  },
  {
    name: 'Double Perfect Miracle Drink',
    uses: 'Hỗ trợ bổ sung collagen, làm đẹp da từ bên trong và hỗ trợ chống lão hóa, giảm nếp nhăn. Hỗ trợ cải thiện sắc tố da, giảm thâm nám và tăng cường độ ẩm cho da.',
    dosage: 'Người lớn: uống 1 gói/ngày vào buổi sáng hoặc tối trước khi ngủ. Dùng liên tục ít nhất 4–8 tuần.',
    ingredients: 'Collagen thủy phân, Vitamin C, Chiết xuất hạt nho (Grape seed), Coenzyme Q10, Hyaluronic acid, Glutathione.',
    packaging: 'Hộp 30 gói dạng bột pha uống.'
  },
];

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Đã kết nối MongoDB');

    let updated = 0;
    let notFound = 0;

    // ── BƯỚC 1: Cập nhật ageGroup theo danh sách ──
    console.log('\n📋 Bước 1: Cập nhật ageGroup...');
    for (const item of ageGroupMap) {
      const escaped = item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const result = await Product.updateOne(
        { name: { $regex: new RegExp('^' + escaped + '$', 'i') } },
        { $set: { ageGroup: item.ageGroup } }
      );
      if (result.modifiedCount > 0) {
        console.log(`  ✅ [${item.ageGroup}] ${item.name}`);
        updated++;
      } else if (result.matchedCount === 0) {
        console.log(`  ⚠️  Không tìm thấy: ${item.name}`);
        notFound++;
      }
    }

    // ── BƯỚC 2: Đổi tất cả còn "Tất cả" → "Nam" (fallback an toàn) ──
    const remaining = await Product.updateMany(
      { ageGroup: 'Tất cả' },
      { $set: { ageGroup: 'Nam' } }
    );
    if (remaining.modifiedCount > 0) {
      console.log(`\n  ✅ Đổi ${remaining.modifiedCount} sản phẩm còn lại "Tất cả" → "Nam"`);
    }

    // ── BƯỚC 3: Bổ sung thông tin sản phẩm ──
    console.log('\n📋 Bước 3: Bổ sung thông tin sản phẩm...');
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
