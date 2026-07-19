import { useState } from 'react';
import useLandingScroll from './hooks/useLandingScroll';

function ScanBarcodeIcon({ className = 'scan-icon' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M8 16V10h6M32 10h6v6M38 32v6h-6M14 38H8v-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="15" y="15" width="6" height="6" fill="currentColor" />
      <rect x="27" y="15" width="6" height="6" fill="currentColor" />
      <rect x="15" y="27" width="6" height="6" fill="currentColor" />
      <rect x="23" y="15" width="2" height="2" fill="currentColor" />
      <rect x="23" y="19" width="2" height="2" fill="currentColor" />
      <rect x="27" y="23" width="2" height="2" fill="currentColor" />
      <rect x="31" y="23" width="2" height="2" fill="currentColor" />
      <rect x="23" y="27" width="2" height="2" fill="currentColor" />
      <rect x="27" y="27" width="2" height="2" fill="currentColor" />
      <rect x="31" y="27" width="2" height="2" fill="currentColor" />
      <rect x="23" y="31" width="2" height="2" fill="currentColor" />
      <rect x="31" y="31" width="2" height="2" fill="currentColor" />
      <g className="scan-icon-line">
        <line
          x1="12"
          y1="24"
          x2="36"
          y2="24"
          stroke="var(--signal)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

function HeroTokenBack() {
  return (
    <div className="hero-token-face back hero-token-face--scan">
      <ScanBarcodeIcon />
    </div>
  );
}

function QueueStatusFace({ className = '' }) {
  return (
    <div className={`queue-status ${className}`.trim()}>
      <span className="queue-stat">
        <svg className="queue-stat-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="6" cy="7" r="2.2" fill="currentColor" />
          <path d="M2.5 18v-1.2c0-1.9 1.5-3.3 3.5-3.3s3.5 1.4 3.5 3.3V18" fill="currentColor" />
          <circle cx="14" cy="7" r="2.2" fill="currentColor" />
          <path d="M10.5 18v-1.2c0-1.9 1.5-3.3 3.5-3.3s3.5 1.4 3.5 3.3V18" fill="currentColor" />
          <circle cx="20" cy="8.5" r="1.6" fill="currentColor" opacity="0.4" />
          <path d="M17.2 18v-.8c0-1.3 1-2.4 2.5-2.4.5 0 1 .1 1.3.3" fill="currentColor" opacity="0.4" />
        </svg>
        <strong>4</strong>
      </span>
      <span className="queue-stat queue-stat--wait">
        <svg className="queue-stat-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M12 7.5V12l3.2 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <strong>27</strong>
        <span className="queue-stat-unit">m</span>
      </span>
    </div>
  );
}

function ManualQueueIcon() {
  return (
    <div className="manual-queue" aria-hidden="true">
      <span className="manual-queue-person" />
      <span className="manual-queue-person" />
      <span className="manual-queue-person" />
      <span className="manual-queue-person dim" />
    </div>
  );
}

const ANNUAL_PRICES = { solo: 5, pack: 20, bulk: 4 };
const MONTHLY_MULT = 2;
const STAFF_APP_URL = 'https://careflow-staff-seven.vercel.app';
const TRY_NOW_URL = `${STAFF_APP_URL}/register`;

export default function App() {
  useLandingScroll();
  const [billing, setBilling] = useState('annual');
  const mult = billing === 'monthly' ? MONTHLY_MULT : 1;
  const solo = ANNUAL_PRICES.solo * mult;
  const pack = ANNUAL_PRICES.pack * mult;
  const bulk = ANNUAL_PRICES.bulk * mult;

  return (
    <>
      <div className="progress-bar" id="progressBar" />
      <div className="wordmark">Pammi.app</div>

      <header className="hero">
        <div className="hero-token" aria-hidden="true">
          <div className="hero-token-inner">
            <div className="hero-token-face front">
              <QueueStatusFace />
            </div>
            <HeroTokenBack />
          </div>
        </div>
        <span className="eyebrow">For clinics</span>
        <h1>
          Scan the code.
          <br />
          Join the doctor&apos;s queue.
        </h1>
        <p className="sub">
          One QR at reception puts patients on the right doctor&apos;s list — with live
          position and wait time on their phone. Patients save time; doctors get a
          predictable day.
        </p>
        <div className="scroll-cue">
          <span>Scroll to see how</span>
          <span className="chev" />
        </div>
      </header>

      <section className="chapter chapter--ink" id="ch1">
        <div className="stage">
          <span className="eyebrow">Problem statement</span>
          <div className="scene" id="scene1">
            <div className="bench">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="figure">
                  <span className="seat" />
                </div>
              ))}
            </div>
            <div className="clock">
              <div className="clock-face">
                <div className="hand hand-hour" />
                <div className="hand hand-min" />
              </div>
            </div>
            <div className="ticket-mini ticket-mini--manual">
              <ManualQueueIcon />
              <span className="q-mark">?</span>
            </div>
          </div>
          <div className="captions" id="captions1">
            <p className="cap">In a manual queue, wait time is a guess.</p>
            <p className="cap">Patients stay stuck in line — unable to leave or get anything done.</p>
            <p className="cap">They never know when their turn will come.</p>
          </div>
        </div>
      </section>

      <section className="chapter chapter--ink" id="ch2">
        <div className="stage">
          <span className="eyebrow">Solution</span>
          <div className="scene scene-scan">
            <div className="ticket-big">
              <div className="ticket-big-inner" id="ticketBig">
                <div className="ticket-front">
                  <QueueStatusFace />
                </div>
                <div className="ticket-back">
                  <ScanBarcodeIcon className="scan-icon scan-icon--lg" />
                </div>
              </div>
            </div>
            <div className="phone" id="phoneScan">
              <div className="phone-screen">
                <div className="scan-line" />
                <div className="check-mark">✓</div>
              </div>
            </div>
          </div>
          <div className="captions" id="captions2">
            <p className="cap">One scan adds the patient to a virtual queue.</p>
            <p className="cap">
              They see their wait time — so they can grab a coffee or get something else done.
            </p>
            <p className="cap">Doctors see what&apos;s ahead, and how much longer their day will run.</p>
          </div>
        </div>
      </section>

      <section className="chapter chapter--paper" id="ch3">
        <div className="stage">
          <div className="tear-edge" />
          <span className="eyebrow">What&apos;s coming next</span>
          <div className="scene scene-roadmap" id="scene3">
            <div className="roadmap">
              <div className="road-card" id="roadLoc">
                <svg className="road-icon" viewBox="0 0 32 32" aria-hidden="true">
                  <path
                    d="M16 4c-4.4 0-8 3.4-8 7.6 0 5.4 8 14.4 8 14.4s8-9 8-14.4C24 7.4 20.4 4 16 4z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="16" cy="11.5" r="2.6" fill="currentColor" />
                </svg>
                <span className="road-card-label">Patient&apos;s location</span>
              </div>

              <div className="road-path" aria-hidden="true">
                <div className="road-line" id="roadLine" />
                <div className="road-badge" id="roadBadge">
                  <svg className="road-badge-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M4 16h12l3-5H8l-1.5-3H4v8z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <circle cx="8" cy="17.5" r="1.4" fill="currentColor" />
                    <circle cx="15" cy="17.5" r="1.4" fill="currentColor" />
                  </svg>
                  <strong id="roadMins">18</strong>
                  <span>min</span>
                </div>
              </div>

              <div className="road-card" id="roadClinic">
                <svg className="road-icon" viewBox="0 0 32 32" aria-hidden="true">
                  <path
                    d="M6 28V12l10-6 10 6v16H6z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path d="M14 28v-8h4v8" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M15 16h2M16 15v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="road-card-label">Clinic</span>
              </div>
            </div>

            <div className="predict-card" id="predictCard">
              <svg className="predict-icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect
                  x="3.5"
                  y="5"
                  width="17"
                  height="15"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M9 15l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="predict-copy">
                <strong>Patient&apos;s arrival time</strong>
                <span>Clinic day stays predictable</span>
              </div>
            </div>
          </div>
          <div className="captions" id="captions3">
            <p className="cap">Next up: travel time from the patient&apos;s location.</p>
            <p className="cap">Pammi knows when they&apos;re on the way — and when they&apos;ll arrive.</p>
            <p className="cap">Clinics stay organized. The doctor&apos;s day becomes predictable.</p>
          </div>
        </div>
      </section>

      <section className="chapter chapter--ink" id="ch4">
        <div className="stage">
          <span className="eyebrow">04 — Meanwhile</span>
          <div className="scene scene-empty" id="scene4">
            <div className="bench">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="figure figure-leave">
                  <span className="seat" />
                </div>
              ))}
            </div>
            <div className="destinations">
              <div className="dest dest-coffee" />
              <div className="dest dest-car" />
              <div className="dest dest-bag" />
            </div>
            <div className="phone-glow" />
          </div>
          <div className="captions" id="captions4">
            <p className="cap">Grab a coffee.</p>
            <p className="cap">Sit in the car. Run one more errand.</p>
            <p className="cap">Your phone taps you the moment it&apos;s your turn.</p>
          </div>
        </div>
      </section>

      <section className="chapter chapter--ink" id="ch5">
        <div className="stage">
          <span className="eyebrow">For the doctor</span>
          <div className="scene">
            <div className="doctor-card" id="doctorCard">
              <span className="dc-label">Now serving</span>
              <div className="dc-now" id="dcNow">
                Priya Nair <span className="dc-token-label">· token 2</span>
              </div>
              <div className="dc-divider" />
              <span className="dc-label">Up next</span>
              <div className="dc-row">
                <span>
                  <span className="dc-token">03</span>Amit Verma
                </span>
                <span>~10m</span>
              </div>
              <div className="dc-row">
                <span>
                  <span className="dc-token">04</span>Appt · 3:30 PM
                </span>
                <span>~20m</span>
              </div>
              <div className="dc-foot">6 waiting today · consulting until 5:00 PM</div>
            </div>
          </div>
          <div className="captions" id="captions5">
            <p className="cap">The doctor sees one queue — theirs.</p>
            <p className="cap">Who&apos;s waiting, who&apos;s up next, who&apos;s already done.</p>
            <p className="cap">
              The schedule keeps it honest — no patients queued outside consult hours.
            </p>
          </div>
        </div>
      </section>

      <section className="chapter chapter--paper" id="ch6">
        <div className="stage">
          <div className="tear-edge" />
          <span className="eyebrow">Transparent pricing</span>
          <div className="scene scene-pricing" id="scene6">
            <div className="billing-toggle" id="priceToggle" role="group" aria-label="Billing period">
              <button
                type="button"
                className={billing === 'annual' ? 'is-active' : undefined}
                onClick={() => setBilling('annual')}
              >
                Annual
              </button>
              <button
                type="button"
                className={billing === 'monthly' ? 'is-active' : undefined}
                onClick={() => setBilling('monthly')}
              >
                Monthly
              </button>
            </div>

            <div className="price-cards">
              <div className="price-card" id="priceFree">
                <svg className="price-card-icon" viewBox="0 0 32 32" aria-hidden="true">
                  <rect
                    x="6"
                    y="12"
                    width="20"
                    height="14"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M10 12V9a6 6 0 0 1 12 0v3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M16 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <strong>Free</strong>
                <span>First month</span>
              </div>

              <div className="price-card" id="priceSolo">
                <svg className="price-card-icon" viewBox="0 0 32 32" aria-hidden="true">
                  <circle cx="16" cy="11" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M8 26c0-4.4 3.6-7 8-7s8 2.6 8 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <strong>
                  ${solo}
                  <span className="price-card-amt-unit"> / doctor</span>
                </strong>
                <span>{billing === 'annual' ? 'Billed annually' : 'Billed monthly'}</span>
              </div>

              <div className="price-card" id="pricePack">
                <svg className="price-card-icon" viewBox="0 0 32 32" aria-hidden="true">
                  <circle cx="11" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="21" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M5 24c0-3.3 2.7-5 6-5s6 1.7 6 5M15 24c0-3.3 2.7-5 6-5s6 1.7 6 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <strong>
                  ${pack}
                  <span className="price-card-amt-unit"> for 5 doctors</span>
                </strong>
                <span>Group pack</span>
              </div>
            </div>

            <div className="price-actions" id="priceActions">
              <a className="price-btn price-btn--primary" href={TRY_NOW_URL}>
                Try now
              </a>
              <a
                className="price-btn price-btn--ghost"
                href="mailto:hello@pammi.app?subject=Refer%20a%20clinic"
              >
                Refer to get one more month free
              </a>
            </div>
          </div>
          <div className="captions" id="captions6">
            <p className="cap">First month free — then ${solo} per doctor.</p>
            <p className="cap">${pack} covers five doctors as a group pack.</p>
            <p className="cap">
              Scaling past five? ${bulk} per doctor. Monthly plans are double annual.
            </p>
          </div>
        </div>
      </section>

      <section className="closing" id="closing">
        <span className="eyebrow">In short</span>
        <h2>
          One QR code.
          <br />A calmer waiting room.
        </h2>
        <p className="sub">
          Patients check their position from anywhere. The front desk runs every doctor&apos;s queue
          from one screen. Doctors see only their own — who&apos;s waiting, who&apos;s up next. No
          new hardware, no app to install — just a code by the door.
        </p>
        <a className="cta" id="tryNowSlot" href={TRY_NOW_URL}>
          Try now
        </a>
      </section>

      <footer>
        <div className="foot-brand">Pammi.app</div>
        <p>Built for clinics that don&apos;t want a waiting room to feel like one.</p>
        <p>hello@pammi.app</p>
      </footer>

      <div className="try-now-bar" id="tryNowBar">
        <a className="try-now-bar-btn" id="tryNowBtn" href={TRY_NOW_URL}>
          Try now
        </a>
      </div>
    </>
  );
}
