"use client";

import * as React from "react";

export interface FormAddressValues {
  country: string;
  name: string;
  line1: string;
  line2: string;
  city: string;
  region: string;
  postal: string;
}

export interface FormAddressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit" | "onChange"> {
  defaultValues?: Partial<FormAddressValues>;
  showLabel?: boolean;
  sender?: string;
  submitLabel?: string;
  accent?: string;
  delay?: number;
  onChange?: (values: FormAddressValues) => void;
  onSubmit?: (values: FormAddressValues) => void | Promise<void>;
}

interface CountryRule {
  code: string;
  name: string;
  region: string | null;
  regionHint: string;
  postal: string;
  postalHint: string;
  test: RegExp;
  mask: (raw: string) => string;
  lines: (v: FormAddressValues) => string[];
}

const digits = (s: string, n: number) => s.replace(/\D/g, "").slice(0, n);

const countries: CountryRule[] = [
  {
    code: "US", name: "United States", region: "State", regionHint: "CA", postal: "ZIP code", postalHint: "94107",
    test: /^\d{5}(-\d{4})?$/,
    mask: (r) => { const d = digits(r, 9); return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d; },
    lines: (v) => [`${v.city}${v.city && v.region ? ", " : ""}${v.region.toUpperCase()} ${v.postal}`.trim()],
  },
  {
    code: "CA", name: "Canada", region: "Province", regionHint: "ON", postal: "Postal code", postalHint: "M5V 2T6",
    test: /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
    mask: (r) => { const s = r.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6); return s.length > 3 ? `${s.slice(0, 3)} ${s.slice(3)}` : s; },
    lines: (v) => [`${v.city} ${v.region.toUpperCase()}  ${v.postal}`.trim()],
  },
  {
    code: "GB", name: "United Kingdom", region: null, regionHint: "", postal: "Postcode", postalHint: "EC1V 9HX",
    test: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/,
    mask: (r) => { const s = r.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7); return s.length > 4 ? `${s.slice(0, s.length - 3)} ${s.slice(-3)}` : s; },
    lines: (v) => [v.city.toUpperCase(), v.postal],
  },
  {
    code: "DE", name: "Germany", region: null, regionHint: "", postal: "PLZ", postalHint: "10115",
    test: /^\d{5}$/,
    mask: (r) => digits(r, 5),
    lines: (v) => [`${v.postal} ${v.city}`.trim()],
  },
  {
    code: "BR", name: "Brazil", region: "State", regionHint: "SP", postal: "CEP", postalHint: "01310-100",
    test: /^\d{5}-\d{3}$/,
    mask: (r) => { const d = digits(r, 8); return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d; },
    lines: (v) => [`${v.city}${v.region ? ` - ${v.region.toUpperCase()}` : ""}`, v.postal ? `CEP ${v.postal}` : ""],
  },
  {
    code: "AU", name: "Australia", region: "State", regionHint: "NSW", postal: "Postcode", postalHint: "2000",
    test: /^\d{4}$/,
    mask: (r) => digits(r, 4),
    lines: (v) => [`${v.city.toUpperCase()} ${v.region.toUpperCase()} ${v.postal}`.trim()],
  },
];

