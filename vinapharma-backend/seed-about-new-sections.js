/**
 * seed-about-new-sections.js
 * Upload ảnh lên Cloudinary và thêm 4 section mới (s8–s11) vào about-sections
 * Section IDs: 8 = Hoạt động công ty, 9 = Hợp tác & Tài trợ,
 *              10 = Hoạt động thiện nguyện, 11 = Đào tạo dược sĩ
 */
require('dotenv').config();
const mongoose  = require('mongoose');
const cloudinary = require('cloudinary').v2;
const fs        = require('fs');
const path      = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Settings = mongoose.model(
  'Settings',
  new mongoose.Schema({ key: String, value: mongoose.Schema.Types.Mixed })
);

// ── helpers ──────────────────────────────────────────────────────────────────

function firstFile(dir) {
  const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  if (!files.length) throw new Error(`No image found in ${dir}`);
  return path.join(dir, files[0]);
}

async function upload(localPath, folder) {
  console.log(`  Uploading: ${path.basename(localPath)} → ${folder}`);
  const res = await cloudinary.uploader.upload(localPath, { folder });
  return res.secure_url;
}

// ── image paths ───────────────────────────────────────────────────────────────

const BASE = 'D:/Vinapharma Web/files/hình ảnh';

const IMAGES = {
  s8: {
    thumbnail: `${BASE}/Hoạt động công ty/2025 YEP/625065269_885611867787019_4545963771238732745_n.jpg`,
    img1:      `${BASE}/Hoạt động công ty/2024 YEP/483367270_621687104179498_8539501844240946599_n.jpg`,
    img2:      `${BASE}/Hoạt động công ty/Sinh nhật nhân viên/481086730_616110148070527_4507641933590791177_n.jpg`,
    img3:      `${BASE}/Hoạt động công ty/2025 Tham quan Activlab/595118939_122191748558343488_3093730924274928494_n.jpg`,
  },
  s9: {
    thumbnail: `${BASE}/Hoạt động hợp tác - Tài trợ/2024/482203483_621109117570630_4236517517910817218_n.jpg`,
    img1:      `${BASE}/Hoạt động hợp tác - Tài trợ/2024/482206506_621109080903967_5638581951418516014_n.jpg`,
    img2:      `${BASE}/Hoạt động hợp tác - Tài trợ/2025/Tháng 6 Nhà Thuốc Nhân Hòa_Bữa trưa cho em/502976027_1108009301359821_4504029237823022813_n.jpg`,
    img3:      `${BASE}/Hoạt động hợp tác - Tài trợ/2026/Tháng 3 Nhà Thuốc Nhân Hòa_Ngày Hội Sức Khỏe/z7639131708635_b1fd301c474e3bf824f24af272b64c45.jpg`,
  },
  s10: {
    thumbnail: `${BASE}/Hoạt động thiện nguyện/2024/Tháng 9 Trung Thu Phú Yên/481055881_616844467997095_9081522768100050172_n.jpg`,
    img1:      `${BASE}/Hoạt động thiện nguyện/2024/Tháng 9 Tiếp bước đến trường/481079234_616826044665604_3051360467218874088_n.jpg`,
    img2:      firstFile(`${BASE}/Hoạt động thiện nguyện/2024/Tháng 11 TPHCM - Người vô gia cư`),
    img3:      firstFile(`${BASE}/Hoạt động thiện nguyện/2025/Trăng sáng mùa 2/Mái ấm Thiên Thần`),
  },
  s11: {
    thumbnail: `${BASE}/Đào tạo dược sĩ/475842558_563491756705223_3837865917947128374_n.jpg`,
    img1:      `${BASE}/Đào tạo dược sĩ/476111260_563491640038568_1427310438030436978_n.jpg`,
    img2:      `${BASE}/Đào tạo dược sĩ/480267899_602433179438224_7954876146051774693_n.jpg`,
    img3:      `${BASE}/Đào tạo dược sĩ/481108896_618720147809527_1451267759734619258_n.jpg`,
  },
};

// ── HTML content builders ─────────────────────────────────────────────────────

