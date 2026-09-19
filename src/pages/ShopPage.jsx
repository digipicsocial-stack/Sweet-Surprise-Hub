import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { api } from "../lib/api";
import { Reveal } from "../components/motion";
import ProductCard from "../components/ProductCard";
import EditorialMarquee from "../components/EditorialMarquee";

const CATEGORIES = [
  { id: "All", label: "All", testid: "filter-all" },
  { id: "Truffles", label: "Truffles", testid: "filter-truffles" },
  { id: "Bars", label: "Bars", testid: "filter-bars" },
  { id: "Gift Boxes", label: "Gift Boxes", testid: "filter-gift-boxes" },
];

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const visible = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="pt-28 md:pt-40" data-testid="shop-page">
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="overline-label mb-4">Shop</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1 className="font-display text-5xl leading-none tracking-tight md:text-7xl">
              The <em className="text-gold">Collection</em>
            </h1>
            <p className="pb-2 text-xs uppercase tracking-[0.25em] text-sand" data-testid="product-count">
              {visible.length} {visible.length === 1 ? "piece" : "pieces"}
            </p>
          </div>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-sand">
            Twelve signatures from the atelier — truffles rolled by hand, bars set
            slow, and boxes that keep a secret.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap gap-3 border-t border-bark pt-8">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              data-testid={c.testid}
              className={`px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] transition-all duration-300 ${
                filter === c.id
                  ? "bg-gold font-semibold text-ink"
                  : "border border-bark text-sand hover:border-gold hover:text-gold"
              }`}
            >
              {c.label}
            </button>
          ))}
        </Reveal>
      </header>

      <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
        {loading ? (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse border border-bark bg-cocoa" />
            ))}
          </div>
        ) : (
          <div key={filter} className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      <EditorialMarquee />

      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28" data-testid="shop-builder-banner">
        <Reveal className="flex flex-col items-start justify-between gap-8 border border-bark bg-cocoa/40 p-10 md:flex-row md:items-center md:p-16">
          <div>
            <p className="overline-label mb-3">Can't decide?</p>
            <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
              Let the box <em className="text-gold">surprise you</em>.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-sand">
              Compose your own gift box — size, fillings and ribbon — and we'll hide
              a golden bonbon inside.
            </p>
          </div>
          <Link
            to="/builder"
            data-testid="shop-builder-cta"
            className="group flex shrink-0 items-center gap-3 bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink transition-colors duration-300 hover:bg-gold-light"
          >
            Build a Surprise Box
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}