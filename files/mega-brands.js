/**
 * Vinapharma - Mega menu: load brands từ API + sidebar switching
 */
(function() {
  const API = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000'
    : 'https://api.vinapharmajsc.vn';

  // ─── Sidebar switching logic ─────────────────────────────────────────────
  function initSidebarSwitch() {
    document.querySelectorAll('.mega-sidebar-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var panel = btn.dataset.panel;
        var wrap = btn.closest('.mega-wrap');
        if (!wrap) return;

        // Toggle active on buttons
        wrap.querySelectorAll('.mega-sidebar-btn').forEach(function(b) {
          b.classList.toggle('active', b === btn);
        });

        // Show/hide panels
        wrap.querySelectorAll('.mega-panel').forEach(function(p) {
          var isTarget = p.id === 'mega-panel-' + panel;
          p.style.display = isTarget ? '' : 'none';
          p.classList.toggle('active', isTarget);
        });
      });
    });
  }

  // ─── Render product cards vào container ──────────────────────────────────
  function renderProductCards(container, products, count) {
    container.innerHTML = '';
    products.slice(0, count).forEach(p => {
      const a = document.createElement('a');
      a.className = 'mega-pc';
      a.href = 'san-pham-chi-tiet.html?id=' + p._id;
      const imgSrc = p.image || (p.images && p.images[0]);
      const media = imgSrc
        ? `<img class="mega-pc-img" src="${imgSrc.startsWith('http') ? imgSrc : API + imgSrc}" alt="${p.name}" loading="lazy">`
        : `<span class="mega-pc-icon">${p.icon || '💊'}</span>`;
      a.innerHTML = media
        + `<span class="mega-pc-name">${p.name}</span>`
        ;
      container.appendChild(a);
    });
  }

  // ─── Load products vào tất cả panels ─────────────────────────────────────
  async function loadFeaturedProducts() {
    try {
      const res = await fetch(`${API}/api/products?featured=true&limit=12`);
      if (!res.ok) throw new Error('Lỗi tải sản phẩm');
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      const products = json.data;

      // Panel Danh mục: cột 4 — 4 cards (2×2)
      document.querySelectorAll('#mega-danh-muc-products').forEach(c => renderProductCards(c, products, 4));

      // Panel Thương hiệu — 4 cards (2×2)
      document.querySelectorAll('#mega-thuong-hieu-products').forEach(c => renderProductCards(c, products, 4));

      // Panel Độ tuổi — 4 cards (2×2)
      document.querySelectorAll('#mega-do-tuoi-products').forEach(c => renderProductCards(c, products, 4));

    } catch (err) {
      console.error('[VP] ❌ Lỗi load featured:', err.message);
    }
  }

  // ─── Load brands into Thương hiệu panel ──────────────────────────────────
  async function loadBrands() {
    try {
      const res = await fetch(`${API}/api/brands`);
      const json = await res.json();
      if (!json.success) return;
      const brands = json.data.filter(b => b.active);
      document.querySelectorAll('.mega-brand-list').forEach(container => {
        container.innerHTML = '';
        brands.forEach(brand => {
          const a = document.createElement('a');
          a.className = 'mega-brand-card';
          a.href = `san-pham.html?brand=${encodeURIComponent(brand.code)}`;
          a.textContent = brand.name;
          container.appendChild(a);
        });
        const all = document.createElement('a');
        all.className = 'mega-brand-card';
        all.href = 'san-pham.html';
        all.textContent = 'Tất cả →';
        all.style.cssText = 'border-color:var(--red);color:var(--red);font-weight:700';
        container.appendChild(all);
      });
    } catch (err) {
      console.error('[VP] ❌ Lỗi load brands:', err.message);
    }
  }

  // ─── Init ─────────────────────────────────────────────────────────────────
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        initSidebarSwitch();
        loadBrands();
        loadFeaturedProducts();
      });
    } else {
      initSidebarSwitch();
      loadBrands();
      loadFeaturedProducts();
    }
  }

  init();
})();
