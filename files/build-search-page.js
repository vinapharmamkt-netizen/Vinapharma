const fs = require('fs');

const tinTuc = fs.readFileSync('tin-tuc.html', 'utf8');
const tt_lines = tinTuc.split('\n');

// Get header (lines 322-413, 0-indexed: 321-412)
// Remove active class from nav items (tin-tuc.html has active on Tin tức)
const header = tt_lines.slice(321, 413).join('\n').replace(/ class="active"/g, '');
// Get footer (lines 456-502, 0-indexed: 455-501)
const footer = tt_lines.slice(455, 502).join('\n');
// Get style block
const styleStart = tt_lines.findIndex(l => l.trim() === '<style>');
const styleEnd = tt_lines.findIndex(l => l.trim() === '</style>');
const headCSS = tt_lines.slice(styleStart + 1, styleEnd).join('\n');

const extraCSS = `
/* ===== RESULTS PAGE ===== */
.search-results-wrap{max-width:1200px;margin:0 auto;padding:2rem 4%}
.sr-hero{background:linear-gradient(120deg,var(--red) 0%,var(--red-dark) 100%);padding:2.2rem 4%;color:#fff}
.sr-hero-label{font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:.3rem}
.sr-hero-title{font-size:clamp(1.2rem,2.5vw,2rem);font-weight:900}
.sr-hero-keyword{color:#ffd97d}
.sr-section-title{font-size:.7rem;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:.08em;margin:2rem 0 1rem;display:flex;align-items:center;gap:.5rem;border-bottom:1px solid var(--border);padding-bottom:.5rem}
.sr-section-title i{color:var(--red)}
.sr-products-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2.5rem}
.sr-product-card{border:1.5px solid var(--border);border-radius:.9rem;overflow:hidden;text-decoration:none;color:inherit;transition:box-shadow .2s,transform .2s;display:flex;flex-direction:column}
.sr-product-card:hover{box-shadow:0 6px 20px rgba(204,31,31,.12);transform:translateY(-2px)}
.sr-product-img{height:160px;background:var(--light);display:flex;align-items:center;justify-content:center;overflow:hidden}
.sr-product-img img{width:100%;height:100%;object-fit:cover}
.sr-product-body{padding:.85rem;flex:1;display:flex;flex-direction:column;gap:.2rem}
.sr-product-brand{font-size:.62rem;font-weight:700;color:var(--red);text-transform:uppercase;letter-spacing:.06em}
.sr-product-name{font-size:.86rem;font-weight:700;line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.sr-product-weight{font-size:.7rem;color:var(--gray)}
.sr-product-price{display:none}
.sr-posts-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;margin-bottom:2.5rem}
.sr-post-card{border:1.5px solid var(--border);border-radius:.9rem;overflow:hidden;text-decoration:none;color:inherit;transition:box-shadow .2s;display:flex;flex-direction:column}
.sr-post-card:hover{box-shadow:0 6px 20px rgba(0,0,0,.08)}
.sr-post-thumb{height:160px;background:var(--light);display:flex;align-items:center;justify-content:center;overflow:hidden}
.sr-post-thumb img{width:100%;height:100%;object-fit:cover}
.sr-post-body{padding:.85rem;flex:1;display:flex;flex-direction:column;gap:.3rem}
.sr-post-title{font-size:.87rem;font-weight:700;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.sr-post-meta{font-size:.72rem;color:#9ca3af;margin-top:auto}
.sr-empty{text-align:center;padding:4rem 1rem;color:#9ca3af}
.sr-empty i{font-size:3rem;margin-bottom:1rem;display:block;color:#d1d5db}
.sr-empty h3{font-size:1.1rem;font-weight:700;color:var(--dark);margin-bottom:.5rem}
.sr-empty p{font-size:.85rem}
.sr-count{font-size:.82rem;color:var(--gray);margin-top:-.5rem;margin-bottom:1.5rem}
@media(max-width:768px){.sr-products-grid{grid-template-columns:repeat(2,1fr)}.sr-posts-grid{grid-template-columns:1fr}}
@media(max-width:400px){.sr-products-grid{grid-template-columns:1fr 1fr}}
`;

