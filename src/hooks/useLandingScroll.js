import { useEffect } from 'react';

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function getProgress(el) {
  const rect = el.getBoundingClientRect();
  const total = rect.height - window.innerHeight;
  if (total <= 0) return 1;
  return clamp01(-rect.top / total);
}

function beatOpacity(p, i, total) {
  const seg = 1 / total;
  const start = i * seg;
  const end = i === total - 1 ? 1.001 : start + seg;
  const fade = seg * 0.3;
  if (p < start - fade) return 0;
  if (p < start) return (p - (start - fade)) / fade;
  if (p < end - fade || i === total - 1) return 1;
  if (p < end) return 1 - (p - (end - fade)) / fade;
  return 0;
}

export default function useLandingScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const progressBar = document.getElementById('progressBar');
    const chapters = [];

    function registerChapter(id, updateFn, captionSelector, syncSelector) {
      const el = document.getElementById(id);
      if (!el) return;
      const caps = captionSelector
        ? Array.prototype.slice.call(document.querySelectorAll(captionSelector))
        : [];
      const sync = syncSelector
        ? Array.prototype.slice.call(document.querySelectorAll(syncSelector))
        : [];
      chapters.push({ el, updateFn, caps, sync });
    }

    const figs1 = document.querySelectorAll('#scene1 .figure');
    function update1(p) {
      figs1.forEach((f, i) => {
        const th = i * 0.12;
        const local = clamp01((p - th) * 6);
        f.style.opacity = local;
        f.style.transform = `translateY(${(1 - local) * (reduced ? 0 : 16)}px)`;
      });
    }

    const ticketBig = document.getElementById('ticketBig');
    const phoneScan = document.getElementById('phoneScan');
    const scanLine = document.querySelector('#ch2 .scan-line');
    const checkMark = document.querySelector('#ch2 .check-mark');
    function update2(p) {
      const flip = clamp01((p - 0.05) / 0.35);
      if (ticketBig) ticketBig.style.transform = `rotateY(${flip * 180}deg)`;

      const phoneP = clamp01((p - 0.35) / 0.25);
      if (phoneScan) {
        phoneScan.style.opacity = phoneP;
        phoneScan.style.transform = `translateY(${(1 - phoneP) * (reduced ? 0 : 24)}px)`;
      }

      const scanP = clamp01((p - 0.55) / 0.25);
      if (scanLine) {
        scanLine.style.top = `${scanP * 100}%`;
        scanLine.style.opacity = p > 0.55 && p < 0.85 ? 1 : 0;
      }
      if (checkMark) {
        const chP = clamp01((p - 0.8) / 0.15);
        checkMark.style.opacity = chP;
        checkMark.style.transform = `scale(${0.6 + chP * 0.4})`;
      }
    }

    const liveNumber = document.getElementById('liveNumber');
    const liveRing = document.getElementById('liveRingFill');
    const statusPill = document.getElementById('statusPill');
    function update3(p) {
      const n = Math.max(1, Math.round(14 - p * 13));
      if (liveNumber) liveNumber.textContent = String(n);
      if (liveRing) liveRing.style.strokeDashoffset = String((1 - p) * 264);
      if (statusPill) {
        if (p < 0.78) {
          statusPill.textContent = 'Waiting';
          statusPill.style.background = 'rgba(255,255,255,0.08)';
          statusPill.style.color = 'var(--ink-text-dim)';
        } else if (p < 0.94) {
          statusPill.textContent = 'Serving';
          statusPill.style.background = 'rgba(255,90,31,0.16)';
          statusPill.style.color = 'var(--signal)';
        } else {
          statusPill.textContent = 'Done';
          statusPill.style.background = 'rgba(31,92,82,0.35)';
          statusPill.style.color = 'var(--teal)';
        }
      }
    }

    const figs4 = document.querySelectorAll('#scene4 .figure-leave');
    const dests = document.querySelectorAll('#scene4 .dest');
    const phoneGlow = document.querySelector('#scene4 .phone-glow');
    function update4(p) {
      figs4.forEach((f, i) => {
        const th = i * 0.12;
        const local = clamp01((p - th) * 6);
        f.style.opacity = 1 - local;
        f.style.transform = `translate(${local * (reduced ? 0 : 44)}px,${-local * (reduced ? 0 : 14)}px) scale(${1 - local * 0.3})`;
      });
      dests.forEach((d, i) => {
        const th = 0.3 + i * 0.15;
        d.style.opacity = clamp01((p - th) * 4);
      });
      if (phoneGlow) phoneGlow.style.opacity = clamp01((p - 0.4) * 3);
    }

    function update5() {}

    const dcNow = document.getElementById('dcNow');
    const dcRows = document.querySelectorAll('#doctorCard .dc-row');
    const dcFoot = document.querySelector('#doctorCard .dc-foot');
    function update6(p) {
      const nowP = clamp01(p * 5);
      if (dcNow) {
        dcNow.style.opacity = nowP;
        dcNow.style.transform = `translateY(${(1 - nowP) * (reduced ? 0 : 8)}px)`;
      }
      dcRows.forEach((r, i) => {
        const th = 0.35 + i * 0.22;
        const local = clamp01((p - th) * 5);
        r.style.opacity = local;
        r.style.transform = `translateX(${(1 - local) * (reduced ? 0 : -10)}px)`;
      });
      if (dcFoot) dcFoot.style.opacity = clamp01((p - 0.85) * 6);
    }

    registerChapter('ch1', update1, '#captions1 .cap');
    registerChapter('ch2', update2, '#captions2 .cap');
    registerChapter('ch3', update3, '#captions3 .cap');
    registerChapter('ch4', update4, '#captions4 .cap');
    registerChapter('ch5', update5, '#captions5 .cap', '#ch5 .shot');
    registerChapter('ch6', update6, '#captions6 .cap');

    const closing = document.getElementById('closing');
    let io;
    if ('IntersectionObserver' in window && closing) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) closing.classList.add('in-view');
          });
        },
        { threshold: 0.3 }
      );
      io.observe(closing);
    } else if (closing) {
      closing.classList.add('in-view');
    }

    let ticking = false;
    function render() {
      if (!progressBar) return;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const overall = docH > 0 ? clamp01(window.scrollY / docH) : 0;
      progressBar.style.width = `${overall * 100}%`;

      chapters.forEach((ch) => {
        const p = getProgress(ch.el);
        ch.updateFn(p);
        const total = ch.caps.length || ch.sync.length;
        ch.caps.forEach((cap, i) => {
          cap.style.opacity = beatOpacity(p, i, total);
        });
        if (ch.sync) {
          ch.sync.forEach((el, i) => {
            el.style.opacity = beatOpacity(p, i, total);
          });
        }
      });
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          render();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    render();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (io) io.disconnect();
    };
  }, []);
}
