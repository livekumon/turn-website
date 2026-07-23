/**
 * Copies public/ → dist/ and injects optional runtime config + GA4 snippet.
 *
 * Build-time env — must match DigitalOcean App Platform (same names as before):
 *   VITE_GA_MEASUREMENT_ID  — GA4 Measurement ID (G-…)
 *   VITE_GA_PROPERTY_ID     — numeric property id (reference)
 *   VITE_TRY_NOW_URL        — primary CTA URL (preferred)
 *   VITE_STAFF_APP_URL      — fallback → {url}/register when TRY_NOW unset
 *   CONTACT_EMAIL           — optional mailto override (defaults to hello@pammi.app)
 */
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const distDir = join(root, 'dist');

const gaMeasurementId = String(process.env.VITE_GA_MEASUREMENT_ID || '')
  .trim()
  .toUpperCase();
const gaPropertyId = String(process.env.VITE_GA_PROPERTY_ID || '510143575').trim();
const contactEmail = String(process.env.CONTACT_EMAIL || 'hello@pammi.app').trim();

const staffAppUrl = String(process.env.VITE_STAFF_APP_URL || '')
  .trim()
  .replace(/\/$/, '');
const tryNowUrl = String(
  process.env.VITE_TRY_NOW_URL || (staffAppUrl ? `${staffAppUrl}/register` : '')
).trim();

function escapeJs(value) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

function escapeHtmlAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function buildAnalyticsSnippet() {
  if (!gaMeasurementId || !/^G-[A-Z0-9]+$/.test(gaMeasurementId)) {
    return `<!-- GA skipped: set VITE_GA_MEASUREMENT_ID (G-…) at build time -->`;
  }

  return `<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${escapeJs(gaMeasurementId)}', {
    send_page_view: true,
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
    website_property_id: '${escapeJs(gaPropertyId)}',
    traffic_type: 'marketing_site'
  });
  window.__PAMMI_GA_READY = true;
</script>`;
}

function buildConfigSnippet() {
  return `<script>
  window.__PAMMI_CONFIG = {
    contactEmail: '${escapeJs(contactEmail)}',
    tryNowUrl: '${escapeJs(tryNowUrl)}',
    staffAppUrl: '${escapeJs(staffAppUrl)}',
    gaMeasurementId: '${escapeJs(gaMeasurementId)}',
    gaPropertyId: '${escapeJs(gaPropertyId)}'
  };
</script>`;
}

const SITE = 'https://pammi.app';

/** FAQ text kept in sync with the visible #faq section on the homepage. */
const FAQ_ITEMS = [
  {
    q: 'Do patients install an app?',
    a: "No. They simply scan the QR code — it opens straight in their phone's browser.",
  },
  {
    q: 'How long does setup take?',
    a: "Less than 5 minutes. Print the QR, place it at reception, and you're live.",
  },
  {
    q: 'Does it work for multiple doctors?',
    a: 'Yes — unlimited doctors, each with their own independent queue.',
  },
  {
    q: 'Can I customize queues?',
    a: 'Yes. Each doctor has their own queue, hours, and availability status.',
  },
  {
    q: 'What does the front desk need to do?',
    a: 'Just tap "next" when a doctor is ready. Pammi handles the numbering, tracking, and patient notifications automatically.',
  },
];

function buildSeoSnippet() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pammi',
    url: SITE,
    logo: `${SITE}/logo.png`,
    email: 'hello@pammi.app',
    sameAs: [],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Pammi',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      "QR-based virtual queue management system for clinics and hospitals. Patients scan a QR code, join the queue instantly, and track their turn live — no app install, no hardware, 5-minute setup.",
    url: SITE,
    offers: [
      { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Pro', price: '5', priceCurrency: 'USD', description: 'per doctor, billed annually' },
      { '@type': 'Offer', name: 'Pro Plus', price: '20', priceCurrency: 'USD', description: 'for 5 doctors, billed annually' },
      { '@type': 'Offer', name: 'Enterprise', description: 'Custom pricing — contact admin@pammi.app' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const jsonLd = [orgSchema, softwareSchema, faqSchema]
    .map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`)
    .join('\n');

  const meta = `<link rel="canonical" href="${SITE}/" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Pammi" />
<meta property="og:title" content="Pammi — The Smart Queue System for Modern Clinics" />
<meta property="og:description" content="Patients scan a QR code, join your queue instantly, track their turn live, and return when it's time. No waiting rooms. No apps to install." />
<meta property="og:url" content="${SITE}/" />
<meta property="og:image" content="${SITE}/logo.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Pammi — The Smart Queue System for Modern Clinics" />
<meta name="twitter:description" content="Patients scan a QR code, join your queue instantly, track their turn live. No waiting rooms. No apps to install." />
<meta name="keywords" content="queue management system, queue management software, virtual queue management system, hospital queue management system, healthcare queue management system, clinic queue management, customer queue management system" />`;

  return `${meta}\n${jsonLd}`;
}

function applyCtaOverrides(html) {
  let out = html;

  if (contactEmail && contactEmail !== 'hello@pammi.app') {
    out = out.replaceAll('hello@pammi.app', contactEmail);
  }

  if (!tryNowUrl) return out;

  const href = escapeHtmlAttr(tryNowUrl);

  // Mailto try CTAs → try-now / register URL
  out = out.replaceAll(
    `href="mailto:${contactEmail}?subject=Try%20Pammi"`,
    `href="${href}"`
  );
  out = out.replaceAll(
    'href="mailto:hello@pammi.app?subject=Try%20Pammi"',
    `href="${href}"`
  );

  // Primary "Try now" buttons that scroll to #demo → try-now URL
  out = out.replace(
    /(<a\s+href="#demo"\s+class="btn btn-primary[^"]*">Try now<\/a>)/g,
    (match) => match.replace('href="#demo"', `href="${href}"`)
  );

  return out;
}

if (!existsSync(join(publicDir, 'index.html'))) {
  console.error('Missing public/index.html — copy the landing HTML prototype first.');
  process.exit(1);
}

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });
cpSync(publicDir, distDir, { recursive: true });

const indexPath = join(distDir, 'index.html');
let html = readFileSync(indexPath, 'utf8');

const inject = `${buildSeoSnippet()}\n${buildConfigSnippet()}\n${buildAnalyticsSnippet()}\n`;
if (html.includes('</head>')) {
  html = html.replace('</head>', `${inject}</head>`);
} else {
  html = inject + html;
}

html = applyCtaOverrides(html);
writeFileSync(indexPath, html);

console.log('Built dist/ from public/');
console.log(
  `  GA: ${gaMeasurementId || '(none)'} | contact: ${contactEmail} | tryNow: ${tryNowUrl || '(mailto)'}`
);
