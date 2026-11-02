import { Accordion } from "@/registry/hyperblur/accordion";
import { DotGrid } from "@/registry/hyperblur/dot-grid";
import { Typewriter } from "@/registry/hyperblur/typewriter";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { FooterColumns } from "@/registry/hyperblur/footer-columns";
import { ArrowRight, Corners, ForgeMark, SectionHead } from "./icons";

const faqs = [
  {
    id: "ci",
    title: "Do I still need a CI service?",
    content:
      "You can keep it for tests and linting. Most teams move the build and deploy steps to Forge and call forge deploy from their existing pipeline, which keeps the remote cache shared between laptops and runners.",
  },
  {
    id: "cache",
    title: "How does the remote cache stay correct?",
    content:
      "Every task is keyed by a hash of its inputs: source files, lockfile entries, environment variables you declare and the output of upstream tasks. If any input changes, the key changes. Artifacts are signed, so a poisoned cache entry is rejected.",
  },
  {
    id: "monorepo",
    title: "Does it work with pnpm, Nx or Turborepo?",
    content:
      "Yes. Forge reads pnpm and npm workspaces, Nx project graphs and turbo.json pipelines directly, so there is nothing to migrate. Bun and Yarn Berry workspaces are supported since 3.1.",
  },
  {
    id: "host",
    title: "Where does my code run?",
    content:
      "Builds run on Forge runners in the region closest to your repo, or on your own machines with forge runner start. Enterprise customers can keep the cache and runners inside their own VPC.",
  },
  {
    id: "rollback",
    title: "What exactly happens during a rollback?",
    content:
      "Each deploy is an immutable bundle with its own URL. A rollback moves the production alias to an earlier bundle and purges the edge cache, which takes about 600 milliseconds worldwide.",
  },
  {
    id: "leave",
    title: "Can I leave if it is not for us?",
    content:
      "Your config is a single forge.toml next to package.json and builds produce standard output folders. Delete the file and your project builds the way it did before.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="hbl-dv-rule relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <FadeInView className="min-w-0">
          <SectionHead
            label="FAQ"
            title="Questions engineers ask first."
            body={
              <>
                Still curious? Read the{" "}
                <a href="#faq" className="text-[#f4f4f0] underline decoration-[#a3e635]/50 underline-offset-4 hover:decoration-[#a3e635]">
                  architecture notes
                </a>{" "}
                or ask in the community Discord, where the core team answers within a day.
              </>
            }
          />
        </FadeInView>
        <FadeInView delay={0.1} className="hbl-dv-faq min-w-0">
          <Accordion items={faqs} defaultOpen={["cache"]} />
        </FadeInView>
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section id="start" className="relative px-4 pb-24 sm:px-6 sm:pb-32">
      <FadeInView className="relative mx-auto max-w-[1200px]">
        <Corners />
        <div className="relative isolate overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,rgba(163,230,53,0.14),transparent_70%),linear-gradient(180deg,#111112,#0b0b0c)] px-6 py-20 text-center sm:px-12 sm:py-28">
          <DotGrid size={18} dotColor="rgba(244,244,240,0.09)" glowColor="#a3e635" radius={200} intensity={0.9} className="-z-10" />
          <p className="hbl-dv-label justify-center">Get started</p>
          <h2 className="hbl-dv-h2 mx-auto mt-6 max-w-[760px] text-[#f4f4f0]">
            Your next deploy takes <span className="text-[#a3e635]">nine seconds.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-relaxed text-[#a3a39b] sm:text-[17px]">
            Install the CLI, run one command in your repo and get a preview URL before your coffee cools.
          </p>
          <div className="mx-auto mt-9 flex max-w-full items-center justify-center">
            <div className="flex h-12 max-w-full items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-[#0b0b0c] px-5 font-mono text-[13.5px] text-[#f4f4f0] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <span className="text-[#a3e635]" aria-hidden="true">❯</span>
              <span className="sr-only">Run forge init, then forge deploy</span>
              <Typewriter
                words={["forge init", "forge deploy", "forge deploy --prod", "forge rollback"]}
                typeSpeed={70}
                deleteSpeed={35}
                pause={1500}
                cursor="▍"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#pricing" className="hbl-dv-btn hbl-dv-btn-acid w-full sm:w-auto">
              Start deploying free
              <ArrowRight />
            </a>
            <a href="#benchmarks" className="hbl-dv-btn hbl-dv-btn-ghost w-full sm:w-auto">
              See the benchmarks
            </a>
          </div>
        </div>
      </FadeInView>
    </section>
  );
}

export function Footer() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
      <FooterColumns
        className="hbl-dv-foot"
        accent="#a3e635"
        logo={
          <>
            <ForgeMark className="h-6 w-6" />
            <span className="tracking-[-0.04em]">forge</span>
          </>
        }
        blurb="Build, preview and deploy TypeScript monorepos from one command. Made for teams who ship every day."
        socials={[
          { name: "github", href: "#top" },
          { name: "x", href: "#top" },
          { name: "youtube", href: "#top" },
        ]}
        newsletterTitle="Release notes, every other Friday"
        columns={[
          {
            title: "Product",
            links: [
              { label: "Previews", href: "#product" },
              { label: "Remote cache", href: "#product" },
              { label: "Benchmarks", href: "#benchmarks" },
              { label: "Pricing", href: "#pricing" },
            ],
          },
          {
            title: "Developers",
            links: [
              { label: "CLI reference", href: "#faq" },
              { label: "forge.toml", href: "#faq" },
              { label: "Changelog", href: "#top" },
              { label: "Status", href: "#top" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "About", href: "#top" },
              { label: "Customers", href: "#top" },
              { label: "Careers", href: "#top" },
              { label: "Security", href: "#faq" },
            ],
          },
        ]}
        legal={[
          { label: "Privacy", href: "#top" },
          { label: "Terms", href: "#top" },
          { label: "DPA", href: "#top" },
        ]}
        copyright="© 2026 Forge Systems, Inc."
        status={{ label: "All regions operational", tone: "ok" }}
      />
    </div>
  );
}
