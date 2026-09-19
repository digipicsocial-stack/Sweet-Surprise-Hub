import { useState } from "react";
import { Phone, Mail, Clock, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import { api } from "../lib/api";
import { MaskedLines, Reveal } from "../components/motion";

const SUBJECTS = ["General", "Bulk / Corporate Orders", "Wedding Favours", "Custom Surprise Box", "Feedback"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "General", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/enquiries", form);
      setSent(true);
      toast.success("Your message reached the atelier.");
    } catch {
      toast.error("Could not send — please try again or call us.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 md:pt-40" data-testid="contact-page">
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <p className="overline-label mb-6">Contact</p>
        <MaskedLines
          className="font-display text-5xl font-light leading-[1.05] tracking-tight md:text-7xl"
          lines={["Write to", "the", <em key="a" className="text-gold">atelier</em>, "."]}
        />
      </header>

      <section className="mx-auto grid max-w-[1400px] gap-16 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-5 lg:gap-20">
        <Reveal className="lg:col-span-2">
          <p className="max-w-md text-sm leading-relaxed text-sand">
            Wedding favours, corporate gifting, or a box built around someone's
            favourite flavour — tell us what you're dreaming of and we'll answer
            within a day.
          </p>

          <ul className="mt-12 space-y-8">
            <li className="flex gap-5">
              <Phone size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-gold" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-sand/60">Call the atelier</p>
                <a href="tel:+919624257201" className="mt-2 block font-display text-xl transition-colors hover:text-gold" data-testid="contact-phone-1">+91 96242 57201</a>
                <a href="tel:+919016890300" className="mt-1 block font-display text-xl transition-colors hover:text-gold" data-testid="contact-phone-2">+91 90168 90300</a>
              </div>
            </li>
            <li className="flex gap-5">
              <Mail size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-gold" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-sand/60">Write to us</p>
                <a href="mailto:sweetsurprisehub@gmail.com" className="mt-2 block font-display text-xl transition-colors hover:text-gold" data-testid="contact-email-link">
                  sweetsurprisehub@gmail.com
                </a>
              </div>
            </li>
            <li className="flex gap-5">
              <Clock size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-gold" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-sand/60">Atelier hours</p>
                <p className="mt-2 font-display text-xl">Mon – Sat, 10am – 8pm IST</p>
                <p className="mt-1 text-xs text-sand">Ships across India in insulated, ribbon-tied boxes</p>
              </div>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-3">
          {sent ? (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-5 border border-gold/30 bg-cocoa/40 p-10 text-center" data-testid="contact-success">
              <CheckCircle2 size={44} strokeWidth={1} className="text-gold" />
              <p className="font-display text-3xl italic">Message received.</p>
              <p className="max-w-sm text-sm leading-relaxed text-sand">
                Thank you, {form.name.split(" ")[0]}. Your note is with the atelier —
                expect a reply within a day.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", subject: "General", message: "" }); }}
                data-testid="contact-send-another-btn"
                className="mt-2 border border-gold px-8 py-3 text-xs uppercase tracking-[0.25em] text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="border border-bark bg-cocoa/30 p-8 md:p-12" data-testid="contact-form">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-sand">Your Name *</label>
                  <input required value={form.name} onChange={set("name")} className="flush-input" placeholder="Aarav Shah" data-testid="contact-name-input" />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-sand">Email *</label>
                  <input required type="email" value={form.email} onChange={set("email")} className="flush-input" placeholder="you@example.com" data-testid="contact-email-input" />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-sand">Phone</label>
                  <input value={form.phone} onChange={set("phone")} className="flush-input" placeholder="98765 43210" data-testid="contact-phone-input" />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-sand">Subject</label>
                  <select value={form.subject} onChange={set("subject")} className="flush-input cursor-pointer appearance-none bg-transparent" data-testid="contact-subject-select">
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s} className="bg-cocoa text-cream">{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-8">
                <label className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-sand">Message *</label>
                <textarea required rows={5} value={form.message} onChange={set("message")} className="flush-input resize-none" placeholder="Tell us about the occasion…" data-testid="contact-message-input" />
              </div>
              <button
                type="submit"
                disabled={loading}
                data-testid="contact-submit-btn"
                className="group mt-10 flex items-center gap-3 bg-gold px-10 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink transition-colors duration-300 hover:bg-gold-light disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send Message"}
                <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>
            </form>
          )}
        </Reveal>
      </section>
    </div>
  );
}