"use client";

import * as React from "react";

export interface PayCouponResult {
  valid: boolean;
  label?: string;
  message?: string;
}

export type PayCouponValidate = (
  code: string,
) => boolean | PayCouponResult | Promise<boolean | PayCouponResult>;

export interface PayCouponFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  validate?: PayCouponValidate;
  value?: string;
  defaultValue?: string;
  onChange?: (code: string) => void;
  onApply?: (code: string, result: PayCouponResult) => void;
  onRemove?: () => void;
  placeholder?: string;
  applyLabel?: string;
  invalidMessage?: string;
  minLoadingMs?: number;
  accent?: string;
}

const css = `
.hb-qf9 {
  box-sizing: border-box;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.4;
}
.hb-qf9 *, .hb-qf9 *::before, .hb-qf9 *::after { box-sizing: border-box; }
.hb-qf9-form { display: flex; gap: 8px; margin: 0; }
.hb-qf9-ctl { position: relative; display: flex; min-width: 0; flex: 1; align-items: center; }
.hb-qf9-ic { position: absolute; left: 12px; width: 16px; height: 16px; fill: none; stroke: #6f6f6f; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; pointer-events: none; transition: stroke 0.25s ease; }
.hb-qf9-in {
  width: 100%;
  height: 42px;
  margin: 0;
  padding: 0 12px 0 36px;
  color: #ededed;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: #111111;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-qf9-in::placeholder { color: #5f5f5f; font-weight: 400; letter-spacing: 0.02em; text-transform: none; }
.hb-qf9-in:hover { border-color: #3a3a3a; }
.hb-qf9-in:focus-visible { border-color: var(--hb-qf9-x); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qf9-x) 26%, transparent); }
.hb-qf9-in:focus-visible ~ .hb-qf9-ic { stroke: var(--hb-qf9-x); }
.hb-qf9[data-state="invalid"] .hb-qf9-in { border-color: #ff5d6c; box-shadow: 0 0 0 3px rgba(255, 93, 108, 0.16); }
.hb-qf9[data-state="invalid"] .hb-qf9-ctl { animation: hb-qf9-shake 0.4s ease; }
.hb-qf9-btn {
  position: relative;
  display: grid;
  place-items: center;
  min-width: 78px;
  height: 42px;
  margin: 0;
  padding: 0 16px;
  color: #0a0a0a;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  background: #ededed;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease, opacity 0.2s ease;
}
.hb-qf9-btn:hover:not(:disabled) { background: #fff; }
.hb-qf9-btn:active:not(:disabled) { transform: scale(0.96); }
.hb-qf9-btn:focus-visible { outline: 2px solid var(--hb-qf9-x); outline-offset: 2px; }
.hb-qf9-btn:disabled { cursor: default; opacity: 0.55; }
.hb-qf9-btn > span { grid-area: 1 / 1; transition: opacity 0.2s ease, transform 0.25s ease; }
.hb-qf9-btn > svg { grid-area: 1 / 1; width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; opacity: 0; animation: hb-qf9-rot 0.8s linear infinite; transition: opacity 0.2s ease; }
.hb-qf9[data-state="loading"] .hb-qf9-btn > span { opacity: 0; transform: scale(0.8); }
.hb-qf9[data-state="loading"] .hb-qf9-btn > svg { opacity: 1; }
.hb-qf9-msg {
  display: grid;
  grid-template-rows: 0fr;
  margin: 0;
  color: #ff7a86;
  font-size: 12.5px;
  opacity: 0;
  transition: grid-template-rows 0.25s ease, opacity 0.25s ease, margin 0.25s ease;
}
.hb-qf9-msg > span { min-height: 0; overflow: hidden; }
.hb-qf9[data-state="invalid"] .hb-qf9-msg { grid-template-rows: 1fr; margin-top: 6px; opacity: 1; }
.hb-qf9-ok {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 0 8px 0 12px;
  background: color-mix(in srgb, #3ddc97 9%, #111111);
  border: 1px dashed color-mix(in srgb, #3ddc97 55%, transparent);
  border-radius: 10px;
  animation: hb-qf9-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.hb-qf9-tk { flex: none; width: 18px; height: 18px; fill: none; stroke: #3ddc97; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
.hb-qf9-tk path { stroke-dasharray: 1 1.2; stroke-dashoffset: 0; animation: hb-qf9-draw 0.4s ease 0.15s both; }
.hb-qf9-code { overflow: hidden; font-weight: 600; letter-spacing: 0.06em; text-overflow: ellipsis; text-transform: uppercase; white-space: nowrap; }
.hb-qf9-save { flex: none; padding: 2px 9px; color: #7ff0bd; font-size: 12px; font-weight: 600; background: rgba(61, 220, 151, 0.14); border-radius: 999px; }
.hb-qf9-rm {
  display: grid;
  flex: none;
  place-items: center;
  width: 26px;
  height: 26px;
  margin: 0 0 0 auto;
  padding: 0;
  color: #8f8f8f;
  background: none;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: color 0.2s ease, background-color 0.2s ease;
}
.hb-qf9-rm:hover { color: #fff; background: rgba(255, 255, 255, 0.08); }
.hb-qf9-rm:focus-visible { outline: 2px solid var(--hb-qf9-x); outline-offset: 1px; }
.hb-qf9-rm svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; }
.hb-qf9-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-qf9-shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(2px); }
}
@keyframes hb-qf9-rot { to { transform: rotate(360deg); } }
@keyframes hb-qf9-pop { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: none; } }
@keyframes hb-qf9-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-qf9-in, .hb-qf9-btn, .hb-qf9-btn > span, .hb-qf9-msg, .hb-qf9-rm { transition: none; }
  .hb-qf9[data-state="invalid"] .hb-qf9-ctl, .hb-qf9-ok, .hb-qf9-tk path, .hb-qf9-btn > svg { animation: none; }
}
`;

