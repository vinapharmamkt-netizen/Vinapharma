/**
 * Vinapharma – Popup ưu đãi
 * Hiện sau 3s nếu người dùng chưa đăng nhập, 1 lần/session
 */
(function () {
  const SESSION_KEY = 'vp_popup_shown';

  function injectStyles() {
    const css = `
#vp-popup-overlay {
  position: fixed; inset: 0; z-index: 99999;
  background: rgba(0,0,0,.55);
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
  animation: vpFadeIn .35s ease;
}
@keyframes vpFadeIn { from{opacity:0} to{opacity:1} }
#vp-popup-box {
  background: #fff;
  border-radius: 1.25rem;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 680px;
  width: 100%;
  box-shadow: 0 24px 64px rgba(0,0,0,.25);
  position: relative;
  animation: vpSlideUp .4s cubic-bezier(.22,.68,0,1.2);
}
@keyframes vpSlideUp { from{transform:translateY(40px);opacity:0} to{transform:translateY(0);opacity:1} }
#vp-popup-left {
  background: linear-gradient(145deg, #c8102e 0%, #8b0000 100%);
  padding: 2rem;
  display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: .5rem;
  color: #fff; text-align: left;
}
.vp-popup-brand { font-size: 1rem; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; opacity: .85; }
.vp-popup-headline { font-size: 1.75rem; font-weight: 900; line-height: 1.25; text-align: left; width: 100%; margin: 0; }
.vp-popup-headline span { color: #ffd700; }
#vp-popup-right {
  padding: 2.5rem 2rem;
  display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 1rem;
}
.vp-popup-icon { font-size: 2.8rem; }
.vp-popup-title { font-size: 1.1rem; font-weight: 800; color: #1a1a1a; text-align: center; }
.vp-popup-sub { font-size: .82rem; color: #777; text-align: center; line-height: 1.5; }
.vp-popup-btn-register {
  width: 100%; padding: .75rem; border: none; border-radius: .6rem;
  background: #c8102e; color: #fff;
  font-size: .9rem; font-weight: 700; cursor: pointer;
  transition: background .2s, transform .15s;
  text-decoration: none; text-align: center; display: block;
}
.vp-popup-btn-register:hover { background: #a00d24; transform: translateY(-1px); }
.vp-popup-btn-login {
  width: 100%; padding: .72rem; border: 2px solid #c8102e; border-radius: .6rem;
  background: #fff; color: #c8102e;
  font-size: .9rem; font-weight: 700; cursor: pointer;
  transition: background .2s, color .2s;
  text-decoration: none; text-align: center; display: block;
}
.vp-popup-btn-login:hover { background: #fff0f2; }
.vp-popup-skip {
  font-size: .75rem; color: #bbb; cursor: pointer;
  background: none; border: none; padding: 0;
  text-decoration: underline; font-family: inherit;
}
.vp-popup-skip:hover { color: #999; }
#vp-popup-close {
  position: absolute; top: .9rem; right: 1rem;
  width: 28px; height: 28px; border-radius: 50%;
  background: rgba(0,0,0,.08); border: none; cursor: pointer;
  font-size: 1rem; display: flex; align-items: center; justify-content: center;
  color: #555; transition: background .2s;
  line-height: 1;
}
#vp-popup-close:hover { background: rgba(0,0,0,.18); }
@media(max-width: 520px) {
  #vp-popup-box { grid-template-columns: 1fr; }
  #vp-popup-left { padding: 1.8rem 1.5rem; }
  #vp-popup-right { padding: 1.8rem 1.5rem; }
  .vp-popup-headline { font-size: 1.3rem; }
}
`;
    const el = document.createElement('style');
    el.textContent = css;
    document.head.appendChild(el);
  }

  function createPopup() {
    const overlay = document.createElement('div');
    overlay.id = 'vp-popup-overlay';
    overlay.innerHTML = `
      <div id="vp-popup-box">
        <button id="vp-popup-close" aria-label="Đóng">&#x2715;</button>
        <div id="vp-popup-left">
          <div class="vp-popup-brand">Vinapharma</div>
          <div class="vp-popup-headline">Đang có<br>rất nhiều<br><span>ưu đãi</span><br>chờ bạn!</div>
        </div>
        <div id="vp-popup-right">
          <div class="vp-popup-icon"><i class="fa-solid fa-gift" style="color:#cc1f1f;font-size:2.5rem"></i></div>
          <div class="vp-popup-title">Tạo tài khoản miễn phí</div>
          <div class="vp-popup-sub">Đăng ký ngay để nhận ưu đãi<br>và theo dõi đơn hàng dễ dàng hơn.</div>
          <a href="tai-khoan.html?mode=register" class="vp-popup-btn-register">Đăng ký ngay</a>
          <a href="tai-khoan.html" class="vp-popup-btn-login">Đăng nhập</a>
          <button class="vp-popup-skip" id="vp-popup-skip-btn">Bỏ qua, tiếp tục xem</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    function closePopup() {
      overlay.style.animation = 'vpFadeIn .25s ease reverse forwards';
      setTimeout(function () { overlay.remove(); }, 250);
      sessionStorage.setItem(SESSION_KEY, '1');
    }

    document.getElementById('vp-popup-close').addEventListener('click', closePopup);
    document.getElementById('vp-popup-skip-btn').addEventListener('click', closePopup);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePopup();
    });
  }

  function tryShow() {
    if (sessionStorage.getItem(SESSION_KEY)) return; // đã hiện lần này rồi

    // Chờ authClient xong
    var authReady = window.__vpAuthReady;
    if (authReady && typeof authReady.then === 'function') {
      authReady.then(function (user) {
        if (!user) {
          setTimeout(function () {
            injectStyles();
            createPopup();
          }, 3000);
        }
      });
    } else {
      // Không có authClient → hiện luôn
      setTimeout(function () {
        injectStyles();
        createPopup();
      }, 3000);
    }
  }

  // Chạy sau khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryShow);
  } else {
    tryShow();
  }
})();
