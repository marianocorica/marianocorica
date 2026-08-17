(function () {
  'use strict';

  /* Favicon */
  if (!document.querySelector('link[rel="icon"]')) {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = '/assets/img/lychnos-fav.png';
    document.head.appendChild(favicon);
  }

  /* Google Analytics 4 */
  if (!window.__marianoAnalyticsLoaded) {
    window.__marianoAnalyticsLoaded = true;
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-CQP72ZQY90';
    document.head.appendChild(gaScript);
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-CQP72ZQY90');
  }

  const path = window.location.pathname;
  const inArticles = path.includes('/articulos/');
  const inBooks = path.includes('/libros/');
  const isArticlePage = inArticles && !path.endsWith('/index.html') && !path.endsWith('/articulos/');
  const isArticleIndex = inArticles && (path.endsWith('/index.html') || path.endsWith('/articulos/'));
  const siteRoot = inBooks || inArticles ? '../' : '';

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = '/site-enhancements.css?v=20260816-4';
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
    nav.innerHTML = '';
    const links = [
      { text: 'Libros', href: siteRoot + 'index.html#libros' },
      { text: 'Artículos', href: siteRoot + 'articulos/index.html' },
      { text: 'Mensajes y Entrevistas', href: siteRoot + 'index.html#mensajes-entrevistas' },
      { text: 'Sobre mí', href: siteRoot + 'index.html#sobre-mi' }
    ];
    links.forEach(function (item) {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.text;
      nav.appendChild(a);
    });
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

  const social = document.querySelector('.header-social');
  if (social) {
    const instagram = social.querySelector('a[aria-label="Instagram"]');
    if (instagram) instagram.href = 'https://www.instagram.com/mariano.corica';
  }
  if (social && !social.querySelector('[aria-label="Spotify"]')) {
    const spotify = document.createElement('a');
    spotify.href = 'https://open.spotify.com/show/7h5yEgRlS5BxgOCV3GCgSJ?si=ca284fc50b2b42bf&nd=1&dlsi=a742d514566a41ce';
    spotify.target = '_blank';
    spotify.rel = 'noopener noreferrer';
    spotify.setAttribute('aria-label', 'Spotify');
    spotify.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.4 12.9a.8.8 0 0 1-1.1.2c-2.9-1.8-6.5-2.2-10.8-1.2a.8.8 0 1 1-.4-1.6c4.7-1.1 8.7-1.3 11.9 1.3.4.3.5.8.5 1.3zm1.4-3.1a1 1 0 0 1-1.3.3c-3.3-2-8.4-2.6-12.3-1.4a1 1 0 1 1-.6-1.9c4.5-1.4 10.1-.7 13.9 1.6.5.3.7.9.3 1.4zm.1-3.2c-4-2.4-10.5-2.6-14.3-1.5a1.2 1.2 0 1 1-.7-2.3c4.4-1.3 11.5-1.1 16.1 1.6a1.2 1.2 0 0 1-1.1 2.2z"/></svg>';
    social.appendChild(spotify);
  }

  const siteName = document.querySelector('.site-name');
  if (siteName) {
    const home = siteName.querySelector('a');
    if (home) home.href = siteRoot + 'index.html';
    else {
      const link = document.createElement('a');
      link.href = siteRoot + 'index.html';
      link.textContent = siteName.textContent.trim();
      siteName.textContent = '';
      siteName.appendChild(link);
    }
  }

  if (!inArticles && !inBooks) {
    const articlesSection = document.querySelector('#articulos');
    const carousel = articlesSection && articlesSection.querySelector('.articles-carousel');
    if (carousel) {
      fetch('/articulos/index.html', { cache: 'no-store' })
        .then(function (response) { return response.text(); })
        .then(function (html) {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const entries = Array.from(doc.querySelectorAll('.article-entry')).slice(0, 2);
          if (!entries.length) return;
          carousel.innerHTML = '';
          entries.forEach(function (entry) {
            const title = entry.querySelector('h3');
            const description = entry.querySelector('p');
            const date = entry.querySelector('.article-date');
            const link = entry.querySelector('a.article-link');
            if (!title || !link) return;
            const card = document.createElement('a');
            card.className = 'article-card';
            card.href = 'articulos/' + link.getAttribute('href');
            card.innerHTML = '<div><p class="section-label">' + (date ? date.textContent.trim() : 'Artículo') + '</p><h3>' + title.innerHTML + '</h3>' + (description ? '<p>' + description.innerHTML + '</p>' : '') + '</div><span class="article-card-link">Leer artículo →</span>';
            carousel.appendChild(card);
          });
          const archiveLink = articlesSection.querySelector('.articles-archive-link');
          if (archiveLink) archiveLink.remove();
          const more = document.createElement('a');
          more.className = 'article-card article-more-card';
          more.href = 'articulos/index.html';
          more.innerHTML = '<div><p class="section-label">Archivo</p><h3>Leer más artículos</h3><p>Explorar el archivo completo de pensamiento teológico.</p></div><span class="article-card-link">Ver todos los artículos →</span>';
          carousel.appendChild(more);
        }).catch(function () {});
    }
  }

  const share = document.createElement('button');
  share.className = 'site-share';
  share.type = 'button';
  share.innerHTML = '<span class="share-icon" aria-hidden="true">↗</span><span>Compartir</span>';
  share.setAttribute('aria-label', 'Compartir o copiar enlace de esta página');
  share.addEventListener('click', function () {
    const title = document.title.replace(/\s+—\s+Mariano A\. Corica.*$/, '');
    const url = location.href;
    const isMobile = window.matchMedia('(max-width: 700px)').matches;
    function fallbackCopy(text, showFeedback) {
      const input = document.createElement('textarea'); input.value = text; input.setAttribute('readonly', ''); input.style.position = 'fixed'; input.style.opacity = '0'; document.body.appendChild(input); input.select();
      try { document.execCommand('copy'); if (showFeedback) showCopied(); } catch (e) {} input.remove();
    }
    function showCopied() {
      const old = document.querySelector('.copy-feedback'); if (old) old.remove();
      const feedback = document.createElement('div'); feedback.className = 'copy-feedback'; feedback.textContent = 'El enlace de acceso fue copiado al portapapeles. Puedes compartir el enlace donde quieras.'; document.body.appendChild(feedback); window.setTimeout(function () { feedback.remove(); }, 3500);
    }
    if (isMobile && navigator.share) { navigator.share({ title: title, url: url }).catch(function () {}); return; }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).then(showCopied).catch(function () { fallbackCopy(url, true); }); else fallbackCopy(url, true);
  });
  document.body.appendChild(share);

  if (isArticlePage) {
    const main = document.querySelector('main.article-page');
    if (main) { const n = document.createElement('nav'); n.className = 'article-navigation'; n.innerHTML = '<a href="index.html">← Todos los artículos</a><a href="../index.html">Inicio</a>'; main.appendChild(n); }
  }
  if (isArticleIndex) {
    const main = document.querySelector('main.article-archive');
    if (main) { const n = document.createElement('nav'); n.className = 'archive-navigation'; n.innerHTML = '<a href="../index.html">← Inicio</a>'; main.appendChild(n); }
  }
})();