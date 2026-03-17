/**
 * Load products từ API
 * Hỗ trợ lọc theo brand, category, tìm kiếm
 */
(function() {
  const API = 'https://vinapharma.onrender.com';
  let allBrands = [];
  let allProducts = [];
  let currentBrand = 'all';
  let currentCategory = 'all';
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

  function renderBrandFilters(brands) {
    const filterBar = document.querySelector('.filter-bar');
    if (!filterBar) return;
    
    // Xóa old buttons (trừ "Tất cả")
    const oldBtns = filterBar.querySelectorAll('.filter-btn[data-brand]');
    oldBtns.forEach(btn => btn.remove());
    
    // Thêm brand buttons
    brands.forEach(brand => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.dataset.brand = brand.code;
      btn.dataset.type = 'brand';
      btn.textContent = brand.code || brand.name;
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

  function filterProducts() {
    let filtered = allProducts;

    if (currentBrand !== 'all') {
      filtered = filtered.filter(p => p.brand === currentBrand);
    }

    if (currentCategory !== 'all') {
      filtered = filtered.filter(p => p.category === currentCategory);
    }

    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
    }

    return filtered;
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
        
        const priceHtml = product.originalPrice && product.originalPrice > product.price
          ? `<span class="product-price-old">${(product.originalPrice || 0).toLocaleString('vi-VN')} ₫</span><span class="product-price">${(product.price || 0).toLocaleString('vi-VN')} ₫</span>`
          : `<span class="product-price">${(product.price || 0).toLocaleString('vi-VN')} ₫</span>`;
        
        const badgeHtml = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
        
        card.innerHTML = `
          ${badgeHtml}
          <div class="product-img">${product.icon || '<i class="fa-solid fa-box" style="color:#9ca3af;font-size:2rem"></i>'}</div>
          <div class="product-body">
            <div class="product-brand">${product.brand}</div>
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

    console.log('[VP] ✅ Render ' + products.length + ' sản phẩm');
  }

  async function init() {
    // Lấy filter từ URL param
    const urlParams = new URLSearchParams(window.location.search);
    currentBrand    = urlParams.get('brand')    || 'all';
    currentCategory = urlParams.get('category') || 'all';
    currentSearch   = urlParams.get('search')   || '';

    // Pre-fill search input nếu có ?search=
    if (currentSearch) {
      const inp = document.querySelector('.search-bar input');
      if (inp) inp.value = currentSearch;
    }
    
    // Load brands & products
    allBrands = await loadBrands();
    allProducts = await loadAllProducts();
    
    // Render filters
    renderBrandFilters(allBrands);
    renderCategoryFilters(allProducts);
    
    // Render products
    const filtered = filterProducts();
    renderProducts(filtered);
    
    // Setup filter buttons
    setupFilterButtons();
  }

  function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
      const isBrandBtn = btn.dataset.brand !== undefined;
      const isCatBtn = btn.dataset.category !== undefined;
      
      if (isBrandBtn) {
        btn.classList.toggle('active', btn.dataset.brand === currentBrand);
      } else if (isCatBtn) {
        btn.classList.toggle('active', btn.dataset.category === currentCategory);
      }
      
      btn.addEventListener('click', () => {
        if (isBrandBtn) {
          currentBrand = btn.dataset.brand;
          // Update active state for brand buttons
          document.querySelectorAll('.filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        } else if (isCatBtn) {
          currentCategory = btn.dataset.category;
          // Update active state for category buttons
          document.querySelectorAll('.filter-bar-category .filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
        
        // Re-render
        const filtered = filterProducts();
        renderProducts(filtered);
        
        // Update URL
        const params = new URLSearchParams();
        if (currentBrand !== 'all') params.set('brand', currentBrand);
        if (currentCategory !== 'all') params.set('category', currentCategory);
        if (currentSearch) params.set('search', currentSearch);
        
        const newUrl = params.toString() 
          ? window.location.pathname + '?' + params.toString()
          : window.location.pathname;
        window.history.pushState({}, '', newUrl);
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
