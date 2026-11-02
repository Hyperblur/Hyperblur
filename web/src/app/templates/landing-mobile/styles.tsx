const css = `
.hbl-mb {
  position: relative;
  isolation: isolate;
  overflow-x: clip;
  background: #f7f5ef;
  color: #14532d;
  font-family: var(--font-sans);
  color-scheme: light;
  -webkit-font-smoothing: antialiased;
}
.hbl-mb ::selection { background: #bef264; color: #14532d; }
.hbl-mb a:focus-visible,
.hbl-mb button:focus-visible,
.hbl-mb [tabindex]:focus-visible {
  outline: 2px solid #e07a5f;
  outline-offset: 3px;
}
.hbl-mb-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.hbl-mb-section {
  position: relative;
  padding: 120px 0;
}

.hbl-mb-nav {
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
.hbl-mb-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #14532d;
  text-decoration: none;
  border-radius: 12px;
}
.hbl-mb-brand span {
  font-family: var(--font-serif);
  font-size: 30px;
  line-height: 1;
  letter-spacing: -0.01em;
}
.hbl-mb-links {
  display: flex;
  gap: 2px;
  padding: 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(20, 83, 45, 0.1);
  box-shadow: 0 8px 24px -18px rgba(20, 83, 45, 0.4);
  backdrop-filter: blur(8px);
}
.hbl-mb-links a {
  padding: 8px 16px;
  border-radius: 999px;
  color: #2f4d39;
  font-size: 14.5px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.hbl-mb-links a:hover { background: #fff; color: #14532d; }
.hbl-mb-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 18px;
  border-radius: 999px;
  background: #14532d;
  color: #f7f5ef;
  font-size: 14.5px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 12px 24px -14px rgba(20, 83, 45, 0.8);
  transition: background-color 0.2s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hbl-mb-pill svg { transition: transform 0.25s ease; }
.hbl-mb-pill:hover { background: #166534; transform: translateY(-1px); }
.hbl-mb-pill:hover svg { transform: translateX(3px); }

.hbl-mb-hero {
  position: relative;
  z-index: 2;
  padding: 64px 0 0;
}
.hbl-mb-hero::before {
  content: "";
  position: absolute;
  inset: -90px 0 0;
  background-image: radial-gradient(rgba(20, 83, 45, 0.14) 1px, transparent 1.5px);
  background-size: 24px 24px;
  -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 30%, #000 20%, transparent 75%);
  mask-image: radial-gradient(ellipse 60% 50% at 50% 30%, #000 20%, transparent 75%);
  pointer-events: none;
}
.hbl-mb-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.hbl-mb-blob-1 {
  top: -220px;
  left: -200px;
  width: 640px;
  height: 640px;
  background: radial-gradient(circle, rgba(190, 242, 100, 0.55), rgba(190, 242, 100, 0) 66%);
}
.hbl-mb-blob-2 {
  top: -40px;
  right: -220px;
  width: 560px;
  height: 560px;
  background: radial-gradient(circle, rgba(224, 122, 95, 0.32), rgba(224, 122, 95, 0) 66%);
}
.hbl-mb-blob-3 {
  top: 560px;
  left: 50%;
  width: 900px;
  height: 600px;
  margin-left: -450px;
  background: radial-gradient(ellipse, rgba(190, 242, 100, 0.42), rgba(190, 242, 100, 0) 64%);
}
.hbl-mb-hero-copy {
  position: relative;
  z-index: 3;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.hbl-mb-announce {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 5px 14px 5px 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(20, 83, 45, 0.12);
  color: #14532d;
  font-size: 13.5px;
  font-weight: 500;
  text-decoration: none;
  text-align: left;
  box-shadow: 0 10px 24px -18px rgba(20, 83, 45, 0.5);
  transition: background-color 0.2s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hbl-mb-announce:hover { background: #fff; transform: translateY(-1px); }
.hbl-mb-announce-tag {
  flex: none;
  padding: 3px 9px;
  border-radius: 999px;
  background: #14532d;
  color: #bef264;
  font-size: 11.5px;
  font-weight: 700;
}
.hbl-mb-h1 {
  margin: 28px 0 0;
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: clamp(3rem, 9.4vw, 6rem);
  line-height: 0.96;
  letter-spacing: -0.03em;
  color: #14532d;
}
.hbl-mb-h1-line { display: block; }
.hbl-mb-rot {
  position: relative;
  display: inline-block;
  isolation: isolate;
  font-style: italic;
  padding: 0 0.04em;
}
.hbl-mb-rot .hb-rt { line-height: 1.12; }
.hbl-mb-rot::after {
  content: "";
  position: absolute;
  z-index: -1;
  left: -0.02em;
  right: -0.02em;
  bottom: 0.1em;
  height: 0.3em;
  border-radius: 999px;
  background: #bef264;
  transform-origin: left center;
  animation: hbl-mb-swash 1.1s 0.3s cubic-bezier(0.22, 0.8, 0.24, 1) both;
}
.hbl-mb-lede {
  margin: 26px auto 0;
  max-width: 620px;
  font-size: clamp(1.05rem, 1.6vw, 1.2rem);
  line-height: 1.6;
  color: #3d5c47;
}
.hbl-mb-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 34px;
}
.hbl-mb-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  min-width: 176px;
  padding: 9px 22px 9px 14px;
  border-radius: 16px;
  background: #14532d;
  color: #f7f5ef;
  text-decoration: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 14px 28px -16px rgba(20, 83, 45, 0.75);
  transition: background-color 0.2s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hbl-mb-badge:hover { background: #166534; transform: translateY(-2px); }
.hbl-mb-badge-t {
  display: flex;
  flex-direction: column;
  text-align: left;
  line-height: 1.12;
}
.hbl-mb-badge-t small { font-size: 10.5px; letter-spacing: 0.02em; opacity: 0.82; }
.hbl-mb-badge-t b { font-size: 17px; font-weight: 600; letter-spacing: -0.01em; }
.hbl-mb-proofline {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin-top: 28px;
}
.hbl-mb-proof-t {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}
.hbl-mb-proof-t small { font-size: 13.5px; color: #3d5c47; }
.hbl-mb-proof-stars { display: flex; align-items: center; gap: 6px; }
.hbl-mb-proof-stars b { font-size: 14px; font-weight: 700; }

.hbl-mb-stage {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  height: 660px;
  margin: 64px auto 0;
}
.hbl-mb-slot {
  position: absolute;
  top: 0;
  left: calc(50% + var(--hbl-mb-x, 0px));
  transform: translateX(-50%) scale(var(--hbl-mb-s, 1));
  transform-origin: top center;
}
.hbl-mb-slot-c { z-index: 3; }
.hbl-mb-slot-l { --hbl-mb-x: -300px; --hbl-mb-s: 0.9; top: 84px; z-index: 2; }
.hbl-mb-slot-r { --hbl-mb-x: 300px; --hbl-mb-s: 0.9; top: 84px; z-index: 2; }
.hbl-mb-drift {
  transform: translate3d(0, var(--hbl-mb-y, 0px), 0);
  will-change: transform;
}
.hbl-mb-float { animation: hbl-mb-float 7s ease-in-out infinite; }
.hbl-mb-tilt-l { transform: rotate(-7deg); }
.hbl-mb-tilt-r { transform: rotate(7deg); }
.hbl-mb-chip-wrap { position: absolute; z-index: 4; }
.hbl-mb-chip-a { left: calc(50% - 540px); top: 380px; }
.hbl-mb-chip-b { left: calc(50% + 200px); top: 36px; }
.hbl-mb-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px 10px 10px;
  border-radius: 18px;
  background: rgba(255, 253, 248, 0.94);
  border: 1px solid rgba(20, 83, 45, 0.1);
  box-shadow: 0 24px 44px -22px rgba(20, 83, 45, 0.5), 0 2px 6px -2px rgba(20, 83, 45, 0.16);
  backdrop-filter: blur(10px);
  white-space: nowrap;
  text-align: left;
  animation: hbl-mb-float 6s ease-in-out infinite reverse;
}
.hbl-mb-chip > span:last-child { display: flex; flex-direction: column; gap: 1px; }
.hbl-mb-chip b { font-size: 13.5px; font-weight: 600; color: #14532d; }
.hbl-mb-chip small { font-size: 12px; color: #4f6e58; }
.hbl-mb-chip-ic {
  display: grid;
  place-items: center;
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  color: #14532d;
}

.hbl-mb-phone {
  position: relative;
  box-sizing: border-box;
  width: 288px;
  height: 596px;
  margin: 0;
  padding: 9px;
  border-radius: 46px;
  background: linear-gradient(160deg, #2f3833, #121814 55%, #222a25);
  box-shadow:
    inset 0 0 0 1.5px rgba(255, 255, 255, 0.16),
    inset 0 0 0 4px #0b0f0c,
    0 60px 90px -46px rgba(20, 83, 45, 0.6),
    0 26px 44px -26px rgba(40, 26, 12, 0.4);
}
.hbl-mb-phone::before {
  content: "";
  position: absolute;
  top: 150px;
  right: -3px;
  width: 3px;
  height: 72px;
  border-radius: 0 3px 3px 0;
  background: #29312c;
}
.hbl-mb-phone::after {
  content: "";
  position: absolute;
  top: 118px;
  left: -3px;
  width: 3px;
  height: 40px;
  border-radius: 3px 0 0 3px;
  background: #29312c;
  box-shadow: 0 54px 0 #29312c;
}
.hbl-mb-screen {
  position: relative;
  isolation: isolate;
  height: 100%;
  overflow: hidden;
  border-radius: 37px;
  background: #fbfaf5;
  color: #14532d;
  font-family: var(--font-sans);
  text-align: left;
}
.hbl-mb-screen-dark { background: #0f1f15; }
.hbl-mb-island {
  position: absolute;
  z-index: 6;
  top: 10px;
  left: 50%;
  width: 88px;
  height: 26px;
  margin-left: -44px;
  border-radius: 20px;
  background: #050605;
}
.hbl-mb-status {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  padding: 4px 24px 0 30px;
  color: #14532d;
  font-size: 13px;
  font-weight: 600;
}
.hbl-mb-status-light { color: #fff; }
.hbl-mb-status-ic { display: flex; align-items: center; gap: 5px; }
.hbl-mb-app {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.hbl-mb-pad {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  padding: 4px 16px 0;
}
.hbl-mb-eyebrow { margin: 6px 0 0; font-size: 11px; color: #4f6e58; letter-spacing: 0.02em; }
.hbl-mb-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.hbl-mb-scr-title {
  margin: 2px 0 0;
  font-family: var(--font-serif);
  font-size: 28px;
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: #14532d;
}
.hbl-mb-ava {
  display: inline-grid;
  place-items: center;
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  font-style: normal;
}
.hbl-mb-streak {
  margin-top: 12px;
  padding: 12px 12px 10px;
  border-radius: 20px;
  background: linear-gradient(160deg, #d9f99d, #bef264);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
}
.hbl-mb-streak-top { display: flex; align-items: center; gap: 8px; }
.hbl-mb-streak-top p { flex: 1; margin: 0; font-size: 12px; font-weight: 500; }
.hbl-mb-streak-top p b {
  margin-right: 2px;
  font-family: var(--font-serif);
  font-size: 26px;
  font-weight: 400;
  line-height: 1;
}
.hbl-mb-flame {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background: #14532d;
  color: #bef264;
}
.hbl-mb-streak-best {
  padding: 3px 7px;
  border-radius: 999px;
  background: rgba(20, 83, 45, 0.12);
  font-size: 10px;
  font-weight: 600;
}
.hbl-mb-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
}
.hbl-mb-week li {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: rgba(20, 83, 45, 0.72);
  font-size: 9.5px;
  font-weight: 600;
}
.hbl-mb-week i {
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(20, 83, 45, 0.12);
}
.hbl-mb-week li[data-s="done"] i { background: #14532d; }
.hbl-mb-week li[data-s="today"] i {
  background: #fff;
  box-shadow: 0 0 0 2px #14532d;
  animation: hbl-mb-pulse 2.4s ease-in-out infinite;
}
.hbl-mb-label {
  margin: 14px 0 8px;
  color: #4f6e58;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.hbl-mb-tasks {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hbl-mb-tasks li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid rgba(20, 83, 45, 0.06);
  box-shadow: 0 6px 14px -10px rgba(20, 83, 45, 0.3);
}
.hbl-mb-thumb {
  display: grid;
  place-items: center;
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 11px;
  color: #14532d;
}
.hbl-mb-task-t { display: flex; flex: 1; flex-direction: column; min-width: 0; }
.hbl-mb-task-t b { font-size: 12.5px; font-weight: 600; }
.hbl-mb-task-t small {
  overflow: hidden;
  color: #587560;
  font-size: 10.5px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hbl-mb-check {
  box-sizing: border-box;
  display: grid;
  place-items: center;
  flex: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid rgba(20, 83, 45, 0.25);
  color: transparent;
}
.hbl-mb-check-on { background: #14532d; border-color: #14532d; color: #bef264; }
.hbl-mb-check-anim { animation: hbl-mb-tick 6s ease-in-out infinite; }
.hbl-mb-tabbar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: auto;
  padding: 10px 20px 22px;
  border-top: 1px solid rgba(20, 83, 45, 0.08);
  background: rgba(255, 255, 255, 0.86);
  color: rgba(20, 83, 45, 0.38);
}
.hbl-mb-tabbar span { position: relative; display: grid; place-items: center; }
.hbl-mb-tab-on { color: #14532d; }
.hbl-mb-tab-on::after {
  content: "";
  position: absolute;
  bottom: -7px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #e07a5f;
}

.hbl-mb-id .hbl-mb-status { position: absolute; z-index: 3; inset: 0 0 auto; }
.hbl-mb-viewfinder {
  position: relative;
  flex: 1;
  overflow: hidden;
  background: radial-gradient(circle at 50% 38%, #3f7f51, #1f4f2f 58%, #0f2a19);
}
.hbl-mb-viewfinder::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 15%, rgba(255, 236, 200, 0.35), transparent 40%);
}
.hbl-mb-hint {
  position: absolute;
  z-index: 2;
  top: 56px;
  left: 50%;
  padding: 5px 11px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  font-size: 10.5px;
  font-weight: 500;
  white-space: nowrap;
  transform: translateX(-50%);
  backdrop-filter: blur(6px);
}
.hbl-mb-id-plant {
  position: absolute;
  top: 90px;
  left: 50%;
  width: 210px;
  margin-left: -105px;
  filter: drop-shadow(0 24px 22px rgba(0, 0, 0, 0.35));
}
.hbl-mb-corner {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 3px solid #bef264;
}
.hbl-mb-c1 { top: 92px; left: 34px; border-right: 0; border-bottom: 0; border-radius: 14px 0 0 0; }
.hbl-mb-c2 { top: 92px; right: 34px; border-left: 0; border-bottom: 0; border-radius: 0 14px 0 0; }
.hbl-mb-c3 { top: 330px; left: 34px; border-right: 0; border-top: 0; border-radius: 0 0 0 14px; }
.hbl-mb-c4 { top: 330px; right: 34px; border-left: 0; border-top: 0; border-radius: 0 0 14px 0; }
.hbl-mb-scanline {
  position: absolute;
  top: 100px;
  left: 42px;
  right: 42px;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, transparent, #bef264, transparent);
  box-shadow: 0 0 16px 3px rgba(190, 242, 100, 0.55);
  animation: hbl-mb-scan 2.8s ease-in-out infinite alternate;
}
.hbl-mb-sheet {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: -30px;
  padding: 10px 18px 22px;
  border-radius: 26px 26px 0 0;
  background: #fbfaf5;
}
.hbl-mb-handle {
  display: block;
  width: 36px;
  height: 4px;
  margin: 0 auto 6px;
  border-radius: 4px;
  background: rgba(20, 83, 45, 0.18);
}
.hbl-mb-sheet-title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 23px;
  line-height: 1.1;
}
.hbl-mb-match {
  flex: none;
  padding: 4px 8px;
  border-radius: 999px;
  background: #bef264;
  font-size: 11px;
  font-weight: 700;
}
.hbl-mb-sheet-sub { margin: 0; color: #4f6e58; font-size: 11px; }
.hbl-mb-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
.hbl-mb-chips span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 8px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid rgba(20, 83, 45, 0.1);
  font-size: 10.5px;
  font-weight: 500;
}
.hbl-mb-sheet-btn {
  display: block;
  margin-top: 8px;
  padding: 11px;
  border-radius: 14px;
  background: #14532d;
  color: #f7f5ef;
  font-size: 12.5px;
  font-weight: 600;
  text-align: center;
}

.hbl-mb-iconbtn {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid rgba(20, 83, 45, 0.1);
}
.hbl-mb-seg {
  display: flex;
  gap: 4px;
  margin-top: 12px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(20, 83, 45, 0.07);
  font-size: 11px;
  font-weight: 600;
}
.hbl-mb-seg span {
  flex: 1;
  padding: 6px 0;
  border-radius: 999px;
  color: rgba(20, 83, 45, 0.6);
  text-align: center;
}
.hbl-mb-seg .hbl-mb-seg-on {
  background: #fff;
  color: #14532d;
  box-shadow: 0 2px 6px -2px rgba(20, 83, 45, 0.25);
}
.hbl-mb-post {
  margin-top: 12px;
  padding: 10px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid rgba(20, 83, 45, 0.07);
  box-shadow: 0 12px 24px -18px rgba(20, 83, 45, 0.45);
}
.hbl-mb-post-head { display: flex; align-items: center; gap: 8px; }
.hbl-mb-post-head > span:last-child { display: flex; flex-direction: column; }
.hbl-mb-post-head b { font-size: 12px; font-weight: 600; }
.hbl-mb-post-head small { color: #587560; font-size: 10px; }
.hbl-mb-post-img {
  position: relative;
  height: 196px;
  margin-top: 8px;
  overflow: hidden;
  border-radius: 14px;
  background: radial-gradient(circle at 30% 20%, #fdeee4, #f1d9c8 50%, #e8c1aa);
}
.hbl-mb-post-img::before {
  content: "";
  position: absolute;
  top: 14px;
  right: 16px;
  width: 56px;
  height: 74px;
  border-radius: 28px 28px 6px 6px;
  background: linear-gradient(#fffaf2, #fbe4d2);
  box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.75);
}
.hbl-mb-post-plant {
  position: absolute;
  bottom: -6px;
  left: 50%;
  width: 168px;
  margin-left: -84px;
}
.hbl-mb-post-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(20, 83, 45, 0.88);
  color: #bef264;
  font-size: 10px;
  font-weight: 700;
}
.hbl-mb-post-cap { margin: 8px 2px 0; color: #24432f; font-size: 11.5px; line-height: 1.4; }
.hbl-mb-post-actions { display: flex; align-items: center; gap: 12px; margin-top: 8px; }
.hbl-mb-post-meta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #4f6e58;
  font-size: 11px;
  font-weight: 600;
}

.hbl-mb-navrow { margin-top: 4px; font-size: 12px; font-weight: 600; }
.hbl-mb-profile-art {
  position: relative;
  height: 168px;
  margin-top: 10px;
  overflow: hidden;
  border-radius: 22px;
  background: radial-gradient(circle at 50% 30%, #e4fbb4, #bef264 72%);
}
.hbl-mb-profile-plant {
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 150px;
  margin-left: -75px;
}
.hbl-mb-profile-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 9px;
  border-radius: 999px;
  background: #fff;
  font-size: 10px;
  font-weight: 700;
}
.hbl-mb-profile-art + .hbl-mb-scr-title { margin-top: 12px; }
.hbl-mb-rings {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-top: 12px;
}
.hbl-mb-ring {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 4px 8px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid rgba(20, 83, 45, 0.07);
}
.hbl-mb-ring b {
  position: absolute;
  top: 29px;
  font-size: 11px;
  font-weight: 700;
  line-height: 14px;
}
.hbl-mb-ring span { margin-top: 4px; font-size: 11px; font-weight: 600; }
.hbl-mb-ring small { color: #587560; font-size: 9.5px; }
.hbl-mb-ring-arc { stroke-dashoffset: var(--hbl-mb-off); }
.hb-fv[data-inview="true"] .hbl-mb-ring-arc {
  animation: hbl-mb-ring 1.6s 0.3s cubic-bezier(0.22, 0.8, 0.24, 1) both;
}
.hbl-mb-rate {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 16px;
  background: #14532d;
  color: #f7f5ef;
  font-size: 11.5px;
  font-weight: 500;
}

.hbl-mb-lock {
  background:
    radial-gradient(circle at 25% 18%, rgba(190, 242, 100, 0.34), transparent 45%),
    radial-gradient(circle at 85% 92%, rgba(224, 122, 95, 0.5), transparent 52%),
    linear-gradient(170deg, #1f6b3a, #14532d 50%, #0c3a1f);
  color: #fff;
}
.hbl-mb-lock::after {
  content: "";
  position: absolute;
  bottom: 8px;
  left: 50%;
  width: 110px;
  height: 4px;
  margin-left: -55px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.8);
}
.hbl-mb-lock-clock {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
}
.hbl-mb-lock-clock span { font-size: 13px; font-weight: 500; opacity: 0.86; }
.hbl-mb-lock-clock b {
  font-size: 78px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
}
.hbl-mb-notes {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 30px 0 0;
  padding: 0 10px;
  list-style: none;
}
.hbl-mb-notes li {
  display: flex;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 20px;
  background: rgba(255, 253, 248, 0.86);
  color: #14532d;
  box-shadow: 0 12px 26px -14px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(14px);
  animation: hbl-mb-note 9s cubic-bezier(0.22, 0.8, 0.24, 1) infinite both;
  animation-delay: calc(var(--hbl-mb-i) * 0.7s);
}
.hbl-mb-note-ic { flex: none; line-height: 0; }
.hbl-mb-note-t {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  color: #24432f;
  font-size: 11px;
  line-height: 1.35;
}
.hbl-mb-note-head { display: flex; justify-content: space-between; gap: 6px; }
.hbl-mb-note-head b { color: #14532d; font-size: 12px; font-weight: 700; }
.hbl-mb-note-head small { flex: none; color: #587560; font-size: 10px; }
.hbl-mb-lock-foot {
  position: absolute;
  right: 0;
  bottom: 28px;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 32px;
}
.hbl-mb-lock-foot span {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  backdrop-filter: blur(10px);
}

.hbl-mb-head {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 760px;
}
.hbl-mb-head-center {
  align-items: center;
  margin: 0 auto 60px;
  text-align: center;
}
.hbl-mb-head-left { align-items: flex-start; margin-bottom: 30px; }
.hbl-mb-eyebrow-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 13px 6px 10px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid rgba(20, 83, 45, 0.12);
  color: #14532d;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.01em;
  box-shadow: 0 6px 14px -10px rgba(20, 83, 45, 0.4);
}
.hbl-mb-eyebrow-pill::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #84cc16;
  box-shadow: 0 0 0 3px rgba(190, 242, 100, 0.45);
}
.hbl-mb-head-dark .hbl-mb-eyebrow-pill,
.hbl-mb-eyebrow-dark {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.18);
  color: #f7f5ef;
  box-shadow: none;
}
.hbl-mb-h2 {
  margin: 0;
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 5.4vw, 4.3rem);
  font-weight: 400;
  line-height: 1.02;
  letter-spacing: -0.025em;
  color: #14532d;
  text-wrap: balance;
}
.hbl-mb em { font-style: italic; color: #b5543a; }
.hbl-mb-head-dark .hbl-mb-h2 { color: #f7f5ef; }
.hbl-mb-head-dark em { color: #bef264; }
.hbl-mb-head-lede {
  max-width: 600px;
  margin: 0;
  color: #3d5c47;
  font-size: 18px;
  line-height: 1.6;
}
.hbl-mb-head-dark .hbl-mb-head-lede { color: rgba(247, 245, 239, 0.8); }

.hbl-mb-proof {
  position: relative;
  z-index: 1;
  margin-top: -170px;
  padding: 220px 0 96px;
  border-top: 1px solid rgba(20, 83, 45, 0.08);
  border-radius: 48px 48px 0 0;
  background: #fffdf8;
  box-shadow: 0 -30px 60px -44px rgba(20, 83, 45, 0.3);
}
.hbl-mb-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  overflow: hidden;
  border: 1px solid rgba(20, 83, 45, 0.1);
  border-radius: 28px;
  background: #fffdf8;
}
.hbl-mb-stat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  height: 100%;
  box-sizing: border-box;
  padding: 30px 28px;
  box-shadow: -1px -1px 0 rgba(20, 83, 45, 0.1);
}
.hbl-mb-stat-n {
  font-family: var(--font-serif);
  font-size: clamp(2.6rem, 5vw, 3.9rem);
  line-height: 1;
  letter-spacing: -0.02em;
  color: #14532d;
  font-variant-numeric: tabular-nums;
}
.hbl-mb-stat-l { color: #3d5c47; font-size: 14.5px; line-height: 1.4; }
.hbl-mb-press { margin-top: 56px; }
.hbl-mb-press-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 320px;
  margin: 0;
  padding: 22px 24px;
  border-radius: 24px;
  background: #f7f5ef;
  border: 1px solid rgba(20, 83, 45, 0.09);
}
.hbl-mb-press-laurel {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #65a30d;
}
.hbl-mb-press-laurel > span {
  color: #14532d;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.hbl-mb-press-card blockquote {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 21px;
  line-height: 1.25;
  color: #14532d;
}
.hbl-mb-press-card figcaption { color: #a8482f; font-size: 13px; font-weight: 600; }

.hbl-mb-bento {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-areas: "streak streak id" "light water id" "vac vac vac";
  gap: 20px;
}
.hbl-mb-b-streak { grid-area: streak; }
.hbl-mb-b-id { grid-area: id; }
.hbl-mb-b-light { grid-area: light; }
.hbl-mb-b-water { grid-area: water; }
.hbl-mb-b-vac { grid-area: vac; }
.hbl-mb-card {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  overflow: hidden;
  padding: 28px;
  border-radius: 24px;
  background: #fffdf8;
  border: 1px solid rgba(20, 83, 45, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 28px 50px -40px rgba(20, 83, 45, 0.45);
  transition: transform 0.45s cubic-bezier(0.22, 0.8, 0.24, 1), box-shadow 0.45s ease;
}
.hbl-mb-card:hover {
  transform: translateY(-4px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 36px 60px -38px rgba(20, 83, 45, 0.55);
}
.hbl-mb-card-lime { background: linear-gradient(160deg, #e4fbb4, #bef264 80%); border-color: rgba(20, 83, 45, 0.12); }
.hbl-mb-card-ink {
  background: radial-gradient(circle at 85% 0%, #23763f, #14532d 55%, #0f3f22);
  border-color: transparent;
  color: #f7f5ef;
}
.hbl-mb-card-terra { background: linear-gradient(160deg, #fdeee6, #f6cdbd); }
.hbl-mb-card-copy h3 {
  margin: 16px 0 8px;
  font-family: var(--font-serif);
  font-size: 31px;
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.01em;
}
.hbl-mb-card-copy p { max-width: 440px; margin: 0; color: #3d5c47; font-size: 15px; line-height: 1.55; }
.hbl-mb-card-ink .hbl-mb-card-copy p { color: rgba(247, 245, 239, 0.8); }
.hbl-mb-card-ic {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: #14532d;
  color: #bef264;
}
.hbl-mb-card-ink .hbl-mb-card-ic { background: #bef264; color: #14532d; }
.hbl-mb-garden {
  display: grid;
  grid-template-columns: repeat(14, minmax(0, 1fr));
  gap: 6px;
  margin-top: auto;
}
.hbl-mb-garden span {
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.35);
  color: rgba(20, 83, 45, 0.45);
}
.hbl-mb-garden svg { width: 72%; height: 72%; }
.hbl-mb-garden span[data-l="2"] { background: rgba(255, 255, 255, 0.55); color: #2f7d4a; }
.hbl-mb-garden span[data-l="3"] { background: rgba(255, 255, 255, 0.78); color: #14532d; }
.hbl-mb-garden span[data-l="4"] { background: #14532d; color: #bef264; }
.hb-fv[data-inview="true"] .hbl-mb-garden span {
  animation: hbl-mb-sprout 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  animation-delay: var(--hbl-mb-d);
}
.hb-fv[data-inview="true"] .hbl-mb-garden span[data-l="4"] {
  animation: hbl-mb-sprout 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both, hbl-mb-glow 2.4s 2s ease-in-out infinite;
  animation-delay: var(--hbl-mb-d), 2s;
}
.hbl-mb-garden-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}
.hbl-mb-garden-foot b { font-family: var(--font-serif); font-size: 42px; font-weight: 400; line-height: 1; }
.hbl-mb-garden-foot span { color: #2f4d39; font-size: 13.5px; }
.hbl-mb-mini-scan {
  position: relative;
  height: 280px;
  margin-top: auto;
  overflow: hidden;
  border-radius: 20px;
  background: radial-gradient(circle at 50% 40%, #2f6f43, #1d4a2c 66%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.hbl-mb-mini-plant {
  position: absolute;
  top: 14px;
  left: 50%;
  width: 180px;
  margin-left: -90px;
}
.hbl-mb-mini-scan .hbl-mb-scanline {
  top: 22px;
  left: 14%;
  right: 14%;
  animation-name: hbl-mb-scan-sm;
}
.hbl-mb-mini-result {
  position: absolute;
  right: 12px;
  bottom: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  padding: 10px 14px;
  border-radius: 14px;
  background: rgba(255, 253, 248, 0.96);
  color: #14532d;
}
.hbl-mb-mini-result b { font-family: var(--font-serif); font-size: 20px; font-weight: 400; }
.hbl-mb-mini-result small { color: #4f6e58; font-size: 12px; }
.hbl-mb-gauge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-top: auto;
}
.hbl-mb-gauge svg { width: 100%; max-width: 250px; }
.hbl-mb-needle {
  transform-box: view-box;
  transform-origin: 100px 100px;
  animation: hbl-mb-needle 5s ease-in-out infinite;
}
.hbl-mb-gauge-v { text-align: center; }
.hbl-mb-gauge-v b {
  display: block;
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: 400;
  line-height: 1.1;
}
.hbl-mb-gauge-v small { color: #4f6e58; font-size: 13px; }
.hbl-mb-water { display: flex; align-items: flex-end; gap: 20px; margin-top: auto; }
.hbl-mb-glass {
  position: relative;
  flex: none;
  width: 76px;
  height: 112px;
  overflow: hidden;
  border: 2px solid rgba(20, 83, 45, 0.35);
  border-radius: 10px 10px 24px 24px;
  background: rgba(255, 255, 255, 0.55);
}
.hbl-mb-glass-fill {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 62%;
  background: linear-gradient(rgba(20, 83, 45, 0.2), rgba(20, 83, 45, 0.42));
  animation: hbl-mb-fill 4s ease-in-out infinite alternate;
}
.hbl-mb-glass-fill::before {
  content: "";
  position: absolute;
  top: -5px;
  left: -10%;
  width: 120%;
  height: 10px;
  border-radius: 50%;
  background: rgba(20, 83, 45, 0.22);
}
.hbl-mb-glass-ticks {
  position: absolute;
  top: 14px;
  right: 0;
  bottom: 14px;
  width: 14px;
  background: repeating-linear-gradient(to bottom, rgba(20, 83, 45, 0.4) 0 1.5px, transparent 1.5px 16px);
}
.hbl-mb-water-t { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.hbl-mb-water-t b { font-family: var(--font-serif); font-size: 44px; font-weight: 400; line-height: 1; }
.hbl-mb-water-t span { color: #3d5c47; font-size: 13.5px; }
.hbl-mb-card-wide { flex-direction: row; align-items: center; gap: 40px; }
.hbl-mb-card-wide .hbl-mb-card-copy { flex: 1 1 320px; min-width: 0; }
.hbl-mb-vac {
  display: grid;
  flex: 1.4 1 440px;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr);
  gap: 14px;
  min-width: 0;
}
.hbl-mb-vac-trip {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 18px;
  background: #f7f5ef;
  border: 1px solid rgba(20, 83, 45, 0.1);
  font-size: 14.5px;
  font-weight: 600;
}
.hbl-mb-vac-trip i {
  flex: 1;
  min-width: 16px;
  border-top: 2px dashed rgba(20, 83, 45, 0.3);
}
.hbl-mb-vac-trip small { flex-basis: 100%; color: #4f6e58; font-size: 12.5px; font-weight: 500; }
.hbl-mb-vac-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 16px;
  border-radius: 18px;
  background: #f7f5ef;
  border: 1px solid rgba(20, 83, 45, 0.1);
  list-style: none;
}
.hbl-mb-vac-list li { display: flex; align-items: center; gap: 10px; font-size: 13.5px; line-height: 1.3; }
.hbl-mb-vac-list li small { margin-left: auto; color: #4f6e58; font-size: 11.5px; }
.hbl-mb-vac-sitter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  border-radius: 18px;
  background: #14532d;
  color: #f7f5ef;
  font-size: 14px;
  font-weight: 600;
}

.hbl-mb-split {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: 72px;
}
.hbl-mb-split + .hbl-mb-split { margin-top: 140px; }
.hbl-mb-split-rev .hbl-mb-split-art { order: -1; }
.hbl-mb-split-art {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 40px 0;
}
.hbl-mb-disc {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 440px;
  height: 440px;
  margin: -220px 0 0 -220px;
  border-radius: 50%;
}
.hbl-mb-disc-lime {
  background: radial-gradient(circle, #ecfccb, #bef264 72%);
  box-shadow: 0 0 0 30px rgba(190, 242, 100, 0.22), 0 0 0 60px rgba(190, 242, 100, 0.1);
}
.hbl-mb-disc-terra {
  background: radial-gradient(circle, #fde3d8, #f0a58f 75%);
  box-shadow: 0 0 0 30px rgba(224, 122, 95, 0.16), 0 0 0 60px rgba(224, 122, 95, 0.07);
}
.hbl-mb-split-chip { position: absolute; z-index: 3; right: 0; bottom: 16%; }
.hbl-mb-bullets {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
}
.hbl-mb-bullet { display: flex; align-items: flex-start; gap: 14px; }
.hbl-mb-bullet > span:last-child { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.hbl-mb-bullet b { color: #14532d; font-size: 16px; font-weight: 600; }
.hbl-mb-bullet > span:last-child > span { color: #3d5c47; font-size: 15px; line-height: 1.55; }
.hbl-mb-bullet-ic {
  display: grid;
  place-items: center;
  flex: none;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(20, 83, 45, 0.12);
  color: #14532d;
  box-shadow: 0 8px 16px -12px rgba(20, 83, 45, 0.45);
}

.hbl-mb-plants { background: linear-gradient(#f7f5ef, #f1ede1 50%, #f7f5ef); }
.hbl-mb-plants-head { max-width: 760px; }
.hbl-mb-carousel .hb-cr-track { padding: 8px 4px 64px; scroll-padding-left: 4px; }
.hbl-mb-carousel .hb-cr-slide { flex: 0 0 calc((100% - 60px) / 4); }
.hbl-mb-carousel .hb-cr-btn {
  top: auto;
  bottom: 0;
  width: 44px;
  height: 44px;
  margin: 0;
  border: 1px solid rgba(20, 83, 45, 0.16);
  background: #fff;
  color: #14532d;
  box-shadow: 0 8px 18px -12px rgba(20, 83, 45, 0.5);
  backdrop-filter: none;
}
.hbl-mb .hbl-mb-carousel .hb-cr-btn:hover:not(:disabled) { background: #14532d; color: #bef264; }
.hbl-mb-carousel .hb-cr-prev { left: auto; right: 56px; }
.hbl-mb-carousel .hb-cr-next { right: 4px; }
.hbl-mb-carousel .hb-cr-dots {
  bottom: 18px;
  left: 4px;
  padding: 0;
  background: transparent;
  transform: none;
}
.hbl-mb-carousel .hb-cr-dot { background: rgba(20, 83, 45, 0.22); }
.hbl-mb-carousel .hb-cr-dot:hover { background: rgba(20, 83, 45, 0.45); }
.hbl-mb-carousel .hb-cr-dot[aria-current="true"] { background: #14532d; }
.hbl-mb-carousel .hb-cr-track:focus-visible { box-shadow: none; outline: 2px solid #e07a5f; outline-offset: 2px; border-radius: 24px; }
.hbl-mb .hbl-mb-flip { display: block; width: 100%; }
.hbl-mb .hbl-mb-flip .hb-fc-f {
  align-items: stretch;
  justify-content: stretch;
  min-width: 0;
  min-height: 380px;
  overflow: hidden;
  padding: 0;
  border-radius: 24px;
  border: 1px solid rgba(20, 83, 45, 0.1);
  background: #fffdf8;
  color: #14532d;
  text-align: left;
  box-shadow: 0 26px 44px -34px rgba(20, 83, 45, 0.55);
}
.hbl-mb .hbl-mb-flip:focus-visible { border-radius: 24px; }
.hbl-mb-pc {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
}
.hbl-mb-pc-level {
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.75);
  font-size: 11.5px;
  font-weight: 700;
}
.hbl-mb-pc-art { display: block; width: 80%; margin: 8px auto 0; }
.hbl-mb-pc-name {
  margin-top: auto;
  font-family: var(--font-serif);
  font-size: 28px;
  line-height: 1.05;
}
.hbl-mb-pc-latin { margin-top: 4px; color: #3d5c47; font-size: 13px; font-style: italic; }
.hbl-mb-pc-back { gap: 14px; background: #14532d; color: #f7f5ef; }
.hbl-mb-pc-back .hbl-mb-pc-name { margin-top: 0; }
.hbl-mb-pc-care {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hbl-mb-pc-care li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(247, 245, 239, 0.14);
  font-size: 14px;
}
.hbl-mb-pc-care svg { flex: none; color: #bef264; }
.hbl-mb-pc-tip { color: rgba(247, 245, 239, 0.82); font-size: 14px; line-height: 1.5; }
.hbl-mb-pc-add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: auto;
  padding: 10px 14px;
  border-radius: 999px;
  background: #bef264;
  color: #14532d;
  font-size: 13.5px;
  font-weight: 700;
}

.hbl-mb-community {
  position: relative;
  overflow: hidden;
  margin: 0 16px;
  padding: 120px 0;
  border-radius: 48px;
  background: #14532d;
  color: #f7f5ef;
}
.hbl-mb-community-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(640px 420px at 88% 8%, rgba(190, 242, 100, 0.22), transparent 70%),
    radial-gradient(520px 380px at 0% 100%, rgba(224, 122, 95, 0.3), transparent 70%);
}
.hbl-mb-community-glow::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(247, 245, 239, 0.1) 1px, transparent 1.5px);
  background-size: 26px 26px;
  -webkit-mask-image: linear-gradient(120deg, transparent 30%, #000 100%);
  mask-image: linear-gradient(120deg, transparent 30%, #000 100%);
}
.hbl-mb-community-grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  align-items: center;
  gap: 64px;
}
.hbl-mb-members { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; }
.hbl-mb-members > span { display: flex; flex-direction: column; }
.hbl-mb-members b { font-size: 16px; font-weight: 600; }
.hbl-mb-members small { color: rgba(247, 245, 239, 0.72); font-size: 13.5px; }
.hbl-mb-comm-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 36px;
}
.hbl-mb-comm-stats > * > div {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 100%;
  padding: 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
.hbl-mb-comm-stats b {
  color: #bef264;
  font-family: var(--font-serif);
  font-size: 40px;
  font-weight: 400;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.hbl-mb-comm-stats span { color: rgba(247, 245, 239, 0.78); font-size: 13.5px; }
.hbl-mb-challenges { display: flex; flex-direction: column; gap: 14px; }
.hbl-mb-challenges > :nth-child(2) { margin-left: 40px; }
.hbl-mb-challenges > :nth-child(3) { margin-left: 14px; }
.hbl-mb-challenge {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border-radius: 24px;
  background: rgba(255, 253, 248, 0.97);
  color: #14532d;
  box-shadow: 0 34px 54px -32px rgba(0, 0, 0, 0.55);
  transition: transform 0.35s cubic-bezier(0.22, 0.8, 0.24, 1);
}
.hbl-mb-challenge:hover { transform: translateY(-3px) rotate(-0.6deg); }
.hbl-mb-challenge-dot {
  display: grid;
  place-items: center;
  flex: none;
  width: 50px;
  height: 50px;
  border-radius: 16px;
  color: #14532d;
  box-shadow: inset 0 0 0 1px rgba(20, 83, 45, 0.1);
}
.hbl-mb-challenge-t { display: flex; flex: 1; flex-direction: column; gap: 2px; min-width: 0; }
.hbl-mb-challenge-t small {
  color: #a8482f;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.hbl-mb-challenge-t b { font-family: var(--font-serif); font-size: 23px; font-weight: 400; line-height: 1.15; }
.hbl-mb-challenge-t span { color: #3d5c47; font-size: 13px; }
.hbl-mb-join {
  flex: none;
  padding: 9px 16px;
  border-radius: 999px;
  background: #14532d;
  color: #bef264;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.2s ease;
}
.hbl-mb-join:hover { background: #166534; }

.hbl-mb-review-score {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #14532d;
  font-size: 15px;
  font-weight: 600;
}
.hbl-mb-reviews { columns: 3 300px; column-gap: 20px; }
.hbl-mb-review-cell { break-inside: avoid; margin-bottom: 20px; }
.hbl-mb-review {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border-radius: 24px;
  background: #fffdf8;
  border: 1px solid rgba(20, 83, 45, 0.1);
  box-shadow: 0 26px 44px -36px rgba(20, 83, 45, 0.5);
  transition: transform 0.35s cubic-bezier(0.22, 0.8, 0.24, 1), box-shadow 0.35s ease;
}
.hbl-mb-review:hover { transform: translateY(-3px); box-shadow: 0 34px 54px -36px rgba(20, 83, 45, 0.6); }
.hbl-mb-review-cell:nth-child(5n + 2) .hbl-mb-review { background: #f1fadc; }
.hbl-mb-review-cell:nth-child(5n + 4) .hbl-mb-review { background: #fcebe3; }
.hbl-mb-review h3 { margin: 0; font-family: var(--font-serif); font-size: 25px; font-weight: 400; line-height: 1.15; }
.hbl-mb-review p { margin: 0; color: #2f4d39; font-size: 15px; line-height: 1.6; }
.hbl-mb-review-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.hbl-mb-review-top small { color: #4f6e58; font-size: 12.5px; }
.hbl-mb-review-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 4px;
  padding-top: 14px;
  border-top: 1px solid rgba(20, 83, 45, 0.09);
}
.hbl-mb-review-who { display: flex; align-items: center; gap: 10px; min-width: 0; font-size: 14px; font-weight: 600; }

.hbl-mb-plans {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
  gap: 20px;
}
.hbl-mb-plan {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
  padding: 32px 28px;
  border-radius: 28px;
  background: #fffdf8;
  border: 1px solid rgba(20, 83, 45, 0.1);
  box-shadow: 0 28px 50px -40px rgba(20, 83, 45, 0.5);
  transition: transform 0.4s cubic-bezier(0.22, 0.8, 0.24, 1);
}
.hbl-mb-plan:hover { transform: translateY(-4px); }
.hbl-mb-plan h3 { margin: 0; font-size: 15px; font-weight: 700; letter-spacing: 0.02em; }
.hbl-mb-plan-blurb { margin: 0; color: #3d5c47; font-size: 15px; line-height: 1.5; }
.hbl-mb-plan-price { display: flex; flex-direction: column; gap: 4px; margin: 8px 0 0; }
.hbl-mb-plan-price b {
  font-family: var(--font-serif);
  font-size: 66px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.02em;
}
.hbl-mb-plan-price span { color: #4f6e58; font-size: 13.5px; }
.hbl-mb-plan-cta {
  display: block;
  padding: 13px 18px;
  border-radius: 999px;
  border: 1px solid rgba(20, 83, 45, 0.22);
  color: #14532d;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.hbl-mb-plan-cta:hover { background: #14532d; border-color: #14532d; color: #f7f5ef; }
.hbl-mb-plan ul {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 8px 0 0;
  padding: 20px 0 0;
  border-top: 1px solid rgba(20, 83, 45, 0.1);
  list-style: none;
}
.hbl-mb-plan li { display: flex; align-items: center; gap: 10px; font-size: 14.5px; }
.hbl-mb-plan-tick {
  display: grid;
  place-items: center;
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #bef264;
  color: #14532d;
}
.hbl-mb-plan-on {
  background: radial-gradient(circle at 100% 0%, #23763f, #14532d 60%);
  border-color: transparent;
  color: #f7f5ef;
  box-shadow: 0 44px 70px -40px rgba(20, 83, 45, 0.85);
}
.hbl-mb-plan-on .hbl-mb-plan-blurb,
.hbl-mb-plan-on .hbl-mb-plan-price span { color: rgba(247, 245, 239, 0.78); }
.hbl-mb-plan-on .hbl-mb-plan-cta { background: #bef264; border-color: #bef264; color: #14532d; }
.hbl-mb-plan-on .hbl-mb-plan-cta:hover { background: #d9f99d; border-color: #d9f99d; color: #14532d; }
.hbl-mb-plan-on ul { border-top-color: rgba(247, 245, 239, 0.16); }
.hbl-mb-plan-flag {
  position: absolute;
  top: 24px;
  right: 24px;
  padding: 5px 11px;
  border-radius: 999px;
  background: #bef264;
  color: #14532d;
  font-size: 12px;
  font-weight: 700;
}

.hbl-mb-faq {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  align-items: start;
  gap: 64px;
}
.hbl-mb-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid rgba(20, 83, 45, 0.2);
  color: #14532d;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hbl-mb-ghost:hover { border-color: #14532d; transform: translateY(-1px); }
.hbl-mb-acc { color: #14532d; font-size: 17px; }
.hbl-mb .hbl-mb-acc .hb-ac-item { border-bottom-color: rgba(20, 83, 45, 0.14); }
.hbl-mb .hbl-mb-acc .hb-ac-item:first-child { border-top-color: rgba(20, 83, 45, 0.14); }
.hbl-mb .hbl-mb-acc .hb-ac-trigger { padding: 22px 4px; font-weight: 600; transition: color 0.2s ease; }
.hbl-mb .hbl-mb-acc .hb-ac-trigger:hover { color: #a8482f; }
.hbl-mb .hbl-mb-acc .hb-ac-body {
  max-width: 62ch;
  padding-bottom: 22px;
  color: #3d5c47;
  font-size: 15.5px;
  line-height: 1.65;
}

.hbl-mb-cta-sec { padding-top: 40px; }
.hbl-mb-cta {
  position: relative;
  overflow: hidden;
  padding: 104px 32px;
  border-radius: 40px;
  background: #14532d;
  color: #f7f5ef;
  text-align: center;
  box-shadow: 0 60px 100px -60px rgba(20, 83, 45, 0.9);
}
.hbl-mb-cta-glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(640px 320px at 50% 0%, rgba(190, 242, 100, 0.3), transparent 70%),
    radial-gradient(460px 320px at 50% 112%, rgba(224, 122, 95, 0.4), transparent 70%);
}
.hbl-mb-cta-plant {
  position: absolute;
  bottom: -8px;
  width: 250px;
  transform-origin: 50% 100%;
  animation: hbl-mb-sway 7s ease-in-out infinite;
}
.hbl-mb-cta-plant-l { left: 3%; }
.hbl-mb-cta-plant-r { right: 4%; width: 210px; animation-delay: -3s; }
.hbl-mb-cta-copy {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  max-width: 720px;
  margin: 0 auto;
}
.hbl-mb-cta-title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: clamp(3rem, 8vw, 5.8rem);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.03em;
  color: #f7f5ef;
  text-wrap: balance;
}
.hbl-mb-cta-copy > p { max-width: 520px; margin: 0; color: rgba(247, 245, 239, 0.8); font-size: 18px; line-height: 1.6; }
.hbl-mb-cta-actions { margin-top: 8px; }
.hbl-mb .hbl-mb-confetti {
  background: #bef264;
  color: #14532d;
  box-shadow: 0 0 0 1px rgba(190, 242, 100, 0.5), 0 20px 40px -16px rgba(190, 242, 100, 0.65);
}
.hbl-mb-badges-center { justify-content: center; margin-top: 6px; }
.hbl-mb-cta .hbl-mb-badge {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
}
.hbl-mb-cta .hbl-mb-badge:hover { background: rgba(255, 255, 255, 0.14); }

.hbl-mb-footer { padding: 80px 0 40px; }
.hbl-mb-footer-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) repeat(3, minmax(0, 1fr));
  gap: 40px;
}
.hbl-mb-footer-brand p { max-width: 300px; margin: 16px 0 0; color: #3d5c47; font-size: 14.5px; line-height: 1.6; }
.hbl-mb-footer h3 {
  margin: 0 0 14px;
  color: #14532d;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.hbl-mb-footer ul { display: flex; flex-direction: column; gap: 10px; margin: 0; padding: 0; list-style: none; }
.hbl-mb-footer ul a { color: #3d5c47; font-size: 14.5px; text-decoration: none; transition: color 0.2s ease; }
.hbl-mb-footer ul a:hover { color: #14532d; text-decoration: underline; text-underline-offset: 3px; }
.hbl-mb-footer-base {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid rgba(20, 83, 45, 0.12);
  color: #4f6e58;
  font-size: 13.5px;
}
.hbl-mb-footer-legal { display: flex; gap: 20px; }
.hbl-mb-footer-legal a { color: inherit; text-decoration: none; }
.hbl-mb-footer-legal a:hover { color: #14532d; }

.hbl-mb .hb-lb-btn { border-color: rgba(20, 83, 45, 0.14); background: #fff; color: #3d5c47; }
.hbl-mb .hb-lb-btn:hover { border-color: rgba(20, 83, 45, 0.32); color: #14532d; }
.hbl-mb .hb-lb-btn[aria-pressed="true"] {
  border-color: color-mix(in srgb, var(--hb-c) 50%, #ffffff);
  background: color-mix(in srgb, var(--hb-c) 12%, #ffffff);
  color: #14532d;
}
.hbl-mb .hb-sra-b { fill: rgba(20, 83, 45, 0.16); }
.hbl-mb .hbl-mb-rate .hb-sra-b { fill: rgba(255, 255, 255, 0.24); }
.hbl-mb .hb-avs-tip { border-color: #14532d; background: #14532d; color: #f7f5ef; }

@keyframes hbl-mb-float {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -12px, 0); }
}
@keyframes hbl-mb-swash { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hbl-mb-pulse {
  0%, 100% { box-shadow: 0 0 0 2px #14532d, 0 0 0 0 rgba(20, 83, 45, 0.35); }
  50% { box-shadow: 0 0 0 2px #14532d, 0 0 0 6px rgba(20, 83, 45, 0); }
}
@keyframes hbl-mb-tick {
  0%, 42% { background: transparent; border-color: rgba(20, 83, 45, 0.25); color: transparent; transform: scale(1); }
  48% { background: #14532d; border-color: #14532d; color: #bef264; transform: scale(1.2); }
  54%, 92% { background: #14532d; border-color: #14532d; color: #bef264; transform: scale(1); }
  100% { background: transparent; border-color: rgba(20, 83, 45, 0.25); color: transparent; transform: scale(1); }
}
@keyframes hbl-mb-scan { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(0, 228px, 0); } }
@keyframes hbl-mb-scan-sm { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(0, 150px, 0); } }
@keyframes hbl-mb-ring { from { stroke-dashoffset: var(--hbl-mb-c); } to { stroke-dashoffset: var(--hbl-mb-off); } }
@keyframes hbl-mb-note {
  0% { opacity: 0; transform: translate3d(0, -14px, 0) scale(0.96); }
  8%, 86% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
  95%, 100% { opacity: 0; transform: translate3d(0, -6px, 0) scale(0.98); }
}
@keyframes hbl-mb-sprout {
  from { opacity: 0; transform: scale(0.3) translate3d(0, 6px, 0); }
  to { opacity: 1; transform: scale(1) translate3d(0, 0, 0); }
}
@keyframes hbl-mb-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(20, 83, 45, 0.45); }
  50% { box-shadow: 0 0 0 6px rgba(20, 83, 45, 0); }
}
@keyframes hbl-mb-needle {
  0%, 100% { transform: rotate(-20deg); }
  50% { transform: rotate(26deg); }
}
@keyframes hbl-mb-fill { from { height: 26%; } to { height: 70%; } }
@keyframes hbl-mb-sway {
  0%, 100% { transform: rotate(-2deg); }
  50% { transform: rotate(2.5deg); }
}

@media (max-width: 1100px) {
  .hbl-mb-chip-a { left: 24px; top: 420px; }
  .hbl-mb-chip-b { left: auto; right: 24px; top: 24px; }
  .hbl-mb-carousel .hb-cr-slide { flex-basis: calc((100% - 40px) / 3); }
}
@media (max-width: 1023px) {
  .hbl-mb-slot-l { --hbl-mb-x: -230px; --hbl-mb-s: 0.8; }
  .hbl-mb-slot-r { --hbl-mb-x: 230px; --hbl-mb-s: 0.8; }
}
@media (max-width: 900px) {
  .hbl-mb-section { padding: 96px 0; }
  .hbl-mb-bento {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas: "streak streak" "id id" "light water" "vac vac";
  }
  .hbl-mb-card-wide { flex-direction: column; align-items: stretch; }
  .hbl-mb-vac { flex: none; }
  .hbl-mb-split { grid-template-columns: minmax(0, 1fr); gap: 32px; }
  .hbl-mb-split + .hbl-mb-split { margin-top: 96px; }
  .hbl-mb-split-rev .hbl-mb-split-art { order: 0; }
  .hbl-mb-community { padding: 96px 0; }
  .hbl-mb-community-grid { grid-template-columns: minmax(0, 1fr); gap: 48px; }
  .hbl-mb-challenges > :nth-child(n) { margin-left: 0; }
  .hbl-mb-plans { grid-template-columns: minmax(0, 1fr); max-width: 520px; margin: 0 auto; }
  .hbl-mb-faq { grid-template-columns: minmax(0, 1fr); gap: 32px; }
  .hbl-mb-cta-plant { width: 150px; opacity: 0.35; }
  .hbl-mb-cta-plant-r { width: 130px; }
  .hbl-mb-footer-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .hbl-mb-footer-brand { grid-column: 1 / -1; }
}
@media (max-width: 768px) {
  .hbl-mb-links { display: none; }
  .hbl-mb-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hbl-mb-carousel .hb-cr-slide { flex-basis: calc((100% - 20px) / 2); }
}
@media (max-width: 640px) {
  .hbl-mb-wrap { padding: 0 20px; }
  .hbl-mb-nav { padding: 18px 20px; }
  .hbl-mb-brand span { font-size: 26px; }
  .hbl-mb-pill { padding: 10px 15px; font-size: 14px; }
  .hbl-mb-section { padding: 80px 0; }
  .hbl-mb-hero { padding-top: 40px; }
  .hbl-mb-announce { font-size: 12.5px; }
  .hbl-mb-badge { min-width: 0; flex: 1 1 150px; padding-right: 14px; }
  .hbl-mb-stage { height: 560px; margin-top: 48px; }
  .hbl-mb-slot-c { --hbl-mb-s: 0.84; }
  .hbl-mb-slot-l { --hbl-mb-x: -150px; --hbl-mb-s: 0.66; top: 74px; }
  .hbl-mb-slot-r { --hbl-mb-x: 150px; --hbl-mb-s: 0.66; top: 74px; }
  .hbl-mb-chip-a { left: 10px; top: 392px; }
  .hbl-mb-chip-b { right: 10px; top: 0; }
  .hbl-mb-chip { gap: 8px; padding: 8px 12px 8px 8px; border-radius: 15px; }
  .hbl-mb-chip-ic { width: 30px; height: 30px; border-radius: 10px; }
  .hbl-mb-chip b { font-size: 12.5px; }
  .hbl-mb-chip small { font-size: 11px; }
  .hbl-mb-proof { margin-top: -150px; padding: 190px 0 72px; border-radius: 32px 32px 0 0; }
  .hbl-mb-stat { padding: 22px 18px; }
  .hbl-mb-press-card { width: 270px; }
  .hbl-mb-bento { grid-template-columns: minmax(0, 1fr); grid-template-areas: "streak" "id" "light" "water" "vac"; }
  .hbl-mb-card { padding: 22px; }
  .hbl-mb-garden { grid-template-columns: repeat(7, minmax(0, 1fr)); }
  .hbl-mb-vac { grid-template-columns: minmax(0, 1fr); }
  .hbl-mb-disc { width: 320px; height: 320px; margin: -160px 0 0 -160px; }
  .hbl-mb-split-chip { right: -4px; bottom: 8%; }
  .hbl-mb-carousel .hb-cr-slide { flex-basis: 82%; }
  .hbl-mb-community { margin: 0 8px; padding: 80px 0; border-radius: 32px; }
  .hbl-mb-comm-stats { grid-template-columns: minmax(0, 1fr); }
  .hbl-mb-comm-stats > * > div { flex-direction: row; align-items: baseline; gap: 12px; }
  .hbl-mb-challenge { flex-wrap: wrap; }
  .hbl-mb-cta { padding: 80px 20px; border-radius: 32px; }
  .hbl-mb-cta-plant { display: none; }
  .hbl-mb-footer-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px; }
}

@media (prefers-reduced-motion: reduce) {
  .hbl-mb-float,
  .hbl-mb-chip,
  .hbl-mb-scanline,
  .hbl-mb-needle,
  .hbl-mb-glass-fill,
  .hbl-mb-notes li,
  .hbl-mb-check-anim,
  .hbl-mb-week li[data-s="today"] i,
  .hbl-mb-garden span,
  .hb-fv[data-inview="true"] .hbl-mb-garden span,
  .hb-fv[data-inview="true"] .hbl-mb-garden span[data-l="4"],
  .hb-fv[data-inview="true"] .hbl-mb-ring-arc,
  .hbl-mb-cta-plant,
  .hbl-mb-rot::after {
    animation: none !important;
  }
  .hbl-mb-drift { transform: none !important; }
  .hbl-mb-card,
  .hbl-mb-review,
  .hbl-mb-plan,
  .hbl-mb-challenge,
  .hbl-mb-pill,
  .hbl-mb-badge,
  .hbl-mb-announce,
  .hbl-mb-ghost,
  .hbl-mb-pill svg {
    transition: none;
  }
  .hbl-mb-card:hover,
  .hbl-mb-review:hover,
  .hbl-mb-plan:hover,
  .hbl-mb-challenge:hover,
  .hbl-mb-pill:hover,
  .hbl-mb-badge:hover,
  .hbl-mb-announce:hover,
  .hbl-mb-ghost:hover,
  .hbl-mb-pill:hover svg {
    transform: none;
  }
}
`;

export function FernlyStyles() {
  return (
    <style href="hbl-mb" precedence="default">
      {css}
    </style>
  );
}
