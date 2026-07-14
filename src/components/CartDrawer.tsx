import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { X, Trash2, Plus, Minus, ShieldCheck, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    toggleCart, 
    updateQty, 
    removeFromCart, 
    toggleCheckout 
  } = useAppStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const freeShippingThreshold = 50000;
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const amountNeededForFreeShipping = freeShippingThreshold - subtotal;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'HEIRLOOM10') {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  };

  const handleCheckoutClick = () => {
    toggleCart(false);
    toggleCheckout(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 z-50 bg-[#2C2A38]/40 backdrop-blur-sm"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-card border-l border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-heading text-xl font-normal text-foreground tracking-wide">
                  Your Vault Bag
                </h2>
                <span className="bg-primary/10 text-primary font-sans text-xs px-2.5 py-0.5 rounded-full font-medium">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => toggleCart(false)}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-tagline-muted hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-tagline-muted">
                    <ShoppingBag className="w-8 h-8 stroke-1" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-normal text-foreground">
                      Your bag is empty
                    </h3>
                    <p className="text-sm text-tagline-muted max-w-xs mt-1">
                      Explore our collections to discover handcrafted masterpieces.
                    </p>
                  </div>
                  <button
                    onClick={() => toggleCart(false)}
                    className="px-6 py-2.5 rounded-full border border-primary text-primary font-sans text-xs uppercase tracking-wider font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <>
                  {/* Free Shipping Meter */}
                  <div className="bg-muted/40 p-4 rounded-xl border border-border/40">
                    {subtotal >= freeShippingThreshold ? (
                      <p className="text-xs text-secondary font-sans font-semibold flex items-center gap-1.5 justify-center">
                        ✨ Complimentary Insured Courier unlocked!
                      </p>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-xs text-tagline-muted font-sans text-center">
                          Add <span className="font-semibold text-foreground">₹ {amountNeededForFreeShipping.toLocaleString('en-IN')}</span> more for <span className="font-semibold text-foreground">complimentary insured shipping</span>.
                        </p>
                        <div className="w-full bg-border/40 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-gold h-full rounded-full transition-all duration-500" 
                            style={{ width: `${progressToFreeShipping}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cart Items List */}
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div 
                        key={item.product.id} 
                        className="flex gap-4 p-3 border border-border/40 rounded-xl bg-card/50 hover:bg-card transition-colors duration-300"
                      >
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-20 h-20 rounded-lg object-cover bg-muted"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="font-heading text-sm text-foreground leading-snug line-clamp-1">
                              {item.product.name}
                            </h4>
                            <p className="text-[10px] text-tagline-muted uppercase tracking-wider font-sans mt-0.5">
                              {item.product.metal} • {item.product.gemstone}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-border rounded-lg">
                              <button 
                                onClick={() => updateQty(item.product.id, item.quantity - 1)}
                                className="p-1 px-2 text-tagline-muted hover:text-foreground transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-sans font-medium px-2 text-foreground">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQty(item.product.id, item.quantity + 1)}
                                className="p-1 px-2 text-tagline-muted hover:text-foreground transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-serif text-sm font-medium text-foreground">
                              ₹ {(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-tagline-muted hover:text-destructive transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="border-t border-border p-6 bg-muted/20 space-y-4">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    className="flex-1 px-3.5 py-2 border border-border bg-card text-foreground rounded-full text-xs font-sans outline-none focus:border-secondary transition-colors uppercase"
                  />
                  <button
                    type="submit"
                    disabled={promoApplied}
                    className="px-4 py-2 rounded-full border border-foreground text-foreground hover:bg-foreground hover:text-background font-sans text-[11px] uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {promoApplied ? 'Applied' : 'Apply'}
                  </button>
                </form>

                {promoError && (
                  <p className="text-[10px] text-destructive font-sans pl-2">
                    Invalid coupon code. Try "HEIRLOOM10".
                  </p>
                )}
                {promoApplied && (
                  <p className="text-[10px] text-secondary font-sans font-semibold pl-2">
                    Promo applied! 10% discount subtracted.
                  </p>
                )}

                {/* Subtotals */}
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between text-tagline-muted">
                    <span>Subtotal</span>
                    <span className="text-foreground font-medium">₹ {subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-secondary">
                      <span>Discount (HEIRLOOM10)</span>
                      <span>-₹ {discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-tagline-muted">
                    <span>Delivery</span>
                    <span className="text-foreground font-medium">
                      {subtotal >= freeShippingThreshold ? 'Complimentary Insured' : 'Calculated next'}
                    </span>
                  </div>
                  <div className="h-px bg-border my-1" />
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-foreground">Total Estimate</span>
                    <span className="font-serif text-lg font-bold text-foreground">₹ {total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Trust guarantee */}
                <div className="flex items-center gap-2 text-[10px] text-tagline-muted font-sans bg-card/60 p-2.5 rounded-lg border border-border/40">
                  <ShieldCheck className="w-4.5 h-4.5 text-secondary flex-shrink-0" />
                  <span>Each custom package is packed under dual-layer video surveillance and shipped fully insured.</span>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-sans text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 font-semibold maroon-glow"
                >
                  Proceed to Secure Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
