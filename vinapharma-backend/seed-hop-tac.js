/**
 * seed-hop-tac.js
 * Upload ảnh Hoạt động Hợp tác & Tài trợ lên Cloudinary
 * Tạo HTML theo cấu trúc: năm → sự kiện → lưới ảnh
 * Lưu vào activities-content-1
 */
require('dotenv').config();
const fs        = require('fs');
const path      = require('path');
const mongoose  = require('mongoose');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!MONGO_URI) { console.error('MONGODB_URI not set'); process.exit(1); }

const Settings = mongoose.model('Settings', new mongoose.Schema({
  key: String, value: mongoose.Schema.Types.Mixed
}, { timestamps: true }));

const ROOT = path.join(__dirname, '..', 'files', 'hình ảnh', 'Hoạt động hợp tác - Tài trợ');
const IMG_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

// ── Nội dung mô tả ────────────────────────────────────────────────────────────
const CONTENT = {
  '2023': {
    _intro: 'Năm 2023, Vinapharma bắt đầu xây dựng những mối quan hệ đối tác bền vững với các nhà thuốc và tổ chức cộng đồng, khởi đầu hành trình đồng hành vì sức khỏe cộng đồng.',
    'Tháng 4 Nhà thuốc Mát Tay_Tư vấn sức khỏe': {
      _title: 'Nhà thuốc Mát Tay – Tư vấn sức khỏe',
      _intro: 'Vinapharma phối hợp cùng Nhà thuốc Mát Tay tổ chức chương trình tư vấn sức khỏe miễn phí tháng 4/2023. Đội ngũ dược sĩ Vinapharma trực tiếp tham gia tư vấn, cung cấp thông tin về các sản phẩm thực phẩm chức năng và hỗ trợ người dân hiểu đúng về dinh dưỡng và bảo vệ sức khỏe.',
    },
  },
  '2024': {
    _intro: 'Năm 2024, Vinapharma mở rộng mạng lưới hợp tác với nhiều nhà thuốc và đối tác chiến lược, cùng triển khai các hoạt động ý nghĩa gắn kết cộng đồng và nâng cao nhận thức về sức khỏe.',
    'Tháng 8 Nhà Thuốc Nhân Hòa_Mái ấm Khiết Tâm': {
      _title: 'Nhà thuốc Nhân Hòa – Mái ấm Khiết Tâm',
      _intro: 'Tháng 8/2024, Vinapharma cùng Nhà thuốc Nhân Hòa thực hiện chuyến thăm và trao tặng quà đến Mái ấm Khiết Tâm — nơi nuôi dưỡng trẻ em mồ côi và người già neo đơn. Đây là hoạt động thể hiện cam kết của Vinapharma trong việc gắn kết trách nhiệm xã hội với các đối tác nhà thuốc.',
    },
    'Tháng 10 Nhà thuốc Nhân Hòa_20.10': {
      _title: 'Nhà thuốc Nhân Hòa – Ngày 20/10',
      _intro: 'Nhân dịp Ngày Phụ nữ Việt Nam 20/10, Vinapharma phối hợp cùng Nhà thuốc Nhân Hòa tổ chức chương trình tri ân và tặng quà đến các nữ dược sĩ, nhân viên y tế. Đây là hoạt động thể hiện sự trân trọng của Vinapharma đối với những người phụ nữ đang ngày đêm chăm sóc sức khỏe cộng đồng.',
    },
    'Tháng 1_2025 Giúp nhau về nhà của ZaloPay': {
      _title: 'Hợp tác ZaloPay – "Giúp nhau về nhà"',
      _intro: 'Vinapharma đồng hành cùng ZaloPay triển khai chương trình "Giúp nhau về nhà" — hỗ trợ người lao động xa quê có thêm nguồn lực để sum họp gia đình dịp Tết. Chương trình kết nối cộng đồng, lan tỏa tinh thần tương thân tương ái trong mùa xuân.',
    },
  },
  '2025': {
    _intro: 'Năm 2025 đánh dấu bước phát triển vượt bậc trong hoạt động hợp tác của Vinapharma — từ các dự án nhân đạo thiết thực đến những dự án sáng tạo, quảng bá hình ảnh thương hiệu và đồng hành cùng cộng đồng một cách toàn diện hơn.',
    'Tháng 6 Nhà Thuốc Nhân Hòa_Bữa trưa cho em': {
      _title: 'Nhà thuốc Nhân Hòa – Bữa trưa cho em',
      _intro: 'Chương trình "Bữa trưa cho em" tháng 6/2025 do Vinapharma phối hợp cùng Nhà thuốc Nhân Hòa tổ chức, mang đến những bữa ăn dinh dưỡng miễn phí cho trẻ em có hoàn cảnh khó khăn. Không chỉ là bữa ăn, đây còn là dịp để các em được giao lưu, vui chơi và cảm nhận tình yêu thương từ cộng đồng.',
    },
    'Tháng 6 Dự án film BUS': {
      _title: 'Dự án film "BUS"',
      _intro: 'Vinapharma tham gia tài trợ dự án film ngắn "BUS" — câu chuyện cảm động về những con người gặp gỡ trên hành trình cuộc sống. Thông qua dự án này, Vinapharma muốn truyền tải thông điệp về sự kết nối, yêu thương và sức mạnh của cộng đồng.',
    },
    'Trạm phòng tương lai': {
      _title: 'Trạm phòng tương lai',
      _intro: 'Vinapharma đồng hành cùng dự án "Trạm phòng tương lai" — sáng kiến hỗ trợ phòng ngừa bệnh tật và nâng cao ý thức chăm sóc sức khỏe trong cộng đồng. Dự án hướng đến xây dựng một thế hệ người Việt chủ động, có kiến thức về sức khỏe dự phòng.',
    },
    'Tháng 10 Nhà Thuốc Nhân Hòa_Trung Thu Cho Em': {
      _title: 'Nhà thuốc Nhân Hòa – Trung Thu cho em',
      _intro: 'Nhân dịp Tết Trung Thu 2025, Vinapharma phối hợp cùng Nhà thuốc Nhân Hòa tổ chức chương trình "Trung Thu cho em" — mang bánh trung thu, đèn lồng và quà tặng đến các em nhỏ có hoàn cảnh khó khăn. Chương trình thắp lên ánh sáng và niềm vui cho hàng chục trẻ em trong dịp rằm tháng tám.',
    },
    'Tháng 10 NT An Khang Phú Quốc': {
      _title: 'Nhà thuốc An Khang Phú Quốc',
      _intro: 'Vinapharma đồng hành cùng hệ thống Nhà thuốc An Khang tại Phú Quốc trong chương trình ra mắt sản phẩm và tư vấn sức khỏe tháng 10/2025. Sự kiện quy tụ đông đảo người dân và du khách trên đảo, góp phần nâng cao nhận thức về chăm sóc sức khỏe tại địa phương.',
    },
    'Tháng 10 Bão Bualoi và Matmo': {
      _title: 'Hỗ trợ đồng bào bị ảnh hưởng bởi bão Bualoi và Matmo',
      _intro: 'Khi bão Bualoi và Matmo đổ bộ gây thiệt hại nặng nề cho nhiều tỉnh thành, Vinapharma và các đối tác lập tức hành động. Đoàn quyên góp và trao tặng nhu yếu phẩm, thuốc men và các vật dụng thiết yếu đến các gia đình bị ảnh hưởng, thể hiện tinh thần "lá lành đùm lá rách" trong cộng đồng doanh nghiệp.',
    },
    'Tháng 11 Dự án film Công Nữ Ngọc Hoa': {
      _title: 'Dự án film "Công Nữ Ngọc Hoa"',
      _intro: 'Vinapharma tài trợ và đồng hành sản xuất bộ phim ngắn "Công Nữ Ngọc Hoa" — tác phẩm nghệ thuật mang đậm màu sắc văn hóa lịch sử Việt Nam. Đây là hoạt động thể hiện cam kết của Vinapharma trong việc bảo tồn và phát huy giá trị văn hóa dân tộc thông qua nghệ thuật điện ảnh.',
    },
  },
  '2026': {
    _intro: 'Bước sang năm 2026, Vinapharma tiếp tục mở rộng và đa dạng hóa các hoạt động hợp tác — từ những sáng kiến y tế cộng đồng sáng tạo đến các chương trình hợp tác quy mô lớn cùng hệ thống nhà thuốc toàn quốc.',
    'Tháng 2 Chuyến Xe Số 7+': {
      _title: 'Chuyến Xe Số 7+',
      _intro: 'Tháng 2/2026, Vinapharma ra mắt "Chuyến Xe Số 7+" — chương trình lưu động mang dịch vụ tư vấn sức khỏe, kiểm tra miễn phí và phát sản phẩm dinh dưỡng đến tận tay người dân ở các khu vực xa trung tâm. Chuyến xe kết nối hàng trăm gia đình với dịch vụ y tế chất lượng, thể hiện sứ mệnh "sức khỏe cho mọi người" của Vinapharma.',
    },
    'Tháng 3 Nhà Thuốc Nhân Hòa_Ngày Hội Sức Khỏe': {
      _title: 'Nhà thuốc Nhân Hòa – Ngày Hội Sức Khỏe',
      _intro: 'Tháng 3/2026, Vinapharma và Nhà thuốc Nhân Hòa tổ chức "Ngày Hội Sức Khỏe" quy mô lớn với hàng trăm người tham gia. Sự kiện bao gồm các hoạt động như khám sức khỏe miễn phí, tư vấn dinh dưỡng, trải nghiệm sản phẩm và các trò chơi vận động thú vị — tất cả hướng đến một cộng đồng khỏe mạnh và năng động.',
    },
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function isImage(f) { return IMG_EXTS.includes(path.extname(f).toLowerCase()); }

function getEntries(dir) {
  return fs.readdirSync(dir).filter(n => !n.startsWith('.')).sort().map(n => ({
    name: n,
    full: path.join(dir, n),
    isDir: fs.statSync(path.join(dir, n)).isDirectory(),
  }));
}

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

async function uploadFile(filePath, folder) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      transformation: [{ width: 1400, crop: 'limit', quality: 82, fetch_format: 'auto' }],
    });
    return result.secure_url;
  } catch(e) {
    console.error('  Upload lỗi:', path.basename(filePath), e.message);
    return null;
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB\n');

  let html = '';

  const yearEntries = getEntries(ROOT).filter(e => e.isDir);
  for (const yearEntry of yearEntries) {
    const year = yearEntry.name;
    const yearContent = CONTENT[year] || {};
    console.log(`\n══ ${year} ══`);

    html += `<h2>${year}</h2>\n`;
    if (yearContent._intro) html += `<p>${yearContent._intro}</p>\n`;

    const eventEntries = getEntries(yearEntry.full).filter(e => e.isDir);
    for (const evEntry of eventEntries) {
      const evName = evEntry.name;
      const evContent = yearContent[evName] || {};
      const evTitle = evContent._title || evName.replace(/^Tháng \S+\s+/, '');
      console.log(`  ▸ ${evName}`);

      html += `<h3>${evTitle}</h3>\n`;
      if (evContent._intro) html += `<p>${evContent._intro}</p>\n`;

      const files = getEntries(evEntry.full)
        .filter(e => !e.isDir && isImage(e.name))
        .map(e => e.full);

      console.log(`    (${files.length} ảnh)`);
      const cloudFolder = `vinapharma/hop-tac/${year}/${evName}`;
      const urls = [];
      for (const f of files) {
        process.stdout.write(`      ↑ ${path.basename(f)} ... `);
        const url = await uploadFile(f, cloudFolder);
        if (url) { urls.push(url); console.log('✓'); }
      }
      if (urls.length) html += makeGrid(urls) + '\n';
    }
  }

  await Settings.findOneAndUpdate(
    { key: 'activities-content-1' },
    { key: 'activities-content-1', value: html },
    { upsert: true, new: true }
  );
  console.log('\n✓ Đã lưu activities-content-1');
  await mongoose.disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
