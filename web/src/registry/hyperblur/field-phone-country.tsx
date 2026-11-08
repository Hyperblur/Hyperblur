"use client";

import * as React from "react";

export interface FieldPhoneCountryOption {
  code: string;
  name: string;
  dial: string;
  mask: string;
  colors: [string, string, string];
}

export interface FieldPhoneCountryValue {
  country: string;
  dial: string;
  national: string;
  e164: string;
  complete: boolean;
}

export interface FieldPhoneCountryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  label?: string;
  accent?: string;
  countries?: FieldPhoneCountryOption[];
  defaultCountry?: string;
  defaultValue?: string;
  hint?: string;
  disabled?: boolean;
  onChange?: (value: FieldPhoneCountryValue) => void;
}

export const fieldPhoneCountries: FieldPhoneCountryOption[] = [
  { code: "US", name: "United States", dial: "+1", mask: "(###) ###-####", colors: ["#3c3b6e", "#ffffff", "#b22234"] },
  { code: "CA", name: "Canada", dial: "+1", mask: "(###) ###-####", colors: ["#d52b1e", "#ffffff", "#d52b1e"] },
  { code: "BR", name: "Brazil", dial: "+55", mask: "(##) #####-####", colors: ["#009c3b", "#ffdf00", "#002776"] },
  { code: "GB", name: "United Kingdom", dial: "+44", mask: "#### ######", colors: ["#012169", "#ffffff", "#c8102e"] },
  { code: "DE", name: "Germany", dial: "+49", mask: "#### #######", colors: ["#141414", "#dd0000", "#ffce00"] },
  { code: "FR", name: "France", dial: "+33", mask: "# ## ## ## ##", colors: ["#002395", "#ffffff", "#ed2939"] },
  { code: "ES", name: "Spain", dial: "+34", mask: "### ## ## ##", colors: ["#aa151b", "#f1bf00", "#aa151b"] },
  { code: "PT", name: "Portugal", dial: "+351", mask: "### ### ###", colors: ["#006600", "#006600", "#ff0000"] },
  { code: "MX", name: "Mexico", dial: "+52", mask: "## #### ####", colors: ["#006847", "#ffffff", "#ce1126"] },
  { code: "IN", name: "India", dial: "+91", mask: "##### #####", colors: ["#ff9933", "#ffffff", "#138808"] },
  { code: "JP", name: "Japan", dial: "+81", mask: "##-####-####", colors: ["#ffffff", "#bc002d", "#ffffff"] },
  { code: "AU", name: "Australia", dial: "+61", mask: "### ### ###", colors: ["#00008b", "#ffffff", "#00008b"] },
];

