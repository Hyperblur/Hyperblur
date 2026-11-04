"use client";

import * as React from "react";

export interface PasswordRule {
  label: string;
  test: (value: string) => boolean;
}

export interface InputPasswordStrengthProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "value" | "defaultValue" | "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, level: number) => void;
  label?: string;
  rules?: PasswordRule[];
  showRules?: boolean;
  accent?: string;
}

const defaultRules: PasswordRule[] = [
  { label: "8+ characters", test: (v) => v.length >= 8 },
  { label: "Upper & lower case", test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { label: "A number", test: (v) => /\d/.test(v) },
  { label: "A symbol", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

const levelLabels = ["", "Weak", "Fair", "Good", "Strong"];
const levelColors = ["#3a3a3a", "#ff5d6c", "#ffa23a", "#ffd23a", "#34d27b"];

const css = `
.hb-qn6 {
  box-sizing: border-box;
  width: 100%;
  font: inherit;
  color: #ededed;
}
.hb-qn6 *, .hb-qn6 *::before, .hb-qn6 *::after { box-sizing: border-box; }
.hb-qn6-lab { display: block; margin: 0 0 6px 2px; font-size: 13px; font-weight: 500; color: #a1a1a1; }
.hb-qn6-field {
  display: flex;
  align-items: center;
  height: 46px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: #111;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-qn6-field:hover { border-color: #3a3a3a; }
.hb-qn6-field:focus-within {
  border-color: var(--hb-qn6-a);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qn6-a) 18%, transparent);
}
.hb-qn6-in {
  flex: 1;
  min-width: 0;
  height: 100%;
  margin: 0;
  padding: 0 4px 0 14px;
  border: 0;
  outline: 0;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 15px;
}
.hb-qn6-in::placeholder { color: #5f5f5f; }
.hb-qn6-in:disabled { cursor: not-allowed; opacity: 0.5; }
.hb-qn6-eye {
  display: grid;
  flex: none;
  place-items: center;
  width: 34px;
  height: 34px;
  margin: 0 5px 0 0;
  padding: 0;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #8f8f8f;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.hb-qn6-eye:hover { background: #1c1c1c; color: #ededed; }
.hb-qn6-eye:focus-visible { outline: 2px solid var(--hb-qn6-a); outline-offset: 1px; }
.hb-qn6-eye svg { width: 18px; height: 18px; display: block; overflow: visible; }
.hb-qn6-eye path, .hb-qn6-eye circle { fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-qn6-slash {
  stroke-dasharray: 1 1.1;
  stroke-dashoffset: 1.05;
  transition: stroke-dashoffset 0.3s cubic-bezier(0.6, 0, 0.3, 1);
}
.hb-qn6-eye[aria-pressed="true"] .hb-qn6-slash { stroke-dashoffset: 0; }
.hb-qn6-meter { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
.hb-qn6-bars { display: grid; flex: 1; grid-template-columns: repeat(4, 1fr); gap: 5px; }
.hb-qn6-seg { position: relative; height: 4px; overflow: hidden; border-radius: 4px; background: #232323; }
.hb-qn6-seg::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--hb-qn6-lc);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.3s ease;
}
.hb-qn6-seg[data-on="true"]::after { transform: scaleX(1); }
.hb-qn6-seg:nth-child(2)::after { transition-delay: 0.04s; }
.hb-qn6-seg:nth-child(3)::after { transition-delay: 0.08s; }
.hb-qn6-seg:nth-child(4)::after { transition-delay: 0.12s; }
.hb-qn6-lvl { min-width: 44px; font-size: 12px; font-weight: 600; text-align: right; color: var(--hb-qn6-lc); transition: color 0.3s ease; }
.hb-qn6-rules { display: grid; grid-template-columns: repeat(auto-fit, minmax(128px, 1fr)); gap: 6px 12px; margin: 10px 0 0; padding: 0; list-style: none; }
.hb-qn6-rule { display: flex; align-items: center; gap: 7px; min-width: 0; font-size: 12.5px; color: #8f8f8f; transition: color 0.25s ease; }
.hb-qn6-rule[data-ok="true"] { color: #ededed; }
.hb-qn6-tick {
  display: grid;
  flex: none;
  place-items: center;
  width: 16px;
  height: 16px;
  border: 1.5px solid #3a3a3a;
  border-radius: 50%;
  transition: border-color 0.25s ease, background 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.7, 0.64, 1);
}
.hb-qn6-rule[data-ok="true"] .hb-qn6-tick { border-color: #34d27b; background: #34d27b; transform: scale(1.05); }
.hb-qn6-tick svg { width: 10px; height: 10px; display: block; overflow: visible; }
.hb-qn6-tick path {
  fill: none;
  stroke: #06130c;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1 1.1;
  stroke-dashoffset: 1.05;
  transition: stroke-dashoffset 0.25s cubic-bezier(0.6, 0, 0.3, 1);
}
.hb-qn6-rule[data-ok="true"] .hb-qn6-tick path { stroke-dashoffset: 0; transition-delay: 0.08s; }
.hb-qn6-sr { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
@media (prefers-reduced-motion: reduce) {
  .hb-qn6-field, .hb-qn6-eye, .hb-qn6-slash, .hb-qn6-seg::after, .hb-qn6-lvl, .hb-qn6-rule, .hb-qn6-tick, .hb-qn6-tick path { transition: none; }
}
`;

export function InputPasswordStrength({
  value,
  defaultValue = "",
  onValueChange,
  label = "Password",
  rules = defaultRules,
  showRules = true,
  accent = "#2f7bff",
  className = "",
  style,
  id,
  autoComplete = "new-password",
  ...rest
}: InputPasswordStrengthProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const rulesId = `${inputId}-rules`;
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue);
  const [visible, setVisible] = React.useState(false);
  const current = controlled ? value : inner;

  const passed = rules.map((rule) => rule.test(current));
  const count = passed.filter(Boolean).length;
  const level = current.length === 0 ? 0 : rules.length === 0 ? 4 : Math.max(1, Math.round((count / rules.length) * 4));

  const vars = {
    "--hb-qn6-a": accent,
    "--hb-qn6-lc": levelColors[level],
    ...style,
  } as React.CSSProperties;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    if (!controlled) setInner(next);
    const nextCount = rules.filter((rule) => rule.test(next)).length;
    const nextLevel = next.length === 0 ? 0 : rules.length === 0 ? 4 : Math.max(1, Math.round((nextCount / rules.length) * 4));
    onValueChange?.(next, nextLevel);
  }

  return (
    <>
      <style href="hb-input-password-strength" precedence="default">{css}</style>
      <div className={`hb-qn6 ${className}`} style={vars}>
        <label className="hb-qn6-lab" htmlFor={inputId}>
          {label}
        </label>
        <div className="hb-qn6-field">
          <input
            id={inputId}
            className="hb-qn6-in"
            type={visible ? "text" : "password"}
            value={current}
            onChange={handleChange}
            autoComplete={autoComplete}
            autoCapitalize="none"
            spellCheck={false}
            aria-describedby={showRules ? rulesId : undefined}
            {...rest}
          />
          <button
            type="button"
            className="hb-qn6-eye"
            aria-pressed={visible}
            aria-label={visible ? "Hide password" : "Show password"}
            onClick={() => setVisible((v) => !v)}
          >
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path d="M2.5 12s3.6-6.5 9.5-6.5S21.5 12 21.5 12s-3.6 6.5-9.5 6.5S2.5 12 2.5 12z" />
              <circle cx="12" cy="12" r="2.8" />
              <path className="hb-qn6-slash" d="M4 4l16 16" pathLength="1" />
            </svg>
          </button>
        </div>
        <div className="hb-qn6-meter">
          <div className="hb-qn6-bars" aria-hidden="true">
            {[1, 2, 3, 4].map((n) => (
              <span key={n} className="hb-qn6-seg" data-on={level >= n} />
            ))}
          </div>
          <span className="hb-qn6-lvl" aria-hidden="true">
            {levelLabels[level]}
          </span>
          <span className="hb-qn6-sr" role="status" aria-live="polite">
            {level > 0 ? `Password strength: ${levelLabels[level]}` : ""}
          </span>
        </div>
        {showRules ? (
          <ul id={rulesId} className="hb-qn6-rules">
            {rules.map((rule, i) => (
              <li key={rule.label} className="hb-qn6-rule" data-ok={passed[i]}>
                <span className="hb-qn6-tick" aria-hidden="true">
                  <svg viewBox="0 0 12 12" focusable="false">
                    <path d="M2.4 6.3l2.4 2.4 4.8-5.4" pathLength="1" />
                  </svg>
                </span>
                <span>
                  {rule.label}
                  <span className="hb-qn6-sr">{passed[i] ? " (met)" : " (not met)"}</span>
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
}
