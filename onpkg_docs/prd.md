# Product Requirements Document (PRD) — Premium Jewelry E-Commerce Website

## 1. Project Overview & Vision
The goal of this project is to build an aesthetic, elegant, and premium e-commerce user interface for a luxury jewelry brand, inspired by the high-end craftsmanship and design language of [DivasMantra](https://divasmantra.com/). 

The platform targets modern consumers seeking unique, handcrafted luxury jewelry. The website must evoke a sense of exclusivity, heritage, and trust. It utilizes a curated **60-30-10 color rule** to balance elegant cream backgrounds (60%), deep maroon and plum typography (30%), and glowing gold accents (10%). Visually arresting GSAP animations drive the storytelling and scroll experience, creating an interactive digital boutique.

---

## 2. Core Features & Scope (Interactive UI/UX)
The website will be implemented as a fully functional frontend application (client-side simulation) before integrating a backend (Supabase/Firebase).

### A. Navigation & Shell
- **Luxury Floating Header**: A glassmorphic sticky navigation bar that shrinks on scroll. Includes interactive megamenus for categories (Necklaces, Rings, Earrings, Bracelets, Heritage), search overlay, wishlist count, and slide-out shopping cart drawer.
- **Aesthetic Footer**: Dark maroon/plum background with premium golden typography, newsletter subscription form, store locator info, and luxury certification badges.

### B. Landing/Home Page (High-End Scroll Storytelling)
- **Hero Reveal Sequence**: Preloader animation transitioning into a split-screen layout. The left side features bold typography with micro-animations, while the right side displays high-resolution jewelry. Uses parallax scroll effect.
- **Horizontal Scroll "Curated Showcase"**: A smooth horizontal scroll container showing the brand's masterwork collections, with parallax floating ornaments.
- **Category Portals**: Interactive cards for "Necklaces", "Earrings", "Rings", and "Bangles" with smooth zoom and text reveals on hover.
- **Heritage & Craftsmanship Story**: ScrollTrigger-controlled scroll animations that fade and slide text/media, illustrating the journey from sketching to precious gem setting.

### C. Collections & Catalog Page (Seamless Browsing)
- **Advanced Dynamic Filters**: Premium sidebar allowing filtering by Metal Type (22k Gold, 18k Rose Gold, Platinum), Collection (Royal, Antique, Modernist), Gemstone (Ruby, Emerald, Diamond, Uncut Polki), and Price Range.
- **Grid Layout with Swap-on-Hover**: Product grid displaying items with high-definition thumbnail. Hovering over a card smoothly slides in a secondary angle/detail shot.
- **Add-to-Wishlist & Quick Add**: Immediate micro-interactions for adding items to the wishlist (with heart burst animation) or opening the Quick View modal.

### D. Interactive Jewelry Customizer / Configurator (Signature Premium Feature)
- **3D-like Metal & Gem Selector**: Interactive component allowing users to choose a ring or pendant and swap metals (Yellow Gold, Rose Gold, Platinum) and main gemstones (Diamond, Ruby, Emerald, Sapphire).
- **Real-time Price & Spec Adjustments**: As the user changes materials, specs and prices dynamically update with smooth numeric transitions.

### E. Rich Cart Drawer & Checkout Simulation
- **Slide-out Cart Drawer**: Displays selected items with quantity adjustment controls. Includes a dynamic "Free Shipping Progress Bar" (encouraging higher order value) and an elegant coupon code validator.
- **Multi-step Checkout Simulation**: An elegant modal workflow simulating:
  1. *Shipping Address Details* (with client-side validation).
  2. *Shipping Options* (Standard Express, Insured White-Glove Courier).
  3. *Secure Payment Simulation* (Credit Card field with card-flip animation, UPI, Netbanking).
  4. *Order Success Screen* with order number, receipt summary, and celebratory confetti.

---

## 3. Success Metrics & Performance Targets
- **Visual Impact**: Premium look and feel, responsive across mobile, tablet, and desktop viewports.
- **Smooth Interaction (INP & LCP)**: Animation frames running at a locked 60fps utilizing GSAP, Lenis smooth scrolling, and hardware-accelerated CSS transforms.
- **State Integrity**: A unified client-side state manager (Zustand) tracking user settings, wishlist, cart items, and custom configurator states.

---

## 4. Future Scope (Supabase/Firebase Integration)
- **User Authentication**: Secure social login and profile dashboard to view order history.
- **Real Database & Checkout**: Real-time product inventory syncing, Stripe/Razorpay payment gateway API integration, and order database.
- **Live Search**: Algolia or Postgres fuzzy search for lightning-fast product querying.
- **Admin Dashboard**: Portal for uploading new collections and managing orders.
