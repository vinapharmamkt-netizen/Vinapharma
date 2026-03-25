/**
 * Vinapharma Header - Account Menu
 * Dùng AuthClient để quản lý session
 */
(function() {
  // Inject CSS một lần
  if (!document.getElementById('vp-acc-style')) {
    var s = document.createElement('style');
    s.id  = 'vp-acc-style';
    s.textContent = `
      .acc-drop{position:absolute;top:calc(100% + 8px);right:0;min-width:220px;background:#fff;border-radius:10px;box-shadow:0 8px 32px rgba(0,0,0,.15);border:1px solid #f0f0f0;z-index:99999;display:none;overflow:hidden}
      .acc-drop.open{display:block}
      .acc-top{padding:14px 16px;background:#fafafa;border-bottom:1px solid #f0f0f0}
      .acc-top-name{font-weight:800;font-size:.9rem;color:#111;margin-bottom:2px}
      .acc-top-email{font-size:.75rem;color:#888;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:190px}
      .acc-item{display:flex;align-items:center;gap:10px;padding:11px 16px;font-size:.85rem;color:#333;text-decoration:none;cursor:pointer;transition:.15s;border:none;background:none;width:100%;font-family:inherit;font-weight:500}
      .acc-item:hover{background:#fff5f5;color:#cc1f1f}
      .acc-item.danger{color:#dc2626}.acc-item.danger:hover{background:#fef2f2}
      .acc-sep{height:1px;background:#f0f0f0;margin:4px 0}
      .acc-avatar{width:28px;height:28px;border-radius:50%;background:#cc1f1f;color:#fff;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:800;flex-shrink:0;overflow:hidden}
      .acc-avatar img{width:100%;height:100%;object-fit:cover}
      .acc-points{display:flex;align-items:center;justify-content:space-between;padding:8px 16px;background:#fff8f0;border-bottom:1px solid #f0f0f0;font-size:.75rem}
      .acc-points-label{color:#888}
      .acc-points-val{font-weight:800;color:#cc1f1f}
    `;
    document.head.appendChild(s);
  }

  function buildMenu(user) {
    var btn = document.querySelector('.header-actions .icon-btn');
    if (!btn) return;

    var initial = (user.name || 'U')[0].toUpperCase();
    var avatarHtml = user.avatar
      ? '<img src="' + user.avatar + '" alt="avatar"/>'
      : initial;

    btn.style.position = 'relative';
    btn.innerHTML = `
      <div class="acc-avatar" title="${user.name}">${avatarHtml}</div>
      <span style="font-size:.75rem;font-weight:700;max-width:70px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${user.name.split(' ').pop()}</span>
      <div class="acc-drop" id="accDrop">
        <div class="acc-top">
          <div class="acc-top-name">${user.name}</div>
          <div class="acc-top-email">${user.email || user.phone || ''}</div>
        </div>
        <div class="acc-points">
          <span class="acc-points-label"><i class="fa-solid fa-gift" style="color:#cc1f1f;margin-right:.25rem"></i> Điểm thưởng</span>
          <span class="acc-points-val" id="accPointsVal">${(user.points || 0).toLocaleString('vi-VN')} điểm</span>
        </div>
        <a class="acc-item" href="thong-tin-tai-khoan.html"><i class="fa-solid fa-user" style="color:#6b7280;margin-right:.25rem"></i> Thông tin tài khoản</a>
        <a class="acc-item" href="doi-diem.html"><i class="fa-solid fa-gift" style="color:#cc1f1f;margin-right:.25rem"></i> Đổi điểm thưởng</a>
        ${user.role === 'admin' ? '<a class="acc-item" href="data-admin.html"><i class="fa-solid fa-gear" style="color:#6b7280;margin-right:.25rem"></i> Quản trị Admin</a><div class="acc-sep"></div>' : '<div class="acc-sep"></div>'}
        <button class="acc-item danger" onclick="AuthClient.logout()"><i class="fa-solid fa-right-from-bracket" style="color:#dc2626;margin-right:.25rem"></i> Đăng xuất</button>
      </div>`;

    // Toggle dropdown
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      document.getElementById('accDrop').classList.toggle('open');
    });
    document.addEventListener('click', function() {
      var d = document.getElementById('accDrop');
      if (d) d.classList.remove('open');
    });
  }

  function buildGuest() {
    var btn = document.querySelector('.header-actions .icon-btn');
    if (!btn) return;
    btn.style.position = 'relative';
    btn.innerHTML = `
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span style="font-size:.72rem;font-weight:700;letter-spacing:.03em">TÀI KHOẢN</span>
      <div class="acc-drop" id="accDrop">
        <a class="acc-item" href="tai-khoan.html"><i class="fa-solid fa-key" style="color:#6b7280;margin-right:.25rem"></i> Đăng nhập</a>
        <a class="acc-item" href="tai-khoan.html" onclick="localStorage.setItem('vp_tab','register')"><i class="fa-solid fa-pen-to-square" style="color:#6b7280;margin-right:.25rem"></i> Đăng ký</a>
      </div>`;
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      document.getElementById('accDrop').classList.toggle('open');
    });
    document.addEventListener('click', function() {
      var d = document.getElementById('accDrop');
      if (d) d.classList.remove('open');
    });
  }

  function init() {
    // Chờ AuthClient sẵn sàng
    var ready = window.__vpAuthReady || Promise.resolve(null);
    ready.then(function(user) {
      if (user) {
        buildMenu(user);
        console.log('[VP] Đã đăng nhập:', user.name);
      } else {
        buildGuest();
        console.log('[VP] Chưa đăng nhập');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ── Footer accordion on mobile ─────────────────────────────────────────────
(function(){
  function initFooterAccordion() {
    if (window.innerWidth > 768) return;
    document.querySelectorAll('.footer-col h4').forEach(function(h4) {
      var col = h4.closest('.footer-col');
      if (!col || col.classList.contains('footer-newsletter')) return;
      h4.addEventListener('click', function() {
        col.classList.toggle('mob-open');
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooterAccordion);
  } else {
    initFooterAccordion();
  }
})();
