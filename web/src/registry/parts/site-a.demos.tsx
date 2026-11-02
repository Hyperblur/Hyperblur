import type { ReactNode } from "react";
import { NavbarGlass } from "@/registry/hyperblur/navbar-glass";
import { FooterColumns } from "@/registry/hyperblur/footer-columns";
import { AnnouncementBar } from "@/registry/hyperblur/announcement-bar";
import { CookieBanner } from "@/registry/hyperblur/cookie-banner";
import { Breadcrumbs } from "@/registry/hyperblur/breadcrumbs";
import { NewsletterSignupDemo } from "@/registry/demos/newsletter-signup-demo";

function Scaled({ width, height = 190, children }: { width: number; height?: number; children: ReactNode }) {
  return (
    <div
      className="relative w-full max-w-[340px] overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a]"
      style={{ height }}
    >
      <div className="origin-top-left" style={{ width, transform: `scale(${326 / width})` }}>
        {children}
      </div>
    </div>
  );
}

const bar = "block rounded-full bg-white/[0.08]";

export const siteADemos: Record<string, ReactNode> = {
  "navbar-glass": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <Scaled width={640} height={152}>
        <div
          className="relative h-[300px] p-6"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 0%, rgba(47,123,255,0.22), transparent 70%), radial-gradient(50% 50% at 10% 20%, rgba(127,179,255,0.1), transparent 70%), #0a0a0a",
          }}
        >
          <NavbarGlass
            sticky={false}
            defaultOpenId="product"
            className="[&_.hb-nvg-bar]:px-6! [&_.hb-nvg-bar]:py-6! [&_.hb-nvg-link]:px-6! [&_.hb-nvg-cta]:px-6! [&_.hb-nvg-panel]:p-[13px]!"
            logo={
              <>
                <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#2f7bff] text-[12px] text-white">O</span>
                <span>Orbit</span>
              </>
            }
            links={[
              {
                id: "product",
                label: "Product",
                menu: [
                  { title: "Automations", description: "Trigger workflows from any event", icon: "bolt", href: "#" },
                  { title: "Analytics", description: "Dashboards your team reads", icon: "chart", href: "#" },
                  { title: "Security", description: "SSO, audit logs and SOC 2", icon: "shield", href: "#" },
                  { title: "Developer API", description: "REST and webhooks", icon: "code", href: "#" },
                ],
              },
              { id: "pricing", label: "Pricing", href: "#" },
              { id: "docs", label: "Docs", href: "#" },
            ]}
            cta={{ label: "Start free", href: "#" }}
          />
        </div>
      </Scaled>
    </div>
  ),
  "footer-columns": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <Scaled width={700}>
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
      <div className="relative w-full max-w-[340px] overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a]">
        <AnnouncementBar
          variant="gradient"
          messages={[
            { text: "Live cursors are here", cta: "See more", href: "#" },
            { text: "Free webinar, Nov 14", cta: "Save a seat", href: "#" },
            { text: "SOC 2 Type II is done", cta: "Read more", href: "#" },
          ]}
        />
        <div className="px-4 pb-5 pt-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="block h-5 w-5 rounded-md bg-[#2f7bff]" />
              <span className={`${bar} h-2.5 w-14`} />
            </span>
            <span className="flex items-center gap-3">
              <span className={`${bar} h-2 w-8`} />
              <span className={`${bar} h-2 w-8`} />
              <span className="block h-5 w-12 rounded-md bg-white/[0.12]" />
            </span>
          </div>
          <div className="mt-5 flex flex-col items-center gap-2 opacity-70">
            <span className={`${bar} h-4 w-[230px]`} />
            <span className={`${bar} h-4 w-[170px]`} />
            <span className={`${bar} mt-1 h-1.5 w-[210px]`} />
          </div>
        </div>
      </div>
    </div>
  ),
  "cookie-banner": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="relative flex w-full max-w-[340px] flex-col gap-3 overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a] p-3">
        <div className="flex items-center justify-between">
          <span className={`${bar} h-2 w-14`} />
          <span className="flex gap-2">
            <span className={`${bar} h-2 w-8`} />
            <span className={`${bar} h-2 w-8`} />
          </span>
        </div>
        <CookieBanner
          title="Your privacy"
          description="Pick which cookies you want to allow."
          className="[&_.hb-ckb-btn]:px-3!"
        />
      </div>
    </div>
  ),
  "newsletter-signup": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div
        className="box-border w-full max-w-[340px] rounded-2xl border border-[#2a2418] p-4"
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