function buildContent8(urls) {
  return `<h2>Văn hóa gắn kết — Tinh thần VinaPharma</h2>
<p>Tại VinaPharma, văn hóa doanh nghiệp không chỉ là khẩu hiệu — đó là cách mỗi thành viên sống và làm việc mỗi ngày. Chúng tôi xây dựng môi trường làm việc nơi sự chuyên nghiệp, sáng tạo và niềm vui cùng tồn tại.</p>
<img src="${urls.img1}" style="width:100%;border-radius:.7rem;margin:1.2rem 0">
<h2>Young Energetic People — Thế hệ trẻ VinaPharma</h2>
<p>Chương trình YEP (Young Energetic People) là sự kiện thường niên nơi toàn bộ đội ngũ VinaPharma cùng nhìn lại hành trình năm qua, vinh danh những cá nhân xuất sắc và cùng nhau bước vào năm mới với năng lượng tươi mới nhất.</p>
<p>Từ YEP 2023 đến YEP 2025, sự kiện ngày càng lớn mạnh và ý nghĩa hơn — phản ánh sự trưởng thành của cả đội ngũ và tổ chức.</p>
<img src="${urls.img2}" style="width:100%;border-radius:.7rem;margin:1.2rem 0">
<h2>Chăm sóc con người — Giá trị cốt lõi</h2>
<p>VinaPharma tổ chức sinh nhật nhân viên, các hoạt động team building và chuyến tham quan để mỗi thành viên cảm nhận được sự trân trọng và yêu thương từ tổ chức. Đây không chỉ là phúc lợi — đây là cách chúng tôi nói "cảm ơn" với những người tạo nên VinaPharma.</p>
<img src="${urls.img3}" style="width:100%;border-radius:.7rem;margin:1.2rem 0">
<p>Mỗi chuyến tham quan, mỗi bữa tiệc sinh nhật, mỗi khoảnh khắc vui vẻ cùng nhau — đó là những mảnh ghép tạo nên bức tranh văn hóa VinaPharma đầy sắc màu và ý nghĩa.</p>`;
}

function buildContent9(urls) {
  return `<h2>Đồng hành cùng nhà thuốc Việt Nam</h2>
<p>VinaPharma xây dựng mối quan hệ hợp tác dài lâu với các hệ thống nhà thuốc trên khắp cả nước. Không chỉ là đối tác phân phối, chúng tôi còn đồng hành trong các hoạt động chăm sóc cộng đồng, tư vấn sức khỏe và các sự kiện ý nghĩa.</p>
<img src="${urls.img1}" style="width:100%;border-radius:.7rem;margin:1.2rem 0">
<h2>Tài trợ và hỗ trợ cộng đồng</h2>
<p>Thông qua các dự án tài trợ như "Bữa trưa cho em", "Mái ấm Khiết Tâm", VinaPharma và các nhà thuốc đối tác cùng góp phần mang sức khỏe và sự quan tâm đến những người cần được hỗ trợ nhất.</p>
<img src="${urls.img2}" style="width:100%;border-radius:.7rem;margin:1.2rem 0">
<h2>Hành trình hợp tác bền vững</h2>
<p>Từ năm 2023 đến 2026, mạng lưới hợp tác của VinaPharma ngày càng mở rộng — từ các nhà thuốc tại TP.HCM đến các tỉnh thành, từ các sự kiện sức khỏe đến các dự án cộng đồng dài hạn. Đây là minh chứng cho cam kết đồng hành lâu dài của chúng tôi.</p>
<img src="${urls.img3}" style="width:100%;border-radius:.7rem;margin:1.2rem 0">`;
}

