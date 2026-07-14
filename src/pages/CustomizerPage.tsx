import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Sparkles, Shield, ShoppingBag, RefreshCw, Layers, Award } from 'lucide-react';
import type { Product } from '@/types/jewelry';

export function CustomizerPage() {
  const { customJewel, setCustomMetal, setCustomGem, resetCustomizer, addToCart, toggleCart } = useAppStore();
  const [activeTab, setActiveTab] = useState<'metals' | 'gemstones'>('metals');

  const metalsList = [
    { name: '18K Rose Gold', cost: '+$200', desc: 'Blush pink hues crafted from copper-gold alloys for romantic brilliance.' },
    { name: '22K Yellow Gold', cost: '+$400', desc: 'High purity imperial solid gold matching historical temple standards.' },
    { name: 'Platinum', cost: '+$800', desc: 'Platinum Alabaster - dense, hypo-allergenic pristine silver metal.' },
  ];

  const gemsList = [
    { name: 'Zambian Emerald', cost: '+$1,200', desc: 'Deep forest green emerald displaying beautiful organic inclusions (jardin).' },
    { name: 'Uncut Diamond (Polki)', cost: '+$1,500', desc: 'Ancient raw diamond slices set in gold foil to reflect absolute candlelight.' },
    { name: 'Burmese Ruby', cost: '+$1,000', desc: 'Rare pigeon-blood crimson ruby representing ultimate royalty and heart.' },
    { name: 'Baroque Pearl', cost: '+$300', desc: 'Saltwater pearl showing a soft iridescent luster and organic sculpture.' },
    { name: 'None', cost: '+$0', desc: 'A clean metal bezel focus without gemstone insertions.' }
  ];

  const handleCraftOrder = () => {
    // Generate custom product record
    const customizedProduct: Product = {
      id: `custom-${customJewel.metal.replace(/\s+/g, '-')}-${customJewel.gem.replace(/\s+/g, '-')}`,
      name: `Custom Atelier Solitaire Ring`,
      category: 'Rings',
      price: customJewel.price,
      rating: 5.0,
      reviews: 1,
      description: `A bespoke solitaire ring handcrafted in our atelier. Featuring a high-quality ${customJewel.gem} set securely in a custom ${customJewel.metal} band.`,
      gemstone: customJewel.gem,
      metal: customJewel.metal,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
      secondaryImage: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=600",
      tag: "Atelier Bespoke",
      sku: `DM-BESPOKE-${Math.floor(1000 + Math.random() * 9000)}`
    };

    addToCart(customizedProduct, 1);
    toggleCart(true);
  };

  // Helper colors for visual preview mapping
  const getMetalColor = () => {
    if (customJewel.metal === '22K Yellow Gold') return 'bg-gradient-to-tr from-[#E5A924] via-[#FFE5A3] to-[#B37E00]';
    if (customJewel.metal === 'Platinum') return 'bg-gradient-to-tr from-[#D1D5DB] via-[#F3F4F6] to-[#9CA3AF]';
    return 'bg-gradient-to-tr from-[#ECC2B1] via-[#FFF1EB] to-[#C98B75]'; // Rose gold
  };

  const getGemColor = () => {
    if (customJewel.gem === 'Zambian Emerald') return 'bg-[#10B981] shadow-[0_0_25px_rgba(16,185,129,0.7)] border-emerald-400';
    if (customJewel.gem === 'Uncut Diamond (Polki)') return 'bg-[#F8F6F2] shadow-[0_0_30px_rgba(255,255,255,0.9)] border-white';
    if (customJewel.gem === 'Burmese Ruby') return 'bg-[#EF4444] shadow-[0_0_25px_rgba(239,68,68,0.7)] border-rose-400';
    if (customJewel.gem === 'Baroque Pearl') return 'bg-radial from-[#F8F6F2] to-[#E5E7EB] shadow-[0_0_15px_rgba(229,231,235,0.5)] border-gray-200';
    return 'bg-transparent border-dashed border-border';
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 mt-6">
      
      {/* Header Description */}
      <div className="text-center mb-12 space-y-3">
        <span className="text-[11px] text-tagline-muted uppercase tracking-[0.25em] font-sans font-semibold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-secondary" />
          The Atelier of Dreams
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground">
          Bespoke Crafting Configurator
        </h1>
        <p className="text-sm text-tagline-muted max-w-lg mx-auto font-sans leading-relaxed">
          Design your custom heirloom. Swapping materials recalculates cost dynamically, simulating a premium offline studio experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Dynamic Preview Canvas */}
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-md rounded-2xl bg-card border border-border/80 flex items-center justify-center overflow-hidden shadow-inner p-8">
            
            {/* Visual halo ring */}
            <div className="absolute w-72 h-72 rounded-full border border-secondary/15 animate-pulse" />
            <div className="absolute w-80 h-80 rounded-full border border-secondary/5" />

            {/* Configurable Ring Sculpture Representation */}
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* Metal Ring Hoop */}
              <div className={`w-44 h-44 rounded-full border-[18px] absolute transition-all duration-700 ${getMetalColor()}`} />
              
              {/* Crown Bezel Setting */}
              <div className="absolute top-3 w-16 h-12 flex flex-col items-center z-10">
                {/* Crown prongs */}
                <div className="flex justify-between w-10 px-1">
                  <div className={`w-2.5 h-4 rounded-t-full ${getMetalColor()}`} />
                  <div className={`w-2.5 h-4 rounded-t-full ${getMetalColor()}`} />
                </div>
                {/* Gemstone Core */}
                <div className={`w-9 h-9 rounded-full border transition-all duration-700 -mt-1.5 flex items-center justify-center ${getGemColor()}`}>
                  {customJewel.gem !== 'None' && (
                    <div className="w-3 h-3 rounded-full bg-white/20 blur-[1px]" />
                  )}
                </div>
              </div>
            </div>

            {/* Spec tags in canvas */}
            <div className="absolute bottom-4 left-4 bg-muted/60 px-3 py-1.5 rounded-lg border border-border/40 font-sans text-[10px] text-tagline-muted">
              <span>Preview Mode: Bespoke Ring Solitaire</span>
            </div>

            {/* Reset button */}
            <button 
              onClick={resetCustomizer}
              className="absolute top-4 right-4 p-2 bg-card border border-border text-tagline-muted hover:text-foreground rounded-full transition-colors"
              title="Reset configuration"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Certificate badges */}
          <div className="flex gap-6 mt-6 font-sans text-xs text-tagline-muted">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-secondary" />
              <span>Insured Transit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-secondary" />
              <span>GIA Certified Diamond</span>
            </div>
          </div>
        </div>

        {/* Right Side: Options Selectors */}
        <div className="bg-card border border-border p-6 md:p-8 rounded-2xl space-y-8 shadow-sm">
          
          {/* Customizer Tabs */}
          <div className="flex border-b border-border font-sans text-sm">
            <button
              onClick={() => setActiveTab('metals')}
              className={`flex-1 pb-3 text-center border-b-2 font-medium transition-all ${
                activeTab === 'metals' 
                  ? 'border-primary text-primary font-bold' 
                  : 'border-transparent text-tagline-muted hover:text-foreground'
              }`}
            >
              1. Choose Metal Canvas
            </button>
            <button
              onClick={() => setActiveTab('gemstones')}
              className={`flex-1 pb-3 text-center border-b-2 font-medium transition-all ${
                activeTab === 'gemstones' 
                  ? 'border-primary text-primary font-bold' 
                  : 'border-transparent text-tagline-muted hover:text-foreground'
              }`}
            >
              2. Mount Gemstone Center
            </button>
          </div>

          {/* Tabs Details Content */}
          <div className="space-y-4">
            {activeTab === 'metals' ? (
              <div className="space-y-3 font-sans">
                {metalsList.map((m) => (
                  <div
                    key={m.name}
                    onClick={() => setCustomMetal(m.name)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 flex justify-between items-start gap-4 ${
                      customJewel.metal === m.name
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border hover:border-tagline-muted bg-card'
                    }`}
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground text-sm flex items-center gap-2">
                        {m.name}
                        {customJewel.metal === m.name && (
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        )}
                      </p>
                      <p className="text-xs text-tagline-muted leading-relaxed">{m.desc}</p>
                    </div>
                    <span className="font-serif text-sm font-semibold text-foreground flex-shrink-0">
                      {m.cost}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3 font-sans">
                {gemsList.map((g) => (
                  <div
                    key={g.name}
                    onClick={() => setCustomGem(g.name)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 flex justify-between items-start gap-4 ${
                      customJewel.gem === g.name
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border hover:border-tagline-muted bg-card'
                    }`}
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground text-sm flex items-center gap-2">
                        {g.name}
                        {customJewel.gem === g.name && (
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        )}
                      </p>
                      <p className="text-xs text-tagline-muted leading-relaxed">{g.desc}</p>
                    </div>
                    <span className="font-serif text-sm font-semibold text-foreground flex-shrink-0">
                      {g.cost}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pricing Box & Add to bag */}
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Dynamic Price Display */}
            <div className="text-left w-full sm:w-auto">
              <span className="text-[10px] text-tagline-muted uppercase tracking-widest block font-sans font-semibold mb-1">
                Atelier Price Estimate
              </span>
              <span className="font-serif text-3xl font-bold text-foreground transition-all duration-500">
                ${customJewel.price.toLocaleString()}
              </span>
            </div>

            {/* Call To Action */}
            <button
              onClick={handleCraftOrder}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-sans text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 font-semibold maroon-glow"
            >
              <ShoppingBag className="w-4 h-4" />
              Craft My Heirloom
            </button>
          </div>

          {/* Luxury details notes */}
          <div className="flex items-center gap-2.5 text-[10px] text-tagline-muted font-sans bg-muted/40 p-3 rounded-lg border border-border/40 leading-relaxed">
            <Layers className="w-4.5 h-4.5 text-secondary flex-shrink-0" />
            <span>Custom orders require 15-20 days of careful hand-crafting and certified gem-setting in our Mumbai workshop.</span>
          </div>

        </div>
      </div>
    </div>
  );
}
