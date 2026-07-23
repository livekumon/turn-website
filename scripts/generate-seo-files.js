/**
 * Generates robots.txt, sitemap.xml, and llms.txt at the public root.
 * llms.txt is an emerging convention some AI crawlers check for a clean,
 * structured summary of the site's purpose and pages (low cost, low downside).
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { POSTS, SITE, PUBLISHED } from './generate-blog-pages.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const STATIC_PAGES = [
  { path: '/', priority: '1.0' },
  { path: '/blog', priority: '0.8' },
  { path: '/terms', priority: '0.3' },
  { path: '/privacy', priority: '0.3' },
  { path: '/refunds', priority: '0.3' },
  { path: '/shipping', priority: '0.3' },
  { path: '/contact', priority: '0.5' },
];

function buildSitemap() {
  const urls = [
    ...STATIC_PAGES.map(
      (p) => `  <url>
    <loc>${SITE}${p.path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    ),
    ...POSTS.map(
      (post) => `  <url>
    <loc>${SITE}/blog/${post.slug}</loc>
    <lastmod>${PUBLISHED}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    ),
  ].join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;
}

function buildLlmsTxt() {
  const posts = POSTS.map((p) => `- [${p.title}](${SITE}/blog/${p.slug}): ${p.description}`).join('\n');

  return `# Pammi

> Pammi is a QR-based virtual queue management system for clinics and small hospitals. Patients scan a QR code at reception, join the queue instantly, and track their position live from their own phone — no app install, no kiosk hardware, and setup that takes about 5 minutes. Pammi typically reclaims up to 70% of average waiting-room time by moving patients out of the physical waiting room and into a live digital queue.

Pammi is built for solo practitioners, small group practices, and multi-doctor clinics — not large multi-branch enterprise deployments. Each doctor runs an independent queue with its own hours and availability.

## Pricing

- Free: $0 for the first month, full access, no card required.
- Pro: $5/doctor/month billed annually ($10/month billed monthly) — one doctor seat.
- Pro Plus: $20/month billed annually for 5 doctors ($40/month billed monthly) — best per-seat value; extra seats from $4/doctor.
- Enterprise: custom pricing for multi-clinic and high-volume deployments — contact admin@pammi.app.

Full pricing: ${SITE}/#pricing

## Key pages

- Home / product overview: ${SITE}/
- Pricing: ${SITE}/#pricing
- Blog (queue management guides): ${SITE}/blog
- Terms & Conditions: ${SITE}/terms
- Privacy Policy: ${SITE}/privacy
- Refund & Cancellation Policy: ${SITE}/refunds
- Shipping & Delivery Policy: ${SITE}/shipping
- Contact: ${SITE}/contact

## Blog — queue management guides

${posts}

## Contact

- General & product: hello@pammi.app
- Billing, refunds & enterprise: admin@pammi.app
`;
}

writeFileSync(join(publicDir, 'sitemap.xml'), buildSitemap());
writeFileSync(join(publicDir, 'robots.txt'), buildRobots());
writeFileSync(join(publicDir, 'llms.txt'), buildLlmsTxt());
console.log('Wrote sitemap.xml, robots.txt, llms.txt');
