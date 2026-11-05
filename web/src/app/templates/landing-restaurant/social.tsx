import { ReviewCard } from "@/registry/hyperblur/review-card";
import { RatingSummary } from "@/registry/hyperblur/rating-summary";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Embers } from "./art";
import { Ico, icons } from "./icons";

const reviews = [
  {
    name: "Marisol Ortega",
    date: "Oct 28",
    title: "The lamb is worth the trip",
    text: "We sat at the chef's counter and watched Leila pull the lamb out of the embers. Smoky, soft, gone in ten minutes. Ana found us a Sicilian red we are still talking about.",
    helpful: 41,
  },
  {
    name: "Daniel Okafor",
    date: "Oct 19",
    title: "Best birthday dinner in years",
    text: "Booked the Olive Room for twelve. Printed menus with my name, a cake from the hearth, and the team handled two nut allergies without any fuss at all.",
    helpful: 27,
  },
  {
    name: "Hana Sato",
    date: "Oct 11",
    title: "Octopus, then octopus again",
    text: "Ordered the charred octopus, then a second plate before dessert. The terrace with the string lights on a foggy night is the coziest place in Hayes Valley.",
    helpful: 33,
  },
  {
    name: "Theo Laurent",
    date: "Sep 30",
    title: "Natural wine done properly",
    text: "Not a funky-for-the-sake-of-it list. Clean, interesting bottles at fair prices, and they pour a taste of anything before you commit to a glass.",
    helpful: 19,
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="hbl-rs-section hbl-rs-reviews">
      <Embers count={16} className="hbl-rs-reviews-embers" />
      <div className="hbl-rs-wrap">
        <div className="hbl-rs-reviews-grid">
          <div className="hbl-rs-min0 hbl-rs-reviews-side">
            <p className="hbl-rs-kicker hbl-rs-kicker-light">Guest reviews</p>
            <h2 className="hbl-rs-h2 hbl-rs-h2-light">
              &ldquo;Like eating at a friend&apos;s house, <em>if your friend cooked over fire.</em>&rdquo;
            </h2>
            <p className="hbl-rs-mono hbl-rs-reviews-src">Hearth &amp; Vine Quarterly, autumn issue</p>
            <div className="hbl-rs-summary">
              <RatingSummary counts={{ 5: 1080, 4: 150, 3: 36, 2: 12, 1: 6 }} color="#e7a93b" showPercent />
            </div>
          </div>
          <div className="hbl-rs-review-list">
            {reviews.map((r, i) => (
              <FadeInView key={r.name} delay={(i % 2) * 0.1} distance={18} className="hbl-rs-min0">
                <ReviewCard
                  className="hbl-rs-review"
                  rating={5}
                  name={r.name}
                  date={r.date}
                  title={r.title}
                  text={r.text}
                  verified
                  helpful={r.helpful}
                  lines={4}
                />
              </FadeInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const menus = [
  {
    name: "The Hearth",
    courses: "5 courses",
    price: 85,
    pairing: 55,
    text: "A first visit done right: bread, three small plates, one from the fire and dessert.",
    items: ["Hearth sourdough and labneh", "Charred octopus", "Whole dorade or half chicken", "Olive oil cake"],
    featured: false,
  },
  {
    name: "The Long Table",
    courses: "8 courses",
    price: 125,
    pairing: 75,
    text: "The way Leila likes to cook for friends. Most of the menu, served in waves to share.",
    items: ["Everything in The Hearth", "Seven-hour lamb shoulder", "Saffron rice with clams", "Burnt honey tart and petits fours"],
    featured: true,
  },
  {
    name: "Chef's Counter",
    courses: "10 courses",
    price: 185,
    pairing: 95,
    text: "Ten seats facing the fire. Off-menu dishes, cooked and served by the chefs themselves.",
    items: ["Courses from the day's market", "Dry-aged ribeye from the embers", "Rare pours from the cellar", "Thursday to Saturday, 7:30 PM"],
    featured: false,
  },
];

export function Tasting() {
  return (
    <section id="tasting" className="hbl-rs-section hbl-rs-tasting">
      <div className="hbl-rs-wrap">
        <div className="hbl-rs-head hbl-rs-head-center">
          <p className="hbl-rs-kicker">Tasting menus</p>
          <h2 className="hbl-rs-h2">
            Let the kitchen <em>choose for you.</em>
          </h2>
          <p className="hbl-rs-sub">For the whole table. Vegetarian versions of every menu on request.</p>
        </div>
        <div className="hbl-rs-tiers">
          {menus.map((m, i) => (
            <FadeInView key={m.name} delay={i * 0.08} distance={20} className="hbl-rs-min0">
              <article className={m.featured ? "hbl-rs-tier hbl-rs-tier-featured" : "hbl-rs-tier"}>
                {m.featured && <span className="hbl-rs-tier-flag hbl-rs-mono">Most booked</span>}
                <p className="hbl-rs-mono hbl-rs-tier-courses">{m.courses}</p>
                <h3>{m.name}</h3>
                <p className="hbl-rs-tier-price">
                  <span className="hbl-rs-tier-num">${m.price}</span>
                  <span className="hbl-rs-tier-per">per guest</span>
                </p>
                <p className="hbl-rs-tier-text">{m.text}</p>
                <ul>
                  {m.items.map((it) => (
                    <li key={it}>
                      <Ico size={15} stroke={2}>{icons.check}</Ico>
                      {it}
                    </li>
                  ))}
                </ul>
                <p className="hbl-rs-mono hbl-rs-tier-pair">
                  <Ico size={14}>{icons.wine}</Ico>
                  Wine pairing +${m.pairing}
                </p>
                <a href="#reserve" className={m.featured ? "hbl-rs-btn hbl-rs-btn-primary hbl-rs-btn-block" : "hbl-rs-btn hbl-rs-btn-ghost hbl-rs-btn-block"}>
                  Reserve this menu
                </a>
              </article>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
