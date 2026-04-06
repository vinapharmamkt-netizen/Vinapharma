// Script cập nhật mega menu Activlab-style cho tất cả HTML files
// Chạy: node update-mega-menu.js

const fs = require('fs');
const path = require('path');

const FILES_DIR = path.join(__dirname, 'files');
const HTML_FILES = [
  'index.html', 'san-pham.html', 'san-pham-chi-tiet.html', 'tin-tuc.html',
  'tin-tuc-chi-tiet.html', 'thong-tin-tai-khoan.html', 'tai-khoan.html',
  'muc-tieu-suc-khoe.html', 'lien-he.html', 'khuyen-mai.html', 'gioi-thieu.html'
];

// ─── New Mega Menu HTML ────────────────────────────────────────────────
const NEW_MEGA_HTML = `<li class="has-mega">
        <a href="san-pham.html">Tất cả sản phẩm</a>
        <div class="mega-wrap">
          <div class="mega-all-layout">
            <div class="mega-sidebar">
              <span class="mega-sidebar-label">Browse by</span>
              <button class="mega-sidebar-btn active" data-panel="danh-muc">Danh mục sức khỏe</button>
              <button class="mega-sidebar-btn" data-panel="thuong-hieu">Thương hiệu</button>
              <button class="mega-sidebar-btn" data-panel="do-tuoi">Độ tuổi</button>
            </div>
            <div class="mega-content-area">
              <!-- Panel: Danh mục -->
              <div class="mega-panel active" id="mega-panel-danh-muc">
                <div>
                  <div class="mega-panel-col-title">Mục tiêu sức khỏe</div>
                  <ul class="mega-panel-links">
                    <li><a href="san-pham.html?category=Tăng%20đề%20kháng">Tăng đề kháng</a></li>
                    <li><a href="san-pham.html?category=Xương%20khớp">Xương khớp</a></li>
                    <li><a href="san-pham.html?category=Tim%20mạch">Tim mạch</a></li>
                    <li><a href="san-pham.html?category=Trí%20não">Trí não</a></li>
                    <li><a href="san-pham.html?category=Giấc%20ngủ">Giấc ngủ</a></li>
                  </ul>
                  <a href="san-pham.html" class="mega-see-all-link">Xem tất cả →</a>
                </div>
                <div>
                  <div class="mega-panel-col-title">Dưỡng chất</div>
                  <ul class="mega-panel-links">
                    <li><a href="san-pham.html?category=Vitamin">Vitamin</a></li>
                    <li><a href="san-pham.html?category=Khoáng%20chất">Khoáng chất</a></li>
                    <li><a href="san-pham.html?category=Omega">Omega</a></li>
                    <li><a href="san-pham.html?category=Probiotics">Probiotics</a></li>
                    <li><a href="san-pham.html?category=Detox">Detox</a></li>
                  </ul>
                </div>
                <div>
                  <div class="mega-panel-col-title">Sắc đẹp & thể hình</div>
                  <ul class="mega-panel-links">
                    <li><a href="san-pham.html?category=Làm%20đẹp">Làm đẹp</a></li>
                    <li><a href="san-pham.html?category=Giảm%20cân">Giảm cân</a></li>
                    <li><a href="san-pham.html?category=Tăng%20cơ">Tăng cơ</a></li>
                    <li><a href="san-pham.html?category=Khác">Khác</a></li>
                  </ul>
                </div>
                <div>
                  <div class="mega-panel-col-title">Theo độ tuổi</div>
                  <ul class="mega-panel-links">
                    <li><a href="san-pham.html?ageGroup=Trẻ%20em">Trẻ em</a></li>
                    <li><a href="san-pham.html?ageGroup=Nam">Người lớn (Nam)</a></li>
                    <li><a href="san-pham.html?ageGroup=Nữ">Người lớn (Nữ)</a></li>
                    <li><a href="san-pham.html?ageGroup=Người%20già">Người cao tuổi</a></li>
                  </ul>
                </div>
              </div>
              <!-- Panel: Thương hiệu -->
              <div class="mega-panel" id="mega-panel-thuong-hieu" style="display:none;grid-template-columns:1fr">
                <div>
                  <div class="mega-panel-col-title">Thương hiệu</div>
                  <ul class="mega-panel-links mega-brand-list" style="display:grid;grid-template-columns:repeat(3,1fr);gap:.08rem 1.5rem">
                    <li><a href="san-pham.html">Tất cả thương hiệu</a></li>
                  </ul>
                </div>
              </div>
              <!-- Panel: Độ tuổi -->
              <div class="mega-panel" id="mega-panel-do-tuoi" style="display:none;grid-template-columns:repeat(2,1fr)">
                <div>
                  <div class="mega-panel-col-title">Theo nhóm tuổi</div>
                  <ul class="mega-panel-links">
                    <li><a href="san-pham.html?ageGroup=Trẻ%20em">🧒 Trẻ em</a></li>
                    <li><a href="san-pham.html?ageGroup=Nam">👨 Người lớn (Nam)</a></li>
                    <li><a href="san-pham.html?ageGroup=Nữ">👩 Người lớn (Nữ)</a></li>
                    <li><a href="san-pham.html?ageGroup=Người%20già">🧓 Người cao tuổi</a></li>
                    <li><a href="san-pham.html">Tất cả độ tuổi</a></li>
                  </ul>
                </div>
                <div>
                  <div class="mega-panel-col-title">Sản phẩm phổ biến</div>
                  <ul class="mega-panel-links">
                    <li><a href="san-pham.html?category=Vitamin">Vitamin tổng hợp</a></li>
                    <li><a href="san-pham.html?category=Tăng%20đề%20kháng">Tăng đề kháng</a></li>
                    <li><a href="san-pham.html?category=Làm%20đẹp">Làm đẹp từ bên trong</a></li>
                    <li><a href="san-pham.html?category=Xương%20khớp">Xương khớp</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>`;

