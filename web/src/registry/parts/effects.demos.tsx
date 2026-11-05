import type { CSSProperties, ReactNode } from "react";
import { ShinyText } from "@/registry/hyperblur/shiny-text";
import { SpotlightCard, SpotlightGroup } from "@/registry/hyperblur/spotlight-card";
import { Meteors } from "@/registry/hyperblur/meteors";
import { MeshGradient } from "@/registry/hyperblur/mesh-gradient";
import { OrbitIcons } from "@/registry/hyperblur/orbit-icons";
import { AnimatedBeam } from "@/registry/hyperblur/animated-beam";
import { GlassCard } from "@/registry/hyperblur/glass-card";
import { RippleGrid } from "@/registry/hyperblur/ripple-grid";

function Scene({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={style}>
      {children}
    </div>
  );
}

function Icon({ d, className = "h-4 w-4", fill = false }: { d: string; className?: string; fill?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : "currentColor"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const glyph = {
  check: "M5 12.5l4.5 4.5L19 7.5",
  prev: "M18 6v12l-9-6zM7 6v12",
  next: "M6 6v12l9-6zM17 6v12",
  play: "M8 5v14l11-7z",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
  mail: "M3 6h18v12H3zM3.5 7l8.5 6 8.5-6",
  hash: "M9 4L7 20M17 4l-2 16M4 9h16M3.5 15h16",
  branch: "M6 4v12M6 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM18 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM18 8c0 5-6 4-12 8",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  tray: "M4 13l2.5-8h11L20 13v6H4zM4 13h5l1 2h4l1-2h5",
  wave: "M4 12c2-4 4-4 6 0s4 4 6 0 3-4 4-2",
  signal: "M8.5 16.5a5 5 0 0 1 0-9M15.5 7.5a5 5 0 0 1 0 9M5.5 19.5a9 9 0 0 1 0-15M18.5 4.5a9 9 0 0 1 0 15",
};

const plans = [
  { name: "Starter", price: "$0", features: ["3 projects", "Community"], cta: "Start free", pro: false },
  { name: "Pro", price: "$18", features: ["Unlimited", "Analytics"], cta: "Upgrade", pro: true },
  { name: "Team", price: "$49", features: ["10 seats", "SAML SSO"], cta: "Contact", pro: false },
];

const beamNode = (d: string) => <Icon d={d} />;

export const effectsDemos: Record<string, ReactNode> = {
  "shiny-text": (
    <Scene style={{ background: "#060608" }}>
      <div
        className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 animate-[spin_26s_linear_infinite] opacity-80 blur-3xl motion-reduce:animate-none"
        style={{
          background:
            "conic-gradient(from 0deg, #060608 0deg, #1b2a66 60deg, #060608 120deg, #3d1d55 190deg, #060608 250deg, #0f3b4d 310deg, #060608 360deg)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-6 text-center">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
          Keynote · Nov 18
        </span>
        <ShinyText
          text="Nova One"
          speed={2.4}
          color="#5f5f6b"
          shine="#ffffff"
          className="font-display text-[52px] font-semibold leading-none tracking-tight"
        />
        <span className="text-[13px] text-white/60">The quietest laptop we have ever built.</span>
        <span className="font-mono text-[10px] text-white/35">Pre-orders open 09:00 PT</span>
      </div>
    </Scene>
  ),
  "spotlight-card": (
    <Scene
      style={{
        background:
          "radial-gradient(60% 70% at 50% 0%, rgba(47,123,255,0.14), rgba(47,123,255,0) 70%), radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px) 0 0 / 16px 16px, #09090b",
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <div className="mb-2.5 flex w-full max-w-[324px] items-center justify-between">
          <span className="text-[13px] font-semibold text-white">Plans</span>
          <span className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.03] p-0.5 text-[9px] font-medium">
            <span className="rounded-full px-2 py-0.5 text-white/50">Monthly</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-white">Yearly −20%</span>
          </span>
        </div>
        <SpotlightGroup className="grid w-full max-w-[324px] grid-cols-3 gap-2">
          {plans.map((p) => (
            <SpotlightCard key={p.name} color={p.pro ? "#7fb3ff" : "#c4c4cc"} size={240} radius={14} className="flex h-[136px] flex-col p-2.5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-white/60">{p.name}</span>
                {p.pro && <span className="rounded-full bg-[#2f7bff]/20 px-1.5 py-px text-[8px] font-semibold text-[#9cc4ff]">Popular</span>}
              </div>
              <div className="mt-0.5 flex items-baseline gap-0.5">
                <span className="text-[22px] font-semibold tracking-tight text-white">{p.price}</span>
                <span className="text-[10px] text-white/40">/mo</span>
              </div>
              <ul className="mt-1 space-y-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-1 text-[10px] text-white/60">
                    <Icon d={glyph.check} className={`h-2.5 w-2.5 ${p.pro ? "text-[#7fb3ff]" : "text-white/40"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <span
                className={`mt-auto rounded-full py-1 text-center text-[10px] font-semibold ${p.pro ? "bg-white text-black" : "border border-white/10 text-white/80"}`}
              >
                {p.cta}
              </span>
            </SpotlightCard>
          ))}
        </SpotlightGroup>
      </div>
    </Scene>
  ),
  meteors: (
    <Scene style={{ background: "linear-gradient(180deg, #02040b 0%, #08112b 58%, #1b1a44 100%)" }}>
      <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(190,210,255,0.22),rgba(190,210,255,0))]" />
      <Meteors count={24} stars={55} color="#e3ebff" angle={148} />
      <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[58px] w-full" aria-hidden="true">
        <path d="M0 30 Q 60 8 130 26 T 250 20 T 400 14 V60 H0Z" fill="#0d1230" />
        <path d="M0 44 Q 70 26 150 40 T 290 34 T 400 40 V60 H0Z" fill="#05060f" />
      </svg>
      <span className="absolute left-4 top-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Perseids · peak tonight</span>
      <div className="absolute inset-x-0 top-0 bottom-12 flex flex-col items-center justify-center gap-2 px-8 text-center">
        <p className="m-0 max-w-[290px] font-sans text-[22px] leading-[1.15] text-white">
          “We are all in the gutter, but some of us are looking at the stars.”
        </p>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Oscar Wilde · 1892</span>
      </div>
    </Scene>
  ),
  "mesh-gradient": (
    <Scene>
      <MeshGradient colors={["#ff4d8d", "#7c3aed", "#2f7bff", "#19c3f5", "#ffb547"]} blur={42} grain={0.22} />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="w-full max-w-[264px] rounded-2xl border border-white/25 bg-white/10 p-3 font-grotesk text-white shadow-[0_24px_48px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div
              className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl"
              style={{ background: "radial-gradient(60% 60% at 30% 30%, #ffd166, rgba(255,209,102,0) 70%), linear-gradient(135deg, #ff4d8d, #3b1d8f)" }}
            >
              <span className="absolute bottom-1.5 left-1.5 h-4 w-4 rounded-full border-2 border-white/70" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/70">Now playing</div>
              <div className="truncate text-[15px] font-semibold leading-5">Midnight Arcade</div>
              <div className="truncate text-[12px] text-white/70">Lumen Drive</div>
            </div>
            <Icon d={glyph.heart} className="h-4 w-4 shrink-0 text-white" fill />
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/25">
            <div className="h-full w-[38%] rounded-full bg-white" />
          </div>
          <div className="mt-1 flex justify-between font-mono text-[9px] text-white/70">
            <span>1:24</span>
            <span>3:51</span>
          </div>
          <div className="mt-1 flex items-center justify-center gap-6">
            <Icon d={glyph.prev} className="h-4 w-4 text-white/85" fill />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
              <Icon d={glyph.play} className="ml-0.5 h-3.5 w-3.5" fill />
            </span>
            <Icon d={glyph.next} className="h-4 w-4 text-white/85" fill />
            </div>
        </div>
      </div>
    </Scene>
  ),
  "orbit-icons": (
    <Scene
      style={{
        containerType: "size",
        background: "radial-gradient(55% 75% at 50% 50%, rgba(47,123,255,0.16), rgba(47,123,255,0) 70%), #08080a",
      }}
    >
      <span className="absolute left-4 top-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Integrations</span>
      <span className="absolute right-4 top-3.5 font-mono text-[10px] text-white/35">v4.2</span>
      <span className="absolute bottom-3.5 left-4 font-mono text-[10px] text-white/45">38 connected</span>
      <span className="absolute bottom-3.5 right-4 flex items-center gap-1.5 font-mono text-[10px] text-emerald-300/80">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Live
      </span>
      <div className="absolute inset-0 flex items-center justify-center">
        <OrbitIcons duration={20} style={{ width: "min(84cqh, 84cqw)" }}>
          <span className="flex h-full w-full items-center justify-center rounded-[30%] bg-gradient-to-br from-[#9cc4ff] via-[#2f7bff] to-[#1739a3] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_10px_30px_-8px_rgba(47,123,255,0.9)]">
            <Icon d={glyph.wave} className="h-1/2 w-1/2" />
          </span>
        </OrbitIcons>
      </div>
    </Scene>
  ),
  "animated-beam": (
    <Scene
      style={{
        containerType: "size",
        background: "radial-gradient(70% 80% at 50% 45%, rgba(127,179,255,0.10), rgba(127,179,255,0) 70%), #09090b",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div style={{ width: "min(88cqw, calc((84cqh - 20px) * 2.3))" }}>
          <AnimatedBeam
            color="#7fb3ff"
            duration={2.6}
            sources={[
              { icon: beamNode(glyph.mail), label: "Email" },
              { icon: beamNode(glyph.hash), label: "Team chat" },
              { icon: beamNode(glyph.branch), label: "Repositories" },
              { icon: beamNode(glyph.calendar), label: "Calendar" },
            ]}
            hub={{ icon: <Icon d={glyph.signal} className="h-1/2 w-1/2" />, label: "Relay" }}
            output={{ icon: beamNode(glyph.tray), label: "Team inbox" }}
          />
          <div className="mt-2 flex w-full justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
            <span>4 sources</span>
            <span className="text-[#9cc4ff]/80">Relay</span>
            <span>Inbox</span>
          </div>
        </div>
      </div>
    </Scene>
  ),
  "glass-card": (
    <Scene style={{ background: "#140b26" }}>
      <div className="absolute left-[calc(50%-134px)] top-[calc(50%-90px)] h-[112px] w-[112px] rounded-full bg-gradient-to-br from-[#ffb547] to-[#ff4d8d]" />
      <div className="absolute bottom-[calc(50%-96px)] right-[calc(50%-128px)] h-[124px] w-[124px] rounded-full bg-gradient-to-br from-[#19c3f5] to-[#2f5bff]" />
      <div className="absolute left-[calc(50%+14px)] top-[calc(50%-86px)] h-[46px] w-[46px] rounded-full bg-gradient-to-br from-[#b48cff] to-[#7c3aed]" />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <GlassCard blur={16} radius={18} className="flex h-[142px] w-[236px] flex-col justify-between p-4 font-grotesk">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-wide">Lumen</span>
            <Icon d={glyph.signal} className="h-4 w-4 rotate-90 text-white/85" />
          </div>
          <div className="flex items-center gap-3">
            <span className="h-[20px] w-[28px] rounded-[5px] border border-white/30 bg-gradient-to-br from-[#f6dd9a] to-[#b98f3e]" />
            <span className="font-mono text-[13px] tracking-[0.16em] text-white">•••• 0937</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[8px] uppercase tracking-[0.18em] text-white/60">Card holder</div>
              <div className="text-[11px] font-medium">Mira Castellanos</div>
            </div>
            <div className="text-right">
              <div className="text-[8px] uppercase tracking-[0.18em] text-white/60">Expires</div>
              <div className="font-mono text-[11px]">08/29</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </Scene>
  ),
  "ripple-grid": (
    <Scene style={{ background: "#070709" }}>
      <div className="absolute inset-2.5">
        <RippleGrid rows={11} cols={20} gap={5} color="#7fb3ff" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_90%_at_50%_50%,rgba(7,7,9,0)_55%,rgba(7,7,9,0.85)_100%)]" />
      <div className="pointer-events-none absolute bottom-4 left-4 rounded-xl border border-white/10 bg-black/65 px-4 py-3 backdrop-blur-md">
        <div className="font-sans text-[19px] leading-none text-white">Every signal, felt.</div>
        <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">Click or hover the grid</div>
      </div>
    </Scene>
  ),
};
