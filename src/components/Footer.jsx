import { Link } from "react-router-dom";
import { Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-bark bg-ink" data-testid="site-footer">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl italic tracking-tight md:text-4xl">
              Sweet<span className="text-gold">Surprise</span>Hub
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand">
              Small-batch artisan chocolate, hand-poured and ribbon-tied. Every box
              leaves our atelier hiding a little surprise.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="overline-label mb-6">Explore</p>
            <ul className="space-y-3 text-sm text-sand">
              <li><Link to="/shop" className="link-underline transition-colors hover:text-cream" data-testid="footer-shop-link">The Collection</Link></li>
              <li><Link to="/builder" className="link-underline transition-colors hover:text-cream" data-testid="footer-builder-link">Build a Surprise Box</Link></li>
              <li><Link to="/about" className="link-underline transition-colors hover:text-cream" data-testid="footer-about-link">Our Story</Link></li>
              <li><Link to="/contact" className="link-underline transition-colors hover:text-cream" data-testid="footer-contact-link">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="overline-label mb-6">Reach the Atelier</p>
            <ul className="space-y-4 text-sm text-sand">
              <li className="flex items-center gap-3">
                <Phone size={15} strokeWidth={1.5} className="text-gold" />
                <a href="tel:+919624257201" className="transition-colors hover:text-cream" data-testid="footer-phone-1">+91 96242 57201</a>
                <span className="text-bark">/</span>
                <a href="tel:+919016890300" className="transition-colors hover:text-cream" data-testid="footer-phone-2">+91 90168 90300</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} strokeWidth={1.5} className="text-gold" />
                <a href="mailto:sweetsurprisehub@gmail.com" className="transition-colors hover:text-cream" data-testid="footer-email-link">
                  sweetsurprisehub@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={15} strokeWidth={1.5} className="text-gold" />
                <span>Mon – Sat, 10am – 8pm IST · Ships across India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-bark pt-8 text-xs uppercase tracking-[0.2em] text-sand/60 md:flex-row md:items-center">
          <p>© 2026 SweetSurpriseHub</p>
          <p>Crafted with cacao &amp; care</p>
        </div>
      </div>
    </footer>
  );
}