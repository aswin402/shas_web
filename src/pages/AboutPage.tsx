import { Link } from 'react-router-dom';
import { ChevronLeft, Shield, Award, Sparkles, Compass } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="relative min-h-[calc(100vh-6rem)] bg-[#F8F6F2] text-[#2A2A2A] py-16 px-6 overflow-hidden mt-6 font-sans">
      
      {/* Background radial decorations */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#C79A3B]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#5C0F24]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-12">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#805E63] hover:text-[#5C0F24] transition-colors mb-6 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Boutique</span>
        </Link>

        {/* Title */}
        <div className="space-y-3 text-left">
          <span className="text-[11px] text-[#805E63] uppercase tracking-[0.25em] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C79A3B]" />
            Heritage in Every Carat
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-light text-[#5C0F24]">
            The Story of SHAS Jewellers
          </h1>
          <p className="text-sm text-[#805E63] font-sans max-w-xl leading-relaxed">
            Crafting natural diamonds and solid gold designed by Deepa Sakthi. We believe true beauty is built with honesty, emotion, and truest craftsmanship.
          </p>
        </div>

        {/* Story details */}
        <div className="space-y-12 font-sans text-sm md:text-base leading-relaxed text-[#805E63]">
          
          <section className="bg-white border border-[#E8DECF] rounded-none p-8 shadow-sm space-y-4 text-left">
            <h2 className="font-heading text-xl font-normal text-[#5C0F24] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#C79A3B]" />
              <span>Designed by Deepa Sakthi</span>
            </h2>
            <p className="text-xs leading-relaxed text-[#805E63]">
              Founded by Deepa Sakthi (Deepa Akka), SHAS Jewellers represents the culmination of passion, struggle, and unwavering consistency. We believe that a piece of jewellery is never just an accessory—it is a tangible memory, a celebration of a milestone, and an emotion designed to be passed down through generations.
            </p>
            <p className="text-xs leading-relaxed text-[#805E63]">
              Every piece in our collections, from the soft blush pink pearl chokers to the rich ruby statement necklaces, is handcrafted by master artisans who take the time needed to ensure absolute perfection. We photograph our pieces under natural light without filters to ensure that the craftsmanship and truest details reach you exactly as they appear in real life.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#805E63] text-left">
            <div className="p-6 rounded-none border border-[#E8DECF] bg-white flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C79A3B]/10 text-[#C79A3B] border border-[#C79A3B]/20 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-sm text-[#2A2A2A]">100% Insured Value</h3>
              <p className="leading-relaxed">Each custom piece is shipped in secure packaging, fully insured during transit to your doorstep.</p>
            </div>

            <div className="p-6 rounded-none border border-[#E8DECF] bg-white flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C79A3B]/10 text-[#C79A3B] border border-[#C79A3B]/20 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-sm text-[#2A2A2A]">BIS Hallmark Certified</h3>
              <p className="leading-relaxed">Our gold is certified by government Hallmark authorities, verifying carats purity and chemical authenticity.</p>
            </div>

            <div className="p-6 rounded-none border border-[#E8DECF] bg-white flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C79A3B]/10 text-[#C79A3B] border border-[#C79A3B]/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-sm text-[#2A2A2A]">Natural Diamonds & Gems</h3>
              <p className="text-[#805E63] leading-relaxed">
                Only the finest natural diamonds and hand-picked rubies go into our collections, curated under Deepa Sakthi's strict visual guidelines.
              </p>
            </div>
          </section>

          {/* CTA Box */}
          <div className="flex flex-col items-center justify-center text-center p-8 border border-[#E8DECF] bg-[#F8F6F2] space-y-4">
            <h3 className="font-heading text-lg font-normal text-[#5C0F24]">Explore Our Stories</h3>
            <p className="text-xs text-[#805E63] max-w-sm font-sans leading-relaxed">
              Read our latest style logs, GRWM tips from Deepa Akka, and stories of traditional luxury.
            </p>
            <Link to="/journal">
              <button className="px-6 py-2.5 bg-[#5C0F24] hover:bg-[#C79A3B] text-[#F8F6F2] font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300">
                Open the SHAS Journal
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
