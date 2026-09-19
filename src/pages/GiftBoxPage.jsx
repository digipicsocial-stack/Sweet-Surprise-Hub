import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Gift } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { formatINR } from "../lib/api";
import { Reveal, ParallaxImage, EASE } from "../components/motion";

const BOX_IMG = "https://images.pexels.com/photos/33629666/pexels-photo-33629666.jpeg?auto=compress&cs=tinysrgb&w=1200";

const SIZES = [
  { id: "petite", name: "Petite Surprise", pieces: 9, price: 999, maxFlavors: 4, blurb: "Nine pieces for quiet evenings" },
  { id: "grand", name: "Grand Surprise", pieces: 16, price: 1499, maxFlavors: 5, blurb: "Sixteen pieces to share — or not", tag: "Most Loved" },
  { id: "royal", name: "Royal Surprise", pieces: 24, price: 1999, maxFlavors: 6, blurb: "Twenty-four pieces, gold-leaf finished" },
];

const FILLINGS = [
  "Midnight Noir",
  "Saffron Silk",
  "Rose & Cardamom",
  "Espresso Ember",
  "Sea Salt Caramel",
  "Hazelnut Praline",
  "Orange & Pistachio",
  "Toasted Coconut",
];

const RIBBONS = [
  { id: "gold", label: "Gold Silk", hex: "#D4AF37" },
  { id: "ivory", label: "Ivory Satin", hex: "#F4EFE6" },
  { id: "noir", label: "Noir Velvet", hex: "#1A1009" },
];

const STEPS = ["Box Size", "Fillings", "Finishing"];