const css = `
.hb-xg2 {
  --hb-xg2-c: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  color: #ededed;
}
.hb-xg2 *, .hb-xg2 *::before, .hb-xg2 *::after { box-sizing: border-box; }
.hb-xg2-label { display: block; margin: 0 0 7px; font-size: 12.5px; font-weight: 500; color: #a1a1a1; }
.hb-xg2-box {
  display: flex;
  align-items: stretch;
  height: 46px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: linear-gradient(180deg, #161616, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 1px 2px rgba(0, 0, 0, 0.5);
  transition: border-color 0.2s ease, box-shadow 0.25s ease;
}
.hb-xg2-box:hover { border-color: #333; }
.hb-xg2-box:focus-within {
  border-color: var(--hb-xg2-c);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 0 0 4px color-mix(in srgb, var(--hb-xg2-c) 16%, transparent);
}
.hb-xg2[data-disabled="true"] { opacity: 0.5; pointer-events: none; }
.hb-xg2-trigger {
  display: flex;
  align-items: center;
  gap: 7px;
  flex: none;
  margin: 0;
  padding: 0 10px 0 12px;
  border: 0;
  border-right: 1px solid #222;
  border-radius: 11px 0 0 11px;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 13.5px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.hb-xg2-trigger:hover { background: rgba(255, 255, 255, 0.03); }
.hb-xg2-trigger:focus-visible { outline: 2px solid var(--hb-xg2-c); outline-offset: -2px; }
.hb-xg2-flag {
  position: relative;
  width: 20px;
  height: 14px;
  flex: none;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14), 0 1px 2px rgba(0, 0, 0, 0.5);
}
.hb-xg2-flag::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255, 255, 255, 0.22), transparent 55%); }
.hb-xg2-dial { color: #a1a1a1; font-variant-numeric: tabular-nums; }
.hb-xg2-chev { width: 10px; height: 10px; color: #6f6f6f; transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xg2[data-open="true"] .hb-xg2-chev { transform: rotate(180deg); }
.hb-xg2-wrap { position: relative; flex: 1; min-width: 0; }
.hb-xg2-in, .hb-xg2-ghost {
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0 40px 0 12px;
  font: inherit;
  font-size: 14.5px;
  letter-spacing: 0.015em;
  font-variant-numeric: tabular-nums;
  line-height: 44px;
  white-space: pre;
}
.hb-xg2-in {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: #ededed;
  caret-color: var(--hb-xg2-c);
}
.hb-xg2-ghost { pointer-events: none; overflow: hidden; color: transparent; }
.hb-xg2-ghost b { font-weight: inherit; color: #474747; transition: color 0.2s ease; }
.hb-xg2-wrap:focus-within .hb-xg2-ghost b { color: #5a5a5a; }
.hb-xg2-mark {
  position: absolute;
  right: 12px;
  top: 50%;
  width: 18px;
  height: 18px;
  margin-top: -9px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #1f8f55;
  color: #fff;
  transform: scale(0.4);
  opacity: 0;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
}
.hb-xg2-mark svg { width: 10px; height: 10px; }
.hb-xg2[data-complete="true"] .hb-xg2-mark { transform: scale(1); opacity: 1; }
.hb-xg2-help { display: flex; justify-content: space-between; gap: 8px; margin-top: 8px; font-size: 12px; color: #8f8f8f; }
.hb-xg2-help span:last-child { font-variant-numeric: tabular-nums; color: #6f6f6f; }
.hb-xg2[data-complete="true"] .hb-xg2-help span:first-child { color: #5fd38d; }
.hb-xg2-pop {
  position: absolute;
  z-index: 30;
  left: 0;
  right: 0;
  top: calc(100% + 6px);
  padding: 6px;
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  background: rgba(20, 20, 20, 0.96);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 24px 48px -16px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transform-origin: top left;
  animation: hb-xg2-in 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xg2-search {
  width: 100%;
  height: 34px;
  margin: 0 0 4px;
  padding: 0 10px;
  border: 1px solid #262626;
  border-radius: 9px;
  background: #0d0d0d;
  color: #ededed;
  font: inherit;
  font-size: 13px;
  outline: 0;
}
.hb-xg2-search:focus { border-color: color-mix(in srgb, var(--hb-xg2-c) 60%, #262626); }
.hb-xg2-list { max-height: 196px; margin: 0; padding: 0; list-style: none; overflow-y: auto; scrollbar-width: thin; }
.hb-xg2-opt {
  display: flex;
  align-items: center;
  gap: 9px;
  height: 34px;
  padding: 0 9px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
}
.hb-xg2-opt[data-active="true"] { background: rgba(255, 255, 255, 0.06); }
.hb-xg2-opt[aria-selected="true"] .hb-xg2-oname::after { content: ""; display: inline-block; width: 5px; height: 5px; margin-left: 7px; border-radius: 50%; background: var(--hb-xg2-c); vertical-align: middle; }
.hb-xg2-oname { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xg2-odial { color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-xg2-empty { padding: 12px 9px; font-size: 12.5px; color: #8f8f8f; }
@keyframes hb-xg2-in { from { opacity: 0; transform: translateY(-4px) scale(0.98); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xg2 *, .hb-xg2-pop { transition: none !important; animation: none !important; }
}
`;

function applyMask(digits: string, mask: string) {
  let out = "";
  let i = 0;
  for (const ch of mask) {
    if (i >= digits.length) break;
    if (ch === "#") {
      out += digits[i];
      i++;
    } else out += ch;
  }
  return out;
}

function slotsOf(mask: string) {
  return mask.split("").filter((c) => c === "#").length;
}

function flagStyle(c: [string, string, string]): React.CSSProperties {
  return { background: `linear-gradient(180deg, ${c[0]} 0 33.4%, ${c[1]} 33.4% 66.6%, ${c[2]} 66.6% 100%)` };
}

