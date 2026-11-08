"use client";

import * as React from "react";

export interface FormSurveyQuestion {
  id: string;
  type: "nps" | "choice" | "multi" | "text";
  title: string;
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

export type FormSurveyAnswers = Record<string, number | string | string[]>;

export interface FormSurveyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit" | "title"> {
  questions?: FormSurveyQuestion[];
  title?: string;
  accent?: string;
  autoAdvance?: boolean;
  onAnswer?: (id: string, value: number | string | string[]) => void;
  onSubmit?: (answers: FormSurveyAnswers) => void | Promise<void>;
}

const defaultQuestions: FormSurveyQuestion[] = [
  { id: "nps", type: "nps", title: "How likely are you to recommend Fieldnote to a colleague?", required: true },
  { id: "use", type: "choice", title: "What do you use Fieldnote for most?", options: ["Meeting notes", "Research interviews", "Project docs", "Personal journal"], required: true },
  { id: "pay", type: "multi", title: "Which of these would you pay extra for?", options: ["Offline mode", "Team spaces", "Audio transcripts", "Custom domains"] },
  { id: "fix", type: "text", title: "What is the one thing we should fix first?", placeholder: "Search is slow when a notebook has more than 500 pages..." },
];

const css = `
.hb-xh4 {
  --hb-xh4-a: #ff6b4a;
  box-sizing: border-box;
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  font-family: inherit;
  color: #ededed;
}
.hb-xh4 *, .hb-xh4 *::before, .hb-xh4 *::after { box-sizing: border-box; }
.hb-xh4-card {
  position: relative;
  overflow: hidden;
  border: 1px solid #262626;
  border-radius: 20px;
  background: radial-gradient(120% 80% at 100% 0%, color-mix(in srgb, var(--hb-xh4-a) 10%, transparent), transparent 60%), #0e0e0e;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 30px 60px -30px rgba(0,0,0,0.9);
}
.hb-xh4-card:focus { outline: none; }
.hb-xh4-bar { height: 3px; background: #1d1d1d; }
.hb-xh4-bar i { display: block; height: 100%; background: var(--hb-xh4-a); transform-origin: left; transform: scaleX(var(--hb-xh4-p)); transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1); }
.hb-xh4-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px 0; font-size: 12px; color: #7a7a7a; }
.hb-xh4-head b { color: #d4d4d4; font-weight: 500; }
.hb-xh4-nav { display: flex; gap: 4px; }
.hb-xh4-arrow { display: grid; place-items: center; width: 26px; height: 26px; border: 1px solid #262626; border-radius: 8px; background: #141414; color: #a1a1a1; cursor: pointer; transition: background 0.2s ease, color 0.2s ease; }
.hb-xh4-arrow:hover:not(:disabled) { background: #1c1c1c; color: #fff; }
.hb-xh4-arrow:disabled { opacity: 0.35; cursor: default; }
.hb-xh4-arrow:focus-visible { outline: 2px solid var(--hb-xh4-a); outline-offset: 1px; }
.hb-xh4-arrow svg { width: 13px; height: 13px; }
.hb-xh4-q { padding: 18px 20px 20px; min-height: 230px; animation: hb-xh4-up 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh4-q[data-dir="back"] { animation-name: hb-xh4-down; }
.hb-xh4-num { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; color: var(--hb-xh4-a); }
.hb-xh4-num svg { width: 12px; height: 12px; }
.hb-xh4-title { margin: 8px 0 18px; font-family: var(--font-grotesk, inherit); font-size: 20px; font-weight: 500; line-height: 1.25; letter-spacing: -0.02em; color: #f5f5f5; }
.hb-xh4-title span { color: #6b6b6b; font-size: 13px; font-weight: 400; letter-spacing: 0; }
.hb-xh4-nps { display: grid; grid-template-columns: repeat(11, 1fr); gap: 4px; }
.hb-xh4-score { height: 38px; padding: 0; border: 1px solid #272727; border-radius: 9px; background: #141414; color: #cfcfcf; font: inherit; font-size: 13px; font-weight: 500; font-variant-numeric: tabular-nums; cursor: pointer; transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease, border-color 0.2s ease, color 0.2s ease; }
.hb-xh4-score:hover { border-color: var(--hb-xh4-s); color: #fff; transform: translateY(-2px); }
.hb-xh4-score[aria-checked="true"] { background: var(--hb-xh4-s); border-color: var(--hb-xh4-s); color: #0b0b0b; transform: translateY(-3px); box-shadow: 0 8px 16px -8px var(--hb-xh4-s); }
.hb-xh4-score:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xh4-ends { display: flex; justify-content: space-between; margin-top: 8px; font-size: 11.5px; color: #6f6f6f; }
.hb-xh4-opts { display: grid; gap: 7px; }
.hb-xh4-opt { display: flex; align-items: center; gap: 12px; min-height: 42px; padding: 0 12px 0 8px; border: 1px solid #262626; border-radius: 11px; background: #131313; color: #dedede; font: inherit; font-size: 14px; text-align: left; cursor: pointer; transition: border-color 0.2s ease, background 0.2s ease; }
.hb-xh4-opt:hover { border-color: #383838; background: #171717; }
.hb-xh4-opt[aria-checked="true"], .hb-xh4-opt[aria-pressed="true"] { border-color: var(--hb-xh4-a); background: color-mix(in srgb, var(--hb-xh4-a) 10%, #131313); color: #fff; }
.hb-xh4-opt[data-blink="true"] { animation: hb-xh4-blink 0.36s steps(2, jump-none) 2; }
.hb-xh4-opt:focus-visible { outline: 2px solid var(--hb-xh4-a); outline-offset: 2px; }
.hb-xh4-key { display: grid; place-items: center; width: 24px; height: 24px; flex: none; border: 1px solid #333; border-radius: 6px; background: #0c0c0c; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; color: #9a9a9a; transition: all 0.2s ease; }
.hb-xh4-opt[aria-checked="true"] .hb-xh4-key, .hb-xh4-opt[aria-pressed="true"] .hb-xh4-key { background: var(--hb-xh4-a); border-color: var(--hb-xh4-a); color: #160805; }
.hb-xh4-opt-label { flex: 1; min-width: 0; }
.hb-xh4-opt svg { width: 15px; height: 15px; color: var(--hb-xh4-a); }
.hb-xh4-area { width: 100%; min-height: 96px; padding: 12px 14px; border: 0; border-bottom: 2px solid #2b2b2b; border-radius: 0; background: transparent; color: #f2f2f2; font: inherit; font-family: var(--font-grotesk, inherit); font-size: 17px; line-height: 1.45; resize: none; outline: none; transition: border-color 0.25s ease; }
.hb-xh4-area::placeholder { color: #4d4d4d; }
.hb-xh4-area:focus { border-bottom-color: var(--hb-xh4-a); }
.hb-xh4-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 16px; }
.hb-xh4-hint { font-size: 12px; color: #6b6b6b; }
.hb-xh4-hint kbd { display: inline-block; padding: 1px 5px; margin: 0 2px; border: 1px solid #333; border-bottom-width: 2px; border-radius: 5px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; color: #a1a1a1; }
.hb-xh4-ok { display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 16px; border: 0; border-radius: 10px; background: var(--hb-xh4-a); color: #170805; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 20px -10px var(--hb-xh4-a); transition: transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1), filter 0.2s ease; }
.hb-xh4-ok:hover { filter: brightness(1.07); }
.hb-xh4-ok:active { transform: scale(0.97); }
.hb-xh4-ok:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xh4-ok svg { width: 14px; height: 14px; }
.hb-xh4-err { display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 8px; background: rgba(240,82,96,0.1); color: #ff9aa3; font-size: 12px; animation: hb-xh4-shake 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-xh4-done { display: grid; gap: 14px; padding: 26px 22px 24px; min-height: 260px; align-content: center; animation: hb-xh4-up 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh4-badge { display: inline-flex; align-items: center; gap: 10px; justify-self: start; padding: 6px 12px 6px 6px; border-radius: 999px; background: #161616; border: 1px solid #262626; font-size: 12.5px; color: #cfcfcf; }
.hb-xh4-badge b { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; background: var(--hb-xh4-s); color: #0b0b0b; font-size: 13px; font-variant-numeric: tabular-nums; }
.hb-xh4-done h3 { margin: 0; font-family: var(--font-grotesk, inherit); font-size: 24px; font-weight: 500; letter-spacing: -0.03em; line-height: 1.15; }
.hb-xh4-done p { margin: 0; font-size: 13.5px; color: #8f8f8f; line-height: 1.5; }
.hb-xh4-sum { display: grid; gap: 6px; margin: 0; padding: 0; list-style: none; }
.hb-xh4-sum li { display: flex; gap: 10px; font-size: 12.5px; color: #a1a1a1; }
.hb-xh4-sum li span:first-child { flex: none; font-family: var(--font-mono, ui-monospace, monospace); color: var(--hb-xh4-a); }
.hb-xh4-sum li span:last-child { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #d9d9d9; }
@keyframes hb-xh4-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
@keyframes hb-xh4-down { from { opacity: 0; transform: translateY(-24px); } to { opacity: 1; transform: none; } }
@keyframes hb-xh4-blink { 0% { opacity: 1; } 100% { opacity: 0.45; } }
@keyframes hb-xh4-shake { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-4px); } 40%, 60% { transform: translateX(4px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xh4 *, .hb-xh4 *::before, .hb-xh4 *::after { animation: none !important; transition: none !important; }
}
`;

