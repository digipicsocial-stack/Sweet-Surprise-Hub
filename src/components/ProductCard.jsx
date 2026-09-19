import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { formatINR } from "../lib/api";
import { EASE } from "./motion";

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} tucked into your box`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: EASE }}
      className="group"
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden border border-bark bg-cocoa">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
        />
        {product.tag && (
          <span className="absolute left-4 top-4 border border-gold/40 bg-ink/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
            {product.tag}
          </span>
        )}
        <button
          onClick={handleAdd}
          data-testid={`add-to-cart-${product.id}`}
          className="absolute inset-x-0 bottom-0 hidden translate-y-full items-center justify-center gap-2 bg-gold py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink transition-all duration-500 hover:bg-gold-light group-hover:translate-y-0 md:flex"
        >
          <Plus size={13} /> Add to Box
        </button>
        <button
          onClick={handleAdd}
          data-testid={`add-to-cart-mobile-${product.id}`}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ink md:hidden"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-sand/70">
            {product.category} {product.cocoa && <span className="text-bark">·</span>} {product.cocoa}
          </p>
          <h3 className="mt-1.5 font-display text-xl leading-tight tracking-tight md:text-2xl">{product.name}</h3>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-sand/80">{product.description}</p>
        </div>
        <p className="whitespace-nowrap pt-5 text-sm font-medium text-gold">{formatINR(product.price)}</p>
      </div>
    </motion.article>
  );
}