export function FieldPhoneCountry({
  label = "Phone number",
  accent = "#2f7bff",
  countries = fieldPhoneCountries,
  defaultCountry = "US",
  defaultValue = "",
  hint = "We'll text a code to confirm it.",
  disabled = false,
  onChange,
  className = "",
  style,
  ...rest
}: FieldPhoneCountryProps) {
  const id = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [code, setCode] = React.useState(defaultCountry);
  const country = countries.find((c) => c.code === code) ?? countries[0];
  const [digits, setDigits] = React.useState(defaultValue.replace(/\D/g, "").slice(0, slotsOf(country.mask)));
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);

  const slots = slotsOf(country.mask);
  const formatted = applyMask(digits, country.mask);
  const ghost = country.mask.slice(formatted.length).replace(/#/g, "0");
  const complete = digits.length === slots;

  const q = query.trim().toLowerCase();
  const filtered = countries.filter(
    (c) => !q || c.name.toLowerCase().includes(q) || c.code.toLowerCase() === q || c.dial.includes(q.replace(/^\+?/, "+")),
  );

  function emit(d: string, c: FieldPhoneCountryOption) {
    onChange?.({
      country: c.code,
      dial: c.dial,
      national: d,
      e164: d ? `${c.dial}${d}` : "",
      complete: d.length === slotsOf(c.mask),
    });
  }

  React.useEffect(() => {
    if (!open) return;
    function down(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", down);
    searchRef.current?.focus();
    return () => document.removeEventListener("pointerdown", down);
  }, [open]);

  function pick(c: FieldPhoneCountryOption) {
    setCode(c.code);
    const d = digits.slice(0, slotsOf(c.mask));
    setDigits(d);
    emit(d, c);
    setOpen(false);
    setQuery("");
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function onInput(e: React.ChangeEvent<HTMLInputElement>) {
    const el = e.target;
    let raw = el.value;
    let c = country;
    if (raw.trim().startsWith("+")) {
      const plain = raw.replace(/[^\d+]/g, "");
      const match = [...countries]
        .sort((a, b) => b.dial.length - a.dial.length)
        .find((x) => plain.startsWith(x.dial));
      if (match) {
        c = match.dial === country.dial ? country : match;
        raw = plain.slice(match.dial.length);
        setCode(c.code);
      }
    }
    const caret = el.selectionStart ?? el.value.length;
    const before = el.value.slice(0, caret).replace(/\D/g, "").length;
    const d = raw.replace(/\D/g, "").slice(0, slotsOf(c.mask));
    setDigits(d);
    emit(d, c);
    const f = applyMask(d, c.mask);
    requestAnimationFrame(() => {
      const target = Math.min(before, d.length);
      let seen = 0;
      let pos = target === 0 ? 0 : f.length;
      for (let i = 0; i < f.length && target > 0; i++) {
        if (/\d/.test(f[i])) seen++;
        if (seen === target) {
          pos = i + 1;
          break;
        }
      }
      if (document.activeElement === inputRef.current) inputRef.current?.setSelectionRange(pos, pos);
    });
  }

  function onSearchKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(filtered.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[active]) pick(filtered[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  React.useEffect(() => {
    if (!open) return;
    document.getElementById(`${id}-o-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open, id]);

  const vars = { "--hb-xg2-c": accent, ...style } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`hb-xg2 ${className}`}
      style={vars}
      data-open={open}
      data-complete={complete}
      data-disabled={disabled}
      {...rest}
    >
      <style href="hb-field-phone-country" precedence="default">{css}</style>
      <label className="hb-xg2-label" htmlFor={`${id}-in`}>
        {label}
      </label>
      <div className="hb-xg2-box">
        <button
          ref={triggerRef}
          type="button"
          className="hb-xg2-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Country: ${country.name} ${country.dial}`}
          disabled={disabled}
          onClick={() => {
            setActive(Math.max(0, countries.indexOf(country)));
            setOpen((o) => !o);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" && !open) {
              e.preventDefault();
              setActive(Math.max(0, countries.indexOf(country)));
              setOpen(true);
            }
          }}
        >
          <span className="hb-xg2-flag" style={flagStyle(country.colors)} aria-hidden="true" />
          <span className="hb-xg2-dial">{country.dial}</span>
          <svg className="hb-xg2-chev" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M2.5 4l2.5 2.5L7.5 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="hb-xg2-wrap">
          <span className="hb-xg2-ghost" aria-hidden="true">
            {formatted}
            <b>{ghost}</b>
          </span>
          <input
            ref={inputRef}
            id={`${id}-in`}
            className="hb-xg2-in"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={formatted}
            onChange={onInput}
            disabled={disabled}
            aria-describedby={`${id}-help`}
          />
          <span className="hb-xg2-mark" aria-hidden="true">
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2.2 5.2l1.9 1.9L7.9 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
      <div className="hb-xg2-help" id={`${id}-help`} aria-live="polite">
        <span>{complete ? `Valid ${country.name} number` : hint}</span>
        <span>
          {digits.length}/{slots}
        </span>
      </div>
      {open && (
        <div className="hb-xg2-pop">
          <input
            ref={searchRef}
            className="hb-xg2-search"
            placeholder="Search country or code"
            value={query}
            role="combobox"
            aria-expanded="true"
            aria-controls={`${id}-list`}
            aria-activedescendant={filtered[active] ? `${id}-o-${active}` : undefined}
            aria-label="Search countries"
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onSearchKey}
          />
          {filtered.length ? (
            <ul className="hb-xg2-list" role="listbox" id={`${id}-list`} aria-label="Countries">
              {filtered.map((c, i) => (
                <li
                  key={c.code}
                  id={`${id}-o-${i}`}
                  role="option"
                  aria-selected={c.code === country.code}
                  data-active={i === active}
                  className="hb-xg2-opt"
                  onPointerEnter={() => setActive(i)}
                  onClick={() => pick(c)}
                >
                  <span className="hb-xg2-flag" style={flagStyle(c.colors)} aria-hidden="true" />
                  <span className="hb-xg2-oname">{c.name}</span>
                  <span className="hb-xg2-odial">{c.dial}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="hb-xg2-empty">No country matches “{query}”.</div>
          )}
        </div>
      )}
    </div>
  );
}
