import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "../lib/api";
import { Reveal } from "./motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/newsletter", { email });
      setDone(true);
      toast.success("You're on the list. Sweet things ahead.");
    } catch {
      toast.error("Something went wrong — please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-t border-bark bg-cocoa/40" data-testid="newsletter-section">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="overline-label mb-4">The Atelier Letters</p>
            <h2 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
              First taste of every <em className="text-gold">new creation</em>.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-sand">
              Seasonal truffles, limited bars and atelier stories — posted rarely,
              written carefully. No noise, only chocolate.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            {done ? (
              <div className="flex items-center gap-4 border border-gold/30 bg-ink p-8" data-testid="newsletter-success">
                <CheckCircle2 size={28} strokeWidth={1} className="shrink-0 text-gold" />
                <div>
                  <p className="font-display text-xl italic">You're in.</p>
                  <p className="mt-1 text-xs text-sand">Watch your inbox — the next letter is being written.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="flex items-end gap-4 border border-bark bg-ink p-6 md:p-8">
                <div className="flex-1">
                  <label className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-sand">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="flush-input"
                    data-testid="newsletter-email-input"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="newsletter-submit-btn"
                  className="group flex h-12 w-12 shrink-0 items-center justify-center bg-gold text-ink transition-colors duration-300 hover:bg-gold-light disabled:opacity-60"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}