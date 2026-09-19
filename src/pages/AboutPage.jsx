import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MaskedLines, Reveal, ParallaxImage } from "../components/motion";
import EditorialMarquee from "../components/EditorialMarquee";
import Newsletter from "../components/Newsletter";

const CHAPTERS = [
  {
    n: "01",
    title: "Origins",
    img: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=1000",
    copy: "SweetSurpriseHub began at a kitchen counter with a single copper pot and a stubborn belief — that chocolate should be an event, not an errand. What started as boxes for friends became an atelier, and the boxes never stopped carrying that first intention.",
  },
  {
    n: "02",
    title: "Craft",
    img: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=1000",
    copy: "We stone-ground cacao for 72 hours, temper by hand on marble, and pour ganache in batches small enough to know by name. No preservatives, no shortcuts — only time, temperature and patience.",
  },
  {
    n: "03",
    title: "Ingredients",
    img: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1000&q=80",
    copy: "Single-estate cacao, Kashmiri saffron, damask rose, flaky sea salt, slow-roasted hazelnuts. Every ingredient is traced to its source and chosen for character, not convenience.",
  },
  {
    n: "04",
    title: "The Surprise",
    img: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1000&q=80",
    copy: "Every gift box hides one golden bonbon — a flavour that appears on no menu and is never repeated. It is our signature, our secret, and the reason the last piece is always the one everyone argues over.",
  },
];

const STATS = [
  { value: "72hr", label: "Stone-ground cacao" },
  { value: "12", label: "Signature recipes" },
  { value: "100%", label: "Hand-poured" },
  { value: "1", label: "Secret in every box" },
];

export default function AboutPage() {
  return (
    <div className="pt-28 md:pt-40" data-testid="about-page">
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <p className="overline-label mb-6">Our Story</p>
        <MaskedLines
          className="font-display text-5xl font-light leading-[1.05] tracking-tight md:text-7xl"
          lines={["The house of", <em key="x" className="text-gold">sweet surprises</em>, "."]}
        />
        <Reveal delay={0.4} className="mt-8 max-w-xl">
          <p className="text-sm leading-relaxed text-sand md:text-base">
            An atelier built on a simple conviction: chocolate deserves ceremony.
            Four chapters, one obsession.
          </p>
        </Reveal>
      </header>

      <div className="mt-20 md:mt-28">
        {CHAPTERS.map((c, i) => (
          <section
            key={c.n}
            className={`border-t border-bark ${i % 2 === 1 ? "bg-cocoa/30" : ""}`}
            data-testid={`about-chapter-${c.n}`}
          >
            <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-6 py-16 md:grid-cols-12 md:gap-16 md:px-10 md:py-28">
              <Reveal className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <ParallaxImage src={c.img} alt={c.title} className="aspect-[4/3] border border-bark" speed={0.1} />
              </Reveal>
              <Reveal delay={0.15} className={`md:col-span-7 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <p className="font-display text-7xl font-light leading-none text-gold/20 md:text-8xl">{c.n}</p>
                <h2 className="mt-4 font-display text-3xl tracking-tight md:text-4xl">{c.title}</h2>
                <p className="mt-6 max-w-lg text-sm leading-relaxed text-sand md:text-base">{c.copy}</p>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <EditorialMarquee />

      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28" data-testid="about-stats">
        <div className="grid grid-cols-2 gap-px border border-bark bg-bark md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="bg-ink px-8 py-12 text-center md:py-16">
              <p className="font-display text-4xl text-gold md:text-5xl">{s.value}</p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-sand">{s.label}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 text-center">
          <Link
            to="/shop"
            data-testid="about-shop-cta"
            className="group inline-flex items-center gap-3 bg-gold px-10 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink transition-colors duration-300 hover:bg-gold-light"
          >
            Taste the Story
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      <Newsletter />
    </div>
  );
}