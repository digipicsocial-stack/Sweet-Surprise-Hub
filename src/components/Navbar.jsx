import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const LINKS = [
  { to: "/", label: "Home", testid: "nav-home-link" },
  { to: "/shop", label: "Shop", testid: "nav-shop-link" },
  { to: "/builder", label: "Surprise Box", testid: "nav-builder-link" },
  { to: "/about", label: "About", testid: "nav-about-link" },
  { to: "/contact", label: "Contact", testid: "nav-contact-link" },
];

export default function Navbar() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-bark bg-ink/80 backdrop-blur-xl" data-testid="site-header">
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:h-20 md:px-10">
          <Link to="/" className="font-display text-xl italic tracking-tight md:text-2xl" data-testid="brand-logo-link">
            Sweet<span className="text-gold">Surprise</span>Hub
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={l.testid}
                className={({ isActive }) =>
                  `link-underline text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive ? "text-gold" : "text-sand hover:text-cream"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              data-testid="cart-open-btn"
              className="relative flex h-10 w-10 items-center justify-center border border-bark text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
              aria-label="Open cart"
            >
              <ShoppingBag size={17} strokeWidth={1.5} />
              {count > 0 && (
                <span
                  data-testid="cart-count-badge"
                  className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-ink"
                >
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              data-testid="mobile-menu-btn"
              className="flex h-10 w-10 items-center justify-center border border-bark text-cream transition-colors duration-300 hover:border-gold hover:text-gold md:hidden"
              aria-label="Open menu"
            >
              <Menu size={17} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-xl"
            data-testid="mobile-menu"
          >
            <div className="flex h-16 items-center justify-between border-b border-bark px-6">
              <span className="font-display text-xl italic">
                Sweet<span className="text-gold">Surprise</span>Hub
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                data-testid="mobile-menu-close-btn"
                className="flex h-10 w-10 items-center justify-center border border-bark text-cream hover:border-gold hover:text-gold"
                aria-label="Close menu"
              >
                <X size={17} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 px-8">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setMenuOpen(false)}
                    data-testid={`mobile-${l.testid}`}
                    className={({ isActive }) =>
                      `block border-b border-bark py-5 font-display text-4xl tracking-tight transition-colors ${
                        isActive ? "italic text-gold" : "text-cream"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}