function buildContent10(urls) {
  return `<h2>Trách nhiệm với cộng đồng</h2>
<p>VinaPharma tin rằng một doanh nghiệp thực sự thành công không chỉ đo bằng doanh thu mà còn bằng những giá trị tạo ra cho xã hội. Hoạt động thiện nguyện là phần không thể thiếu trong hành trình phát triển của chúng tôi.</p>
<img src="${urls.img1}" style="width:100%;border-radius:.7rem;margin:1.2rem 0">
<h2>Trung Thu cho em — Thắp sáng tuổi thơ</h2>
<p>Hàng năm, VinaPharma tổ chức và đồng hành trong các chương trình Trung Thu cho trẻ em có hoàn cảnh khó khăn tại Phú Yên và TP.HCM. Những chiếc đèn lồng, những tiếng cười và ánh mắt rạng rỡ của các em là nguồn động lực lớn nhất cho toàn đội ngũ.</p>
<img src="${urls.img2}" style="width:100%;border-radius:.7rem;margin:1.2rem 0">
<h2>Tiếp bước đến trường — Hỗ trợ giáo dục</h2>
<p>Bên cạnh các hoạt động y tế, VinaPharma còn đồng hành trong chương trình "Tiếp bước đến trường" — hỗ trợ học bổng và dụng cụ học tập cho các em học sinh vùng khó khăn. Và với dự án "Trăng Sáng" — chăm sóc và trao yêu thương đến các mái ấm trên toàn TP.HCM.</p>
<img src="${urls.img3}" style="width:100%;border-radius:.7rem;margin:1.2rem 0">
<p>Mỗi hoạt động thiện nguyện không chỉ là việc cho đi — đó là cơ hội để cả đội ngũ VinaPharma kết nối với nhau và với cộng đồng theo cách ý nghĩa nhất.</p>`;
}

