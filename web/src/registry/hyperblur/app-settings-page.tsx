"use client";

import * as React from "react";

export type AppSettingsTab = "profile" | "notifications" | "security" | "billing";

export interface AppSettingsValues {
  name: string;
  email: string;
  username: string;
  bio: string;
  timezone: string;
  digest: boolean;
  mentions: boolean;
  productUpdates: boolean;
  securityAlerts: boolean;
  twoFactor: boolean;
  loginAlerts: boolean;
}

export interface AppSettingsPageProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit" | "defaultValue"> {
  defaultValues?: Partial<AppSettingsValues>;
  initialChanges?: Partial<AppSettingsValues>;
  defaultTab?: AppSettingsTab;
  workspace?: string;
  plan?: string;
  accent?: string;
  onSave?: (values: AppSettingsValues) => void;
  onTabChange?: (tab: AppSettingsTab) => void;
}

const baseValues: AppSettingsValues = {
  name: "Maya Okafor",
  email: "maya@northwind.studio",
  username: "maya",
  bio: "Product designer leading the analytics workspace. Based in Lisbon, usually online 9 to 6.",
  timezone: "Europe/Lisbon",
  digest: true,
  mentions: true,
  productUpdates: false,
  securityAlerts: true,
  twoFactor: true,
  loginAlerts: false,
};

