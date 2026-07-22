/**
 * Google Analytics 4 (Google tag / gtag.js) for the Pammi marketing site.
 *
 * Property ID (numeric, from analytics.google.com/.../p510143575/...): 510143575
 * Measurement ID (required in the tag, from Admin → Data streams): G-XXXXXXXX
 *
 * Set VITE_GA_MEASUREMENT_ID at build time. Without it, analytics is a no-op.
 */

export const GA_PROPERTY_ID = String(
  import.meta.env.VITE_GA_PROPERTY_ID || '510143575'
).trim();

export const GA_MEASUREMENT_ID = String(
  import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-73LEVKZ4QP'
)
  .trim()
  .toUpperCase();

const isBrowser = typeof window !== 'undefined';

function canTrack() {
  return Boolean(
    isBrowser &&
      GA_MEASUREMENT_ID &&
      /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID) &&
      !window.__PAMMI_GA_DISABLED
  );
}

/** Push to dataLayer via gtag stub (created in initGoogleAnalytics). */
export function gtag(...args) {
  if (!isBrowser) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/**
 * Load the Google tag and configure the GA4 data stream.
 * Safe to call once from main.jsx.
 */
export function initGoogleAnalytics() {
  if (!canTrack()) {
    if (isBrowser && import.meta.env.DEV) {
      console.info(
        '[analytics] Skipped — set VITE_GA_MEASUREMENT_ID to your GA4 Measurement ID (G-…). Property',
        GA_PROPERTY_ID,
        'alone is not enough for the tag.'
      );
    }
    return false;
  }

  if (window.__PAMMI_GA_READY) return true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtagProxy() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
    // Useful custom dimensions-style params on every hit
    website_property_id: GA_PROPERTY_ID,
    traffic_type: 'marketing_site',
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);

  window.__PAMMI_GA_READY = true;
  return true;
}

/** Named event helper — keeps event names consistent in GA4. */
export function trackEvent(eventName, params = {}) {
  if (!canTrack() || !eventName) return;
  const payload = {
    send_to: GA_MEASUREMENT_ID,
    website_property_id: GA_PROPERTY_ID,
    ...params,
  };
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  } else {
    gtag('event', eventName, payload);
  }
}

export function trackPageView(path = window.location.pathname, title = document.title) {
  trackEvent('page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}

/** Primary conversion CTAs on the landing page. */
export function trackTryNow(location) {
  trackEvent('generate_lead', {
    event_category: 'cta',
    event_label: 'try_now',
    cta_location: location,
  });
  trackEvent('try_now_click', {
    event_category: 'cta',
    cta_location: location,
  });
}

export function trackBillingToggle(period) {
  trackEvent('billing_toggle', {
    event_category: 'pricing',
    billing_period: period,
  });
}

export function trackReferClinic() {
  trackEvent('refer_clinic_click', {
    event_category: 'cta',
    method: 'email',
  });
}

export function trackOutbound(url, label) {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: label || url,
    link_url: url,
    outbound: true,
  });
}

/** One-shot scroll depth markers (25/50/75/100). */
export function installScrollDepthTracking() {
  if (!canTrack() || window.__PAMMI_SCROLL_DEPTH) return;
  window.__PAMMI_SCROLL_DEPTH = true;

  const seen = new Set();
  const marks = [25, 50, 75, 100];

  function onScroll() {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const pct = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
    for (const mark of marks) {
      if (pct >= mark && !seen.has(mark)) {
        seen.add(mark);
        trackEvent('scroll', {
          event_category: 'engagement',
          percent_scrolled: mark,
        });
      }
    }
    if (seen.size === marks.length) {
      window.removeEventListener('scroll', onScroll, { passive: true });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/** Fire when a landing chapter enters the viewport. */
export function installChapterViewTracking(chapterIds = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6']) {
  if (!canTrack() || typeof IntersectionObserver === 'undefined' || window.__PAMMI_CHAPTER_VIEWS) {
    return;
  }
  window.__PAMMI_CHAPTER_VIEWS = true;

  const seen = new Set();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = entry.target.id;
        if (!id || seen.has(id)) continue;
        seen.add(id);
        trackEvent('chapter_view', {
          event_category: 'engagement',
          chapter_id: id,
        });
        if (seen.size === chapterIds.length) observer.disconnect();
      }
    },
    { threshold: 0.45 }
  );

  for (const id of chapterIds) {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  }
}
