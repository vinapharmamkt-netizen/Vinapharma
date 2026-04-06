/**
 * rebuild-thien-nguyen-html.js
 * Đọc URL ảnh đã có trong activities-content-2,
 * tái cấu trúc HTML với nội dung văn bản từng mục.
 */
require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const Settings = mongoose.model('Settings', new mongoose.Schema({
  key: String, value: mongoose.Schema.Types.Mixed
}, { timestamps: true }));

// ── Nội dung mô tả ────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    year: '2024',
    yearIntro: 'Năm 2024 đánh dấu hành trình thiện nguyện đầu tiên của Vinapharma — mang yêu thương đến những hoàn cảnh khó khăn từ miền Trung đến TP. Hồ Chí Minh.',
    events: [
      {
        title: 'Tháng 11 – TPHCM: Người vô gia cư',
        intro: 'Trong những đêm cuối năm lạnh giá, đội ngũ Vinapharma đã tổ chức chuyến đi phát cơm, nhu yếu phẩm và thuốc men miễn phí cho người vô gia cư tại TP. Hồ Chí Minh. Hàng chục phần quà được trao tận tay với tấm lòng chân thành, góp phần xoa dịu bớt những vất vả trong mùa đông.',
        cloudKey: '2024/Tháng 11 TPHCM',
        locations: [{ name: null }],
      },
      {
        title: 'Tháng 9 – Tiếp bước đến trường',
        intro: 'Nhân dịp tựu trường tháng 9, Vinapharma phối hợp cùng UBMTTQVN trao tặng 59 xe đạp và học bổng cho các em học sinh có hoàn cảnh khó khăn. Chương trình "Tiếp bước đến trường" mong muốn không một em nhỏ nào phải bỏ học vì thiếu phương tiện di chuyển.',
        cloudKey: '2024/Tháng 9 Tiếp bước đến trường',
        locations: [{ name: null }],
      },
      {
        title: 'Tháng 9 – Trung Thu Phú Yên',
        intro: 'Vượt hơn 600 km đến với các em nhỏ tại Phú Yên, đoàn thiện nguyện Vinapharma mang theo bánh trung thu, đèn lồng và quà tặng — tạo nên một đêm rằm ấm áp, đầy tiếng cười cho những trẻ em vùng khó khăn.',
        cloudKey: '2024/Tháng 9 Trung Thu Phú Yên',
        locations: [{ name: null }],
      },
      {
        title: 'Tháng 9 – Trăng Sáng Mùa 1',
        intro: 'Chương trình "Trăng Sáng Mùa 1" là hoạt động thiện nguyện quy mô đầu tiên của Vinapharma, mang sách vở, đồ dùng học tập và quà Trung Thu đến ba trường học tại tỉnh Long An. Hơn 500 em học sinh được nhận quà và tham gia các hoạt động vui chơi sôi nổi.',
        cloudKey: '2024/Tháng 9 Trăng Sáng 1',
        locations: [
          { name: 'THCS Vĩnh Ngươu', desc: 'Trường THCS Vĩnh Ngươu là điểm đến đầu tiên. Các em học sinh lớp 6–9 hân hoan đón nhận bộ dụng cụ học tập, sách tham khảo và phần quà Trung Thu. Những ánh mắt sáng ngời và nụ cười rạng rỡ là món quà quý giá nhất mà đoàn mang về.' },
          { name: 'Tiểu học Hồ Văn Nhánh', desc: 'Tại Tiểu học Hồ Văn Nhánh, hàng trăm em học sinh tiểu học được nhận cặp sách, tập vở và bút màu. Chương trình còn tổ chức các trò chơi dân gian, tạo không khí lễ hội sôi động ngay trong sân trường.' },
          { name: 'Tiểu học Lê Văn Tám', desc: 'Điểm cuối của hành trình là Tiểu học Lê Văn Tám với hơn 200 em học sinh tham dự. Đoàn tặng quà và cùng thầy cô tổ chức chương trình văn nghệ chào mừng năm học mới, khép lại chuyến đi với nhiều kỷ niệm đáng nhớ.' },
        ],
      },
    ],
  },
  {
    year: '2025',
    yearIntro: 'Sang năm 2025, Vinapharma tiếp tục mở rộng các hoạt động thiện nguyện với chương trình "Trăng Sáng Mùa 2" — đồng hành cùng 5 mái ấm, nhà tình thương tại TP. Hồ Chí Minh, mang yêu thương đến những mảnh đời kém may mắn.',
    events: [
      {
        title: 'Trăng Sáng Mùa 2',
        intro: 'Chương trình "Trăng Sáng Mùa 2" diễn ra vào mùa Trung Thu năm 2025, quy tụ toàn thể đội ngũ Vinapharma cùng các đối tác đồng hành. Đoàn mang theo hàng trăm phần quà, nhu yếu phẩm, thuốc bổ đến 5 mái ấm – nhà tình thương trên địa bàn TP. HCM, thắp sáng thêm những mùa trăng ấm áp cho các em nhỏ và người già neo đơn.',
        cloudKey: '2025/Trăng sáng mùa 2',
        locations: [
          { name: 'Mái ấm chùa Kỳ Quang', desc: 'Mái ấm chùa Kỳ Quang (Gò Vấp) là nơi nuôi dưỡng hàng chục trẻ em mồ côi và người khuyết tật. Đoàn Vinapharma trao tặng phần quà, bánh trung thu, quần áo và hỗ trợ kinh phí sinh hoạt. Khoảnh khắc các em nhỏ hào hứng rước đèn, múa lân trong sân chùa là hình ảnh đẹp không thể quên.' },
          { name: 'Mái ấm Tâm Đức', desc: 'Mái ấm Tâm Đức là ngôi nhà của nhiều trẻ em có hoàn cảnh đặc biệt khó khăn. Vinapharma trao tặng quà Trung Thu, nhu yếu phẩm và hỗ trợ kinh phí sửa chữa cơ sở vật chất, góp phần tạo môi trường sống tốt hơn cho các em.' },
          { name: 'Mái ấm Tân Bình', desc: 'Tại mái ấm Tân Bình, đoàn đã gặp gỡ và trò chuyện cùng các em nhỏ, chia sẻ về ước mơ tương lai. Ngoài quà tặng, đoàn còn tổ chức các hoạt động vui chơi, tạo không khí ngày hội ấm áp giữa lòng thành phố.' },
          { name: 'Mái ấm Thiên Thần', desc: 'Mái ấm Thiên Thần chăm sóc trẻ em khuyết tật và trẻ mồ côi. Vinapharma mang đến không chỉ vật chất mà còn cả tình cảm — các thành viên dành thời gian ôm hôn, vui đùa cùng các em, để lại những xúc cảm chân thật và sâu sắc nhất.' },
          { name: 'Sài Gòn Bao Dung', desc: 'Điểm dừng cuối của "Trăng Sáng Mùa 2" là Sài Gòn Bao Dung — mái ấm dành cho người già neo đơn và trẻ em lang thang. Đoàn Vinapharma trao quà, phát thuốc và cùng các cụ già thụ hưởng mâm cơm đoàn tụ, khép lại hành trình với trọn vẹn yêu thương.' },
        ],
      },
    ],
  },
];

