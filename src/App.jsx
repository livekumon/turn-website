import useLandingScroll from './hooks/useLandingScroll';

function QrGrid() {
  const pattern = [
    [1, 0, 1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 0],
    [1, 1, 0, 1, 1, 0, 1],
    [0, 0, 1, 0, 1, 1, 0],
    [1, 1, 0, 1, 0, 1, 1],
  ];
  return (
    <div className="qr-grid">
      {pattern.flat().map((on, i) => (
        <span key={i} className={on ? undefined : 'off'} />
      ))}
    </div>
  );
}

function HeroTokenBack() {
  const cells = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="hero-token-face back">
      {cells.map((i) => (
        <span key={i} className={i % 3 === 2 || i % 7 === 0 ? 'off' : undefined} />
      ))}
    </div>
  );
}

export default function App() {
  useLandingScroll();

  return (
    <>
      <div className="progress-bar" id="progressBar" />
      <div className="wordmark">Turn</div>

      <header className="hero">
        <div className="hero-token" aria-hidden="true">
          <div className="hero-token-inner">
            <div className="hero-token-face front">
              <span>042</span>
            </div>
            <HeroTokenBack />
          </div>
        </div>
        <span className="eyebrow">For clinics</span>
        <h1>
          Scan a code.
          <br />
          Skip the wait.
        </h1>
        <p className="sub">
          Turn replaces the crowded waiting room with one QR code — patients see their live
          position, clinics see every queue, nobody stands around guessing.
        </p>
        <div className="scroll-cue">
          <span>Scroll to see how</span>
          <span className="chev" />
        </div>
      </header>

      <section className="chapter chapter--ink" id="ch1">
        <div className="stage">
          <span className="eyebrow">01 — Right now</span>
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
            <div className="ticket-mini">
              <span className="ticket-num">042</span>
              <span className="q-mark">?</span>
            </div>
          </div>
          <div className="captions" id="captions1">
            <p className="cap">A paper token. A number scrawled on it.</p>
            <p className="cap">You sit. You wait. You watch the door.</p>
            <p className="cap">Nobody can tell you how long — not even the receptionist.</p>
          </div>
        </div>
      </section>

      <section className="chapter chapter--ink" id="ch2">
        <div className="stage">
          <span className="eyebrow">02 — At the door</span>
          <div className="scene scene-scan">
            <div className="ticket-big">
              <div className="ticket-big-inner" id="ticketBig">
                <div className="ticket-front">
                  <span className="ticket-label">TOKEN</span>
                  <span className="ticket-num-big">042</span>
                </div>
                <div className="ticket-back">
                  <QrGrid />
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
            <p className="cap">No app to download.</p>
            <p className="cap">No form to fill in at reception.</p>
            <p className="cap">
              Walk in and join the queue — or scan to check in for the appointment you already
              booked.
            </p>
          </div>
        </div>
      </section>

      <section className="chapter chapter--paper" id="ch3">
        <div className="stage">
          <div className="tear-edge" />
          <span className="eyebrow">03 — After you scan</span>
          <div className="scene">
            <div className="phone phone-live">
              <div className="phone-screen">
                <span className="live-label">Your position</span>
                <div className="live-ring-wrap">
                  <svg width="96" height="96" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="6"
                    />
                    <circle
                      id="liveRingFill"
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="var(--signal)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      strokeDasharray="264"
                      strokeDashoffset="264"
                    />
                  </svg>
                  <span className="live-number" id="liveNumber">
                    14
                  </span>
                </div>
                <span className="live-sub">until it&apos;s your turn</span>
                <span className="status-pill" id="statusPill">
                  Waiting
                </span>
              </div>
            </div>
          </div>
          <div className="captions" id="captions3">
            <p className="cap">See your exact position.</p>
            <p className="cap">Waiting, serving, done — your status updates the moment it changes.</p>
            <p className="cap">The estimate adjusts to how the doctor is actually running today.</p>
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

      <section className="chapter chapter--paper" id="ch5">
        <div className="stage">
          <div className="tear-edge" />
          <span className="eyebrow">05 — At the front desk</span>
          <div className="scene scene-shots">
            <div className="shot-frame">
              <img
                className="shot"
                data-key="front_desk"
                alt="Front Desk screen showing the waiting list, now serving, and call first patient"
                src="/assets/visual-1.png"
              />
              <img
                className="shot"
                data-key="qr_modal"
                alt="Doctor QR code screen for patients to scan and join the queue"
                src="/assets/visual-2.png"
              />
              <img
                className="shot"
                data-key="doctors_hours"
                alt="Doctors screen for setting consult hours and appointment check-in window"
                src="/assets/visual-3.png"
              />
            </div>
          </div>
          <div className="captions" id="captions5">
            <p className="cap">
              One screen for every doctor&apos;s queue — call next, mark no-shows, add walk-ins on
              the spot.
            </p>
            <p className="cap">
              Each doctor gets their own QR, ready to show or print — no separate kiosk needed.
            </p>
            <p className="cap">
              Set consult hours once. Appointment check-in windows catch no-shows automatically.
            </p>
          </div>
        </div>
      </section>

      <section className="chapter chapter--ink" id="ch6">
        <div className="stage">
          <span className="eyebrow">06 — For the doctor</span>
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
          <div className="captions" id="captions6">
            <p className="cap">The doctor sees one queue — theirs.</p>
            <p className="cap">Who&apos;s waiting, who&apos;s up next, who&apos;s already done.</p>
            <p className="cap">
              The schedule keeps it honest — no patients queued outside consult hours.
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
        <a className="cta" href="mailto:hello@turn.clinic">
          Get in touch
        </a>
      </section>

      <footer>
        <div className="foot-brand">Turn</div>
        <p>Built for clinics that don&apos;t want a waiting room to feel like one.</p>
        <p>hello@turn.clinic</p>
      </footer>
    </>
  );
}
