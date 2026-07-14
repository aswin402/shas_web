import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { Heart, ShoppingBag, Search, User, ChevronDown, Truck, Award, ShieldCheck, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import logoImg from '@/assets/shaslogo.png';

export function Navbar() {
  const { cart, wishlist, toggleCart } = useAppStore();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-border/20 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-sm' 
        : 'bg-background'
    }`}>
      
      {/* Top Banner Bar matching the mockup exactly */}
      <div className="w-full bg-[#5C0F24] text-[#F8F6F2] text-[9px] font-sans font-medium uppercase tracking-[0.18em] py-2 px-6 border-b border-[#C79A3B]/30">
        <div className="flex justify-between w-full max-w-[1560px] mx-auto flex-nowrap items-center text-center text-[7.5px] sm:text-[8px] md:text-[9.5px] divide-x divide-[#C79A3B]/30">
          <span className="flex items-center justify-center gap-1.5 flex-1 py-0.5 px-1">
            <Truck className="w-3.5 h-3.5 text-[#C79A3B]" />
            Free Insured Shipping
          </span>
          <span className="flex items-center justify-center gap-1.5 flex-1 py-0.5 px-1">
            <Award className="w-3.5 h-3.5 text-[#C79A3B]" />
            Hallmarked Jewellery
          </span>
          <span className="flex items-center justify-center gap-1.5 flex-1 py-0.5 px-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C79A3B]" />
            Lifetime Plating Warranty
          </span>
          <span className="flex items-center justify-center gap-1.5 flex-1 py-0.5 px-1">
            <Lock className="w-3.5 h-3.5 text-[#C79A3B]" />
            Secure Payments
          </span>
        </div>
      </div>

      {/* Main Navigation Row */}
      <nav className={`flex items-center justify-between px-6 md:px-12 transition-all duration-500 max-w-[1560px] mx-auto ${
        isScrolled ? 'h-16' : 'h-24'
      }`}>
        {/* Brand logo SHAS */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link 
            to="/" 
            className="hover:opacity-85 transition-opacity block"
          >
            <img 
              src={logoImg} 
              alt="SHAS Jewellers Logo" 
              className={`transition-all duration-500 w-auto object-contain mix-blend-multiply ${
                isScrolled ? 'h-12' : 'h-20'
              }`}
            />
          </Link>
        </div>

        {/* Navigation links matching the mockup exactly */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8 font-heading text-[10.5px] xl:text-[11.5px] uppercase tracking-[0.15em]">
          <Link 
            to="/" 
            className={`transition-colors hover:text-[#C79A3B] relative py-1 ${
              location.pathname === '/' ? 'text-[#C79A3B] font-semibold border-b border-[#C79A3B]' : 'text-[#2A2A2A]'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/catalog" 
            className="transition-colors hover:text-[#C79A3B] py-1 text-[#2A2A2A] flex items-center gap-1"
          >
            Collections <ChevronDown className="w-3 h-3 text-[#C79A3B]" />
          </Link>
          <Link 
            to="/catalog?metal=22K+Yellow+Gold" 
            className="transition-colors hover:text-[#C79A3B] py-1 text-[#2A2A2A] flex items-center gap-1"
          >
            Gold <ChevronDown className="w-3 h-3 text-[#C79A3B]" />
          </Link>
          <Link 
            to="/catalog?metal=18K+Rose+Gold" 
            className="transition-colors hover:text-[#C79A3B] py-1 text-[#2A2A2A] flex items-center gap-1"
          >
            Silver <ChevronDown className="w-3 h-3 text-[#C79A3B]" />
          </Link>
          <Link 
            to="/catalog?category=Necklaces" 
            className="transition-colors hover:text-[#C79A3B] py-1 text-[#2A2A2A]"
          >
            Temple Jewellery
          </Link>
          <Link 
            to="/catalog" 
            className="transition-colors hover:text-[#C79A3B] py-1 text-[#2A2A2A]"
          >
            Bridal
          </Link>
          <Link 
            to="/about" 
            className="transition-colors hover:text-[#C79A3B] py-1 text-[#2A2A2A]"
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className="transition-colors hover:text-[#C79A3B] py-1 text-[#2A2A2A]"
          >
            Contact
          </Link>
        </div>

        {/* Action triggers */}
        <div className="flex items-center gap-2.5 md:gap-4 text-[#2A2A2A] flex-shrink-0">
          {/* Search Trigger */}
          <button className="p-1.5 hover:text-[#C79A3B] transition-colors" title="Search">
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Wishlist Link */}
          <Link 
            to="/catalog?filter=wishlist" 
            className="relative p-1.5 hover:text-[#C79A3B] transition-colors"
            title="Wishlist"
          >
            <Heart className={`w-4.5 h-4.5 ${wishlistCount > 0 ? 'text-[#5C0F24] fill-[#5C0F24]' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#5C0F24] text-white font-sans text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Profile Trigger */}
          <button className="p-1.5 hover:text-[#C79A3B] transition-colors" title="Profile">
            <User className="w-4.5 h-4.5" />
          </button>

          {/* Cart trigger drawer button */}
          <button
            onClick={() => toggleCart(true)}
            className="relative p-1.5 hover:text-[#C79A3B] transition-colors flex items-center justify-center"
            title="Cart bag"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            <span className="absolute -top-0.5 -right-0.5 bg-[#C79A3B] text-white font-sans text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </button>

          {/* Small theme toggle */}
          <ThemeToggleButton />
        </div>
      </nav>
    </div>
  );
}
