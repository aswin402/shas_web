import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Send, Sparkles, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', queryType: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-[calc(100vh-6rem)] bg-[#F8F6F2] text-[#2A2A2A] py-16 px-6 overflow-hidden mt-6 font-sans">
      
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[#5C0F24]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#C79A3B]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-12">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-sans text-tagline-muted hover:text-foreground transition-colors mb-6 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Boutique</span>
        </Link>

        {/* Title */}
        <div className="space-y-3 text-left">
          <span className="text-[11px] text-tagline-muted uppercase tracking-[0.25em] font-sans font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            Concierge Services
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground">
            Contact Our Curation Specialists
          </h1>
          <p className="text-sm text-tagline-muted font-sans max-w-lg leading-relaxed">
            Inquire about custom sizing, request certified valuation sheets, or schedule a secure video showroom tour.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Left info column */}
          <div className="space-y-6 md:col-span-1 font-sans text-xs text-tagline-muted">
            <div className="p-5 border border-border/50 bg-card rounded-xl space-y-3 shadow-sm">
              <Phone className="w-5 h-5 text-secondary" />
              <h4 className="font-heading font-semibold text-sm text-foreground">Boutique Phone</h4>
              <p>+91 22 9876 5432</p>
            </div>
            
            <div className="p-5 border border-border/50 bg-card rounded-xl space-y-3 shadow-sm">
              <Mail className="w-5 h-5 text-secondary" />
              <h4 className="font-heading font-semibold text-sm text-foreground">Email Support</h4>
              <p>concierge@shasjewellers.com</p>
            </div>

            <div className="p-5 border border-border/50 bg-card rounded-xl space-y-3 shadow-sm">
              <Clock className="w-5 h-5 text-secondary" />
              <h4 className="font-heading font-semibold text-sm text-foreground">Active Hours</h4>
              <p>Monday - Saturday<br />10:00 AM - 7:00 PM IST</p>
            </div>
          </div>

          {/* Right form column */}
          <div className="md:col-span-2 bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-sm">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-tagline-muted uppercase tracking-wider font-semibold">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Maharani Devi"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-border bg-card text-foreground outline-none focus:border-secondary transition-all text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-tagline-muted uppercase tracking-wider font-semibold">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="devi@luxury.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-border bg-card text-foreground outline-none focus:border-secondary transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-tagline-muted uppercase tracking-wider font-semibold">Inquiry Type</label>
                  <select
                    value={formState.queryType}
                    onChange={(e) => setFormState({ ...formState, queryType: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-border bg-card text-foreground outline-none focus:border-secondary transition-all text-sm"
                  >
                    <option value="General Inquiry">General Collections Inquiry</option>
                    <option value="Bespoke Order">Bespoke Commission Consultation</option>
                    <option value="Video Tour">Schedule Video Showroom Tour</option>
                    <option value="Sizing help">Custom Ring / Necklace Sizing</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-tagline-muted uppercase tracking-wider font-semibold">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your design specifications or consult timing request..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full p-4 rounded-xl border border-border bg-card text-foreground outline-none focus:border-secondary transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 flex items-center justify-center gap-2 maroon-glow uppercase tracking-wider text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Request
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary border border-secondary/20 flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-2xl font-normal text-foreground">
                    Consultation Request Lodged
                  </h3>
                  <p className="text-tagline-muted max-w-sm mx-auto text-xs leading-relaxed">
                    Thank you, {formState.name}. Your commission request for <span className="font-semibold text-foreground">"{formState.queryType}"</span> has been assigned. A curation specialist will contact you at <span className="font-semibold text-foreground">{formState.email}</span> within 24 business hours.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', email: '', queryType: 'General Inquiry', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-full border border-border text-tagline-muted hover:text-foreground text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