// ─── New CSS to append ─────────────────────────────────────────────────
const NEW_CSS = `
/* Mega menu Activlab-style - auto-generated */
.mega-all-layout{display:grid;grid-template-columns:185px 1fr;gap:0;max-width:1280px;margin:0 auto;min-height:230px}
.mega-sidebar{border-right:1px solid #f0f0f0;padding:.2rem 0}
.mega-sidebar-label{display:block;font-size:.59rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#ccc;padding:.2rem 1rem .6rem}
.mega-sidebar-btn{display:flex;align-items:center;justify-content:space-between;padding:.72rem 1rem;font-size:.81rem;font-weight:600;color:#555;cursor:pointer;border:none;border-left:3px solid transparent;background:none;width:100%;text-align:left;transition:background .14s,color .14s,border-color .14s;font-family:inherit}
.mega-sidebar-btn::after{content:"›";font-size:1.15rem;color:#ccc;transition:color .14s}
.mega-sidebar-btn:hover,.mega-sidebar-btn.active{background:var(--red-pale);color:var(--red);border-left-color:var(--red)}
.mega-sidebar-btn:hover::after,.mega-sidebar-btn.active::after{color:var(--red)}
.mega-content-area{padding:.3rem 0 .5rem 2rem;flex:1;overflow:hidden}
.mega-panel{display:none;grid-template-columns:repeat(4,1fr);gap:0 2rem}
.mega-panel.active{display:grid}
.mega-panel-col-title{font-size:.62rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase;color:var(--red);margin-bottom:.65rem;padding-bottom:.38rem;border-bottom:1.5px solid #f5f5f5}
.mega-panel-links{list-style:none;display:flex;flex-direction:column;gap:.06rem;margin:0;padding:0}
.mega-panel-links a{font-size:.8rem;color:#444;text-decoration:none;padding:.27rem 0;display:block;transition:color .15s}
.mega-panel-links a:hover{color:var(--red)}
.mega-see-all-link{font-size:.72rem;font-weight:700;color:var(--red);text-decoration:none;margin-top:.6rem;display:inline-block;opacity:.85}
.mega-see-all-link:hover{opacity:1;text-decoration:underline}
`;

// ─── Helper: find & replace mega menu block using depth counting ────────
function replaceMegaBlock(html, newContent) {
  const START = '<li class="has-mega">';
  const startIdx = html.indexOf(START);
  if (startIdx === -1) return { html, changed: false };

  let depth = 0;
  let i = startIdx;

  while (i < html.length) {
    // Check for <li (opening tag)
    if (html.slice(i, i + 3) === '<li') {
      depth++;
      i += 3;
    } else if (html.slice(i, i + 5) === '</li>') {
      depth--;
      if (depth === 0) {
        const endIdx = i + 5;
        const newHtml = html.slice(0, startIdx) + newContent + html.slice(endIdx);
        return { html: newHtml, changed: true };
      }
      i += 5;
    } else {
      i++;
    }
  }
  return { html, changed: false };
}

// ─── Process all files ─────────────────────────────────────────────────
let totalUpdated = 0;

HTML_FILES.forEach(file => {
  const fp = path.join(FILES_DIR, file);
  if (!fs.existsSync(fp)) {
    console.log(`⏭️  Bỏ qua (không tồn tại): ${file}`);
    return;
  }

  let html = fs.readFileSync(fp, 'utf8');

  // 1. Replace mega menu HTML block
  const { html: newHtml, changed } = replaceMegaBlock(html, NEW_MEGA_HTML);
  if (changed) {
    html = newHtml;
    console.log(`✅ Replaced mega HTML: ${file}`);
  } else {
    console.log(`⚠️  Mega HTML not found: ${file}`);
  }

  // 2. Add new CSS (only if not already present)
  if (!html.includes('mega-all-layout') && html.includes('</style>')) {
    html = html.replace('</style>', NEW_CSS + '</style>');
    console.log(`   + Added CSS to: ${file}`);
  } else if (html.includes('mega-all-layout')) {
    console.log(`   ~ CSS already present: ${file}`);
  }

  fs.writeFileSync(fp, html, 'utf8');
  if (changed) totalUpdated++;
});

console.log(`\n📦 Xong! Cập nhật ${totalUpdated}/${HTML_FILES.length} file.`);
