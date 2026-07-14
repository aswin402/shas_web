# UI & Design System Specification — Premium Jewelry E-Commerce Website

## 1. Visual Identity & The 60-30-10 Rule
This luxury site implements a strict, mathematically proportioned layout of color weight:
- **60% Dominant (Canvas & Backgrounds)**:
  - *Light Mode Canvas*: Luxury Ivory Cream (`#FAF6F0`). A warm, rich off-white background that reflects premium lighting and highlights the metallic properties of products.
  - *Dark Mode Canvas*: Charcoal Midnight Plum (`#16141D`). An elegant, velvet-textured dark purple-gray.
- **30% Secondary (Structure, Text, Buttons)**:
  - *Text Dark*: Plum Slate (`#2C2A38`). High-contrast, soft-tinted black for primary body text, titles, navigation links, and input boxes.
  - *Primary Maroon*: Royal Burgundy (`#A61C2E`). Deep red for primary action buttons, section division borders, header highlights, and footer backdrops.
  - *Tagline Muted*: Crimson Rose (`#8A5260`). Soft rose-brown for captions, sub-links, borders, breadcrumbs, and inactive tabs.
- **10% Accent (CTA Glint & Highlights)**:
  - *Secondary Gold*: Imperial Sun (`#E5A924`). Bright golden hue for hover glow filters, rating stars, "New Collection" badges, shopping cart count bubbles, active border indicators, and configurator selection highlights.

---

## 2. CSS Variables Mapping
We declare these tokens inside `src/index.css` using modern Tailwind v4 syntax.

### Light Mode CSS Variables (`:root`)
```css
:root {
  /* 60% Dominant */
  --background: #FAF6F0;
  --card: #FFFFFF;
  --popover: #FFFFFF;
  
  /* 30% Secondary */
  --foreground: #2C2A38;
  --text-dark: #2C2A38;
  --primary: #A61C2E;
  --primary-foreground: #FFFFFF;
  --tagline-muted: #8A5260;
  --muted: #F3ECE2;
  --muted-foreground: #8A5260;
  --border: #E8DECF;
  --input: #E8DECF;
  
  /* 10% Accent */
  --secondary: #E5A924;
  --secondary-foreground: #2C2A38;
  --accent: #E5A924;
  --accent-foreground: #2C2A38;
  --ring: #E5A924;
  
  /* System */
  --destructive: #EF4444;
  --destructive-foreground: #FFFFFF;
}
```

### Dark Mode CSS Variables (`.dark`)
```css
.dark {
  /* 60% Dominant */
  --background: #16141D;
  --card: #1E1B26;
  --popover: #1E1B26;
  
  /* 30% Secondary */
  --foreground: #F5F3F7;
  --text-dark: #F5F3F7;
  --primary: #A61C2E;
  --primary-foreground: #FFFFFF;
  --tagline-muted: #B5939D;
  --muted: #262230;
  --muted-foreground: #B5939D;
  --border: #332D40;
  --input: #332D40;
  
  /* 10% Accent */
  --secondary: #E5A924;
  --secondary-foreground: #16141D;
  --accent: #E5A924;
  --accent-foreground: #16141D;
  --ring: #E5A924;
}
```

---

## 3. Typography & Hierarchy
- **Primary Font**: `Playfair Display` (via Google Fonts) - loaded for headings, editorial content, and brand titles to convey royalty and craftsmanship.
- **Secondary Font**: `Inter` or `Geist` - loaded for readable product descriptions, catalog filters, cart lists, checkout text, and buttons.
- **Heading Hierarchy**:
  - `h1`: `font-serif tracking-wide text-5xl md:text-7xl font-light text-foreground`
  - `h2`: `font-serif tracking-wide text-3xl md:text-5xl font-light text-foreground`
  - `h3`: `font-serif tracking-normal text-xl md:text-2xl text-foreground`
  - `body`: `font-sans text-sm md:text-base leading-relaxed text-foreground/80`

---

## 4. UI Elements & Micro-Animations
- **Header Navigation**: Floating frosted glass effect using `backdrop-filter: blur(16px) saturate(180%)` and a subtle drop shadow. Links transition color on hover with a sliding gold underline.
- **Product Cards**: Minimalist rectangular layout with hidden secondary images. On hover, the primary image fades/translates, showing the secondary image, while the "Add to Wishlist" and "Quick Buy" slide up from the bottom with GSAP elastic easing.
- **Gold Ring Glow**: Buttons styled with gold themes have a subtle box-shadow pulsate:
  ```css
  .gold-glow:hover {
    box-shadow: 0 0 15px rgba(229, 169, 36, 0.4);
    transition: box-shadow 0.3s ease-in-out;
  }
  ```
- **Custom Scrollbar**: Customized with a thin track matching the secondary border, and a handle in Tagline Muted (`#8A5260`) transitioning to Gold on hover.

---

## 5. GSAP Animation Choreography
- **Initial Load Page Transition**: A curtain overlay (`#A61C2E`) rises, followed by individual letters of the brand logo fading in sequentially (stagger: 0.05s).
- **Smooth Scroll (Lenis)**: Smooth scroll enabled workspace-wide to control physical friction, ensuring ScrollTrigger parallax animations remain ultra-fluid.
- **Hero Image Parallax**: Splitting the hero layout into an image and an overlapping description card. The description slides up at `y: 50` while the hero image pans down at `y: -30` synchronously on scroll.
- **Collection Showcase (Horizontal Scroll)**:
  - Horizontal scroll triggered via GSAP ScrollTrigger: pin the section, slide cards horizontally on X-axis, and animate the background color from Cream (`#FAF6F0`) to deep Dark Burgundy (`#3A0A10`) back to Cream.
- **Scroll-revealed Story Elements**: Text blocks slide in with a mask reveal (`clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)`) as the scrollbar intersects their timeline.
