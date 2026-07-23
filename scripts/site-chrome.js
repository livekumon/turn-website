/** Shared header/footer chrome for generated static pages (legal + blog). */
export const NAV_LINKS = [
  { href: '/blog', label: 'Blog' },
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/refunds', label: 'Refunds' },
  { href: '/shipping', label: 'Shipping' },
  { href: '/contact', label: 'Contact' },
];

export function siteHeader(activeHref = '') {
  const links = NAV_LINKS.map(
    (l) => `<a href="${l.href}" class="${l.href === activeHref ? 'is-active' : ''}">${l.label}</a>`
  ).join('\n        ');

  return `<header class="site-header">
  <div class="wrap">
    <a class="brand" href="/" aria-label="Pammi home"><img src="/logo.png" alt="Pammi — No Waiting"></a>
    <nav class="site-nav" aria-label="Site">
      ${links}
    </nav>
    <a class="btn btn-primary" href="/#demo">Try now</a>
  </div>
</header>`;
}

export function siteFooter() {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <img src="/logo.png" alt="Pammi">
        <p>The smart queue system for modern clinics. Patients scan, track, and return when it's time.</p>
      </div>
      <div class="foot-col">
        <h4>Product</h4>
        <a href="/#how">How it works</a>
        <a href="/#pricing">Pricing</a>
        <a href="/#faq">FAQ</a>
        <a href="/blog">Blog</a>
      </div>
      <div class="foot-col">
        <h4>Legal</h4>
        <a href="/terms">Terms &amp; Conditions</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/refunds">Refunds &amp; Cancellation</a>
        <a href="/shipping">Shipping &amp; Delivery</a>
      </div>
      <div class="foot-col">
        <h4>Contact</h4>
        <a href="/contact">Contact us</a>
        <a href="mailto:hello@pammi.app">hello@pammi.app</a>
        <a href="mailto:admin@pammi.app">admin@pammi.app</a>
      </div>
    </div>
    <div class="foot-bottom">
      <div>© 2026 Pammi. All rights reserved.</div>
      <div>No waiting. Just Pammi.</div>
    </div>
  </div>
</footer>`;
}

export function pageShell({ title, description, canonicalPath = '/', bodyClass = '', head = '', body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="https://pammi.app${canonicalPath}" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Pammi" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="https://pammi.app${canonicalPath}" />
  <meta property="og:image" content="https://pammi.app/logo.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/site.css" />
  ${head}
</head>
<body class="${bodyClass}">
${siteHeader(canonicalPath.startsWith('/blog') ? '/blog' : canonicalPath)}
${body}
${siteFooter()}
</body>
</html>
`;
}
