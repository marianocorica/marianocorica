(function () {
  'use strict';

  const root = window.location.origin;
  const path = window.location.pathname;
  const inArticles = path.includes('/articulos/');
  const inBooks = path.includes('/libros/');
  const isArticlePage = inArticles && !path.endsWith('/index.html') && !path.endsWith('/articulos/');
  const isArticleIndex = inArticles && (path.endsWith('/index.html') || path.endsWith('/articulos/'));

  function addMobileMenu() {
    const header = document.querySelector('.site-header');
    const nav = document.querySelector('.main-nav');
    const right = document.querySelector('.header-right');
    if (!header || !nav || !right || right.querySelector('.menu-toggle')) return;

    if (inBooks) {
      const articleLink = document.createElement('a');
      articleLink.href = '../articulos/index.html';
      articleLink.textContent = 'Artículos';
      nav.insertBefore(articleLink, nav.querySelector('a[href*="mensajes"]') || nav.firstChild);
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

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('menu-open');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Abrir menú');
      });
    });

    right.appendChild(button);
  }

  function addShareButton() {
    if (document.querySelector('.site-share')) return;

    const button = document.createElement('button');
    button.className = 'site-share';
    button.type = 'button';
    button.setAttribute('aria-label', 'Compartir esta página');
    button.innerHTML = '<span class="share-icon" aria-hidden="true">↗</span><span>Compartir</span>';

    button.addEventListener('click', function () {
      const title = document.title.replace(/\s+—\s+Mariano A\. Corica.*$/, '');
      const data = { title: title, text: title, url: window.location.href };

      if (navigator.share) {
        navigator.share(data).catch(function () {});
        return;
      }

      showSharePanel(title, window.location.href);
    });

    document.body.appendChild(button);
  }

  function showSharePanel(title, url) {
    const old = document.querySelector('.share-panel-backdrop');
    if (old) old.remove();

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const backdrop = document.createElement('div');
    backdrop.className = 'share-panel-backdrop';
    backdrop.innerHTML = `
      <div class="share-panel" role="dialog" aria-modal="true" aria-label="Compartir">
        <button class="share-close" type="button" aria-label="Cerrar">×</button>
        <p class="share-panel-label">Compartir</p>
        <h2>${escapeHtml(title)}</h2>
        <div class="share-options">
          <a href="https://wa.me/?text=${encodedTitle}%20${encodedUrl}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}" target="_blank" rel="noopener noreferrer">X</a>
          <a href="mailto:?subject=${encodedTitle}&body=${encodedUrl}">Correo</a>
          <button type="button" class="copy-share">Copiar enlace</button>
        </div>
      </div>`;

    document.body.appendChild(backdrop);

    backdrop.addEventListener('click', function (event) {
      if (event.target === backdrop || event.target.closest('.share-close')) backdrop.remove();
    });

    const copy = backdrop.querySelector('.copy-share');
    copy.addEventListener('click', function () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () {
          copy.textContent = 'Enlace copiado';
          setTimeout(function () { copy.textContent = 'Copiar enlace'; }, 1800);
        });
      }
    });
  }

  function addArticleNavigation() {
    if (!isArticlePage || document.querySelector('.article-navigation')) return;
    const main = document.querySelector('main.article-page');
    if (!main) return;

    const nav = document.createElement('nav');
    nav.className = 'article-navigation';
    nav.setAttribute('aria-label', 'Navegación del artículo');
    nav.innerHTML = `
      <a href="index.html">← Todos los artículos</a>
      <a href="../index.html">Inicio</a>`;

    const footer = main.querySelector('.article-related, .article-more');
    if (footer) main.appendChild(nav);
    else main.appendChild(nav);
  }

  function addArticleIndexHomeLink() {
    if (!isArticleIndex || document.querySelector('.archive-navigation')) return;
    const main = document.querySelector('main.article-archive');
    if (!main) return;
    const nav = document.createElement('nav');
    nav.className = 'archive-navigation';
    nav.innerHTML = '<a href="../index.html">← Inicio</a>';
    main.appendChild(nav);
  }

  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char];
    });
  }

  addMobileMenu();
  addShareButton();
  addArticleNavigation();
  addArticleIndexHomeLink();
})();