const css = `
.hb-xh5 {
  --hb-xh5-a: #f5c542;
  box-sizing: border-box;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  font-family: inherit;
  color: #ededed;
  container-type: inline-size;
}
.hb-xh5 *, .hb-xh5 *::before, .hb-xh5 *::after { box-sizing: border-box; }
.hb-xh5-card { padding: 16px; border: 1px solid #262626; border-radius: 18px; background: #101010; box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 28px 56px -28px rgba(0,0,0,0.85); }
.hb-xh5-label {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px 14px;
  padding: 14px 14px 12px;
  margin-bottom: 16px;
  border-radius: 12px;
  background: linear-gradient(180deg, #f6f3ea, #ece7da);
  color: #1b1b1b;
  box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset, 0 10px 24px -12px rgba(0,0,0,0.8);
  overflow: hidden;
}
.hb-xh5-label::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 6px; background: repeating-linear-gradient(180deg, var(--hb-xh5-a) 0 8px, #1b1b1b 8px 16px); }
.hb-xh5-from { grid-column: 1 / -1; display: flex; justify-content: space-between; padding-left: 4px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 9.5px; letter-spacing: 0.06em; text-transform: uppercase; color: #6d675a; }
.hb-xh5-to { min-width: 0; padding-left: 4px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; line-height: 1.45; }
.hb-xh5-to b { display: block; font-family: var(--font-sans, inherit); font-size: 13.5px; font-weight: 700; letter-spacing: -0.01em; }
.hb-xh5-to span { display: block; min-height: 1.45em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xh5-to span[data-empty="true"] { color: #b3ac9c; }
.hb-xh5-to span[data-fresh="true"] { animation: hb-xh5-ink 0.5s ease-out; }
.hb-xh5-side { display: grid; align-content: space-between; justify-items: end; gap: 8px; }
.hb-xh5-cc { display: grid; place-items: center; min-width: 38px; height: 26px; padding: 0 6px; border: 2px solid #1b1b1b; border-radius: 4px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 13px; font-weight: 700; }
.hb-xh5-bars { display: flex; align-items: flex-end; gap: 1px; height: 28px; }
.hb-xh5-bars i { display: block; background: #1b1b1b; }
.hb-xh5-stamp { position: absolute; right: 64px; top: 22px; padding: 3px 8px; border: 2px solid #1f9d55; border-radius: 4px; color: #1f9d55; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; font-weight: 700; letter-spacing: 0.12em; transform: rotate(-12deg); opacity: 0.85; animation: hb-xh5-stamp 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.hb-xh5-form { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; }
.hb-xh5-f { grid-column: span 6; display: grid; gap: 5px; min-width: 0; }
.hb-xh5-f[data-w="3"] { grid-column: span 3; }
.hb-xh5-f[data-w="2"] { grid-column: span 2; }
.hb-xh5-f[data-w="4"] { grid-column: span 4; }
@container (max-width: 340px) { .hb-xh5-f[data-w] { grid-column: span 6; } }
.hb-xh5-l { display: flex; justify-content: space-between; font-size: 11.5px; font-weight: 500; color: #a8a8a8; }
.hb-xh5-l small { font-weight: 400; color: #646464; }
.hb-xh5-in, .hb-xh5-sel { width: 100%; height: 38px; padding: 0 11px; border: 1px solid #272727; border-radius: 9px; background: #0b0b0b; color: #ededed; font: inherit; font-size: 13.5px; outline: none; transition: border-color 0.18s ease, box-shadow 0.18s ease; }
.hb-xh5-in::placeholder { color: #4f4f4f; }
.hb-xh5-in:hover, .hb-xh5-sel:hover { border-color: #353535; }
.hb-xh5-in:focus, .hb-xh5-sel:focus { border-color: var(--hb-xh5-a); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xh5-a) 18%, transparent); }
.hb-xh5-in[aria-invalid="true"] { border-color: #f05260; box-shadow: 0 0 0 3px rgba(240,82,96,0.12); }
.hb-xh5-in[data-ok="true"] { border-color: color-mix(in srgb, #3ddc84 50%, #272727); }
.hb-xh5-mono { font-family: var(--font-mono, ui-monospace, monospace); letter-spacing: 0.04em; }
.hb-xh5-selw { position: relative; }
.hb-xh5-sel { appearance: none; padding-right: 32px; cursor: pointer; }
.hb-xh5-selw svg { position: absolute; right: 11px; top: 50%; width: 12px; height: 12px; transform: translateY(-50%); color: #7a7a7a; pointer-events: none; }
.hb-xh5-e { margin: 0; font-size: 11.5px; color: #ff8a95; animation: hb-xh5-in 0.2s ease-out; }
.hb-xh5-foot { grid-column: span 6; display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 4px; }
.hb-xh5-chk { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: #737373; transition: color 0.25s ease; }
.hb-xh5-chk[data-ok="true"] { color: #5fe39b; }
.hb-xh5-chk svg { width: 14px; height: 14px; }
.hb-xh5-save { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-width: 132px; height: 38px; padding: 0 16px; border: 0; border-radius: 10px; background: var(--hb-xh5-a); color: #1a1405; font: inherit; font-size: 13.5px; font-weight: 600; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -2px 0 rgba(0,0,0,0.12), 0 8px 20px -10px var(--hb-xh5-a); transition: transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1), filter 0.2s ease; }
.hb-xh5-save:hover { filter: brightness(1.06); }
.hb-xh5-save:active { transform: scale(0.97); }
.hb-xh5-save:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xh5-save[data-s="saved"] { background: #3ddc84; color: #052012; }
.hb-xh5-spin { width: 14px; height: 14px; border-radius: 50%; border: 2px solid rgba(26,20,5,0.25); border-top-color: #1a1405; animation: hb-xh5-rot 0.7s linear infinite; }
.hb-xh5-save svg { width: 15px; height: 15px; }
@keyframes hb-xh5-in { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: none; } }
@keyframes hb-xh5-ink { from { color: #8d7a3a; } to { color: inherit; } }
@keyframes hb-xh5-rot { to { transform: rotate(360deg); } }
@keyframes hb-xh5-stamp { from { opacity: 0; transform: rotate(-12deg) scale(2.2); } to { opacity: 0.85; transform: rotate(-12deg) scale(1); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xh5 *, .hb-xh5 *::before, .hb-xh5 *::after { animation: none !important; transition: none !important; }
}
`;

