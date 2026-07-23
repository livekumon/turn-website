/**
 * Generates legal / payment-gateway policy pages into public/.
 * Required for PayPal & Razorpay merchant compliance (Terms, Privacy, Refunds, Shipping, Contact).
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteHeader, siteFooter } from './site-chrome.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const UPDATED = '23 July 2026';

const PAGES = [
  {
    id: 'terms',
    file: 'terms.html',
    title: 'Terms & Conditions',
    description: 'Terms governing use of Pammi clinic queue software and paid subscriptions.',
    body: `
      <h2>1. Agreement</h2>
      <p>These Terms &amp; Conditions (“Terms”) govern access to and use of Pammi (“Pammi”, “we”, “us”), including our websites, staff console, patient check-in experience, and related services (together, the “Service”). By creating an account, starting a trial, or purchasing a plan, you agree to these Terms on behalf of yourself and the clinic or organisation you represent.</p>

      <h2>2. The Service</h2>
      <p>Pammi provides software for clinic queue management, including QR-based patient check-in, live queue tracking, staff desk tools, and related features. Pammi is a software subscription. We do not provide medical advice, diagnosis, or treatment, and we are not a healthcare provider.</p>

      <h2>3. Eligibility &amp; accounts</h2>
      <ul>
        <li>You must provide accurate clinic and contact information.</li>
        <li>You are responsible for safeguarding login credentials and for activity under your account.</li>
        <li>You must ensure staff users are authorised to access patient queue information for your clinic.</li>
      </ul>

      <h2>4. Free trial</h2>
      <p>New clinics may receive a free trial period (typically one month) with access to the Service. When the trial ends, continued use requires an active paid plan unless we state otherwise. We may modify or withdraw trial offers prospectively.</p>

      <h2>5. Plans, fees &amp; billing</h2>
      <p>Paid plans (including Pro, Pro Plus, and Enterprise) are described on our <a href="/#pricing">pricing page</a> and at checkout. Fees may be billed monthly or annually. Annual plans are typically charged upfront for twelve months at the annual rate. Prices are shown in USD unless a local gateway (such as Razorpay) displays an INR equivalent.</p>
      <ul>
        <li>Taxes, bank fees, or payment-processor fees may apply and are your responsibility where required by law.</li>
        <li>Failure to pay may result in suspension or termination of access.</li>
        <li>Enterprise pricing and terms may be agreed separately in writing.</li>
      </ul>

      <h2>6. Payments</h2>
      <p>Payments may be processed by third-party providers such as <strong>PayPal</strong> and <strong>Razorpay</strong>. Their terms and privacy policies also apply to the payment transaction. Pammi does not store full card numbers on our servers; card and wallet data is handled by the payment provider.</p>

      <h2>7. Acceptable use</h2>
      <p>You agree not to misuse the Service, including by attempting unauthorised access, disrupting service availability, scraping at abusive rates, uploading unlawful content, or using Pammi in violation of applicable healthcare, privacy, or consumer laws.</p>

      <h2>8. Patient &amp; clinic data</h2>
      <p>You (the clinic) control patient and operational data you enter into Pammi. You represent that you have a lawful basis to collect and process that data. Our handling of personal data is described in the <a href="/privacy">Privacy Policy</a>.</p>

      <h2>9. Intellectual property</h2>
      <p>Pammi, its branding, software, and documentation remain our property or that of our licensors. You receive a limited, non-exclusive, non-transferable right to use the Service during an active subscription or trial.</p>

      <h2>10. Availability &amp; changes</h2>
      <p>We aim for reliable uptime but do not guarantee uninterrupted Service. We may update features, interfaces, and these Terms. Material changes will be posted on this page with an updated date. Continued use after changes constitutes acceptance where permitted by law.</p>

      <h2>11. Disclaimers</h2>
      <p>THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE”. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. Clinic operations, staffing, and clinical decisions remain solely your responsibility.</p>

      <h2>12. Limitation of liability</h2>
      <p>To the maximum extent permitted by law, Pammi’s total liability arising out of or related to the Service in any twelve-month period is limited to the fees you paid us for that period (or USD $100 if you are on a free trial). We are not liable for indirect, incidental, special, consequential, or lost-profit damages.</p>

      <h2>13. Cancellation</h2>
      <p>You may stop using the Service and cancel renewal where the product allows. Refunds, if any, are governed by our <a href="/refunds">Refund &amp; Cancellation Policy</a>.</p>

      <h2>14. Termination</h2>
      <p>We may suspend or terminate access for non-payment, violation of these Terms, legal risk, or prolonged inactivity. Upon termination, your right to use the Service ends. We may delete or anonymise data after a reasonable retention period unless law requires longer storage.</p>

      <h2>15. Governing law</h2>
      <p>These Terms are governed by the laws applicable to our primary place of business, without regard to conflict-of-law rules, unless mandatory consumer protections in your jurisdiction provide otherwise.</p>

      <h2>16. Contact</h2>
      <p>Questions about these Terms: <a href="mailto:hello@pammi.app">hello@pammi.app</a>. Billing or enterprise agreements: <a href="mailto:admin@pammi.app">admin@pammi.app</a>. See also our <a href="/contact">Contact</a> page.</p>
    `,
  },
  {
    id: 'privacy',
    file: 'privacy.html',
    title: 'Privacy Policy',
    description: 'How Pammi collects, uses, and protects personal and clinic data.',
    body: `
      <h2>1. Scope</h2>
      <p>This Privacy Policy explains how Pammi (“we”, “us”) collects, uses, shares, and protects information when you visit <strong>pammi.app</strong> and related domains, create a clinic account, use the staff or patient experiences, or contact us.</p>

      <h2>2. Information we collect</h2>
      <h3>Account &amp; clinic information</h3>
      <ul>
        <li>Name, email, phone (if provided), clinic name, and account credentials</li>
        <li>Subscription plan, billing period, and payment status</li>
        <li>Staff roles and doctor/queue configuration you set up</li>
      </ul>
      <h3>Operational / patient queue data</h3>
      <ul>
        <li>Queue check-in details clinics choose to collect (for example patient name, token/position, and status)</li>
        <li>Device and usage logs needed to run notifications and the live queue</li>
      </ul>
      <h3>Payment information</h3>
      <p>Payments are processed by <strong>PayPal</strong> and/or <strong>Razorpay</strong>. We receive confirmation of payment (amount, currency, transaction ids, status). Card or wallet secrets are handled by the payment provider—not stored by Pammi as full card data.</p>
      <h3>Website analytics</h3>
      <p>If enabled, we may use analytics tools (such as Google Analytics) to understand marketing-site traffic. You can control cookies via your browser settings.</p>

      <h2>3. How we use information</h2>
      <ul>
        <li>Provide, secure, and improve the Service</li>
        <li>Authenticate users and manage clinic subscriptions</li>
        <li>Process payments and prevent fraud</li>
        <li>Send transactional messages (receipts, security, service notices)</li>
        <li>Respond to support requests</li>
        <li>Comply with law and enforce our Terms</li>
      </ul>

      <h2>4. Legal bases</h2>
      <p>Where required (for example under GDPR-style rules), we rely on contract performance, legitimate interests (securing and improving the Service), consent where we ask for it, and legal obligations.</p>

      <h2>5. Sharing</h2>
      <p>We share information with:</p>
      <ul>
        <li><strong>Infrastructure providers</strong> that host the Service</li>
        <li><strong>Payment processors</strong> (PayPal, Razorpay) to complete checkout</li>
        <li><strong>Analytics / email tools</strong> when configured for our marketing or transactional mail</li>
        <li><strong>Authorities</strong> when required by law or to protect rights and safety</li>
      </ul>
      <p>We do not sell personal information.</p>

      <h2>6. Clinic responsibilities</h2>
      <p>Clinics are responsible for providing required notices to patients and obtaining any consents needed to collect queue or contact data in their jurisdiction. Pammi processes such data on the clinic’s instructions as part of providing the Service.</p>

      <h2>7. Retention</h2>
      <p>We retain account and billing records as needed for operations, accounting, dispute resolution, and legal compliance. Queue data retention follows product settings and our operational backups; clinics may request deletion subject to legal holds and technical limits.</p>

      <h2>8. Security</h2>
      <p>We use industry-standard measures (encryption in transit, access controls, and least-privilege practices). No method of transmission or storage is 100% secure.</p>

      <h2>9. International transfers</h2>
      <p>Your information may be processed in countries where we or our providers operate. Where required, we use appropriate safeguards for cross-border transfers.</p>

      <h2>10. Your rights</h2>
      <p>Depending on your location, you may have rights to access, correct, delete, or export personal data, or to object to / restrict certain processing. Contact <a href="mailto:hello@pammi.app">hello@pammi.app</a>. You may also lodge a complaint with a supervisory authority where applicable.</p>

      <h2>11. Children</h2>
      <p>The Service is directed at clinics and adult staff users. We do not knowingly market to children. Patient minors’ data, if entered by a clinic, is processed under the clinic’s responsibility.</p>

      <h2>12. Changes</h2>
      <p>We may update this Policy. The “Last updated” date at the top will change when we do. Continued use after an update constitutes acceptance where permitted by law.</p>

      <h2>13. Contact</h2>
      <p>Privacy questions: <a href="mailto:hello@pammi.app">hello@pammi.app</a> · Admin / billing: <a href="mailto:admin@pammi.app">admin@pammi.app</a> · <a href="/contact">Contact page</a></p>
    `,
  },
  {
    id: 'refunds',
    file: 'refunds.html',
    title: 'Refund & Cancellation Policy',
    description: 'Cancellation and refund rules for Pammi subscriptions paid via PayPal or Razorpay.',
    body: `
      <h2>1. Overview</h2>
      <p>This Refund &amp; Cancellation Policy applies to paid Pammi subscriptions purchased through our staff application or related checkout flows, including payments made with <strong>PayPal</strong> or <strong>Razorpay</strong>.</p>

      <h2>2. Free trial</h2>
      <p>The introductory free trial (where offered) does not require payment. No refund applies to unused trial time because no fee is charged for the trial itself.</p>

      <h2>3. Cancellation</h2>
      <ul>
        <li>You may cancel renewal of a subscription so that you are not charged for the next billing period.</li>
        <li>Cancellation stops future charges; it does not automatically refund the current paid period unless you qualify under the refund rules below.</li>
        <li>After cancellation takes effect, access continues until the end of the period already paid for, unless we suspend the account for breach of Terms or non-payment.</li>
        <li>To cancel, use the billing controls in your Pammi staff account or email <a href="mailto:admin@pammi.app">admin@pammi.app</a> from your registered clinic email.</li>
      </ul>

      <h2>4. Refund eligibility</h2>
      <p>Because Pammi is a digital software service delivered immediately upon activation, all sales are generally final. We may provide a refund at our discretion in these cases:</p>
      <ul>
        <li><strong>Duplicate or accidental charge</strong> — clear duplicate payment for the same plan period.</li>
        <li><strong>Service not provisioned</strong> — you paid but we failed to activate access for reasons solely within our control, and we cannot remedy within a reasonable time.</li>
        <li><strong>Qualifying cooling-off request</strong> — if you request a refund within <strong>7 days</strong> of first paid activation and can show the Service was not meaningfully used (for example, no material patient queue activity), we may refund the unused paid amount.</li>
      </ul>
      <p>Refunds are typically not available for:</p>
      <ul>
        <li>Change of mind after substantial use of the Service</li>
        <li>Partial months already consumed on a monthly plan</li>
        <li>Annual plans after the cooling-off window, except unused whole months granted as a goodwill credit at our discretion</li>
        <li>Enterprise custom agreements (governed by the signed order / contract)</li>
      </ul>

      <h2>5. How to request a refund</h2>
      <p>Email <a href="mailto:admin@pammi.app">admin@pammi.app</a> with:</p>
      <ul>
        <li>Clinic name and account email</li>
        <li>Payment reference (PayPal / Razorpay transaction id)</li>
        <li>Date and amount charged</li>
        <li>Reason for the request</li>
      </ul>
      <p>We aim to respond within 5–7 business days. Approved refunds are issued to the original payment method via the same gateway (PayPal or Razorpay). Bank or card posting times depend on your provider and may take additional business days.</p>

      <h2>6. Chargebacks</h2>
      <p>Please contact us before opening a dispute with your bank or PayPal/Razorpay so we can help resolve the issue. Unresolved abuse of chargebacks may result in account suspension.</p>

      <h2>7. Plan changes</h2>
      <p>Upgrades and downgrades are handled in-product where available. Credits or prorated adjustments, if any, follow the rules shown at checkout or as confirmed by billing support.</p>

      <h2>8. Contact</h2>
      <p>Billing &amp; refunds: <a href="mailto:admin@pammi.app">admin@pammi.app</a> · General: <a href="mailto:hello@pammi.app">hello@pammi.app</a> · <a href="/contact">Contact</a></p>
    `,
  },
  {
    id: 'shipping',
    file: 'shipping.html',
    title: 'Shipping & Delivery Policy',
    description: 'How Pammi delivers its digital subscription service (no physical shipping).',
    body: `
      <h2>1. Digital delivery</h2>
      <p>Pammi is a <strong>cloud software service</strong>. We do not ship physical goods, hardware, SIM cards, or printed materials as part of standard Pro / Pro Plus / Enterprise software subscriptions.</p>

      <h2>2. How access is delivered</h2>
      <ul>
        <li>After successful signup or payment, clinic access is provisioned digitally to your Pammi staff account.</li>
        <li>Delivery is typically <strong>immediate</strong> upon successful payment confirmation from PayPal or Razorpay (or upon trial activation).</li>
        <li>Patient check-in is delivered via web links / QR codes you generate in the product—no app store install is required for patients in the standard flow.</li>
      </ul>

      <h2>3. Delivery timeline</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:8px;font-size:14px;">
        <thead>
          <tr>
            <th style="text-align:left;padding:10px 8px;border-bottom:1px solid rgba(24,59,58,0.15);">Item</th>
            <th style="text-align:left;padding:10px 8px;border-bottom:1px solid rgba(24,59,58,0.15);">Timeline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:10px 8px;border-bottom:1px solid rgba(24,59,58,0.08);">Account activation / plan unlock</td>
            <td style="padding:10px 8px;border-bottom:1px solid rgba(24,59,58,0.08);">Usually instant after payment success</td>
          </tr>
          <tr>
            <td style="padding:10px 8px;border-bottom:1px solid rgba(24,59,58,0.08);">Payment confirmation email</td>
            <td style="padding:10px 8px;border-bottom:1px solid rgba(24,59,58,0.08);">Typically within minutes (check spam)</td>
          </tr>
          <tr>
            <td style="padding:10px 8px;">Support response</td>
            <td style="padding:10px 8px;">Within 1–2 business days for standard requests</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Failed or delayed delivery</h2>
      <p>If payment succeeds but access is not available within a reasonable time, contact <a href="mailto:admin@pammi.app">admin@pammi.app</a> with your transaction id. We will restore access or process a refund per our <a href="/refunds">Refund &amp; Cancellation Policy</a>.</p>

      <h2>5. No shipping charges</h2>
      <p>There are no shipping, packaging, or courier charges for Pammi software subscriptions.</p>

      <h2>6. Contact</h2>
      <p><a href="mailto:hello@pammi.app">hello@pammi.app</a> · <a href="mailto:admin@pammi.app">admin@pammi.app</a> · <a href="/contact">Contact page</a></p>
    `,
  },
  {
    id: 'contact',
    file: 'contact.html',
    title: 'Contact Us',
    description: 'Contact Pammi for product, billing, and payment support.',
    body: `
      <h2>Get in touch</h2>
      <p>We are here for product questions, demos, billing, and payment support (PayPal &amp; Razorpay).</p>

      <div class="contact-grid">
        <div class="contact-tile">
          <strong>General &amp; product</strong>
          <a href="mailto:hello@pammi.app">hello@pammi.app</a>
        </div>
        <div class="contact-tile">
          <strong>Billing, refunds &amp; enterprise</strong>
          <a href="mailto:admin@pammi.app">admin@pammi.app</a>
        </div>
        <div class="contact-tile">
          <strong>Website</strong>
          <a href="/">pammi.app</a>
        </div>
        <div class="contact-tile">
          <strong>Response time</strong>
          <span>Typically within 1–2 business days</span>
        </div>
      </div>

      <h2>What to include for payment issues</h2>
      <ul>
        <li>Clinic name and registered email</li>
        <li>Approximate payment date and amount</li>
        <li>Gateway used (PayPal or Razorpay) and transaction / order id</li>
        <li>Screenshot of the error or receipt, if available</li>
      </ul>

      <h2>Policies</h2>
      <p>Please review our <a href="/terms">Terms &amp; Conditions</a>, <a href="/privacy">Privacy Policy</a>, <a href="/refunds">Refund &amp; Cancellation Policy</a>, and <a href="/shipping">Shipping &amp; Delivery Policy</a>.</p>

      <h2>Try Pammi</h2>
      <p><a class="btn btn-primary" href="/#demo" style="margin-top:8px;">Try now</a></p>
    `,
  },
];

function renderPage(page) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${page.title} — Pammi</title>
  <meta name="description" content="${page.description}" />
  <link rel="canonical" href="https://pammi.app/${page.id}" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/site.css" />
</head>
<body>
${siteHeader(`/${page.id}`)}
<main class="legal-main">
  <div class="wrap">
    <div class="legal-hero">
      <div class="eyebrow"><span class="dot"></span> Legal</div>
      <h1>${page.title}</h1>
      <p>${page.description}</p>
      <div class="legal-meta">Last updated: ${UPDATED}</div>
    </div>
    <div class="legal-toc">
      ${PAGES.map((p) => `<a href="/${p.id}">${p.title}</a>`).join('\n      ')}
    </div>
    <article class="legal-card">
      ${page.body.trim()}
    </article>
  </div>
</main>
${siteFooter()}
</body>
</html>
`;
}

mkdirSync(publicDir, { recursive: true });
for (const page of PAGES) {
  const out = join(publicDir, page.file);
  writeFileSync(out, renderPage(page));
  console.log('Wrote', page.file);
}