const letters = "ABCDEFGHIJ";

function npsColor(n: number) {
  if (n <= 6) return ["#f0525f", "#f05a5a", "#f26455", "#f36f50", "#f47b4b", "#f58846", "#f59541"][n];
  if (n <= 8) return n === 7 ? "#f5b83d" : "#e8c93a";
  return n === 9 ? "#7ed957" : "#3ddc84";
}

function npsGroup(n: number) {
  return n >= 9 ? "Promoter" : n >= 7 ? "Passive" : "Detractor";
}

export function FormSurvey({
  questions = defaultQuestions,
  title = "Quick survey",
  accent = "#ff6b4a",
  autoAdvance = true,
  onAnswer,
  onSubmit,
  className,
  style,
  ...rest
}: FormSurveyProps) {
  const [index, setIndex] = React.useState(0);
  const [dir, setDir] = React.useState<"next" | "back">("next");
  const [answers, setAnswers] = React.useState<FormSurveyAnswers>({});
  const [error, setError] = React.useState(0);
  const [blink, setBlink] = React.useState("");
  const [done, setDone] = React.useState(false);
  const timer = React.useRef<number | undefined>(undefined);
  const card = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const q = questions[index];
  const total = questions.length;
  const answered = (qq: FormSurveyQuestion) => {
    const a = answers[qq.id];
    if (a === undefined) return false;
    if (Array.isArray(a)) return a.length > 0;
    if (typeof a === "string") return a.trim().length > 0;
    return true;
  };

  const finish = async () => {
    setDone(true);
    await Promise.resolve(onSubmit?.(answers));
  };

  const move = (to: number) => {
    window.clearTimeout(timer.current);
    setBlink("");
    setError(0);
    setDir(to > index ? "next" : "back");
    setIndex(to);
    window.requestAnimationFrame(() => card.current?.focus({ preventScroll: true }));
  };

  const advance = () => {
    if (q.required && !answered(q)) {
      setError((e) => e + 1);
      return;
    }
    if (index === total - 1) finish();
    else move(index + 1);
  };

  const answer = (value: number | string | string[], auto: boolean) => {
    const nextAnswers = { ...answers, [q.id]: value };
    setAnswers(nextAnswers);
    setError(0);
    onAnswer?.(q.id, value);
    if (auto && autoAdvance) {
      setBlink(String(value));
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        setBlink("");
        if (index === total - 1) {
          setDone(true);
          Promise.resolve(onSubmit?.(nextAnswers)).catch(() => undefined);
        } else {
          setDir("next");
          setIndex(index + 1);
        }
      }, 760);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (done || (e.target as HTMLElement).tagName === "TEXTAREA") return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (q.type === "nps" && /^\d$/.test(e.key)) {
      e.preventDefault();
      answer(Number(e.key), true);
      return;
    }
    if ((q.type === "choice" || q.type === "multi") && q.options) {
      const i = letters.indexOf(e.key.toUpperCase());
      if (i >= 0 && i < q.options.length) {
        e.preventDefault();
        const o = q.options[i];
        if (q.type === "choice") answer(o, true);
        else {
          const cur = (answers[q.id] as string[] | undefined) ?? [];
          answer(cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o], false);
        }
        return;
      }
    }
    if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "BUTTON") {
      e.preventDefault();
      advance();
    }
  };

  const score = typeof answers.nps === "number" ? answers.nps : undefined;
  const arrow = (d: string) => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
  );

  return (
    <div className={["hb-xh4", className].filter(Boolean).join(" ")} style={{ ...style, "--hb-xh4-a": accent, "--hb-xh4-p": done ? 1 : index / total } as React.CSSProperties} {...rest}>
      <style href="hb-form-survey" precedence="default">{css}</style>
      <div ref={card} className="hb-xh4-card" tabIndex={-1} onKeyDown={onKey} role="group" aria-label={title}>
        <div className="hb-xh4-bar" aria-hidden="true"><i /></div>
        {done ? (
          <div className="hb-xh4-done" role="status" style={{ "--hb-xh4-s": npsColor(score ?? 10) } as React.CSSProperties}>
            {score !== undefined ? (
              <span className="hb-xh4-badge"><b>{score}</b>{npsGroup(score)}</span>
            ) : null}
            <h3>Thanks, that really helps.</h3>
            <p>Your answers go straight to the product team. We read every one.</p>
            <ul className="hb-xh4-sum">
              {questions.filter((x) => x.type !== "nps" && answered(x)).map((x, i) => {
                const a = answers[x.id];
                return (
                  <li key={x.id}>
                    <span>{String(i + 2).padStart(2, "0")}</span>
                    <span>{Array.isArray(a) ? a.join(", ") : String(a)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <>
            <div className="hb-xh4-head">
              <span><b>{title}</b> · {index + 1} of {total}</span>
              <div className="hb-xh4-nav">
                <button type="button" className="hb-xh4-arrow" aria-label="Previous question" disabled={index === 0} onClick={() => move(index - 1)}>{arrow("M3 9l4-4 4 4")}</button>
                <button type="button" className="hb-xh4-arrow" aria-label="Next question" disabled={index === total - 1 || (q.required && !answered(q))} onClick={() => move(index + 1)}>{arrow("M3 5l4 4 4-4")}</button>
              </div>
            </div>
            <div className="hb-xh4-q" key={q.id} data-dir={dir}>
              <span className="hb-xh4-num">
                {index + 1}
                {arrow("M2 7h9M8 4l3 3-3 3")}
              </span>
              <h3 className="hb-xh4-title" id={`hb-xh4-t-${q.id}`}>
                {q.title} {q.required ? null : <span>Optional</span>}
              </h3>
              {q.type === "nps" ? (
                <>
                  <div className="hb-xh4-nps" role="radiogroup" aria-labelledby={`hb-xh4-t-${q.id}`}>
                    {Array.from({ length: 11 }, (_, n) => (
                      <button
                        key={n}
                        type="button"
                        role="radio"
                        aria-checked={answers[q.id] === n}
                        className="hb-xh4-score"
                        style={{ "--hb-xh4-s": npsColor(n) } as React.CSSProperties}
                        onClick={() => answer(n, true)}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <div className="hb-xh4-ends"><span>Not likely</span><span>Extremely likely</span></div>
                </>
              ) : null}
              {(q.type === "choice" || q.type === "multi") && q.options ? (
                <div className="hb-xh4-opts" role={q.type === "choice" ? "radiogroup" : "group"} aria-labelledby={`hb-xh4-t-${q.id}`}>
                  {q.options.map((o, i) => {
                    const cur = answers[q.id];
                    const on = q.type === "choice" ? cur === o : Array.isArray(cur) && cur.includes(o);
                    return (
                      <button
                        key={o}
                        type="button"
                        role={q.type === "choice" ? "radio" : undefined}
                        aria-checked={q.type === "choice" ? on : undefined}
                        aria-pressed={q.type === "multi" ? on : undefined}
                        data-blink={blink === o}
                        className="hb-xh4-opt"
                        onClick={() => {
                          if (q.type === "choice") answer(o, true);
                          else {
                            const list = Array.isArray(cur) ? cur : [];
                            answer(on ? list.filter((x) => x !== o) : [...list, o], false);
                          }
                        }}
                      >
                        <span className="hb-xh4-key" aria-hidden="true">{letters[i]}</span>
                        <span className="hb-xh4-opt-label">{o}</span>
                        {on ? (
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" /></svg>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              ) : null}
              {q.type === "text" ? (
                <textarea
                  className="hb-xh4-area"
                  aria-labelledby={`hb-xh4-t-${q.id}`}
                  placeholder={q.placeholder ?? "Type your answer here..."}
                  value={(answers[q.id] as string | undefined) ?? ""}
                  onChange={(e) => answer(e.target.value.slice(0, 500), false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      advance();
                    }
                  }}
                />
              ) : null}
              <div className="hb-xh4-row">
                {error ? (
                  <span className="hb-xh4-err" key={error} role="alert">Please pick an answer to continue</span>
                ) : (
                  <span className="hb-xh4-hint">
                    {q.type === "text" ? <>press <kbd>Shift</kbd>+<kbd>Enter</kbd> for a new line</> : q.type === "nps" ? <>press <kbd>0</kbd> to <kbd>9</kbd></> : <>press <kbd>A</kbd> to <kbd>{letters[(q.options?.length ?? 1) - 1]}</kbd></>}
                  </span>
                )}
                {q.type === "multi" || q.type === "text" || !autoAdvance ? (
                  <button type="button" className="hb-xh4-ok" onClick={advance}>
                    {index === total - 1 ? "Submit" : "OK"}
                    {arrow("M3 7.5 6 10.5 11.5 4")}
                  </button>
                ) : null}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