export default function GiftBoxPage() {
  const [step, setStep] = useState(1);
  const [size, setSize] = useState(null);
  const [fillings, setFillings] = useState([]);
  const [ribbon, setRibbon] = useState(RIBBONS[0]);
  const [note, setNote] = useState("");
  const { addItem, openCart } = useCart();

  const toggleFilling = (f) => {
    if (fillings.includes(f)) {
      setFillings(fillings.filter((x) => x !== f));
    } else if (size && fillings.length >= size.maxFlavors) {
      toast.error(`The ${size.name} holds up to ${size.maxFlavors} flavours`);
    } else {
      setFillings([...fillings, f]);
    }
  };

  const addToBox = () => {
    addItem({
      id: `surprise-${size.id}-${Date.now()}`,
      name: `${size.name} — Custom Box`,
      price: size.price,
      image: BOX_IMG,
      meta: `${size.pieces} pieces · ${fillings.join(", ")} · ${ribbon.label} ribbon${note ? ` · “${note}”` : ""}`,
    });
    toast.success("Your surprise box is in the cart");
    openCart();
  };

  const canContinue = step === 1 ? !!size : step === 2 ? fillings.length > 0 : true;

  return (
    <div className="pt-28 md:pt-40" data-testid="gift-box-page">
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="overline-label mb-4">The Atelier Bench</p>
          <h1 className="font-display text-5xl leading-none tracking-tight md:text-7xl">
            Build your <em className="text-gold">Surprise Box</em>
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-sand">
            Three small rituals — a size, a handful of fillings, a ribbon. We compose,
            wrap and hide one golden bonbon inside.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex gap-8 border-t border-bark pt-8">
          {STEPS.map((s, i) => (
            <button
              key={s}
              onClick={() => i + 1 < step && setStep(i + 1)}
              data-testid={`builder-step-${i + 1}`}
              className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] transition-colors ${
                step === i + 1 ? "text-gold" : step > i + 1 ? "cursor-pointer text-cream/70 hover:text-gold" : "text-sand/40"
              }`}
            >
              <span className="font-display text-lg italic">0{i + 1}</span> {s}
            </button>
          ))}
        </Reveal>
      </header>

      <section className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:px-10 md:py-20 lg:grid-cols-2 lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <div className="relative">
            <ParallaxImage src={BOX_IMG} alt="Luxury chocolate gift box" className="aspect-[4/5] border border-bark" speed={0.08} />
            <div className="absolute inset-x-0 bottom-0 border-t border-bark bg-ink/85 p-6 backdrop-blur-md" data-testid="builder-live-summary">
              <div className="flex items-center justify-between">
                <p className="font-display text-xl italic">{size ? size.name : "Choose a size"}</p>
                <p className="text-gold">{size ? formatINR(size.price) : "—"}</p>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-sand/80">
                {fillings.length > 0 ? fillings.join(" · ") : "Fillings await"} · {ribbon.label} ribbon
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5, ease: EASE }}>
                <p className="overline-label mb-8">01 — Choose the size</p>
                <div className="space-y-4">
                  {SIZES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { setSize(s); setFillings((f) => f.slice(0, s.maxFlavors)); }}
                      data-testid={`builder-size-${s.id}`}
                      className={`group w-full border p-6 text-left transition-all duration-300 md:p-8 ${
                        size?.id === s.id ? "border-gold bg-cocoa/60" : "border-bark hover:border-gold/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h3 className="font-display text-2xl tracking-tight">{s.name}</h3>
                          {s.tag && <span className="border border-gold/40 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-gold">{s.tag}</span>}
                        </div>
                        <p className="text-gold">{formatINR(s.price)}</p>
                      </div>
                      <p className="mt-2 text-xs text-sand">{s.pieces} pieces · up to {s.maxFlavors} flavours — {s.blurb}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5, ease: EASE }}>
                <p className="overline-label mb-3">02 — Pick your fillings</p>
                <p className="mb-8 text-xs text-sand">Select up to {size?.maxFlavors} flavours ({fillings.length}/{size?.maxFlavors} chosen)</p>
                <div className="flex flex-wrap gap-3">
                  {FILLINGS.map((f) => {
                    const active = fillings.includes(f);
                    return (
                      <button
                        key={f}
                        onClick={() => toggleFilling(f)}
                        data-testid={`builder-filling-${f.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                        className={`border px-5 py-3 text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
                          active ? "border-gold bg-gold font-semibold text-ink" : "border-bark text-sand hover:border-gold/60 hover:text-cream"
                        }`}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-8 border-l-2 border-gold/40 pl-4 text-xs italic leading-relaxed text-sand/80">
                  Plus one golden bonbon — a flavour that exists nowhere else on the menu. That one's on us.
                </p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5, ease: EASE }}>
                <p className="overline-label mb-8">03 — Finishing touches</p>
                <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-sand">Ribbon</p>
                <div className="flex gap-3">
                  {RIBBONS.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRibbon(r)}
                      data-testid={`builder-ribbon-${r.id}`}
                      className={`flex items-center gap-3 border px-5 py-3 text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
                        ribbon.id === r.id ? "border-gold text-cream" : "border-bark text-sand hover:border-gold/60"
                      }`}
                    >
                      <span className="h-3.5 w-3.5 rounded-full border border-cream/20" style={{ backgroundColor: r.hex }} />
                      {r.label}
                    </button>
                  ))}
                </div>

                <p className="mb-2 mt-10 text-[10px] uppercase tracking-[0.2em] text-sand">Gift note (optional)</p>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="A few words tucked under the ribbon…"
                  className="flush-input resize-none"
                  data-testid="builder-note-input"
                />

                <div className="mt-10 border border-bark bg-cocoa/40 p-6" data-testid="builder-final-summary">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-2xl italic">{size?.name}</p>
                    <p className="font-display text-2xl text-gold">{size ? formatINR(size.price) : ""}</p>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-sand">
                    {size?.pieces} pieces · {fillings.join(", ")} · {ribbon.label} ribbon
                    {note && <span className="block mt-1 italic">“{note}”</span>}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 flex items-center gap-4">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                data-testid="builder-back-btn"
                className="flex items-center gap-2 border border-bark px-6 py-4 text-xs uppercase tracking-[0.25em] text-sand transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <ArrowLeft size={14} /> Back
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={() => canContinue && setStep(step + 1)}
                disabled={!canContinue}
                data-testid="builder-continue-btn"
                className="group flex flex-1 items-center justify-center gap-3 bg-gold py-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink transition-all duration-300 hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            ) : (
              <button
                onClick={addToBox}
                data-testid="builder-add-to-cart-btn"
                className="group flex flex-1 items-center justify-center gap-3 bg-gold py-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink transition-colors duration-300 hover:bg-gold-light"
              >
                <Gift size={15} /> Add to Box — {size ? formatINR(size.price) : ""}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}