import type { ReactNode } from "react";
import { TransitionIrisWipe } from "@/registry/hyperblur/transition-iris-wipe";
import { TransitionDiagonalSlice } from "@/registry/hyperblur/transition-diagonal-slice";
import { TransitionPixelDissolve } from "@/registry/hyperblur/transition-pixel-dissolve";
import { TransitionSharedMorph } from "@/registry/hyperblur/transition-shared-morph";
import { TransitionCurtainCall } from "@/registry/hyperblur/transition-curtain-call";
import { TransitionRippleReveal } from "@/registry/hyperblur/transition-ripple-reveal";
import { TransitionPageTurn } from "@/registry/hyperblur/transition-page-turn";
import { TransitionZoomThrough } from "@/registry/hyperblur/transition-zoom-through";
import { TransitionSplitFlap } from "@/registry/hyperblur/transition-split-flap";
import { TransitionLiquidWipe } from "@/registry/hyperblur/transition-liquid-wipe";
import { TransitionGlitchCut } from "@/registry/hyperblur/transition-glitch-cut";
import { TransitionParallaxSlide } from "@/registry/hyperblur/transition-parallax-slide";

const frame = "h-[180px] w-full max-w-[340px] rounded-2xl border border-[#262626] text-left text-[#ededed]";
const wrap = "flex h-full w-full items-center justify-center px-4";

function Chapter({ n, title, meta, sky, sun }: { n: string; title: string; meta: string; sky: string; sun: string }) {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden p-4 font-sans" style={{ background: sky }}>
      <div className="absolute right-[18%] top-[22%] h-16 w-16 rounded-full" style={{ background: sun, boxShadow: `0 0 60px ${sun}` }} />
      <div className="absolute inset-x-0 bottom-0 h-[38%]" style={{ background: "linear-gradient(180deg, rgba(5,6,10,0), rgba(5,6,10,0.92))" }} />
      <div className="relative flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/60">
        <span>Chapter {n}</span>
        <span>{meta}</span>
      </div>
      <div className="relative">
        <p className="m-0 text-[26px] font-semibold leading-none tracking-tight">{title}</p>
        <p className="m-0 mt-1.5 text-[11px] text-white/60">Directed by Mara Lindqvist</p>
      </div>
    </div>
  );
}

function Drop({ n, name, price, tone, ink }: { n: string; name: string; price: string; tone: string; ink: string }) {
  return (
    <div className="relative flex h-full items-end justify-between overflow-hidden p-4 font-grotesk" style={{ background: tone }}>
      <span className="absolute -right-2 -top-6 text-[120px] font-bold leading-none tracking-tighter" style={{ color: ink, opacity: 0.18 }}>{n}</span>
      <div>
        <p className="m-0 text-[10px] uppercase tracking-[0.18em] text-white/60">Spring drop {n}</p>
        <p className="m-0 mt-1 text-xl font-semibold leading-tight">{name}</p>
        <p className="m-0 mt-0.5 text-xs text-white/60">Recycled ripstop, 3 colors</p>
      </div>
      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#0a0a0a]">{price}</span>
    </div>
  );
}

function Weather({ city, temp, sky, cond, hi, tone }: { city: string; temp: string; sky: string; cond: string; hi: string; tone: string }) {
  return (
    <div className="flex h-full flex-col justify-between p-4 font-sans" style={{ background: tone }}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">{city}</span>
        <span className="font-mono text-[10px] text-white/50">{sky}</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="m-0 text-[52px] font-light leading-none tracking-tighter">{temp}</p>
          <p className="m-0 mt-1 text-xs text-white/70">{cond}</p>
        </div>
        <p className="m-0 font-mono text-[11px] text-white/60">{hi}</p>
      </div>
    </div>
  );
}

function Act({ act, title, note, glow }: { act: string; title: string; note: string; glow: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 p-4 text-center font-grotesk" style={{ background: `radial-gradient(circle at 50% 40%, ${glow}, #070606 72%)` }}>
      <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a45c]">{act}</span>
      <p className="m-0 text-[24px] font-semibold leading-tight tracking-tight">{title}</p>
      <span className="text-[11px] text-white/55">{note}</span>
    </div>
  );
}

