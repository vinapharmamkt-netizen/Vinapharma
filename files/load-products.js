/**
 * Load products từ API
 * Hỗ trợ lọc theo brand, category, tìm kiếm
 */
(function() {
  const API = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000'
    : 'https://vinapharma-pwv2.onrender.com';
  let allBrands = [];
  let allProducts = [];
  let currentBrand = 'all';
  let currentCategory = 'all';
  let currentAgeGroup = 'all';
  let currentSearch = '';

  async function loadBrands() {
    try {
      const res = await fetch(`${API}/api/brands`);
      if (!res.ok) throw new Error('Lỗi tải thương hiệu');
      const json = await res.json();
      if (!json.success) return [];
      return json.data.filter(b => b.active);
    } catch (err) {
      console.error('[VP] ❌ Lỗi load brands:', err.message);
      return [];
    }
  }

  async function loadAllProducts() {
    try {
      const res = await fetch(`${API}/api/products?limit=200`);
      if (!res.ok) throw new Error('Lỗi tải sản phẩm');
      
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      
      return json.data;
    } catch (err) {
      console.error('[VP] ❌ Lỗi load products:', err.message);
      return [];
    }
  }

  function extractCategories(products) {
    // Danh sách tất cả category available (từ enum Model Product)
    const allCategories = [
      'Tăng đề kháng', 'Xương khớp', 'Tim mạch', 'Làm đẹp',
      'Giảm cân', 'Tăng cơ', 'Trí não', 'Giấc ngủ', 'Detox',
      'Vitamin', 'Khoáng chất', 'Omega', 'Probiotics', 'Khác'
    ];
    return allCategories;
  }

  // Brand icon map
  const BRAND_ICONS = {
    'ACTIVLAB': '🏋️', 'EUV': '👁️', 'HBW': '🌿', 'HERA': '✨',
    'No1EU': '🇪🇺', 'No1USA': '🇺🇸', 'ROYAL': '👑', 'VIN': '🌸', 'VP': '💊'
  };

  function renderBrandFilters(brands) {
    const filterBar = document.getElementById('brandScrollTrack') || document.querySelector('.filter-bar');
    if (!filterBar) return;

    filterBar.innerHTML = '';

    // Tất cả
    const allBtn = document.createElement('button');
    allBtn.className = 'brand-card active';
    allBtn.dataset.brand = 'all';
    allBtn.innerHTML = '<span class="brand-card-icon">🛒</span><span class="brand-card-name">Tất cả</span>';
    filterBar.appendChild(allBtn);

    brands.forEach(brand => {
      const btn = document.createElement('button');
      btn.className = 'brand-card';
      btn.dataset.brand = brand._id;
      btn.dataset.brandCode = brand.code;
      const icon = brand.logo
        ? `<img src="${brand.logo}" class="brand-card-img" alt="${brand.name}">`
        : `<span class="brand-card-icon">${BRAND_ICONS[brand.code] || brand.name[0]}</span>`;
      btn.innerHTML = icon + `<span class="brand-card-name">${brand.name}</span>`;
      filterBar.appendChild(btn);
    });
  }

  function renderCategoryFilters(products) {
    const filterBar = document.querySelector('.filter-bar-category');
    if (!filterBar) return;
    
    const categories = extractCategories(products);
    
    // Xóa old cat buttons
    const oldCatBtns = filterBar.querySelectorAll('.filter-btn[data-category]');
    oldCatBtns.forEach(btn => btn.remove());
    
    // Thêm "Tất cả" button
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.dataset.category = 'all';
    allBtn.textContent = 'Tất cả';
    filterBar.appendChild(allBtn);
    
    // Thêm category buttons
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.dataset.category = cat;
      btn.textContent = cat;
      filterBar.appendChild(btn);
    });
  }

  function renderAgeGroupFilters() {
    const filterBar = document.querySelector('.filter-bar-age');
    if (!filterBar) return;

    const groups = [
      { value: 'all', label: 'Tất cả' },
      { value: 'Trẻ em', label: 'Trẻ em' },
      { value: 'Nam', label: 'Người lớn (Nam)' },
      { value: 'Nữ', label: 'Người lớn (Nữ)' },
      { value: 'Người già', label: 'Người già' },
    ];

    filterBar.innerHTML = '';
    groups.forEach(g => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (g.value === currentAgeGroup ? ' active' : '');
      btn.dataset.ageGroup = g.value;
      btn.textContent = g.label;
      filterBar.appendChild(btn);
    });
  }

  function filterProducts() {
    let filtered = allProducts;

    if (currentBrand !== 'all') {
      filtered = filtered.filter(p => p.brand === currentBrand);
    }

    if (currentCategory !== 'all') {
      filtered = filtered.filter(p => p.category === currentCategory);
    }

    if (currentAgeGroup !== 'all') {
      filtered = filtered.filter(p => !p.ageGroup || p.ageGroup === 'Tất cả' || p.ageGroup === currentAgeGroup);
    }

    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
    }

    return filtered;
  }

  function showLoading() {
    document.querySelectorAll('.products-grid').forEach(grid => {
      grid.innerHTML = '<div style="grid-column:1/-1;padding:3rem;text-align:center;color:#999"><i class="fa-solid fa-circle-notch fa-spin" style="font-size:2rem;color:var(--red)"></i><div style="margin-top:.8rem;font-size:.85rem">Đang tải sản phẩm...</div></div>';
    });
  }

  function renderProducts(products) {
    const grids = document.querySelectorAll('.products-grid');
    if (grids.length === 0) return;

    grids.forEach(grid => {
      grid.innerHTML = '';

      if (products.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;padding:2rem;text-align:center;color:#999">Không có sản phẩm</div>';
        return;
      }
      
      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.brand = product.brand;
        card.dataset.cat = product.category;
        
        const priceHtml = '';
        
        const badgeHtml = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
        
        card.innerHTML = `
          ${badgeHtml}
          <div class="product-img">${
            (product.image || (product.images && product.images[0]))
              ? `<img src="${((s=>(s.startsWith('http')?s:API+s))(product.image||product.images[0]))}" alt="" onerror="this.style.display='none'" style="width:100%;height:100%;object-fit:contain;padding:.5rem">`
              : (product.icon || '<i class="fa-solid fa-box" style="color:#9ca3af;font-size:2rem"></i>')
          }</div>
          <div class="product-body">
            <div class="product-brand">${product.brandName||product.brand}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-weight">${product.weight || ''}</div>
            <div class="product-footer">
              <div>${priceHtml}</div>
              <button class="add-btn">+</button>
            </div>
          </div>
        `;
        
        grid.appendChild(card);

        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
          window.location.href = 'san-pham-chi-tiet.html?id=' + product._id;
        });
      });
    });

    const countEl = document.getElementById('spCount');
    if (countEl) countEl.textContent = products.length + ' sản phẩm';
    grids.forEach(g => { g.style.opacity = '1'; g.style.transform = 'none'; });
    console.log('[VP] ✅ Render ' + products.length + ' sản phẩm');
  }

  function initAccordion() {
    document.querySelectorAll('.sp-acc-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const body = document.getElementById(btn.dataset.target);
        if (!body) return;
        btn.classList.toggle('open');
        body.classList.toggle('open');
      });
    });

    // Scroll arrows
    const track = document.getElementById('brandScrollTrack');
    document.getElementById('brandScrollPrev')?.addEventListener('click', () => track && (track.scrollLeft -= 240));
    document.getElementById('brandScrollNext')?.addEventListener('click', () => track && (track.scrollLeft += 240));

    const clearBtn = document.getElementById('spClearBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        currentBrand = 'all'; currentCategory = 'all'; currentAgeGroup = 'all';
        document.querySelectorAll('.filter-btn').forEach(b => {
          const isAll = b.dataset.brand === 'all' || b.dataset.category === 'all' || b.dataset.ageGroup === 'all';
          b.classList.toggle('active', isAll);
        });
        renderProducts(filterProducts());
        window.history.pushState({}, '', window.location.pathname);
      });
    }
  }

  async function init() {
    // Lấy filter từ URL param
    const urlParams = new URLSearchParams(window.location.search);
    currentBrand    = urlParams.get('brand')    || 'all';
    currentCategory = urlParams.get('category') || 'all';
    currentAgeGroup = urlParams.get('ageGroup') || 'all';
    currentSearch   = urlParams.get('search')   || '';

    // Pre-fill search input nếu có ?search=
    if (currentSearch) {
      const inp = document.querySelector('.search-bar input');
      if (inp) inp.value = currentSearch;
    }
    
    // Show loading state while API warms up
    showLoading();

    // Load brands & products
    allBrands = await loadBrands();
    allProducts = await loadAllProducts();

    // Convert brand code in URL to _id
    if (currentBrand !== 'all') {
      const matched = allBrands.find(b => b.code === currentBrand || b._id === currentBrand);
      if (matched) currentBrand = matched._id;
      else currentBrand = 'all';
    }

    // Render filters
    renderBrandFilters(allBrands);
    renderCategoryFilters(allProducts);
    renderAgeGroupFilters();
    
    // Render products
    const filtered = filterProducts();
    renderProducts(filtered);
    
    // Setup filter buttons & accordion
    setupFilterButtons();
    initAccordion();
  }

  function setupFilterButtons() {
    document.querySelectorAll('.brand-card, .filter-btn').forEach(btn => {
      const isBrandBtn    = btn.dataset.brand    !== undefined;
      const isCatBtn      = btn.dataset.category !== undefined;
      const isAgeGroupBtn = btn.dataset.ageGroup !== undefined;

      if (isBrandBtn) {
        btn.classList.toggle('active', btn.dataset.brand === currentBrand || (currentBrand === 'all' && btn.dataset.brand === 'all'));
      } else if (isCatBtn) {
        btn.classList.toggle('active', btn.dataset.category === currentCategory);
      } else if (isAgeGroupBtn) {
        btn.classList.toggle('active', btn.dataset.ageGroup === currentAgeGroup);
      }

      btn.addEventListener('click', () => {
        if (isBrandBtn) {
          currentBrand = btn.dataset.brand;
          document.querySelectorAll('.brand-card').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        } else if (isCatBtn) {
          currentCategory = btn.dataset.category;
          document.querySelectorAll('.filter-bar-category .filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        } else if (isAgeGroupBtn) {
          currentAgeGroup = btn.dataset.ageGroup;
          document.querySelectorAll('.filter-bar-age .filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }

        const filtered = filterProducts();
        renderProducts(filtered);

        const params = new URLSearchParams();
        if (currentBrand !== 'all') {
          const b = allBrands.find(x => x._id === currentBrand);
          params.set('brand', b ? b.code : currentBrand);
        }
        if (currentCategory !== 'all') params.set('category', currentCategory);
        if (currentAgeGroup !== 'all') params.set('ageGroup', currentAgeGroup);
        if (currentSearch)             params.set('search', currentSearch);

        window.history.pushState({}, '', params.toString()
          ? window.location.pathname + '?' + params.toString()
          : window.location.pathname);
      });
    });
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
