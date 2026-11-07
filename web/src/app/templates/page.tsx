import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Templates",
  description: "Full page templates assembled from Hyperblur blocks and effects.",
};

const templates = [
  {
    slug: "landing",
    kind: "Marketing",
    title: "Landing page",
    text: "Hero, logo strip, features, testimonials, pricing, FAQ and a closing call to action.",
    tone: "from-[#1b2a6b] to-[#2f7bff]",
  },
  {
    slug: "landing-ai",
    kind: "Landing",
    title: "Agent platform",
    text: "Cadence: aurora hero, a live agent mockup, approval flows, integration beams and animated pricing.",
    tone: "from-[#2a1458] to-[#22d3ee]",
  },
  {
    slug: "landing-devtool",
    kind: "Landing",
    title: "Developer tool",
    text: "Forge: decoding headline, a live deploy terminal, command palette, benchmarks and a perspective grid floor.",
    tone: "from-[#16210a] to-[#a3e635]",
  },
  {
    slug: "landing-fintech",
    kind: "Landing",
    title: "Fintech payments",
    text: "Meridian: mesh gradient hero, tilting payment cards, a payout route map, treasury tabs and a fee table.",
    tone: "from-[#06173a] to-[#34d399]",
  },
  {
    slug: "landing-mobile",
    kind: "Landing",
    title: "Mobile app",
    text: "Fernly: a warm light page with floating phone mockups, a rotating serif headline and a flip-card carousel.",
    tone: "from-[#bef264] to-[#e07a5f]",
  },
  {
    slug: "landing-agency",
    kind: "Landing",
    title: "Creative agency",
    text: "Atlas & Oak: giant editorial type, velocity bands, pixel-reveal case studies and a magnetic contact CTA.",
    tone: "from-[#2b0f08] to-[#ff4f2e]",
  },
  {
    slug: "landing-productivity",
    kind: "Landing",
    title: "Productivity SaaS",
    text: "Tempo: a tilting product mockup, tabbed showcase, bento grid, integration beams and pricing.",
    tone: "from-[#3a1a0f] to-[#ff6b3d]",
  },
  {
    slug: "landing-clinic",
    kind: "Local business",
    title: "Dental clinic",
    text: "Halcyon Dental: a calm teal page with an interactive booking card, a before and after smile slider, first-visit steps, membership plans and a hand-drawn map.",
    tone: "from-[#0f3b3a] to-[#1fb5a6]",
  },
  {
    slug: "landing-restaurant",
    kind: "Local business",
    title: "Restaurant",
    text: "Ember & Olive: a rotating serif headline over an animated hearth, a live reservation card, a tabbed menu board and a room gallery.",
    tone: "from-[#2a1a12] to-[#c8553d]",
  },
  {
    slug: "landing-store",
    kind: "Local business",
    title: "Online store",
    text: "Haven Goods: a floating product hero, a live bag count, colour swatches, quick view, a shoppable lookbook and an offer popup.",
    tone: "from-[#23352b] to-[#b86b4b]",
  },
  {
    slug: "landing-fitness",
    kind: "Local business",
    title: "Fitness club",
    text: "Ironbloom: a dark, high-energy page with a decoding headline, a weekly class timetable you can book, rings, bars and plans.",
    tone: "from-[#0b0c0a] to-[#c8ff3d]",
  },
  {
    slug: "landing-salon",
    kind: "Local business",
    title: "Salon and barber",
    text: "Maison Rue: a blur-in serif headline, a stylist booking card, a services menu, a before and after slider and a lookbook mosaic.",
    tone: "from-[#3b1f2b] to-[#d9577a]",
  },
  {
    slug: "landing-lab",
    kind: "Landing",
    title: "Experiments shelf",
    text: "Vector Lab: a boot sequence, a 3D ring carousel of studies, a procedural isometric city with a route replay and a request form.",
    tone: "from-[#1a0507] to-[#ff4d4d]",
  },
  {
    slug: "pricing",
    kind: "Marketing",
    title: "Pricing page",
    text: "Three tiers, a plan comparison table, what every plan includes, billing FAQ.",
    tone: "from-[#0f4b52] to-[#19c3f5]",
  },
  {
    slug: "portfolio",
    kind: "Personal",
    title: "Portfolio",
    text: "A designer's site: animated intro, selected work in a bento grid, about, stats and quotes.",
    tone: "from-[#3a1f5c] to-[#8b5cf6]",
  },
  {
    slug: "auth",
    kind: "App",
    title: "Sign in",
    text: "Two-column sign-in page with an animated brand panel and the login card.",
    tone: "from-[#1f2937] to-[#4b5563]",
  },
  {
    slug: "dashboard",
    kind: "App",
    title: "Dashboards",
    text: "Six complete app screens: analytics, sales, projects, finance, admin users and orders.",
    tone: "from-[#102a43] to-[#2f7bff]",
  },
  {
    slug: "shop",
    kind: "E-commerce",
    title: "Shop listing",
    text: "A product listing page with filter chips, sorting, a product grid, pagination and a full footer.",
    tone: "from-[#14452f] to-[#34d399]",
  },
  {
    slug: "coming-soon",
    kind: "Launch",
    title: "Coming soon",
    text: "Full-screen launch page with a starfield, a split-flap headline and a countdown.",
    tone: "from-[#5b1b6b] to-[#ff2fa0]",
  },
];

export default function TemplatesIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Templates</h1>
      <p className="mt-2 max-w-xl text-muted">
        Full pages assembled only from Hyperblur blocks and effects, to show how they compose into a
        real site. Open one, then install the pieces you want.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {templates.map((t) => (
          <article
            key={t.slug}
            className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-2"
          >
            <Link
              href={`/templates/${t.slug}`}
              aria-label={`Open the ${t.title} template`}
              className={`block aspect-video border-b border-line bg-gradient-to-br bg-cover bg-top transition-opacity hover:opacity-90 ${t.tone}`}
              style={{ backgroundImage: `url(/templates/${t.slug}.jpg)` }}
            />
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">{t.kind}</p>
                <h2 className="mt-2 text-lg font-semibold">{t.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{t.text}</p>
              </div>
              <div className="mt-6">
                <Link href={`/templates/${t.slug}`} className="hb-btn hb-btn-primary">
                  Open
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
