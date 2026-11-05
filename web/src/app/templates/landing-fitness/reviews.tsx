import { ReviewCard } from "@/registry/hyperblur/review-card";
import { StarRating } from "@/registry/hyperblur/star-rating";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";

const reviews = [
  {
    name: "Maya Okafor",
    date: "Oct 2026",
    title: "From zero pull-ups to five",
    text: "I came in after two years of only running. Dana had me doing banded pull-ups in week one and strict ones by month four. The 6 AM crew is the reason I get out of bed.",
    helpful: 48,
  },
  {
    name: "Theo Lindqvist",
    date: "Sep 2026",
    title: "Small classes, real coaching",
    text: "Twelve people max means the coach actually watches your squat. I added 40 kg to my deadlift in a year without a single tweak to my back.",
    helpful: 31,
  },
  {
    name: "Rosa Delgado",
    date: "Sep 2026",
    title: "Boxing on Thursdays is the best hour of my week",
    text: "Ray is patient and very funny. I was nervous about hitting pads in front of people and that lasted about four minutes.",
    helpful: 27,
  },
  {
    name: "Kenji Arai",
    date: "Aug 2026",
    title: "24/7 access actually matters",
    text: "I work nights at the hospital. Being able to lift at 2 AM with my own program and then catch a Saturday class is exactly what I needed.",
    helpful: 19,
  },
  {
    name: "Priya Raman",
    date: "Jul 2026",
    title: "My kids beg to go",
    text: "Both of mine are in Junior Athletes. Ines teaches them to land, jump and lift with good habits, and they come home tired and proud.",
    helpful: 22,
  },
  {
    name: "Owen Brask",
    date: "Jun 2026",
    title: "Mobility Reset fixed my shoulder",
    text: "Six weeks of Sunday mobility and my overhead press stopped pinching. Wish I had found this place before paying for two rounds of PT.",
    helpful: 15,
  },
];

const bars = [
  { s: 5, pct: 91 },
  { s: 4, pct: 7 },
  { s: 3, pct: 1 },
  { s: 2, pct: 1 },
  { s: 1, pct: 0 },
];

export function FitnessReviews() {
  return (
    <section aria-labelledby="hbl-ft-reviews-title" className="hbl-ft-reviews py-24 md:py-32">
      <div className="hbl-ft-wrap grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,2fr)]">
        <FadeInView className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <p className="hbl-ft-kicker">Members</p>
          <h2 id="hbl-ft-reviews-title" className="hbl-ft-h2 mt-5">
            Don&apos;t take <span className="hbl-ft-lime">our word</span>
          </h2>
          <div className="mt-8 flex items-end gap-4">
            <span className="font-mono text-[72px] leading-none tracking-[-0.05em]">4.9</span>
            <div className="pb-2">
              <StarRating value={5} readOnly size={18} color="#c8ff3d" aria-label="4.9 out of 5 stars" />
              <p className="mt-1 text-[13px] hbl-ft-muted">612 Google reviews</p>
            </div>
          </div>
          <ul className="mt-6 space-y-2" aria-label="Rating breakdown">
            {bars.map((b) => (
              <li key={b.s} className="flex items-center gap-3 font-mono text-[12px] hbl-ft-muted">
                <span className="w-3">{b.s}</span>
                <span className="hbl-ft-rbar" aria-hidden="true">
                  <span style={{ width: `${b.pct}%` }} />
                </span>
                <span className="w-9 text-right">{b.pct}%</span>
              </li>
            ))}
          </ul>
        </FadeInView>
        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          {reviews.map((r, i) => (
            <FadeInView key={r.name} delay={(i % 2) * 0.08} className="min-w-0">
              <ReviewCard
                rating={5}
                name={r.name}
                date={r.date}
                title={r.title}
                text={r.text}
                helpful={r.helpful}
                verified
                lines={4}
                className="hbl-ft-review h-full"
              />
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
