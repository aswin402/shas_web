import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/types/jewelry';
import { useAppStore } from '@/store/useAppStore';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, wishlist, addToCart, toggleCart } = useAppStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    toggleCart(true); // Open drawer immediately
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <>
      <div 
        className="group relative flex flex-col overflow-hidden bg-card border border-border/60 rounded-xl transition-all duration-500 hover:shadow-[0_8px_30px_rgb(44,42,56,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsQuickViewOpen(true)}
      >
        {/* Badge tag */}
        {product.tag && (
          <span className="absolute top-3 left-3 z-10 bg-primary/90 text-primary-foreground text-[10px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-full font-medium">
            {product.tag}
          </span>
        )}

        {/* Image Container with Hover Swap */}
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <img
            src={product.secondaryImage}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Action Overlay */}
          <div className="absolute inset-0 flex items-end justify-center p-4 bg-gradient-to-t from-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsQuickViewOpen(true);
                }}
                className="w-10 h-10 rounded-full bg-card border border-border/80 text-foreground flex items-center justify-center shadow-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                title="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-sans text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 font-medium maroon-glow"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full border border-border/50 bg-card/85 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
              isWishlisted ? 'text-primary border-primary scale-110' : 'text-tagline-muted hover:text-primary hover:scale-115'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 transition-transform duration-300 ${isWishlisted ? 'fill-primary scale-110' : ''}`} />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-grow p-4">
          <span className="text-[11px] text-tagline-muted uppercase tracking-widest font-sans font-medium mb-1">
            {product.category}
          </span>
          <h3 className="text-base font-normal text-foreground mb-3 font-serif truncate group-hover:text-primary transition-colors">
            <Link to={`/product/${product.id}`} onClick={(e) => e.stopPropagation()}>
              {product.name}
            </Link>
          </h3>
          <div className="flex items-center justify-between mt-auto">
            {/* Price tag */}
            <span className="font-serif text-lg font-medium text-foreground">
              ₹ {product.price.toLocaleString('en-IN')}
            </span>

            {/* Ratings */}
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
              <span className="text-xs font-sans font-medium text-foreground/80">
                {product.rating}
              </span>
              <span className="text-[10px] text-tagline-muted font-sans font-light">
                ({product.reviews})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Dialog */}
      <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <DialogContent className="max-w-3xl border border-border bg-card p-0 overflow-hidden rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Carousel images */}
            <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] bg-muted">
              <img
                src={isHovered ? product.secondaryImage : product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button
                  onMouseEnter={() => setIsHovered(false)}
                  className={`w-2 h-2 rounded-full ${!isHovered ? 'bg-secondary' : 'bg-card/60'}`}
                />
                <button
                  onMouseEnter={() => setIsHovered(true)}
                  className={`w-2 h-2 rounded-full ${isHovered ? 'bg-secondary' : 'bg-card/60'}`}
                />
              </div>
            </div>

            {/* Info details */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <span className="text-[11px] text-tagline-muted uppercase tracking-widest font-sans font-semibold mb-2">
                SKU: {product.sku}
              </span>
              <DialogTitle className="font-heading text-2xl md:text-3xl font-normal text-foreground mb-3 leading-tight">
                {product.name}
              </DialogTitle>

              <div className="flex items-center gap-4 mb-4">
                <span className="font-serif text-2xl text-foreground font-medium">
                  ₹ {product.price.toLocaleString('en-IN')}
                </span>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-1.5">
                  <div className="flex text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-tagline-muted">
                    ({product.reviews} customer reviews)
                  </span>
                </div>
              </div>

              <DialogDescription className="text-sm leading-relaxed text-foreground/80 font-sans mb-6">
                {product.description}
              </DialogDescription>

              <div className="space-y-4 mb-8">
                <div className="flex text-xs font-sans">
                  <span className="w-24 text-tagline-muted uppercase font-semibold">Metal:</span>
                  <span className="text-foreground">{product.metal}</span>
                </div>
                <div className="flex text-xs font-sans">
                  <span className="w-24 text-tagline-muted uppercase font-semibold">Gemstone:</span>
                  <span className="text-foreground">{product.gemstone}</span>
                </div>
                <div className="flex text-xs font-sans">
                  <span className="w-24 text-tagline-muted uppercase font-semibold">Collection:</span>
                  <span className="text-foreground">{product.tag}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-3 rounded-full bg-primary text-primary-foreground font-sans text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 font-medium maroon-glow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Shopping Bag
                </button>
                <button
                  onClick={handleWishlist}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                    isWishlisted 
                      ? 'border-primary text-primary hover:bg-primary/5' 
                      : 'border-border text-tagline-muted hover:border-primary hover:text-primary'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-primary' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