const tabs: { id: AppSettingsTab; label: string; hint: string; icon: string }[] = [
  { id: "profile", label: "Profile", hint: "Name, photo and bio", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" },
  { id: "notifications", label: "Notifications", hint: "Email and push", icon: "M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Zm4 4h4" },
  { id: "security", label: "Security", hint: "Password and sessions", icon: "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Zm-3 9 2 2 4-4" },
  { id: "billing", label: "Billing", hint: "Plan and invoices", icon: "M3 7h18v10H3V7Zm0 4h18M7 15h3" },
];

const timezones = ["Europe/Lisbon", "Europe/Berlin", "America/New_York", "America/Los_Angeles", "Asia/Tokyo", "Australia/Sydney"];

const sessions = [
  { device: "MacBook Pro", place: "Lisbon, Portugal", when: "Active now", current: true },
  { device: "iPhone 16", place: "Lisbon, Portugal", when: "2 hours ago", current: false },
  { device: "Chrome on Windows", place: "Porto, Portugal", when: "Oct 28", current: false },
];

const invoices = [
  { id: "INV-2041", date: "Nov 1, 2026", amount: "$48.00" },
  { id: "INV-1987", date: "Oct 1, 2026", amount: "$48.00" },
  { id: "INV-1932", date: "Sep 1, 2026", amount: "$36.00" },
];

const css = `
.hb-ye1 {
  --hb-ye1-accent: #2f7bff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 16px;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.45;
}
.hb-ye1 *, .hb-ye1 *::before, .hb-ye1 *::after { box-sizing: border-box; }
.hb-ye1-shell { display: grid; grid-template-columns: 1fr; min-height: 600px; }
.hb-ye1-nav { display: flex; flex-direction: column; gap: 4px; padding: 16px; border-bottom: 1px solid rgba(255,255,255,.08); background: #0d0d0d; }
.hb-ye1-ws { display: flex; align-items: center; gap: 10px; padding: 4px 6px 14px; }
.hb-ye1-ws-logo { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 8px; background: linear-gradient(135deg, var(--hb-ye1-accent), #9b6bff); color: #fff; font-weight: 700; font-size: 13px; }
.hb-ye1-ws-name { font-weight: 600; font-size: 13px; }
.hb-ye1-ws-plan { color: #8f8f8f; font-size: 12px; }
.hb-ye1-tabs { display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; }
.hb-ye1-tab { display: flex; align-items: center; gap: 10px; flex: none; margin: 0; padding: 9px 10px; border: 0; border-radius: 9px; background: transparent; color: #a1a1a1; font: inherit; text-align: left; cursor: pointer; transition: background-color .15s ease, color .15s ease; }
.hb-ye1-tab:hover { background: #151515; color: #ededed; }
.hb-ye1-tab[aria-selected="true"] { background: #171717; color: #ededed; box-shadow: inset 0 0 0 1px rgba(255,255,255,.06); }
.hb-ye1-tab:focus-visible { outline: 2px solid var(--hb-ye1-accent); outline-offset: 1px; }
.hb-ye1-tab svg { width: 17px; height: 17px; flex: none; }
.hb-ye1-tab[aria-selected="true"] svg { color: var(--hb-ye1-accent); }
.hb-ye1-tab-text { display: flex; flex-direction: column; }
.hb-ye1-tab-hint { display: none; color: #737373; font-size: 11.5px; }
.hb-ye1-main { position: relative; min-width: 0; padding: 24px 20px 96px; }
.hb-ye1-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; padding-bottom: 18px; border-bottom: 1px solid rgba(255,255,255,.08); }
.hb-ye1-title { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -.01em; }
.hb-ye1-sub { margin: 4px 0 0; color: #8f8f8f; font-size: 13px; }
.hb-ye1-panel { animation: hb-ye1-in .32s cubic-bezier(.2,.8,.2,1) both; }
.hb-ye1-row { display: grid; grid-template-columns: 1fr; gap: 10px; padding: 18px 0; border-bottom: 1px solid rgba(255,255,255,.06); }
.hb-ye1-label { font-weight: 500; font-size: 13.5px; }
.hb-ye1-help { margin-top: 2px; color: #8f8f8f; font-size: 12.5px; }
.hb-ye1-avatar-row { display: flex; align-items: center; gap: 14px; }
.hb-ye1-avatar { display: grid; place-items: center; width: 56px; height: 56px; border-radius: 999px; background: conic-gradient(from 200deg, var(--hb-ye1-accent), #9b6bff, #ff7a59, var(--hb-ye1-accent)); color: #fff; font-weight: 700; font-size: 18px; box-shadow: 0 0 0 3px #0a0a0a, 0 0 0 4px rgba(255,255,255,.12); }
.hb-ye1-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 32px; margin: 0; padding: 0 12px; border: 1px solid #262626; border-radius: 8px; background: #141414; color: #ededed; font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; transition: border-color .15s ease, background-color .15s ease; }
.hb-ye1-btn:hover { border-color: #3a3a3a; background: #1a1a1a; }
.hb-ye1-btn:focus-visible, .hb-ye1-input:focus-visible { outline: 2px solid var(--hb-ye1-accent); outline-offset: 1px; }
.hb-ye1-btn[data-tone="ghost"] { border-color: transparent; background: transparent; color: #a1a1a1; }
.hb-ye1-btn[data-tone="ghost"]:hover { color: #ededed; background: #151515; }
.hb-ye1-btn[data-tone="primary"] { border-color: transparent; background: var(--hb-ye1-accent); color: #fff; }
.hb-ye1-btn[data-tone="primary"]:hover { filter: brightness(1.1); }
.hb-ye1-btn[data-tone="danger"] { color: #ff8a8a; }
.hb-ye1-fields { display: grid; grid-template-columns: 1fr; gap: 12px; }
.hb-ye1-field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.hb-ye1-field > span { color: #a1a1a1; font-size: 12.5px; }
.hb-ye1-input { width: 100%; height: 36px; margin: 0; padding: 0 11px; border: 1px solid #262626; border-radius: 8px; background: #111; color: #ededed; font: inherit; font-size: 13.5px; transition: border-color .15s ease; }
.hb-ye1-input:hover { border-color: #333; }
textarea.hb-ye1-input { height: 84px; padding: 9px 11px; resize: vertical; line-height: 1.5; }
select.hb-ye1-input { appearance: none; background-image: linear-gradient(45deg, transparent 50%, #8f8f8f 50%), linear-gradient(135deg, #8f8f8f 50%, transparent 50%); background-position: calc(100% - 15px) 15px, calc(100% - 10px) 15px; background-size: 5px 5px; background-repeat: no-repeat; padding-right: 28px; }
.hb-ye1-prefix { display: flex; align-items: stretch; border: 1px solid #262626; border-radius: 8px; background: #111; overflow: hidden; }
.hb-ye1-prefix:focus-within { outline: 2px solid var(--hb-ye1-accent); outline-offset: 1px; }
.hb-ye1-prefix > span { display: flex; align-items: center; padding: 0 10px; border-right: 1px solid #262626; color: #737373; font-size: 13px; background: #0d0d0d; }
.hb-ye1-prefix .hb-ye1-input { border: 0; border-radius: 0; outline: none; }
.hb-ye1-count { align-self: flex-end; color: #737373; font-size: 11.5px; font-variant-numeric: tabular-nums; }
.hb-ye1-toggle-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,.06); }
.hb-ye1-switch { position: relative; flex: none; width: 36px; height: 20px; margin: 0; padding: 0; border: 0; border-radius: 999px; background: #2a2a2a; cursor: pointer; transition: background-color .2s ease; }
.hb-ye1-switch::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 999px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.4); transition: transform .22s cubic-bezier(.3,1.4,.5,1); }
.hb-ye1-switch[aria-checked="true"] { background: var(--hb-ye1-accent); }
.hb-ye1-switch[aria-checked="true"]::after { transform: translateX(16px); }
.hb-ye1-switch:focus-visible { outline: 2px solid var(--hb-ye1-accent); outline-offset: 2px; }
.hb-ye1-list { display: flex; flex-direction: column; margin-top: 8px; border: 1px solid rgba(255,255,255,.08); border-radius: 12px; overflow: hidden; }
.hb-ye1-item { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-top: 1px solid rgba(255,255,255,.06); background: #0f0f0f; }
.hb-ye1-item:first-child { border-top: 0; }
.hb-ye1-item-main { flex: 1; min-width: 0; }
.hb-ye1-item-title { font-size: 13.5px; font-weight: 500; }
.hb-ye1-item-meta { color: #8f8f8f; font-size: 12px; }
.hb-ye1-chip { display: inline-flex; align-items: center; height: 20px; padding: 0 8px; border-radius: 999px; background: color-mix(in srgb, var(--hb-ye1-accent) 18%, transparent); color: color-mix(in srgb, var(--hb-ye1-accent) 70%, #fff); font-size: 11px; font-weight: 600; }
.hb-ye1-device { display: grid; place-items: center; width: 34px; height: 34px; flex: none; border-radius: 9px; background: #171717; color: #a1a1a1; }
.hb-ye1-device svg { width: 17px; height: 17px; }
.hb-ye1-plan { position: relative; display: grid; gap: 14px; margin-top: 18px; padding: 18px; border: 1px solid rgba(255,255,255,.08); border-radius: 14px; background: radial-gradient(120% 140% at 100% 0%, color-mix(in srgb, var(--hb-ye1-accent) 22%, transparent), transparent 55%), #101010; overflow: hidden; }
.hb-ye1-plan-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.hb-ye1-plan-name { font-size: 16px; font-weight: 600; }
.hb-ye1-price { font-size: 22px; font-weight: 600; letter-spacing: -.02em; }
.hb-ye1-price small { color: #8f8f8f; font-size: 12px; font-weight: 400; }
.hb-ye1-meter { height: 6px; border-radius: 999px; background: #222; overflow: hidden; }
.hb-ye1-meter > i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--hb-ye1-accent), #9b6bff); transform-origin: left; animation: hb-ye1-grow .9s cubic-bezier(.2,.8,.2,1) both; }
.hb-ye1-savebar { position: absolute; left: 50%; bottom: 18px; z-index: 3; display: flex; align-items: center; gap: 12px; width: min(560px, calc(100% - 32px)); padding: 8px 8px 8px 16px; border: 1px solid rgba(255,255,255,.1); border-radius: 12px; background: rgba(23,23,23,.92); box-shadow: 0 18px 40px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.05); backdrop-filter: blur(10px); transform: translate(-50%, calc(100% + 30px)); opacity: 0; visibility: hidden; transition: transform .38s cubic-bezier(.2,.9,.2,1), opacity .25s ease, visibility 0s linear .38s; }
.hb-ye1-savebar[data-open="true"] { transform: translate(-50%, 0); opacity: 1; visibility: visible; transition: transform .38s cubic-bezier(.2,.9,.2,1), opacity .25s ease, visibility 0s; }
.hb-ye1-savebar-text { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; color: #d4d4d4; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-ye1-savebar-text i { width: 7px; height: 7px; flex: none; border-radius: 999px; background: #f5a524; box-shadow: 0 0 0 3px rgba(245,165,36,.18); }
.hb-ye1-toast { position: absolute; right: 18px; top: 18px; z-index: 3; display: flex; align-items: center; gap: 8px; padding: 9px 12px; border: 1px solid rgba(255,255,255,.1); border-radius: 10px; background: #171717; font-size: 13px; animation: hb-ye1-toast 2.4s ease both; }
.hb-ye1-toast svg { width: 16px; height: 16px; color: #3ccf91; }
@keyframes hb-ye1-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes hb-ye1-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hb-ye1-toast { 0% { opacity: 0; transform: translateY(-6px); } 10%, 85% { opacity: 1; transform: none; } 100% { opacity: 0; } }
@container (min-width: 640px) {
  .hb-ye1-shell { grid-template-columns: 236px 1fr; }
  .hb-ye1-nav { border-bottom: 0; border-right: 1px solid rgba(255,255,255,.08); padding: 20px 14px; }
  .hb-ye1-tabs { flex-direction: column; overflow: visible; }
  .hb-ye1-tab { width: 100%; }
  .hb-ye1-tab-hint { display: block; }
  .hb-ye1-main { padding: 28px 36px 110px; }
  .hb-ye1-row { grid-template-columns: 220px 1fr; gap: 28px; }
  .hb-ye1-fields { grid-template-columns: 1fr 1fr; }
  .hb-ye1-fields .hb-ye1-wide { grid-column: 1 / -1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ye1 *, .hb-ye1 *::before, .hb-ye1 *::after { animation: none !important; transition: none !important; }
}
`;

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} className="hb-ye1-switch" onClick={() => onChange(!checked)} />;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