// ── Grid builder ─────────────────────────────────────────────────────────────
function calcRows(n) {
  if (n <= 3) return [n];
  if (n === 4) return [2, 2];
  if (n === 9) return [3, 3, 3];
  const tc = n <= 6 ? 3 : 4;
  const rows = []; let r = n;
  while (r > tc) { rows.push(tc); r -= tc; }
  if (r > 0) rows.push(r);
  return rows;
}

function makeGrid(urls) {
  if (!urls.length) return '';
  const rows = calcRows(urls.length);
  let idx = 0;
  let html = '<div style="margin:1.2rem 0">';
  rows.forEach(function(cols, ri) {
    const mb = ri < rows.length - 1 ? '.7rem' : '0';
    if (cols === 1) {
      html += `<img src="${urls[idx++]}" style="width:100%;border-radius:.5rem;display:block;margin-bottom:${mb}">`;
    } else {
      html += `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:.7rem;margin-bottom:${mb}">`;
      for (let c = 0; c < cols; c++) {
        html += `<img src="${urls[idx++]}" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:.5rem;display:block">`;
      }
      html += '</div>';
    }
  });
  html += '</div>';
  return html;
}

// ── Extract URLs from existing HTML grouped by cloudKey/location ──────────────
function extractUrlGroups(existingHtml) {
  // Map: "cloudKey/locName" → [url, url, ...]
  // We'll parse by order of h3/h4 headings + grids
  const groups = [];
  // Extract all img srcs in order
  const allUrls = [];
  const imgRe = /<img[^>]+src="([^"]+)"/g;
  let m;
  while ((m = imgRe.exec(existingHtml)) !== null) allUrls.push(m[1]);
  return allUrls;
}

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected\n');

  const doc = await Settings.findOne({ key: 'activities-content-2' });
  if (!doc) { console.error('No content found'); process.exit(1); }

  // Extract all img URLs from existing HTML in order
  const allUrls = extractUrlGroups(doc.value);
  console.log(`Tìm thấy ${allUrls.length} URL ảnh trong DB\n`);

  // Build URL map: each cloudFolder → urls (ordered by appearance in HTML)
  // We match by cloudinary folder path substring in the URL
  function urlsForFolder(folderPath) {
    const encoded = folderPath.split('/').map(encodeURIComponent).join('/');
    const simple  = folderPath;
    return allUrls.filter(u => u.includes(encoded) || u.includes(simple));
  }

  // ── Build HTML ──────────────────────────────────────────────────────────────
  let html = '';

  for (const sec of SECTIONS) {
    html += `<h2>${sec.year}</h2>\n`;
    html += `<p>${sec.yearIntro}</p>\n`;

    for (const ev of sec.events) {
      html += `<h3>${ev.title}</h3>\n`;
      html += `<p>${ev.intro}</p>\n`;

      for (const loc of ev.locations) {
        const folder = `vinapharma/thien-nguyen/${ev.cloudKey}${loc.name ? '/' + loc.name : ''}`;

        if (loc.name) {
          html += `<h4 style="margin:1.6rem 0 .5rem;font-size:.96rem;font-weight:800;color:#333;border-left:3px solid #cc1f1f;padding-left:.7rem">${loc.name}</h4>\n`;
          if (loc.desc) html += `<p>${loc.desc}</p>\n`;
        }

        const urls = urlsForFolder(folder);
        console.log(`  ${loc.name || ev.title}: ${urls.length} ảnh`);
        if (urls.length) html += makeGrid(urls) + '\n';
      }
    }
  }

  await Settings.findOneAndUpdate(
    { key: 'activities-content-2' },
    { value: html },
    { new: true }
  );
  console.log('\n✓ Đã cập nhật activities-content-2');
  await mongoose.disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