function buildContent11(urls) {
  return `<h2>Đầu tư vào tri thức dược học</h2>
<p>VinaPharma hiểu rằng dược sĩ không chỉ là người bán thuốc — họ là người tư vấn sức khỏe tin cậy của hàng triệu người dân. Vì vậy, chúng tôi liên tục đầu tư vào các chương trình đào tạo chuyên sâu cho đội ngũ dược sĩ đối tác.</p>
<img src="${urls.img1}" style="width:100%;border-radius:.7rem;margin:1.2rem 0">
<h2>Nội dung đào tạo chuyên biệt</h2>
<p>Các buổi đào tạo của VinaPharma tập trung vào kiến thức về thành phần, tác dụng hỗ trợ và cách tư vấn phù hợp cho từng nhóm khách hàng. Đặc biệt, chúng tôi nhấn mạnh tính tuân thủ quy định dược phẩm và đạo đức nghề nghiệp trong mọi buổi đào tạo.</p>
<img src="${urls.img2}" style="width:100%;border-radius:.7rem;margin:1.2rem 0">
<h2>Mạng lưới dược sĩ được đào tạo chất lượng</h2>
<p>Từ các hội thảo quy mô lớn đến các buổi đào tạo nhỏ tại từng nhà thuốc, VinaPharma đã và đang xây dựng một mạng lưới dược sĩ được trang bị đầy đủ kiến thức và kỹ năng — sẵn sàng mang đến dịch vụ tư vấn sức khỏe chất lượng cao nhất cho người tiêu dùng Việt.</p>
<img src="${urls.img3}" style="width:100%;border-radius:.7rem;margin:1.2rem 0">`;
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB\n');

  // ── 1. Upload all images ──
  console.log('=== Uploading images ===');

  console.log('\n[s8 - Hoạt động công ty]');
  const s8urls = {
    thumbnail: await upload(IMAGES.s8.thumbnail, 'vinapharma/about/s8'),
    img1:      await upload(IMAGES.s8.img1,      'vinapharma/about/s8'),
    img2:      await upload(IMAGES.s8.img2,      'vinapharma/about/s8'),
    img3:      await upload(IMAGES.s8.img3,      'vinapharma/about/s8'),
  };

  console.log('\n[s9 - Hợp tác & Tài trợ]');
  const s9urls = {
    thumbnail: await upload(IMAGES.s9.thumbnail, 'vinapharma/about/s9'),
    img1:      await upload(IMAGES.s9.img1,      'vinapharma/about/s9'),
    img2:      await upload(IMAGES.s9.img2,      'vinapharma/about/s9'),
    img3:      await upload(IMAGES.s9.img3,      'vinapharma/about/s9'),
  };

  console.log('\n[s10 - Hoạt động thiện nguyện]');
  const s10urls = {
    thumbnail: await upload(IMAGES.s10.thumbnail, 'vinapharma/about/s10'),
    img1:      await upload(IMAGES.s10.img1,      'vinapharma/about/s10'),
    img2:      await upload(IMAGES.s10.img2,      'vinapharma/about/s10'),
    img3:      await upload(IMAGES.s10.img3,      'vinapharma/about/s10'),
  };

  console.log('\n[s11 - Đào tạo dược sĩ]');
  const s11urls = {
    thumbnail: await upload(IMAGES.s11.thumbnail, 'vinapharma/about/s11'),
    img1:      await upload(IMAGES.s11.img1,      'vinapharma/about/s11'),
    img2:      await upload(IMAGES.s11.img2,      'vinapharma/about/s11'),
    img3:      await upload(IMAGES.s11.img3,      'vinapharma/about/s11'),
  };

  console.log('\n=== All uploads done ===\n');

  // ── 2. Fetch current about-sections ──
  let setting = await Settings.findOne({ key: 'about-sections' });
  const currentSections = (setting && Array.isArray(setting.value)) ? setting.value : [];
  console.log(`Current about-sections count: ${currentSections.length}`);

  // ── 3. Define 4 new sections ──
  const newSections = [
    {
      label: 'VĂN HÓA',
      title: 'Hoạt động công ty',
      desc:  'VinaPharma xây dựng văn hóa doanh nghiệp năng động, gắn kết — nơi mỗi thành viên được phát triển, cống hiến và tận hưởng hành trình cùng nhau.',
      href:  'gioi-thieu-chi-tiet.html?id=8',
      image: s8urls.thumbnail,
    },
    {
      label: 'HỢP TÁC',
      title: 'Hợp tác & Tài trợ',
      desc:  'Qua từng dự án đồng hành cùng nhà thuốc và cộng đồng, VinaPharma khẳng định vai trò người bạn đồng hành tin cậy trong lĩnh vực sức khỏe.',
      href:  'gioi-thieu-chi-tiet.html?id=9',
      image: s9urls.thumbnail,
    },
    {
      label: 'CỘNG ĐỒNG',
      title: 'Hoạt động thiện nguyện',
      desc:  'VinaPharma tin rằng sức khỏe là quyền của mọi người. Các hoạt động thiện nguyện là cách chúng tôi trao đi và kết nối với cộng đồng.',
      href:  'gioi-thieu-chi-tiet.html?id=10',
      image: s10urls.thumbnail,
    },
    {
      label: 'ĐÀO TẠO',
      title: 'Đào tạo dược sĩ',
      desc:  'VinaPharma đầu tư vào năng lực đội ngũ dược sĩ — mang kiến thức chuyên sâu đến tận từng nhà thuốc để tư vấn sức khỏe chính xác và hiệu quả hơn.',
      href:  'gioi-thieu-chi-tiet.html?id=11',
      image: s11urls.thumbnail,
    },
  ];

  // ── 4. Append and save about-sections ──
  const updatedSections = [...currentSections, ...newSections];

  if (setting) {
    setting.value = updatedSections;
    await setting.save();
  } else {
    await Settings.create({ key: 'about-sections', value: updatedSections });
  }
  console.log(`about-sections updated → total: ${updatedSections.length} sections`);

  // ── 5. Save HTML content for about-content-8 through about-content-11 ──
  const contentMap = {
    'about-content-8':  buildContent8(s8urls),
    'about-content-9':  buildContent9(s9urls),
    'about-content-10': buildContent10(s10urls),
    'about-content-11': buildContent11(s11urls),
  };

  for (const [key, html] of Object.entries(contentMap)) {
    const exists = await Settings.findOne({ key });
    if (exists) {
      exists.value = html;
      await exists.save();
      console.log(`Updated: ${key}`);
    } else {
      await Settings.create({ key, value: html });
      console.log(`Created: ${key}`);
    }
  }

  console.log('\nDone!');
  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
