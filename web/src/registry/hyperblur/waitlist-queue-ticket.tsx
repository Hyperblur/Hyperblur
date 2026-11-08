"use client";

import * as React from "react";

export interface WaitlistQueueTicketProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  product?: string;
  initialCount?: number;
  live?: boolean;
  perWave?: number;
  waves?: string[];
  ctaLabel?: string;
  onJoin?: (email: string, position: number) => void | Promise<void>;
  accent?: string;
}

function hash(n: number) {
  let x = (n * 2654435761) >>> 0;
  x ^= x >>> 15;
  x = Math.imul(x, 2246822519) >>> 0;
  x ^= x >>> 13;
  return x >>> 0;
}

function seedOf(s: string) {
  let h = 7;
  for (let i = 0; i < s.length; i++) h = (Math.imul(h, 33) + s.charCodeAt(i)) >>> 0;
  return h;
}

const css = `
@keyframes hb-wd7-march { from { transform: translateX(0); } to { transform: translateX(-28px); } }
@keyframes hb-wd7-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
@keyframes hb-wd7-print { 0% { transform: translateY(-100%); } 100% { transform: translateY(0); } }
@keyframes hb-wd7-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes hb-wd7-you { 0% { transform: translateY(-30px) scale(0.6); opacity: 0; } 60% { transform: translateY(2px) scale(1.1); opacity: 1; } 100% { transform: none; } }
@keyframes hb-wd7-spin { to { transform: rotate(360deg); } }
.hb-wd7 {
  --hb-wd7-accent: #4f46e5;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #f7f5ef;
  color: #16151a;
  font-family: inherit;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}
.hb-wd7 *, .hb-wd7 *::before, .hb-wd7 *::after { box-sizing: border-box; }
.hb-wd7-in { max-width: 1120px; margin: 0 auto; padding: 80px 20px 96px; display: grid; gap: 44px; align-items: center; }
@container (min-width: 880px) { .hb-wd7-in { grid-template-columns: 1fr 1fr; gap: 56px; } }
.hb-wd7-eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 6px 11px; border-radius: 999px; background: #fff; border: 1px solid rgba(22,21,26,0.08); font: 500 12px/1 var(--font-mono, monospace); color: #4b4a52; }
.hb-wd7-eyebrow i { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 3px rgba(34,197,94,0.2); font-style: normal; }
.hb-wd7-title { margin: 18px 0 14px; font: 600 clamp(34px, 5.4cqw, 58px)/0.98 var(--font-grotesk, inherit); letter-spacing: -0.04em; }
.hb-wd7-sub { margin: 0 0 26px; font-size: 16px; line-height: 1.6; color: #5d5b62; max-width: 42ch; }
.hb-wd7-counter { display: flex; align-items: center; gap: 14px; margin-bottom: 26px; }
.hb-wd7-odo { display: inline-flex; padding: 6px 8px; border-radius: 12px; background: #16151a; color: #fff; box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 10px 20px -12px rgba(22,21,26,0.6); }
.hb-wd7-digit { position: relative; width: 0.62em; height: 1.1em; overflow: hidden; font: 600 26px/1.1 var(--font-mono, monospace); font-variant-numeric: tabular-nums; text-align: center; }
.hb-wd7-digit > span { position: absolute; left: 0; right: 0; top: 0; display: flex; flex-direction: column; transition: transform 0.7s cubic-bezier(0.34, 1.2, 0.5, 1); }
.hb-wd7-sep { width: 0.3em; font: 600 26px/1.1 var(--font-mono, monospace); color: #8b8a92; text-align: center; }
.hb-wd7-counter small { font-size: 13px; color: #5d5b62; line-height: 1.4; }
.hb-wd7-form { display: flex; gap: 6px; padding: 6px; border-radius: 16px; background: #fff; border: 1px solid rgba(22,21,26,0.1); box-shadow: 0 20px 40px -24px rgba(22,21,26,0.3); max-width: 460px; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
.hb-wd7-form:focus-within { border-color: var(--hb-wd7-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-wd7-accent) 14%, transparent), 0 20px 40px -24px rgba(22,21,26,0.3); }
.hb-wd7-form[data-error="true"] { border-color: #dc2626; }
.hb-wd7-form input { flex: 1; min-width: 0; border: 0; background: transparent; padding: 0 12px; font: 400 15px/1 inherit; font-family: inherit; color: #16151a; outline: none; }
.hb-wd7-form input::placeholder { color: #a3a1a8; }
.hb-wd7-btn { appearance: none; border: 0; height: 46px; padding: 0 20px; border-radius: 11px; background: var(--hb-wd7-accent); color: #fff; font: 600 14px/1 inherit; font-family: inherit; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 18px -10px var(--hb-wd7-accent); transition: transform 0.2s cubic-bezier(0.34, 1.4, 0.5, 1), filter 0.2s ease; }
.hb-wd7-btn:hover { filter: brightness(1.1); }
.hb-wd7-btn:active { transform: scale(0.97); }
.hb-wd7-btn:disabled { cursor: progress; }
.hb-wd7-btn:focus-visible { outline: 2px solid #16151a; outline-offset: 3px; }
.hb-wd7-spin { width: 15px; height: 15px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.35); border-top-color: #fff; animation: hb-wd7-spin 0.7s linear infinite; }
.hb-wd7-err { margin: 8px 0 0 4px; font-size: 12.5px; color: #dc2626; }
.hb-wd7-note { margin: 12px 0 0 4px; font-size: 12.5px; color: #8b8a92; }
.hb-wd7-stage { position: relative; display: grid; gap: 0; justify-items: center; }
.hb-wd7-machine { position: relative; z-index: 2; width: min(360px, 100%); padding: 16px 18px 20px; border-radius: 22px 22px 14px 14px; background: linear-gradient(180deg, #24232a, #16151a); color: #fff; box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 30px 50px -26px rgba(22,21,26,0.7); }
.hb-wd7-mtop { display: flex; align-items: center; justify-content: space-between; font: 500 11px/1 var(--font-mono, monospace); color: #9d9ca5; letter-spacing: 0.06em; text-transform: uppercase; }
.hb-wd7-lamp { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 10px #22c55e; }
.hb-wd7-line { position: relative; height: 44px; margin: 14px 0 12px; border-radius: 10px; background: #0e0d12; overflow: hidden; box-shadow: inset 0 2px 6px rgba(0,0,0,0.6); }
.hb-wd7-line::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, #0e0d12 0%, transparent 14%, transparent 86%, #0e0d12 100%); pointer-events: none; }
.hb-wd7-people { position: absolute; left: 0; bottom: 8px; display: flex; gap: 10px; padding-left: 12px; animation: hb-wd7-march 1.6s linear infinite; }
.hb-wd7-person { flex: none; width: 18px; display: grid; justify-items: center; gap: 2px; animation: hb-wd7-bob 0.8s ease-in-out infinite; }
.hb-wd7-person::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: currentColor; }
.hb-wd7-person::after { content: ""; width: 14px; height: 12px; border-radius: 7px 7px 3px 3px; background: currentColor; }
.hb-wd7-you { position: absolute; left: 50%; bottom: 8px; color: var(--hb-wd7-accent); filter: drop-shadow(0 0 6px var(--hb-wd7-accent)); animation: hb-wd7-you 0.6s cubic-bezier(0.34, 1.5, 0.5, 1) both; }
.hb-wd7-gate { position: absolute; left: 10px; top: 6px; bottom: 6px; width: 3px; border-radius: 2px; background: var(--hb-wd7-accent); box-shadow: 0 0 10px var(--hb-wd7-accent); z-index: 2; }
.hb-wd7-slot { height: 8px; border-radius: 4px; background: #050407; box-shadow: inset 0 2px 3px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.08); }
.hb-wd7-feed { position: relative; z-index: 1; width: min(310px, 88%); margin-top: -6px; overflow: hidden; padding: 0 10px 24px; }
.hb-wd7-ticket { position: relative; background: #fff; border-radius: 0 0 14px 14px; box-shadow: 0 18px 30px -18px rgba(22,21,26,0.45); animation: hb-wd7-print 1.1s cubic-bezier(0.3, 0.7, 0.2, 1) both; color: #16151a; }
.hb-wd7-ticket[data-ghost="true"] { background: repeating-linear-gradient(135deg, #fbfaf7 0 8px, #f3f1ea 8px 16px); color: #a3a1a8; box-shadow: none; border: 1px dashed rgba(22,21,26,0.18); border-top: 0; animation: none; }
.hb-wd7-tmain { padding: 22px 20px 16px; display: grid; gap: 4px; }
.hb-wd7-tlabel { font: 500 10.5px/1 var(--font-mono, monospace); letter-spacing: 0.14em; text-transform: uppercase; color: #8b8a92; }
.hb-wd7-tnum { font: 700 44px/1 var(--font-grotesk, inherit); letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
.hb-wd7-ticket:not([data-ghost="true"]) .hb-wd7-tnum { color: var(--hb-wd7-accent); }
.hb-wd7-trow { display: flex; justify-content: space-between; gap: 10px; margin-top: 10px; font-size: 12.5px; }
.hb-wd7-trow span { display: grid; gap: 3px; }
.hb-wd7-trow b { font-weight: 600; }
.hb-wd7-perf { position: relative; height: 0; border-top: 2px dashed rgba(22,21,26,0.15); margin: 0 12px; }
.hb-wd7-perf::before, .hb-wd7-perf::after { content: ""; position: absolute; top: -9px; width: 16px; height: 16px; border-radius: 50%; background: #f7f5ef; }
.hb-wd7-perf::before { left: -21px; }
.hb-wd7-perf::after { right: -21px; }
.hb-wd7-stub { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 20px 16px; }
.hb-wd7-bars { display: flex; gap: 1.5px; height: 30px; align-items: stretch; }
.hb-wd7-bars i { display: block; background: currentColor; font-style: normal; }
.hb-wd7-stub small { font: 500 10.5px/1.3 var(--font-mono, monospace); color: #8b8a92; text-align: right; }
@media (prefers-reduced-motion: reduce) {
  .hb-wd7 *, .hb-wd7 *::before, .hb-wd7 *::after { animation: none !important; transition: none !important; }
}
`;

