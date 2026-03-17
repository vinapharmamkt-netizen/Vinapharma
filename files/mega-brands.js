/**
 * Vinapharma - Load Brands & Featured Products từ API
 * Tự động render vào mega menu
 */
(function() {
  const API = 'http://localhost:5000';

  async function loadBrands() {
    try {
      const res = await fetch(`${API}/api/brands`);
      if (!res.ok) throw new Error('Lỗi tải thương hiệu');
      
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      
      const brands = json.data.filter(b => b.active);
      
      // Tìm tất cả mega-brand-list
      const brandLists = document.querySelectorAll('.mega-brand-list');
      
      brandLists.forEach(list => {
        // Xóa tất cả items cũ
        list.querySelectorAll('li').forEach(li => li.remove());
        
        // Thêm item "Tất cả"
        const allLi = document.createElement('li');
        allLi.innerHTML = '<a href="san-pham.html?brand=all">Tất cả thương hiệu</a>';
        list.appendChild(allLi);
        
        // Thêm brands từ API
        brands.forEach(brand => {
          const li = document.createElement('li');

          li.innerHTML = `
            <a href="san-pham.html?brand=${brand.code}">
              <span>
                <span class="brand-name">${brand.code} – ${brand.name}</span>
                <br/>
                <span class="brand-sub">${brand.description || ''}</span>
              </span>
            </a>
          `;

          list.appendChild(li);
        });
      });
      
      console.log('[VP] ✅ Đã load ' + brands.length + ' thương hiệu');
    } catch (err) {
      console.error('[VP] ❌ Lỗi load brands:', err.message);
    }
  }

  async function loadFeaturedProducts() {
    try {
      const res = await fetch(`${API}/api/products?featured=true&limit=4`);
      if (!res.ok) throw new Error('Lỗi tải sản phẩm');
      
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      
      const products = json.data;
      
      // Tìm tất cả mega-products-grid
      const grids = document.querySelectorAll('.mega-products-grid');
      
      grids.forEach(grid => {
        grid.innerHTML = ''; // Xóa cũ
        
        products.forEach(product => {
          const link = document.createElement('a');
          link.className = 'mega-product-card';
          link.href = 'san-pham-chi-tiet.html?id=' + product._id;
          
          link.innerHTML = `
            <div class="mpc-icon">${product.icon || ''}</div>
            <div class="mpc-name">${product.name}</div>
            <div class="mpc-price">${(product.price || 0).toLocaleString('vi-VN')} ₫</div>
          `;
          
          grid.appendChild(link);
        });
      });
      
      console.log('[VP] ✅ Đã load ' + products.length + ' sản phẩm nổi bật');
    } catch (err) {
      console.error('[VP] ❌ Lỗi load sản phẩm nổi bật:', err.message);
    }
  }

  // Map emoji cho brand codes
  function getEmojiForBrand(code) {
    const map = {
      'TH1': '🌿',
      'TH2': '🌾',
      'TH3': '💊',
      'TH4': '🫧',
      'TH5': '⭐'
    };
    return map[code] || '📦';
  }

  // Wait for DOM ready
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        loadBrands();
        loadFeaturedProducts();
      });
    } else {
      loadBrands();
      loadFeaturedProducts();
    }
  }

  init();
})();