export function AppSettingsPage({
  defaultValues,
  initialChanges,
  defaultTab = "profile",
  workspace = "Northwind Studio",
  plan = "Pro plan · 8 seats",
  accent = "#2f7bff",
  onSave,
  onTabChange,
  className,
  style,
  ...rest
}: AppSettingsPageProps) {
  const id = React.useId();
  const initial = React.useMemo(() => ({ ...baseValues, ...defaultValues }), [defaultValues]);
  const [saved, setSaved] = React.useState<AppSettingsValues>(initial);
  const [values, setValues] = React.useState<AppSettingsValues>(() => ({ ...initial, ...initialChanges }));
  const [tab, setTab] = React.useState<AppSettingsTab>(defaultTab);
  const [toast, setToast] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const dirty = (Object.keys(values) as (keyof AppSettingsValues)[]).some((k) => values[k] !== saved[k]);

  React.useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(0), 2400);
    return () => window.clearTimeout(t);
  }, [toast]);

  const set = <K extends keyof AppSettingsValues>(key: K, value: AppSettingsValues[K]) => setValues((v) => ({ ...v, [key]: value }));

  const selectTab = (next: AppSettingsTab) => {
    setTab(next);
    onTabChange?.(next);
  };

  const onTabKey = (e: React.KeyboardEvent, index: number) => {
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    selectTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  const save = () => {
    setSaved(values);
    setToast((n) => n + 1);
    onSave?.(values);
  };

  const discard = () => setValues(saved);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s" && dirty) {
      e.preventDefault();
      save();
    }
    if (e.key === "Escape" && dirty) discard();
  };

  const current = tabs.find((t) => t.id === tab) ?? tabs[0];

  return (
    <div
      className={["hb-ye1", className].filter(Boolean).join(" ")}
      style={{ "--hb-ye1-accent": accent, ...style } as React.CSSProperties}
      onKeyDown={onKeyDown}
      {...rest}
    >
      <style href="hb-app-settings-page" precedence="default">{css}</style>
      <div className="hb-ye1-shell">
        <nav className="hb-ye1-nav" aria-label="Settings sections">
          <div className="hb-ye1-ws">
            <span className="hb-ye1-ws-logo" aria-hidden="true">{workspace.charAt(0)}</span>
            <div>
              <div className="hb-ye1-ws-name">{workspace}</div>
              <div className="hb-ye1-ws-plan">{plan}</div>
            </div>
          </div>
          <div className="hb-ye1-tabs" role="tablist" aria-orientation="vertical">
            {tabs.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`${id}-tab-${t.id}`}
                aria-controls={`${id}-panel`}
                aria-selected={tab === t.id}
                tabIndex={tab === t.id ? 0 : -1}
                className="hb-ye1-tab"
                onClick={() => selectTab(t.id)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                <Icon d={t.icon} />
                <span className="hb-ye1-tab-text">
                  <span>{t.label}</span>
                  <span className="hb-ye1-tab-hint">{t.hint}</span>
                </span>
              </button>
            ))}
          </div>
        </nav>
        <main className="hb-ye1-main">
          <div className="hb-ye1-head">
            <div>
              <h2 className="hb-ye1-title">{current.label}</h2>
              <p className="hb-ye1-sub">
                {tab === "profile" && "This is how other people in the workspace see you."}
                {tab === "notifications" && "Choose what reaches your inbox and what waits in the app."}
                {tab === "security" && "Keep your account protected and review where you are signed in."}
                {tab === "billing" && "Manage your subscription, seats and payment history."}
              </p>
            </div>
          </div>
          <div className="hb-ye1-panel" key={tab} role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${tab}`}>
            {tab === "profile" && (
              <>
                <div className="hb-ye1-row">
                  <div>
                    <div className="hb-ye1-label">Photo</div>
                    <div className="hb-ye1-help">PNG or JPG, at least 256 px.</div>
                  </div>
                  <div className="hb-ye1-avatar-row">
                    <span className="hb-ye1-avatar" aria-hidden="true">{initials(values.name)}</span>
                    <button type="button" className="hb-ye1-btn">Change photo</button>
                    <button type="button" className="hb-ye1-btn" data-tone="ghost">Remove</button>
                  </div>
                </div>
                <div className="hb-ye1-row">
                  <div>
                    <div className="hb-ye1-label">Personal details</div>
                    <div className="hb-ye1-help">Your name appears on comments and invoices.</div>
                  </div>
                  <div className="hb-ye1-fields">
                    <label className="hb-ye1-field">
                      <span>Full name</span>
                      <input className="hb-ye1-input" value={values.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
                    </label>
                    <label className="hb-ye1-field">
                      <span>Email</span>
                      <input className="hb-ye1-input" type="email" value={values.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
                    </label>
                    <label className="hb-ye1-field">
                      <span>Username</span>
                      <span className="hb-ye1-prefix">
                        <span>northwind.studio/</span>
                        <input className="hb-ye1-input" value={values.username} onChange={(e) => set("username", e.target.value.replace(/\s/g, "").toLowerCase())} />
                      </span>
                    </label>
                    <label className="hb-ye1-field">
                      <span>Time zone</span>
                      <select className="hb-ye1-input" value={values.timezone} onChange={(e) => set("timezone", e.target.value)}>
                        {timezones.map((z) => <option key={z} value={z}>{z.replace("_", " ")}</option>)}
                      </select>
                    </label>
                    <label className="hb-ye1-field hb-ye1-wide">
                      <span>Bio</span>
                      <textarea className="hb-ye1-input" maxLength={160} value={values.bio} onChange={(e) => set("bio", e.target.value)} />
                      <span className="hb-ye1-count">{values.bio.length}/160</span>
                    </label>
                  </div>
                </div>
              </>
            )}
            {tab === "notifications" && (
              <div className="hb-ye1-row">
                <div>
                  <div className="hb-ye1-label">Email</div>
                  <div className="hb-ye1-help">Sent to {values.email || "your address"}.</div>
                </div>
                <div>
                  {([
                    ["digest", "Daily digest", "A summary of activity at 8:00 every weekday."],
                    ["mentions", "Mentions and replies", "When someone mentions you or replies to your thread."],
                    ["productUpdates", "Product updates", "New features and changes, about twice a month."],
                    ["securityAlerts", "Security alerts", "Sign-ins from new devices and password changes."],
                  ] as const).map(([key, title, text]) => (
                    <div className="hb-ye1-toggle-row" key={key}>
                      <div>
                        <div className="hb-ye1-label">{title}</div>
                        <div className="hb-ye1-help">{text}</div>
                      </div>
                      <Switch checked={values[key]} onChange={(v) => set(key, v)} label={title} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === "security" && (
              <>
                <div className="hb-ye1-row">
                  <div>
                    <div className="hb-ye1-label">Sign-in protection</div>
                    <div className="hb-ye1-help">Extra checks when you sign in.</div>
                  </div>
                  <div>
                    <div className="hb-ye1-toggle-row">
                      <div>
                        <div className="hb-ye1-label">Two-factor authentication {values.twoFactor && <span className="hb-ye1-chip">On</span>}</div>
                        <div className="hb-ye1-help">Use an authenticator app for a one-time code.</div>
                      </div>
                      <Switch checked={values.twoFactor} onChange={(v) => set("twoFactor", v)} label="Two-factor authentication" />
                    </div>
                    <div className="hb-ye1-toggle-row">
                      <div>
                        <div className="hb-ye1-label">New device alerts</div>
                        <div className="hb-ye1-help">Email me when a new browser signs in.</div>
                      </div>
                      <Switch checked={values.loginAlerts} onChange={(v) => set("loginAlerts", v)} label="New device alerts" />
                    </div>
                  </div>
                </div>
                <div className="hb-ye1-row">
                  <div>
                    <div className="hb-ye1-label">Active sessions</div>
                    <div className="hb-ye1-help">Sign out of devices you do not recognize.</div>
                  </div>
                  <div className="hb-ye1-list">
                    {sessions.map((s) => (
                      <div className="hb-ye1-item" key={s.device}>
                        <span className="hb-ye1-device"><Icon d={s.device.includes("iPhone") ? "M8 3h8v18H8V3Zm3 15h2" : "M4 5h16v10H4V5Zm-2 14h20"} /></span>
                        <div className="hb-ye1-item-main">
                          <div className="hb-ye1-item-title">{s.device} {s.current && <span className="hb-ye1-chip">This device</span>}</div>
                          <div className="hb-ye1-item-meta">{s.place} · {s.when}</div>
                        </div>
                        {!s.current && <button type="button" className="hb-ye1-btn" data-tone="danger">Sign out</button>}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            {tab === "billing" && (
              <>
                <div className="hb-ye1-plan">
                  <div className="hb-ye1-plan-top">
                    <div>
                      <div className="hb-ye1-plan-name">Pro · Annual</div>
                      <div className="hb-ye1-help">Renews on Jan 14, 2027 · Visa ending 4242</div>
                    </div>
                    <div className="hb-ye1-price">$48<small> / month</small></div>
                  </div>
                  <div>
                    <div className="hb-ye1-help" style={{ display: "flex", justifyContent: "space-between" }}><span>6 of 8 seats used</span><span>75%</span></div>
                    <div className="hb-ye1-meter" style={{ marginTop: 6 }}><i style={{ width: "75%" }} /></div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button type="button" className="hb-ye1-btn" data-tone="primary">Add seats</button>
                    <button type="button" className="hb-ye1-btn">Change plan</button>
                  </div>
                </div>
                <div className="hb-ye1-list" style={{ marginTop: 18 }}>
                  {invoices.map((inv) => (
                    <div className="hb-ye1-item" key={inv.id}>
                      <div className="hb-ye1-item-main">
                        <div className="hb-ye1-item-title">{inv.id}</div>
                        <div className="hb-ye1-item-meta">{inv.date}</div>
                      </div>
                      <span className="hb-ye1-chip">Paid</span>
                      <span style={{ width: 70, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{inv.amount}</span>
                      <button type="button" className="hb-ye1-btn" data-tone="ghost" aria-label={`Download ${inv.id}`}>PDF</button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="hb-ye1-savebar" data-open={dirty} role="region" aria-label="Unsaved changes" aria-hidden={!dirty}>
            <span className="hb-ye1-savebar-text"><i aria-hidden="true" />You have unsaved changes</span>
            <button type="button" className="hb-ye1-btn" data-tone="ghost" onClick={discard} tabIndex={dirty ? 0 : -1}>Discard</button>
            <button type="button" className="hb-ye1-btn" data-tone="primary" onClick={save} tabIndex={dirty ? 0 : -1}>Save changes</button>
          </div>
          {toast > 0 && (
            <div className="hb-ye1-toast" role="status" key={toast}>
              <Icon d="M5 12.5l4.5 4.5L19 7.5" />
              Settings saved
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AppSettingsPage;
