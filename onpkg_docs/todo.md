# Task Tracker (todo.md) — Premium Jewelry E-Commerce Website

## Phase 1: Setup & CSS Architecture
- [x] Scaffold project template with `onpkg` stack `react-vite-gsap`
- [x] Import and load Google Fonts (`Playfair Display` & `Inter`) in `index.html` or `index.css`
- [x] Write design tokens and 60-30-10 color theme variables (Ivory Cream, Crimson Maroon, Text Dark, Imperial Gold) in `src/index.css`
- [x] Create basic utility layouts (RootLayout, ThemeProvider)

## Phase 2: State Management & Seed Data
- [x] Create unified Zustand store (`src/store/useAppStore.ts`) to manage cart, wishlist, customizer selection, and simulated checkout steps
- [x] Create mock API data module (`src/api/products.ts`) containing our high-end catalog records (necklaces, earrings, rings, bangles)

## Phase 3: Core Shell & Components
- [x] Implement `Footer.tsx` in Crimson Maroon/Plum with golden lettering and newsletter form
- [x] Implement floating `Navbar.tsx` with dynamic scroll shrinking, dropdown collections list, cart toggle, and wishlist summary
- [x] Implement slide-out `CartDrawer.tsx` with interactive item listings, quantity sliders, dynamic shipping bar, and checkout CTA
- [x] Implement `CheckoutModal.tsx` containing the simulated address form, courier selection, card-flip fields, and confetti completion screen
- [x] Implement interactive `ProductCard.tsx` with secondary image overlays, and animated quick view modals

## Phase 4: Page Scaffolding & Routing
- [x] Configure React Router endpoints (`/`, `/catalog`, `/customizer`) in `src/App.tsx`
- [x] Build catalog filtering sidebar in `src/pages/CatalogPage.tsx` syncing with Zustand products state

## Phase 5: Luxury Storytelling & GSAP scroll Animations
- [x] Build smooth scroll controller hook (integrated into `src/layouts/RootLayout.tsx`) using Lenis
- [x] Design Hero parallax layout in `src/pages/HomePage.tsx` showing floating jewelry elements
- [x] Write horizontal scroll container with ScrollTrigger pinning for the "Masterpiece Collection"
- [x] Build brand heritage storytelling sections with mask-reveal clip path animations
- [x] Develop interactive metal/gem swap canvas in `src/pages/CustomizerPage.tsx` with smooth price counting triggers

## Phase 6: Quality Audit & Optimization
- [x] Conduct layout verification on mobile viewports using standard CSS media queries and responsive styling
- [x] Run `bun run lint` to fix any typescript or formatting details
- [x] Execute `bun run build` to confirm output bundle compilation is clean and error-free
