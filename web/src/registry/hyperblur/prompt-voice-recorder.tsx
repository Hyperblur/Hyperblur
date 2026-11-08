"use client";

import * as React from "react";

export interface PromptVoiceRecorderProps extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  transcript?: string;
  placeholder?: string;
  microphone?: boolean;
  maxDuration?: number;
  accent?: string;
  autoPlay?: boolean;
  onRecordingChange?: (recording: boolean) => void;
  onTranscript?: (text: string) => void;
  onSubmit?: (text: string) => void;
}

type Phase = "idle" | "recording" | "processing";

const BARS = 44;

function noise(n: number) {
  let x = Math.imul((n | 0) ^ 0x27d4eb2d, 0x165667b1) >>> 0;
  x = Math.imul(x ^ (x >>> 15), 0x85ebca77) >>> 0;
  return ((x ^ (x >>> 13)) >>> 0) / 4294967295;
}

function clock(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

const css = `
.hb-vl8 {
  --hb-vl8-a: #ff4d5e;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  background: linear-gradient(180deg, #19191c, #121214);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 24px 48px -28px rgba(0, 0, 0, 0.9);
  color: #ededed;
  font-family: inherit;
  box-sizing: border-box;
  transition: box-shadow 0.4s ease;
}
.hb-vl8 *, .hb-vl8 *::before, .hb-vl8 *::after { box-sizing: border-box; }
.hb-vl8[data-phase="recording"] {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 0 0 1px color-mix(in srgb, var(--hb-vl8-a) 50%, transparent), 0 0 0 5px color-mix(in srgb, var(--hb-vl8-a) 10%, transparent), 0 24px 48px -28px rgba(0, 0, 0, 0.9);
}
.hb-vl8-body { position: relative; min-height: 52px; }
.hb-vl8-ta {
  display: block;
  width: 100%;
  min-height: 52px;
  max-height: 128px;
  margin: 0;
  padding: 8px 6px;
  border: 0;
  outline: none;
  resize: none;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 14px;
  line-height: 1.5;
  transition: opacity 0.3s ease, filter 0.3s ease;
}
.hb-vl8-ta::placeholder { color: #6f6f75; }
.hb-vl8[data-phase="recording"] .hb-vl8-ta, .hb-vl8[data-phase="processing"] .hb-vl8-ta { opacity: 0; filter: blur(4px); pointer-events: none; }
.hb-vl8-wave {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 4px;
  opacity: 0;
  transform: scale(0.98);
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-vl8[data-phase="recording"] .hb-vl8-wave, .hb-vl8[data-phase="processing"] .hb-vl8-wave { opacity: 1; transform: none; pointer-events: auto; }
.hb-vl8-rec {
  display: flex;
  flex: none;
  align-items: center;
  gap: 7px;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: #ededed;
}
.hb-vl8-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--hb-vl8-a); box-shadow: 0 0 10px var(--hb-vl8-a); animation: hb-vl8-blink 1.2s ease-in-out infinite; }
@keyframes hb-vl8-blink { 50% { opacity: 0.35; } }
.hb-vl8-bars {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: flex-end;
  gap: 2px;
  min-width: 0;
  height: 40px;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000000 30%);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000000 30%);
}
.hb-vl8-bar {
  flex: none;
  width: 3px;
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-vl8-a) 60%, #ffffff), var(--hb-vl8-a) 50%, color-mix(in srgb, var(--hb-vl8-a) 60%, #ffffff));
  transform: scaleY(0.08);
  transition: transform 0.09s ease-out;
}
.hb-vl8[data-phase="processing"] .hb-vl8-bar { transform: scaleY(0.06) !important; transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1); background: #8f8f8f; }
.hb-vl8-proc {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 12px;
  transform: translate(-50%, -50%);
  background: linear-gradient(90deg, #8f8f8f 0%, #ededed 45%, #8f8f8f 70%) 0 0 / 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0;
  transition: opacity 0.3s ease;
  animation: hb-vl8-sweep 1.4s linear infinite;
  pointer-events: none;
}
@keyframes hb-vl8-sweep { to { background-position: -200% 0; } }
.hb-vl8[data-phase="processing"] .hb-vl8-proc { opacity: 1; }
.hb-vl8[data-phase="processing"] .hb-vl8-rec { opacity: 0.4; }
.hb-vl8-row { display: flex; align-items: center; gap: 6px; }
.hb-vl8-hint { flex: 1 1 auto; min-width: 0; overflow: hidden; padding-left: 4px; font-size: 11.5px; color: #77777d; white-space: nowrap; text-overflow: ellipsis; }
.hb-vl8-kbd {
  padding: 1px 5px;
  border-radius: 5px;
  background: #222226;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.07);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10px;
  color: #a1a1a1;
}
.hb-vl8-btn {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  width: 34px;
  height: 34px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #232327;
  color: #ededed;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  transition: background 0.25s ease, transform 0.2s ease, color 0.25s ease, opacity 0.2s ease;
}
.hb-vl8-btn:hover { background: #2c2c31; }
.hb-vl8-btn:active { transform: scale(0.92); }
.hb-vl8-btn:focus-visible { outline: 2px solid var(--hb-vl8-a); outline-offset: 2px; }
.hb-vl8-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.hb-vl8-mic::before {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--hb-vl8-a) 55%, transparent);
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-vl8-mic:hover::before { opacity: 1; transform: none; }
.hb-vl8-mic:hover { color: var(--hb-vl8-a); }
.hb-vl8-stop { background: var(--hb-vl8-a); color: #ffffff; box-shadow: 0 6px 18px -6px var(--hb-vl8-a); }
.hb-vl8-stop:hover { background: color-mix(in srgb, var(--hb-vl8-a) 85%, #ffffff); }
.hb-vl8-send { background: #ededed; color: #0a0a0a; }
.hb-vl8-send:hover { background: #ffffff; }
.hb-vl8-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-vl8 *, .hb-vl8 *::before, .hb-vl8 *::after { transition: none !important; animation: none !important; }
}
`;

export function PromptVoiceRecorder({
  transcript = "Draft a short note to the design team: the Thursday review moves to 3 pm, and everyone should bring two options for the onboarding screen.",
  placeholder = "Type a message or hold a thought...",
  microphone = false,
  maxDuration = 60,
  accent = "#ff4d5e",
  autoPlay = false,
  onRecordingChange,
  onTranscript,
  onSubmit,
  className,
  style,
  ...rest
}: PromptVoiceRecorderProps) {
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [text, setText] = React.useState("");
  const [elapsed, setElapsed] = React.useState(0);
  const barRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const levels = React.useRef<number[]>(Array.from({ length: BARS }, () => 0.08));
  const raf = React.useRef(0);
  const timers = React.useRef<number[]>([]);
  const stream = React.useRef<MediaStream | null>(null);
  const audio = React.useRef<AudioContext | null>(null);
  const micBtn = React.useRef<HTMLButtonElement>(null);
  const taRef = React.useRef<HTMLTextAreaElement>(null);
  const uid = React.useId();
  const auto = React.useRef(autoPlay);
  const api = React.useRef<{ start: () => Promise<void>; finish: (keep: boolean) => void } | null>(null);

  const release = React.useCallback(() => {
    cancelAnimationFrame(raf.current);
    stream.current?.getTracks().forEach((track) => track.stop());
    stream.current = null;
    audio.current?.close().catch(() => undefined);
    audio.current = null;
  }, []);

  React.useEffect(
    () => () => {
      release();
      timers.current.forEach((t) => window.clearTimeout(t));
    },
    [release],
  );

  const paint = () => {
    levels.current.forEach((v, i) => {
      const el = barRefs.current[i];
      if (el) el.style.transform = `scaleY(${v.toFixed(3)})`;
    });
  };

  const finish = (keep: boolean) => {
    release();
    onRecordingChange?.(false);
    if (!keep) {
      setPhase("idle");
      levels.current = levels.current.map(() => 0.08);
      paint();
      micBtn.current?.focus();
      return;
    }
    setPhase("processing");
    const words = transcript.split(" ");
    const typing = window.setTimeout(() => {
      setPhase("idle");
      let i = 0;
      const step = () => {
        i += 1;
        setText(words.slice(0, i).join(" "));
        if (i < words.length) timers.current.push(window.setTimeout(step, 38 + (i % 3) * 14));
        else {
          onTranscript?.(transcript);
          if (auto.current) {
            timers.current.push(
              window.setTimeout(() => {
                if (!auto.current) return;
                setText("");
                void api.current?.start();
              }, 2600),
            );
          } else taRef.current?.focus();
        }
      };
      step();
    }, 1100);
    timers.current.push(typing);
  };

  const start = async () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setText("");
    setElapsed(0);
    setPhase("recording");
    onRecordingChange?.(true);
    let analyser: AnalyserNode | null = null;
    if (microphone && navigator.mediaDevices?.getUserMedia) {
      try {
        const media = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.current = media;
        const ctx = new AudioContext();
        audio.current = ctx;
        analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        ctx.createMediaStreamSource(media).connect(analyser);
      } catch {
        analyser = null;
      }
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const buffer = analyser ? new Uint8Array(analyser.fftSize) : null;
    const begin = performance.now();
    let lastPush = 0;
    let lastClock = 0;
    let tick = 0;
    const loop = (now: number) => {
      raf.current = requestAnimationFrame(loop);
      const t = now - begin;
      if (t - lastClock > 200) {
        lastClock = t;
        setElapsed(t);
        if (t >= maxDuration * 1000) {
          finish(true);
          return;
        }
      }
      if (t - lastPush < 70) return;
      lastPush = t;
      tick += 1;
      let level: number;
      if (analyser && buffer) {
        analyser.getByteTimeDomainData(buffer);
        let sum = 0;
        for (let i = 0; i < buffer.length; i++) {
          const v = (buffer[i] - 128) / 128;
          sum += v * v;
        }
        level = Math.min(1, Math.sqrt(sum / buffer.length) * 4.5);
      } else {
        const syllable = Math.abs(Math.sin(tick * 0.55)) * Math.abs(Math.sin(tick * 0.13 + 1));
        const pause = Math.floor(tick / 18) % 4 === 3 ? 0.15 : 1;
        level = (0.15 + syllable * 0.75 + noise(tick) * 0.25) * pause;
      }
      const next = Math.max(0.08, Math.min(1, reduce ? 0.4 : level));
      levels.current = [...levels.current.slice(1), next];
      paint();
    };
    raf.current = requestAnimationFrame(loop);
    if (auto.current) {
      timers.current.push(
        window.setTimeout(() => {
          if (auto.current) api.current?.finish(true);
        }, 4200),
      );
    }
  };

  React.useEffect(() => {
    api.current = { start, finish };
  });

  React.useEffect(() => {
    if (!autoPlay) return;
    auto.current = true;
    const t = window.setTimeout(() => {
      void api.current?.start();
    }, 700);
    return () => {
      window.clearTimeout(t);
      auto.current = false;
    };
  }, [autoPlay]);

  const send = () => {
    const value = text.trim();
    if (!value) return;
    onSubmit?.(value);
    setText("");
  };

  return (
    <form
      className={["hb-vl8", className].filter(Boolean).join(" ")}
      style={{ "--hb-vl8-a": accent, ...style } as React.CSSProperties}
      data-phase={phase}
      onSubmit={(event) => {
        event.preventDefault();
        send();
      }}
      onPointerDown={() => {
        auto.current = false;
      }}
      onKeyDown={(event) => {
        auto.current = false;
        if (event.key === "Escape" && phase === "recording") {
          event.preventDefault();
          finish(false);
        }
      }}
      {...rest}
    >
      <style href="hb-prompt-voice-recorder" precedence="default">{css}</style>
      <div className="hb-vl8-body">
        <label htmlFor={`${uid}-ta`} className="hb-vl8-hidden">
          Message
        </label>
        <textarea
          id={`${uid}-ta`}
          ref={taRef}
          className="hb-vl8-ta"
          rows={2}
          value={text}
          placeholder={placeholder}
          readOnly={phase !== "idle"}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault();
              send();
            }
          }}
        />
        <div className="hb-vl8-wave" aria-hidden={phase === "idle"}>
          <span className="hb-vl8-rec">
            <span className="hb-vl8-dot" />
            {clock(elapsed)}
          </span>
          <span className="hb-vl8-bars">
            {Array.from({ length: BARS }, (_, i) => (
              <span
                key={i}
                className="hb-vl8-bar"
                ref={(node) => {
                  barRefs.current[i] = node;
                }}
              />
            ))}
          </span>
          <span className="hb-vl8-proc">Transcribing</span>
        </div>
      </div>
      <div className="hb-vl8-row">
        <span className="hb-vl8-hint" role="status" aria-live="polite">
          {phase === "recording" ? (
            <>
              Listening, <span className="hb-vl8-kbd">Esc</span> to discard
            </>
          ) : phase === "processing" ? (
            "Turning speech into text"
          ) : (
            <>
              <span className="hb-vl8-kbd">Enter</span> to send, mic to dictate
            </>
          )}
        </span>
        {phase === "recording" ? (
          <>
            <button type="button" className="hb-vl8-btn" aria-label="Discard recording" onClick={() => finish(false)}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <button type="button" className="hb-vl8-btn hb-vl8-stop" aria-label="Stop and transcribe" onClick={() => finish(true)}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7.3l2.6 2.6L11 4.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        ) : (
          <>
            <button
              ref={micBtn}
              type="button"
              className="hb-vl8-btn hb-vl8-mic"
              aria-label="Start dictation"
              disabled={phase === "processing"}
              onClick={() => {
                void start();
              }}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="5.5" y="1.8" width="5" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M3 7.8a5 5 0 0010 0M8 12.8v1.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
            <button type="submit" className="hb-vl8-btn hb-vl8-send" aria-label="Send" disabled={phase !== "idle" || text.trim().length === 0}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 11.5V2.8M3.2 6.4L7 2.6l3.8 3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>
    </form>
  );
}
