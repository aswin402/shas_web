import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '@/api/products';
import { ProductCard } from '@/components/ProductCard';
import { useAppStore } from '@/store/useAppStore';
import { Filter, SlidersHorizontal, Heart, Search, ArrowUpDown, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CatalogPage() {
  const { wishlist } = useAppStore();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMetal, setSelectedMetal] = useState<string>('All');
  const [selectedGemstone, setSelectedGemstone] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(8000);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showWishlistOnly, setShowWishlistOnly] = useState<boolean>(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  // Sync state with URL search params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    
    const filter = searchParams.get('filter');
    if (filter === 'wishlist') setShowWishlistOnly(true);
  }, [searchParams]);

  // Categories & Options listing
  const categories = ['All', 'Necklaces', 'Earrings', 'Rings', 'Bracelets'];
  const metals = ['All', '22K Yellow Gold', '18K Rose Gold', 'Platinum'];
  const gemstones = ['All', 'Diamonds', 'Emeralds', 'Rubies', 'Pearls'];

  // Filtering Logic
  const filteredProducts = PRODUCTS.filter((product) => {
    // 1. Search Query
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Category
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    // 3. Metal
    const matchesMetal = selectedMetal === 'All' || product.metal === selectedMetal;
    
    // 4. Gemstone
    const matchesGemstone = selectedGemstone === 'All' || product.gemstone === selectedGemstone;
    
    // 5. Price
    const matchesPrice = product.price <= priceRange;

    // 6. Wishlist Mode
    const matchesWishlist = !showWishlistOnly || wishlist.some(item => item.id === product.id);

    return matchesSearch && matchesCategory && matchesMetal && matchesGemstone && matchesPrice && matchesWishlist;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Featured (default)
  });

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedMetal('All');
    setSelectedGemstone('All');
    setPriceRange(8000);
    setSearchQuery('');
    setShowWishlistOnly(false);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 mt-6">
      
      {/* Header Info */}
      <div className="text-center mb-12 space-y-3">
        <span className="text-[11px] text-tagline-muted uppercase tracking-[0.25em] font-sans font-semibold">
          Curated Vault
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground">
          {showWishlistOnly ? 'Your Private Collection' : 'The Imperial Treasures'}
        </h1>
        <p className="text-sm text-tagline-muted max-w-lg mx-auto font-sans leading-relaxed">
          {showWishlistOnly 
            ? 'Your handpicked favorites waiting to be added to your heirloom drawer.' 
            : 'Explore our exquisite archive of solid gold, platinum, and precious gemstones.'}
        </p>
      </div>

      {/* Control panel (Search & Sort) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-border/60 pb-6 mb-8 font-sans text-sm">
        
        {/* Search bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-tagline-muted" />
          <input
            type="text"
            placeholder="Search details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border bg-card text-foreground rounded-full outline-none focus:border-secondary transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Wishlist filter toggle */}
          <button
            onClick={() => setShowWishlistOnly(!showWishlistOnly)}
            className={`px-4 py-2 rounded-full border flex items-center gap-2 transition-colors ${
              showWishlistOnly 
                ? 'border-primary bg-primary/5 text-primary' 
                : 'border-border text-tagline-muted hover:border-tagline-muted'
            }`}
          >
            <Heart className={`w-4 h-4 ${showWishlistOnly ? 'fill-primary' : ''}`} />
            Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
          </button>

          {/* Mobile Filter toggle */}
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="md:hidden px-4 py-2 rounded-full border border-border text-tagline-muted flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          {/* Sort selector */}
          <div className="relative flex items-center border border-border bg-card text-foreground rounded-full px-4 py-2">
            <ArrowUpDown className="w-4 h-4 text-tagline-muted mr-2" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none outline-none text-xs font-semibold pr-2 cursor-pointer appearance-none uppercase tracking-wider"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="w-3 h-3 text-tagline-muted pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex gap-8 items-start">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0 space-y-6 sticky top-28 bg-card border border-border/50 p-6 rounded-2xl">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <h3 className="font-heading font-medium text-base text-foreground flex items-center gap-2">
              <Filter className="w-4 h-4 text-secondary" />
              Refine Treasures
            </h3>
            <button 
              onClick={handleResetFilters}
              className="text-[10px] text-primary uppercase tracking-widest font-semibold hover:text-secondary transition-colors"
            >
              Clear
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2.5 font-sans text-xs">
            <h4 className="font-semibold text-tagline-muted uppercase tracking-wider">Category</h4>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors font-medium ${
                    selectedCategory === cat 
                      ? 'bg-primary text-primary-foreground font-semibold' 
                      : 'hover:bg-muted text-foreground/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Metal Filter */}
          <div className="space-y-2.5 font-sans text-xs">
            <h4 className="font-semibold text-tagline-muted uppercase tracking-wider">Metal Type</h4>
            <div className="space-y-1.5">
              {metals.map((metal) => (
                <button
                  key={metal}
                  onClick={() => setSelectedMetal(metal)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors font-medium ${
                    selectedMetal === metal 
                      ? 'bg-primary text-primary-foreground font-semibold' 
                      : 'hover:bg-muted text-foreground/80'
                  }`}
                >
                  {metal}
                </button>
              ))}
            </div>
          </div>

          {/* Gemstone Filter */}
          <div className="space-y-2.5 font-sans text-xs">
            <h4 className="font-semibold text-tagline-muted uppercase tracking-wider">Gemstone</h4>
            <div className="space-y-1.5">
              {gemstones.map((gem) => (
                <button
                  key={gem}
                  onClick={() => setSelectedGemstone(gem)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors font-medium ${
                    selectedGemstone === gem 
                      ? 'bg-primary text-primary-foreground font-semibold' 
                      : 'hover:bg-muted text-foreground/80'
                  }`}
                >
                  {gem}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2.5 font-sans text-xs pb-2">
            <div className="flex justify-between font-semibold text-tagline-muted uppercase tracking-wider">
              <span>Max Price</span>
              <span className="text-foreground">${priceRange.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="8000"
              step="200"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-primary bg-border h-1 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-tagline-muted">
              <span>$1,000</span>
              <span>$8,000</span>
            </div>
          </div>
        </aside>

        {/* Product Catalog Grid */}
        <div className="flex-1">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-20 bg-card border border-border/40 rounded-2xl space-y-4">
              <p className="font-heading text-lg text-tagline-muted">No Treasures Found</p>
              <p className="text-xs text-foreground/60 max-w-sm mx-auto font-sans">
                We couldn't find any items matching your selected filter options. Try adjusting your sidebar toggles.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-xs font-sans uppercase tracking-wider font-semibold hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
              >
                Reset Filter Choices
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer-style Filters Overlay */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-[#2C2A38]/40 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-3xl p-6 space-y-6 overflow-y-auto max-h-[85vh] md:hidden shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-border pb-3">
                <h3 className="font-heading font-medium text-lg text-foreground flex items-center gap-2">
                  <SlidersHorizontal className="w-4.5 h-4.5 text-secondary" />
                  Filter Treasures
                </h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-tagline-muted hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Filter forms content (simplified scrollable categories) */}
              <div className="space-y-5 font-sans text-xs">
                {/* Categories */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-tagline-muted uppercase tracking-wider">Category</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-2 rounded-full border transition-colors ${
                          selectedCategory === cat 
                            ? 'border-primary bg-primary text-primary-foreground font-semibold' 
                            : 'border-border text-foreground hover:border-tagline-muted'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Metals */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-tagline-muted uppercase tracking-wider">Metal Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {metals.map((metal) => (
                      <button
                        key={metal}
                        onClick={() => setSelectedMetal(metal)}
                        className={`px-3 py-2 rounded-full border transition-colors ${
                          selectedMetal === metal 
                            ? 'border-primary bg-primary text-primary-foreground font-semibold' 
                            : 'border-border text-foreground hover:border-tagline-muted'
                        }`}
                      >
                        {metal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gemstones */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-tagline-muted uppercase tracking-wider">Gemstones</h4>
                  <div className="flex flex-wrap gap-2">
                    {gemstones.map((gem) => (
                      <button
                        key={gem}
                        onClick={() => setSelectedGemstone(gem)}
                        className={`px-3 py-2 rounded-full border transition-colors ${
                          selectedGemstone === gem 
                            ? 'border-primary bg-primary text-primary-foreground font-semibold' 
                            : 'border-border text-foreground hover:border-tagline-muted'
                        }`}
                      >
                        {gem}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between font-semibold text-tagline-muted uppercase tracking-wider">
                    <span>Max Price</span>
                    <span className="text-foreground">${priceRange.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="8000"
                    step="200"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-primary bg-border h-1 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-3 rounded-full border border-border text-tagline-muted hover:text-foreground text-center font-sans text-xs uppercase tracking-wider font-semibold"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 py-3 rounded-full bg-primary text-primary-foreground text-center font-sans text-xs uppercase tracking-wider font-semibold shadow-lg hover:bg-secondary transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
