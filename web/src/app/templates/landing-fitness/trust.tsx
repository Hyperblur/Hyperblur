import { AvatarStack } from "@/registry/hyperblur/avatar-stack";
import { CountUp } from "@/registry/hyperblur/count-up";
import { StarRating } from "@/registry/hyperblur/star-rating";
import { Marquee } from "@/registry/hyperblur/marquee";

const people = [
  { name: "Maya Okafor", color: "#c8ff3d" },
  { name: "Theo Lindqvist", color: "#f1f0e8" },
  { name: "Rosa Delgado", color: "#ff5a1f" },
  { name: "Kenji Arai", color: "#8b8f82" },
  { name: "Priya Raman", color: "#c8ff3d" },
];

const press = [
  "Willamette Week · Best Gym 2025",
  "Portland Monthly · Top 10 Studios",
  "NSCA-certified coaching staff",
  "USA Weightlifting club",
  "Precision Nutrition coaches",
  "Est. 2014 on SE Water Ave",
];

export function FitnessTrust() {
  return (
    <section aria-label="Why members trust Ironbloom" className="border-b hbl-ft-rule">
      <div className="hbl-ft-wrap grid gap-8 py-12 md:grid-cols-3 md:items-center">
        <div className="flex min-w-0 items-center gap-4">
          <AvatarStack people={people} size={40} ring="#0b0c0a" extra={1835} max={5} />
          <p className="text-sm hbl-ft-muted">
            <b className="font-mono text-base text-[#f1f0e8]">
              <CountUp to={1840} />
            </b>{" "}
            active members
          </p>
        </div>
        <div className="flex min-w-0 items-center gap-3 md:justify-center">
          <StarRating value={4.9} readOnly precision={0.5} size={20} color="#c8ff3d" aria-label="Rated 4.9 out of 5" />
          <p className="text-sm hbl-ft-muted">
            <b className="font-mono text-base text-[#f1f0e8]">4.9</b> from 612 Google reviews
          </p>
        </div>
        <p className="min-w-0 text-sm hbl-ft-muted md:text-right">
          <b className="font-mono text-base text-[#f1f0e8]">
            <CountUp to={11} />
          </b>{" "}
          years coaching the Eastside
        </p>
      </div>
      <div className="border-t py-5 hbl-ft-rule">
        <Marquee speed={0.6} gap={56} aria-label="Press and certifications">
          {press.map((p) => (
            <span key={p} className="hbl-ft-press">
              {p}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
