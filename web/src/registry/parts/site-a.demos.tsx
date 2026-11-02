import type { ReactNode } from "react";
import { NavbarGlass } from "@/registry/hyperblur/navbar-glass";
import { FooterColumns } from "@/registry/hyperblur/footer-columns";
import { AnnouncementBar } from "@/registry/hyperblur/announcement-bar";
import { CookieBanner } from "@/registry/hyperblur/cookie-banner";
import { Breadcrumbs } from "@/registry/hyperblur/breadcrumbs";
import { NewsletterSignupDemo } from "@/registry/demos/newsletter-signup-demo";

function Scaled({ width, scale, children }: { width: number; scale: number; children: ReactNode }) {
  return (
    <div className="relative h-[190px] w-full max-w-[340px] overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a]">
      <div className="origin-top-left" style={{ width, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

const bar = "block rounded-full bg-white/[0.08]";

export const siteADemos: Record<string, ReactNode> = {
  "navbar-glass": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <Scaled width={640} scale={0.53}>
        <div
          className="relative h-[360px] overflow-hidden p-[14px]"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 0%, rgba(47,123,255,0.22), transparent 70%), radial-gradient(50% 50% at 10% 20%, rgba(127,179,255,0.1), transparent 70%), #0a0a0a",
          }}
        >
          <NavbarGlass sticky={false} defaultOpenId="product" cta={{ label: "Start free", href: "#" }} />
          <div className="absolute inset-x-0 top-[96px] px-10 opacity-40">
            <p className="font-grotesk m-0 text-[11px] font-medium uppercase tracking-[0.18em] text-[#7fb3ff]">Release 2.0</p>
            <p className="font-serif m-0 mt-2 text-[44px] leading-[1.02] text-white">Ship the experiment, not the meeting.</p>
            <p className="m-0 mt-3 max-w-[360px] text-[14px] leading-[1.5] text-[#a1a1a1]">
              Run tests, read the results and roll out the winner from one workspace.
            </p>
          </div>
        </div>
      </Scaled>
    </div>
  ),
  "footer-columns": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <Scaled width={700} scale={0.4857}>
        <FooterColumns
          blurb="Experiments, analytics and feature flags in one workspace."
          socials={[{ name: "x" }, { name: "github" }, { name: "linkedin" }, { name: "youtube" }]}
          columns={[
            {
              title: "Product",
              links: [
                { label: "Features", href: "#" },
                { label: "Integrations", href: "#" },
                { label: "Pricing", href: "#" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Contact", href: "#" },
              ],
            },
          ]}
          legal={[
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
          ]}
        />
      </Scaled>
    </div>
  ),
  "announcement-bar": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <Scaled width={520} scale={0.6538}>
        <AnnouncementBar variant="gradient" />
        <div className="px-8 pt-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="block h-5 w-5 rounded-md bg-[#2f7bff]" />
              <span className={`${bar} h-2.5 w-16`} />
            </span>
            <span className="flex items-center gap-4">
              <span className={`${bar} h-2 w-10`} />
              <span className={`${bar} h-2 w-10`} />
              <span className={`${bar} h-2 w-10`} />
              <span className="block h-6 w-16 rounded-lg bg-white/[0.12]" />
            </span>
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 opacity-70">
            <span className={`${bar} h-5 w-[320px]`} />
            <span className={`${bar} h-5 w-[240px]`} />
            <span className={`${bar} mt-2 h-2 w-[300px]`} />
            <span className={`${bar} h-2 w-[260px]`} />
            <span className="mt-3 block h-8 w-28 rounded-full bg-white/[0.14]" />
          </div>
        </div>
      </Scaled>
    </div>
  ),
  "cookie-banner": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="relative flex h-[190px] w-full max-w-[340px] flex-col justify-between overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a] p-2">
        <div className="flex items-center justify-between px-2 pt-1">
          <span className={`${bar} h-2 w-14`} />
          <span className="flex gap-2">
            <span className={`${bar} h-2 w-8`} />
            <span className={`${bar} h-2 w-8`} />
          </span>
        </div>
        <CookieBanner />
      </div>
    </div>
  ),
  "newsletter-signup": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div
        className="box-border w-full max-w-[340px] rounded-2xl border border-[#2a2418] p-3.5"
        style={{ background: "radial-gradient(90% 120% at 50% -20%, rgba(232,162,58,0.16), transparent 65%), #121110" }}
      >
        <NewsletterSignupDemo />
      </div>
    </div>
  ),
  breadcrumbs: (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border w-full max-w-[340px] rounded-xl border border-[#262626] bg-[#0d0d0d] p-4">
        <Breadcrumbs
          homeIcon
          items={[
            { label: "Home", href: "#" },
            { label: "Docs", href: "#" },
            { label: "Guides", href: "#" },
            { label: "Security", href: "#" },
            { label: "SAML setup" },
          ]}
        />
        <p className="font-grotesk m-0 mt-4 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
          Set up SAML sign-in
        </p>
        <p className="m-0 mt-2 text-[13px] leading-[1.5] text-[#8f8f8f]">
          Connect Okta, Entra ID or Google Workspace in about ten minutes.
        </p>
        <div className="mt-4 flex items-center gap-3 border-t border-[#1f1f1f] pt-3 text-[11.5px] text-[#6b6b6b]">
          <span className="rounded-full bg-[#2f7bff]/15 px-2 py-0.5 font-medium text-[#7fb3ff]">Enterprise</span>
          <span>6 min read</span>
          <span>Updated Oct 28</span>
        </div>
      </div>
    </div>
  ),
};