function hashText(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function FormAddress({
  defaultValues,
  showLabel = true,
  sender = "Haven Goods · Portland, OR",
  submitLabel = "Save address",
  accent = "#f5c542",
  delay = 900,
  onChange,
  onSubmit,
  className,
  style,
  ...rest
}: FormAddressProps) {
  const uid = React.useId();
  const [v, setV] = React.useState<FormAddressValues>({
    country: "US", name: "", line1: "", line2: "", city: "", region: "", postal: "",
    ...defaultValues,
  });
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [status, setStatus] = React.useState<"idle" | "saving" | "saved">("idle");
  const [fresh, setFresh] = React.useState("");
  const refs = React.useRef<Record<string, HTMLInputElement | null>>({});
  const rule = countries.find((c) => c.code === v.country) ?? countries[0];

  const update = (k: keyof FormAddressValues, raw: string) => {
    let value = raw;
    if (k === "postal") value = rule.mask(raw);
    if (k === "region") value = raw.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3);
    if (k === "country") {
      const r = countries.find((c) => c.code === raw) ?? countries[0];
      const next = { ...v, country: raw, region: r.region ? v.region : "", postal: r.mask(v.postal) };
      setV(next);
      onChange?.(next);
      setStatus("idle");
      return;
    }
    const next = { ...v, [k]: value };
    setV(next);
    setFresh(k);
    setStatus("idle");
    onChange?.(next);
  };

  const errors: Record<string, string> = {};
  if (v.name.trim().length < 2) errors.name = "Add the recipient's name.";
  if (v.line1.trim().length < 4) errors.line1 = "Add a street address.";
  if (v.city.trim().length < 2) errors.city = "Add a city.";
  if (rule.region && v.region.length < 2) errors.region = `Use the ${rule.region.toLowerCase()} code.`;
  if (!rule.test.test(v.postal)) errors.postal = v.postal ? `Format: ${rule.postalHint}` : `Add the ${rule.postal}.`;
  const show = (k: string) => (touched[k] ? errors[k] : undefined);
  const complete = !Object.keys(errors).length;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "saving") return;
    if (!complete) {
      setTouched({ name: true, line1: true, city: true, region: true, postal: true });
      const first = ["name", "line1", "city", "region", "postal"].find((k) => errors[k]);
      if (first) refs.current[first]?.focus();
      return;
    }
    setStatus("saving");
    try {
      await Promise.all([Promise.resolve(onSubmit?.(v)), new Promise((r) => window.setTimeout(r, delay))]);
      setStatus("saved");
    } catch {
      setStatus("idle");
    }
  };

  const tail = rule.lines(v);
  const bars = Array.from({ length: 30 }, (_, i) => {
    const h = hashText(`${v.postal}${v.line1}${i}`);
    return { w: (h % 3) + 1, h: 18 + (h % 11) };
  });

  const field = (k: keyof FormAddressValues, label: string, placeholder: string, w?: string, opts?: { auto?: string; mono?: boolean; optional?: boolean }) => (
    <div className="hb-xh5-f" data-w={w}>
      <label className="hb-xh5-l" htmlFor={`${uid}-${k}`}>
        {label}
        {opts?.optional ? <small>Optional</small> : null}
      </label>
      <input
        ref={(el) => { refs.current[k] = el; }}
        id={`${uid}-${k}`}
        className={`hb-xh5-in${opts?.mono ? " hb-xh5-mono" : ""}`}
        placeholder={placeholder}
        autoComplete={opts?.auto}
        value={v[k]}
        onChange={(e) => update(k, e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, [k]: true }))}
        aria-invalid={show(k) ? true : undefined}
        aria-describedby={show(k) ? `${uid}-${k}-e` : undefined}
        data-ok={k === "postal" && rule.test.test(v.postal) ? true : undefined}
      />
      {show(k) ? <p className="hb-xh5-e" id={`${uid}-${k}-e`}>{show(k)}</p> : null}
    </div>
  );

  return (
    <div className={["hb-xh5", className].filter(Boolean).join(" ")} style={{ ...style, "--hb-xh5-a": accent } as React.CSSProperties} {...rest}>
      <style href="hb-form-address" precedence="default">{css}</style>
      <div className="hb-xh5-card">
        {showLabel ? (
          <div className="hb-xh5-label" aria-label="Shipping label preview" role="img">
            <div className="hb-xh5-from"><span>From: {sender}</span><span>Ground</span></div>
            <div className="hb-xh5-to">
              <b>{v.name.trim() || "Recipient name"}</b>
              <span data-empty={!v.line1} data-fresh={fresh === "line1"} key={`a${v.line1.length > 0}`}>{v.line1 || "Street address"}</span>
              {v.line2 ? <span>{v.line2}</span> : null}
              {tail.map((l, i) => (
                <span key={i} data-empty={!l.replace(/[\s,-]/g, "")}>{l.replace(/[\s,-]/g, "") ? l : i === 0 ? `City, ${rule.region ?? rule.postal}` : rule.postal}</span>
              ))}
            </div>
            <div className="hb-xh5-side">
              <span className="hb-xh5-cc">{rule.code}</span>
              <span className="hb-xh5-bars" aria-hidden="true">
                {bars.map((b, i) => <i key={i} style={{ width: b.w, height: b.h }} />)}
              </span>
            </div>
            {status === "saved" ? <span className="hb-xh5-stamp">Verified</span> : null}
          </div>
        ) : null}
        <form className="hb-xh5-form" onSubmit={submit} noValidate>
          <div className="hb-xh5-f" data-w="3">
            <label className="hb-xh5-l" htmlFor={`${uid}-country`}>Country</label>
            <div className="hb-xh5-selw">
              <select id={`${uid}-country`} className="hb-xh5-sel" value={v.country} autoComplete="country" onChange={(e) => update("country", e.target.value)}>
                {countries.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
              </select>
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg>
            </div>
          </div>
          {field("name", "Full name", "Jordan Alvarez", "3", { auto: "name" })}
          {field("line1", "Street address", "2150 Market Street", undefined, { auto: "address-line1" })}
          {field("line2", "Apartment, suite", "Unit 4B", undefined, { auto: "address-line2", optional: true })}
          {field("city", "City", "San Francisco", rule.region ? "2" : "4", { auto: "address-level2" })}
          {rule.region ? field("region", rule.region, rule.regionHint, "2", { auto: "address-level1", mono: true }) : null}
          {field("postal", rule.postal, rule.postalHint, "2", { auto: "postal-code", mono: true })}
          <div className="hb-xh5-foot">
            <span className="hb-xh5-chk" data-ok={complete} aria-live="polite">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 1.5 2.5 4v4c0 3.2 2.4 5.6 5.5 6.5 3.1-.9 5.5-3.3 5.5-6.5V4L8 1.5Z" />
                {complete ? <path d="m5.5 8 1.8 1.8L10.8 6.3" /> : null}
              </svg>
              {complete ? "Looks deliverable" : "We check the format as you type"}
            </span>
            <button type="submit" className="hb-xh5-save" data-s={status} aria-busy={status === "saving"}>
              {status === "saving" ? <><span className="hb-xh5-spin" aria-hidden="true" />Saving</> : null}
              {status === "saved" ? (
                <>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" /></svg>
                  Saved
                </>
              ) : null}
              {status === "idle" ? submitLabel : null}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
