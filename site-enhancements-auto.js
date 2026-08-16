(function () {
  'use strict';
  const path = window.location.pathname;
  const inArticles = path.includes('/articulos/');
  const inBooks = path.includes('/libros/');
  const isArticlePage = inArticles && !path.endsWith('/index.html') && !path.endsWith('/articulos/');
  const isArticleIndex = inArticles && (path.endsWith('/index.html') || path.endsWith('/articulos/'));

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = '/site-enhancements.css';
  document.head.appendChild(css);

  if (inBooks) {
    const bookStyle = document.createElement('style');
    bookStyle.textContent = '.book-page .mobile-read-button{display:inline-flex !important;width:100%;min-height:50px;height:50px;box-sizing:border-box;align-items:center;justify-content:center;padding:0 22px;border:1px solid #171716;border-radius:999px;background:#fff;color:#171716;font-family:var(--heading);font-size:.74rem;font-weight:600;letter-spacing:.01em;text-decoration:none}.book-page .mobile-read-button:hover{background:#fff;color:#171716}.book-page .whatsapp-button{display:inline-flex;width:100%;min-height:50px;height:50px;box-sizing:border-box;align-items:center;justify-content:center;padding:0 22px;border:0;border-radius:999px;background:#25D366;color:#fff;font-family:var(--heading);font-size:.74rem;font-weight:600;letter-spacing:.01em;text-decoration:none}.book-page .whatsapp-button:hover{background:#25D366;color:#fff;opacity:.88}.book-page .whatsapp-button svg{fill:#fff}.book-page .book-pdf-section{display:none !important}';
    document.head.appendChild(bookStyle);

    // ESE was uploaded with an uppercase extension; keep the reference compatible with GitHub's case-sensitive paths.
    document.querySelectorAll('.book-page-cover img').forEach(function (img) {
      if (/TAPA-ESE\.jpg$/i.test(img.getAttribute('src') || '')) {
        img.src = '../assets/img/libros/TAPA-ESE.JPG';
      }
    });
  }

  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.main-nav');
  const right = document.querySelector('.header-right');
  if (header && nav && right) {
    if (inBooks && !nav.querySelector('a[href*="articulos"]')) {
      const a = document.createElement('a');
      a.href = '../articulos/index.html';
      a.textContent = 'Artículos';
      nav.insertBefore(a, nav.querySelector('a[href*="mensajes"]') || nav.firstChild);
    }
    const button = document.createElement('button');
    button.className = 'menu-toggle';
    button.type = 'button';
    button.setAttribute('aria-label', 'Abrir menú');
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = '<span></span><span></span><span></span>';
    button.addEventListener('click', function () {
      const open = header.classList.toggle('menu-open');
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        header.classList.remove('menu-open');
        button.setAttribute('aria-expanded', 'false');
      });
    });
    right.appendChild(button);
  }

  // El nombre del autor funciona siempre como enlace de regreso al index principal.
  const siteName = document.querySelector('.site-name');
  if (siteName && !siteName.querySelector('a')) {
    const home = document.createElement('a');
    home.href = inBooks || inArticles ? '../index.html' : 'index.html';
    home.textContent = siteName.textContent;
    siteName.textContent = '';
    siteName.appendChild(home);
  }

  const share = document.createElement('button');
  share.className = 'site-share';
  share.type = 'button';
  share.innerHTML = '<span class="share-icon" aria-hidden="true">↗</span><span>Compartir</span>';
  share.setAttribute('aria-label', 'Compartir esta página');
  share.addEventListener('click', function () {
    const title = document.title.replace(/\s+—\s+Mariano A\. Corica.*$/, '');
    if (navigator.share) {
      navigator.share({ title: title, text: title, url: location.href }).catch(function () {});
      return;
    }
    const u = encodeURIComponent(location.href), t = encodeURIComponent(title);
    const backdrop = document.createElement('div');
    backdrop.className = 'share-panel-backdrop';
    backdrop.innerHTML = '<div class="share-panel" role="dialog" aria-modal="true"><button class="share-close" type="button">×</button><p class="share-panel-label">Compartir</p><h2>' + title.replace(/[&<>]/g, '') + '</h2><div class="share-options"><a target="_blank" rel="noopener noreferrer" href="https://wa.me/?text=' + t + '%20' + u + '">WhatsApp</a><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=' + u + '">Facebook</a><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/intent/tweet?text=' + t + '&url=' + u + '">X</a><a href="mailto:?subject=' + t + '&body=' + u + '">Correo</a><button class="copy-share" type="button">Copiar enlace</button></div></div>';
    document.body.appendChild(backdrop);
    backdrop.addEventListener('click', function (e) { if (e.target === backdrop || e.target.closest('.share-close')) backdrop.remove(); });
    backdrop.querySelector('.copy-share').addEventListener('click', function () {
      const b = this;
      if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(function () { b.textContent = 'Enlace copiado'; });
    });
  });
  document.body.appendChild(share);

  if (isArticlePage) {
    const main = document.querySelector('main.article-page');
    if (main) {
      const n = document.createElement('nav');
      n.className = 'article-navigation';
      n.innerHTML = '<a href="index.html">← Todos los artículos</a><a href="../index.html">Inicio</a>';
      main.appendChild(n);
    }
  }

  if (isArticleIndex) {
    const main = document.querySelector('main.article-archive');
    if (main) {
      const n = document.createElement('nav');
      n.className = 'archive-navigation';
      n.innerHTML = '<a href="../index.html">← Inicio</a>';
      main.appendChild(n);
    }
  }
})();
