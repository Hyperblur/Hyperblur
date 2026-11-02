"use client";

import type { ReactNode } from "react";
import { MeshGradient } from "@/registry/hyperblur/mesh-gradient";
import { SplitText } from "@/registry/hyperblur/split-text";
import { GradientText } from "@/registry/hyperblur/gradient-text";
import { TiltCard } from "@/registry/hyperblur/tilt-card";
import { GlassCard } from "@/registry/hyperblur/glass-card";
import { StatCard } from "@/registry/hyperblur/stat-card";
import { AreaChart } from "@/registry/hyperblur/area-chart";
import { Sparkline } from "@/registry/hyperblur/sparkline";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Arrow, Icon } from "./ui";

const volume = [
  { label: "Oct 20", value: 1420000 },
  { label: "Oct 21", value: 1510000 },
  { label: "Oct 22", value: 1480000 },
  { label: "Oct 23", value: 1630000 },
  { label: "Oct 24", value: 1710000 },
  { label: "Oct 25", value: 1580000 },
  { label: "Oct 26", value: 1660000 },
  { label: "Oct 27", value: 1820000 },
  { label: "Oct 28", value: 1790000 },
  { label: "Oct 29", value: 1940000 },
  { label: "Oct 30", value: 2060000 },
  { label: "Oct 31", value: 1980000 },
  { label: "Nov 1", value: 2140000 },
  { label: "Nov 2", value: 2310000 },
];

