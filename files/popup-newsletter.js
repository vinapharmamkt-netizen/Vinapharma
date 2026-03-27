/**
 * Vinapharma – Newsletter Popup
 * Hiện 10s sau khi đóng popup đăng nhập (event vp:authPopupClosed), 1 lần/session
 */
(function () {
  const SESSION_KEY = 'vp_nl_shown';
  const API = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000'
    : 'https://vinapharma-pwv2.onrender.com';

  function injectStyles() {
    if (document.getElementById('vp-nl-style')) return;
    const css = `
#vp-nl-overlay{position:fixed;inset:0;z-index:99998;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:1rem;animation:vpNlFadeIn .35s ease}
@keyframes vpNlFadeIn{from{opacity:0}to{opacity:1}}
#vp-nl-box{background:#fff;border-radius:1.25rem;max-width:400px;width:100%;padding:2.2rem 2rem 1.8rem;box-shadow:0 24px 64px rgba(0,0,0,.28);position:relative;animation:vpNlSlideUp .4s cubic-bezier(.22,.68,0,1.2);text-align:center}
@keyframes vpNlSlideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
#vp-nl-close{position:absolute;top:.8rem;right:.8rem;width:26px;height:26px;border-radius:50%;background:rgba(0,0,0,.07);border:none;cursor:pointer;font-size:.9rem;display:flex;align-items:center;justify-content:center;color:#666;transition:background .2s;line-height:1}
#vp-nl-close:hover{background:rgba(0,0,0,.16)}
.vp-nl-icon{width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#fff0f3,#ffd6de);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-size:1.5rem}
.vp-nl-title{font-size:1.1rem;font-weight:800;color:#1a1a1a;line-height:1.35;margin-bottom:.45rem}
.vp-nl-sub{font-size:.8rem;color:#777;line-height:1.55;margin-bottom:1.2rem}
.vp-nl-input{width:100%;padding:.78rem 1rem;border:1.5px solid #e0e0e0;border-radius:.65rem;font-size:.88rem;font-family:inherit;color:#1a1a1a;transition:border-color .2s;outline:none;box-sizing:border-box}
.vp-nl-input:focus{border-color:#c8102e}
.vp-nl-err{font-size:.76rem;color:#c8102e;margin:.3rem 0 0;text-align:left}
.vp-nl-btn{width:100%;padding:.82rem;margin-top:.6rem;background:linear-gradient(90deg,#c8102e,#a00d24);color:#fff;border:none;border-radius:.65rem;font-size:.9rem;font-weight:700;cursor:pointer;font-family:inherit;box-shadow:0 4px 14px rgba(200,16,46,.3);transition:opacity .2s,transform .15s}
.vp-nl-btn:hover{opacity:.9;transform:translateY(-1px)}
.vp-nl-btn:disabled{opacity:.6;cursor:not-allowed;transform:none}
.vp-nl-skip{font-size:.72rem;color:#bbb;cursor:pointer;background:none;border:none;padding:0;margin-top:.75rem;text-decoration:underline;font-family:inherit;display:block;width:100%}
.vp-nl-skip:hover{color:#999}
@media(max-width:480px){#vp-nl-box{padding:1.8rem 1.4rem 1.5rem}.vp-nl-title{font-size:1rem}}
`;
    const el = document.createElement('style');
    el.id = 'vp-nl-style';
    el.textContent = css;
    document.head.appendChild(el);
  }

  function createPopup() {
    if (document.getElementById('vp-nl-overlay')) return;
    injectStyles();

    var overlay = document.createElement('div');
    overlay.id = 'vp-nl-overlay';
    overlay.innerHTML =
      '<div id="vp-nl-box">' +
        '<button id="vp-nl-close" aria-label="Đóng">&#x2715;</button>' +
        '<div class="vp-nl-icon"><i class="fa-solid fa-bell" style="color:#c8102e"></i></div>' +
        '<div class="vp-nl-title">Bạn muốn nhận thông báo sớm?</div>' +
        '<div class="vp-nl-sub">Để lại email để nhận thông báo sớm khi có bài viết mới và chương trình khuyến mãi mới từ Vinapharma.</div>' +
        '<input class="vp-nl-input" id="vp-nl-email" type="email" placeholder="Nhập email của bạn" autocomplete="email"/>' +
        '<div class="vp-nl-err" id="vp-nl-err" style="display:none">Vui lòng nhập email hợp lệ.</div>' +
        '<button class="vp-nl-btn" id="vp-nl-submit">Đăng ký nhận thông báo</button>' +
        '<button class="vp-nl-skip" id="vp-nl-skip">Không, cảm ơn</button>' +
      '</div>';

    document.body.appendChild(overlay);
    setTimeout(function () {
      var inp = document.getElementById('vp-nl-email');
      if (inp) inp.focus();
    }, 400);

    function closePopup() {
      overlay.style.animation = 'vpNlFadeIn .25s ease reverse forwards';
      setTimeout(function () { if (overlay.parentNode) overlay.remove(); }, 250);
      sessionStorage.setItem(SESSION_KEY, '1');
    }

    document.getElementById('vp-nl-close').addEventListener('click', closePopup);
    document.getElementById('vp-nl-skip').addEventListener('click', closePopup);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePopup();
    });

    document.getElementById('vp-nl-email').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') document.getElementById('vp-nl-submit').click();
    });

    document.getElementById('vp-nl-submit').addEventListener('click', function () {
      var email = document.getElementById('vp-nl-email').value.trim();
      var errEl = document.getElementById('vp-nl-err');
      var btn   = document.getElementById('vp-nl-submit');

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errEl.style.display = 'block';
        document.getElementById('vp-nl-email').focus();
        return;
      }
      errEl.style.display = 'none';
      btn.disabled = true;
      btn.textContent = 'Đang đăng ký...';

      fetch(API + '/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, source: 'popup' })
      })
      .then(function (r) { return r.json(); })
      .then(function () {
        sessionStorage.setItem(SESSION_KEY, '1');
        var box = document.getElementById('vp-nl-box');
        box.innerHTML =
          '<div style="text-align:center;padding:.8rem 0">' +
            '<div style="font-size:2.8rem;margin-bottom:.7rem">🎉</div>' +
            '<div class="vp-nl-title" style="margin-bottom:.5rem">Đăng ký thành công!</div>' +
            '<div class="vp-nl-sub">Cảm ơn bạn! Vinapharma sẽ gửi thông báo đến email của bạn sớm nhất.</div>' +
          '</div>';
        setTimeout(closePopup, 2500);
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = 'Đăng ký nhận thông báo';
        errEl.textContent = 'Có lỗi xảy ra, vui lòng thử lại.';
        errEl.style.display = 'block';
      });
    });
  }

  var _scheduled = false;

  function scheduleShow() {
    if (_scheduled) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    _scheduled = true;
    setTimeout(createPopup, 10000);
  }

  // Hiện 10s sau khi user đóng popup đăng nhập
  document.addEventListener('vp:authPopupClosed', scheduleShow);

})();
