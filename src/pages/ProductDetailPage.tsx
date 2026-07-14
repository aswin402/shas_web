import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '@/api/products';
import { ProductCard } from '@/components/ProductCard';
import { useAppStore } from '@/store/useAppStore';
import { ChevronLeft, Star, Heart, ShoppingBag } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart, toggleCart, toggleWishlist, wishlist } = useAppStore();

  const [activeImage, setActiveImage] = useState<string>('');
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: 'none' });
  const [quantity, setQuantity] = useState<number>(1);

  const product = PRODUCTS.find((p) => p.id === id);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center space-y-4">
        <h2 className="font-heading text-2xl text-tagline-muted">Treasure Not Found</h2>
        <p className="text-sm font-sans">The heirloom item you are looking for does not exist in our archive.</p>
        <Link to="/catalog" className="inline-block px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-xs font-sans uppercase tracking-wider font-semibold">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  // Recommendations: products from the same category or overall collection
  const recommendations = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  // Dynamic image zoom magnifier effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${activeImage})`,
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const handleAddToBag = () => {
    addToCart(product, quantity);
    toggleCart(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 mt-6 bg-[#F8F6F2] text-[#2C2A38]">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-sans text-tagline-muted uppercase tracking-wider mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-primary transition-colors">Catalog</Link>
        <span>/</span>
        <Link to={`/catalog?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-foreground truncate">{product.name}</span>
      </nav>

      {/* Main product columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
        
        {/* Left Column: Image Gallery with Magnifier */}
        <div className="space-y-4">
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative aspect-square w-full border border-[#E8DECF] bg-white overflow-hidden cursor-zoom-in"
          >
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            {/* Magnifier zoom window */}
            <div 
              style={{
                ...zoomStyle,
                backgroundSize: '200%',
                backgroundRepeat: 'no-repeat',
              }}
              className="absolute inset-0 pointer-events-none transition-opacity duration-200"
            />

            {/* Tag badge */}
            {product.tag && (
              <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-sans uppercase tracking-widest px-3 py-1 font-medium">
                {product.tag}
              </span>
            )}
          </div>

          {/* Thumbnails Row */}
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveImage(product.image)}
              className={`w-20 h-20 border overflow-hidden bg-white ${
                activeImage === product.image ? 'border-[#E5A924] scale-105' : 'border-[#E8DECF]'
              } transition-all duration-300`}
            >
              <img src={product.image} alt="Main view" className="w-full h-full object-cover" />
            </button>
            <button 
              onClick={() => setActiveImage(product.secondaryImage)}
              className={`w-20 h-20 border overflow-hidden bg-white ${
                activeImage === product.secondaryImage ? 'border-[#E5A924] scale-105' : 'border-[#E8DECF]'
              } transition-all duration-300`}
            >
              <img src={product.secondaryImage} alt="Alternate view" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        {/* Right Column: Metadata & Checkout Specs */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] text-tagline-muted uppercase tracking-[0.2em] font-sans font-semibold">
              SKU: {product.sku}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-light text-foreground leading-tight">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-4 border-b border-[#E8DECF] pb-4">
            <span className="font-serif text-2xl font-bold text-foreground">
              ₹ {product.price.toLocaleString('en-IN')}
            </span>
            <div className="h-4 w-px bg-[#E8DECF]" />
            <div className="flex items-center gap-1.5 font-sans">
              <div className="flex text-[#E5A924]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs text-tagline-muted">
                ({product.reviews} global reviews)
              </span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-foreground/80 font-sans">
            {product.description}
          </p>

          {/* Details specs list */}
          <div className="grid grid-cols-2 gap-4 border-t border-b border-[#E8DECF]/60 py-4 font-sans text-xs">
            <div className="flex gap-2">
              <span className="text-tagline-muted font-semibold uppercase w-20">Metal:</span>
              <span className="text-foreground">{product.metal}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-tagline-muted font-semibold uppercase w-20">Gemstone:</span>
              <span className="text-foreground">{product.gemstone}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-tagline-muted font-semibold uppercase w-20">Certificate:</span>
              <span className="text-foreground">BIS Hallmark 916</span>
            </div>
            <div className="flex gap-2">
              <span className="text-tagline-muted font-semibold uppercase w-20">Weight:</span>
              <span className="text-foreground">Approx. 18.4g</span>
            </div>
          </div>

          {/* Quantity Selector & Add CTAs */}
          <div className="flex flex-wrap gap-4 font-sans text-xs items-center">
            
            {/* Quantity */}
            <div className="flex items-center border border-[#E8DECF] rounded-full px-3 py-2 bg-white">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 text-tagline-muted hover:text-foreground font-semibold"
              >
                -
              </button>
              <span className="px-3 font-semibold text-foreground">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 text-tagline-muted hover:text-foreground font-semibold"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToBag}
              className="flex-1 min-w-[200px] py-3.5 rounded-full bg-primary text-primary-foreground uppercase tracking-wider font-semibold hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 flex items-center justify-center gap-2 maroon-glow"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Shopping Bag
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                isWishlisted 
                  ? 'border-primary text-primary bg-primary/5 hover:bg-primary/10' 
                  : 'border-[#E8DECF] text-tagline-muted hover:border-primary hover:text-primary bg-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-primary' : ''}`} />
            </button>
          </div>

          {/* Accordion specs details */}
          <Accordion type="single" collapsible className="w-full border-t border-[#E8DECF]/60 font-sans text-xs pt-2">
            <AccordionItem value="materials" className="border-b border-[#E8DECF]/60 py-1">
              <AccordionTrigger className="hover:text-primary uppercase font-semibold text-tagline-muted tracking-wider text-[10px]">
                Materials & Heritage
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 leading-relaxed pt-2 space-y-2">
                <p>This heirloom choker features BIS Hallmark 916 gold casting. Our master craftsmen melt pure gold bricks in small batches and construct the filigree by hand.</p>
                <p>Each ruby is hand-selected from ethically managed mines in Myanmar, showing deep pigeon-blood hues under standard light.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="shipping" className="border-b border-[#E8DECF]/60 py-1">
              <AccordionTrigger className="hover:text-primary uppercase font-semibold text-tagline-muted tracking-wider text-[10px]">
                Insured Shipping & Packaging
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 leading-relaxed pt-2 space-y-2">
                <p>We pack each jewelry piece inside a padded velvet-lined steel case, sealed under dual-layer video surveillance at our boutique studio.</p>
                <p>Orders are shipped via secure armored vehicle courier services and require signature and one-time PIN (OTP) verification upon delivery.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </div>

      {/* 2. COMPLETE THE LOOK (RECOMMENDATIONS) */}
      <section className="border-t border-[#E8DECF] pt-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div className="space-y-1.5">
            <span className="text-[11px] text-tagline-muted uppercase tracking-[0.25em] font-sans font-semibold">
              Complete the Look
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground">
              Bespoke Recommendations
            </h2>
          </div>
          <Link 
            to="/catalog" 
            className="text-xs text-[#E5A924] uppercase tracking-widest font-semibold hover:text-[#5C0F24] transition-colors font-sans flex items-center gap-1"
          >
            Explore Catalog <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
}
