"use client";

import * as React from "react";

export interface ProfileSettingsValues {
  name: string;
  username: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  color: string;
}

export interface ProfileSettingsCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "defaultValue"> {
  title?: string;
  subtitle?: string;
  defaultValues?: Partial<ProfileSettingsValues>;
  colors?: string[];
  bioLimit?: number;
  sections?: string[];
  onSave?: (values: ProfileSettingsValues) => void | Promise<void>;
  accent?: string;
}

const baseValues: ProfileSettingsValues = {
  name: "Camille Durand",
  username: "camille",
  email: "camille@fieldnotes.app",
  bio: "Product designer at Fieldnotes. Making research tools that feel like a good notebook.",
  location: "Lyon, France",
  website: "https://camille.design",
  color: "#2f7bff",
};

const defaultColors = ["#2f7bff", "#7c3aed", "#e11d74", "#f97316", "#10b981", "#0f172a"];

const css = `
@keyframes hb-yg9-bar {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-yg9-spin { to { transform: rotate(360deg); } }
@keyframes hb-yg9-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-yg9-in {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
}
.hb-yg9 {
  --hb-yg9-accent: #2f7bff;
  --hb-yg9-ink: #14161b;
  --hb-yg9-muted: #697080;
  --hb-yg9-line: rgba(20, 22, 27, 0.1);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #f7f5ef;
  color: var(--hb-yg9-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yg9 *, .hb-yg9 *::before, .hb-yg9 *::after { box-sizing: border-box; }
.hb-yg9-in {
  display: grid;
  gap: 28px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 24px 88px;
}
@container (min-width: 860px) {
  .hb-yg9-in { grid-template-columns: 240px 1fr; gap: 48px; }
}
.hb-yg9-title { margin: 0; font-size: 30px; font-weight: 650; letter-spacing: -0.035em; }
.hb-yg9-sub { margin: 8px 0 0; color: var(--hb-yg9-muted); font-size: 14.5px; line-height: 1.55; }
.hb-yg9-nav { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 22px; }
@container (min-width: 860px) {
  .hb-yg9-nav { flex-direction: column; }
}
.hb-yg9-tab {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 36px;
  padding: 0 12px;
  border: 0;
  border-radius: 10px;
  background: none;
  color: var(--hb-yg9-muted);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.hb-yg9-tab:hover { background: rgba(20, 22, 27, 0.05); color: var(--hb-yg9-ink); }
.hb-yg9-tab[aria-current="page"] { background: #fff; color: var(--hb-yg9-ink); box-shadow: 0 1px 2px rgba(20, 22, 27, 0.06), inset 0 0 0 1px var(--hb-yg9-line); }
.hb-yg9-tab:focus-visible { outline: 2px solid var(--hb-yg9-accent); outline-offset: 2px; }
.hb-yg9-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--hb-yg9-line);
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(20, 22, 27, 0.04), 0 30px 60px -40px rgba(20, 22, 27, 0.3);
  animation: hb-yg9-in 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.hb-yg9-cover {
  height: 96px;
  background:
    radial-gradient(60% 120% at 20% 0%, color-mix(in srgb, var(--hb-yg9-c) 55%, #fff), transparent 70%),
    radial-gradient(60% 120% at 90% 100%, color-mix(in srgb, var(--hb-yg9-c) 30%, #fff), transparent 70%),
    color-mix(in srgb, var(--hb-yg9-c) 12%, #fff);
  transition: background 0.4s ease;
}
.hb-yg9-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 16px 20px;
  margin-top: -40px;
  padding: 0 28px;
}
.hb-yg9-avatar {
  display: grid;
  place-items: center;
  width: 84px;
  height: 84px;
  border: 4px solid #fff;
  border-radius: 50%;
  background: linear-gradient(140deg, color-mix(in srgb, var(--hb-yg9-c) 70%, #fff), var(--hb-yg9-c));
  box-shadow: 0 8px 20px -8px color-mix(in srgb, var(--hb-yg9-c) 60%, transparent);
  color: #fff;
  font-size: 28px;
  font-weight: 650;
  letter-spacing: -0.03em;
  transition: background 0.4s ease;
}
.hb-yg9-swatches { display: flex; gap: 8px; padding-bottom: 6px; }
.hb-yg9-swatch {
  width: 24px;
  height: 24px;
  padding: 0;
  border: 2px solid #fff;
  border-radius: 50%;
  background: var(--hb-yg9-s);
  box-shadow: 0 0 0 1px var(--hb-yg9-line);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hb-yg9-swatch:hover { transform: scale(1.12); }
.hb-yg9-swatch[aria-checked="true"] { box-shadow: 0 0 0 2px var(--hb-yg9-s); }
.hb-yg9-swatch:focus-visible { outline: 2px solid var(--hb-yg9-accent); outline-offset: 3px; }
.hb-yg9-form { padding: 24px 28px 28px; }
.hb-yg9-grid { display: grid; gap: 4px 16px; }
@container (min-width: 620px) {
  .hb-yg9-grid { grid-template-columns: 1fr 1fr; }
  .hb-yg9-wide { grid-column: 1 / -1; }
}
.hb-yg9-field label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
  color: #3b3f4a;
  font-size: 13px;
  font-weight: 600;
}
.hb-yg9-dirty { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-yg9-accent); }
.hb-yg9-wrap {
  display: flex;
  align-items: center;
  border: 1px solid rgba(20, 22, 27, 0.14);
  border-radius: 11px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(20, 22, 27, 0.04);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-yg9-wrap:focus-within { border-color: var(--hb-yg9-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-yg9-accent) 14%, transparent); }
.hb-yg9-wrap[data-invalid="true"] { border-color: #e5484d; }
.hb-yg9-prefix { padding-left: 12px; color: var(--hb-yg9-muted); font-size: 14px; }
.hb-yg9-input {
  flex: 1;
  width: 100%;
  min-width: 0;
  height: 42px;
  padding: 0 12px;
  border: 0;
  background: none;
  color: var(--hb-yg9-ink);
  font: inherit;
  font-size: 14.5px;
  outline: none;
}
.hb-yg9-prefix + .hb-yg9-input { padding-left: 2px; }
textarea.hb-yg9-input { height: 84px; padding: 10px 12px; line-height: 1.5; resize: vertical; }
.hb-yg9-hint { display: flex; justify-content: space-between; gap: 8px; min-height: 18px; margin: 5px 0 6px; color: var(--hb-yg9-muted); font-size: 12px; }
.hb-yg9-hint [data-error] { color: #d93036; }
.hb-yg9-hint [data-over="true"] { color: #d93036; font-weight: 600; }
.hb-yg9-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
  padding-top: 18px;
  border-top: 1px solid var(--hb-yg9-line);
}
.hb-yg9-state { display: inline-flex; align-items: center; gap: 8px; color: var(--hb-yg9-muted); font-size: 13.5px; }
.hb-yg9-state[data-tone="dirty"] { animation: hb-yg9-bar 0.35s ease both; color: var(--hb-yg9-ink); }
.hb-yg9-state[data-tone="saved"] { color: #15803d; animation: hb-yg9-bar 0.35s ease both; }
.hb-yg9-state svg path { stroke-dasharray: 24; stroke-dashoffset: 24; animation: hb-yg9-draw 0.4s 0.1s ease forwards; }
.hb-yg9-actions { display: flex; gap: 8px; }
.hb-yg9-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 38px;
  padding: 0 16px;
  border: 1px solid rgba(20, 22, 27, 0.14);
  border-radius: 10px;
  background: #fff;
  color: var(--hb-yg9-ink);
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, opacity 0.2s ease, transform 0.15s ease;
}
.hb-yg9-btn:hover:not(:disabled) { background: #f4f4f5; }
.hb-yg9-btn:active:not(:disabled) { transform: scale(0.97); }
.hb-yg9-btn:disabled { opacity: 0.45; cursor: default; }
.hb-yg9-btn:focus-visible { outline: 2px solid var(--hb-yg9-accent); outline-offset: 2px; }
.hb-yg9-primary { min-width: 120px; border-color: transparent; background: var(--hb-yg9-ink); color: #fff; }
.hb-yg9-primary:hover:not(:disabled) { background: color-mix(in srgb, var(--hb-yg9-accent) 35%, var(--hb-yg9-ink)); }
.hb-yg9-spin { width: 14px; height: 14px; border: 2px solid rgba(255, 255, 255, 0.3); border-top-color: #fff; border-radius: 50%; animation: hb-yg9-spin 0.7s linear infinite; }
@media (prefers-reduced-motion: reduce) {
  .hb-yg9-card, .hb-yg9-state, .hb-yg9-state svg path, .hb-yg9-spin { animation: none; }
  .hb-yg9-state svg path { stroke-dashoffset: 0; }
  .hb-yg9-cover, .hb-yg9-avatar, .hb-yg9-swatch, .hb-yg9-wrap, .hb-yg9-btn, .hb-yg9-tab { transition: none; }
}
`;

