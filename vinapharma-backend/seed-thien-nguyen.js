/**
 * seed-thien-nguyen.js
 * Upload toàn bộ ảnh Hoạt động thiện nguyện lên Cloudinary
 * rồi tạo HTML theo cấu trúc: năm → sự kiện → địa điểm → lưới ảnh
 * Lưu vào activities-content-2
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

const ROOT = path.join(__dirname, '..', 'files', 'hình ảnh', 'Hoạt động thiện nguyện');
const IMG_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

// ── Nội dung mô tả từng mục ──────────────────────────────────────────────────
const CONTENT = {
  '2024': {
    _intro: 'Năm 2024 đánh dấu hành trình thiện nguyện đầu tiên của Vinapharma với nhiều hoạt động ý nghĩa, lan tỏa yêu thương đến những hoàn cảnh khó khăn trên khắp cả nước.',
    'Tháng 11 TPHCM - Người vô gia cư': {
      _intro: 'Trong những đêm cuối năm, đội ngũ Vinapharma đã tổ chức chuyến đi phát cơm, nhu yếu phẩm và thuốc men miễn phí cho người vô gia cư tại TP. Hồ Chí Minh. Hàng chục phần quà được trao tận tay với tấm lòng chân thành, góp phần xoa dịu bớt những khó khăn trong mùa đông.',
    },
    'Tháng 9 Tiếp bước đến trường': {
      _intro: 'Nhân dịp tựu trường tháng 9, Vinapharma phối hợp cùng UBMTTQVN trao tặng 59 xe đạp và học bổng cho các em học sinh có hoàn cảnh khó khăn. Chương trình "Tiếp bước đến trường" mong muốn không một em nhỏ nào phải bỏ học vì thiếu phương tiện di chuyển.',
    },
    'Tháng 9 Trung Thu Phú Yên': {
      _intro: 'Vượt hơn 600 km đến với các em nhỏ tại Phú Yên, đoàn thiện nguyện Vinapharma mang theo bánh trung thu, đèn lồng và quà tặng, tạo nên một đêm trăng rằm ấm áp và đầy tiếng cười cho những trẻ em vùng khó khăn.',
    },
    'Tháng 9 Trăng Sáng 1': {
      _intro: 'Chương trình "Trăng Sáng Mùa 1" là hoạt động thiện nguyện quy mô đầu tiên của Vinapharma, mang sách vở, đồ dùng học tập và quà Trung Thu đến ba trường học tại tỉnh Long An. Hơn 500 em học sinh được nhận quà và tham gia các hoạt động vui chơi sôi nổi.',
      'THCS Vĩnh Ngươu': 'Trường THCS Vĩnh Ngươu là điểm đến đầu tiên. Các em học sinh lớp 6 đến lớp 9 hân hoan đón nhận bộ dụng cụ học tập, sách tham khảo và phần quà Trung Thu. Những ánh mắt sáng ngời và nụ cười rạng rỡ là món quà quý giá nhất mà đoàn mang về.',
      'Tiểu học Hồ Văn Nhánh': 'Tại Tiểu học Hồ Văn Nhánh, hàng trăm em học sinh tiểu học được nhận cặp sách, tập vở và bút màu. Chương trình còn tổ chức các trò chơi dân gian, tạo không khí lễ hội sôi động ngay trong sân trường.',
      'Tiểu học Lê Văn Tám': 'Điểm cuối của hành trình "Trăng Sáng Mùa 1" là Tiểu học Lê Văn Tám với hơn 200 em học sinh tham dự. Đoàn tặng quà và cùng thầy cô tổ chức chương trình văn nghệ chào mừng năm học mới, khép lại chuyến đi với nhiều kỷ niệm đáng nhớ.',
    },
  },
  '2025': {
    _intro: 'Sang năm 2025, Vinapharma tiếp tục mở rộng các hoạt động thiện nguyện với chương trình "Trăng Sáng Mùa 2" quy mô hơn — đồng hành cùng 5 mái ấm, nhà tình thương tại TP. Hồ Chí Minh, mang yêu thương đến những mảnh đời kém may mắn.',
    'Trăng sáng mùa 2': {
      _intro: 'Chương trình "Trăng Sáng Mùa 2" diễn ra vào mùa Trung Thu năm 2025, quy tụ toàn thể đội ngũ Vinapharma cùng các đối tác đồng hành. Đoàn mang theo hàng trăm phần quà, nhu yếu phẩm, thuốc bổ và tiền mặt hỗ trợ đến 5 mái ấm — nhà tình thương trên địa bàn TP. HCM, thắp sáng thêm những mùa trăng ấm áp cho các em nhỏ và các cụ già neo đơn.',
      'Mái ấm chùa Kỳ Quang': 'Mái ấm chùa Kỳ Quang (Gò Vấp) là nơi nuôi dưỡng hàng chục trẻ em mồ côi và người khuyết tật. Đoàn Vinapharma đã trao tặng phần quà, bánh trung thu, quần áo và tiền mặt hỗ trợ sinh hoạt. Khoảnh khắc các em nhỏ hào hứng rước đèn, múa lân trong sân chùa là hình ảnh đẹp không thể quên.',
      'Mái ấm Tâm Đức': 'Mái ấm Tâm Đức là ngôi nhà của nhiều trẻ em có hoàn cảnh đặc biệt khó khăn. Vinapharma trao tặng quà Trung Thu, nhu yếu phẩm và hỗ trợ kinh phí sửa chữa cơ sở vật chất, góp phần tạo môi trường sống tốt hơn cho các em.',
      'Mái ấm Tân Bình': 'Tại mái ấm Tân Bình, đoàn đã gặp gỡ và trò chuyện cùng các em nhỏ, chia sẻ về ước mơ tương lai. Ngoài quà tặng, đoàn còn tổ chức các hoạt động vui chơi, tạo không khí ngày hội ấm áp ngay giữa lòng thành phố.',
      'Mái ấm Thiên Thần': 'Mái ấm Thiên Thần là nơi chăm sóc trẻ em khuyết tật và trẻ mồ côi. Vinapharma mang đến không chỉ vật chất mà còn cả tình cảm — các thành viên trong đoàn dành thời gian ôm hôn, vui đùa cùng các em, để lại trong lòng mọi người những xúc cảm chân thật và sâu sắc nhất.',
      'Sài Gòn Bao Dung': 'Điểm dừng chân cuối cùng của "Trăng Sáng Mùa 2" là Sài Gòn Bao Dung — mái ấm dành cho người già neo đơn và trẻ em lang thang. Tại đây, đoàn Vinapharma trao quà, phát thuốc và cùng các cụ già thụ hưởng mâm cơm đoàn tụ, khép lại hành trình với trọn vẹn yêu thương.',
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

// ── Build tree: { year, events: [{ name, locations: [{ name, files }] }] } ──

function buildTree() {
  const tree = [];
  const yearEntries = getEntries(ROOT).filter(e => e.isDir);
  for (const year of yearEntries) {
    const events = [];
    const eventEntries = getEntries(year.full).filter(e => e.isDir);
    for (const ev of eventEntries) {
      const all = getEntries(ev.full);
      const subDirs  = all.filter(e => e.isDir);
      const dirFiles = all.filter(e => !e.isDir && isImage(e.name));

      if (subDirs.length > 0) {
        // Sự kiện có nhiều địa điểm
        const locations = subDirs.map(sd => ({
          name: sd.name,
          files: getEntries(sd.full).filter(e => !e.isDir && isImage(e.name)).map(e => e.full),
        }));
        // Ảnh trực tiếp trong folder sự kiện → gộp vào nhóm đầu
        if (dirFiles.length) {
          locations.unshift({ name: null, files: dirFiles.map(e => e.full) });
        }
        events.push({ name: ev.name, locations });
      } else {
        events.push({ name: ev.name, locations: [{ name: null, files: dirFiles.map(e => e.full) }] });
      }
    }
    tree.push({ year: year.name, events });
  }
  return tree;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB\n');

  const tree = buildTree();
  let html = '';

  for (const { year, events } of tree) {
    console.log(`\n══ ${year} ══`);
    const yearContent = CONTENT[year] || {};
    html += `<h2>${year}</h2>\n`;
    if (yearContent._intro) html += `<p>${yearContent._intro}</p>\n`;

    for (const ev of events) {
      console.log(`  ▸ ${ev.name}`);
      const evTitle = ev.name.replace(/^Tháng \d+\s+/, '');
      const evContent = yearContent[ev.name] || {};
      html += `<h3>${evTitle}</h3>\n`;
      if (evContent._intro) html += `<p>${evContent._intro}</p>\n`;

      for (const loc of ev.locations) {
        const cloudFolder = `vinapharma/thien-nguyen/${year}/${ev.name}${loc.name ? '/' + loc.name : ''}`;
        if (loc.name) {
          console.log(`    ● ${loc.name} (${loc.files.length} ảnh)`);
          html += `<h4 style="margin:1.6rem 0 .5rem;font-size:.96rem;font-weight:800;color:#333;border-left:3px solid #cc1f1f;padding-left:.7rem">${loc.name}</h4>\n`;
          const locDesc = evContent[loc.name];
          if (locDesc) html += `<p>${locDesc}</p>\n`;
        } else {
          console.log(`    (${loc.files.length} ảnh)`);
        }

        // Dùng lại URL từ Cloudinary nếu đã upload (tên file → public_id)
        const urls = [];
        for (const f of loc.files) {
          process.stdout.write(`      ↑ ${path.basename(f)} ... `);
          const url = await uploadFile(f, cloudFolder);
          if (url) { urls.push(url); console.log('✓'); }
        }
        if (urls.length) html += makeGrid(urls) + '\n';
      }
    }
  }

  // Lưu vào MongoDB
  await Settings.findOneAndUpdate(
    { key: 'activities-content-2' },
    { key: 'activities-content-2', value: html },
    { upsert: true, new: true }
  );
  console.log('\n✓ Đã lưu activities-content-2');
  await mongoose.disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
