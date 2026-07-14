import { Link } from 'react-router-dom';
import { Truck, RotateCcw, Lock, Headphones } from 'lucide-react';
import logoImg from '@/assets/shaslogo.png';

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.16-.1-.95-.2-2.4.04-3.43.22-.93 1.4-5.93 1.4-5.93s-.36-.72-.36-1.77c0-1.66.96-2.9 2.17-2.9 1.02 0 1.51.77 1.51 1.68 0 1.03-.66 2.56-.99 3.98-.28 1.19.6 2.16 1.77 2.16 2.13 0 3.76-2.25 3.76-5.5 0-2.88-2.07-4.9-5.03-4.9-3.43 0-5.44 2.57-5.44 5.23 0 1.04.4 2.15.9 2.75.1.12.11.23.08.35-.09.38-.29 1.18-.33 1.34-.05.22-.18.27-.41.16-1.53-.71-2.48-2.95-2.48-4.75 0-3.87 2.81-7.43 8.11-7.43 4.26 0 7.57 3.03 7.57 7.09 0 4.23-2.66 7.64-6.36 7.64-1.24 0-2.41-.64-2.81-1.41 0 0-.61 2.33-.76 2.9-.28 1.07-1.03 2.4-1.54 3.23A12.016 12.016 0 0012 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
  </svg>
);

const TiktokIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.53.07C13.78.03 15 .01 16.22 0c.07 1.55.77 3.02 1.94 4.02 1.22.95 2.82 1.41 4.38 1.37v3.29c-1.84.05-3.64-.67-4.88-2.03-.04.82-.04 1.64-.04 2.46 0 3.32-1.92 6.44-5 7.63-3.13 1.25-6.88.58-9.28-1.68-2.52-2.31-2.99-6.26-1.12-9.08 1.74-2.69 5.23-3.86 8.28-2.85V6.7c-1.64-.6-3.55-.17-4.76 1.04-1.41 1.36-1.66 3.63-.58 5.25.99 1.53 2.97 2.27 4.74 1.74 1.7-.49 2.82-2.11 2.76-3.88V.07z"/>
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative z-10 border-t border-border/10 mt-20">
      
      {/* 1. Burgundy Trust Announcement Bar */}
      <section className="bg-[#5C0F24] text-[#F8F6F2] py-12 px-6 md:px-12">
        <div className="max-w-[1560px] mx-auto flex flex-col sm:flex-row gap-8 md:gap-4 justify-between items-center text-left font-sans text-xs divide-y sm:divide-y-0 sm:divide-x divide-[#C79A3B]/30">
          
          <div className="flex gap-5 items-center flex-1 pb-6 sm:pb-0 sm:px-6 justify-center sm:justify-start">
            <Truck className="w-7 h-7 text-[#C79A3B] flex-shrink-0" />
            <div>
              <h4 className="font-heading font-semibold uppercase tracking-widest text-[#F8F6F2] text-[13px]">Free Shipping</h4>
              <p className="text-xs text-[#F8F6F2]/70 mt-0.5 leading-tight">On all orders over ₹999</p>
            </div>
          </div>

          <div className="flex gap-5 items-center flex-1 pt-6 sm:pt-0 sm:px-6 justify-center sm:justify-start">
            <RotateCcw className="w-7 h-7 text-[#C79A3B] flex-shrink-0" />
            <div>
              <h4 className="font-heading font-semibold uppercase tracking-widest text-[#F8F6F2] text-[13px]">Easy Returns</h4>
              <p className="text-xs text-[#F8F6F2]/70 mt-0.5 leading-tight">30-day return policy guarantee</p>
            </div>
          </div>

          <div className="flex gap-5 items-center flex-1 pt-6 sm:pt-0 sm:px-6 justify-center sm:justify-start">
            <Lock className="w-7 h-7 text-[#C79A3B] flex-shrink-0" />
            <div>
              <h4 className="font-heading font-semibold uppercase tracking-widest text-[#F8F6F2] text-[13px]">Secure Payments</h4>
              <p className="text-xs text-[#F8F6F2]/70 mt-0.5 leading-tight">100% protected checkout safety</p>
            </div>
          </div>

          <div className="flex gap-5 items-center flex-1 pt-6 sm:pt-0 sm:px-6 justify-center sm:justify-start">
            <Headphones className="w-7 h-7 text-[#C79A3B] flex-shrink-0" />
            <div>
              <h4 className="font-heading font-semibold uppercase tracking-widest text-[#F8F6F2] text-[13px]">24/7 Support</h4>
              <p className="text-xs text-[#F8F6F2]/70 mt-0.5 leading-tight">We are here to help anytime</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Main Footer Body (Light mode cream background with vertical divider) */}
      <div className="w-full bg-[#F8F6F2] text-[#2A2A2A] py-16 px-6 md:px-12 border-b border-border/20">
        <div className="max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Brand Info (Span 4) */}
          <div className="col-span-1 lg:col-span-4 space-y-6 lg:pr-8 lg:border-r border-[#EFE6DC]">
            <Link to="/" className="hover:opacity-85 transition-opacity inline-block">
              <img 
                src={logoImg} 
                alt="SHAS Jewellers Logo" 
                className="h-24 w-auto object-contain mix-blend-multiply" 
              />
            </Link>
            <p className="text-[#805E63] text-xs leading-relaxed max-w-xs font-sans">
              Timeless designs. Thoughtful craftsmanship. Made to be treasured. Celebrating your special moments with handcrafted elegance.
            </p>
            <div className="flex items-center gap-3.5 text-[#805E63]">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C79A3B] transition-colors" title="Instagram">
                <InstagramIcon />
              </a>
              <a 
                href="https://www.facebook.com/people/Shas-Jewellers/61589777022840/?ref=NONE_xav_ig_profile_page_web" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#C79A3B] transition-colors" 
                title="Facebook"
              >
                <FacebookIcon />
              </a>
              <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C79A3B] transition-colors" title="Pinterest">
                <PinterestIcon />
              </a>
              <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C79A3B] transition-colors" title="TikTok">
                <TiktokIcon />
              </a>
            </div>
          </div>

          {/* Links Column 1: Shop (Span 2) */}
          <div className="col-span-1 lg:col-span-2 space-y-4 lg:pl-4">
            <h4 className="font-heading text-xs uppercase tracking-[0.15em] text-[#C79A3B] font-bold">Shop</h4>
            <ul className="space-y-2.5 font-sans text-xs text-[#805E63]">
              <li><Link to="/catalog" className="hover:text-[#C79A3B] transition-colors">All Jewelry</Link></li>
              <li><Link to="/catalog?category=Necklaces" className="hover:text-[#C79A3B] transition-colors">Necklaces</Link></li>
              <li><Link to="/catalog?category=Earrings" className="hover:text-[#C79A3B] transition-colors">Earrings</Link></li>
              <li><Link to="/catalog?category=Rings" className="hover:text-[#C79A3B] transition-colors">Rings</Link></li>
              <li><Link to="/catalog?category=Bracelets" className="hover:text-[#C79A3B] transition-colors">Bracelets</Link></li>
              <li><Link to="/catalog?tag=Sale" className="hover:text-[#C79A3B] transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Links Column 2: Collections (Span 2) */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <h4 className="font-heading text-xs uppercase tracking-[0.15em] text-[#C79A3B] font-bold">Collections</h4>
            <ul className="space-y-2.5 font-sans text-xs text-[#805E63]">
              <li><Link to="/catalog?tag=New%20Arrival" className="hover:text-[#C79A3B] transition-colors">New Arrivals</Link></li>
              <li><Link to="/catalog?tag=Best%20Seller" className="hover:text-[#C79A3B] transition-colors">Best Sellers</Link></li>
              <li><Link to="/catalog" className="hover:text-[#C79A3B] transition-colors">Gifts for Her</Link></li>
              <li><Link to="/catalog" className="hover:text-[#C79A3B] transition-colors">Wedding</Link></li>
              <li><Link to="/catalog" className="hover:text-[#C79A3B] transition-colors">Mangalsutra</Link></li>
              <li><Link to="/catalog" className="hover:text-[#C79A3B] transition-colors">Luxe</Link></li>
            </ul>
          </div>

          {/* Links Column 3: Customer Care (Span 2) */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <h4 className="font-heading text-xs uppercase tracking-[0.15em] text-[#C79A3B] font-bold">Customer Care</h4>
            <ul className="space-y-2.5 font-sans text-xs text-[#805E63]">
              <li><Link to="/about" className="hover:text-[#C79A3B] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#C79A3B] transition-colors">Contact Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#C79A3B] transition-colors">Shipping Policy</Link></li>
              <li><Link to="/contact" className="hover:text-[#C79A3B] transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/contact" className="hover:text-[#C79A3B] transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-[#C79A3B] transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          {/* Links Column 4: Information (Span 2) */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <h4 className="font-heading text-xs uppercase tracking-[0.15em] text-[#C79A3B] font-bold">Information</h4>
            <ul className="space-y-2.5 font-sans text-xs text-[#805E63]">
              <li><Link to="/journal" className="hover:text-[#C79A3B] transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-[#C79A3B] transition-colors">Care Instructions</Link></li>
              <li><Link to="/" className="hover:text-[#C79A3B] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-[#C79A3B] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* 3. Bottom Copyright & Payment Row */}
      <div className="w-full bg-[#F8F6F2] text-[#805E63] py-8 px-6 md:px-12">
        <div className="max-w-[1560px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-sans text-[10px] uppercase tracking-widest text-center sm:text-left">
            © {currentYear} SHAS JEWELLERY. ALL RIGHTS RESERVED.
          </p>
          
          {/* Payment Badges aligned right */}
          <div className="flex items-center gap-2">
            {/* Visa */}
            <div className="w-10 h-6 bg-white border border-[#EFE6DC] rounded flex items-center justify-center text-[10px] font-bold text-[#1A1F71] italic select-none">VISA</div>
            {/* Mastercard */}
            <div className="w-10 h-6 bg-white border border-[#EFE6DC] rounded flex items-center justify-center gap-0.5 select-none">
              <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B] opacity-90"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90 -ml-2"></div>
            </div>
            {/* PayPal */}
            <div className="w-10 h-6 bg-white border border-[#EFE6DC] rounded flex items-center justify-center text-[9px] font-bold text-[#003087] italic select-none">PayPal</div>
            {/* Apple Pay */}
            <div className="w-10 h-6 bg-white border border-[#EFE6DC] rounded flex items-center justify-center text-[9px] font-semibold text-[#000000] select-none"> Pay</div>
            {/* Google Pay */}
            <div className="w-10 h-6 bg-white border border-[#EFE6DC] rounded flex items-center justify-center text-[9px] font-semibold text-[#5F6368] select-none">G Pay</div>
          </div>
        </div>
      </div>

    </footer>
  );
}
