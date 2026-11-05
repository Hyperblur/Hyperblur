import { RatingSummary } from "@/registry/hyperblur/rating-summary";
import { ReviewCard } from "@/registry/hyperblur/review-card";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { CountUp } from "@/registry/hyperblur/count-up";
import { ratingCounts, reviews } from "./data";

export function Reviews() {
  return (
    <section id="reviews" className="hbl-st-section hbl-st-reviews">
      <div className="hbl-st-wrap">
        <div className="hbl-st-reviews-grid">
          <FadeInView className="min-w-0">
            <p className="hbl-st-kicker hbl-st-kicker-light">Reviews</p>
            <h2 className="hbl-st-h2 font-serif">Kept, used, and reordered.</h2>
            <p className="hbl-st-sub hbl-st-sub-light">
              <CountUp to={94} suffix="%" /> of customers say their order looked better in person than on the screen.
            </p>
            <div className="hbl-st-summary">
              <RatingSummary counts={ratingCounts} color="#e7a27f" />
            </div>
          </FadeInView>
          <div className="hbl-st-review-list">
            {reviews.map((r, i) => (
              <FadeInView key={r.name} delay={i * 0.1} className="min-w-0">
                <ReviewCard
                  rating={r.rating}
                  name={r.name}
                  date={r.date}
                  title={r.title}
                  text={r.text}
                  helpful={r.helpful}
                  verified
                  lines={3}
                />
              </FadeInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
