import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Star, 
  Heart, 
  ShieldCheck, 
  RotateCcw, 
  ShoppingBag,
  Truck,
  Gift,
  Gem,
  Sparkles,
  Shield
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS } from '@/api/products';
import { useAppStore } from '@/store/useAppStore';

const HeadingDivider = () => (
  <div className="flex-grow h-[1px] bg-[#C79A3B]/40 ml-4 max-w-[80px]" />
);

const HERO_SLIDES = [
  {
    title: "Crafted to\nCelebrate Every\nMoment",
    subtitle: "Timeless jewelry, made to shine with you.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200",
    linkText: "Shop Collection",
    linkUrl: "/catalog"
  },
  {
    title: "Heritage in\nEvery Single\nCarat",
    subtitle: "Experience traditional luxury designed by Deepa Sakthi.",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=1200",
    linkText: "Explore Gold",
    linkUrl: "/catalog?category=Necklaces"
  },
  {
    title: "Emotions Set\nin Precious\nGold & Gems",
    subtitle: "Every piece you own carries a story, a memory to cherish forever.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1200",
    linkText: "View Catalog",
    linkUrl: "/catalog"
  }
];

export function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { addToCart, toggleCart, toggleWishlist, wishlist } = useAppStore();
  const [email, setEmail] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const isAnimatingRef = useRef(false);

  const changeSlide = (nextIndex: number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    // 1. Fade out current content
    gsap.to('.hero-text-slide', {
      opacity: 0,
      y: -15,
      duration: 0.35,
      stagger: 0.04,
      ease: 'power2.in',
      onComplete: () => {
        // 2. Change state
        setCurrentSlide(nextIndex);
        // 3. Fade in new content
        gsap.fromTo('.hero-text-slide',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
        );
      }
    });

    gsap.to('.hero-image-slide', {
      opacity: 0.3,
      scale: 1.02,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        // Fade in and scale down the new image
        gsap.fromTo('.hero-image-slide',
          { opacity: 0.3, scale: 1.06 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.8, 
            ease: 'power2.out',
            onComplete: () => {
              isAnimatingRef.current = false;
            }
          }
        );
      }
    });
  };

  const handleNextSlide = () => {
    changeSlide((currentSlide + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    changeSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Autoplay with 10 seconds delay - resets automatically when currentSlide changes
  useEffect(() => {
    const timer = setInterval(() => {
      changeSlide((currentSlide + 1) % HERO_SLIDES.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const bestSellers = PRODUCTS.filter(p => p.tag === 'Best Seller').slice(0, 5);
  const newArrivals = PRODUCTS.filter(p => p.tag === 'New Arrival').slice(0, 6);

  const isWishlisted = (id: string) => wishlist.some((item) => item.id === id);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert('Thank you for joining our exclusive circle.');
    setEmail('');
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-text-anim', 
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.15 }
      );
      tl.fromTo('.hero-image-anim',
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.3 },
        '-=0.9'
      );

      // Scroll reveals for cards and sections
      gsap.fromTo('.reveal-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.categories-section',
            start: 'top 85%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#F8F6F2] text-[#2A2A2A] overflow-hidden font-sans">
      
      {/* 1. HERO SECTION */}
      <section 
        ref={heroRef}
        className="relative min-h-screen bg-[#F8F6F2] flex flex-col lg:flex-row lg:items-center overflow-hidden pt-16 pb-16"
      >
        {/* Left column content aligned to container grid */}
        <div className="w-full max-w-[1560px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-[45%] text-left space-y-8 py-12 lg:py-24">
            <div className="space-y-4">
              <h1 className="hero-text-slide text-4xl sm:text-5xl lg:text-[68px] font-heading font-light leading-[1.08] tracking-tight text-[#5C0F24]">
                {HERO_SLIDES[currentSlide].title.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h1>
              <p className="hero-text-slide text-sm sm:text-base leading-relaxed text-[#805E63] font-sans max-w-md">
                {HERO_SLIDES[currentSlide].subtitle}
              </p>
            </div>
            
            <div className="hero-text-slide flex flex-wrap gap-4 pt-2">
              <Link 
                to={HERO_SLIDES[currentSlide].linkUrl}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C79A3B] hover:bg-[#5C0F24] text-[#F8F6F2] uppercase tracking-wider text-xs font-semibold transition-all duration-300 shadow-md hover:shadow-lg rounded-none"
              >
                {HERO_SLIDES[currentSlide].linkText} &rarr;
              </Link>
            </div>

            {/* Inlined small USPs with elegant thin outline badges */}
            <div className="hero-text-anim pt-8 grid grid-cols-3 gap-4 border-t border-[#EFE6DC] mt-10 text-left font-sans text-[10px] text-[#2A2A2A]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EFE6DC]/30 border border-[#EFE6DC] flex items-center justify-center text-[#C79A3B]">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-semibold leading-tight">Premium Quality</h4>
                  <p className="text-[9px] text-[#805E63]">Crafted to last</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EFE6DC]/30 border border-[#EFE6DC] flex items-center justify-center text-[#C79A3B]">
                  <RotateCcw className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-semibold leading-tight">Easy Returns</h4>
                  <p className="text-[9px] text-[#805E63]">30-day return</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EFE6DC]/30 border border-[#EFE6DC] flex items-center justify-center text-[#C79A3B]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-semibold leading-tight">Secure Payments</h4>
                  <p className="text-[9px] text-[#805E63]">100% protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side absolute full-bleed image on desktop */}
        <div className="hero-image-anim absolute right-0 top-16 bottom-0 w-full lg:w-[50%] xl:w-[54%] h-[calc(100%-64px)] z-0 hidden lg:block">
          <div className="w-full h-full relative overflow-hidden rounded-l-[45%_50%] border-l border-[#C79A3B]/10 shadow-2xl bg-white">
            <img
              src={HERO_SLIDES[currentSlide].image}
              alt="Luxury jewelry design showcase"
              className="hero-image-slide w-full h-full object-cover"
            />
            {/* Minimal slider navigation overlay */}
            <div className="absolute bottom-8 right-8 bg-[#F8F6F2]/90 backdrop-blur-md border border-[#EFE6DC] px-5 py-2.5 flex items-center gap-4 text-[10px] uppercase tracking-widest font-semibold text-[#5C0F24] rounded-full shadow-md pointer-events-auto">
              <button 
                onClick={handlePrevSlide} 
                className="hover:text-[#C79A3B] transition-colors cursor-pointer"
                title="Previous slide"
              >
                &larr;
              </button>
              <span>{currentSlide + 1} / {HERO_SLIDES.length}</span>
              <button 
                onClick={handleNextSlide} 
                className="hover:text-[#C79A3B] transition-colors cursor-pointer"
                title="Next slide"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Mobile-only relative image block */}
        <div className="w-full lg:hidden px-6 pb-16 relative z-10">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#C79A3B]/20 shadow-lg bg-white p-1">
            <img
              src={HERO_SLIDES[currentSlide].image}
              alt="Luxury jewelry design showcase mobile"
              className="hero-image-slide w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute bottom-4 right-4 bg-[#F8F6F2]/90 backdrop-blur-sm border border-[#EFE6DC] px-4 py-2 flex items-center gap-3 text-[9px] uppercase tracking-wider font-semibold text-[#5C0F24] rounded-full shadow-sm">
              <button 
                onClick={handlePrevSlide} 
                className="hover:text-[#C79A3B] transition-colors cursor-pointer"
                title="Previous slide"
              >
                &larr;
              </button>
              <span>{currentSlide + 1} / {HERO_SLIDES.length}</span>
              <button 
                onClick={handleNextSlide} 
                className="hover:text-[#C79A3B] transition-colors cursor-pointer"
                title="Next slide"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>



      {/* 3. SHOP BY CATEGORY SECTION */}
      <section className="categories-section py-16 px-6 md:px-12 max-w-[1560px] mx-auto space-y-8">
        <div className="flex justify-between items-end border-b border-[#EFE6DC] pb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-heading text-lg md:text-xl uppercase tracking-widest text-[#5C0F24] font-semibold">
              Shop By Category
            </h2>
            <HeadingDivider />
          </div>
          <Link 
            to="/catalog" 
            className="text-xs uppercase tracking-wider font-semibold text-[#C79A3B] hover:text-[#5C0F24] transition-colors flex items-center gap-1"
          >
            View all categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[
            { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=300', query: 'Necklaces' },
            { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=300', query: 'Rings' },
            { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=300', query: 'Bracelets' },
            { name: 'Temple Sets', image: 'https://images.unsplash.com/photo-1617038227653-b1d62dc7dcf7?auto=format&fit=crop&q=80&w=300', query: 'Necklaces' },
            { name: 'Earrings', image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=300', query: 'Earrings' },
            { name: 'Pendants', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=300', query: 'Pendants' },
            { name: 'Mangalsutra', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=300', query: 'Necklaces' },
            { name: 'Wedding Sets', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=300', query: 'Necklaces' }
          ].map((col) => (
            <Link 
              key={col.name} 
              to={`/catalog?category=${col.query}`}
              className="reveal-card bg-[#EFE6DC]/30 border border-[#EFE6DC] rounded-2xl flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
            >
              <div className="aspect-square bg-muted relative overflow-hidden">
                <img 
                  src={col.image} 
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="py-3 px-4 bg-white border-t border-[#EFE6DC] font-heading text-xs sm:text-sm font-semibold text-center text-[#5C0F24] transition-colors group-hover:bg-[#5C0F24] group-hover:text-white">
                {col.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. OUR BEST SELLERS */}
      <section className="py-16 bg-[#F8F6F2] px-6 md:px-12 border-t border-b border-[#EFE6DC] max-w-[1560px] mx-auto space-y-8">
        <div className="flex justify-between items-end border-b border-[#EFE6DC] pb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-heading text-lg md:text-xl text-[#5C0F24] font-semibold">
              Best Sellers
            </h2>
            <HeadingDivider />
          </div>
          <Link 
            to="/catalog" 
            className="text-xs font-sans font-semibold text-[#C79A3B] hover:text-[#5C0F24] transition-colors flex items-center gap-1"
          >
            View all best sellers &rarr;
          </Link>
        </div>

        {/* Carousel Grid - Rounded 2xl Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {bestSellers.map((product, idx) => (
            <Link 
              key={product.id}
              to={`/product/${product.id}`}
              className="group bg-white border border-[#EFE6DC] rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 relative"
            >
              {/* Gold "Bestseller" Badge (First item or custom bestseller tag) */}
              {idx === 0 && (
                <div className="absolute top-4 left-4 bg-[#C79A3B] text-white text-[8px] font-semibold font-sans px-2.5 py-1 rounded-md uppercase tracking-wider z-10 shadow-sm">
                  Bestseller
                </div>
              )}

              {/* Heart Wishlist icon */}
              <button 
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigating to detail page on click
                  toggleWishlist(product);
                }}
                className={`absolute top-4 right-4 z-10 w-7 h-7 rounded-full flex items-center justify-center border transition-colors bg-white/90 backdrop-blur-sm ${
                  isWishlisted(product.id) ? 'border-[#5C0F24] text-[#5C0F24]' : 'border-[#EFE6DC] text-[#805E63] hover:text-[#5C0F24]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted(product.id) ? 'fill-[#5C0F24]' : ''}`} />
              </button>

              <div className="aspect-square bg-[#F8F6F2] relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                />
              </div>

              <div className="p-4 flex flex-col flex-grow justify-between bg-white text-left">
                <div className="space-y-1">
                  <h3 className="font-heading text-xs font-semibold text-[#2A2A2A] truncate">
                    {product.name}
                  </h3>
                  
                  {/* Rating stars & review count */}
                  <div className="flex items-center gap-1 text-[#C79A3B] text-[10px]">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[#805E63] text-[9.5px] font-sans">({product.reviews || 95})</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="font-sans text-xs font-bold text-[#2A2A2A]">
                    ₹ {product.price.toLocaleString('en-IN')}
                  </div>
                  
                  {/* Small Square Burgundy Add to Cart button */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigating to detail page on click
                      addToCart(product, 1);
                      toggleCart(true);
                    }}
                    className="w-7 h-7 rounded-lg bg-[#5C0F24] hover:bg-[#C79A3B] flex items-center justify-center text-white transition-colors duration-300 shadow-sm"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. FEATURED COLLECTION BANNER */}
      <section className="max-w-[1560px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-[#EFE6DC] bg-white rounded-2xl">
          {/* Left: Close-up Ring Image */}
          <div className="aspect-[16/10] md:aspect-auto min-h-[360px] relative bg-muted">
            <img 
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800" 
              alt="Luxury diamond rose gold ring with pink gemstone close up"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          {/* Right: Solid Burgundy Box */}
          <div className="p-10 md:p-16 flex flex-col justify-center space-y-5 bg-[#5C0F24] text-[#F8F6F2] text-left relative">
            <h3 className="font-heading text-2xl md:text-3xl font-light leading-snug tracking-wide text-white">
              Timeless Elegance
            </h3>
            <p className="text-xs text-[#F8F6F2]/80 font-sans leading-relaxed max-w-md">
              Discover pieces that make every moment unforgettable. Designed for individual elegance, crafted by master hands.
            </p>
            <div className="pt-2">
              <Link 
                to="/catalog" 
                className="inline-flex items-center gap-2.5 px-7 py-3 bg-[#C79A3B] hover:bg-white hover:text-[#5C0F24] text-[#F8F6F2] uppercase tracking-wider text-xs font-semibold transition-all duration-300"
              >
                Explore Collection
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BRAND SHOWCASE VIDEO & VALUE CARDS SECTION */}
      <section className="max-w-[1560px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Column 1: Why Choose Us list (Span 4) */}
          <div className="col-span-1 lg:col-span-4 bg-white border border-[#EFE6DC] rounded-3xl p-8 flex flex-col justify-between text-left shadow-sm">
            <div className="space-y-6">
              <h3 className="font-heading text-lg font-semibold text-[#5C0F24]">Why Choose SHAS Jewellers?</h3>
              
              <div className="space-y-5 font-sans">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#F8F6F2] border border-[#EFE6DC] rounded-xl flex items-center justify-center text-[#C79A3B] flex-shrink-0 mt-0.5">
                    <Gem className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-[#2A2A2A]">Premium Materials</h4>
                    <p className="text-[11px] text-[#805E63] leading-relaxed mt-0.5">Only the finest certified metals and conflict-free stones.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#F8F6F2] border border-[#EFE6DC] rounded-xl flex items-center justify-center text-[#C79A3B] flex-shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-[#2A2A2A]">Expert Craftsmanship</h4>
                    <p className="text-[11px] text-[#805E63] leading-relaxed mt-0.5">Handcrafted with precision by generational master artisans.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#F8F6F2] border border-[#EFE6DC] rounded-xl flex items-center justify-center text-[#C79A3B] flex-shrink-0 mt-0.5">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-[#2A2A2A]">Made to Last</h4>
                    <p className="text-[11px] text-[#805E63] leading-relaxed mt-0.5">Timeless heirloom designs carrying eternal beauty.</p>
                  </div>
                </div>
              </div>
            </div>

            <Link 
              to="/about" 
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#C79A3B] hover:text-[#5C0F24] transition-colors uppercase tracking-wider mt-6 w-fit"
            >
              Learn More About Us &rarr;
            </Link>
          </div>

          {/* Column 2: Video Card (Span 5) */}
          <div className="col-span-1 lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-[300px] rounded-3xl overflow-hidden border border-[#EFE6DC] bg-muted shadow-sm group">
            <img 
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800" 
              alt="Luxury jewelry close up video showcase preview"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
            />
            {/* Outline Circular Play Button */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <button 
                onClick={() => alert("Playing brand showcase video...")}
                className="w-16 h-16 rounded-full border-2 border-white text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform bg-black/10 backdrop-blur-sm"
                title="Play Video"
              >
                <svg className="w-6 h-6 fill-current translate-x-0.5 text-white" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Column 3: Stacked trust cards (Span 3) */}
          <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
            
            {/* Free Shipping Card */}
            <div className="bg-white border border-[#EFE6DC] p-6 rounded-3xl flex gap-4 items-center text-left shadow-sm flex-1">
              <div className="w-11 h-11 bg-[#F8F6F2] border border-[#EFE6DC] rounded-xl flex items-center justify-center text-[#C79A3B] flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-heading font-semibold text-sm text-[#5C0F24]">Free Shipping</h4>
                <p className="text-[10px] text-[#805E63] leading-tight">On all orders over ₹999</p>
              </div>
            </div>

            {/* Gift Packaging Card */}
            <div className="bg-white border border-[#EFE6DC] p-6 rounded-3xl flex gap-4 items-center text-left shadow-sm flex-1">
              <div className="w-11 h-11 bg-[#F8F6F2] border border-[#EFE6DC] rounded-xl flex items-center justify-center text-[#C79A3B] flex-shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-heading font-semibold text-sm text-[#5C0F24]">Gift Packaging</h4>
                <p className="text-[10px] text-[#805E63] leading-tight">Beautifully packed for your loved ones</p>
              </div>
            </div>

          </div>

        </div>
      </section>



      {/* 8. NEW ARRIVALS */}
      <section className="py-16 bg-[#F8F6F2] px-6 md:px-12 border-t border-b border-[#EFE6DC] max-w-[1560px] mx-auto space-y-8">
        <div className="flex justify-between items-end border-b border-[#EFE6DC] pb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-heading text-lg md:text-xl text-[#5C0F24] font-semibold">
              New Arrivals
            </h2>
            <HeadingDivider />
          </div>
          <Link 
            to="/catalog" 
            className="text-xs font-sans font-semibold text-[#C79A3B] hover:text-[#5C0F24] transition-colors flex items-center gap-1"
          >
            View all new arrivals &rarr;
          </Link>
        </div>

        {/* 6 Items Grid (Clean style, rounded 2xl matching mockup) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {newArrivals.map((product) => (
            <Link 
              key={product.id}
              to={`/product/${product.id}`}
              className="group bg-white border border-[#EFE6DC] overflow-hidden flex flex-col hover:shadow-md transition-all duration-300 relative"
            >
              {/* Heart Wishlist icon */}
              <button 
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation
                  toggleWishlist(product);
                }}
                className={`absolute top-4 right-4 z-10 w-7 h-7 rounded-full flex items-center justify-center border transition-colors bg-white/90 backdrop-blur-sm ${
                  isWishlisted(product.id) ? 'border-[#5C0F24] text-[#5C0F24]' : 'border-[#EFE6DC] text-[#805E63] hover:text-[#5C0F24]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted(product.id) ? 'fill-[#5C0F24]' : ''}`} />
              </button>

              <div className="aspect-square bg-[#F8F6F2] relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                />
              </div>

              {/* Title & price label */}
              <div className="p-4 text-left bg-white">
                <h3 className="font-heading text-xs font-semibold text-[#2A2A2A] truncate">
                  {product.name}
                </h3>
                <span className="font-sans text-[11px] font-semibold text-[#805E63] block mt-1">
                  ₹ {product.price.toLocaleString('en-IN')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 9. EDITORIAL ROW GRID */}
      <section className="py-16 px-6 md:px-12 max-w-[1560px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Our Happy Customers (Span 3) */}
          <div className="col-span-1 lg:col-span-3 bg-white border border-[#EFE6DC] rounded-3xl p-8 flex flex-col justify-between space-y-6 text-left shadow-sm">
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold text-[#5C0F24]">Our Happy Customers</h3>
              <div className="flex items-center gap-2">
                <div className="flex text-[#C79A3B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#2A2A2A]">4.9/5</span>
              </div>
              <p className="text-[11px] text-[#805E63] leading-relaxed">
                Loved by thousands of happy customers
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Customer 1" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" alt="Customer 2" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" alt="Customer 3" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Customer 4" />
              </div>
              <p className="text-[9px] text-[#805E63] font-sans font-medium uppercase tracking-wider">
                Join 2,000+ happy customers
              </p>
            </div>
          </div>

          {/* Column 2: Follow Us @shas.jewellers (Span 5) */}
          <div className="col-span-1 lg:col-span-5 bg-white border border-[#EFE6DC] rounded-3xl p-8 flex flex-col justify-between space-y-6 text-left shadow-sm">
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold text-[#5C0F24]">Follow Us @shas.jewellers</h3>
              
              <div className="grid grid-cols-5 gap-2.5">
                {[
                  'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=200',
                  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=200',
                  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=200',
                  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=200',
                  'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=200'
                ].map((url, index) => (
                  <div key={index} className="aspect-square bg-muted rounded-xl overflow-hidden border border-[#EFE6DC]">
                    <img src={url} alt={`Insta post ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>

            <a 
              href="https://www.facebook.com/people/Shas-Jewellers/61589777022840/?ref=NONE_xav_ig_profile_page_web" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-[#5C0F24] hover:bg-[#5C0F24] hover:text-[#F8F6F2] text-[#5C0F24] text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 rounded-xl w-fit"
            >
              View On Instagram &rarr;
            </a>
          </div>

          {/* Column 3: Join Our Community (Span 4) */}
          <div className="col-span-1 lg:col-span-4 bg-white border border-[#EFE6DC] rounded-3xl p-8 flex flex-col justify-between space-y-6 text-left shadow-sm">
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold text-[#5C0F24]">Join Our Community</h3>
              <p className="text-[11px] text-[#805E63] leading-relaxed">
                Subscribe for exclusive offers, new arrivals & style tips.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <input 
                type="email" 
                required
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 border border-[#EFE6DC] bg-[#F8F6F2] text-xs outline-none text-[#2A2A2A] focus:border-[#C79A3B] rounded-xl"
              />
              <button 
                type="submit" 
                className="w-full h-11 bg-[#5C0F24] hover:bg-[#C79A3B] text-white font-semibold text-xs uppercase tracking-widest transition-colors duration-300 rounded-xl"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>

        </div>
      </section>



    </div>
  );
}
