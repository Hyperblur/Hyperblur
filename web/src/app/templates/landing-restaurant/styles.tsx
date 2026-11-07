const css = `
.hbl-rs {
  position: relative;
  isolation: isolate;
  overflow-x: clip;
  background: #f6efe3;
  color: #2a2420;
  font-family: var(--font-grotesk);
  color-scheme: light;
  -webkit-font-smoothing: antialiased;
}
.hbl-rs ::selection { background: #e7a93b; color: #1d1a17; }
.hbl-rs a { color: inherit; }
.hbl-rs a:focus-visible,
.hbl-rs button:focus-visible,
.hbl-rs select:focus-visible,
.hbl-rs [tabindex]:focus-visible {
  outline: 2px solid #c8553d;
  outline-offset: 3px;
}
.hbl-rs-reviews :focus-visible,
.hbl-rs-final :focus-visible,
.hbl-rs-footer :focus-visible,
.hbl-rs-board :focus-visible,
.hbl-rs-private :focus-visible { outline-color: #e7a93b !important; }
.hbl-rs-wrap { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.hbl-rs-section { position: relative; padding: 120px 0; }
.hbl-rs-min0 { min-width: 0; }
.hbl-rs-mono { font-family: var(--font-mono); letter-spacing: 0.02em; }
.hbl-rs-muted { color: #6b5f53; font-size: 12.5px; }
.hbl-rs-sr {
  position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden;
  clip-path: inset(50%); white-space: nowrap;
}
.hbl-rs-serif-i { font-family: var(--font-serif); font-style: italic; font-size: 1.35em; color: #a8432e; }
.hbl-rs-dot {
  position: relative;
  display: inline-block;
  flex: none;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #6b7a3a;
  box-shadow: 0 0 0 0 rgba(107,122,58,.5);
  animation: hbl-rs-ping 2.4s ease-out infinite;
}

.hbl-rs-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border: 1px solid transparent;
  border-radius: 999px;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: transform .25s cubic-bezier(.34,1.56,.64,1), background-color .2s ease, box-shadow .25s ease, border-color .2s ease, color .2s ease;
}
.hbl-rs-btn:hover { transform: translateY(-1px); }
.hbl-rs-btn:active { transform: translateY(0) scale(.98); }
.hbl-rs-btn-primary {
  background: #c8553d;
  color: #fff !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 10px 24px -12px rgba(200,85,61,.8);
}
.hbl-rs-btn-primary:hover { background: #b84a33; box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 16px 30px -12px rgba(200,85,61,.9); }
.hbl-rs-btn-primary:disabled { background: #b9ab96; box-shadow: none; cursor: not-allowed; transform: none; }
.hbl-rs-btn-ghost { border-color: rgba(42,36,32,.2); background: rgba(255,250,241,.6); color: #2a2420; }
.hbl-rs-btn-ghost:hover { border-color: rgba(42,36,32,.45); background: #fffaf1; }
.hbl-rs-btn-dark { background: #1d1a17; color: #f6efe3 !important; }
.hbl-rs-btn-dark:hover { background: #2f2925; }
.hbl-rs-btn-cream { background: #f6efe3; color: #1d1a17 !important; }
.hbl-rs-btn-cream:hover { background: #fffaf1; }
.hbl-rs-btn-outline-light { border-color: rgba(246,239,227,.3); color: #f6efe3 !important; }
.hbl-rs-btn-outline-light:hover { border-color: rgba(246,239,227,.7); background: rgba(246,239,227,.06); }
.hbl-rs-btn-sm { padding: 9px 16px; font-size: 14px; }
.hbl-rs-btn-lg { padding: 15px 26px; font-size: 16px; }
.hbl-rs-btn-block { display: flex; width: 100%; }

.hbl-rs-nav {
  position: relative;
  z-index: 5;
  max-width: 1200px;
  margin: 0 auto;
  padding: 22px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.hbl-rs-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-family: var(--font-serif);
  font-size: 26px;
  line-height: 1;
  color: #1d1a17;
  border-radius: 8px;
}
.hbl-rs-brand em { font-style: italic; color: #c8553d; }
.hbl-rs-brand-light { color: #f6efe3; }
.hbl-rs-brand-light em { color: #e7a93b; }
.hbl-rs-links { display: flex; gap: 6px; }
.hbl-rs-links a {
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 14.5px;
  font-weight: 500;
  color: #4a3f37;
  text-decoration: none;
  transition: background-color .2s ease, color .2s ease;
}
.hbl-rs-links a:hover { background: rgba(42,36,32,.07); color: #1d1a17; }
.hbl-rs-nav-end { display: flex; align-items: center; gap: 16px; }
.hbl-rs-phone {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: #4a3f37;
  text-decoration: none;
  border-radius: 6px;
}
.hbl-rs-phone:hover { color: #a8432e; }

.hbl-rs-hero { position: relative; padding: 40px 0 110px; }
.hbl-rs-hero-wash {
  position: absolute;
  inset: -120px 0 0;
  z-index: -1;
  background:
    radial-gradient(600px 420px at 85% 20%, rgba(231,169,59,.28), transparent 70%),
    radial-gradient(520px 380px at 70% 75%, rgba(200,85,61,.16), transparent 70%),
    radial-gradient(500px 360px at 0% 90%, rgba(107,122,58,.14), transparent 70%);
  pointer-events: none;
}
.hbl-rs-hero-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr);
  gap: 56px;
  align-items: center;
}
.hbl-rs-hero-copy { min-width: 0; }
.hbl-rs-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 26px;
  padding: 7px 14px 7px 12px;
  border: 1px solid rgba(42,36,32,.14);
  border-radius: 999px;
  background: rgba(255,250,241,.7);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: .04em;
  color: #4a3f37;
}
.hbl-rs-h1 {
  margin: 0;
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: clamp(46px, 6.8vw, 84px);
  line-height: .98;
  letter-spacing: -.02em;
  color: #1d1a17;
}
.hbl-rs-h1-line { display: block; }
.hbl-rs-rot { font-style: italic; color: #c8553d; }
.hbl-rs-lede {
  max-width: 520px;
  margin: 28px 0 0;
  font-size: 18px;
  line-height: 1.6;
  color: #4a3f37;
}
.hbl-rs-hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 34px; }
.hbl-rs-proof {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px 28px;
  margin-top: 40px;
  padding-top: 26px;
  border-top: 1px solid rgba(42,36,32,.12);
}
.hbl-rs-proof-t { display: flex; flex-direction: column; gap: 3px; }
.hbl-rs-proof-stars { display: inline-flex; align-items: center; gap: 8px; }
.hbl-rs-proof-stars b { font-size: 15px; }
.hbl-rs-proof small, .hbl-rs-proof-hours small { font-size: 12.5px; color: #6b5f53; }
.hbl-rs-proof-hours { display: inline-flex; align-items: center; gap: 10px; color: #6b7a3a; }
.hbl-rs-proof-hours span { display: flex; flex-direction: column; gap: 2px; }
.hbl-rs-proof-hours b { font-size: 14px; color: #2a2420; }
.hbl-rs-hero-side { position: relative; min-width: 0; }
.hbl-rs-res-slot { position: relative; z-index: 3; max-width: 460px; margin: -150px auto 0; }

.hbl-rs-stage { position: relative; height: 470px; }
.hbl-rs-oven {
  position: absolute;
  left: 4%;
  top: 0;
  width: 62%;
  height: 400px;
  overflow: hidden;
  border-radius: 999px 999px 36px 36px;
  background: radial-gradient(120% 80% at 50% 100%, #3a2219, #1d1a17 70%);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.05), inset 0 -40px 80px rgba(200,85,61,.25), 0 40px 80px -40px rgba(29,26,23,.6);
}
.hbl-rs-oven-bricks {
  position: absolute;
  inset: 0;
  opacity: .16;
  background-image:
    linear-gradient(rgba(246,239,227,.6) 1px, transparent 1px),
    linear-gradient(90deg, rgba(246,239,227,.6) 1px, transparent 1px);
  background-size: 52px 26px, 52px 52px;
  background-position: 0 0, 26px 0;
  mask-image: linear-gradient(to bottom, #000, transparent 70%);
}
.hbl-rs-oven-glow {
  position: absolute;
  left: 50%;
  bottom: -60px;
  width: 340px;
  height: 260px;
  translate: -50% 0;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(231,169,59,.75), rgba(200,85,61,.35) 55%, transparent);
  filter: blur(10px);
  animation: hbl-rs-glow 3.2s ease-in-out infinite;
}
.hbl-rs-flame {
  position: absolute;
  left: 50%;
  bottom: 20px;
  width: 210px;
  height: 252px;
  translate: -50% 0;
  overflow: visible;
}
.hbl-rs-flame-a, .hbl-rs-flame-b, .hbl-rs-flame-c { transform-box: fill-box; transform-origin: 50% 100%; }
.hbl-rs-flame-a { animation: hbl-rs-flick 2.6s ease-in-out infinite; }
.hbl-rs-flame-b { animation: hbl-rs-flick 1.9s ease-in-out infinite reverse; }
.hbl-rs-flame-c { animation: hbl-rs-flick 1.3s ease-in-out infinite; }
.hbl-rs-embers { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hbl-rs-ember {
  position: absolute;
  bottom: 12%;
  border-radius: 50%;
  background: #e7a93b;
  box-shadow: 0 0 6px 1px rgba(231,169,59,.8);
  opacity: 0;
  animation: hbl-rs-rise 6s linear infinite;
}
.hbl-rs-ember-hot { background: #ffe1a1; box-shadow: 0 0 8px 2px rgba(255,190,90,.9); }
.hbl-rs-plate-wrap {
  position: absolute;
  right: 0;
  top: 40px;
  width: 54%;
  max-width: 290px;
  aspect-ratio: 1;
  filter: drop-shadow(0 30px 40px rgba(29,26,23,.35));
}
.hbl-rs-plate { width: 100%; height: 100%; animation: hbl-rs-spin 80s linear infinite; }
.hbl-rs-ing {
  position: absolute;
  display: block;
  filter: drop-shadow(0 10px 12px rgba(29,26,23,.25));
  animation: hbl-rs-float 6s ease-in-out infinite;
}
.hbl-rs-ing svg { display: block; width: 100%; height: 100%; }
.hbl-rs-ing-1 { width: 58px; height: 58px; right: 46%; top: 10px; animation-delay: -1s; }
.hbl-rs-ing-2 { width: 64px; height: 64px; right: 2%; top: 300px; animation-delay: -2.4s; }
.hbl-rs-ing-3 { width: 92px; height: 92px; right: 30%; top: 250px; animation-delay: -3.8s; }
.hbl-rs-ing-4 { width: 60px; height: 60px; right: 4%; top: 0; animation-delay: -.6s; }
.hbl-rs-ing-5 { width: 44px; height: 44px; left: 0; top: 140px; animation-delay: -4.6s; }
.hbl-rs-ing-6 { width: 46px; height: 46px; left: 58%; top: 330px; animation-delay: -2s; }

.hbl-rs-res {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
  border: 1px solid #e6d9c3;
  border-radius: 24px;
  background: #fffaf1;
  box-shadow: inset 0 1px 0 #fff, 0 40px 70px -36px rgba(29,26,23,.55), 0 2px 6px rgba(29,26,23,.06);
  scroll-margin-top: 90px;
}
.hbl-rs-res-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.hbl-rs-res-title { margin: 0; font-family: var(--font-serif); font-weight: 400; font-size: 30px; line-height: 1.05; color: #1d1a17; }
.hbl-rs-res-live { display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; color: #4f5a2a; font-weight: 500; }
.hbl-rs-field { margin: 0; padding: 0; border: 0; min-width: 0; display: flex; flex-direction: column; gap: 8px; }
.hbl-rs-field-grow { flex: 1; }
.hbl-rs-legend { padding: 0; margin-bottom: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: .12em; color: #6b5f53; }
.hbl-rs-field:not(fieldset) .hbl-rs-legend { margin-bottom: 0; }
.hbl-rs-days { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 6px; }
.hbl-rs-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 0 9px;
  border: 1px solid #e6d9c3;
  border-radius: 12px;
  background: #f6efe3;
  color: #2a2420;
  font: inherit;
  cursor: pointer;
  transition: background-color .2s ease, border-color .2s ease, color .2s ease, transform .2s ease;
}
.hbl-rs-day:hover:not(:disabled) { border-color: #c8553d; }
.hbl-rs-day[aria-pressed="true"] { background: #1d1a17; border-color: #1d1a17; color: #f6efe3; transform: translateY(-2px); }
.hbl-rs-day:disabled { opacity: .45; cursor: not-allowed; }
.hbl-rs-day:disabled .hbl-rs-day-n { text-decoration: line-through; }
.hbl-rs-day-dow { font-family: var(--font-mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: .06em; opacity: .75; }
.hbl-rs-day-n { font-family: var(--font-serif); font-size: 22px; line-height: 1; }
.hbl-rs-times { display: flex; flex-wrap: wrap; gap: 6px; }
.hbl-rs-time {
  padding: 8px 12px;
  border: 1px solid #e6d9c3;
  border-radius: 999px;
  background: transparent;
  color: #2a2420;
  font-family: var(--font-mono);
  font-size: 13px;
  cursor: pointer;
  transition: background-color .2s ease, border-color .2s ease, color .2s ease;
}
.hbl-rs-time:hover:not(:disabled) { border-color: #c8553d; color: #a8432e; }
.hbl-rs-time[aria-pressed="true"] { background: #c8553d; border-color: #c8553d; color: #fff; }
.hbl-rs-time:disabled { color: #a99c8b; text-decoration: line-through; cursor: not-allowed; background: rgba(42,36,32,.03); }
.hbl-rs-res-row { display: flex; gap: 12px; align-items: flex-end; flex-wrap: wrap; }
.hbl-rs-stepper {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border: 1px solid #e6d9c3;
  border-radius: 999px;
  background: #f6efe3;
}
.hbl-rs-stepper button {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  background: #fffaf1;
  color: #2a2420;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(29,26,23,.12);
}
.hbl-rs-stepper button:hover:not(:disabled) { background: #1d1a17; color: #f6efe3; }
.hbl-rs-stepper button:disabled { opacity: .4; cursor: not-allowed; }
.hbl-rs-stepper output { min-width: 28px; text-align: center; font-family: var(--font-serif); font-size: 22px; }
.hbl-rs-select {
  width: 100%;
  min-width: 0;
  height: 44px;
  padding: 0 38px 0 14px;
  border: 1px solid #e6d9c3;
  border-radius: 999px;
  background: #f6efe3 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%232a2420' stroke-width='1.8'%3E%3Cpath d='M2.5 4.5 6 8l3.5-3.5'/%3E%3C/svg%3E") no-repeat right 14px center;
  color: #2a2420;
  font: inherit;
  font-size: 14px;
  appearance: none;
  cursor: pointer;
}
.hbl-rs-select:hover { border-color: #c8553d; }
.hbl-rs-res-fine { margin: 0; font-size: 12.5px; line-height: 1.5; color: #6b5f53; text-align: center; }
.hbl-rs-res-done { align-items: center; text-align: center; gap: 12px; animation: hbl-rs-pop .5s cubic-bezier(.34,1.56,.64,1) both; }
.hbl-rs-res-check {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #6b7a3a;
  color: #fff;
  box-shadow: 0 0 0 8px rgba(107,122,58,.15);
}
.hbl-rs-res-kicker { margin: 4px 0 0; font-size: 11.5px; text-transform: uppercase; letter-spacing: .12em; color: #4f5a2a; }
.hbl-rs-res-sum { margin: 0; font-size: 15px; line-height: 1.5; color: #4a3f37; }
.hbl-rs-res-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; margin: 4px 0; }
.hbl-rs-res-meta div { padding: 12px; border: 1px dashed #d9c9ae; border-radius: 14px; }
.hbl-rs-res-meta dt { font-size: 11px; text-transform: uppercase; letter-spacing: .1em; color: #6b5f53; }
.hbl-rs-res-meta dd { margin: 4px 0 0; font-size: 16px; font-weight: 600; color: #1d1a17; }

.hbl-rs-press { padding: 34px 0 90px; }
.hbl-rs-press .hb-mq { padding: 22px 0; border-top: 1px solid rgba(42,36,32,.12); border-bottom: 1px solid rgba(42,36,32,.12); }
.hbl-rs-press-item { display: inline-flex; align-items: baseline; gap: 12px; white-space: nowrap; }
.hbl-rs-press-name { font-family: var(--font-serif); font-size: 26px; color: #1d1a17; }
.hbl-rs-press-note { font-family: var(--font-mono); font-size: 12px; color: #6b5f53; }
.hbl-rs-press-item::after { content: ""; width: 6px; height: 6px; margin-left: 44px; border-radius: 50%; background: #c8553d; align-self: center; }
.hbl-rs-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px; margin: 70px 0 0; }
.hbl-rs-stats > div { display: flex; flex-direction: column-reverse; gap: 8px; padding-left: 20px; border-left: 1px solid rgba(42,36,32,.14); }
.hbl-rs-stats dt { font-size: 13.5px; color: #6b5f53; }
.hbl-rs-stats dd { margin: 0; font-family: var(--font-serif); font-size: clamp(48px, 6vw, 72px); line-height: 1; color: #1d1a17; letter-spacing: -.02em; }
.hbl-rs-stats-unit { font-size: .45em; color: #a8432e; margin-left: 4px; }

.hbl-rs-kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 18px;
  font-family: var(--font-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: .16em;
  color: #a8432e;
}
.hbl-rs-kicker::before { content: ""; width: 22px; height: 1px; background: currentColor; }
.hbl-rs-kicker-light { color: #e7a93b; }
.hbl-rs-h2 {
  margin: 0;
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: clamp(38px, 5.2vw, 64px);
  line-height: 1.02;
  letter-spacing: -.015em;
  color: #1d1a17;
}
.hbl-rs-h2 em { font-style: italic; color: #c8553d; }
.hbl-rs-h2-light { color: #f6efe3; }
.hbl-rs-h2-light em { color: #e7a93b; }
.hbl-rs-h3 { margin: 0; font-family: var(--font-serif); font-weight: 400; font-size: 30px; line-height: 1.1; color: #1d1a17; }
.hbl-rs-p { margin: 22px 0 0; font-size: 17px; line-height: 1.7; color: #4a3f37; max-width: 560px; }
.hbl-rs-sub { margin: 18px 0 0; max-width: 520px; font-size: 17px; line-height: 1.6; color: #5a4e44; }
.hbl-rs-sub a { color: #a8432e; text-underline-offset: 3px; }
.hbl-rs-head { margin-bottom: 56px; }
.hbl-rs-head-split { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
.hbl-rs-head-split .hbl-rs-sub { margin: 0; max-width: 420px; }
.hbl-rs-head-center { text-align: center; }
.hbl-rs-head-center .hbl-rs-kicker { justify-content: center; }
.hbl-rs-head-center .hbl-rs-sub { margin-left: auto; margin-right: auto; }

.hbl-rs-story { padding-top: 40px; }
.hbl-rs-story-grid { display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr); gap: 80px; align-items: center; }
.hbl-rs-chef { margin: 0; }
.hbl-rs-chef-arch {
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: 999px 999px 28px 28px;
  overflow: visible;
}
.hbl-rs-chef-svg {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 999px 999px 28px 28px;
  box-shadow: 0 40px 80px -40px rgba(122,47,32,.7);
}
.hbl-rs-chef-leaf { position: absolute; display: block; animation: hbl-rs-float 7s ease-in-out infinite; }
.hbl-rs-chef-leaf svg { width: 100%; height: 100%; display: block; }
.hbl-rs-chef-leaf-1 { width: 70px; height: 70px; right: -20px; top: 22%; }
.hbl-rs-chef-leaf-2 { width: 60px; height: 60px; left: -18px; bottom: 18%; animation-delay: -3s; }
.hbl-rs-chef figcaption { display: flex; flex-direction: column; gap: 4px; margin-top: 20px; }
.hbl-rs-chef-name { font-family: var(--font-serif); font-size: 26px; color: #1d1a17; }
.hbl-rs-chef figcaption .hbl-rs-mono { font-size: 12px; color: #6b5f53; }
.hbl-rs-quote { margin: 34px 0 0; padding: 0 0 0 22px; border-left: 2px solid #c8553d; }
.hbl-rs-quote p { margin: 0; font-family: var(--font-serif); font-style: italic; font-size: 28px; line-height: 1.25; color: #1d1a17; }
.hbl-rs-sign { display: block; margin-top: 10px; font-family: var(--font-serif); font-style: italic; font-size: 22px; color: #a8432e; }
.hbl-rs-sign::before { content: "— "; }
.hbl-rs-facts { list-style: none; margin: 38px 0 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
.hbl-rs-fact { display: flex; flex-direction: column; gap: 12px; height: 100%; padding: 18px; border: 1px solid rgba(42,36,32,.1); border-radius: 18px; background: rgba(255,250,241,.7); }
.hbl-rs-fact b { display: block; font-size: 15px; color: #1d1a17; }
.hbl-rs-fact small { display: block; margin-top: 4px; font-size: 13px; line-height: 1.5; color: #6b5f53; }
.hbl-rs-fact-ic { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 12px; background: #1d1a17; color: #e7a93b; }

.hbl-rs-band { padding: 26px 0; border-top: 1px solid rgba(42,36,32,.12); border-bottom: 1px solid rgba(42,36,32,.12); background: #efe4d2; }
.hbl-rs-band-row { font-family: var(--font-serif); font-style: italic; font-size: clamp(36px, 5.6vw, 68px); line-height: 1.15; color: #c8553d; }
.hbl-rs-band-row-2 { color: #4f5a2a; font-style: normal; }

.hbl-rs-menu-grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, .75fr); gap: 28px; align-items: stretch; }
.hbl-rs-menu-grid > .hb-fv { min-width: 0; }
.hbl-rs-board {
  position: relative;
  height: 100%;
  padding: 28px;
  border-radius: 28px;
  background:
    radial-gradient(600px 300px at 100% 0%, rgba(200,85,61,.18), transparent 70%),
    radial-gradient(500px 300px at 0% 100%, rgba(107,122,58,.18), transparent 70%),
    #1d1a17;
  color: #f6efe3;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 40px 80px -50px rgba(29,26,23,.8);
}
.hbl-rs-tabs {
  display: flex;
  gap: 6px;
  padding: 5px;
  overflow-x: auto;
  border: 1px solid rgba(246,239,227,.12);
  border-radius: 999px;
  background: rgba(246,239,227,.04);
  scrollbar-width: none;
}
.hbl-rs-tabs::-webkit-scrollbar { display: none; }
.hbl-rs-tab {
  flex: none;
  padding: 9px 16px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #cdbfa9;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color .25s ease, color .25s ease;
}
.hbl-rs-tab:hover { color: #f6efe3; }
.hbl-rs-tab[aria-selected="true"] { background: #f6efe3; color: #1d1a17; }
.hbl-rs-tab:focus-visible { outline-offset: -2px; }
.hbl-rs-board-note { margin: 24px 0 8px; font-size: 12px; color: #b9ab96; text-transform: uppercase; letter-spacing: .1em; }
.hbl-rs-dishes { list-style: none; margin: 0; padding: 0; }
.hbl-rs-dish { padding: 16px 0; border-bottom: 1px solid rgba(246,239,227,.08); animation: hbl-rs-up .5s cubic-bezier(.22,.8,.24,1) both; }
.hbl-rs-dish:last-child { border-bottom: 0; }
.hbl-rs-dish-line { display: flex; align-items: baseline; gap: 10px; min-width: 0; }
.hbl-rs-dish-name { font-family: var(--font-serif); font-size: 23px; line-height: 1.15; color: #f6efe3; min-width: 0; }
.hbl-rs-leader { flex: 1; min-width: 24px; border-bottom: 2px dotted rgba(246,239,227,.3); transform: translateY(-5px); }
.hbl-rs-dish-price { flex: none; font-size: 15px; color: #e7a93b; }
.hbl-rs-dish-desc { margin: 4px 0 0; font-size: 14px; line-height: 1.5; color: #b9ab96; }
.hbl-rs-tag {
  display: inline-block;
  margin-left: 8px;
  padding: 1px 6px;
  border: 1px solid rgba(165,180,110,.5);
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 10px;
  text-decoration: none;
  color: #c6d18f;
  vertical-align: 2px;
  cursor: help;
}
.hbl-rs-board-foot { margin: 18px 0 0; font-size: 11.5px; color: #a3957f; }

.hbl-rs-sig-tilt { display: block; width: 100%; height: 100%; border-radius: 28px; }
.hbl-rs-sig {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid #e6d9c3;
  border-radius: 28px;
  background: #fffaf1;
  box-shadow: 0 30px 60px -40px rgba(29,26,23,.5);
}
.hbl-rs-sig-art {
  position: relative;
  height: 300px;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: radial-gradient(80% 80% at 50% 60%, #4a2a1d, #1d1a17);
}
.hbl-rs-sig-glow { position: absolute; inset: auto 10% -40% 10%; height: 70%; border-radius: 50%; background: radial-gradient(closest-side, rgba(231,169,59,.55), transparent); animation: hbl-rs-glow 3.6s ease-in-out infinite; }
.hbl-rs-sig-plate { position: relative; width: 220px; height: 220px; filter: drop-shadow(0 24px 30px rgba(0,0,0,.5)); }
.hbl-rs-sig-ing { position: absolute; display: block; animation: hbl-rs-float 6s ease-in-out infinite; }
.hbl-rs-sig-ing svg { width: 100%; height: 100%; display: block; }
.hbl-rs-sig-ing-1 { width: 54px; height: 54px; left: 12%; top: 18%; }
.hbl-rs-sig-ing-2 { width: 80px; height: 80px; right: 8%; bottom: 10%; animation-delay: -2.5s; }
.hbl-rs-sig-badge {
  position: absolute;
  left: 16px;
  top: 16px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #e7a93b;
  color: #1d1a17;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .1em;
}
.hbl-rs-sig-body { padding: 24px 24px 26px; }
.hbl-rs-sig-top { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.hbl-rs-sig-top h3 { margin: 0; font-family: var(--font-serif); font-weight: 400; font-size: 28px; line-height: 1.1; color: #1d1a17; }
.hbl-rs-sig-price { font-size: 18px; color: #a8432e; }
.hbl-rs-sig-body > p { margin: 12px 0 0; font-size: 15px; line-height: 1.6; color: #4a3f37; }
.hbl-rs-sig-meta { list-style: none; margin: 18px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
.hbl-rs-sig-meta li { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 999px; background: #efe4d2; font-size: 13px; color: #4a3f37; }

.hbl-rs-season { margin-top: 72px; }
.hbl-rs-season-head { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 24px; }
.hbl-rs-season-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.hbl-rs-season-tilt { display: block; width: 100%; border-radius: 22px; }
.hbl-rs-season-card { overflow: hidden; border: 1px solid #e6d9c3; border-radius: 22px; background: #fffaf1; transition: box-shadow .3s ease; }
.hbl-rs-season-tilt:hover .hbl-rs-season-card { box-shadow: 0 30px 50px -30px rgba(29,26,23,.45); }
.hbl-rs-season-art { display: block; width: 100%; height: auto; aspect-ratio: 200 / 140; }
.hbl-rs-season-body { padding: 18px 20px 22px; }
.hbl-rs-season-top { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
.hbl-rs-season-top h4 { margin: 0; font-family: var(--font-serif); font-weight: 400; font-size: 23px; color: #1d1a17; }
.hbl-rs-season-top span { color: #a8432e; font-size: 15px; }
.hbl-rs-season-body p { margin: 6px 0 0; font-size: 14px; line-height: 1.5; color: #5a4e44; }
.hbl-rs-midcta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 56px;
  padding: 18px 18px 18px 28px;
  border: 1px solid #e6d9c3;
  border-radius: 999px;
  background: #fffaf1;
}
.hbl-rs-midcta p { margin: 0; font-size: 15.5px; color: #4a3f37; }

.hbl-rs-room { background: linear-gradient(180deg, #f6efe3, #efe4d2); }
.hbl-rs-gallery { list-style: none; margin: 0; padding: 0; display: flex; gap: 12px; height: 480px; }
.hbl-rs-scene {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  border-radius: 24px;
  cursor: pointer;
  outline-offset: 4px;
  transition: flex-grow .7s cubic-bezier(.22,.8,.24,1), box-shadow .4s ease;
  box-shadow: 0 20px 40px -30px rgba(29,26,23,.6);
}
.hbl-rs-scene:hover, .hbl-rs-scene:focus-visible { flex-grow: 3.4; }
.hbl-rs-gallery:not(:hover):not(:focus-within) .hbl-rs-scene:first-child { flex-grow: 3.4; }
.hbl-rs-scene-art { position: absolute; inset: 0; }
.hbl-rs-scene-art > svg { display: block; width: 100%; height: 100%; transition: transform 1s cubic-bezier(.22,.8,.24,1); }
.hbl-rs-scene:hover .hbl-rs-scene-art > svg, .hbl-rs-scene:focus-visible .hbl-rs-scene-art > svg { transform: scale(1.05); }
.hbl-rs-scene-embers .hbl-rs-ember { bottom: 4%; }
.hbl-rs-scene-cap {
  position: absolute;
  inset: auto 0 0;
  padding: 60px 20px 20px;
  background: linear-gradient(to top, rgba(20,14,11,.88), rgba(20,14,11,.5) 55%, transparent);
  color: #f6efe3;
}
.hbl-rs-scene-seats { display: inline-block; padding: 4px 9px; border: 1px solid rgba(246,239,227,.3); border-radius: 999px; font-size: 10.5px; text-transform: uppercase; letter-spacing: .1em; white-space: nowrap; }
.hbl-rs-scene-cap h3 { margin: 10px 0 0; font-family: var(--font-serif); font-weight: 400; font-size: 26px; line-height: 1.05; white-space: nowrap; }
.hbl-rs-scene-cap p {
  max-width: 300px;
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.5;
  color: #e3d6c2;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity .4s ease, transform .5s cubic-bezier(.22,.8,.24,1);
}
.hbl-rs-scene:hover .hbl-rs-scene-cap p,
.hbl-rs-scene:focus-visible .hbl-rs-scene-cap p,
.hbl-rs-gallery:not(:hover):not(:focus-within) .hbl-rs-scene:first-child .hbl-rs-scene-cap p { opacity: 1; transform: none; transition-delay: .2s; }
.hbl-rs-scene-glow { animation: hbl-rs-glowop 3s ease-in-out infinite; }
.hbl-rs-candle { transform-box: fill-box; transform-origin: 50% 100%; animation: hbl-rs-flick 1.4s ease-in-out infinite; }
.hbl-rs-bulb { animation: hbl-rs-twinkle 3s ease-in-out infinite; }

.hbl-rs-events-grid { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr); gap: 24px; align-items: stretch; }
.hbl-rs-events-list { display: flex; flex-direction: column; gap: 14px; min-width: 0; }
.hbl-rs-event {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 18px;
  align-items: start;
  padding: 22px;
  border: 1px solid #e6d9c3;
  border-radius: 22px;
  background: #fffaf1;
  transition: transform .35s cubic-bezier(.22,.8,.24,1), box-shadow .35s ease, border-color .3s ease;
}
.hbl-rs-event:hover { transform: translateY(-3px); border-color: #d9c4a2; box-shadow: 0 24px 40px -28px rgba(29,26,23,.45); }
.hbl-rs-event-ic { display: grid; place-items: center; width: 46px; height: 46px; border-radius: 14px; background: #f3dcd4; color: #a8432e; }
.hbl-rs-event-when { margin: 0; font-size: 11.5px; text-transform: uppercase; letter-spacing: .1em; color: #a8432e; }
.hbl-rs-event h3 { margin: 6px 0 0; font-family: var(--font-serif); font-weight: 400; font-size: 26px; line-height: 1.1; color: #1d1a17; }
.hbl-rs-event-text { margin: 8px 0 0; font-size: 14.5px; line-height: 1.55; color: #5a4e44; }
.hbl-rs-event-price { padding: 6px 12px; border-radius: 999px; background: #efe4d2; font-size: 12.5px; color: #2a2420; white-space: nowrap; }
.hbl-rs-private {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: 28px;
  background: #4f5a2a;
  color: #f6efe3;
  box-shadow: 0 40px 80px -50px rgba(47,56,22,.9);
}
.hbl-rs-private-art svg { display: block; width: 100%; height: 190px; }
.hbl-rs-private-body { display: flex; flex-direction: column; flex: 1; padding: 26px 28px 28px; }
.hbl-rs-private .hbl-rs-event-when { color: #e7c77b; }
.hbl-rs-private h3 { margin: 6px 0 0; font-family: var(--font-serif); font-weight: 400; font-size: 38px; line-height: 1.05; }
.hbl-rs-private-body > p { margin: 12px 0 0; font-size: 15px; line-height: 1.6; color: #e9e2cf; }
.hbl-rs-private-list { list-style: none; margin: 18px 0 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.hbl-rs-private-list li { display: flex; align-items: center; gap: 10px; font-size: 14.5px; }
.hbl-rs-private-list svg { color: #e7a93b; flex: none; }
.hbl-rs-private-ctas { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-top: auto; padding-top: 24px; }
.hbl-rs-private-note { font-size: 11.5px; color: #d6d0b8; }

.hbl-rs-reviews { overflow: hidden; background: #1d1a17; color: #f6efe3; }
.hbl-rs-reviews-embers { opacity: .6; }
.hbl-rs-reviews-embers .hbl-rs-ember { bottom: 0; }
.hbl-rs-reviews::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(700px 400px at 10% 100%, rgba(200,85,61,.22), transparent 70%), radial-gradient(600px 400px at 100% 0%, rgba(231,169,59,.1), transparent 70%);
  pointer-events: none;
}
.hbl-rs-reviews .hbl-rs-wrap { position: relative; }
.hbl-rs-reviews-grid { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: 64px; align-items: start; }
.hbl-rs-reviews-src { margin: 18px 0 0; font-size: 12px; color: #b9ab96; }
.hbl-rs-summary { margin-top: 40px; padding: 22px; border: 1px solid rgba(246,239,227,.1); border-radius: 22px; background: rgba(246,239,227,.03); }
.hbl-rs-review-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.hbl-rs-review-list > :nth-child(even) { transform: translateY(32px); }
.hbl-rs .hbl-rs-review.hb-rv { padding: 20px; border-color: #3a322c; border-radius: 20px; background: #26211d; }
.hbl-rs .hbl-rs-review .hb-rv-text { color: #d6c9b6; font-size: 14px; }
.hbl-rs .hbl-rs-review .hb-rv-btn { background: #2f2925; border-color: #3a322c; color: #b9ab96; }
.hbl-rs .hbl-rs-review .hb-rv-date { color: #a3957f; }

.hbl-rs-tiers { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; align-items: stretch; }
.hbl-rs-tiers > .hb-fv { min-width: 0; }
.hbl-rs-tier {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 30px;
  border: 1px solid #e6d9c3;
  border-radius: 26px;
  background: #fffaf1;
  transition: transform .35s cubic-bezier(.22,.8,.24,1), box-shadow .35s ease;
}
.hbl-rs-tier:hover { transform: translateY(-4px); box-shadow: 0 30px 50px -36px rgba(29,26,23,.5); }
.hbl-rs-tier-featured {
  border-color: #1d1a17;
  background: radial-gradient(400px 260px at 50% 0%, rgba(200,85,61,.3), transparent 70%), #1d1a17;
  color: #f6efe3;
  box-shadow: 0 40px 80px -40px rgba(29,26,23,.8);
}
.hbl-rs-tier-flag { position: absolute; top: 22px; right: 22px; padding: 5px 10px; border-radius: 999px; background: #e7a93b; color: #1d1a17; font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: .1em; }
.hbl-rs-tier-courses { margin: 0; font-size: 11.5px; text-transform: uppercase; letter-spacing: .12em; color: #a8432e; }
.hbl-rs-tier-featured .hbl-rs-tier-courses { color: #e7a93b; }
.hbl-rs-tier h3 { margin: 8px 0 0; font-family: var(--font-serif); font-weight: 400; font-size: 32px; line-height: 1.1; }
.hbl-rs-tier-price { display: flex; align-items: baseline; gap: 8px; margin: 18px 0 0; }
.hbl-rs-tier-num { font-family: var(--font-serif); font-size: 64px; line-height: 1; letter-spacing: -.02em; }
.hbl-rs-tier-per { font-size: 14px; color: #6b5f53; }
.hbl-rs-tier-featured .hbl-rs-tier-per { color: #b9ab96; }
.hbl-rs-tier-text { margin: 14px 0 0; font-size: 14.5px; line-height: 1.55; color: #5a4e44; }
.hbl-rs-tier-featured .hbl-rs-tier-text { color: #d6c9b6; }
.hbl-rs-tier ul { list-style: none; margin: 22px 0 0; padding: 20px 0 0; border-top: 1px dashed rgba(42,36,32,.18); display: flex; flex-direction: column; gap: 10px; }
.hbl-rs-tier-featured ul { border-top-color: rgba(246,239,227,.18); }
.hbl-rs-tier li { display: flex; align-items: flex-start; gap: 10px; font-size: 14.5px; line-height: 1.45; }
.hbl-rs-tier li svg { flex: none; margin-top: 2px; color: #6b7a3a; }
.hbl-rs-tier-featured li svg { color: #e7a93b; }
.hbl-rs-tier-pair { display: inline-flex; align-items: center; gap: 8px; margin: 22px 0 18px; font-size: 12.5px; color: #6b5f53; }
.hbl-rs-tier-featured .hbl-rs-tier-pair { color: #b9ab96; }
.hbl-rs-tier .hbl-rs-btn { margin-top: auto; }
.hbl-rs-tier-featured .hbl-rs-btn-ghost { color: #f6efe3; }

.hbl-rs-visit { padding-top: 40px; }
.hbl-rs-visit-grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, .75fr); gap: 24px; align-items: stretch; }
.hbl-rs-visit-grid > .hb-fv { min-width: 0; }
.hbl-rs-map { display: flex; flex-direction: column; height: 100%; overflow: hidden; border: 1px solid #e0d2b9; border-radius: 26px; background: #fffaf1; }
.hbl-rs-map-svg { display: block; width: 100%; height: auto; flex: 1; }
.hbl-rs-map-route { animation: hbl-rs-dash 1.6s linear infinite; }
.hbl-rs-map-pulse { transform-box: fill-box; transform-origin: center; animation: hbl-rs-pulse 2.4s ease-out infinite; }
.hbl-rs-map-bar { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding: 18px 20px; border-top: 1px solid #e6d9c3; }
.hbl-rs-map-addr { margin: 0 0 4px; font-weight: 600; font-size: 15px; color: #1d1a17; }
.hbl-rs-hours { height: 100%; padding: 26px; border: 1px solid #e6d9c3; border-radius: 26px; background: #fffaf1; }
.hbl-rs-hours-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 14px; }
.hbl-rs-open { display: inline-flex; align-items: center; gap: 8px; padding: 5px 12px; border-radius: 999px; background: rgba(107,122,58,.14); color: #4f5a2a; font-size: 12.5px; font-weight: 600; }
.hbl-rs-hours-table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 14px; }
.hbl-rs-hours-table th, .hbl-rs-hours-table td { padding: 11px 10px; border-bottom: 1px dashed rgba(42,36,32,.14); vertical-align: top; }
.hbl-rs-hours-table th { text-align: left; font-weight: 500; color: #2a2420; white-space: nowrap; }
.hbl-rs-hours-table td { text-align: right; font-size: 12.5px; color: #4a3f37; }
.hbl-rs-hours-table tr:last-child th, .hbl-rs-hours-table tr:last-child td { border-bottom: 0; }
.hbl-rs-today th, .hbl-rs-today td { background: #f6e1d8; border-bottom-color: transparent !important; color: #1d1a17 !important; font-weight: 600; }
.hbl-rs-today th { border-radius: 12px 0 0 12px; }
.hbl-rs-today td { border-radius: 0 12px 12px 0; }
.hbl-rs-today-tag { display: inline-block; margin-left: 8px; padding: 2px 7px; border-radius: 999px; background: #c8553d; color: #fff; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .08em; vertical-align: 1px; }
.hbl-rs-closed { color: #a8432e !important; }
.hbl-rs-visit-notes { list-style: none; margin: 18px 0 0; padding: 18px 0 0; border-top: 1px solid #e6d9c3; display: flex; flex-direction: column; gap: 12px; }
.hbl-rs-visit-notes li { display: flex; align-items: flex-start; gap: 10px; font-size: 13.5px; line-height: 1.5; color: #4a3f37; }
.hbl-rs-visit-notes svg { flex: none; margin-top: 1px; color: #a8432e; }
.hbl-rs-visit-notes a { font-weight: 600; text-underline-offset: 3px; }

.hbl-rs-faq-grid { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: 64px; align-items: start; }
.hbl-rs .hbl-rs-acc .hb-ac-item { border-color: rgba(42,36,32,.14); }
.hbl-rs .hbl-rs-acc .hb-ac-trigger { padding: 22px 4px; font-size: 17px; font-weight: 500; color: #1d1a17; text-align: left; }
.hbl-rs .hbl-rs-acc .hb-ac-trigger:hover { color: #a8432e; }
.hbl-rs .hbl-rs-acc .hb-ac-body { padding: 0 4px 22px; font-size: 15px; line-height: 1.65; color: #5a4e44; }

.hbl-rs-final {
  position: relative;
  overflow: hidden;
  padding: 150px 0 170px;
  background: radial-gradient(800px 420px at 50% 115%, rgba(200,85,61,.55), rgba(200,85,61,.12) 55%, transparent 75%), #1d1a17;
  color: #f6efe3;
  text-align: center;
}
.hbl-rs-final-fire { position: absolute; left: 50%; bottom: -70px; width: 360px; height: 420px; translate: -50% 0; opacity: .5; }
.hbl-rs-final-fire .hbl-rs-flame { width: 100%; height: 100%; bottom: 0; }
.hbl-rs-final-embers .hbl-rs-ember { bottom: 0; }
.hbl-rs-final-inner { position: relative; }
.hbl-rs-final .hbl-rs-kicker { justify-content: center; }
.hbl-rs-final-h { margin: 0 auto; max-width: 900px; font-family: var(--font-serif); font-weight: 400; font-size: clamp(46px, 7.6vw, 104px); line-height: .98; letter-spacing: -.02em; }
.hbl-rs-final-h em { font-style: italic; color: #e7a93b; }
.hbl-rs-final-p { max-width: 520px; margin: 26px auto 0; font-size: 17px; line-height: 1.6; color: #d6c9b6; }
.hbl-rs-final-ctas { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin-top: 38px; }

.hbl-rs-footer { padding: 80px 0 36px; background: #15120f; color: #c9bba5; font-size: 14.5px; }
.hbl-rs-footer-grid { display: grid; grid-template-columns: minmax(0, 1.5fr) repeat(3, minmax(0, 1fr)); gap: 40px; }
.hbl-rs-footer-tag { max-width: 300px; margin: 18px 0 0; line-height: 1.6; color: #a89a86; }
.hbl-rs-socials { list-style: none; margin: 22px 0 0; padding: 0; display: flex; gap: 10px; }
.hbl-rs-socials a {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(246,239,227,.14);
  border-radius: 50%;
  color: #e3d6c2;
  transition: background-color .2s ease, color .2s ease, border-color .2s ease;
}
.hbl-rs-socials a:hover { background: #c8553d; border-color: #c8553d; color: #fff; }
.hbl-rs-footer-h { margin: 6px 0 16px; font-family: var(--font-mono); font-size: 11.5px; font-weight: 500; text-transform: uppercase; letter-spacing: .14em; color: #e7a93b; }
.hbl-rs-footer address { font-style: normal; line-height: 1.7; }
.hbl-rs-footer p { margin: 14px 0 0; line-height: 1.7; }
.hbl-rs-footer a { text-decoration: none; }
.hbl-rs-footer a:hover { color: #f6efe3; }
.hbl-rs-footer-hours { margin: 0; display: flex; flex-direction: column; gap: 8px; }
.hbl-rs-footer-hours div { display: flex; justify-content: space-between; gap: 12px; }
.hbl-rs-footer-hours dt { color: #a89a86; }
.hbl-rs-footer-hours dd { margin: 0; font-family: var(--font-mono); font-size: 12.5px; color: #e3d6c2; }
.hbl-rs-footer-links { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.hbl-rs-footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 64px;
  padding-top: 26px;
  border-top: 1px solid rgba(246,239,227,.1);
  font-size: 13px;
  color: #a89a86;
}
.hbl-rs-footer-cta { display: inline-flex; align-items: center; gap: 8px; font-weight: 600; color: #e7a93b !important; border-radius: 6px; }

@keyframes hbl-rs-ping { 0% { box-shadow: 0 0 0 0 rgba(107,122,58,.5); } 80%, 100% { box-shadow: 0 0 0 8px rgba(107,122,58,0); } }
@keyframes hbl-rs-flick {
  0%, 100% { transform: scale(1, 1) skewX(0deg); }
  25% { transform: scale(.97, 1.05) skewX(1.5deg); }
  50% { transform: scale(1.03, .96) skewX(-1deg); }
  75% { transform: scale(.98, 1.04) skewX(-2deg); }
}
@keyframes hbl-rs-glow { 0%, 100% { opacity: .85; scale: 1; } 50% { opacity: 1; scale: 1.08; } }
@keyframes hbl-rs-glowop { 0%, 100% { opacity: .55; } 50% { opacity: .9; } }
@keyframes hbl-rs-rise {
  0% { opacity: 0; transform: translate3d(0, 0, 0) scale(1); }
  10% { opacity: 1; }
  70% { opacity: .8; }
  100% { opacity: 0; transform: translate3d(var(--hbl-rs-dx, 0px), -340px, 0) scale(.4); }
}
@keyframes hbl-rs-spin { to { transform: rotate(360deg); } }
@keyframes hbl-rs-float { 0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); } 50% { transform: translate3d(0, -14px, 0) rotate(6deg); } }
@keyframes hbl-rs-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes hbl-rs-pop { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: none; } }
@keyframes hbl-rs-twinkle { 0%, 100% { opacity: 1; } 50% { opacity: .55; } }
@keyframes hbl-rs-dash { to { stroke-dashoffset: -18; } }
@keyframes hbl-rs-pulse { 0% { transform: scale(.5); opacity: .5; } 100% { transform: scale(1.4); opacity: 0; } }

@media (max-width: 1024px) {
  .hbl-rs-hero-grid { grid-template-columns: minmax(0, 1fr); gap: 48px; }
  .hbl-rs-hero-side { max-width: 560px; width: 100%; margin: 0 auto; }
  .hbl-rs-story-grid, .hbl-rs-menu-grid, .hbl-rs-events-grid, .hbl-rs-reviews-grid, .hbl-rs-visit-grid, .hbl-rs-faq-grid { grid-template-columns: minmax(0, 1fr); gap: 40px; }
  .hbl-rs-chef { max-width: 420px; }
  .hbl-rs-tiers { grid-template-columns: minmax(0, 1fr); max-width: 520px; margin: 0 auto; }
  .hbl-rs-footer-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hbl-rs-links { display: none; }
}
@media (max-width: 760px) {
  .hbl-rs-section { padding: 88px 0; }
  .hbl-rs-wrap, .hbl-rs-nav, .hbl-rs-hero-grid { padding-left: 16px; padding-right: 16px; }
  .hbl-rs-phone span { display: none; }
  .hbl-rs-phone { width: 40px; height: 40px; justify-content: center; border: 1px solid rgba(42,36,32,.16); border-radius: 50%; }
  .hbl-rs-brand { font-size: 22px; }
  .hbl-rs-hero { padding-top: 20px; }
  .hbl-rs-lede { font-size: 16.5px; }
  .hbl-rs-stage { height: 360px; }
  .hbl-rs-oven { height: 320px; width: 66%; left: 0; }
  .hbl-rs-flame { width: 170px; height: 204px; }
  .hbl-rs-plate-wrap { top: 30px; width: 52%; }
  .hbl-rs-ing-3 { width: 70px; height: 70px; top: 200px; }
  .hbl-rs-ing-2 { top: 230px; }
  .hbl-rs-ing-6 { top: 260px; }
  .hbl-rs-res-slot { margin-top: -90px; }
  .hbl-rs-res { padding: 18px; }
  .hbl-rs-days { gap: 4px; }
  .hbl-rs-day-n { font-size: 19px; }
  .hbl-rs-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px 16px; margin-top: 52px; }
  .hbl-rs-facts { grid-template-columns: minmax(0, 1fr); }
  .hbl-rs-board { padding: 18px; border-radius: 22px; }
  .hbl-rs-dish-name { font-size: 20px; }
  .hbl-rs-season-grid { grid-template-columns: minmax(0, 1fr); }
  .hbl-rs-midcta { border-radius: 22px; padding: 20px; }
  .hbl-rs-midcta .hbl-rs-btn { width: 100%; }
  .hbl-rs-gallery { flex-direction: column; height: auto; }
  .hbl-rs-scene { flex: none; height: 150px; transition: height .6s cubic-bezier(.22,.8,.24,1); }
  .hbl-rs-scene:hover, .hbl-rs-scene:focus-visible,
  .hbl-rs-gallery:not(:hover):not(:focus-within) .hbl-rs-scene:first-child { height: 300px; }
  .hbl-rs-event { grid-template-columns: auto minmax(0, 1fr); padding: 18px; gap: 14px; }
  .hbl-rs-event-price { grid-column: 2; justify-self: start; }
  .hbl-rs-review-list { grid-template-columns: minmax(0, 1fr); }
  .hbl-rs-review-list > :nth-child(even) { transform: none; }
  .hbl-rs-summary { padding: 18px; }
  .hbl-rs-tier { padding: 24px; }
  .hbl-rs-hours { padding: 20px; }
  .hbl-rs-hours-table th, .hbl-rs-hours-table td { padding: 10px 8px; }
  .hbl-rs-hours-table th { white-space: normal; }
  .hbl-rs-map-bar .hbl-rs-btn { width: 100%; }
  .hbl-rs-final { padding: 110px 0 130px; }
  .hbl-rs-footer-grid { grid-template-columns: minmax(0, 1fr); gap: 32px; }
}
@media (max-width: 420px) {
  .hbl-rs-nav-end .hbl-rs-btn-sm { padding: 9px 13px; font-size: 13px; }
  .hbl-rs-brand svg { width: 30px; height: 30px; }
  .hbl-rs-hero-ctas .hbl-rs-btn-lg { padding: 14px 20px; font-size: 15px; }
  .hbl-rs-time { padding: 7px 10px; font-size: 12.5px; }
}

@media (prefers-reduced-motion: reduce) {
  .hbl-rs *, .hbl-rs *::before, .hbl-rs *::after { animation: none !important; }
  .hbl-rs-ember { display: none; }
  .hbl-rs-scene, .hbl-rs-scene-art > svg, .hbl-rs-scene-cap p, .hbl-rs-btn, .hbl-rs-event, .hbl-rs-tier, .hbl-rs-day { transition: none !important; }
  .hbl-rs-btn:hover, .hbl-rs-event:hover, .hbl-rs-tier:hover { transform: none; }
}
`;

export function RestaurantStyles() {
  return (
    <style href="hbl-rs" precedence="default">
      {css}
    </style>
  );
}
