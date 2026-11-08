"use client";

import * as React from "react";

export interface FormSettingsValues {
  name: string;
  timezone: string;
  density: "compact" | "comfortable";
  mentions: boolean;
  digest: boolean;
  product: boolean;
}

export interface FormSettingsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit" | "title"> {
  title?: string;
  email?: string;
  defaultValues?: Partial<FormSettingsValues>;
  savedValues?: Partial<FormSettingsValues>;
  timezones?: string[];
  accent?: string;
  delay?: number;
  onSave?: (values: FormSettingsValues, changed: (keyof FormSettingsValues)[]) => void | Promise<void>;
}

const base: FormSettingsValues = {
  name: "Priya Raman",
  timezone: "Europe/London",
  density: "comfortable",
  mentions: true,
  digest: false,
  product: true,
};

const css = `
.hb-xh6 {
  --hb-xh6-a: #6e8bff;
  box-sizing: border-box;
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  font-family: inherit;
  color: #ededed;
}
.hb-xh6 *, .hb-xh6 *::before, .hb-xh6 *::after { box-sizing: border-box; }
.hb-xh6-card { position: relative; overflow: hidden; border: 1px solid #262626; border-radius: 16px; background: #0f0f0f; box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 28px 56px -28px rgba(0,0,0,0.85); }
.hb-xh6-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 16px 18px; border-bottom: 1px solid #1e1e1e; }
.hb-xh6-title { margin: 0; font-size: 15px; font-weight: 600; letter-spacing: -0.01em; }
.hb-xh6-kbd { font-size: 11.5px; color: #6b6b6b; }
.hb-xh6-kbd kbd { padding: 1px 5px; border: 1px solid #2e2e2e; border-bottom-width: 2px; border-radius: 5px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; color: #9a9a9a; }
.hb-xh6-body { padding: 6px 18px 18px; }
.hb-xh6-row { display: grid; grid-template-columns: 1fr minmax(0, 1.25fr); align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid #191919; }
.hb-xh6-row:last-child { border-bottom: 0; }
.hb-xh6-lab { display: grid; gap: 2px; min-width: 0; }
.hb-xh6-lab label, .hb-xh6-lab > span:first-child { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 500; color: #e2e2e2; }
.hb-xh6-lab small { font-size: 11.5px; color: #6f6f6f; line-height: 1.35; }
.hb-xh6-dirty { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-xh6-a); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xh6-a) 20%, transparent); animation: hb-xh6-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xh6-in, .hb-xh6-sel { width: 100%; height: 36px; padding: 0 10px; border: 1px solid #272727; border-radius: 9px; background: #0a0a0a; color: #ededed; font: inherit; font-size: 13px; outline: none; transition: border-color 0.18s ease, box-shadow 0.18s ease; }
.hb-xh6-in:hover, .hb-xh6-sel:hover { border-color: #353535; }
.hb-xh6-in:focus, .hb-xh6-sel:focus { border-color: var(--hb-xh6-a); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xh6-a) 20%, transparent); }
.hb-xh6-in[aria-invalid="true"] { border-color: #f05260; box-shadow: 0 0 0 3px rgba(240,82,96,0.12); }
.hb-xh6-err { grid-column: 2; margin: -6px 0 0; font-size: 11.5px; color: #ff8a95; }
.hb-xh6-selw { position: relative; }
.hb-xh6-sel { appearance: none; padding-right: 30px; cursor: pointer; }
.hb-xh6-selw svg { position: absolute; right: 10px; top: 50%; width: 12px; height: 12px; transform: translateY(-50%); color: #777; pointer-events: none; }
.hb-xh6-ro { display: flex; align-items: center; justify-content: space-between; gap: 8px; height: 36px; padding: 0 10px; border: 1px dashed #262626; border-radius: 9px; font-size: 13px; color: #9a9a9a; min-width: 0; }
.hb-xh6-ro span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xh6-ver { flex: none; display: inline-flex; align-items: center; gap: 4px; padding: 2px 7px; border-radius: 999px; background: rgba(61,220,132,0.1); color: #5fe39b; font-size: 10.5px; font-weight: 500; }
.hb-xh6-seg { position: relative; display: grid; grid-template-columns: 1fr 1fr; padding: 3px; border: 1px solid #252525; border-radius: 10px; background: #0a0a0a; }
.hb-xh6-seg::before { content: ""; position: absolute; top: 3px; bottom: 3px; left: 3px; width: calc(50% - 3px); border-radius: 7px; background: #1f1f1f; box-shadow: inset 0 1px 0 rgba(255,255,255,0.07); transform: translateX(calc(var(--hb-xh6-s) * 100%)); transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh6-seg button { position: relative; height: 28px; border: 0; background: none; color: #8a8a8a; font: inherit; font-size: 12.5px; cursor: pointer; border-radius: 7px; transition: color 0.2s ease; }
.hb-xh6-seg button[aria-checked="true"] { color: #f2f2f2; }
.hb-xh6-seg button:focus-visible { outline: 2px solid var(--hb-xh6-a); }
.hb-xh6-sw { justify-self: end; position: relative; width: 38px; height: 22px; padding: 0; border: 0; border-radius: 999px; background: #2a2a2a; cursor: pointer; box-shadow: inset 0 1px 2px rgba(0,0,0,0.5); transition: background 0.25s ease; }
.hb-xh6-sw::after { content: ""; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; border-radius: 50%; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.4); transition: transform 0.3s cubic-bezier(0.34, 1.4, 0.64, 1), width 0.2s ease; }
.hb-xh6-sw:active::after { width: 20px; }
.hb-xh6-sw[aria-checked="true"] { background: var(--hb-xh6-a); }
.hb-xh6-sw[aria-checked="true"]::after { transform: translateX(16px); }
.hb-xh6-sw[aria-checked="true"]:active::after { transform: translateX(12px); }
.hb-xh6-sw:focus-visible { outline: 2px solid var(--hb-xh6-a); outline-offset: 2px; }
.hb-xh6-group { margin: 14px 0 2px; font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #5f5f5f; }
.hb-xh6-bar {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 8px 8px 14px;
  border: 1px solid #2c2c2c;
  border-radius: 13px;
  background: rgba(24,24,24,0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 32px -10px rgba(0,0,0,0.9);
  transform: translateY(calc(100% + 16px));
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease, background 0.3s ease;
}
.hb-xh6-bar[data-show="true"] { transform: none; }
.hb-xh6-bar[data-shake="a"] { animation: hb-xh6-shake 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-xh6-bar[data-shake="b"] { animation: hb-xh6-shake-b 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-xh6-bar[data-s="saved"] { border-color: rgba(61,220,132,0.35); background: rgba(14,32,22,0.94); }
.hb-xh6-msg { display: flex; align-items: center; gap: 8px; min-width: 0; font-size: 12.5px; color: #cfcfcf; }
.hb-xh6-msg b { font-variant-numeric: tabular-nums; color: #fff; font-weight: 600; }
.hb-xh6-msg span { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.hb-xh6-bar[data-s="saved"] .hb-xh6-msg { color: #8af0b6; }
.hb-xh6-msg svg { flex: none; width: 15px; height: 15px; }
.hb-xh6-acts { display: flex; gap: 6px; flex: none; }
.hb-xh6-reset { height: 30px; padding: 0 11px; border: 0; border-radius: 8px; background: transparent; color: #a1a1a1; font: inherit; font-size: 12.5px; cursor: pointer; transition: background 0.2s ease, color 0.2s ease; }
.hb-xh6-reset:hover { background: #242424; color: #fff; }
.hb-xh6-reset:focus-visible, .hb-xh6-save:focus-visible { outline: 2px solid var(--hb-xh6-a); outline-offset: 2px; }
.hb-xh6-save { display: inline-flex; align-items: center; gap: 7px; height: 30px; padding: 0 13px; border: 0; border-radius: 8px; background: #f2f2f2; color: #0a0a0a; font: inherit; font-size: 12.5px; font-weight: 600; cursor: pointer; transition: transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1), background 0.2s ease; }
.hb-xh6-save:hover { background: #fff; }
.hb-xh6-save:active { transform: scale(0.96); }
.hb-xh6-save[aria-disabled="true"] { opacity: 0.45; cursor: not-allowed; }
.hb-xh6-spin { width: 12px; height: 12px; border-radius: 50%; border: 2px solid rgba(0,0,0,0.2); border-top-color: #0a0a0a; animation: hb-xh6-rot 0.7s linear infinite; }
.hb-xh6-pad { height: 50px; }
@container (max-width: 360px) { .hb-xh6-row { grid-template-columns: 1fr; gap: 8px; } .hb-xh6-err { grid-column: 1; } .hb-xh6-sw { justify-self: start; } }
.hb-xh6-card { container-type: inline-size; }
@keyframes hb-xh6-pop { from { transform: scale(0); } to { transform: scale(1); } }
@keyframes hb-xh6-rot { to { transform: rotate(360deg); } }
@keyframes hb-xh6-shake { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-5px); } 40%, 60% { transform: translateX(5px); } }
@keyframes hb-xh6-shake-b { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-5px); } 40%, 60% { transform: translateX(5px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xh6 *, .hb-xh6 *::before, .hb-xh6 *::after { animation: none !important; transition: none !important; }
}
`;

