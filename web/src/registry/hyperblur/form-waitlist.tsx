"use client";

import * as React from "react";

export interface FormWaitlistValues {
  email: string;
  useCase: string;
  teamSize: number;
  website: string;
  source: string;
}

export interface FormWaitlistProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit" | "title"> {
  product?: string;
  title?: string;
  queueLength?: number;
  useCases?: string[];
  sources?: string[];
  referralBase?: string;
  accent?: string;
  delay?: number;
  onSubmit?: (values: FormWaitlistValues, position: number) => void | Promise<void>;
}

const tiers = ["General", "Next wave", "Priority", "First access"];

const css = `
.hb-xh10 {
  --hb-xh10-a: #a3e635;
  box-sizing: border-box;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  font-family: inherit;
  color: #ededed;
}
.hb-xh10 *, .hb-xh10 *::before, .hb-xh10 *::after { box-sizing: border-box; }
.hb-xh10-card { position: relative; overflow: hidden; border: 1px solid #252525; border-radius: 20px; background: #0d0d0d; box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 30px 60px -30px rgba(0,0,0,0.9); }
.hb-xh10-meter { position: relative; padding: 16px 18px 14px; background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xh10-a) 9%, #111), #0d0d0d); border-bottom: 1px solid #1e1e1e; }
.hb-xh10-top { display: flex; align-items: flex-end; justify-content: space-between; gap: 10px; }
.hb-xh10-kick { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #8a8a8a; }
.hb-xh10-pos { display: block; margin-top: 2px; font-family: var(--font-grotesk, inherit); font-size: 30px; font-weight: 600; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; line-height: 1; }
.hb-xh10-pos small { font-size: 14px; color: #6f6f6f; font-weight: 500; letter-spacing: 0; margin-left: 6px; }
.hb-xh10-tier { padding: 4px 9px; border-radius: 999px; background: color-mix(in srgb, var(--hb-xh10-a) 16%, transparent); color: var(--hb-xh10-a); font-size: 11.5px; font-weight: 600; white-space: nowrap; transition: background 0.3s ease; }
.hb-xh10-lane { position: relative; height: 8px; margin: 14px 0 6px; border-radius: 8px; background: #1c1c1c; box-shadow: inset 0 1px 2px rgba(0,0,0,0.6); }
.hb-xh10-fill { position: absolute; inset: 0 auto 0 0; width: calc(var(--hb-xh10-p) * 100%); border-radius: inherit; background: linear-gradient(90deg, color-mix(in srgb, var(--hb-xh10-a) 30%, #1c1c1c), var(--hb-xh10-a)); box-shadow: 0 0 14px color-mix(in srgb, var(--hb-xh10-a) 60%, transparent); transition: width 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh10-knob { position: absolute; top: 50%; left: calc(var(--hb-xh10-p) * 100%); width: 16px; height: 16px; margin: -8px 0 0 -8px; border-radius: 50%; background: #fff; border: 3px solid var(--hb-xh10-a); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-xh10-a) 22%, transparent); transition: left 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh10-ticks { position: absolute; inset: 0; display: flex; justify-content: space-between; padding: 0 25%; pointer-events: none; }
.hb-xh10-ticks i { width: 1px; height: 100%; background: rgba(0,0,0,0.5); }
.hb-xh10-names { display: grid; grid-template-columns: repeat(4, 1fr); font-size: 10.5px; color: #5f5f5f; }
.hb-xh10-names span { transition: color 0.3s ease; }
.hb-xh10-names span:nth-child(2) { text-align: center; padding-right: 10%; }
.hb-xh10-names span:nth-child(3) { text-align: center; padding-left: 10%; }
.hb-xh10-names span:last-child { text-align: right; }
.hb-xh10-names span[data-on="true"] { color: #d4d4d4; }
.hb-xh10-form { display: grid; gap: 13px; padding: 16px 18px 18px; }
.hb-xh10-f { display: grid; gap: 6px; }
.hb-xh10-l { display: flex; justify-content: space-between; align-items: baseline; font-size: 12px; font-weight: 500; color: #b0b0b0; }
.hb-xh10-l em { font-style: normal; font-size: 11px; font-weight: 500; color: var(--hb-xh10-a); opacity: 0; transform: translateY(3px); transition: opacity 0.3s ease, transform 0.3s ease; }
.hb-xh10-f[data-done="true"] .hb-xh10-l em { opacity: 1; transform: none; }
.hb-xh10-in { width: 100%; height: 40px; padding: 0 12px; border: 1px solid #272727; border-radius: 10px; background: #090909; color: #ededed; font: inherit; font-size: 14px; outline: none; transition: border-color 0.18s ease, box-shadow 0.18s ease; }
.hb-xh10-in::placeholder { color: #4f4f4f; }
.hb-xh10-in:focus { border-color: var(--hb-xh10-a); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xh10-a) 18%, transparent); }
.hb-xh10-in[aria-invalid="true"] { border-color: #f05260; box-shadow: 0 0 0 3px rgba(240,82,96,0.12); }
.hb-xh10-e { margin: 0; font-size: 11.5px; color: #ff8a95; }
.hb-xh10-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.hb-xh10-chip { height: 30px; padding: 0 11px; border: 1px solid #272727; border-radius: 999px; background: #121212; color: #a8a8a8; font: inherit; font-size: 12.5px; cursor: pointer; transition: all 0.2s ease; }
.hb-xh10-chip:hover { color: #eee; border-color: #3a3a3a; }
.hb-xh10-chip[aria-checked="true"] { border-color: var(--hb-xh10-a); color: #0b1203; background: var(--hb-xh10-a); font-weight: 600; }
.hb-xh10-chip:focus-visible { outline: 2px solid var(--hb-xh10-a); outline-offset: 2px; }
.hb-xh10-range { display: flex; align-items: center; gap: 12px; }
.hb-xh10-range input { flex: 1; height: 22px; margin: 0; appearance: none; -webkit-appearance: none; background: transparent; cursor: pointer; }
.hb-xh10-range input::-webkit-slider-runnable-track { height: 6px; border-radius: 6px; background: linear-gradient(90deg, var(--hb-xh10-a) calc(var(--hb-xh10-r) * 100%), #222 calc(var(--hb-xh10-r) * 100%)); }
.hb-xh10-range input::-moz-range-track { height: 6px; border-radius: 6px; background: linear-gradient(90deg, var(--hb-xh10-a) calc(var(--hb-xh10-r) * 100%), #222 calc(var(--hb-xh10-r) * 100%)); }
.hb-xh10-range input::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; margin-top: -6px; border-radius: 50%; background: #fff; border: 0; box-shadow: 0 2px 6px rgba(0,0,0,0.6), 0 0 0 4px color-mix(in srgb, var(--hb-xh10-a) 25%, transparent); transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xh10-range input::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #fff; border: 0; box-shadow: 0 2px 6px rgba(0,0,0,0.6); }
.hb-xh10-range input:active::-webkit-slider-thumb { transform: scale(1.15); }
.hb-xh10-range input:focus-visible { outline: 2px solid var(--hb-xh10-a); outline-offset: 4px; border-radius: 6px; }
.hb-xh10-range output { min-width: 58px; text-align: right; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; color: #d0d0d0; font-variant-numeric: tabular-nums; }
.hb-xh10-two { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.hb-xh10-selw { position: relative; }
.hb-xh10-selw select { appearance: none; padding-right: 28px; cursor: pointer; }
.hb-xh10-selw svg { position: absolute; right: 10px; top: 50%; width: 12px; height: 12px; transform: translateY(-50%); color: #777; pointer-events: none; }
.hb-xh10-go { position: relative; height: 44px; border: 0; border-radius: 12px; background: var(--hb-xh10-a); color: #0b1203; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 0 rgba(0,0,0,0.15), 0 10px 24px -12px var(--hb-xh10-a); transition: transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1), filter 0.2s ease; }
.hb-xh10-go:hover { filter: brightness(1.06); }
.hb-xh10-go:active { transform: scale(0.98); }
.hb-xh10-go:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xh10-go[aria-busy="true"] { cursor: progress; }
.hb-xh10-done { display: grid; gap: 12px; padding: 16px 18px 18px; animation: hb-xh10-in 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh10-done h3 { margin: 0; font-size: 17px; font-weight: 600; letter-spacing: -0.02em; }
.hb-xh10-done p { margin: -6px 0 0; font-size: 13px; color: #8f8f8f; line-height: 1.5; }
.hb-xh10-ref { display: flex; align-items: center; gap: 6px; height: 42px; padding: 0 5px 0 12px; border: 1px dashed #333; border-radius: 11px; background: #0a0a0a; }
.hb-xh10-ref code { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12.5px; color: #d4d4d4; }
.hb-xh10-copy { flex: none; display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; border: 0; border-radius: 8px; background: #1e1e1e; color: #ededed; font: inherit; font-size: 12.5px; font-weight: 500; cursor: pointer; transition: background 0.2s ease, color 0.2s ease; }
.hb-xh10-copy:hover { background: #262626; }
.hb-xh10-copy[data-copied="true"] { background: var(--hb-xh10-a); color: #0b1203; }
.hb-xh10-copy:focus-visible { outline: 2px solid var(--hb-xh10-a); outline-offset: 2px; }
.hb-xh10-copy svg { width: 13px; height: 13px; }
.hb-xh10-perks { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.hb-xh10-perk { padding: 9px 10px; border-radius: 10px; background: #131313; border: 1px solid #1f1f1f; }
.hb-xh10-perk b { display: block; font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; color: var(--hb-xh10-a); }
.hb-xh10-perk span { font-size: 11px; color: #7a7a7a; }
@keyframes hb-xh10-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xh10 *, .hb-xh10 *::before, .hb-xh10 *::after { animation: none !important; transition: none !important; }
}
`;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const teamSteps = [1, 5, 10, 25, 50, 100, 250, 500];

