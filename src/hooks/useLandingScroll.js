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

    const roadLoc = document.getElementById('roadLoc');
    const roadClinic = document.getElementById('roadClinic');
    const roadLine = document.getElementById('roadLine');
    const roadBadge = document.getElementById('roadBadge');
    const roadMins = document.getElementById('roadMins');
    const predictCard = document.getElementById('predictCard');
    function update3(p) {
      const locP = clamp01(p / 0.22);
      if (roadLoc) {
        roadLoc.style.opacity = locP;
        roadLoc.style.transform = `translateY(${(1 - locP) * (reduced ? 0 : 14)}px)`;
      }

      const pathP = clamp01((p - 0.18) / 0.35);
      if (roadLine) roadLine.style.transform = `scaleX(${pathP})`;
      if (roadBadge) {
        roadBadge.style.opacity = pathP;
        roadBadge.style.transform = `translate(-50%, -50%) scale(${0.85 + pathP * 0.15})`;
      }
      if (roadMins) {
        const mins = Math.round(18 - pathP * 6);
        roadMins.textContent = String(Math.max(12, mins));
      }

      const clinicP = clamp01((p - 0.45) / 0.25);
      if (roadClinic) {
        roadClinic.style.opacity = clinicP;
        roadClinic.style.transform = `translateY(${(1 - clinicP) * (reduced ? 0 : 14)}px)`;
      }

      const predP = clamp01((p - 0.68) / 0.25);
      if (predictCard) {
        predictCard.style.opacity = predP;
        predictCard.style.transform = `translateY(${(1 - predP) * (reduced ? 0 : 16)}px)`;
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

    const dcNow = document.getElementById('dcNow');
    const dcRows = document.querySelectorAll('#doctorCard .dc-row');
    const dcFoot = document.querySelector('#doctorCard .dc-foot');
    function update5(p) {
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

    const priceToggle = document.getElementById('priceToggle');
    const priceFree = document.getElementById('priceFree');
    const priceSolo = document.getElementById('priceSolo');
    const pricePack = document.getElementById('pricePack');
    const priceActions = document.getElementById('priceActions');
    function update6(p) {
      const toggleP = clamp01(p / 0.25);
      if (priceToggle) {
        priceToggle.style.opacity = toggleP;
        priceToggle.style.transform = `translateY(${(1 - toggleP) * (reduced ? 0 : 12)}px)`;
      }

      const cards = [priceFree, priceSolo, pricePack];
      cards.forEach((card, i) => {
        if (!card) return;
        const local = clamp01((p - (0.2 + i * 0.12)) / 0.2);
        card.style.opacity = local;
        card.style.transform = `translateY(${(1 - local) * (reduced ? 0 : 16)}px)`;
      });

      const actionsP = clamp01((p - 0.55) / 0.25);
      if (priceActions) {
        priceActions.style.opacity = actionsP;
        priceActions.style.transform = `translateY(${(1 - actionsP) * (reduced ? 0 : 12)}px)`;
      }
    }

    registerChapter('ch1', update1, '#captions1 .cap');
    registerChapter('ch2', update2, '#captions2 .cap');
    registerChapter('ch3', update3, '#captions3 .cap');
    registerChapter('ch4', update4, '#captions4 .cap');
    registerChapter('ch5', update5, '#captions5 .cap');
    registerChapter('ch6', update6, '#captions6 .cap');

    const closing = document.getElementById('closing');
    const tryNowBar = document.getElementById('tryNowBar');
    const tryNowBtn = document.getElementById('tryNowBtn');
    const tryNowSlot = document.getElementById('tryNowSlot');
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

    function easeInOut(t) {
      return t * t * (3 - 2 * t);
    }

    function updateTryNowDock() {
      if (!closing || !tryNowBar || !tryNowBtn || !tryNowSlot) return;

      const closingRect = closing.getBoundingClientRect();
      const vh = window.innerHeight;
      // Float from the bottom bar into the In short CTA
      const startAt = vh * 0.98;
      const endAt = vh * 0.32;
      let p = clamp01((startAt - closingRect.top) / (startAt - endAt));
      if (reduced) p = p > 0.5 ? 1 : 0;
      const eased = easeInOut(p);

      const slotRect = tryNowSlot.getBoundingClientRect();
      const btnH = tryNowBtn.offsetHeight || 50;
      const startX = window.innerWidth / 2;
      const startY = vh - 28 - btnH / 2;
      const endX = slotRect.left + slotRect.width / 2;
      const endY = slotRect.top + slotRect.height / 2;

      const x = startX + (endX - startX) * eased;
      const y = startY + (endY - startY) * eased;
      const docked = eased > 0.92;

      tryNowBtn.style.position = 'fixed';
      tryNowBtn.style.left = `${x}px`;
      tryNowBtn.style.top = `${y}px`;
      tryNowBtn.style.transform = 'translate(-50%, -50%)';
      tryNowBtn.style.zIndex = '71';
      tryNowBtn.style.opacity = docked ? '0' : '1';
      tryNowBtn.style.pointerEvents = docked ? 'none' : 'auto';
      tryNowBtn.classList.toggle('is-docked', docked);

      tryNowBar.style.opacity = String(1 - eased);
      tryNowBar.style.pointerEvents = 'none';

      // In-page CTA always sits below the copy; floating button hands off when it arrives
      tryNowSlot.style.opacity = '1';
      tryNowSlot.style.pointerEvents = 'auto';
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

      updateTryNowDock();
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