export function FormSettings({
  title = "Account settings",
  email = "priya@lattice.dev",
  defaultValues,
  savedValues,
  timezones = ["America/Los_Angeles", "America/New_York", "Europe/London", "Europe/Berlin", "Asia/Singapore", "Australia/Sydney"],
  accent = "#6e8bff",
  delay = 900,
  onSave,
  className,
  style,
  ...rest
}: FormSettingsProps) {
  const uid = React.useId();
  const [saved, setSaved] = React.useState<FormSettingsValues>(() => ({ ...base, ...(savedValues ?? defaultValues) }));
  const [v, setV] = React.useState<FormSettingsValues>(() => ({ ...base, ...defaultValues }));
  const [status, setStatus] = React.useState<"idle" | "saving" | "saved">("idle");
  const [shake, setShake] = React.useState(0);
  const timer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const changed = (Object.keys(v) as (keyof FormSettingsValues)[]).filter((k) => v[k] !== saved[k]);
  const nameErr = v.name.trim().length < 2 ? "Display name needs at least 2 characters." : "";
  const set = <K extends keyof FormSettingsValues>(k: K, val: FormSettingsValues[K]) => {
    setV((s) => ({ ...s, [k]: val }));
    if (status === "saved") setStatus("idle");
  };

  const save = async () => {
    if (status === "saving" || !changed.length) return;
    if (nameErr) {
      setShake((n) => n + 1);
      return;
    }
    setStatus("saving");
    try {
      await Promise.all([Promise.resolve(onSave?.(v, changed)), new Promise((r) => window.setTimeout(r, delay))]);
      setSaved(v);
      setStatus("saved");
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setStatus("idle"), 1600);
    } catch {
      setStatus("idle");
      setShake((n) => n + 1);
    }
  };

  const showBar = changed.length > 0 || status !== "idle";
  const dot = (k: keyof FormSettingsValues) => (v[k] !== saved[k] ? <span className="hb-xh6-dirty" aria-label="Changed" role="img" /> : null);
  const toggle = (k: "mentions" | "digest" | "product", label: string, hint: string) => (
    <div className="hb-xh6-row">
      <div className="hb-xh6-lab">
        <span id={`${uid}-${k}`}>{label}{dot(k)}</span>
        <small>{hint}</small>
      </div>
      <button type="button" role="switch" aria-checked={v[k]} aria-labelledby={`${uid}-${k}`} className="hb-xh6-sw" onClick={() => set(k, !v[k])} />
    </div>
  );

  return (
    <div className={["hb-xh6", className].filter(Boolean).join(" ")} style={{ ...style, "--hb-xh6-a": accent } as React.CSSProperties} {...rest}>
      <style href="hb-form-settings" precedence="default">{css}</style>
      <form
        className="hb-xh6-card"
        noValidate
        onSubmit={(e) => { e.preventDefault(); save(); }}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
            e.preventDefault();
            save();
          }
        }}
      >
        <div className="hb-xh6-head">
          <h3 className="hb-xh6-title">{title}</h3>
          <span className="hb-xh6-kbd"><kbd>⌘</kbd> <kbd>S</kbd> to save</span>
        </div>
        <div className="hb-xh6-body">
          <div className="hb-xh6-row">
            <div className="hb-xh6-lab">
              <label htmlFor={`${uid}-name`}>Display name{dot("name")}</label>
              <small>Shown on comments and mentions.</small>
            </div>
            <input
              id={`${uid}-name`}
              className="hb-xh6-in"
              value={v.name}
              autoComplete="name"
              onChange={(e) => set("name", e.target.value.slice(0, 40))}
              aria-invalid={nameErr ? true : undefined}
              aria-describedby={nameErr ? `${uid}-name-e` : undefined}
            />
            {nameErr ? <p className="hb-xh6-err" id={`${uid}-name-e`} role="alert">{nameErr}</p> : null}
          </div>
          <div className="hb-xh6-row">
            <div className="hb-xh6-lab">
              <span>Email</span>
              <small>Managed by your organization.</small>
            </div>
            <div className="hb-xh6-ro"><span>{email}</span><span className="hb-xh6-ver">Verified</span></div>
          </div>
          <div className="hb-xh6-row">
            <div className="hb-xh6-lab">
              <label htmlFor={`${uid}-tz`}>Time zone{dot("timezone")}</label>
              <small>Used for reminders and digests.</small>
            </div>
            <div className="hb-xh6-selw">
              <select id={`${uid}-tz`} className="hb-xh6-sel" value={v.timezone} onChange={(e) => set("timezone", e.target.value)}>
                {timezones.map((t) => <option key={t} value={t}>{t.replace("_", " ")}</option>)}
              </select>
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg>
            </div>
          </div>
          <div className="hb-xh6-row">
            <div className="hb-xh6-lab">
              <span id={`${uid}-den`}>Density{dot("density")}</span>
              <small>Spacing in lists and tables.</small>
            </div>
            <div className="hb-xh6-seg" role="radiogroup" aria-labelledby={`${uid}-den`} style={{ "--hb-xh6-s": v.density === "compact" ? 0 : 1 } as React.CSSProperties}>
              {(["compact", "comfortable"] as const).map((d) => (
                <button key={d} type="button" role="radio" aria-checked={v.density === d} onClick={() => set("density", d)}>
                  {d === "compact" ? "Compact" : "Comfortable"}
                </button>
              ))}
            </div>
          </div>
          <p className="hb-xh6-group">Email notifications</p>
          {toggle("mentions", "Mentions and replies", "When someone tags you or replies.")}
          {toggle("digest", "Weekly digest", "A Monday summary of your projects.")}
          {toggle("product", "Product updates", "New features, about once a month.")}
          <div className="hb-xh6-pad" aria-hidden="true" />
        </div>
        <div className="hb-xh6-bar" data-show={showBar} data-s={status} data-shake={shake ? (shake % 2 ? "a" : "b") : undefined} aria-hidden={!showBar}>
          <span className="hb-xh6-msg" role="status">
            {status === "saved" ? (
              <>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" /></svg>
                <span>All changes saved</span>
              </>
            ) : (
              <span><b>{changed.length}</b> unsaved change{changed.length === 1 ? "" : "s"}</span>
            )}
          </span>
          {status === "saved" ? null : (
            <span className="hb-xh6-acts">
              <button type="button" className="hb-xh6-reset" tabIndex={showBar ? 0 : -1} onClick={() => { setV(saved); setStatus("idle"); }}>Reset</button>
              <button type="submit" className="hb-xh6-save" tabIndex={showBar ? 0 : -1} aria-disabled={Boolean(nameErr)} aria-busy={status === "saving"}>
                {status === "saving" ? <span className="hb-xh6-spin" aria-hidden="true" /> : null}
                {status === "saving" ? "Saving" : "Save changes"}
              </button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
