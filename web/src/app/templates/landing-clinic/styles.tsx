const css = `
.hbl-cl {
  position: relative;
  isolation: isolate;
  overflow-x: clip;
  background: #fbfdfc;
  color: #12302f;
  font-family: var(--font-sans);
  color-scheme: light;
  -webkit-font-smoothing: antialiased;
}
.hbl-cl *, .hbl-cl *::before, .hbl-cl *::after { box-sizing: border-box; }
.hbl-cl ::selection { background: #d9f3ee; color: #0f3b3a; }
.hbl-cl a:focus-visible,
.hbl-cl button:focus-visible,
.hbl-cl select:focus-visible,
.hbl-cl input:focus-visible,
.hbl-cl [tabindex]:focus-visible {
  outline: 2px solid #0f3b3a;
  outline-offset: 3px;
}
.hbl-cl-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
.hbl-cl-wrap {
  width: 100%;
  max-width: 1248px;
  margin: 0 auto;
  padding: 0 24px;
}
.hbl-cl-section {
  position: relative;
  padding: 112px 0;
}
.hbl-cl-teal { color: #127a70; }

.hbl-cl-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 22px;
  border: 1px solid transparent;
  border-radius: 999px;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: transform .25s cubic-bezier(.3, 1.4, .5, 1), background .2s ease, box-shadow .25s ease, border-color .2s ease, color .2s ease;
}
.hbl-cl-btn:hover { transform: translateY(-1px); }
.hbl-cl-btn:active { transform: translateY(0) scale(.98); }
.hbl-cl-btn-sm { min-height: 40px; padding: 0 16px; font-size: 14px; }
.hbl-cl-btn-coral {
  background: #ff7a6b;
  color: #0f3b3a;
  box-shadow: 0 1px 0 rgba(255, 255, 255, .45) inset, 0 10px 24px -10px rgba(255, 122, 107, .9);
}
.hbl-cl-btn-coral:hover { background: #ff8b7d; box-shadow: 0 1px 0 rgba(255, 255, 255, .45) inset, 0 16px 30px -12px rgba(255, 122, 107, 1); }
.hbl-cl-btn-ghost {
  border-color: #cfe3df;
  background: rgba(255, 255, 255, .7);
  color: #0f3b3a;
}
.hbl-cl-btn-ghost:hover { border-color: #1fb5a6; background: #fff; }
.hbl-cl-btn-ink { background: #0f3b3a; color: #fbfdfc; }
.hbl-cl-btn-ink:hover { background: #145250; }
.hbl-cl-btn-line { border-color: #cfe3df; background: #fff; color: #0f3b3a; }
.hbl-cl-btn-line:hover { border-color: #0f3b3a; }
.hbl-cl-btn-glass {
  border-color: rgba(255, 255, 255, .28);
  background: rgba(255, 255, 255, .08);
  color: #fbfdfc;
}
.hbl-cl-btn-glass:hover { background: rgba(255, 255, 255, .16); }
.hbl-cl-final .hbl-cl-btn:focus-visible { outline-color: #fbfdfc; }

.hbl-cl-nav {
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.hbl-cl-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #0f3b3a;
  font-family: var(--font-serif);
  font-size: 26px;
  line-height: 1;
  letter-spacing: -.01em;
  text-decoration: none;
}
.hbl-cl-brand em { color: #127a70; font-style: italic; }
.hbl-cl-links {
  display: flex;
  gap: 4px;
  padding: 5px;
  border: 1px solid #e3efec;
  border-radius: 999px;
  background: rgba(255, 255, 255, .7);
}
.hbl-cl-links a {
  padding: 8px 14px;
  border-radius: 999px;
  color: #3f5f5d;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background .2s ease, color .2s ease;
}
.hbl-cl-links a:hover { background: #eef7f4; color: #0f3b3a; }
.hbl-cl-nav-end { display: flex; align-items: center; gap: 16px; }
.hbl-cl-nav-phone {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #0f3b3a;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  font-variant-numeric: tabular-nums;
}
.hbl-cl-nav-phone:hover { color: #127a70; }

.hbl-cl-hero { position: relative; padding: 40px 0 96px; }
.hbl-cl-hero::before {
  content: "";
  position: absolute;
  inset: -120px 0 0;
  z-index: -1;
  background:
    radial-gradient(60% 50% at 85% 20%, rgba(31, 181, 166, .14), transparent 70%),
    radial-gradient(40% 40% at 10% 80%, rgba(255, 122, 107, .08), transparent 70%);
  pointer-events: none;
}
.hbl-cl-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr);
  align-items: center;
  gap: 56px;
}
.hbl-cl-hero-copy { min-width: 0; }
.hbl-cl-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 26px;
  padding: 7px 14px 7px 10px;
  border: 1px solid #cfe9e4;
  border-radius: 999px;
  background: #fff;
  color: #2c4c4a;
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 6px 18px -12px rgba(15, 59, 58, .4);
}
.hbl-cl-eyebrow-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1fb5a6;
  box-shadow: 0 0 0 4px #d9f3ee;
}
.hbl-cl-h1 {
  margin: 0;
  color: #0f3b3a;
  font-family: var(--font-serif);
  font-size: clamp(48px, 7.4vw, 92px);
  font-weight: 400;
  line-height: .98;
  letter-spacing: -.025em;
}
.hbl-cl-h1-line, .hbl-cl-h1-soft { display: block; }
.hbl-cl-h1-soft { color: #127a70; font-style: italic; }
.hbl-cl-lede {
  max-width: 540px;
  margin: 26px 0 0;
  color: #4b6866;
  font-size: 18px;
  line-height: 1.6;
}
.hbl-cl-hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 34px; }
.hbl-cl-hero-proof {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 38px;
  padding-top: 26px;
  border-top: 1px solid #e3efec;
}
.hbl-cl-hero-proof p { margin: 4px 0 0; color: #5d7a78; font-size: 13px; }
.hbl-cl-hero-stars { display: flex; align-items: center; gap: 8px; color: #0f3b3a; font-size: 15px; }

.hbl-cl-hero-art {
  position: relative;
  display: grid;
  place-items: center;
  min-width: 0;
  min-height: 640px;
  scroll-margin-top: 24px;
}
.hbl-cl-blob {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  animation: hbl-cl-morph 16s ease-in-out infinite alternate;
}
.hbl-cl-blob-a {
  top: 4%;
  right: -4%;
  width: 78%;
  aspect-ratio: 1;
  border-radius: 58% 42% 55% 45% / 47% 58% 42% 53%;
  background: radial-gradient(circle at 30% 30%, #b8ece3, #1fb5a6 62%, #138f84);
  opacity: .85;
}
.hbl-cl-blob-b {
  bottom: 2%;
  left: -2%;
  width: 54%;
  aspect-ratio: 1;
  border-radius: 45% 55% 40% 60% / 55% 45% 55% 45%;
  background: radial-gradient(circle at 60% 40%, #ffd6cf, #ff9f93 70%);
  opacity: .8;
  animation-duration: 19s;
  animation-delay: -6s;
}
.hbl-cl-blob-c {
  top: 38%;
  left: 18%;
  width: 34%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, #ffffff, #d9f3ee 70%);
  opacity: .9;
  animation-duration: 13s;
  animation-delay: -3s;
}
@keyframes hbl-cl-morph {
  0% { transform: translate3d(0, 0, 0) rotate(0deg); border-radius: 58% 42% 55% 45% / 47% 58% 42% 53%; }
  50% { transform: translate3d(-12px, 14px, 0) rotate(8deg); border-radius: 42% 58% 46% 54% / 56% 44% 58% 42%; }
  100% { transform: translate3d(10px, -10px, 0) rotate(-6deg); border-radius: 52% 48% 38% 62% / 42% 52% 48% 58%; }
}
.hbl-cl-hero-lines {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: rgba(255, 255, 255, .7);
  stroke-width: 1.5;
  pointer-events: none;
}
.hbl-cl-hero-lines circle { fill: #fff; stroke: none; }
.hbl-cl-book-slot { position: relative; z-index: 2; width: 100%; max-width: 410px; }
.hbl-cl-chip {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px 12px 12px;
  border: 1px solid rgba(255, 255, 255, .9);
  border-radius: 18px;
  background: rgba(255, 255, 255, .88);
  box-shadow: 0 18px 40px -18px rgba(15, 59, 58, .45);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  animation: hbl-cl-float 6s ease-in-out infinite;
}
.hbl-cl-chip b { display: block; color: #0f3b3a; font-size: 14px; font-weight: 600; }
.hbl-cl-chip small { display: block; margin-top: 2px; color: #5d7a78; font-size: 12px; }
.hbl-cl-chip-next { top: 6px; left: -18px; }
.hbl-cl-chip-calm { right: -24px; bottom: 34px; max-width: 250px; animation-delay: -3s; }
.hbl-cl-chip-pulse {
  position: relative;
  flex: none;
  width: 12px;
  height: 12px;
  margin: 0 4px;
  border-radius: 50%;
  background: #1fb5a6;
}
.hbl-cl-chip-pulse::after {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid #1fb5a6;
  animation: hbl-cl-ping 2s cubic-bezier(.2, .8, .3, 1) infinite;
}
.hbl-cl-chip-ico {
  display: grid;
  place-items: center;
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: #ffe4df;
  color: #c2473a;
}
@keyframes hbl-cl-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes hbl-cl-ping {
  0% { opacity: .8; transform: scale(.5); }
  100% { opacity: 0; transform: scale(1.4); }
}

.hbl-cl-book {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, .9);
  border-radius: 28px;
  background: linear-gradient(180deg, #ffffff, #f8fcfb);
  box-shadow: 0 1px 0 #fff inset, 0 40px 80px -40px rgba(15, 59, 58, .55), 0 0 0 1px rgba(15, 59, 58, .05);
}
.hbl-cl-book-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.hbl-cl-book-title { margin: 0; color: #0f3b3a; font-family: var(--font-serif); font-size: 30px; line-height: 1; }
.hbl-cl-book-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 999px;
  background: #eef7f4;
  color: #127a70;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}
.hbl-cl-book-badge i { width: 6px; height: 6px; border-radius: 50%; background: #1fb5a6; }
.hbl-cl-seg {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  padding: 4px;
  border-radius: 14px;
  background: #eef5f3;
}
.hbl-cl-seg-btn {
  min-height: 36px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #4b6866;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s ease, color .2s ease, box-shadow .2s ease;
}
.hbl-cl-seg-btn[aria-checked="true"] { background: #fff; color: #0f3b3a; box-shadow: 0 2px 8px -2px rgba(15, 59, 58, .2); }
.hbl-cl-field { display: flex; flex-direction: column; gap: 7px; min-width: 0; }
.hbl-cl-fs { min-width: 0; margin: 0; padding: 0; border: 0; }
.hbl-cl-field-label {
  display: block;
  padding: 0;
  margin: 0 0 7px;
  color: #3f5f5d;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .02em;
}
.hbl-cl-field .hbl-cl-field-label { margin: 0; }
.hbl-cl-field-note { color: #5d7a78; font-size: 12px; }
.hbl-cl-select-wrap { position: relative; display: block; color: #0f3b3a; }
.hbl-cl-select-wrap svg { position: absolute; top: 50%; right: 14px; margin-top: -7px; pointer-events: none; }
.hbl-cl-select, .hbl-cl-input {
  width: 100%;
  min-height: 44px;
  padding: 0 14px;
  border: 1px solid #d5e6e2;
  border-radius: 12px;
  background: #fff;
  color: #12302f;
  font: inherit;
  font-size: 15px;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.hbl-cl-select { appearance: none; -webkit-appearance: none; padding-right: 38px; cursor: pointer; }
.hbl-cl-input::placeholder { color: #7f9997; }
.hbl-cl-select:hover, .hbl-cl-input:hover { border-color: #a9cfc8; }
.hbl-cl-select:focus, .hbl-cl-input:focus { border-color: #1fb5a6; box-shadow: 0 0 0 4px rgba(31, 181, 166, .16); outline: none; }
.hbl-cl .hbl-cl-select:focus-visible, .hbl-cl .hbl-cl-input:focus-visible { outline: 2px solid #0f3b3a; outline-offset: 2px; }
.hbl-cl-days { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 6px; }
.hbl-cl-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 0;
  padding: 8px 0;
  border: 1px solid #dbeae7;
  border-radius: 14px;
  background: #fff;
  color: #4b6866;
  font: inherit;
  cursor: pointer;
  transition: border-color .2s ease, background .2s ease, color .2s ease, transform .2s ease;
}
.hbl-cl-day span { font-size: 11px; font-weight: 600; }
.hbl-cl-day b { color: #0f3b3a; font-size: 18px; font-weight: 600; line-height: 1.1; }
.hbl-cl-day:hover { border-color: #1fb5a6; }
.hbl-cl-day[aria-pressed="true"] { border-color: #0f3b3a; background: #0f3b3a; color: #bfe9e1; }
.hbl-cl-day[aria-pressed="true"] b { color: #fff; }
.hbl-cl-slots { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
.hbl-cl-slot {
  min-height: 38px;
  padding: 0 4px;
  border: 1px solid #dbeae7;
  border-radius: 12px;
  background: #fff;
  color: #0f3b3a;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: border-color .2s ease, background .2s ease, color .2s ease;
}
.hbl-cl-slot:hover:not(:disabled) { border-color: #1fb5a6; background: #f2fbf9; }
.hbl-cl-slot[aria-pressed="true"] { border-color: #1fb5a6; background: #d9f3ee; color: #0f3b3a; box-shadow: 0 0 0 1px #1fb5a6 inset; }
.hbl-cl-slot:disabled { color: #9fb5b2; background: #f4f8f7; text-decoration: line-through; cursor: not-allowed; }
.hbl-cl-book-submit { width: 100%; margin-top: 2px; }
.hbl-cl-book-fine { margin: -4px 0 0; color: #5d7a78; font-size: 12px; text-align: center; }
.hbl-cl-book-done { align-items: flex-start; gap: 12px; padding: 30px 26px; animation: hbl-cl-pop .5s cubic-bezier(.3, 1.4, .5, 1) both; }
.hbl-cl-book-check {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 18px;
  background: #d9f3ee;
  color: #127a70;
}
.hbl-cl-book-done-title { margin: 6px 0 0; color: #0f3b3a; font-family: var(--font-serif); font-size: 34px; line-height: 1.05; }
.hbl-cl-book-done-text { margin: 0; color: #4b6866; font-size: 15px; line-height: 1.6; }
.hbl-cl-book-done-list { display: flex; flex-direction: column; gap: 8px; margin: 4px 0 0; padding: 14px 0 0; border-top: 1px solid #e3efec; list-style: none; width: 100%; }
.hbl-cl-book-done-list li { display: flex; align-items: center; gap: 8px; color: #2c4c4a; font-size: 14px; }
.hbl-cl-book-done-list svg { color: #127a70; flex: none; }
.hbl-cl-book-link {
  margin-top: 4px;
  padding: 0;
  border: 0;
  background: none;
  color: #0f3b3a;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
@keyframes hbl-cl-pop {
  from { opacity: 0; transform: scale(.96); }
  to { opacity: 1; transform: scale(1); }
}

.hbl-cl-trust { padding: 0 0 40px; }
.hbl-cl-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border: 1px solid #e3efec;
  border-radius: 28px;
  background: linear-gradient(180deg, #ffffff, #f6fbfa);
  box-shadow: 0 30px 60px -50px rgba(15, 59, 58, .5);
}
.hbl-cl-stat { display: flex; flex-direction: column; gap: 6px; min-width: 0; padding: 30px 28px; }
.hbl-cl-stat + .hbl-cl-stat { border-left: 1px solid #e3efec; }
.hbl-cl-stat b {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  color: #0f3b3a;
  font-family: var(--font-serif);
  font-size: clamp(40px, 4.6vw, 58px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -.02em;
  font-variant-numeric: tabular-nums;
}
.hbl-cl-stat b small { font-size: .5em; color: #5d7a78; }
.hbl-cl-stat-star { color: #ff7a6b; align-self: center; }
.hbl-cl-stat > span { color: #5d7a78; font-size: 14px; }
.hbl-cl-insure { display: flex; align-items: center; gap: 28px; margin-top: 34px; }
.hbl-cl-insure-label { flex: none; margin: 0; color: #5d7a78; font-size: 13px; font-weight: 500; }
.hbl-cl-insure-row { flex: 1; min-width: 0; }
.hbl-cl-insurer {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #3f5f5d;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -.01em;
  white-space: nowrap;
}
.hbl-cl-insurer svg { color: #1fb5a6; }
.hbl-cl-insurer[data-v="1"] { font-family: var(--font-serif); font-size: 22px; font-weight: 400; font-style: italic; }
.hbl-cl-insurer[data-v="2"] { font-family: var(--font-grotesk); text-transform: uppercase; font-size: 15px; letter-spacing: .08em; }

.hbl-cl-head { max-width: 640px; }
.hbl-cl-head-center { margin: 0 auto; text-align: center; }
.hbl-cl-head-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
.hbl-cl-head-row > * { min-width: 0; }
.hbl-cl-kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 18px;
  color: #127a70;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.hbl-cl-kicker::before { content: ""; width: 22px; height: 1px; background: currentColor; }
.hbl-cl-head-center .hbl-cl-kicker::after { content: ""; width: 22px; height: 1px; background: currentColor; }
.hbl-cl-kicker-light { color: #9fe3d8; }
.hbl-cl-h2 {
  margin: 0;
  color: #0f3b3a;
  font-family: var(--font-serif);
  font-size: clamp(38px, 5vw, 64px);
  font-weight: 400;
  line-height: 1.02;
  letter-spacing: -.02em;
  text-wrap: balance;
}
.hbl-cl-h2 em { color: #127a70; font-style: italic; }
.hbl-cl-sub { margin: 20px 0 0; color: #4b6866; font-size: 17px; line-height: 1.6; }

.hbl-cl-svc-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 56px;
}
.hbl-cl-svc-cell { min-width: 0; display: flex; }
.hbl-cl .hbl-cl-svc {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 28px;
  background: linear-gradient(180deg, #ffffff, #f7fbfa);
  color: #12302f;
  box-shadow: inset 0 0 0 1px #e3efec, 0 24px 48px -40px rgba(15, 59, 58, .45);
  transition: transform .35s cubic-bezier(.2, .9, .2, 1), box-shadow .35s ease;
}
.hbl-cl .hbl-cl-svc:hover { transform: translateY(-4px); box-shadow: inset 0 0 0 1px #cbe6e0, 0 30px 60px -36px rgba(15, 59, 58, .5); }
.hbl-cl-svc-ico {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: #d9f3ee;
  color: #0f3b3a;
  transition: background .3s ease, color .3s ease, transform .4s cubic-bezier(.3, 1.4, .5, 1);
}
.hbl-cl-svc:hover .hbl-cl-svc-ico { background: #0f3b3a; color: #d9f3ee; transform: rotate(-6deg); }
.hbl-cl-svc h3 { margin: 24px 0 0; color: #0f3b3a; font-family: var(--font-serif); font-size: 30px; font-weight: 400; line-height: 1.1; }
.hbl-cl-svc p { margin: 10px 0 0; color: #4b6866; font-size: 15px; line-height: 1.6; }
.hbl-cl-svc-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 22px;
  color: #0f3b3a;
  font-size: 14px;
  font-weight: 600;
}
.hbl-cl-svc p + .hbl-cl-svc-foot { margin-top: 22px; border-top: 1px dashed #d5e6e2; }
.hbl-cl-svc-time { display: inline-flex; align-items: center; gap: 6px; color: #5d7a78; font-weight: 500; }

.hbl-cl-results { background: linear-gradient(180deg, #fbfdfc, #eef8f5 40%, #fbfdfc); }
.hbl-cl-results-grid { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: 64px; align-items: center; }
.hbl-cl-results-copy { min-width: 0; }
.hbl-cl-results-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin: 36px 0 0; }
.hbl-cl-results-stats div { padding: 16px 18px; border: 1px solid #dcece8; border-radius: 18px; background: #fff; }
.hbl-cl-results-stats dt { color: #5d7a78; font-size: 12px; font-weight: 500; }
.hbl-cl-results-stats dd { margin: 6px 0 0; color: #0f3b3a; font-family: var(--font-serif); font-size: 42px; line-height: 1; }
.hbl-cl-ticks { display: flex; flex-direction: column; gap: 12px; margin: 28px 0 0; padding: 0; list-style: none; }
.hbl-cl-ticks li { display: flex; align-items: flex-start; gap: 10px; color: #2c4c4a; font-size: 15px; line-height: 1.5; }
.hbl-cl-ticks svg { flex: none; margin-top: 2px; color: #1fb5a6; }
.hbl-cl-compare-wrap { min-width: 0; }
.hbl-cl .hbl-cl-compare {
  aspect-ratio: 5 / 4;
  border-radius: 32px;
  box-shadow: 0 0 0 8px #fff, 0 0 0 9px #dcece8, 0 50px 90px -50px rgba(15, 59, 58, .6);
}
.hbl-cl .hbl-cl-compare .hb-ic-chip { top: 16px; padding: 5px 12px; border-radius: 999px; background: rgba(255, 255, 255, .9); color: #0f3b3a; font-size: 12px; font-weight: 600; }
.hbl-cl .hbl-cl-compare .hb-ic-knob { width: 40px; height: 40px; margin: -20px 0 0 -20px; background: #0f3b3a; }
.hbl-cl-compare-note { margin: 22px 0 0; color: #5d7a78; font-size: 13px; text-align: center; }

.hbl-cl-visit-grid { display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr); gap: 64px; align-items: center; }
.hbl-cl-visit-copy { min-width: 0; }
.hbl-cl-visit-price {
  display: flex;
  flex-direction: column;
  margin-top: 36px;
  border: 1px solid #e3efec;
  border-radius: 22px;
  background: #fff;
}
.hbl-cl-visit-price div { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 22px; }
.hbl-cl-visit-price div + div { border-top: 1px solid #e3efec; }
.hbl-cl-visit-price span { color: #4b6866; font-size: 15px; }
.hbl-cl-visit-price b { color: #0f3b3a; font-family: var(--font-serif); font-size: 30px; font-weight: 400; white-space: nowrap; }
.hbl-cl-visit-price b.hbl-cl-teal { color: #127a70; font-style: italic; }
.hbl-cl-stepper-card {
  min-width: 0;
  padding: 32px;
  border: 1px solid #e3efec;
  border-radius: 32px;
  background:
    radial-gradient(80% 60% at 100% 0%, rgba(217, 243, 238, .9), transparent 70%),
    #ffffff;
  box-shadow: 0 50px 90px -60px rgba(15, 59, 58, .55);
}
.hbl-cl .hb-stp { gap: 26px; color: #12302f; }
.hbl-cl .hb-stp-line { background: #e0efec; }
.hbl-cl .hb-stp-fill { background: #1fb5a6; }
.hbl-cl .hb-stp-dot { border-color: #cfe3df; background: #fff; color: #5d7a78; }
.hbl-cl button.hb-stp-dot:hover { border-color: #1fb5a6; }
.hbl-cl .hb-stp-dot:focus-visible { outline-color: #0f3b3a; }
.hbl-cl .hb-stp-item[data-state="done"] .hb-stp-dot { border-color: #1fb5a6; background: #1fb5a6; color: #fff; }
.hbl-cl .hb-stp-item[data-state="current"] .hb-stp-dot { border-color: #0f3b3a; background: #0f3b3a; color: #fff; box-shadow: 0 0 0 5px rgba(31, 181, 166, .2); }
.hbl-cl .hb-stp-title { color: #5d7a78; font-size: 13px; font-weight: 500; }
.hbl-cl .hb-stp-item[data-state="current"] .hb-stp-title,
.hbl-cl .hb-stp-item[data-state="done"] .hb-stp-title { color: #0f3b3a; }
.hbl-cl .hb-stp-btn { padding: 10px 18px; border-color: #cfe3df; border-radius: 999px; color: #0f3b3a; font-size: 14px; font-weight: 600; }
.hbl-cl .hb-stp-btn:hover:not(:disabled) { background: #eef7f4; }
.hbl-cl .hb-stp-btn:focus-visible { outline-color: #0f3b3a; }
.hbl-cl .hb-stp-btn[data-primary="true"] { border-color: #0f3b3a; background: #0f3b3a; color: #fbfdfc; }
.hbl-cl .hb-stp-btn[data-primary="true"]:hover:not(:disabled) { background: #145250; }
.hbl-cl-step { min-height: 300px; padding: 4px 2px; }
.hbl-cl-step-top { display: flex; align-items: center; gap: 12px; }
.hbl-cl-step-ico { display: grid; place-items: center; width: 48px; height: 48px; border-radius: 16px; background: #d9f3ee; color: #0f3b3a; }
.hbl-cl-step-meta { color: #5d7a78; font-size: 13px; font-weight: 500; }
.hbl-cl-step h3 { margin: 22px 0 0; color: #0f3b3a; font-family: var(--font-serif); font-size: clamp(28px, 3vw, 36px); font-weight: 400; line-height: 1.1; }
.hbl-cl-step p { margin: 12px 0 0; color: #4b6866; font-size: 16px; line-height: 1.65; }
.hbl-cl-step ul { display: flex; flex-wrap: wrap; gap: 8px; margin: 22px 0 0; padding: 0; list-style: none; }
.hbl-cl-step li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: 999px;
  background: #f1f8f6;
  color: #2c4c4a;
  font-size: 13px;
  font-weight: 500;
}
.hbl-cl-step li svg { color: #1fb5a6; }

.hbl-cl-team-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; margin-top: 56px; }
.hbl-cl-team-cell { min-width: 0; display: flex; }
.hbl-cl .hbl-cl-team-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  border: 1px solid #e3efec;
  border-radius: 26px;
  background: #fff;
  box-shadow: 0 30px 60px -48px rgba(15, 59, 58, .5);
}
.hbl-cl-portrait { display: block; width: 100%; height: auto; aspect-ratio: 1; }
.hbl-cl-team-body { display: flex; flex: 1; flex-direction: column; padding: 20px 20px 18px; }
.hbl-cl-team-body h3 { margin: 0; color: #0f3b3a; font-family: var(--font-serif); font-size: 26px; font-weight: 400; line-height: 1.1; }
.hbl-cl-team-role { margin: 6px 0 0; color: #127a70; font-size: 13px; font-weight: 600; }
.hbl-cl-team-bio { margin: 10px 0 0; color: #4b6866; font-size: 14px; line-height: 1.55; }
.hbl-cl-team-foot {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: auto;
  padding-top: 16px;
  color: #5d7a78;
  font-size: 12px;
}
.hbl-cl-team-bio + .hbl-cl-team-foot { margin-top: 16px; border-top: 1px solid #eef4f2; }
.hbl-cl-team-foot span { display: inline-flex; align-items: center; gap: 6px; }
.hbl-cl-team-next { color: #0f3b3a; font-weight: 600; }

.hbl-cl-reviews { background: #f2f9f7; }
.hbl-cl-reviews-grid { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: 56px; align-items: start; }
.hbl-cl-reviews-side { min-width: 0; }
.hbl-cl-score { margin-top: 32px; padding: 24px; border: 1px solid #dcece8; border-radius: 24px; background: #fff; }
.hbl-cl-score-top { display: flex; align-items: center; gap: 16px; }
.hbl-cl-score-top b { color: #0f3b3a; font-family: var(--font-serif); font-size: 64px; font-weight: 400; line-height: 1; }
.hbl-cl-score-top p { margin: 6px 0 0; color: #5d7a78; font-size: 13px; }
.hbl-cl-bars { display: flex; flex-direction: column; gap: 8px; margin: 20px 0 0; padding: 0; list-style: none; }
.hbl-cl-bars li { display: grid; grid-template-columns: 48px minmax(0, 1fr) 36px; align-items: center; gap: 10px; color: #4b6866; font-size: 12px; font-variant-numeric: tabular-nums; }
.hbl-cl-bars li span:last-child { text-align: right; }
.hbl-cl-bars i { display: block; height: 6px; overflow: hidden; border-radius: 999px; background: #e7f1ef; }
.hbl-cl-bars em { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #1fb5a6, #0f3b3a); }
.hbl-cl-revs-wrap { min-width: 0; }
.hbl-cl .hbl-cl-revs .hb-cr-track { padding: 4px 4px 72px; scroll-padding: 0 4px; }
.hbl-cl .hbl-cl-revs .hb-cr-slide { flex-basis: calc((100% - var(--hb-gap)) / 1.6); }
.hbl-cl .hbl-cl-revs .hb-cr-btn {
  top: auto;
  bottom: 8px;
  width: 44px;
  height: 44px;
  margin: 0;
  border-color: #cfe3df;
  background: #fff;
  color: #0f3b3a;
  backdrop-filter: none;
}
.hbl-cl .hbl-cl-revs .hb-cr-btn:hover:not(:disabled) { background: #0f3b3a; color: #fff; }
.hbl-cl .hbl-cl-revs .hb-cr-btn:focus-visible { outline-color: #0f3b3a; }
.hbl-cl .hbl-cl-revs .hb-cr-prev { left: 4px; }
.hbl-cl .hbl-cl-revs .hb-cr-next { left: 56px; right: auto; }
.hbl-cl .hbl-cl-revs .hb-cr-dots { left: auto; right: 4px; bottom: 22px; padding: 0; background: none; transform: none; }
.hbl-cl .hbl-cl-revs .hb-cr-dot { background: #c3dcd7; }
.hbl-cl .hbl-cl-revs .hb-cr-dot[aria-current="true"] { width: 22px; background: #0f3b3a; }
.hbl-cl .hbl-cl-revs .hb-cr-track:focus-visible { box-shadow: 0 0 0 2px #0f3b3a; border-radius: 24px; }
.hbl-cl-rev {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0;
  padding: 28px;
  border: 1px solid #dcece8;
  border-radius: 26px;
  background: #fff;
  box-shadow: 0 30px 60px -48px rgba(15, 59, 58, .5);
}
.hbl-cl-rev-quote { position: absolute; top: 22px; right: 24px; color: #d9f3ee; }
.hbl-cl-rev blockquote { flex: 1; margin: 0; color: #12302f; font-family: var(--font-serif); font-size: 23px; line-height: 1.35; }
.hbl-cl-rev figcaption { display: flex; align-items: center; gap: 12px; padding-top: 16px; border-top: 1px solid #eef4f2; }
.hbl-cl-rev figcaption b { display: block; color: #0f3b3a; font-size: 14px; font-weight: 600; }
.hbl-cl-rev figcaption small { display: block; margin-top: 2px; color: #5d7a78; font-size: 12px; }
.hbl-cl-rev-av { display: grid; place-items: center; flex: none; width: 40px; height: 40px; border-radius: 50%; color: #fff; font-size: 13px; font-weight: 700; }

.hbl-cl-plan-toggle {
  display: flex;
  width: max-content;
  max-width: 100%;
  margin: 40px auto 0;
  padding: 5px;
  border: 1px solid #e3efec;
  border-radius: 999px;
  background: #fff;
}
.hbl-cl-plan-toggle button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 18px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #4b6866;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s ease, color .2s ease;
}
.hbl-cl-plan-toggle button span { padding: 3px 8px; border-radius: 999px; background: #ffe4df; color: #a2382c; font-size: 11px; }
.hbl-cl-plan-toggle button[aria-checked="true"] { background: #0f3b3a; color: #fff; }
.hbl-cl-plan-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 36px; align-items: stretch; }
.hbl-cl-plan {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 30px;
  border: 1px solid #e3efec;
  border-radius: 28px;
  background: #fff;
  box-shadow: 0 30px 60px -50px rgba(15, 59, 58, .5);
}
.hbl-cl-plan[data-featured="true"] {
  border-color: #0f3b3a;
  background:
    radial-gradient(90% 60% at 100% 0%, rgba(31, 181, 166, .35), transparent 70%),
    radial-gradient(70% 50% at 0% 100%, rgba(255, 122, 107, .18), transparent 70%),
    #0f3b3a;
  color: #e6f5f2;
  box-shadow: 0 50px 90px -40px rgba(15, 59, 58, .7);
}
.hbl-cl-plan-tag {
  position: absolute;
  top: 26px;
  right: 26px;
  padding: 5px 11px;
  border-radius: 999px;
  background: #ff7a6b;
  color: #0f3b3a;
  font-size: 12px;
  font-weight: 700;
}
.hbl-cl-plan h3 { margin: 0; color: #0f3b3a; font-family: var(--font-serif); font-size: 34px; font-weight: 400; line-height: 1; }
.hbl-cl-plan-who { margin: 8px 0 0; color: #5d7a78; font-size: 14px; }
.hbl-cl-plan-price { display: flex; align-items: baseline; gap: 6px; margin: 26px 0 0; }
.hbl-cl-plan-price b { color: #0f3b3a; font-family: var(--font-serif); font-size: 64px; font-weight: 400; line-height: 1; letter-spacing: -.02em; }
.hbl-cl-plan-price span { color: #5d7a78; font-size: 14px; }
.hbl-cl-plan-save { margin: 8px 0 22px; color: #127a70; font-size: 13px; font-weight: 600; }
.hbl-cl-plan ul { display: flex; flex-direction: column; gap: 12px; margin: 26px 0 0; padding: 22px 0 0; border-top: 1px solid #e3efec; list-style: none; }
.hbl-cl-plan li { display: flex; align-items: flex-start; gap: 10px; color: #2c4c4a; font-size: 14px; line-height: 1.45; }
.hbl-cl-plan li svg { flex: none; margin-top: 1px; color: #1fb5a6; }
.hbl-cl-plan[data-featured="true"] h3,
.hbl-cl-plan[data-featured="true"] .hbl-cl-plan-price b { color: #ffffff; }
.hbl-cl-plan[data-featured="true"] .hbl-cl-plan-who,
.hbl-cl-plan[data-featured="true"] .hbl-cl-plan-price span { color: #b6d9d3; }
.hbl-cl-plan[data-featured="true"] .hbl-cl-plan-save { color: #9fe3d8; }
.hbl-cl-plan[data-featured="true"] ul { border-top-color: rgba(255, 255, 255, .14); }
.hbl-cl-plan[data-featured="true"] li { color: #e6f5f2; }
.hbl-cl-plan[data-featured="true"] li svg { color: #5fd8c9; }
.hbl-cl-plan[data-featured="true"] .hbl-cl-btn:focus-visible { outline-color: #fff; }

.hbl-cl-loc-grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, .75fr); gap: 20px; margin-top: 52px; }
.hbl-cl-map {
  position: relative;
  min-width: 0;
  overflow: hidden;
  border: 1px solid #dcece8;
  border-radius: 30px;
  background: #eef7f4;
}
.hbl-cl-map-svg { display: block; width: 100%; height: auto; }
.hbl-cl-map-route { animation: hbl-cl-dash 1.6s linear infinite; }
.hbl-cl-map-pulse { transform-box: fill-box; transform-origin: center; animation: hbl-cl-mpulse 2.4s ease-out infinite; }
@keyframes hbl-cl-dash { to { stroke-dashoffset: -24; } }
@keyframes hbl-cl-mpulse {
  0% { transform: scale(.5); opacity: .5; }
  100% { transform: scale(1.5); opacity: 0; }
}
.hbl-cl-map-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 18px 22px;
  border-top: 1px solid #dcece8;
  background: #fff;
}
.hbl-cl-map-bar b { display: block; color: #0f3b3a; font-size: 15px; font-weight: 600; }
.hbl-cl-map-bar span { display: block; margin-top: 2px; color: #5d7a78; font-size: 13px; }
.hbl-cl-loc-side { display: flex; flex-direction: column; gap: 20px; min-width: 0; }
.hbl-cl-hours { padding: 26px; border: 1px solid #dcece8; border-radius: 28px; background: #fff; }
.hbl-cl-hours-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
.hbl-cl-hours h3, .hbl-cl-emerg h3 { margin: 0; color: #0f3b3a; font-family: var(--font-serif); font-size: 28px; font-weight: 400; line-height: 1.1; }
.hbl-cl-open { display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 999px; background: #d9f3ee; color: #0f3b3a; font-size: 12px; font-weight: 600; }
.hbl-cl-open i { width: 7px; height: 7px; border-radius: 50%; background: #1fb5a6; box-shadow: 0 0 0 3px rgba(31, 181, 166, .25); }
.hbl-cl-hours table { width: 100%; border-collapse: collapse; font-size: 14px; }
.hbl-cl-hours th, .hbl-cl-hours td { padding: 10px 10px; border-bottom: 1px solid #eef4f2; font-weight: 500; text-align: left; }
.hbl-cl-hours th { color: #2c4c4a; }
.hbl-cl-hours td { color: #4b6866; text-align: right; font-variant-numeric: tabular-nums; }
.hbl-cl-hours tr:last-child th, .hbl-cl-hours tr:last-child td { border-bottom: 0; }
.hbl-cl-hours tr[data-today="true"] th, .hbl-cl-hours tr[data-today="true"] td { background: #eef9f6; color: #0f3b3a; font-weight: 700; }
.hbl-cl-hours tr[data-today="true"] th { border-radius: 12px 0 0 12px; }
.hbl-cl-hours tr[data-today="true"] td { border-radius: 0 12px 12px 0; }
.hbl-cl-today { margin-left: 8px; padding: 2px 7px; border-radius: 999px; background: #0f3b3a; color: #fff; font-size: 10px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; vertical-align: 1px; }
.hbl-cl-emerg {
  display: flex;
  gap: 16px;
  padding: 26px;
  border: 1px solid #ffd2cb;
  border-radius: 28px;
  background: linear-gradient(160deg, #fff4f1, #ffe8e3);
}
.hbl-cl-emerg-ico { display: grid; place-items: center; flex: none; width: 46px; height: 46px; border-radius: 15px; background: #ff7a6b; color: #0f3b3a; }
.hbl-cl-emerg p { margin: 8px 0 0; color: #5a3e39; font-size: 14px; line-height: 1.55; }
.hbl-cl-emerg-phone {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  color: #0f3b3a;
  font-family: var(--font-serif);
  font-size: 30px;
  line-height: 1;
  text-decoration: none;
}
.hbl-cl-emerg-phone:hover { color: #a2382c; }

.hbl-cl-faq-grid { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: 64px; align-items: start; }
.hbl-cl-faq-grid > * { min-width: 0; }
.hbl-cl-faq-note { margin: 24px 0 0; color: #4b6866; font-size: 15px; line-height: 1.6; }
.hbl-cl-faq-note a { color: #0f3b3a; font-weight: 600; }
.hbl-cl .hbl-cl-acc { color: #0f3b3a; }
.hbl-cl .hbl-cl-acc .hb-ac-item { border-bottom-color: #dcece8; }
.hbl-cl .hbl-cl-acc .hb-ac-item:first-child { border-top-color: #dcece8; }
.hbl-cl .hbl-cl-acc .hb-ac-trigger { padding: 22px 4px; font-size: 18px; font-weight: 500; }
.hbl-cl .hbl-cl-acc .hb-ac-trigger:hover { color: #127a70; }
.hbl-cl .hbl-cl-acc .hb-ac-trigger:focus-visible { outline-color: #0f3b3a; }
.hbl-cl .hbl-cl-acc .hb-ac-body { padding: 0 4px 22px; color: #4b6866; font-size: 15px; line-height: 1.65; }

.hbl-cl-final-wrap { padding-top: 40px; }
.hbl-cl-final {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: 96px 40px;
  border-radius: 40px;
  background: linear-gradient(160deg, #0f3b3a, #0c2f2e 60%, #123f3d);
  text-align: center;
}
.hbl-cl-final-blob {
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  filter: blur(10px);
  animation: hbl-cl-morph 18s ease-in-out infinite alternate;
}
.hbl-cl-final-blob-a { top: -30%; right: -10%; width: 520px; height: 520px; background: radial-gradient(circle, rgba(31, 181, 166, .55), transparent 65%); }
.hbl-cl-final-blob-b { bottom: -40%; left: -12%; width: 480px; height: 480px; background: radial-gradient(circle, rgba(255, 122, 107, .35), transparent 65%); animation-delay: -7s; }
.hbl-cl-final-inner { position: relative; max-width: 760px; margin: 0 auto; }
.hbl-cl-final-title {
  margin: 0;
  color: #fbfdfc;
  font-family: var(--font-serif);
  font-size: clamp(42px, 6.4vw, 84px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -.02em;
  text-wrap: balance;
}
.hbl-cl-final-title em { color: #9fe3d8; font-style: italic; }
.hbl-cl-final-text { max-width: 520px; margin: 22px auto 0; color: #bcd9d4; font-size: 17px; line-height: 1.6; }
.hbl-cl-final-ctas { justify-content: center; }

.hbl-cl-footer { padding: 72px 0 0; border-top: 1px solid #e3efec; background: #f5faf9; }
.hbl-cl-foot-grid { display: grid; grid-template-columns: minmax(0, 1.5fr) repeat(3, minmax(0, 1fr)) minmax(0, 1fr); gap: 32px; }
.hbl-cl-foot-grid > * { min-width: 0; }
.hbl-cl-foot-brand address { margin: 20px 0 0; color: #2c4c4a; font-size: 14px; font-style: normal; line-height: 1.6; }
.hbl-cl-foot-brand p { margin: 12px 0 0; color: #5d7a78; font-size: 13px; line-height: 1.6; }
.hbl-cl-socials { display: flex; gap: 8px; margin-top: 20px; }
.hbl-cl-socials a {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid #dcece8;
  border-radius: 50%;
  background: #fff;
  color: #0f3b3a;
  transition: background .2s ease, color .2s ease, border-color .2s ease;
}
.hbl-cl-socials a:hover { border-color: #0f3b3a; background: #0f3b3a; color: #fff; }
.hbl-cl-foot-col h3, .hbl-cl-foot-call h3 { margin: 0 0 16px; color: #0f3b3a; font-size: 13px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
.hbl-cl-foot-col ul { display: flex; flex-direction: column; gap: 10px; margin: 0; padding: 0; list-style: none; }
.hbl-cl-foot-col a { color: #4b6866; font-size: 14px; text-decoration: none; }
.hbl-cl-foot-col a:hover { color: #0f3b3a; text-decoration: underline; text-underline-offset: 3px; }
.hbl-cl-foot-call { display: flex; flex-direction: column; }
.hbl-cl-foot-call a { color: #0f3b3a; font-family: var(--font-serif); font-size: 24px; text-decoration: none; }
.hbl-cl-foot-call a:hover { color: #127a70; }
.hbl-cl-foot-call span { margin-top: 14px; color: #5d7a78; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; }
.hbl-cl-foot-bottom {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 56px;
  padding: 24px 0 32px;
  border-top: 1px solid #e3efec;
  color: #5d7a78;
  font-size: 13px;
}
.hbl-cl-foot-bottom span:last-child { display: flex; gap: 18px; }
.hbl-cl-foot-bottom a { color: #4b6866; text-decoration: none; }
.hbl-cl-foot-bottom a:hover { color: #0f3b3a; }
.hbl-cl-mbar { display: none; }

@media (max-width: 1100px) {
  .hbl-cl-links { display: none; }
  .hbl-cl-team-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hbl-cl-foot-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .hbl-cl-foot-brand { grid-column: 1 / -1; }
}
@media (max-width: 960px) {
  .hbl-cl-section { padding: 88px 0; }
  .hbl-cl-hero-grid,
  .hbl-cl-results-grid,
  .hbl-cl-visit-grid,
  .hbl-cl-reviews-grid,
  .hbl-cl-faq-grid,
  .hbl-cl-loc-grid { grid-template-columns: minmax(0, 1fr); gap: 44px; }
  .hbl-cl-hero-art { min-height: 0; padding: 56px 0 40px; }
  .hbl-cl-svc-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hbl-cl-plan-grid { grid-template-columns: minmax(0, 1fr); max-width: 520px; margin-left: auto; margin-right: auto; }
  .hbl-cl-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hbl-cl-stat:nth-child(3) { border-left: 0; }
  .hbl-cl-stat:nth-child(n + 3) { border-top: 1px solid #e3efec; }
  .hbl-cl .hbl-cl-revs .hb-cr-slide { flex-basis: calc((100% - var(--hb-gap)) / 1.25); }
}
@media (max-width: 640px) {
  .hbl-cl-wrap { padding: 0 18px; }
  .hbl-cl-section { padding: 72px 0; }
  .hbl-cl-nav-phone { display: none; }
  .hbl-cl-brand { font-size: 22px; }
  .hbl-cl-hero { padding: 16px 0 56px; }
  .hbl-cl-lede { font-size: 16px; }
  .hbl-cl-hero-ctas .hbl-cl-btn { flex: 1 1 100%; }
  .hbl-cl-hero-proof { flex-wrap: wrap; }
  .hbl-cl-hero-art { padding: 64px 0 16px; }
  .hbl-cl-chip-next { top: 0; left: 0; }
  .hbl-cl-chip-calm { display: none; }
  .hbl-cl-blob-a { right: -30%; width: 110%; }
  .hbl-cl-blob-b { left: -30%; width: 80%; }
  .hbl-cl-book { padding: 18px; border-radius: 24px; }
  .hbl-cl-svc-grid, .hbl-cl-team-grid { grid-template-columns: minmax(0, 1fr); }
  .hbl-cl-stats { grid-template-columns: minmax(0, 1fr); }
  .hbl-cl-stat + .hbl-cl-stat { border-left: 0; border-top: 1px solid #e3efec; }
  .hbl-cl-stat { padding: 22px; }
  .hbl-cl-insure { flex-direction: column; align-items: flex-start; gap: 14px; }
  .hbl-cl-insure-row { width: 100%; }
  .hbl-cl-results-stats dd { font-size: 34px; }
  .hbl-cl-stepper-card { padding: 22px 18px; border-radius: 26px; }
  .hbl-cl-step { min-height: 380px; }
  .hbl-cl .hbl-cl-revs .hb-cr-slide { flex-basis: 100%; }
  .hbl-cl-rev blockquote { font-size: 20px; }
  .hbl-cl-plan { padding: 24px; }
  .hbl-cl-hours, .hbl-cl-emerg { padding: 22px; }
  .hbl-cl-hours th, .hbl-cl-hours td { padding: 9px 6px; font-size: 13px; }
  .hbl-cl-final { padding: 64px 22px; border-radius: 30px; }
  .hbl-cl-final-ctas .hbl-cl-btn { flex: 1 1 100%; }
  .hbl-cl-foot-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hbl-cl-foot-call { grid-column: 1 / -1; }
  .hbl-cl-foot-bottom { padding-bottom: 24px; }
  .hbl-cl-mbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 18px;
    border-top: 1px solid #dcece8;
    background: #fff;
  }
  .hbl-cl-mbar b { display: block; color: #0f3b3a; font-size: 13px; font-weight: 600; }
  .hbl-cl-mbar small { display: block; margin-top: 2px; color: #5d7a78; font-size: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .hbl-cl-blob,
  .hbl-cl-final-blob,
  .hbl-cl-chip,
  .hbl-cl-chip-pulse::after,
  .hbl-cl-map-route,
  .hbl-cl-map-pulse,
  .hbl-cl-book-done { animation: none; }
  .hbl-cl-btn,
  .hbl-cl .hbl-cl-svc,
  .hbl-cl-svc-ico,
  .hbl-cl-day,
  .hbl-cl-slot,
  .hbl-cl-seg-btn { transition: none; }
  .hbl-cl-btn:hover,
  .hbl-cl .hbl-cl-svc:hover,
  .hbl-cl-svc:hover .hbl-cl-svc-ico { transform: none; }
}
`;

export function ClinicStyles() {
  return (
    <style href="hbl-cl" precedence="default">
      {css}
    </style>
  );
}
