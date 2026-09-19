import Marquee from "react-fast-marquee";

const ITEMS = [
  "Artisan Crafted",
  "Single Origin",
  "Hand Poured",
  "Small Batch",
  "Bean to Bonbon",
  "Made to Surprise",
];

export default function EditorialMarquee() {
  return (
    <div className="border-y border-bark bg-ink py-6" data-testid="editorial-marquee">
      <Marquee speed={35} gradient={false} pauseOnHover>
        {ITEMS.map((item, i) => (
          <span
            key={i}
            className="mx-10 flex items-center gap-20 text-xs uppercase tracking-[0.4em] text-sand md:text-sm"
          >
            {item}
            <span className="text-[8px] text-gold">◆</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}