const defaultValidate: PayCouponValidate = (code) =>
  code.trim().toUpperCase() === "SAVE10" ? { valid: true, label: "10% off" } : false;

function normalize(result: boolean | PayCouponResult): PayCouponResult {
  return typeof result === "boolean" ? { valid: result } : result;
}

export function PayCouponField({
  validate = defaultValidate,
  value,
  defaultValue = "",
  onChange,
  onApply,
  onRemove,
  placeholder = "Discount code",
  applyLabel = "Apply",
  invalidMessage = "That code is not valid or has expired.",
  minLoadingMs = 700,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PayCouponFieldProps) {
  const uid = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const token = React.useRef(0);
  const alive = React.useRef(true);
  const [inner, setInner] = React.useState(defaultValue.toUpperCase());
  const [state, setState] = React.useState<"idle" | "loading" | "valid" | "invalid">("idle");
  const [result, setResult] = React.useState<PayCouponResult>({ valid: false });
  const code = value ?? inner;
  const [seen, setSeen] = React.useState(code);
  if (seen !== code) {
    setSeen(code);
    if (state === "invalid") setState("idle");
  }

  React.useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  function change(next: string) {
    const upper = next.toUpperCase().slice(0, 24);
    if (value === undefined) setInner(upper);
    if (state === "invalid") setState("idle");
    onChange?.(upper);
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (state === "loading") return;
    const entered = code.trim();
    if (!entered) {
      setResult({ valid: false, message: "Enter a code first." });
      setState("invalid");
      inputRef.current?.focus();
      return;
    }
    const mine = ++token.current;
    setState("loading");
    const [raw] = await Promise.all([
      Promise.resolve(validate(entered)).catch(() => false as boolean),
      new Promise((resolve) => window.setTimeout(resolve, Math.max(0, minLoadingMs))),
    ]);
    if (!alive.current || mine !== token.current) return;
    const res = normalize(raw);
    setResult(res);
    setState(res.valid ? "valid" : "invalid");
    if (res.valid) onApply?.(entered, res);
    else inputRef.current?.focus();
  }

  function remove() {
    token.current += 1;
    setState("idle");
    setResult({ valid: false });
    if (value === undefined) setInner("");
    onChange?.("");
    onRemove?.();
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  const vars = { "--hb-qf9-x": accent, ...style } as React.CSSProperties;
  const message = result.message ?? invalidMessage;

  return (
    <div className={`hb-qf9 ${className}`} style={vars} data-state={state} {...rest}>
      <style href="hb-pay-coupon-field" precedence="default">{css}</style>
      {state === "valid" ? (
        <div className="hb-qf9-ok">
          <svg className="hb-qf9-tk" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M3.5 9.5l3.6 3.6 7.4-7.6" pathLength="1" />
          </svg>
          <span className="hb-qf9-code">{code}</span>
          {result.label && <span className="hb-qf9-save">{result.label}</span>}
          <button type="button" className="hb-qf9-rm" aria-label={`Remove code ${code}`} onClick={remove}>
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
            </svg>
          </button>
          <span className="hb-qf9-sr" role="status">
            {`Code ${code} applied${result.label ? `, ${result.label}` : ""}`}
          </span>
        </div>
      ) : (
        <form className="hb-qf9-form" onSubmit={submit} noValidate>
          <div className="hb-qf9-ctl">
            <input
              ref={inputRef}
              className="hb-qf9-in"
              type="text"
              value={code}
              placeholder={placeholder}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              aria-label={placeholder}
              aria-invalid={state === "invalid"}
              aria-describedby={`${uid}-msg`}
              readOnly={state === "loading"}
              onChange={(e) => change(e.target.value)}
            />
            <svg className="hb-qf9-ic" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 8a2 2 0 0 0 0 4v0a2 2 0 0 0 0 4v1.5h16V16a2 2 0 0 1 0-4v0a2 2 0 0 1 0-4V6.5H4z" />
              <path d="M14 7v10" strokeDasharray="1.6 2.2" />
            </svg>
          </div>
          <button type="submit" className="hb-qf9-btn" disabled={state === "loading"} aria-busy={state === "loading"}>
            <span>{applyLabel}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" opacity="0.25" />
              <path d="M21 12a9 9 0 0 0-9-9" />
            </svg>
          </button>
        </form>
      )}
      <p id={`${uid}-msg`} className="hb-qf9-msg" aria-live="polite">
        <span>{state === "invalid" ? message : ""}</span>
      </p>
    </div>
  );
}
