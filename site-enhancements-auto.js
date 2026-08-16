(function () {
  'use strict';
  const path = window.location.pathname;
  const inArticles = path.includes('/articulos/');
  const inBooks = path.includes('/libros/');
  const isArticlePage = inArticles && !path.endsWith('/index.html') && !path.endsWith('/articulos/');
  const isArticleIndex = inArticles && (path.endsWith('/index.html') || path.endsWith('/articulos/'));

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = '/site-enhancements.css?v=20260816';
  document.head.appendChild(css);

  if (inBooks) {
    const bookStyle = document.createElement('style');
    bookStyle.textContent = '.book-page .mobile-read-button{display:inline-flex !important;width:100%;min-height:50px;height:50px;box-sizing:border-box;align-items:center;justify-content:center;padding:0 22px;border:1px solid #171716;border-radius:999px;background:#fff;color:#171716;font-family:var(--heading);font-size:.74rem;font-weight:600;letter-spacing:.01em;text-decoration:none}.book-page .mobile-read-button:hover{background:#fff;color:#171716}.book-page .whatsapp-button{display:inline-flex;width:100%;min-height:50px;height:50px;box-sizing:border-box;align-items:center;justify-content:center;padding:0 22px;border:0;border-radius:999px;background:#25D366;color:#fff;font-family:var(--heading);font-size:.74rem;font-weight:600;letter-spacing:.01em;text-decoration:none}.book-page .whatsapp-button:hover{background:#25D366;color:#fff;opacity:.88}.book-page .whatsapp-button svg{fill:#fff}.book-page .book-pdf-section{display:none !important}';
    document.head.appendChild(bookStyle);
    document.querySelectorAll('.book-page-cover img').forEach(function (img) {
      if (/TAPA-ESE\.jpg$/i.test(img.getAttribute('src') || '')) img.src = '../assets/img/libros/TAPA-ESE.JPG';
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
  share.setAttribute('aria-label', 'Copiar enlace de esta página');
  share.addEventListener('click', function () {
    const title = document.title.replace(/\s+—\s+Mariano A\. Corica.*$/, '');
    const url = location.href;
    const showCopied = function () {
      const old = document.querySelector('.copy-feedback');
      if (old) old.remove();
      const feedback = document.createElement('div');
      feedback.className = 'copy-feedback';
      feedback.textContent = 'Enlace copiado';
      document.body.appendChild(feedback);
      window.setTimeout(function () { feedback.remove(); }, 2200);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(showCopied).catch(function () { fallbackCopy(url); });
    } else {
      fallbackCopy(url);
    }
    function fallbackCopy(text) {
      const input = document.createElement('textarea');
      input.value = text;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      try { document.execCommand('copy'); showCopied(); } catch (e) {}
      input.remove();
    }
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
