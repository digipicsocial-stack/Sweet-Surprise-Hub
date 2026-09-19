import { useState } from "react";
import { Minus, Plus, Trash2, ArrowRight, CheckCircle2, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { useCart } from "../context/CartContext";
import { formatINR } from "../lib/api";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal, clearCart, count } = useCart();
  const [step, setStep] = useState("cart");
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [orderId, setOrderId] = useState("");

  const handleClose = () => {
    closeCart();
    setTimeout(() => setStep("cart"), 350);
  };

  const placeMockOrder = (e) => {
    e.preventDefault();
    setOrderId(`SSH-${Math.random().toString(36).slice(2, 7).toUpperCase()}`);
    clearCart();
    setStep("done");
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col border-l border-bark bg-ink p-0 text-cream sm:max-w-md"
        data-testid="cart-drawer"
      >
        <SheetHeader className="border-b border-bark px-6 py-5">
          <SheetTitle className="font-display text-2xl font-normal italic text-cream">
            Your Chocolate Box {count > 0 && <span className="not-italic text-gold">({count})</span>}
          </SheetTitle>
        </SheetHeader>

        {step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center" data-testid="cart-empty-state">
                  <ShoppingBag size={32} strokeWidth={1} className="text-sand/40" />
                  <p className="font-display text-xl italic text-sand">Your box is empty.</p>
                  <p className="max-w-[220px] text-xs leading-relaxed text-sand/60">
                    Wander the collection and tuck something decadent inside.
                  </p>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4" data-testid={`cart-item-${item.id}`}>
                      <div className="h-24 w-20 shrink-0 overflow-hidden border border-bark bg-cocoa">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between py-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-display text-lg leading-tight">{item.name}</p>
                            {item.meta && <p className="mt-1 text-[11px] leading-snug text-sand/70">{item.meta}</p>}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            data-testid={`remove-item-${item.id}`}
                            className="text-sand/50 transition-colors hover:text-gold"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={15} strokeWidth={1.5} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-bark">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              data-testid={`qty-decrease-${item.id}`}
                              className="flex h-7 w-7 items-center justify-center text-sand transition-colors hover:text-gold"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-xs" data-testid={`qty-value-${item.id}`}>{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              data-testid={`qty-increase-${item.id}`}
                              className="flex h-7 w-7 items-center justify-center text-sand transition-colors hover:text-gold"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-sm text-gold">{formatINR(item.price * item.qty)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-bark px-6 py-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-sand">Subtotal</span>
                  <span className="font-display text-2xl text-gold" data-testid="cart-subtotal">{formatINR(subtotal)}</span>
                </div>
                <button
                  onClick={() => setStep("checkout")}
                  data-testid="checkout-btn"
                  className="group flex w-full items-center justify-center gap-3 bg-gold py-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink transition-colors duration-300 hover:bg-gold-light"
                >
                  Proceed to Checkout
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-sand/50">
                  Demo checkout — no payment collected
                </p>
              </div>
            )}
          </>
        )}

        {step === "checkout" && (
          <form onSubmit={placeMockOrder} className="flex flex-1 flex-col px-6 py-6" data-testid="checkout-form">
            <p className="overline-label mb-6">Delivery Details</p>
            <div className="space-y-6">
              <div>
                <label className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-sand">Full Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="flush-input"
                  placeholder="Aarav Shah"
                  data-testid="checkout-name-input"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-sand">Phone</label>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="flush-input"
                  placeholder="98765 43210"
                  data-testid="checkout-phone-input"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-sand">Address</label>
                <textarea
                  required
                  rows={3}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="flush-input resize-none"
                  placeholder="Street, city, pincode"
                  data-testid="checkout-address-input"
                />
              </div>
            </div>
            <div className="mt-auto pt-8">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-sand">Total</span>
                <span className="font-display text-2xl text-gold">{formatINR(subtotal)}</span>
              </div>
              <button
                type="submit"
                data-testid="place-mock-order-btn"
                className="w-full bg-gold py-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink transition-colors duration-300 hover:bg-gold-light"
              >
                Place Mock Order
              </button>
              <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-sand/50">
                Demonstration only — nothing is charged
              </p>
            </div>
          </form>
        )}

        {step === "done" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center" data-testid="order-confirmation">
            <CheckCircle2 size={44} strokeWidth={1} className="text-gold" />
            <p className="font-display text-3xl italic">Order placed.</p>
            <p className="text-sm text-sand">
              Order <span className="text-gold" data-testid="mock-order-id">{orderId}</span> is being wrapped in ribbon as we speak.
            </p>
            <p className="max-w-[260px] text-[11px] uppercase tracking-[0.15em] leading-relaxed text-sand/50">
              This is a mocked checkout — no payment was processed
            </p>
            <button
              onClick={handleClose}
              data-testid="continue-browsing-btn"
              className="mt-2 border border-gold px-8 py-3 text-xs uppercase tracking-[0.25em] text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}