type Errors = Partial<Record<keyof ProfileSettingsValues, string>>;

function validate(v: ProfileSettingsValues, bioLimit: number): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Name is too short.";
  if (!/^[a-z0-9_]{3,20}$/.test(v.username)) e.username = "3 to 20 lowercase letters, numbers or _.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email.";
  if (v.bio.length > bioLimit) e.bio = "Bio is too long.";
  if (v.website && !/^https?:\/\/[^\s.]+\.[^\s]{2,}$/.test(v.website.trim())) e.website = "Start with https:// and include a domain.";
  return e;
}

function initials(name: string) {
  return name.trim().split(/\s+/).map((p) => p[0] ?? "").slice(0, 2).join("").toUpperCase() || "?";
}

export function ProfileSettingsCard({
  title = "Settings",
  subtitle = "Manage how you appear to teammates and on shared notebooks.",
  defaultValues,
  colors = defaultColors,
  bioLimit = 160,
  sections = ["Profile", "Account", "Notifications", "Billing"],
  onSave,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: ProfileSettingsCardProps) {
  const id = React.useId();
  const initial = React.useMemo(() => ({ ...baseValues, ...defaultValues }), [defaultValues]);
  const [saved, setSaved] = React.useState<ProfileSettingsValues>(initial);
  const [values, setValues] = React.useState<ProfileSettingsValues>(initial);
  const [errors, setErrors] = React.useState<Errors>({});
  const [status, setStatus] = React.useState<"idle" | "saving" | "saved">("idle");
  const [section, setSection] = React.useState(sections[0] ?? "Profile");

  const keys = Object.keys(values) as (keyof ProfileSettingsValues)[];
  const dirtyKeys = keys.filter((k) => values[k] !== saved[k]);
  const dirty = dirtyKeys.length > 0;

  React.useEffect(() => {
    if (status !== "saved") return;
    const t = window.setTimeout(() => setStatus("idle"), 2400);
    return () => window.clearTimeout(t);
  }, [status]);

  const set = (k: keyof ProfileSettingsValues, v: string) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
    if (status === "saved") setStatus("idle");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate(values, bioLimit);
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("saving");
    const clean = { ...values, name: values.name.trim(), email: values.email.trim(), website: values.website.trim() };
    try {
      await Promise.all([onSave?.(clean), new Promise((r) => setTimeout(r, 900))]);
      setSaved(clean);
      setValues(clean);
      setStatus("saved");
    } catch {
      setStatus("idle");
    }
  };

  const reset = () => {
    setValues(saved);
    setErrors({});
  };

  const field = (k: keyof ProfileSettingsValues, label: string, opts: { type?: string; prefix?: string; wide?: boolean; auto?: string; placeholder?: string } = {}) => (
    <div className={`hb-yg9-field ${opts.wide ? "hb-yg9-wide" : ""}`}>
      <label htmlFor={`${id}-${k}`}>
        {label}
        {dirtyKeys.includes(k) && <span className="hb-yg9-dirty" aria-label="edited" />}
      </label>
      <div className="hb-yg9-wrap" data-invalid={errors[k] ? "true" : undefined}>
        {opts.prefix && <span className="hb-yg9-prefix" aria-hidden="true">{opts.prefix}</span>}
        <input
          id={`${id}-${k}`}
          className="hb-yg9-input"
          type={opts.type ?? "text"}
          autoComplete={opts.auto}
          placeholder={opts.placeholder}
          value={values[k]}
          onChange={(e) => set(k, k === "username" ? e.target.value.toLowerCase() : e.target.value)}
          aria-invalid={errors[k] ? true : undefined}
          aria-describedby={`${id}-${k}-hint`}
          disabled={status === "saving"}
        />
      </div>
      <div className="hb-yg9-hint" id={`${id}-${k}-hint`}>
        {errors[k] ? <span data-error="">{errors[k]}</span> : <span>{k === "username" ? `fieldnotes.app/@${values.username || "you"}` : ""}</span>}
      </div>
    </div>
  );

  return (
    <section className={`hb-yg9 ${className}`} style={{ "--hb-yg9-accent": accent, "--hb-yg9-c": values.color, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-profile-settings-card" precedence="default">{css}</style>
      <div className="hb-yg9-in">
        <div>
          <h2 className="hb-yg9-title">{title}</h2>
          <p className="hb-yg9-sub">{subtitle}</p>
          <nav className="hb-yg9-nav" aria-label="Settings sections">
            {sections.map((s) => (
              <button key={s} type="button" className="hb-yg9-tab" aria-current={s === section ? "page" : undefined} onClick={() => setSection(s)}>
                {s}
              </button>
            ))}
          </nav>
        </div>
        <div className="hb-yg9-card">
          <div className="hb-yg9-cover" aria-hidden="true" />
          <div className="hb-yg9-head">
            <span className="hb-yg9-avatar" aria-hidden="true">{initials(values.name)}</span>
            <div className="hb-yg9-swatches" role="radiogroup" aria-label="Avatar color">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  className="hb-yg9-swatch"
                  aria-checked={values.color === c}
                  aria-label={`Color ${c}`}
                  style={{ "--hb-yg9-s": c } as React.CSSProperties}
                  onClick={() => set("color", c)}
                />
              ))}
            </div>
          </div>
          <form className="hb-yg9-form" onSubmit={submit} noValidate>
            <div className="hb-yg9-grid">
              {field("name", "Full name", { auto: "name" })}
              {field("username", "Username", { prefix: "@", auto: "username" })}
              {field("email", "Email", { type: "email", auto: "email" })}
              {field("location", "Location", { auto: "address-level2" })}
              <div className="hb-yg9-field hb-yg9-wide">
                <label htmlFor={`${id}-bio`}>
                  Bio
                  {dirtyKeys.includes("bio") && <span className="hb-yg9-dirty" aria-label="edited" />}
                </label>
                <div className="hb-yg9-wrap" data-invalid={errors.bio || values.bio.length > bioLimit ? "true" : undefined}>
                  <textarea
                    id={`${id}-bio`}
                    className="hb-yg9-input"
                    value={values.bio}
                    onChange={(e) => set("bio", e.target.value)}
                    aria-invalid={errors.bio ? true : undefined}
                    aria-describedby={`${id}-bio-hint`}
                    disabled={status === "saving"}
                  />
                </div>
                <div className="hb-yg9-hint" id={`${id}-bio-hint`}>
                  {errors.bio ? <span data-error="">{errors.bio}</span> : <span>Shown on your public profile.</span>}
                  <span data-over={values.bio.length > bioLimit}>{values.bio.length}/{bioLimit}</span>
                </div>
              </div>
              {field("website", "Website", { type: "url", wide: true, auto: "url", placeholder: "https://" })}
            </div>
            <div className="hb-yg9-foot">
              {status === "saved" ? (
                <span className="hb-yg9-state" data-tone="saved" role="status">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                  Changes saved
                </span>
              ) : dirty ? (
                <span className="hb-yg9-state" data-tone="dirty" role="status">
                  {dirtyKeys.length} unsaved {dirtyKeys.length === 1 ? "change" : "changes"}
                </span>
              ) : (
                <span className="hb-yg9-state">Last updated 3 days ago</span>
              )}
              <div className="hb-yg9-actions">
                <button type="button" className="hb-yg9-btn" onClick={reset} disabled={!dirty || status === "saving"}>Reset</button>
                <button type="submit" className="hb-yg9-btn hb-yg9-primary" disabled={!dirty || status === "saving"}>
                  {status === "saving" ? <><span className="hb-yg9-spin" aria-hidden="true" />Saving</> : "Save changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
