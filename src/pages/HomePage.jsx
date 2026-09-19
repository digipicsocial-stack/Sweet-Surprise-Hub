import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { api } from "../lib/api";
import { MaskedLines, Reveal, ParallaxImage, EASE } from "../components/motion";
import EditorialMarquee from "../components/EditorialMarquee";
import ProductCard from "../components/ProductCard";
import Newsletter from "../components/Newsletter";

const HERO_IMG = "https://images.pexels.com/photos/6487798/pexels-photo-6487798.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&dpr=2";
const BUILDER_IMG = "https://images.pexels.com/photos/18434553/pexels-photo-18434553.jpeg?auto=compress&cs=tinysrgb&w=1200";

const MANIFESTO = [
  { n: "01", title: "Single-origin cacao", copy: "Sourced from small estates, fermented slow, stone-ground for 72 hours until it turns to silk." },
  { n: "02", title: "Hand-poured ganache", copy: "No moulds stamped by machines. Every truffle is rolled, dipped and dusted by hand." },
  { n: "03", title: "A surprise in every box", copy: "One golden bonbon hides in each gift box — a flavour that exists nowhere else on the menu." },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => {
      const best = res.data.filter((p) => p.tag === "Bestseller");
      setFeatured(best.length >= 3 ? best.slice(0, 3) : res.data.slice(0, 3));
    }).catch(() => {});
  }, []);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section ref={heroRef} className="relative flex min-h-screen items-end overflow-hidden">
        <motion.div style={{ y: imgY }} className="absolute inset-0">
          <motion.img
            src={HERO_IMG}
            alt="Handcrafted artisan chocolate truffles"
            initial={{ scale: 1.18 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: EASE }}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />

        <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-24 md:px-10 md:pb-32">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 1 }}
            className="overline-label mb-6"
          >
            Artisan Chocolaterie · Handcrafted in Small Batches
          </motion.p>

          <MaskedLines
            delay={0.3}
            className="font-display text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
            lines={[
              "Chocolate,",
              <em key="l2" className="text-gold">composed</em>,
              "like poetry.",
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.9, ease: EASE }}
            className="mt-7 max-w-md text-sm leading-relaxed text-cream/80 md:text-base"
          >
            Single-origin truffles, slow-set bars and gift boxes that hide a secret
            inside — made to order in our atelier.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/shop"
              data-testid="hero-shop-cta"
              className="group flex items-center gap-3 bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink transition-colors duration-300 hover:bg-gold-light"
            >
              Shop the Collection
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/builder"
              data-testid="hero-builder-cta"
              className="border border-cream/30 px-8 py-4 text-xs uppercase tracking-[0.25em] text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Build a Surprise Box
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-3 md:right-10 md:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-cream/50 [writing-mode:vertical-rl]">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ArrowDown size={14} className="text-gold" />
          </motion.div>
        </motion.div>
      </section>

      <EditorialMarquee />

      {/* FEATURED */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36" data-testid="featured-section">
        <Reveal className="mb-14 flex items-end justify-between gap-6 md:mb-20">
          <div>
            <p className="overline-label mb-4">The Collection</p>
            <h2 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
              Signature <em className="text-gold">pieces</em>
            </h2>
          </div>
          <Link to="/shop" className="link-underline hidden text-xs uppercase tracking-[0.25em] text-sand hover:text-cream md:block" data-testid="featured-view-all-link">
            View all twelve
          </Link>
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featured.length === 0
            ? [0, 1, 2].map((i) => (
                <div key={i} className="aspect-[4/5] animate-pulse border border-bark bg-cocoa" />
              ))
            : featured.map((p, i) => (
                <div key={p.id} className={i === 1 ? "lg:translate-y-14" : ""}>
                  <ProductCard product={p} index={i} />
                </div>
              ))}
        </div>

        <Reveal className="mt-14 text-center md:hidden">
          <Link to="/shop" className="link-underline text-xs uppercase tracking-[0.25em] text-gold" data-testid="featured-view-all-link-mobile">
            View the full collection
          </Link>
        </Reveal>
      </section>

      {/* MANIFESTO TEASER */}
      <section className="border-y border-bark bg-cocoa/40" data-testid="manifesto-section">
        <div className="mx-auto grid max-w-[1400px] md:grid-cols-3">
          {MANIFESTO.map((m, i) => (
            <Reveal key={m.n} delay={i * 0.12} className={`px-8 py-14 md:px-12 md:py-20 ${i > 0 ? "border-t border-bark md:border-l md:border-t-0" : ""}`}>
              <p className="font-display text-6xl font-light text-gold/25 md:text-7xl">{m.n}</p>
              <h3 className="mt-6 font-display text-2xl tracking-tight">{m.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-sand">{m.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BUILDER TEASER */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36" data-testid="builder-teaser-section">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <ParallaxImage src={BUILDER_IMG} alt="Chocolate gift box with dried flowers" className="aspect-[4/3] border border-bark" />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="overline-label mb-4">The Surprise Box</p>
            <h2 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
              Every box hides <em className="text-gold">a secret</em>.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-sand">
              Choose your size, hand-pick the fillings, and select the ribbon. We
              compose the box in our atelier — and slip in one bonbon that isn't on
              any menu.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-cream/85">
              {["Pick Petite, Grand or Royal", "Select up to six atelier fillings", "Gold silk, ivory satin or noir velvet ribbon"].map((t, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="text-[8px] text-gold">◆</span> {t}
                </li>
              ))}
            </ul>
            <Link
              to="/builder"
              data-testid="builder-teaser-cta"
              className="group mt-10 inline-flex items-center gap-3 bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink transition-colors duration-300 hover:bg-gold-light"
            >
              Build Your Box
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}