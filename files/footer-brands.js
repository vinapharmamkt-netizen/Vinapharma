/**
 * footer-brands.js — Load danh sách thương hiệu vào footer động
 * Yêu cầu: footer phải có <ul id="footerBrandLinks">
 */
(function () {
  const API = 'https://vinapharma.onrender.com';

  async function loadFooterBrands() {
    const ul = document.getElementById('footerBrandLinks');
    if (!ul) return;
    try {
      const res  = await fetch(API + '/api/brands');
      const data = await res.json();
      if (!data.success) return;
      const brands = data.data.filter(b => b.active !== false);

      // Tìm vị trí trước link "Khuyến mãi" để chèn vào đúng chỗ
      const promoLi = Array.from(ul.querySelectorAll('li a'))
        .find(a => a.href.includes('khuyen-mai'))?.parentElement || null;

      brands.forEach(b => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="san-pham.html?brand=${encodeURIComponent(b.code)}">${b.name}</a>`;
        ul.insertBefore(li, promoLi); // chèn trước Khuyến mãi (null = append)
      });
    } catch (e) { /* server offline — giữ nguyên */ }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooterBrands);
  } else {
    loadFooterBrands();
  }
})();