const sideNav: { label: string; active?: boolean; icon: ReactNode }[] = [
  { label: "Overview", active: true, icon: <path d="M4 13h6V4H4zM14 20h6v-9h-6zM14 4v3h6V4zM4 20h6v-3H4z" /> },
  { label: "Payments", icon: <path d="M3 7h18v10H3zM3 11h18M7 15h3" /> },
  { label: "Payouts", icon: <path d="M12 19V5M6 11l6-6 6 6" /> },
  { label: "Balances", icon: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /> },
  { label: "FX", icon: <path d="M7 7h11l-3-3M17 17H6l3 3" /> },
  { label: "Ledger", icon: <path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h4" /> },
  { label: "Developers", icon: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" /> },
];

const payouts = [
  { code: "EUR", color: "#60a5fa", name: "Atelier Rocha", amount: "€48,210.00", time: "0.8s" },
  { code: "BRL", color: "#34d399", name: "Feira Viva Ltda", amount: "R$ 12,940.50", time: "1.1s" },
  { code: "INR", color: "#fbbf24", name: "Kaveri Crafts", amount: "₹3,84,200", time: "0.9s" },
  { code: "GBP", color: "#a78bfa", name: "Hartley & Sons", amount: "£7,615.20", time: "0.7s" },
];

function Console() {
  return (
    <div className="hbl-fn-console text-left">
      <div className="hbl-fn-console-bar">
        <div className="hbl-fn-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="hbl-fn-addr">
          <Icon className="h-3 w-3 flex-none">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </Icon>
          <span className="truncate">dashboard.meridian.com/treasury</span>
        </div>
        <span className="hidden sm:inline-flex">
          <span className="hbl-fn-live">
            <i aria-hidden="true" />
            Live
          </span>
        </span>
      </div>
      <div className="grid md:grid-cols-[188px_minmax(0,1fr)]">
        <aside className="hidden border-r border-[rgba(148,163,184,0.16)] p-3 md:block" aria-hidden="true">
          <div className="mb-3 flex items-center gap-2.5 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[rgba(6,11,26,0.5)] p-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-[#34d399] to-[#3b82f6] text-[11px] font-bold text-[#04101f]">
              FV
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[12.5px] font-medium text-[#eaf2ff]">Feira Viva</span>
              <span className="block text-[11px] text-[#7d8ea8]">4 entities</span>
            </span>
          </div>
          <div className="space-y-0.5">
            {sideNav.map((item) => (
              <div key={item.label} className="hbl-fn-side-item" data-active={item.active ? "true" : "false"}>
                <Icon>{item.icon}</Icon>
                {item.label}
              </div>
            ))}
          </div>
        </aside>
        <div className="min-w-0 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[12px] text-[#7d8ea8]">Treasury · All entities</p>
              <p className="mt-0.5 text-[18px] font-semibold tracking-[-0.02em]">Good morning, Lucía</p>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-[rgba(148,163,184,0.16)] p-1 text-[12px] text-[#8193ab]" aria-hidden="true">
              <span className="rounded-full px-2.5 py-1">7D</span>
              <span className="rounded-full bg-[rgba(148,163,184,0.12)] px-2.5 py-1 text-[#eaf2ff]">14D</span>
              <span className="rounded-full px-2.5 py-1">90D</span>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <StatCard
              label="Gross volume"
              value={25.04}
              prefix="$"
              suffix="M"
              decimals={2}
              delta={12.4}
              caption="vs prior 14 days"
              color="#34d399"
              data={[14, 15, 14.8, 16.3, 17.1, 15.8, 16.6, 18.2, 17.9, 19.4, 20.6, 19.8, 21.4, 23.1]}
            />
            <div className="hidden sm:block">
              <StatCard
                label="Available balance"
                value={6.81}
                prefix="$"
                suffix="M"
                decimals={2}
                delta={4.1}
                caption="Across 18 currencies"
                color="#3b82f6"
                data={[5.9, 6.1, 6.0, 6.2, 6.4, 6.3, 6.5, 6.6, 6.5, 6.7, 6.8]}
                className="h-full"
              />
            </div>
            <div className="hidden sm:block">
              <StatCard
                label="Payouts sent"
                value={18204}
                delta={22.8}
                caption="Median 0.8s to settle"
                color="#6ee7b7"
                data={[820, 940, 910, 1080, 1150, 1120, 1260, 1310, 1290, 1420]}
                className="h-full"
              />
            </div>
          </div>
          <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="min-w-0 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[rgba(6,11,26,0.55)] p-4">
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <p className="text-[13px] font-medium text-[#c8d4e6]">Volume by day</p>
                <p className="hbl-fn-num text-[12px] text-[#6ee7b7]">+62.7% since Oct 20</p>
              </div>
              <AreaChart
                data={volume}
                color="#34d399"
                height={176}
                valueFormatter={(n) => `$${(n / 1000000).toFixed(2)}M`}
              />
            </div>
            <div className="hidden min-w-0 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[rgba(6,11,26,0.55)] p-4 lg:block">
              <p className="text-[13px] font-medium text-[#c8d4e6]">Latest payouts</p>
              <ul className="mt-3 space-y-3">
                {payouts.map((p) => (
                  <li key={p.name} className="flex items-center gap-3">
                    <span className="hbl-fn-flag" style={{ background: p.color }}>
                      {p.code}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] text-[#eaf2ff]">{p.name}</span>
                      <span className="block text-[11px] text-[#6ee7b7]">Settled in {p.time}</span>
                    </span>
                    <span className="hbl-fn-num text-[12.5px] text-[#c8d4e6]">{p.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentCard() {
  return (
    <div className="hbl-fn-paycard">
      <div className="relative flex items-start justify-between">
        <span className="inline-flex items-center gap-2 text-[14px] font-semibold tracking-[-0.02em]">
          <svg width="18" height="18" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="2.4" />
            <ellipse cx="16" cy="16" rx="5" ry="11" stroke="currentColor" strokeWidth="2.4" />
          </svg>
          Meridian
        </span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className="opacity-80">
          <path d="M8.5 8.5a5 5 0 0 1 0 7M12 6a8.5 8.5 0 0 1 0 12M15.5 3.5a12 12 0 0 1 0 17" />
        </svg>
      </div>
      <div className="hbl-fn-paychip relative mt-5" aria-hidden="true" />
      <p className="hbl-fn-mono hbl-fn-num relative mt-4 text-[15px] tracking-[0.14em] text-[#eaf2ff]">•••• •••• •••• 4021</p>
      <div className="relative mt-2 flex items-end justify-between text-[11px] uppercase tracking-[0.12em] text-[#b6c4d8]">
        <span>Treasury · USD</span>
        <span>09/29</span>
      </div>
    </div>
  );
}

function PayoutToast() {
  return (
    <GlassCard tint="#34d399" blur={20} tilt={6} radius={18} className="w-[300px] max-w-full p-4">
      <div className="relative flex items-start gap-3">
        <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-[rgba(52,211,153,0.2)] text-[#6ee7b7] shadow-[inset_0_0_0_1px_rgba(52,211,153,0.4)]">
          <Icon className="h-4 w-4">
            <path d="M5 12.5l4.2 4.2L19 7" />
          </Icon>
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13.5px] font-semibold text-white">Payout settled</p>
            <span className="text-[11px] text-[#b6c4d8]">just now</span>
          </div>
          <p className="hbl-fn-num mt-0.5 text-[13px] text-[#dbe6f5]">€48,210.00 to Atelier Rocha, Lisbon</p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-[rgba(255,255,255,0.12)]">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-[#34d399] to-[#60a5fa]" />
          </div>
          <p className="mt-2 text-[11px] text-[#b6c4d8]">SEPA Instant · 0.8s · fee €0.10</p>
        </div>
      </div>
    </GlassCard>
  );
}

function FxChip() {
  return (
    <GlassCard tint="#3b82f6" blur={18} tilt={5} radius={16} className="w-[230px] p-3.5">
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#b6c4d8]">FX locked</span>
          <span className="hbl-fn-chip hbl-fn-chip-em" style={{ height: 20, padding: "0 8px", fontSize: 10.5 }}>Mid-market</span>
        </div>
        <p className="hbl-fn-num mt-1.5 text-[20px] font-semibold tracking-[-0.03em] text-white">
          USD → EUR <span className="text-[#93c5fd]">0.9214</span>
        </p>
        <Sparkline data={[0.9181, 0.9193, 0.9188, 0.9202, 0.9197, 0.9209, 0.9205, 0.9214]} color="#60a5fa" height={34} className="mt-1" />
      </div>
    </GlassCard>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-24 pt-14 md:pb-32 md:pt-20">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <MeshGradient
          colors={["#34d399", "#1d4ed8", "#3b82f6", "#0f766e", "#22d3ee", "#10b981"]}
          background="#060b1a"
          speed={0.55}
          blur={90}
          grain={0.1}
          className="opacity-60"
        />
        <div className="hbl-fn-hero-grid" />
        <div className="hbl-fn-hero-fade" />
      </div>
      <div className="hbl-fn-wrap text-center">
        <FadeInView direction="down" distance={12} duration={0.7}>
          <a href="#payouts" className="hbl-fn-eyebrow hbl-fn-eyebrow-link hbl-fn-focus">
            <span className="hbl-fn-eyebrow-dot" aria-hidden="true" />
            Instant payouts are live in 62 countries
            <span aria-hidden="true" className="text-[#6ee7b7]">→</span>
          </a>
        </FadeInView>
        <h1 className="hbl-fn-h1 mx-auto mt-7 max-w-[980px]">
          <SplitText text="Global payments," by="words" trigger="mount" stagger={0.08} duration={0.8} distance={28} className="block" />
          <span className="block">
            <SplitText text="settled in" by="words" trigger="mount" stagger={0.08} duration={0.8} distance={28} />{" "}
            <GradientText text="seconds." colors={["#a7f3d0", "#34d399", "#60a5fa", "#a7f3d0"]} speed={0.5} />
          </span>
        </h1>
        <FadeInView delay={0.35} distance={16} duration={0.8}>
          <p className="hbl-fn-lead mx-auto mt-7 max-w-[640px]">
            Meridian is the payments and treasury layer for global marketplaces. Accept 135 currencies, pay sellers in
            under a second and convert at the mid-market rate, all on one API and one ledger.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#start" className="hbl-fn-btn hbl-fn-btn-primary w-full sm:w-auto">
              Start building
              <Arrow />
            </a>
            <a href="#sales" className="hbl-fn-btn hbl-fn-btn-ghost w-full sm:w-auto">
              Talk to the treasury team
            </a>
          </div>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-[#8193ab]">
            <span>No setup fee</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#475569]" />
            <span>Live in 9 minutes</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#475569]" />
            <span>PCI DSS Level 1 · SOC 2 Type II</span>
          </p>
        </FadeInView>

        <FadeInView delay={0.5} distance={40} duration={1}>
          <div className="relative mx-auto mt-16 max-w-[1080px] md:mt-20">
            <div className="hbl-fn-glow left-[10%] top-[10%] h-[60%] w-[40%] bg-[#34d399]" aria-hidden="true" />
            <div className="hbl-fn-glow right-[8%] top-[20%] h-[55%] w-[38%] bg-[#3b82f6]" aria-hidden="true" />
            <Console />
            <div className="mt-6 flex flex-wrap items-start justify-center gap-5 lg:contents">
              <div className="hbl-fn-float lg:absolute lg:-left-6 lg:top-[40%] lg:z-10 xl:-left-20">
                <TiltCard maxTilt={14} scale={1.04} className="rounded-[18px]">
                  <PaymentCard />
                </TiltCard>
              </div>
              <div className="hbl-fn-float-b lg:absolute lg:-right-6 lg:top-[12%] lg:z-10 xl:-right-16">
                <PayoutToast />
              </div>
              <div className="hbl-fn-float-c hidden lg:absolute lg:-bottom-8 lg:right-[18%] lg:z-10 lg:block">
                <FxChip />
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