function Odometer({ value }: { value: number }) {
  const s = value.toLocaleString("en-US");
  return (
    <span className="hb-wd7-odo" aria-hidden="true">
      {s.split("").map((ch, i) =>
        ch === "," ? (
          <span key={`s${i}`} className="hb-wd7-sep">,</span>
        ) : (
          <span key={`d${s.length - i}`} className="hb-wd7-digit">
            <span style={{ transform: `translateY(-${Number(ch) * 10}%)` }}>
              {Array.from({ length: 10 }, (_, n) => (
                <span key={n} style={{ height: "1.1em" }}>{n}</span>
              ))}
            </span>
          </span>
        ),
      )}
    </span>
  );
}

export function WaitlistQueueTicket({
  eyebrow = "Queue is moving",
  title = "Take a number. We let people in every Tuesday.",
  subtitle = "Lumen opens to a new wave each week so onboarding stays personal. Grab your spot and we will send your ticket with the exact week you get in.",
  product = "Lumen",
  initialCount = 12482,
  live = true,
  perWave = 1500,
  waves = ["Nov 18", "Nov 25", "Dec 2", "Dec 9", "Dec 16", "Jan 6", "Jan 13", "Jan 20", "Jan 27"],
  ctaLabel = "Take a number",
  onJoin,
  accent = "#4f46e5",
  className = "",
  style,
  ...rest
}: WaitlistQueueTicketProps) {
  const uid = React.useId().replace(/:/g, "");
  const [count, setCount] = React.useState(initialCount);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<"idle" | "saving" | "joined">("idle");
  const [position, setPosition] = React.useState(0);

  React.useEffect(() => {
    if (!live || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tick = 0;
    const t = setInterval(() => {
      tick++;
      setCount((c) => c + 1 + (hash(tick) % 3));
    }, 2600);
    return () => clearInterval(t);
  }, [live]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That email looks incomplete.");
      return;
    }
    setError(null);
    setStatus("saving");
    const pos = count + 1;
    try {
      if (onJoin) await onJoin(email, pos);
      else await new Promise((r) => setTimeout(r, 800));
      setPosition(pos);
      setCount(pos);
      setStatus("joined");
    } catch {
      setStatus("idle");
      setError("Something went wrong. Try again in a moment.");
    }
  };

  const shownPos = status === "joined" ? position : count + 1;
  const wave = Math.floor((shownPos - 1) / perWave);
  const waveLabel = waves[Math.min(wave, waves.length - 1)] ?? "Soon";
  const ahead = Math.max(0, shownPos - 1 - Math.min(wave, waves.length - 1) * perWave);
  const seed = seedOf(status === "joined" ? email : "ghost");
  const bars = Array.from({ length: 34 }, (_, i) => 1 + (hash(seed + i) % 3));

  return (
    <section className={`hb-wd7 ${className}`} style={{ "--hb-wd7-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-waitlist-queue-ticket" precedence="default">{css}</style>
      <div className="hb-wd7-in">
        <div>
          <span className="hb-wd7-eyebrow">
            <i aria-hidden="true" />
            {eyebrow}
          </span>
          <h2 className="hb-wd7-title">{title}</h2>
          <p className="hb-wd7-sub">{subtitle}</p>
          <div className="hb-wd7-counter">
            <Odometer value={count} />
            <small aria-live="polite">
              people in line
              <br />
              for {product}
            </small>
          </div>
          {status === "joined" ? (
            <p className="hb-wd7-note" role="status" style={{ fontSize: 14, color: "#16151a" }}>
              You are number {position.toLocaleString("en-US")}. Your ticket is on its way to {email}.
            </p>
          ) : (
            <>
              <form className="hb-wd7-form" data-error={!!error} onSubmit={submit} noValidate>
                <input id={`${uid}-e`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" aria-label="Email address" aria-invalid={!!error} aria-describedby={error ? `${uid}-err` : `${uid}-note`} autoComplete="email" />
                <button type="submit" className="hb-wd7-btn" disabled={status === "saving"}>
                  {status === "saving" && <span className="hb-wd7-spin" aria-hidden="true" />}
                  {status === "saving" ? "Printing" : ctaLabel}
                </button>
              </form>
              {error ? (
                <p id={`${uid}-err`} className="hb-wd7-err" role="alert">{error}</p>
              ) : (
                <p id={`${uid}-note`} className="hb-wd7-note">One email when your wave opens. No newsletter.</p>
              )}
            </>
          )}
        </div>
        <div className="hb-wd7-stage">
          <div className="hb-wd7-machine">
            <div className="hb-wd7-mtop">
              <span>{product} queue</span>
              <span className="hb-wd7-lamp" aria-hidden="true" />
            </div>
            <div className="hb-wd7-line" aria-hidden="true">
              <span className="hb-wd7-gate" />
              <div className="hb-wd7-people">
                {Array.from({ length: 22 }, (_, i) => (
                  <span key={i} className="hb-wd7-person" style={{ color: `hsl(${(hash(i + 3) % 60) + 220} 8% ${42 + (hash(i) % 16)}%)`, animationDelay: `${((hash(i + 9) % 8) / 10).toFixed(1)}s` }} />
                ))}
              </div>
              {status === "joined" && <span className="hb-wd7-person hb-wd7-you" />}
            </div>
            <div className="hb-wd7-slot" />
          </div>
          <div className="hb-wd7-feed">
            <div className="hb-wd7-ticket" data-ghost={status !== "joined"} key={status === "joined" ? "t" : "g"}>
              <div className="hb-wd7-tmain">
                <span className="hb-wd7-tlabel">{status === "joined" ? "Your number" : "Next number"}</span>
                <span className="hb-wd7-tnum">#{shownPos.toLocaleString("en-US")}</span>
                <div className="hb-wd7-trow">
                  <span>
                    <span className="hb-wd7-tlabel">Wave</span>
                    <b>{String(Math.min(wave, waves.length - 1) + 1).padStart(2, "0")}</b>
                  </span>
                  <span>
                    <span className="hb-wd7-tlabel">Doors open</span>
                    <b>{waveLabel}</b>
                  </span>
                  <span>
                    <span className="hb-wd7-tlabel">Ahead in wave</span>
                    <b>{ahead.toLocaleString("en-US")}</b>
                  </span>
                </div>
              </div>
              <div className="hb-wd7-perf" aria-hidden="true" />
              <div className="hb-wd7-stub">
                <span className="hb-wd7-bars" aria-hidden="true">
                  {bars.map((w, i) => (
                    <i key={i} style={{ width: w, opacity: i % 7 === 3 ? 0 : 1 }} />
                  ))}
                </span>
                <small>
                  ADMIT ONE
                  <br />
                  {product.toUpperCase()} EARLY ACCESS
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
