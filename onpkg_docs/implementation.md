# Technical Implementation Plan — Premium Jewelry E-Commerce Website

This document maps out the file layout, state management architecture, component boundaries, and animation configurations for our client-side implementation.

## 1. System Architecture & File Layout
We will organize our source directories under `src/` to ensure clean separation of concerns:

```
src/
├── api/
│   └── products.ts             # Static simulation of jewelry inventory APIs
├── components/
│   ├── ui/                     # shadcn/ui components (button, dialog, tabs, accordion)
│   ├── Navbar.tsx              # Glassmorphic header with mini-cart & search overlay
│   ├── Footer.tsx              # Deep maroon footer with elegant branding
│   ├── ProductCard.tsx         # Interactive jewelry card (hover swap, quick view)
│   ├── CartDrawer.tsx          # Velvet slide-out cart with shipping meter
│   └── CheckoutModal.tsx       # Simulated multi-step secure checkout workflow
├── hooks/
│   └── useSmoothScroll.ts      # Custom Hook initializing Lenis smooth scrolling
├── layouts/
│   └── RootLayout.tsx          # Global wrapper providing router outlet & state context
├── lib/
│   ├── utils.ts                # Tailwind merge and utility helpers
│   └── gsap.ts                 # GSAP, ScrollTrigger, and CustomEase initialization
├── pages/
│   ├── HomePage.tsx            # Cinematic landing scroll storytelling & brand showcase
│   ├── CatalogPage.tsx         # Filterable luxury catalog grid
│   ├── CustomizerPage.tsx      # Jewelry configurator (metal, gem swapping)
│   └── NotFoundPage.tsx        # Elegant error state page
├── store/
│   ├── useAppStore.ts          # Central Zustand state (cart, wishlist, configurator)
│   └── useThemeStore.ts        # Theme toggler (Light/Dark mode state)
├── index.css                   # Tailwind v4 structure & design system tokens
└── main.tsx                    # React mounting & routing initialization
```

---

## 2. API Endpoints & State Management (Zustand)
We simulate the backend database locally using a client-side state container.

### Unified Zustand Store (`src/store/useAppStore.ts`)
The store manages:
- **Cart state**: `cart: CartItem[]`, `addToCart(prod, qty)`, `removeFromCart(id)`, `updateQty(id, qty)`, `clearCart()`
- **Wishlist state**: `wishlist: Product[]`, `toggleWishlist(prod)`
- **Configurator state**: `customJewel: { baseId, metal, gem, price }`, `setCustomMetal(metal)`, `setCustomGem(gem)`
- **Checkout simulation state**: `checkoutStep: number`, `shippingInfo: ShippingDetails`, `setCheckoutStep(step)`

---

## 3. UI Components & Layout Logic
We utilize standard **shadcn/ui** and vanilla styling for visual composition:
- **Navbar Layout**: Sticky container with `backdrop-filter: blur(12px)`. Tracks scroll position to adjust height (shrinking from `h-24` to `h-16`) and background opacity dynamically.
- **Product Card Layout**: Anchored container holding two image elements. Uses absolute positioning to layer the secondary image directly behind the primary. On hover, CSS opacity flips between them, while standard sliding animation reveals catalog actions.
- **Jewelry Customizer UI**: Displays an interactive canvas mockup of a ring or pendant. Buttons let users select metals (Gold, Silver, Rose Gold) and gemstone types. Changing options alters the source image layers to represent the combination, adjusting item specs and pricing in real-time.

---

## 4. GSAP & Lenis Integration
Animations are centralized and isolated within react hooks and lifecycles:

### A. Lenis Initialization (`src/hooks/useSmoothScroll.ts`)
We initialize Lenis to manage physical scrolling and coordinate with GSAP ScrollTrigger:
```typescript
import Lenis from 'lenis';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);
}
```

### B. GSAP Timeline Rules
- **ScrollTrigger Pinning**: Section pinning must be declared inside `useGSAP` or `useEffect` blocks.
- **Cleanup**: Always clean up ScrollTrigger instances on component unmounting. The `gsap.context()` or `useGSAP` hook automatically wraps and handles unmount releases, preventing memory leaks and scroll stuttering.
- **Responsive Animations**: Use `gsap.matchMedia()` inside animation hooks to disable heavy layouts/parallax on mobile viewports for fluid touch scrolling.
