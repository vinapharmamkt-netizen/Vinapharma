/**
 * seed-about-images.js
 * Upload ảnh từ folder "hình ảnh" lên Cloudinary
 * → Cập nhật thumbnail + nội dung bài cho 8 section Giới thiệu
 */
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const mongoose   = require('mongoose');
const path       = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const BASE = 'D:/Vinapharma Web/files/hình ảnh';

// ── Mapping ảnh cho từng section ─────────────────────────────
const SECTIONS = [
  {
    // 0 — Về VinaPharma
    thumbnail: `${BASE}/2022/Hội thảo miền Nam/IMG_9069.JPG`,
    contentImages: [
      `${BASE}/2022/Hội thảo miền Nam/IMG_9098.JPG`,
      `${BASE}/2022/Hội thảo miền Nam/IMG_9122.JPG`,
      `${BASE}/2022/Hội thảo miền Nam/IMG_9123.JPG`,
      `${BASE}/2022/Hội thảo miền Nam/IMG_9126.JPG`,
    ],
  },
  {
    // 1 — Đồng hành cùng sức khỏe Việt
    thumbnail: `${BASE}/2023/Tháng 5 Nhà Thuốc Mát Tay/474466133_583453348002874_6254143008789422834_n.jpg`,
    contentImages: [
      `${BASE}/2023/Tháng 5 Nhà Thuốc Mát Tay/474563949_585189334495942_2952057004149969808_n.jpg`,
      `${BASE}/2023/Tháng 6 Nhà Thuốc Minh Phương/474727302_585189247829284_5268897501570878395_n.jpg`,
      `${BASE}/2023/Tháng 6 Nhà Thuốc Minh Phương/474801203_585189257829283_6937505682914684157_n.jpg`,
      `${BASE}/2023/Tháng 6 Nhà Thuốc Minh Phương/474692744_585189211162621_5928109625314186981_n.jpg`,
    ],
  },
  {
    // 2 — Các trụ cột hoạt động
    thumbnail: `${BASE}/Đào tạo dược sĩ/475842558_563491756705223_3837865917947128374_n.jpg`,
    contentImages: [
      `${BASE}/Đào tạo dược sĩ/476111260_563491640038568_1427310438030436978_n.jpg`,
      `${BASE}/Đào tạo dược sĩ/476225064_563491653371900_4326611699011543061_n.jpg`,
      `${BASE}/Đào tạo dược sĩ/476226760_563491750038557_7730392492729677187_n.jpg`,
      `${BASE}/2023/Tháng 11 Event Cosderm 20.11/476840969_569104279477304_3183297969840803476_n.jpg`,
    ],
  },
  {
    // 3 — Ban lãnh đạo
    thumbnail: `${BASE}/Hoạt động công ty/2024 Tour tham quan_VIP/Hàn Quốc/481080913_616824957999046_8905911911347296856_n.jpg`,
    contentImages: [
      `${BASE}/Hoạt động công ty/2024 Tour tham quan_VIP/Hàn Quốc/481062681_616825087999033_4700118088579781873_n.jpg`,
      `${BASE}/Hoạt động công ty/2024 Tour tham quan_VIP/Hàn Quốc/481080601_616824887999053_2080514768646331308_n.jpg`,
      `${BASE}/Hoạt động công ty/2024 Tour tham quan_VIP/Thái Lan/481775947_617110824637126_4082458783662482691_n.jpg`,
      `${BASE}/Hoạt động công ty/2024 Tour tham quan_VIP/Thái Lan/481823177_617111157970426_7261219163902584144_n.jpg`,
    ],
  },
  {
    // 4 — Con người VinaPharma
    thumbnail: `${BASE}/Hoạt động công ty/2025 YEP/626362306_885611894453683_3909636624794928135_n.jpg`,
    contentImages: [
      `${BASE}/Hoạt động công ty/2025 YEP/626456695_885611837787022_1754803274052648704_n.jpg`,
      `${BASE}/Hoạt động công ty/2025 YEP/625164933_885611924453680_6909536236982327056_n.jpg`,
      `${BASE}/Hoạt động công ty/2024 YEP/484505590_621686767512865_8684341223090664254_n.jpg`,
      `${BASE}/Hoạt động công ty/2024 YEP/483926584_621687024179506_2021402623914981259_n.jpg`,
    ],
  },
  {
    // 5 — Hành trình phát triển
    thumbnail: `${BASE}/2023/Tháng 3 Hội thảo miền Bắc/471148147_561103430237866_2921675395626373574_n.jpg`,
    contentImages: [
      `${BASE}/2022/Hội thảo miền Nam/IMG_9135.JPG`,
      `${BASE}/2023/Tháng 3 Hội thảo miền Bắc/471149141_561103126904563_8251980211636030216_n.jpg`,
      `${BASE}/2023/Tháng 3 Hội thảo miền Bắc/471416065_561103180237891_7878706947507892421_n.jpg`,
      `${BASE}/Hoạt động công ty/2025 Tham quan Activlab/596431553_122191749380343488_4474708133196786370_n.jpg`,
    ],
  },
  {
    // 6 — VinaPharma qua những con số
    thumbnail: `${BASE}/Hoạt động hợp tác - Tài trợ/2024/482206506_621109080903967_5638581951418516014_n.jpg`,
    contentImages: [
      `${BASE}/Hoạt động hợp tác - Tài trợ/2024/482203483_621109117570630_4236517517910817218_n.jpg`,
      `${BASE}/Hoạt động hợp tác - Tài trợ/2024/482245079_621109090903966_4485454855291803206_n.jpg`,
      `${BASE}/Hoạt động công ty/2025 Tham quan Activlab/596345845_122191748876343488_6063284534446999966_n.jpg`,
      `${BASE}/Hoạt động công ty/2025 Tham quan Activlab/596926520_122191748888343488_3504317397190467488_n.jpg`,
    ],
  },
  {
    // 7 — Những câu chuyện tạo tác động
    thumbnail: `${BASE}/Hoạt động thiện nguyện/2024/Tháng 9 Trung Thu Phú Yên/481061883_616844464663762_1035889967529788111_n.jpg`,
    contentImages: [
      `${BASE}/Hoạt động thiện nguyện/2024/Tháng 9 Trung Thu Phú Yên/481055881_616844467997095_9081522768100050172_n.jpg`,
      `${BASE}/Hoạt động thiện nguyện/2024/Tháng 9 Tiếp bước đến trường/481083481_616826404665568_1299711336928335435_n.jpg`,
      `${BASE}/Hoạt động thiện nguyện/2024/Tháng 11 TPHCM - Người vô gia cư/483899261_619442674403941_1058238279158097396_n.jpg`,
      `${BASE}/Hoạt động thiện nguyện/2024/Tháng 9 Trăng Sáng 1/Tiểu học Hồ Văn Nhánh/481767835_617103314637877_4066561336279014418_n.jpg`,
    ],
  },
];