function Theme({ dark }: { dark: boolean }) {
  const bg = dark ? "#0d0e11" : "#f5f3ee";
  const card = dark ? "#16181d" : "#ffffff";
  const ink = dark ? "#ededed" : "#141414";
  const mute = dark ? "#8f8f8f" : "#6b6b6b";
  const line = dark ? "#262a31" : "#e4e0d6";
  return (
    <div className="flex h-full flex-col gap-2.5 p-4 font-sans" style={{ background: bg, color: ink }}>
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold">Appearance</span>
        <span className="text-[10px]" style={{ color: mute }}>Tap anywhere</span>
      </div>
      <div className="flex gap-2">
        {["Light", "Dark"].map((t) => {
          const on = (t === "Dark") === dark;
          return (
            <div key={t} className="flex-1 rounded-xl p-2" style={{ background: card, border: `1px solid ${on ? "#2f7bff" : line}` }}>
              <div className="h-9 rounded-md" style={{ background: t === "Dark" ? "linear-gradient(135deg, #1d2129, #0b0c0f)" : "linear-gradient(135deg, #ffffff, #ebe7dc)", border: `1px solid ${line}` }} />
              <div className="mt-1.5 flex items-center justify-between text-[11px]">
                <span className="font-medium">{t}</span>
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: on ? "#2f7bff" : "transparent", border: `1px solid ${on ? "#2f7bff" : line}` }} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[11px]" style={{ background: card, border: `1px solid ${line}` }}>
        <span>Match system</span>
        <span style={{ color: mute }}>Off</span>
      </div>
    </div>
  );
}

function Spread({ page, kicker, title, body, art }: { page: string; kicker: string; title: string; body: string; art: string }) {
  return (
    <div className="grid h-full grid-cols-2 bg-[#121110] font-sans">
      <div className="flex flex-col justify-between p-3.5">
        <span className="text-[9px] uppercase tracking-[0.2em] text-[#c9a45c]">{kicker}</span>
        <div>
          <p className="m-0 text-[17px] font-semibold leading-[1.1] tracking-tight">{title}</p>
          <p className="m-0 mt-1.5 text-[10px] leading-snug text-white/55">{body}</p>
        </div>
        <span className="font-mono text-[9px] text-white/40">{page}</span>
      </div>
      <div className="m-2 rounded-lg" style={{ background: art }} />
    </div>
  );
}

function MapView({ zoomed }: { zoomed: boolean }) {
  if (!zoomed) {
    return (
      <div className="relative h-full overflow-hidden font-sans" style={{ background: "radial-gradient(circle at 30% 60%, #13233d, #070b12 75%)" }}>
        <svg viewBox="0 0 340 180" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M40 150 C60 110 50 80 90 70 C120 62 130 40 170 38 C210 36 240 60 280 52 C300 48 320 70 330 90 L330 180 L40 180 Z" fill="#1a2b45" stroke="#2c4a75" strokeWidth="1" />
          <path d="M60 120 C70 100 85 95 96 102 C100 120 84 140 70 150 Z" fill="#20375a" />
        </svg>
        <span className="absolute left-[19%] top-[58%] h-2.5 w-2.5 rounded-full bg-[#7fb3ff] shadow-[0_0_0_6px_rgba(127,179,255,0.2)]" />
        <div className="absolute left-4 top-4">
          <p className="m-0 text-[10px] uppercase tracking-[0.18em] text-white/55">Europe</p>
          <p className="m-0 mt-0.5 text-[15px] font-semibold">12 offices</p>
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-full overflow-hidden font-sans" style={{ background: "#0d1118" }}>
      <svg viewBox="0 0 340 180" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g stroke="#1f2a3a" strokeWidth="6" fill="none" strokeLinecap="round">
          <path d="M-10 60 L120 80 L350 40" />
          <path d="M60 -10 L90 200" />
          <path d="M200 -10 L170 200" />
        </g>
        <g stroke="#172030" strokeWidth="2.5" fill="none">
          <path d="M-10 130 L350 110" />
          <path d="M260 -10 L280 200" />
          <path d="M120 80 L140 200" />
        </g>
        <path d="M0 165 C80 150 200 175 340 150 L340 180 L0 180 Z" fill="#12233b" />
      </svg>
      <span className="absolute left-[46%] top-[42%] h-3 w-3 rounded-full bg-[#7fb3ff] shadow-[0_0_0_8px_rgba(127,179,255,0.18)]" />
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/10 bg-black/60 px-3 py-2 backdrop-blur">
        <div>
          <p className="m-0 text-[13px] font-semibold">Lisbon, Alfama</p>
          <p className="m-0 text-[10px] text-white/55">Rua dos Remedios 41, 3rd floor</p>
        </div>
        <span className="rounded-full bg-[#ededed] px-2.5 py-1 text-[10px] font-semibold text-[#0a0a0a]">Directions</span>
      </div>
    </div>
  );
}

function Board({ rows }: { rows: [string, string, string, string][] }) {
  return (
    <div className="flex h-full flex-col bg-[#121214] px-3.5 py-3 font-mono">
      <div className="mb-1.5 grid grid-cols-[42px_1fr_44px_54px] text-[9px] uppercase tracking-[0.14em] text-[#8f8f8f]">
        <span>Time</span>
        <span>Destination</span>
        <span>Gate</span>
        <span className="text-right">Status</span>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        {rows.map(([t, d, g, s]) => (
          <div key={t + d} className="grid grid-cols-[42px_1fr_44px_54px] items-center text-[13px] font-semibold tracking-[0.06em]">
            <span className="text-[#ffd166]">{t}</span>
            <span>{d}</span>
            <span>{g}</span>
            <span className={`text-right text-[10px] ${s === "Delayed" ? "text-[#ff6b6b]" : "text-[#5be3a1]"}`}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Colorway({ name, price, tone, sole, ink }: { name: string; price: string; tone: string; sole: string; ink: string }) {
  return (
    <div className="relative flex h-full items-center justify-between gap-3 overflow-hidden p-4 font-grotesk" style={{ background: tone, color: ink }}>
      <div className="min-w-0">
        <p className="m-0 text-[10px] uppercase tracking-[0.18em] opacity-60">Runner 2 / Colorway</p>
        <p className="m-0 mt-1 text-[26px] font-bold leading-none tracking-tight">{name}</p>
        <p className="m-0 mt-2 text-sm font-semibold">{price}</p>
      </div>
      <svg viewBox="0 0 140 80" className="h-[84px] w-[150px] shrink-0" aria-hidden="true">
        <path d="M8 52 C10 38 26 34 40 30 C52 26 58 12 72 14 C84 16 88 30 104 34 C120 38 134 42 134 54 L134 60 L8 60 Z" fill={ink} opacity="0.92" />
        <path d="M8 60 L134 60 L132 68 C100 72 40 72 10 68 Z" fill={sole} />
        <path d="M58 26 L66 40 M66 22 L74 36 M74 20 L82 34" stroke={sole} strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Channel({ ch, title, viewers, tone }: { ch: string; title: string; viewers: string; tone: string }) {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden p-3.5 font-mono" style={{ background: tone }}>
      <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 3px)" }} />
      <div className="relative flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 rounded bg-black/50 px-1.5 py-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff2e63]" />
          LIVE
        </span>
        <span className="text-white/70">{ch}</span>
      </div>
      <div className="relative">
        <p className="m-0 text-[20px] font-semibold uppercase leading-none tracking-wide">{title}</p>
        <p className="m-0 mt-1.5 text-[10px] text-white/55">{viewers} watching · 1080p</p>
      </div>
    </div>
  );
}

function Onboard({ step, title, body, tone, mark }: { step: string; title: string; body: string; tone: string; mark: string }) {
  return (
    <div className="relative flex h-full flex-col justify-end overflow-hidden p-4 font-sans" style={{ background: tone }}>
      <div data-depth="1" className="absolute -right-10 -top-14 h-44 w-44 rounded-full opacity-30" style={{ background: mark }} />
      <div data-depth="2" className="absolute right-8 top-6 h-12 w-12 rounded-2xl" style={{ background: mark, boxShadow: `0 12px 30px ${mark}55` }} />
      <div data-depth="2" className="absolute right-[88px] top-[52px] h-6 w-6 rounded-lg border border-white/30" />
      <p data-depth="3" className="relative m-0 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">{step}</p>
      <p data-depth="3" className="relative m-0 mt-1 text-xl font-semibold tracking-tight">{title}</p>
      <p data-depth="3" className="relative m-0 mt-1 max-w-[220px] text-[11px] leading-snug text-white/60">{body}</p>
    </div>
  );
}

export const vjDemos: Record<string, ReactNode> = {
  "transition-iris-wipe": (
    <div className={wrap}>
      <TransitionIrisWipe
        autoPlay
        origin={{ x: 70, y: 38 }}
        className={frame}
        from={<Chapter n="1" title="The Harbor" meta="05:42" sky="linear-gradient(180deg, #2a3b66 0%, #c8806a 70%, #1a1420 100%)" sun="#ffcf9a" />}
        to={<Chapter n="2" title="Night Shift" meta="23:10" sky="linear-gradient(180deg, #05070f 0%, #14203d 60%, #0a0c14 100%)" sun="#dfe7ff" />}
      />
    </div>
  ),
  "transition-diagonal-slice": (
    <div className={wrap}>
      <TransitionDiagonalSlice
        autoPlay
        className={frame}
        from={<Drop n="01" name="Field Jacket, Olive" price="$168" tone="linear-gradient(150deg, #2b3324, #0f120c)" ink="#c7d6a6" />}
        to={<Drop n="02" name="Trail Shell, Indigo" price="$214" tone="linear-gradient(150deg, #23224f, #0b0a1a)" ink="#a9a6ff" />}
      />
    </div>
  ),
  "transition-pixel-dissolve": (
    <div className={wrap}>
      <TransitionPixelDissolve
        autoPlay
        columns={17}
        rows={9}
        className={frame}
        from={<Weather city="Lisbon, PT" temp="21°" sky="14:20 WEST" cond="Clear, light breeze" hi="H 24° L 15°" tone="linear-gradient(160deg, #0f4c5c, #07181d)" />}
        to={<Weather city="Reykjavik, IS" temp="4°" sky="13:20 GMT" cond="Sleet, gusts 38 km/h" hi="H 6° L 1°" tone="linear-gradient(160deg, #26324d, #0a0d16)" />}
      />
    </div>
  ),
  "transition-shared-morph": (
    <div className={wrap}>
      <TransitionSharedMorph
        autoPlay
        className={frame}
        from={
          <div className="flex h-full flex-col justify-center gap-2 bg-[#0f0f10] p-3 font-sans">
            <span className="px-1 text-[10px] uppercase tracking-[0.16em] text-[#8f8f8f]">Up next</span>
            {[
              { t: "Low Tide", a: "Harbor Lights", g: "linear-gradient(135deg, #ff8a3d, #c2185b)", m: true },
              { t: "Glass Hours", a: "Nora Vale", g: "linear-gradient(135deg, #4f8cff, #1b2a6b)", m: false },
            ].map((s) => (
              <div key={s.t} className="flex items-center gap-3 rounded-xl border border-[#262626] bg-[#161618] p-2">
                <div data-morph={s.m ? "cover" : undefined} className="h-10 w-10 shrink-0 rounded-lg" style={{ background: s.g }} />
                <div className="min-w-0 flex-1">
                  <p data-morph={s.m ? "title" : undefined} className="m-0 w-fit text-[13px] font-semibold">{s.t}</p>
                  <p className="m-0 text-[11px] text-[#8f8f8f]">{s.a}</p>
                </div>
                <span className="font-mono text-[10px] text-[#8f8f8f]">3:41</span>
              </div>
            ))}
          </div>
        }
        to={
          <div className="flex h-full items-center gap-4 bg-[#0f0f10] p-4 font-sans">
            <div data-morph="cover" className="h-[124px] w-[124px] shrink-0 rounded-2xl shadow-[0_18px_40px_rgba(194,24,91,0.35)]" style={{ background: "linear-gradient(135deg, #ff8a3d, #c2185b)" }} />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#8f8f8f]">Now playing</span>
              <p data-morph="title" className="m-0 mt-1 w-fit text-[20px] font-semibold leading-tight">Low Tide</p>
              <p className="m-0 text-[11px] text-[#a1a1a1]">Harbor Lights</p>
              <div className="mt-3 h-1 rounded-full bg-[#262626]">
                <div className="h-1 w-[38%] rounded-full bg-[#ededed]" />
              </div>
              <div className="mt-1 flex justify-between font-mono text-[9px] text-[#8f8f8f]">
                <span>1:24</span>
                <span>3:41</span>
              </div>
            </div>
          </div>
        }
      />
    </div>
  ),
  "transition-curtain-call": (
    <div className={wrap}>
      <TransitionCurtainCall
        autoPlay
        className={frame}
        from={<Act act="Act one" title="The Letter Arrives" note="Lyric Hall · 7:30 pm" glow="#4a3418" />}
        to={<Act act="Act two" title="A Storm at Sea" note="After a 15 minute interval" glow="#17304a" />}
      />
    </div>
  ),
  "transition-ripple-reveal": (
    <div className={wrap}>
      <TransitionRippleReveal autoPlay className={frame} label="Toggle dark mode" from={<Theme dark={false} />} to={<Theme dark />} />
    </div>
  ),
  "transition-page-turn": (
    <div className={wrap}>
      <TransitionPageTurn
        autoPlay
        className={frame}
        from={<Spread page="p. 14" kicker="Field notes" title="Salt, wind and the long coast road" body="Three weeks along the Atlantic edge, from Porto to Sagres." art="linear-gradient(160deg, #c8a77a, #6b4f32 60%, #2a1f16)" />}
        to={<Spread page="p. 16" kicker="Tide tables" title="Where the water goes at night" body="A keeper's log from the Berlengas lighthouse, 1962 to 1971." art="linear-gradient(200deg, #6f8fa8, #2b4256 55%, #10181f)" />}
      />
    </div>
  ),
  "transition-zoom-through": (
    <div className={wrap}>
      <TransitionZoomThrough autoPlay origin={{ x: 20, y: 60 }} className={frame} from={<MapView zoomed={false} />} to={<MapView zoomed />} />
    </div>
  ),
  "transition-split-flap": (
    <div className={wrap}>
      <TransitionSplitFlap
        autoPlay
        columns={5}
        className={frame}
        from={<Board rows={[["08:40", "LISBON", "B12", "Boarding"], ["09:05", "OSLO", "A04", "On time"], ["09:30", "MADRID", "C11", "Delayed"], ["09:55", "VIENNA", "B02", "On time"]]} />}
        to={<Board rows={[["09:15", "TOKYO", "C03", "Boarding"], ["09:40", "DUBAI", "D18", "On time"], ["10:10", "BOSTON", "E07", "On time"], ["10:25", "SEOUL", "C09", "Delayed"]]} />}
      />
    </div>
  ),
  "transition-liquid-wipe": (
    <div className={wrap}>
      <TransitionLiquidWipe
        autoPlay
        accent="#ffffff"
        accentEnd="#ffd8cc"
        className={frame}
        from={<Colorway name="Mint" price="$148" tone="linear-gradient(150deg, #c6f5df, #7fdcb6)" sole="#f4fff9" ink="#0f2a20" />}
        to={<Colorway name="Coral" price="$148" tone="linear-gradient(150deg, #ffc2b3, #ff7f6e)" sole="#fff3ef" ink="#3a0f0a" />}
      />
    </div>
  ),
  "transition-glitch-cut": (
    <div className={wrap}>
      <TransitionGlitchCut
        autoPlay
        className={frame}
        from={<Channel ch="CH 07" title="Night Market" viewers="12.4k" tone="radial-gradient(circle at 30% 30%, #4a1f5c, #0b0610 70%)" />}
        to={<Channel ch="CH 08" title="Harbor Cam" viewers="3,812" tone="radial-gradient(circle at 70% 40%, #12493d, #040b09 70%)" />}
      />
    </div>
  ),
  "transition-parallax-slide": (
    <div className={wrap}>
      <TransitionParallaxSlide
        autoPlay
        className={frame}
        from={<Onboard step="Step 1 of 3" title="Plan the route" body="Drop pins, we work out the stops and the fastest order." tone="linear-gradient(160deg, #13203a, #090d16)" mark="#2f7bff" />}
        to={<Onboard step="Step 2 of 3" title="Book in one tap" body="Trains, ferries and rooms in a single checkout." tone="linear-gradient(160deg, #2a1838, #0e0913)" mark="#b46bff" />}
      />
    </div>
  ),
};
