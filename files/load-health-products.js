/**
 * Load products cho trang Mục tiêu sức khỏe
 * Load products từ API và hiển thị vào các section
 */
(function() {
  const API = 'http://localhost:5000';
  let currentBrand = 'all';
  let allProducts = [];

  function renderProductCard(product) {
    const priceHtml = '';
    
    const badgeHtml = product.badge ? `<span class="product-badge">${product.badge}</span>` : 'https://api.vinapharmajsc.vn';
    
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.brand = product.brand;
    card.dataset.cat = product.category;
    
    card.innerHTML = `
      ${badgeHtml}
      <div class="product-img">${product.icon || '<i class="fa-solid fa-box" style="color:#9ca3af;font-size:2rem"></i>'}</div>
      <div class="product-body">
        <div class="product-brand">${product.brand}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-weight">${product.weight || ''}</div>
        <div class="product-footer">
          <div>${priceHtml}</div>
          <button class="add-btn"><i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    `;
    
    return card;
  }

  function loadAndRender() {
    const grids = document.querySelectorAll('.vitamin-cat-section .products-grid');
    
    grids.forEach(grid => {
      grid.innerHTML = '';
      
      if (allProducts.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;padding:1rem;text-align:center;color:#999;font-size:.88rem">Chưa có sản phẩm</div>';
        return;
      }
      
      // Lấy tối đa 4 sản phẩm
      const productsToShow = allProducts.slice(0, 4);
      productsToShow.forEach(product => {
        grid.appendChild(renderProductCard(product));
      });
    });
  }

  function loadBrands() {
    const filterBar = document.querySelector('.filter-bar');
    if (!filterBar) return;

    fetch(`${API}/api/brands`)
      .then(r => r.json())
      .then(json => {
        if (!json.success) return;
        const brands = json.data.filter(b => b.active);
        
        // Xóa old buttons (trừ "Tất cả")
        const oldBtns = filterBar.querySelectorAll('.filter-btn');
        oldBtns.forEach((btn, i) => {
          if (i > 0) btn.remove();
        });
        
        // Thêm brand buttons
        brands.forEach(brand => {
          const btn = document.createElement('button');
          btn.className = 'filter-btn';
          btn.dataset.brand = brand.code;
          btn.textContent = brand.code || brand.name;
          filterBar.appendChild(btn);
        });
        
        setupFilterButtons();
      })
      .catch(err => console.error('[VP] ❌ Lỗi load brands:', err.message));
  }

  function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.brand === currentBrand);
      btn.addEventListener('click', () => {
        currentBrand = btn.dataset.brand || 'all';
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadProducts();
      });
    });
  }

  async function loadProducts() {
    try {
      let url = `${API}/api/products?limit=100`;
      if (currentBrand && currentBrand !== 'all') url += `&brand=${currentBrand}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('Lỗi tải sản phẩm');
      const json = await res.json();
      
      allProducts = json.success ? json.data : [];
      loadAndRender();
    } catch (err) {
      console.error('[VP] ❌ Lỗi load products:', err.message);
    }
  }

  async function init() {
    // Lấy brand từ URL param
    const urlParams = new URLSearchParams(window.location.search);
    currentBrand = urlParams.get('brand') || 'all';
    
    loadBrands();
    await loadProducts();
    
    console.log('[VP] ✅ Đã load sản phẩm');
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