// ── Upload 1 file lên Cloudinary ─────────────────────────────
async function upload(filePath, folder) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: `vinapharma/about/${folder}`,
    quality: 'auto:good',
    fetch_format: 'auto',
  });
  return result.secure_url;
}

// ── Build HTML content cho mỗi section ───────────────────────
function buildContent(urls) {
  return urls.map(u =>
    `<p><img src="${u}" style="width:100%;max-width:800px;border-radius:.6rem;margin:0.5rem 0" /></p>`
  ).join('\n');
}

// ── Main ─────────────────────────────────────────────────────
async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB connected');

  const Settings = mongoose.model('Settings', new mongoose.Schema({ key: String, value: mongoose.Schema.Types.Mixed }));

  // Load current about-sections (or use defaults)
  const sectionsDoc = await Settings.findOne({ key: 'about-sections' });
  const aboutData = sectionsDoc?.value || SECTIONS.map((_, i) => ({}));

  const DEFAULT_ABOUT = [
    { href:'ve-vinapharma.html', label:'Câu chuyện của chúng tôi', title:'Về VinaPharma', desc:'VinaPharma phân phối thực phẩm chức năng và dược mỹ phẩm từ các thương hiệu uy tín, kết nối giải pháp chăm sóc sức khỏe thiết thực với hệ thống nhà thuốc Việt Nam.', image:'' },
    { href:'dong-hanh-cung-suc-khoe-viet.html', label:'Sứ mệnh', title:'Đồng hành cùng sức khỏe Việt', desc:'Trong một thị trường ngày càng coi trọng chất lượng, tính an toàn và giá trị sử dụng thực chất, VinaPharma tập trung kết nối những giải pháp chăm sóc sức khỏe đáng tin cậy với hệ thống nhà thuốc trên toàn quốc.', image:'' },
    { href:'cac-tru-cot-hoat-dong.html', label:'Chiến lược', title:'Các trụ cột hoạt động', desc:'VinaPharma phát triển trên nền tảng các trụ cột hoạt động rõ ràng, tập trung vào những nhóm giải pháp có giá trị thiết thực đối với thị trường chăm sóc sức khỏe.', image:'' },
    { href:'ban-lanh-dao.html', label:'Lãnh đạo', title:'Ban lãnh đạo', desc:'VinaPharma được dẫn dắt bởi đội ngũ lãnh đạo theo đuổi định hướng phát triển chuyên nghiệp, minh bạch và bền vững.', image:'' },
    { href:'con-nguoi-vinapharma.html', label:'Văn hóa', title:'Con người VinaPharma', desc:'Đội ngũ VinaPharma làm việc với tinh thần chuyên nghiệp, chính trực và tận tâm – những con người kiến tạo giá trị bền vững.', image:'' },
    { href:'hanh-trinh-phat-trien.html', label:'Lịch sử', title:'Hành trình phát triển', desc:'Từ nền tảng được xây dựng từ năm 2018, VinaPharma từng bước phát triển theo định hướng chuyên nghiệp, chọn lọc và bền vững.', image:'' },
    { href:'vinapharma-qua-nhung-con-so.html', label:'Số liệu', title:'VinaPharma qua những con số', desc:'Những con số là cách VinaPharma khái quát hành trình phát triển, năng lực hiện diện và phạm vi hợp tác trên thị trường.', image:'' },
    { href:'nhung-cau-chuyen-tao-tac-dong.html', label:'Tác động', title:'Những câu chuyện tạo tác động', desc:'Tại VinaPharma, tác động không chỉ được tạo nên từ sản phẩm hay độ phủ thị trường, mà còn được thể hiện qua những câu chuyện đồng hành cùng đối tác, nhà thuốc và cộng đồng.', image:'' },
  ];

  const base = (sectionsDoc?.value?.length === 8) ? sectionsDoc.value : DEFAULT_ABOUT;

  for (let i = 3; i < SECTIONS.length; i++) {
    const sec = SECTIONS[i];
    console.log(`\n[${i}] ${base[i].title}`);

    // Upload thumbnail
    console.log(`  → Upload thumbnail...`);
    const thumbUrl = await upload(sec.thumbnail, `s${i}`);
    base[i].image = thumbUrl;
    console.log(`  ✅ thumbnail: ${thumbUrl}`);

    // Upload content images
    const contentUrls = [];
    for (const imgPath of sec.contentImages) {
      console.log(`  → Upload content: ${path.basename(imgPath)}`);
      const url = await upload(imgPath, `s${i}`);
      contentUrls.push(url);
      console.log(`  ✅ ${url}`);
    }

    // Save content HTML
    const html = buildContent(contentUrls);
    await Settings.findOneAndUpdate(
      { key: `about-content-${i}` },
      { value: html },
      { upsert: true }
    );
    console.log(`  ✅ Saved content-${i} (${contentUrls.length} images)`);
  }

  // Save updated about-sections with thumbnails
  await Settings.findOneAndUpdate(
    { key: 'about-sections' },
    { value: base },
    { upsert: true }
  );
  console.log('\n✅ about-sections updated with all thumbnails');
  await mongoose.disconnect();
  console.log('Done!');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
