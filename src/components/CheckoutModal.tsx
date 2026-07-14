import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { X, Check, ArrowRight, ArrowLeft, CreditCard, Shield, Truck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CheckoutModal: React.FC = () => {
  const { 
    cart, 
    isCheckoutOpen, 
    toggleCheckout, 
    checkoutStep, 
    setCheckoutStep, 
    shippingInfo, 
    setShippingInfo, 
    courierType, 
    setCourierType,
    clearCart
  } = useAppStore();

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [isCardFocused, setIsCardFocused] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 50000;
  const shippingFee = courierType === 'white-glove' ? 1500 : 0;
  const total = subtotal + shippingFee;

  const validateAddress = () => {
    const errors: Record<string, string> = {};
    if (!shippingInfo.fullName) errors.fullName = 'Full Name is required';
    if (!shippingInfo.email || !/\S+@\S+\.\S+/.test(shippingInfo.email)) errors.email = 'Valid Email is required';
    if (!shippingInfo.address) errors.address = 'Street Address is required';
    if (!shippingInfo.city) errors.city = 'City is required';
    if (!shippingInfo.zip || !/^\d{5,6}$/.test(shippingInfo.zip)) errors.zip = 'Valid Zip code (5-6 digits) is required';
    if (!shippingInfo.phone || !/^\+?\d{10,12}$/.test(shippingInfo.phone)) errors.phone = 'Valid Phone number is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (checkoutStep === 1) {
      if (validateAddress()) {
        setCheckoutStep(2);
      }
    } else if (checkoutStep === 2) {
      setCheckoutStep(3);
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardHolder || !cardNumber || !cardExpiry || !cardCVV) {
      setFormErrors({ payment: 'Please fill in all credit card details.' });
      return;
    }
    setCheckoutStep(4);
    setTimeout(() => {
      clearCart();
    }, 100);
  };

  const handleClose = () => {
    toggleCheckout(false);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2A38]/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-4xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Left side: checkout progress & forms */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-2xl font-normal text-foreground">
                  Secure Checkout
                </h2>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-tagline-muted hover:text-foreground hover:bg-muted transition-colors md:hidden"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Steps Indicators */}
              <div className="flex justify-between items-center relative font-sans text-xs">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
                
                {[1, 2, 3].map((step) => (
                  <div 
                    key={step} 
                    className="relative z-10 flex items-center justify-center"
                  >
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center border font-semibold transition-all duration-300 ${
                        checkoutStep > step 
                          ? 'bg-secondary border-secondary text-secondary-foreground' 
                          : checkoutStep === step 
                          ? 'bg-primary border-primary text-primary-foreground' 
                          : 'bg-card border-border text-tagline-muted'
                      }`}
                    >
                      {checkoutStep > step ? <Check className="w-4 h-4" /> : step}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                {/* STEP 1: Address Details */}
                {checkoutStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-heading text-lg font-normal text-foreground flex items-center gap-2">
                      <Shield className="w-5 h-5 text-secondary" />
                      1. Insured Delivery Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-sm">
                      <div className="space-y-1">
                        <label className="text-xs text-tagline-muted uppercase tracking-wider font-medium">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Maharani Devi"
                          value={shippingInfo.fullName}
                          onChange={(e) => setShippingInfo({ fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-card border border-border text-foreground rounded-lg outline-none focus:border-secondary transition-colors"
                        />
                        {formErrors.fullName && <p className="text-[10px] text-destructive">{formErrors.fullName}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-tagline-muted uppercase tracking-wider font-medium">Email Address</label>
                        <input 
                          type="email" 
                          placeholder="devi@luxury.com"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({ email: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-card border border-border text-foreground rounded-lg outline-none focus:border-secondary transition-colors"
                        />
                        {formErrors.email && <p className="text-[10px] text-destructive">{formErrors.email}</p>}
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-xs text-tagline-muted uppercase tracking-wider font-medium">Street Address</label>
                        <input 
                          type="text" 
                          placeholder="Royal Palace, Suite 402, Golden Boulevard"
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({ address: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-card border border-border text-foreground rounded-lg outline-none focus:border-secondary transition-colors"
                        />
                        {formErrors.address && <p className="text-[10px] text-destructive">{formErrors.address}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-tagline-muted uppercase tracking-wider font-medium">City</label>
                        <input 
                          type="text" 
                          placeholder="Mumbai"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ city: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-card border border-border text-foreground rounded-lg outline-none focus:border-secondary transition-colors"
                        />
                        {formErrors.city && <p className="text-[10px] text-destructive">{formErrors.city}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-tagline-muted uppercase tracking-wider font-medium">Zip / Postal Code</label>
                        <input 
                          type="text" 
                          placeholder="400001"
                          maxLength={6}
                          value={shippingInfo.zip}
                          onChange={(e) => setShippingInfo({ zip: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-card border border-border text-foreground rounded-lg outline-none focus:border-secondary transition-colors"
                        />
                        {formErrors.zip && <p className="text-[10px] text-destructive">{formErrors.zip}</p>}
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-xs text-tagline-muted uppercase tracking-wider font-medium">Contact Phone (Secure delivery verification)</label>
                        <input 
                          type="tel" 
                          placeholder="+919876543210"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-card border border-border text-foreground rounded-lg outline-none focus:border-secondary transition-colors"
                        />
                        {formErrors.phone && <p className="text-[10px] text-destructive">{formErrors.phone}</p>}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={handleNextStep}
                        className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-sans text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 font-semibold maroon-glow"
                      >
                        Select Shipping Method
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Courier Customizations */}
                {checkoutStep === 2 && (
                  <div className="space-y-5">
                    <h3 className="font-heading text-lg font-normal text-foreground flex items-center gap-2">
                      <Truck className="w-5 h-5 text-secondary" />
                      2. Choose Insured Shipping Carrier
                    </h3>
                    <div className="space-y-4 font-sans text-sm">
                      <div 
                        onClick={() => setCourierType('standard')}
                        className={`p-4 border rounded-xl cursor-pointer flex gap-4 transition-all duration-300 ${
                          courierType === 'standard' 
                            ? 'border-primary bg-primary/5 shadow-md' 
                            : 'border-border hover:border-tagline-muted bg-card'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          courierType === 'standard' ? 'border-primary' : 'border-border'
                        }`}>
                          {courierType === 'standard' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground flex items-center gap-2">
                            Standard Secure Insured Courier
                            <span className="text-secondary font-medium text-xs">
                              {isFreeShipping ? 'FREE' : 'Complimentary'}
                            </span>
                          </h4>
                          <p className="text-xs text-tagline-muted mt-1 leading-relaxed">
                            Shipped via secure transit armored cars. Delivery within 4-7 business days. GPS tracking and OTP verification required upon receipt.
                          </p>
                        </div>
                      </div>

                      <div 
                        onClick={() => setCourierType('white-glove')}
                        className={`p-4 border rounded-xl cursor-pointer flex gap-4 transition-all duration-300 ${
                          courierType === 'white-glove' 
                            ? 'border-primary bg-primary/5 shadow-md' 
                            : 'border-border hover:border-tagline-muted bg-card'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          courierType === 'white-glove' ? 'border-primary' : 'border-border'
                        }`}>
                          {courierType === 'white-glove' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground flex items-center justify-between w-full">
                            <span>Royal White-Glove Hand-Delivery</span>
                            <span className="text-foreground font-semibold text-sm">+₹ 1,500</span>
                          </h4>
                          <p className="text-xs text-tagline-muted mt-1 leading-relaxed">
                            Hand-delivered in a velvet lined steel case by a certified courier, fully insured for luxury items. Deliveries within 2-3 business days. Personalized appointment verification.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button
                        onClick={() => setCheckoutStep(1)}
                        className="px-6 py-3 rounded-full border border-border text-tagline-muted hover:text-foreground font-sans text-xs uppercase tracking-wider flex items-center gap-2 transition-colors font-semibold"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back
                      </button>
                      <button
                        onClick={handleNextStep}
                        className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-sans text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 font-semibold maroon-glow"
                      >
                        Proceed to Payment
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Payment Simulation */}
                {checkoutStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="font-heading text-lg font-normal text-foreground flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-secondary" />
                      3. Premium Escrow Payment
                    </h3>

                    {/* Interactive credit card visual */}
                    <div className="relative w-full max-w-sm mx-auto h-48 rounded-2xl bg-gradient-to-tr from-[#5C0F24] to-[#C79A3B] text-white p-6 shadow-xl flex flex-col justify-between overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl translate-x-12 -translate-y-8" />
                      <div className="flex justify-between items-start">
                        <span className="font-heading text-sm font-semibold tracking-widest text-[#F8F6F2]">SHAS</span>
                        <div className="w-10 h-7 rounded bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-[10px]">
                          CHIP
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="font-sans text-lg tracking-widest font-semibold text-center">
                          {cardNumber || '•••• •••• •••• ••••'}
                        </p>
                        <div className="flex justify-between text-xs uppercase tracking-wider font-sans">
                          <div>
                            <span className="text-[8px] block opacity-70">Cardholder</span>
                            <span className="truncate max-w-[150px] inline-block font-medium">{cardHolder || 'Your Name'}</span>
                          </div>
                          <div>
                            <span className="text-[8px] block opacity-70">Expires</span>
                            <span className="font-medium">{cardExpiry || 'MM/YY'}</span>
                          </div>
                          <div>
                            <span className="text-[8px] block opacity-70">CVV</span>
                            <span className="font-medium">{isCardFocused ? cardCVV : '•••'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-sm">
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-xs text-tagline-muted uppercase tracking-wider font-medium">Cardholder Name</label>
                        <input 
                          type="text" 
                          placeholder="Devi Sharma"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-card border border-border text-foreground rounded-lg outline-none focus:border-secondary transition-colors"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-xs text-tagline-muted uppercase tracking-wider font-medium">Card Number</label>
                        <input 
                          type="text" 
                          placeholder="4111 2222 3333 4444"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                            setCardNumber(val);
                          }}
                          className="w-full px-3.5 py-2.5 bg-card border border-border text-foreground rounded-lg outline-none focus:border-secondary transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-tagline-muted uppercase tracking-wider font-medium">Expiration Date</label>
                        <input 
                          type="text" 
                          placeholder="MM/YY"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\//g, '');
                            if (val.length > 2) val = val.slice(0,2) + '/' + val.slice(2);
                            setCardExpiry(val);
                          }}
                          className="w-full px-3.5 py-2.5 bg-card border border-border text-foreground rounded-lg outline-none focus:border-secondary transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-tagline-muted uppercase tracking-wider font-medium">CVV</label>
                        <input 
                          type="password" 
                          placeholder="•••"
                          maxLength={3}
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value)}
                          onFocus={() => setIsCardFocused(true)}
                          onBlur={() => setIsCardFocused(false)}
                          className="w-full px-3.5 py-2.5 bg-card border border-border text-foreground rounded-lg outline-none focus:border-secondary transition-colors"
                        />
                      </div>
                    </form>

                    {formErrors.payment && (
                      <p className="text-xs text-destructive text-center">{formErrors.payment}</p>
                    )}

                    <div className="pt-4 flex justify-between">
                      <button
                        onClick={() => setCheckoutStep(2)}
                        className="px-6 py-3 rounded-full border border-border text-tagline-muted hover:text-foreground font-sans text-xs uppercase tracking-wider flex items-center gap-2 transition-colors font-semibold"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back
                      </button>
                      <button
                        onClick={handleCompleteOrder}
                        className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-sans text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 font-semibold maroon-glow"
                      >
                        Complete Insured Order
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: Success Confetti */}
                {checkoutStep === 4 && (
                  <div className="text-center py-10 space-y-6">
                    <div className="w-20 h-20 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mx-auto border border-secondary/30 animate-bounce">
                      <Sparkles className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-normal text-foreground">
                        Order Securely preparing
                      </h3>
                      <p className="text-sm text-tagline-muted max-w-sm mx-auto mt-2 font-sans">
                        Your transaction has been approved. A luxury concierge has been assigned to catalog and verify your custom jewelry piece.
                      </p>
                    </div>

                    <div className="bg-muted/40 max-w-md mx-auto p-4 rounded-xl border border-border/40 text-left font-sans text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-tagline-muted">Order Reference:</span>
                        <span className="font-bold text-foreground">DM-2026-{Math.floor(1000 + Math.random() * 9000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-tagline-muted">Receipt To:</span>
                        <span className="font-medium text-foreground">{shippingInfo.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-tagline-muted">Delivery Via:</span>
                        <span className="font-medium text-foreground">
                          {courierType === 'white-glove' ? 'White-Glove Certified Courier' : 'Standard Secure Armored Transit'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleClose}
                      className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-sans text-xs uppercase tracking-wider font-semibold hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                    >
                      Return to Gallery
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Cart Summary sidebar */}
            {checkoutStep !== 4 && (
              <div className="w-full md:w-80 bg-muted/30 border-t md:border-t-0 md:border-l border-border p-6 md:p-8 flex flex-col justify-between max-h-96 md:max-h-none overflow-y-auto">
                <div className="space-y-4">
                  <h4 className="font-heading text-lg font-normal text-foreground border-b border-border pb-2">
                    Order Summary
                  </h4>
                  <div className="space-y-4 max-h-48 md:max-h-[350px] overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex gap-3 text-xs">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-12 h-12 rounded object-cover bg-muted"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground truncate">{item.product.name}</p>
                          <p className="text-[10px] text-tagline-muted">Qty: {item.quantity} • {item.product.metal}</p>
                          <p className="text-foreground/80 mt-1">₹ {(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4 mt-6 space-y-2 text-xs font-sans">
                  <div className="flex justify-between text-tagline-muted">
                    <span>Subtotal</span>
                    <span className="text-foreground font-medium">₹ {subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-tagline-muted">
                    <span>Insured Delivery</span>
                    <span className="text-foreground font-medium">
                      {shippingFee === 0 ? 'Complimentary' : `₹ ${shippingFee.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  <div className="h-px bg-border my-1" />
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-foreground">Order Total</span>
                    <span className="font-serif text-base font-bold text-foreground">₹ {total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