function useTween(target: number) {
  const [value, setValue] = React.useState(target);
  const from = React.useRef(target);
  React.useEffect(() => {
    const start = from.current;
    if (start === target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = target;
      const id = window.requestAnimationFrame(() => setValue(target));
      return () => window.cancelAnimationFrame(id);
    }
    let raf = 0;
    let t0 = 0;
    const step = (t: number) => {
      if (!t0) t0 = t;
      const k = Math.min(1, (t - t0) / 700);
      const e = 1 - Math.pow(1 - k, 3);
      const v = Math.round(start + (target - start) * e);
      from.current = v;
      setValue(v);
      if (k < 1) raf = window.requestAnimationFrame(step);
    };
    raf = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(raf);
  }, [target]);
  return value;
}

export function FormWaitlist({
  product = "Orbit",
  title = "Join the beta",
  queueLength = 6240,
  useCases = ["Client sites", "Internal tools", "SaaS product", "Side project"],
  sources = ["A friend", "X / Twitter", "Newsletter", "Podcast", "Search"],
  referralBase = "orbit.so/r/",
  accent = "#a3e635",
  delay = 1100,
  onSubmit,
  className,
  style,
  ...rest
}: FormWaitlistProps) {
  const uid = React.useId();
  const [email, setEmail] = React.useState("");
  const [useCase, setUseCase] = React.useState("");
  const [teamIdx, setTeamIdx] = React.useState(1);
  const [website, setWebsite] = React.useState("");
  const [source, setSource] = React.useState("");
  const [tried, setTried] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "busy" | "done">("idle");
  const [copied, setCopied] = React.useState(false);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const timer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const emailOk = emailRe.test(email.trim());
  const siteOk = /^([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(website.trim().replace(/^https?:[/][/]/, ""));
  const score = (emailOk ? 0.22 : 0) + (useCase ? 0.2 : 0) + Math.min(0.2, teamIdx * 0.03) + (siteOk ? 0.22 : 0) + (source ? 0.12 : 0);
  const position = Math.max(1, Math.round(queueLength * (1 - score * 0.82)));
  const shown = useTween(position);
  const tier = Math.min(3, Math.floor(score * 4.2));
  const team = teamSteps[teamIdx];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    if (!emailOk) {
      setTried(true);
      emailRef.current?.focus();
      return;
    }
    setStatus("busy");
    try {
      const values = { email: email.trim(), useCase, teamSize: team, website: website.trim(), source };
      await Promise.all([Promise.resolve(onSubmit?.(values, position)), new Promise((r) => window.setTimeout(r, delay))]);
      setStatus("done");
    } catch {
      setStatus("idle");
    }
  };

  const code = email.split("@")[0]?.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 10) || "you";
  const link = `${referralBase}${code}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${link}`);
    } catch {
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  const plus = (n: number) => <em>+{n} spots</em>;

  return (
    <div className={["hb-xh10", className].filter(Boolean).join(" ")} style={{ ...style, "--hb-xh10-a": accent, "--hb-xh10-p": score.toFixed(3) } as React.CSSProperties} {...rest}>
      <style href="hb-form-waitlist" precedence="default">{css}</style>
      <div className="hb-xh10-card">
        <div className="hb-xh10-meter">
          <div className="hb-xh10-top">
            <div>
              <span className="hb-xh10-kick">{status === "done" ? "Your spot" : `${title} · estimated spot`}</span>
              <span className="hb-xh10-pos" aria-live="polite">
                #{shown.toLocaleString("en-US")}
                <small>of {queueLength.toLocaleString("en-US")}</small>
              </span>
            </div>
            <span className="hb-xh10-tier">{tiers[tier]}</span>
          </div>
          <div className="hb-xh10-lane" aria-hidden="true">
            <span className="hb-xh10-fill" />
            <span className="hb-xh10-ticks"><i /><i /><i /></span>
            <span className="hb-xh10-knob" />
          </div>
          <div className="hb-xh10-names" aria-hidden="true">
            {tiers.map((t, i) => <span key={t} data-on={i <= tier}>{t}</span>)}
          </div>
        </div>
        {status === "done" ? (
          <div className="hb-xh10-done" role="status">
            <h3>You are on the {product} list</h3>
            <p>We will email {email.trim()} when your wave opens. Every friend who joins with your link moves you up 120 spots.</p>
            <div className="hb-xh10-ref">
              <code>{link}</code>
              <button type="button" className="hb-xh10-copy" data-copied={copied} onClick={copy}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {copied ? <path d="m3.5 8.5 3 3 6-7" /> : <><rect x="5" y="5" width="9" height="9" rx="2" /><path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" /></>}
                </svg>
                {copied ? "Copied" : "Copy link"}
              </button>
            </div>
            <div className="hb-xh10-perks">
              <div className="hb-xh10-perk"><b>0</b><span>friends joined</span></div>
              <div className="hb-xh10-perk"><b>120</b><span>spots per invite</span></div>
              <div className="hb-xh10-perk"><b>3</b><span>invites to Priority</span></div>
            </div>
          </div>
        ) : (
          <form className="hb-xh10-form" onSubmit={submit} noValidate>
            <div className="hb-xh10-f" data-done={emailOk}>
              <label className="hb-xh10-l" htmlFor={`${uid}-em`}>Work email {plus(Math.round(queueLength * 0.22 * 0.82))}</label>
              <input
                ref={emailRef}
                id={`${uid}-em`}
                className="hb-xh10-in"
                type="email"
                autoComplete="email"
                placeholder="ana@foundry.studio"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={tried && !emailOk ? true : undefined}
                aria-describedby={tried && !emailOk ? `${uid}-em-e` : undefined}
              />
              {tried && !emailOk ? <p className="hb-xh10-e" id={`${uid}-em-e`}>We need a valid email to hold your spot.</p> : null}
            </div>
            <div className="hb-xh10-f" data-done={Boolean(useCase)}>
              <span className="hb-xh10-l" id={`${uid}-uc`}>What will you build? {plus(Math.round(queueLength * 0.2 * 0.82))}</span>
              <div className="hb-xh10-chips" role="radiogroup" aria-labelledby={`${uid}-uc`}>
                {useCases.map((u) => (
                  <button key={u} type="button" role="radio" aria-checked={useCase === u} className="hb-xh10-chip" onClick={() => setUseCase(useCase === u ? "" : u)}>{u}</button>
                ))}
              </div>
            </div>
            <div className="hb-xh10-f" data-done={teamIdx > 1}>
              <label className="hb-xh10-l" htmlFor={`${uid}-ts`}>Team size {plus(Math.round(queueLength * Math.min(0.2, teamIdx * 0.03) * 0.82))}</label>
              <div className="hb-xh10-range" style={{ "--hb-xh10-r": (teamIdx / (teamSteps.length - 1)).toFixed(3) } as React.CSSProperties}>
                <input id={`${uid}-ts`} type="range" min={0} max={teamSteps.length - 1} step={1} value={teamIdx} onChange={(e) => setTeamIdx(Number(e.target.value))} aria-valuetext={`${team}${teamIdx === teamSteps.length - 1 ? "+" : ""} people`} />
                <output htmlFor={`${uid}-ts`}>{team}{teamIdx === teamSteps.length - 1 ? "+" : ""} {team === 1 ? "person" : "people"}</output>
              </div>
            </div>
            <div className="hb-xh10-two">
              <div className="hb-xh10-f" data-done={siteOk}>
                <label className="hb-xh10-l" htmlFor={`${uid}-ws`}>Website {plus(Math.round(queueLength * 0.22 * 0.82))}</label>
                <input id={`${uid}-ws`} className="hb-xh10-in" placeholder="foundry.studio" autoComplete="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>
              <div className="hb-xh10-f" data-done={Boolean(source)}>
                <label className="hb-xh10-l" htmlFor={`${uid}-src`}>Heard from {plus(Math.round(queueLength * 0.12 * 0.82))}</label>
                <div className="hb-xh10-selw">
                  <select id={`${uid}-src`} className="hb-xh10-in" value={source} onChange={(e) => setSource(e.target.value)}>
                    <option value="">Choose</option>
                    {sources.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg>
                </div>
              </div>
            </div>
            <button type="submit" className="hb-xh10-go" aria-busy={status === "busy"}>
              {status === "busy" ? "Saving your spot..." : `Claim spot #${position.toLocaleString("en-US")}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
