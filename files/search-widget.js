/**
 * search-widget.js — Vinapharma global search
 * Tìm kiếm realtime sản phẩm + bài viết, hiển thị dropdown gợi ý.
 * Nhúng vào bất kỳ trang nào có .search-bar > input
 */
(function () {
  const API = 'https://vinapharma-pwv2.onrender.com';

  function init() {
    const bar = document.querySelector('.search-bar');
    if (!bar) return;
    const input = bar.querySelector('input');
    const btn   = bar.querySelector('button');
    if (!input) return;

    // Wrap .search-bar trong container relative để dropdown định vị đúng
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative;flex:1;max-width:inherit;display:contents';
    bar.parentNode.insertBefore(wrap, bar);
    wrap.appendChild(bar);
    bar.style.position = 'relative';

    // Tạo dropdown
    const dropdown = document.createElement('div');
    dropdown.id = 'searchDropdown';
    dropdown.style.cssText = [
      'position:absolute',
      'top:calc(100% + 6px)',
      'left:0',
      'right:0',
      'background:#fff',
      'border:1.5px solid #e8e8e8',
      'border-radius:.8rem',
      'box-shadow:0 8px 32px rgba(0,0,0,.12)',
      'z-index:9999',
      'max-height:420px',
      'overflow-y:auto',
      'display:none',
      'font-family:inherit',
    ].join(';');
    bar.appendChild(dropdown);

    let debounceTimer = null;

    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      const q = input.value.trim();
      if (!q) { hideDropdown(); return; }
      debounceTimer = setTimeout(() => doSearch(q), 280);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const q = input.value.trim();
        if (q) navigateToResults(q);
      }
      if (e.key === 'Escape') hideDropdown();
    });

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const q = input.value.trim();
        if (q) navigateToResults(q);
      });
    }

    document.addEventListener('click', (e) => {
      if (!bar.contains(e.target)) hideDropdown();
    });

    function navigateToResults(q) {
      hideDropdown();
      window.location.href = 'tim-kiem.html?q=' + encodeURIComponent(q);
    }

    async function doSearch(q) {
      dropdown.innerHTML = '<div style="padding:1rem;text-align:center;color:#aaa;font-size:.82rem"><i class="fa-solid fa-spinner fa-spin" style="color:#cc1f1f"></i> Đang tìm...</div>';
      showDropdown();

      try {
        const [pRes, aRes] = await Promise.all([
          fetch(`${API}/api/products?search=${encodeURIComponent(q)}&limit=5`),
          fetch(`${API}/api/posts?search=${encodeURIComponent(q)}&limit=4`),
        ]);
        const [pData, aData] = await Promise.all([pRes.json(), aRes.json()]);

        const products = pData.success ? (pData.data || []) : [];
        const posts    = aData.success ? (aData.data || []) : [];

        if (!products.length && !posts.length) {
          dropdown.innerHTML = `<div style="padding:1.2rem;text-align:center;color:#aaa;font-size:.83rem"><i class="fa-solid fa-circle-xmark" style="color:#d1d5db"></i> Không tìm thấy kết quả cho "<b>${escHtml(q)}</b>"</div>`;
          return;
        }

        let html = '';

        if (products.length) {
          html += `<div style="padding:.55rem 1rem .3rem;font-size:.68rem;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid #f3f4f6"><i class="fa-solid fa-box" style="color:#cc1f1f;margin-right:.3rem"></i>Sản phẩm</div>`;
          products.forEach(p => {
            const img = p.image
              ? `<img src="${API + p.image}" style="width:38px;height:38px;object-fit:cover;border-radius:.4rem;flex-shrink:0" />`
              : `<div style="width:38px;height:38px;border-radius:.4rem;background:#f5f5f5;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-box" style="color:#d1d5db"></i></div>`;
            const price = p.price ? p.price.toLocaleString('vi-VN') + ' ₫' : '';
            html += `<a href="san-pham-chi-tiet.html?id=${p._id}" class="sr-item" style="display:flex;align-items:center;gap:.75rem;padding:.65rem 1rem;text-decoration:none;color:inherit;transition:background .15s" onmouseover="this.style.background='#fff5f5'" onmouseout="this.style.background=''">
              ${img}
              <div style="min-width:0">
                <div style="font-size:.84rem;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escHtml(p.name)}</div>
                ${price ? `<div style="font-size:.75rem;color:#cc1f1f;font-weight:700;margin-top:.1rem">${price}</div>` : ''}
              </div>
            </a>`;
          });
        }

        if (posts.length) {
          html += `<div style="padding:.55rem 1rem .3rem;font-size:.68rem;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:.06em;border-top:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6"><i class="fa-regular fa-newspaper" style="color:#6b7280;margin-right:.3rem"></i>Bài viết</div>`;
          posts.forEach(a => {
            const img = a.image
              ? `<img src="${API + a.image}" style="width:38px;height:38px;object-fit:cover;border-radius:.4rem;flex-shrink:0" />`
              : `<div style="width:38px;height:38px;border-radius:.4rem;background:#f5f5f5;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-regular fa-newspaper" style="color:#d1d5db"></i></div>`;
            html += `<a href="tin-tuc-chi-tiet.html?id=${a._id}" class="sr-item" style="display:flex;align-items:center;gap:.75rem;padding:.65rem 1rem;text-decoration:none;color:inherit;transition:background .15s" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background=''">
              ${img}
              <div style="font-size:.84rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escHtml(a.title)}</div>
            </a>`;
          });
        }

        // Footer "Xem tất cả"
        html += `<div style="border-top:1px solid #f3f4f6;padding:.6rem 1rem">
          <a href="tim-kiem.html?q=${encodeURIComponent(q)}" style="display:block;text-align:center;font-size:.78rem;font-weight:700;color:#cc1f1f;text-decoration:none;padding:.25rem 0">
            <i class="fa-solid fa-magnifying-glass" style="margin-right:.3rem"></i>Xem tất cả kết quả cho "${escHtml(q)}"
          </a>
        </div>`;

        dropdown.innerHTML = html;
      } catch (e) {
        dropdown.innerHTML = '<div style="padding:1rem;text-align:center;color:#aaa;font-size:.82rem"><i class="fa-solid fa-triangle-exclamation" style="color:#d97706"></i> Lỗi kết nối</div>';
      }
    }

    function showDropdown() { dropdown.style.display = 'block'; }
    function hideDropdown() { dropdown.style.display = 'none'; }

    function escHtml(s) {
      return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