const html = `<!DOCTYPE html>
<html lang="vi">
<head>
    <link rel="icon" href="logoVina.png?v=2" type="image/png">
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"/>
<title>K\u1ebft qu\u1ea3 t\u00ecm ki\u1ebfm \u2013 Vinapharma</title>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>
<link rel="stylesheet" href="mobile.css"/>
<style>
${headCSS}
${extraCSS}
</style>
</head>
<body>

${header}

<div class="sr-hero">
  <div class="sr-hero-label"><i class="fa-solid fa-magnifying-glass" style="margin-right:.4rem"></i>K\u1ebft qu\u1ea3 t\u00ecm ki\u1ebfm</div>
  <div class="sr-hero-title" id="heroTitle">\u0110ang t\u00ecm ki\u1ebfm...</div>
</div>

<div class="search-results-wrap">
  <div id="loadingState" style="text-align:center;padding:3rem 1rem;color:#9ca3af;display:none">
    <i class="fa-solid fa-spinner fa-spin" style="font-size:2rem;color:#cc1f1f;margin-bottom:.8rem;display:block"></i>
    <p>Đang tìm kiếm...</p>
  </div>
  <div id="productsWrap" style="display:none">
    <div class="sr-section-title"><i class="fa-solid fa-box"></i> S\u1ea3n ph\u1ea9m</div>
    <div class="sr-count" id="productsCount"></div>
    <div class="sr-products-grid" id="productsGrid"></div>
  </div>

  <div id="postsWrap" style="display:none">
    <div class="sr-section-title"><i class="fa-regular fa-newspaper"></i> B\u00e0i vi\u1ebft</div>
    <div class="sr-count" id="postsCount"></div>
    <div class="sr-posts-grid" id="postsGrid"></div>
  </div>

  <div class="sr-empty" id="emptyState" style="display:none">
    <i class="fa-solid fa-magnifying-glass"></i>
    <h3>Kh\u00f4ng t\u00ecm th\u1ea5y k\u1ebft qu\u1ea3</h3>
    <p id="emptyMsg">Th\u1eed t\u1eeb kh\u00f3a kh\u00e1c ho\u1eb7c ki\u1ec3m tra l\u1ea1i ch\u00ednh t\u1ea3</p>
  </div>
</div>

${footer}

<script>
const API = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:5000'
  : 'https://api.vinapharmajsc.vn';

const params = new URLSearchParams(location.search);
const q = params.get('q') || params.get('search') || '';

document.addEventListener('DOMContentLoaded', () => {
  const si = document.querySelector('.search-bar input');
  if (si) si.value = q;
});

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function fmtPrice(n) {
  return n ? n.toLocaleString('vi-VN') + '\u20ab' : 'https://api.vinapharmajsc.vn';
}
function imgUrl(u) {
  if (!u) return '';
  return u.startsWith('http') ? u : API + u;
}

async function doSearch(query) {
  const heroTitle = document.getElementById('heroTitle');
  const wrap = document.getElementById('loadingState');
  if (!query) {
    heroTitle.textContent = 'Nh\u1eadp t\u1eeb kh\u00f3a \u0111\u1ec3 t\u00ecm ki\u1ebfm';
    return;
  }
  heroTitle.innerHTML = 'K\u1ebft qu\u1ea3 cho "<span class="sr-hero-keyword">' + escHtml(query) + '</span>"';
  document.getElementById('loadingState').style.display = '';
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);
    const [pRes, aRes] = await Promise.all([
      fetch(API + '/api/products?search=' + encodeURIComponent(query) + '&limit=40', { signal: ctrl.signal }),
      fetch(API + '/api/posts?search=' + encodeURIComponent(query) + '&limit=12', { signal: ctrl.signal }),
    ]);
    clearTimeout(timer);
    document.getElementById('loadingState').style.display = 'none';
    const [pData, aData] = await Promise.all([pRes.json(), aRes.json()]);
    const products = pData.success ? (pData.data || []) : [];
    const posts    = aData.success ? (aData.data || []) : [];
    if (products.length) {
      document.getElementById('productsWrap').style.display = '';
      document.getElementById('productsCount').textContent = 'T\u00ecm th\u1ea5y ' + products.length + ' s\u1ea3n ph\u1ea9m';
      document.getElementById('productsGrid').innerHTML = products.map(p => {
        const img = p.image
          ? '<img src="' + imgUrl(p.image) + '" alt="' + escHtml(p.name) + '" loading="lazy"/>'
          : '<i class="fa-solid fa-box" style="color:#d1d5db;font-size:2.8rem"></i>';
        return '<a class="sr-product-card" href="san-pham-chi-tiet.html?id=' + p._id + '">'
          + '<div class="sr-product-img">' + img + '</div>'
          + '<div class="sr-product-body">'
          + '<div class="sr-product-brand">' + escHtml(p.brandName || p.brand || '') + '</div>'
          + '<div class="sr-product-name">' + escHtml(p.name) + '</div>'
          + (p.weight ? '<div class="sr-product-weight">' + escHtml(p.weight) + '</div>' : '')
          + '</div></a>';
      }).join('');
    }
    if (posts.length) {
      document.getElementById('postsWrap').style.display = '';
      document.getElementById('postsCount').textContent = 'T\u00ecm th\u1ea5y ' + posts.length + ' b\u00e0i vi\u1ebft';
      document.getElementById('postsGrid').innerHTML = posts.map(a => {
        const src = a.thumbnail || a.image || '';
        const img = src
          ? '<img src="' + imgUrl(src) + '" alt="' + escHtml(a.title) + '" loading="lazy"/>'
          : '<i class="fa-regular fa-newspaper" style="color:#d1d5db;font-size:2.5rem"></i>';
        const date = a.createdAt ? new Date(a.createdAt).toLocaleDateString('vi-VN') : 'https://api.vinapharmajsc.vn';
        return '<a class="sr-post-card" href="tin-tuc-chi-tiet.html?id=' + a._id + '">'
          + '<div class="sr-post-thumb">' + img + '</div>'
          + '<div class="sr-post-body">'
          + '<div class="sr-post-title">' + escHtml(a.title) + '</div>'
          + (date ? '<div class="sr-post-meta"><i class="fa-regular fa-calendar" style="margin-right:.3rem"></i>' + date + '</div>' : '')
          + '</div></a>';
      }).join('');
    }
    if (!products.length && !posts.length) {
      document.getElementById('emptyState').style.display = '';
      document.getElementById('emptyMsg').textContent = 'Kh\u00f4ng c\u00f3 k\u1ebft qu\u1ea3 n\u00e0o cho "' + query + '"';
      heroTitle.innerHTML = 'Kh\u00f4ng t\u00ecm th\u1ea5y "<span class="sr-hero-keyword">' + escHtml(query) + '</span>"';
    }
  } catch(e) {
    document.getElementById('loadingState').style.display = 'none';
    const es = document.getElementById('emptyState');
    es.style.display = '';
    if (e.name === 'AbortError') {
      es.innerHTML = '<i class="fa-solid fa-clock" style="color:#d97706"></i><h3>Server \u0111ang kh\u1edfi \u0111\u1ed9ng</h3><p>Vui l\u00f2ng \u0111\u1ee3i 30 gi\u00e2y r\u1ed3i t\u1ea3i l\u1ea1i trang.</p>';
    } else {
      es.innerHTML = '<i class="fa-solid fa-triangle-exclamation" style="color:#d97706"></i><h3>L\u1ed7i k\u1ebft n\u1ed1i</h3><p>Kh\u00f4ng th\u1ec3 k\u1ebft n\u1ed1i server. Vui l\u00f2ng th\u1eed l\u1ea1i.</p>';
    }
  }
}

doSearch(q);
</script>
<script src="authClient.js"></script>
<script src="header.js?v=3"></script>
<script src="mega-brands.js"></script>
<script src="popup-offer.js"></script>
<script>
(function(){
  var btn = document.getElementById('mobMenuBtn');
  var nav = document.querySelector('.header-nav');
  if (!btn || !nav) return;
  var bd = document.createElement('div');
  bd.className = 'mob-nav-backdrop';
  document.body.appendChild(bd);
  function openNav(){ nav.classList.add('open'); bd.classList.add('show'); }
  function closeNav(){ nav.classList.remove('open'); bd.classList.remove('show'); }
  btn.addEventListener('click', function(e){ e.stopPropagation(); nav.classList.contains('open') ? closeNav() : openNav(); });
  bd.addEventListener('click', closeNav);
  document.querySelectorAll('.nav-list > li.has-mega > a').forEach(function(a){
    a.addEventListener('click', function(e){
      if (window.innerWidth <= 768){ e.preventDefault(); this.closest('li').classList.toggle('mob-open'); }
    });
  });
})();
</script>
<button id="backToTop" onclick="window.scrollTo({top:0,behavior:'smooth'})" title="V\u1ec1 \u0111\u1ea7u trang" style="position:fixed;bottom:100px;right:24px;width:44px;height:44px;border-radius:50%;background:#cc1f1f;color:#fff;border:none;cursor:pointer;font-size:1.1rem;box-shadow:0 4px 12px rgba(204,31,31,.35);display:none;align-items:center;justify-content:center;z-index:100000;transition:opacity .2s"><i class="fa-solid fa-chevron-up"></i></button>
<script>(function(){var b=document.getElementById('backToTop');window.addEventListener('scroll',function(){b.style.display=window.scrollY>300?'flex':'none';});})();</script>
<script src="chat-widget.js"></script>
<script src="search-widget.js"></script>
<script src="footer-brands.js"></script>
</body>
</html>`;

fs.writeFileSync('tim-kiem.html', html);
console.log('Done! Size:', html.length, 'bytes (~', Math.round(html.length/1024), 'KB)');
