import { Accordion } from "@/registry/hyperblur/accordion";
import { Plasma } from "@/registry/hyperblur/plasma";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { FooterColumns } from "@/registry/hyperblur/footer-columns";
import { Arrow, Em, Icon, Logo, SectionHeading } from "./ui";

const faqs = [
  {
    id: "licenses",
    title: "Is Meridian a bank?",
    content:
      "No. Meridian Payments holds e-money and money transmitter licenses in 41 jurisdictions and keeps customer funds in segregated safeguarding accounts at partner banks, including Aldermoor Bank and Halden Trust.",
  },
  {
    id: "fx",
    title: "How is the exchange rate calculated?",
    content:
      "We take the mid-market rate from a blended feed of six liquidity providers, refreshed every 30 seconds, and add one flat fee shown before you convert. There is no spread hidden in the rate.",
  },
  {
    id: "speed",
    title: "Are instant payouts really instant everywhere?",
    content:
      "In 62 countries payouts use domestic instant rails such as Pix, UPI, SEPA Instant and NPP, with a median of 0.8 seconds. In the remaining 79 countries we fall back to same-day or next-day local transfers.",
  },
  {
    id: "migrate",
    title: "Can we migrate from our current processor?",
    content:
      "Yes. We import saved cards through a PCI-compliant vault transfer, map your existing customer IDs and run both processors side by side until you are ready to switch traffic.",
  },
  {
    id: "kyc",
    title: "Who handles seller onboarding and KYC?",
    content:
      "Meridian does. Hosted onboarding verifies identity, business documents and bank accounts in 180 countries, and most sellers are approved in under four minutes.",
  },
  {
    id: "contract",
    title: "Is there a contract or minimum volume?",
    content: "Launch and Scale are month to month with no minimums. Enterprise agreements are typically annual with volume-based pricing.",
  },
];

const footerColumns = [
  {
    title: "Products",
    links: [
      { label: "Checkout", href: "#accept" },
      { label: "Payouts", href: "#payouts" },
      { label: "Treasury", href: "#treasury" },
      { label: "Ledger", href: "#treasury" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "API reference", href: "#developers" },
      { label: "SDKs", href: "#developers" },
      { label: "Status", href: "#status" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Customers", href: "#customers" },
      { label: "Pricing", href: "#pricing" },
      { label: "Careers", href: "#careers" },
      { label: "Licenses", href: "#licenses" },
    ],
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="hbl-fn-faq-title" className="hbl-fn-section hbl-fn-hair">
      <div className="hbl-fn-wrap grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <FadeInView className="min-w-0">
          <SectionHeading
            id="hbl-fn-faq-title"
            align="left"
            eyebrow="FAQ"
            title={
              <>
                Questions finance teams <Em>ask</Em> first.
              </>
            }
          />
          <div className="hbl-fn-card mt-10 p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[rgba(59,130,246,0.14)] text-[#93c5fd] shadow-[inset_0_0_0_1px_rgba(59,130,246,0.3)]">
                <Icon className="h-5 w-5">
                  <path d="M5 5h14v10h-8l-4 4v-4H5z" />
                </Icon>
              </span>
              <div>
                <p className="text-[15px] font-medium">Talk to a payments engineer</p>
                <p className="text-[13px] text-[#8193ab]">Replies within 2 business hours</p>
              </div>
            </div>
            <a href="#sales" className="hbl-fn-btn hbl-fn-btn-ghost hbl-fn-btn-sm mt-5">
              Book a 30-minute call
              <Arrow />
            </a>
          </div>
        </FadeInView>
        <FadeInView delay={0.1} className="min-w-0">
          <Accordion items={faqs} defaultOpen={["fx"]} />
        </FadeInView>
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section id="start" aria-labelledby="hbl-fn-cta-title" className="pb-24 md:pb-32">
      <div className="hbl-fn-wrap">
        <FadeInView distance={30}>
          <div className="hbl-fn-cta px-6 py-20 text-center md:px-12 md:py-28">
            <Plasma colors={["#050a18", "#34d399", "#3b82f6"]} speed={0.6} scale={1.2} opacity={0.55} seed={7} />
            <div className="hbl-fn-cta-veil" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-[720px]">
              <h2 id="hbl-fn-cta-title" className="hbl-fn-h2">
                Open an account in <Em>nine</Em> minutes.
              </h2>
              <p className="hbl-fn-lead mx-auto mt-5 max-w-[540px]">
                Test mode is free forever. Go live the same day your compliance review clears, usually within 48 hours.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="#signup" className="hbl-fn-btn hbl-fn-btn-primary w-full sm:w-auto">
                  Create a free account
                  <Arrow />
                </a>
                <a href="#sales" className="hbl-fn-btn hbl-fn-btn-ghost w-full sm:w-auto">
                  Talk to sales
                </a>
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <div className="hbl-fn-wrap">
      <FooterColumns
        logo={<Logo id="hbl-fn-footer-logo" />}
        blurb="Payments and treasury infrastructure for global marketplaces. Accept 135 currencies, pay out instantly and convert at mid-market."
        columns={footerColumns}
        newsletterTitle="Payments field notes, once a month"
        socials={[
          { name: "x", href: "#x" },
          { name: "github", href: "#github" },
          { name: "linkedin", href: "#linkedin" },
        ]}
        legal={[
          { label: "Privacy", href: "#privacy" },
          { label: "Terms", href: "#terms" },
          { label: "Licenses", href: "#licenses" },
        ]}
        copyright="© 2026 Meridian Payments, Inc. Meridian is not a bank."
        status={{ label: "All rails operational", tone: "ok", href: "#status" }}
        accent="#34d399"
      />
    </div>
  );
}
