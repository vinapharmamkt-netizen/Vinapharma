/**
 * Vinapharma – Popup ưu đãi
 * Hiện sau 10s nếu người dùng chưa đăng nhập, 1 lần/session
 */
(function () {
  const SESSION_KEY = 'vp_popup_shown';

  function injectStyles() {
    const css = `
#vp-popup-overlay {
  position: fixed; inset: 0; z-index: 99999;
  background: rgba(0,0,0,.6);
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
  max-width: 700px;
  width: 100%;
  box-shadow: 0 24px 64px rgba(0,0,0,.3);
  position: relative;
  animation: vpSlideUp .4s cubic-bezier(.22,.68,0,1.2);
}
@keyframes vpSlideUp { from{transform:translateY(40px);opacity:0} to{transform:translateY(0);opacity:1} }

/* LEFT */
#vp-popup-left {
  background: linear-gradient(155deg, #d4102e 0%, #7a0000 100%);
  padding: 2.2rem 1.8rem 2rem;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: .6rem;
  color: #fff; text-align: center; position: relative; overflow: hidden;
}
#vp-popup-left::before {
  content: '';
  position: absolute; top: -40px; right: -40px;
  width: 140px; height: 140px; border-radius: 50%;
  background: rgba(255,255,255,.06);
}
#vp-popup-left::after {
  content: '';
  position: absolute; bottom: -30px; left: -30px;
  width: 100px; height: 100px; border-radius: 50%;
  background: rgba(255,255,255,.05);
}
.vp-popup-brand {
  font-size: .72rem; font-weight: 800; letter-spacing: .22em;
  text-transform: uppercase; opacity: .7; margin-bottom: .2rem;
}
.vp-popup-tagline {
  font-size: 1rem; font-weight: 700; line-height: 1.3; opacity: .92;
}
.vp-popup-tagline span { color: #ffd700; }

/* Countdown */
.vp-countdown-label {
  font-size: .62rem; font-weight: 700; letter-spacing: .18em;
  text-transform: uppercase; opacity: .65; margin-top: .8rem;
}
.vp-countdown-wrap {
  display: flex; align-items: flex-end; gap: .25rem; justify-content: center;
  margin: .1rem 0 .3rem;
}
.vp-countdown-unit {
  display: flex; flex-direction: column; align-items: center; gap: .1rem;
}
.vp-countdown-num {
  font-size: 2.6rem; font-weight: 900; line-height: 1;
  font-variant-numeric: tabular-nums;
  background: rgba(255,255,255,.13);
  border: 1px solid rgba(255,255,255,.2);
  border-radius: .45rem;
  padding: .2rem .5rem;
  min-width: 3rem; text-align: center;
  letter-spacing: .04em;
  text-shadow: 0 2px 8px rgba(0,0,0,.25);
}
.vp-countdown-sep {
  font-size: 2.2rem; font-weight: 900; opacity: .5;
  margin-bottom: .35rem; line-height: 1;
}
.vp-countdown-unit-label {
  font-size: .55rem; font-weight: 700; letter-spacing: .12em;
  text-transform: uppercase; opacity: .6;
}
.vp-popup-expire-note {
  font-size: .72rem; opacity: .65; line-height: 1.4;
}

/* RIGHT */
#vp-popup-right {
  padding: 2rem 1.8rem;
  display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: .8rem;
}
.vp-popup-icon { font-size: 2rem; }
.vp-popup-title {
  font-size: 1.1rem; font-weight: 800; color: #1a1a1a; line-height: 1.3;
}
.vp-popup-perks {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: .5rem; width: 100%;
}
.vp-popup-perks li {
  display: flex; align-items: flex-start; gap: .55rem;
  font-size: .8rem; color: #444; line-height: 1.4;
}
.vp-popup-perks li i {
  color: #c8102e; margin-top: .1rem; flex-shrink: 0; font-size: .85rem;
}
.vp-popup-btn-register {
  width: 100%; padding: .8rem; border: none; border-radius: .6rem;
  background: linear-gradient(90deg,#c8102e,#a00d24);
  color: #fff; font-size: .9rem; font-weight: 700; cursor: pointer;
  transition: opacity .2s, transform .15s;
  text-decoration: none; text-align: center; display: block;
  box-shadow: 0 4px 14px rgba(200,16,46,.35);
  margin-top: .2rem;
}
.vp-popup-btn-register:hover { opacity: .9; transform: translateY(-1px); }
.vp-popup-btn-login {
  width: 100%; padding: .72rem; border: 2px solid #e0e0e0; border-radius: .6rem;
  background: #fff; color: #555;
  font-size: .85rem; font-weight: 600; cursor: pointer;
  transition: border-color .2s, color .2s;
  text-decoration: none; text-align: center; display: block;
}
.vp-popup-btn-login:hover { border-color: #c8102e; color: #c8102e; }
.vp-popup-skip {
  font-size: .72rem; color: #bbb; cursor: pointer;
  background: none; border: none; padding: 0;
  text-decoration: underline; font-family: inherit;
  display: block; text-align: center; width: 100%;
}
.vp-popup-skip:hover { color: #999; }
#vp-popup-close {
  position: absolute; top: .8rem; right: .8rem;
  width: 26px; height: 26px; border-radius: 50%;
  background: rgba(0,0,0,.07); border: none; cursor: pointer;
  font-size: .9rem; display: flex; align-items: center; justify-content: center;
  color: #666; transition: background .2s; z-index: 2; line-height: 1;
}
#vp-popup-close:hover { background: rgba(0,0,0,.16); }
@media(max-width: 540px) {
  #vp-popup-box { grid-template-columns: 1fr; }
  #vp-popup-left { padding: 1.6rem 1.5rem; }
  #vp-popup-right { padding: 1.6rem 1.5rem; }
  .vp-countdown-num { font-size: 2rem; min-width: 2.4rem; }
}
`;
    const el = document.createElement('style');
    el.textContent = css;
    document.head.appendChild(el);
  }

  /* Tính số giây còn lại đến hết ngày hôm nay (midnight) */
  function secondsUntilMidnight() {
    var now = new Date();
    var midnight = new Date(now);
    midnight.setHours(23, 59, 59, 0);
    return Math.max(0, Math.floor((midnight - now) / 1000));
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function createPopup() {
    var overlay = document.createElement('div');
    overlay.id = 'vp-popup-overlay';
    overlay.innerHTML = `
      <div id="vp-popup-box">
        <button id="vp-popup-close" aria-label="Đóng">&#x2715;</button>

        <!-- LEFT: đếm ngược + headline -->
        <div id="vp-popup-left">
          <div class="vp-popup-brand">Vinapharma</div>
          <div class="vp-popup-tagline">Ưu đãi độc quyền<br>chỉ dành cho<br><span>thành viên</span></div>
          <div class="vp-countdown-label">Ưu đãi kết thúc sau</div>
          <div class="vp-countdown-wrap">
            <div class="vp-countdown-unit">
              <div class="vp-countdown-num" id="vpc-h">00</div>
              <div class="vp-countdown-unit-label">giờ</div>
            </div>
            <div class="vp-countdown-sep">:</div>
            <div class="vp-countdown-unit">
              <div class="vp-countdown-num" id="vpc-m">00</div>
              <div class="vp-countdown-unit-label">phút</div>
            </div>
            <div class="vp-countdown-sep">:</div>
            <div class="vp-countdown-unit">
              <div class="vp-countdown-num" id="vpc-s">00</div>
              <div class="vp-countdown-unit-label">giây</div>
            </div>
          </div>
          <div class="vp-popup-expire-note">Đặt hàng hôm nay,<br>nhận ưu đãi thành viên ngay.</div>
        </div>

        <!-- RIGHT: benefits + CTA -->
        <div id="vp-popup-right">
          <div class="vp-popup-icon"><i class="fa-solid fa-gift" style="color:#c8102e"></i></div>
          <div class="vp-popup-title">Tạo tài khoản miễn phí &amp; nhận ngay quyền lợi</div>
          <ul class="vp-popup-perks">
            <li><i class="fa-solid fa-tag"></i> <span>Giá thành viên ưu đãi hơn – tiết kiệm mỗi đơn hàng</span></li>
<li><i class="fa-solid fa-bell"></i> <span>Nhận thông báo flash sale &amp; khuyến mãi trước ai hết</span></li>
            <li><i class="fa-solid fa-rotate-left"></i> <span>Đổi trả 14 ngày nếu lý do từ nhà sản xuất – không lo rủi ro</span></li>
          </ul>
          <a href="tai-khoan.html?mode=register" class="vp-popup-btn-register">Đăng ký ngay – miễn phí</a>
          <a href="tai-khoan.html" class="vp-popup-btn-login">Đã có tài khoản? Đăng nhập</a>
          <button class="vp-popup-skip" id="vp-popup-skip-btn">Bỏ qua, tôi không cần ưu đãi</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    /* Chạy đồng hồ đếm ngược */
    var remaining = secondsUntilMidnight();
    var elH = document.getElementById('vpc-h');
    var elM = document.getElementById('vpc-m');
    var elS = document.getElementById('vpc-s');

    function tick() {
      if (remaining <= 0) { remaining = 0; }
      var h = Math.floor(remaining / 3600);
      var m = Math.floor((remaining % 3600) / 60);
      var s = remaining % 60;
      elH.textContent = pad(h);
      elM.textContent = pad(m);
      elS.textContent = pad(s);
      if (remaining > 0) { remaining--; }
    }
    tick();
    var timer = setInterval(tick, 1000);

    function closePopup() {
      clearInterval(timer);
      overlay.style.animation = 'vpFadeIn .25s ease reverse forwards';
      setTimeout(function () { overlay.remove(); }, 250);
      sessionStorage.setItem(SESSION_KEY, '1');
      document.dispatchEvent(new CustomEvent('vp:authPopupClosed'));
    }

    document.getElementById('vp-popup-close').addEventListener('click', closePopup);
    document.getElementById('vp-popup-skip-btn').addEventListener('click', closePopup);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePopup();
    });
  }

  function tryShow() {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    // Kiểm tra nhanh từ storage – không đợi backend
    var saved;
    try {
      var raw = sessionStorage.getItem('vp_access') || localStorage.getItem('vp_access');
      if (raw) saved = JSON.parse(raw);
    } catch(e) {}
    if (saved && saved.user) return; // Đã đăng nhập → không hiện popup

    setTimeout(function () {
      injectStyles();
      createPopup();
    }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryShow);
  } else {
    tryShow();
  }
})();
