/**
 * Vinapharma – Floating Chat Widget
 * Zalo | Messenger | Hotline
 */
(function () {
  if (document.getElementById('vp-chat-widget')) return; // tránh inject 2 lần

  /* ── CSS ── */
  var css = document.createElement('style');
  css.textContent = `
    #vp-chat-widget {
      position: fixed;
      bottom: 28px;
      right: 24px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
      font-family: 'Be Vietnam Pro', sans-serif;
    }

    /* Danh sách nút con */
    .vp-chat-items {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
      pointer-events: none;
      opacity: 0;
      transform: translateY(12px) scale(.95);
      transition: opacity .25s ease, transform .25s ease;
    }
    .vp-chat-items.open {
      pointer-events: all;
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    /* Mỗi nút con */
    .vp-chat-item {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      text-decoration: none;
    }
    .vp-chat-label {
      background: #fff;
      color: #222;
      font-size: .76rem;
      font-weight: 700;
      padding: .35rem .75rem;
      border-radius: 999px;
      box-shadow: 0 2px 12px rgba(0,0,0,.15);
      white-space: nowrap;
      opacity: 0;
      transform: translateX(8px);
      transition: opacity .2s ease, transform .2s ease;
    }
    .vp-chat-items.open .vp-chat-label {
      opacity: 1;
      transform: translateX(0);
    }
    .vp-chat-items.open .vp-chat-item:nth-child(1) .vp-chat-label { transition-delay: .05s }
    .vp-chat-items.open .vp-chat-item:nth-child(2) .vp-chat-label { transition-delay: .10s }
    .vp-chat-items.open .vp-chat-item:nth-child(3) .vp-chat-label { transition-delay: .15s }

    .vp-chat-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(0,0,0,.22);
      transition: transform .18s ease, box-shadow .18s ease;
      flex-shrink: 0;
    }
    .vp-chat-item:hover .vp-chat-icon {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(0,0,0,.28);
    }
    .vp-chat-icon img { width: 28px; height: 28px; object-fit: contain; }

    /* Màu từng nút */
    .vp-icon-phone    { background: #22c55e; }
    .vp-icon-zalo     { background: #006af5; }
    .vp-icon-messenger{ background: linear-gradient(135deg,#0099ff,#a033ff); }

    /* Nút toggle chính */
    .vp-chat-toggle {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: linear-gradient(135deg, #cc1f1f, #e84646);
      box-shadow: 0 4px 20px rgba(204,31,31,.45);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      outline: none;
      transition: transform .18s ease, box-shadow .18s ease;
      position: relative;
    }
    .vp-chat-toggle:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 24px rgba(204,31,31,.55);
    }
    .vp-chat-toggle svg { transition: transform .3s ease, opacity .2s ease; }
    .vp-chat-toggle .ico-close {
      position: absolute;
      opacity: 0;
      transform: rotate(-90deg) scale(.6);
    }
    .vp-chat-toggle.open .ico-chat  { opacity: 0; transform: rotate(90deg) scale(.6); }
    .vp-chat-toggle.open .ico-close { opacity: 1; transform: rotate(0deg) scale(1); }

    /* Pulse animation khi đóng */
    @keyframes vp-pulse {
      0%   { box-shadow: 0 0 0 0 rgba(204,31,31,.5); }
      70%  { box-shadow: 0 0 0 14px rgba(204,31,31,0); }
      100% { box-shadow: 0 0 0 0 rgba(204,31,31,0); }
    }
    .vp-chat-toggle:not(.open) {
      animation: vp-pulse 2.2s ease-out infinite;
    }

    @media (max-width: 480px) {
      #vp-chat-widget { bottom: 18px; right: 14px; }
      .vp-chat-toggle { width: 52px; height: 52px; }
      .vp-chat-icon   { width: 46px; height: 46px; }
      .vp-chat-label  { font-size: .7rem; }
    }
  `;
  document.head.appendChild(css);

  /* ── HTML ── */
  var widget = document.createElement('div');
  widget.id = 'vp-chat-widget';

  widget.innerHTML = `
    <div class="vp-chat-items" id="vpChatItems">
      <!-- Hotline -->
      <a class="vp-chat-item" href="tel:0901683380" title="Gọi hotline">
        <span class="vp-chat-label"><i class="fa-solid fa-phone" style="color:#cc1f1f"></i> 090 168 33 80</span>
        <div class="vp-chat-icon vp-icon-phone">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </div>
      </a>
      <!-- Zalo -->
      <a class="vp-chat-item" href="https://zalo.me/0901683380" target="_blank" rel="noopener" title="Chat Zalo">
        <span class="vp-chat-label"><i class="fa-regular fa-comment-dots" style="color:#06b6d4"></i> Chat Zalo</span>
        <div class="vp-chat-icon vp-icon-zalo">
          <img src="LogoZalo.png" alt="Zalo"/>
        </div>
      </a>
      <!-- Messenger -->
      <a class="vp-chat-item" href="https://m.me/vinapharmastore.vn" target="_blank" rel="noopener" title="Chat Messenger">
        <span class="vp-chat-label"><i class="fa-brands fa-facebook-messenger" style="color:#0084ff"></i> Messenger</span>
        <div class="vp-chat-icon vp-icon-messenger">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
            <path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.82 1.324 5.34 3.408 7.027V22l3.27-1.799A10.73 10.73 0 0 0 12 20.518c5.523 0 10-4.145 10-9.259C22 6.145 17.523 2 12 2zm1.07 12.478l-2.549-2.717-4.976 2.717 5.478-5.815 2.614 2.717 4.912-2.717-5.48 5.815z"/>
          </svg>
        </div>
      </a>
    </div>

    <!-- Toggle button -->
    <button class="vp-chat-toggle" id="vpChatToggle" aria-label="Liên hệ hỗ trợ">
      <!-- Chat icon -->
      <svg class="ico-chat" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <!-- Close icon -->
      <svg class="ico-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  `;

  /* ── Inject vào body ── */
  function inject() {
    document.body.appendChild(widget);

    var toggle = document.getElementById('vpChatToggle');
    var items  = document.getElementById('vpChatItems');
    var isOpen = false;

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      isOpen = !isOpen;
      toggle.classList.toggle('open', isOpen);
      items.classList.toggle('open', isOpen);
    });

    // Click ngoài → đóng
    document.addEventListener('click', function () {
      if (!isOpen) return;
      isOpen = false;
      toggle.classList.remove('open');
      items.classList.remove('open');
    });
    widget.addEventListener('click', function (e) { e.stopPropagation(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
