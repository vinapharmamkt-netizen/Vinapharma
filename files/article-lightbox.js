(function(){
  if (window.ArticleLightbox) return;

  var overlay = null;
  var lightboxImg = null;
  var styleInjected = false;

  function ensureStyle() {
    if (styleInjected) return;
    styleInjected = true;
    var style = document.createElement('style');
    style.textContent = [
      '.vp-lightbox-root img{cursor:zoom-in;}',
      '#vpArticleLightbox{display:none;position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:9999;align-items:center;justify-content:center;padding:2rem;cursor:zoom-out;}',
      '#vpArticleLightbox.show{display:flex;}',
      '#vpArticleLightbox img{max-width:92vw;max-height:90vh;border-radius:.6rem;box-shadow:0 8px 48px rgba(0,0,0,.6);cursor:default;user-select:none;}',
      '#vpArticleLightbox .vp-lb-close{position:absolute;top:1rem;right:1.2rem;color:#fff;font-size:2.2rem;line-height:1;background:none;border:none;cursor:pointer;opacity:.85;font-family:inherit;}',
      '#vpArticleLightbox .vp-lb-close:hover{opacity:1;}'
    ].join('');
    document.head.appendChild(style);
  }

  function ensureOverlay() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.id = 'vpArticleLightbox';
    overlay.innerHTML = '<button class="vp-lb-close" type="button" aria-label="Đóng">×</button><img src="" alt="">';
    document.body.appendChild(overlay);
    lightboxImg = overlay.querySelector('img');

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) close();
    });

    overlay.querySelector('.vp-lb-close').addEventListener('click', function(e) {
      e.stopPropagation();
      close();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') close();
    });
  }

  function open(src, alt) {
    if (!src) return;
    ensureStyle();
    ensureOverlay();
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('show');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  function attach(root) {
    if (!root || root.dataset.vpLightboxBound === '1') return;
    ensureStyle();
    ensureOverlay();
    root.classList.add('vp-lightbox-root');
    root.dataset.vpLightboxBound = '1';
    root.addEventListener('click', function(e) {
      var img = e.target.closest('img');
      if (!img || !root.contains(img)) return;
      open(img.currentSrc || img.src, img.alt);
    });
  }

  window.ArticleLightbox = {
    attach: attach,
    open: open,
    close: close
  };
})();
