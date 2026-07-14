# Content & Page Inventory — Premium Jewelry E-Commerce Website

## 1. Brand Identity & Copywriting Tone
- **Voice**: Timeless, sophisticated, artistic, and authoritative. We talk about jewelry not as accessories, but as "heritage masterworks", "sculpted poetry", and "handcrafted heirlooms".
- **Key Terminology**:
  - *DivasMantra Signature*: Handcrafted temple, antique, and contemporary luxury.
  - *Vriksham/Heritage*: The line of products inspired by ancient Indian architecture and celestial motifs.
  - *Metals*: 22K Solid Gold, 18K Blush Rose Gold, Platinum Alabaster.
  - *Gemstones*: Hand-cut Zambian Emeralds, Pigeon-Blood Burmese Rubies, VVS1 Moissanite Diamonds, Freshwater Baroque Pearls.

---

## 2. Page Inventory & Content Map

### A. Home Page (Scroll-Storytelling Flow)
1. **Preloader Animation**: Text transitions: *"Concept. Sketch. Melt. Sculpt. Perfection."*
2. **Hero Segment**: 
   - Heading: *"Heirlooms of the Modern Goddess"*
   - Subheading: *"Handcrafted luxury jewelry that bridges timeless Indian heritage with contemporary elegance."*
   - CTA Buttons: *"Explore Masterpieces"*, *"Book Virtual Tour"*.
3. **The Heritage Scroll**: Parallax image-text overlays describing our 40-year legacy of hand-casting gold.
4. **Interactive Portals (Shop by Category)**:
   - *Necklaces*: *"A crown for your collarbone, sculpted in solid gold."*
   - *Earrings*: *"Dances of light and gem, framing your elegance."*
   - *Rings*: *"Promises of eternity wrapped around your finger."*
   - *Bracelets & Bangles*: *"Rhythmic gold that sings with your movement."*
5. **The Bestsellers Carousel**: Features top-selling items with detailed info, custom pricing, rating stars, and interactive quick-buy options.
6. **Customer Testimonials (The Divas Circle)**: Premium quotes from global patrons set in fluid carousel panels.

### B. Catalog & Collection Page
- **Header Banner**: Dynamic parallax banner showing a close-up of gold melting or gem setting. Title: *"The Imperial Vault"*.
- **Filter Inventory**:
  - Category: Necklaces, Earrings, Rings, Bangles, Pendants.
  - Materials: 22K Yellow Gold, 18K Rose Gold, 950 Platinum, 925 Sterling Silver.
  - Gemstones: Uncut Diamonds (Polki), Emeralds, Rubies, Pearls, Sapphires, None.
  - Price Tiers: Under $500, $500 - $1,500, $1,500 - $5,000, Over $5,000.
- **Empty State Message**: *"No treasures match your search. Adjust your filters to explore our archive."*

### C. Interactive Jewelry Configurator Page
- **Header**: *"The Atelier of Dreams"*
- **Customizer Copy**:
  - *"Select your canvas (The Aurelia Ring or The Celestial Pendant)."*
  - *"Choose your metal. Watch light play off gold, rose, or platinum."*
  - *"Crown it with a gem. Select a stone that reflects your soul."*
- **Spec Summary Card**: Real-time weights (e.g., "7.4g 18k Rose Gold"), stone carats ("1.2 ct Oval Zambian Emerald"), and dynamic cost estimator.

### D. Cart & Simulated Checkout Flow
- **Cart Progress Copy**: 
  - *Under $1,500*: *"Add $X more to unlock complimentary Insured White-Glove Shipping."*
  - *Above $1,500*: *"Congratulations! You've unlocked Complimentary Insured White-Glove Courier Delivery."*
- **Shipping details form fields**: Full Name, Email, Address, City, Zip, Phone.
- **Insured Shipping Option descriptions**:
  - *Standard Secure (Free)*: Tracked armored vehicle delivery.
  - *White-Glove Courier (+$45)*: Hand-delivered in a velvet locked case by a certified courier, fully insured.
- **Payment mock form fields**: Cardholder Name, Card Number (16-digit simulation), Expiry Date, CVV (security-masked).
- **Confirmation screen**: *"Your heirloom is being prepared. Order ID: DM-2026-XXXX. A curation specialist will contact you shortly."*

---

## 3. Core Product Data (Mock JSON for state initialization)
The application will load this seed data into a client-side store:
```json
[
  {
    "id": "prod-1",
    "name": "The Empress Royal Choker",
    "category": "Necklaces",
    "price": 4200,
    "rating": 4.9,
    "reviews": 128,
    "description": "An opulent 22k gold choker adorned with hand-cut cabochon rubies, certified diamonds, and dangling saltwater pearls.",
    "gemstone": "Rubies",
    "metal": "22K Yellow Gold",
    "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
    "secondaryImage": "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=600",
    "tag": "Imperial Collection",
    "sku": "DM-NC-001"
  },
  {
    "id": "prod-2",
    "name": "Aurelia Emerald Drop Earrings",
    "category": "Earrings",
    "price": 1850,
    "rating": 4.8,
    "reviews": 94,
    "description": "Elegant cascading drop earrings displaying matching pear-shaped Zambian emeralds clasped in 18k rose gold scrollwork.",
    "gemstone": "Emeralds",
    "metal": "18K Rose Gold",
    "image": "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=600",
    "secondaryImage": "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=600",
    "tag": "Signature Drop",
    "sku": "DM-ER-042"
  },
  {
    "id": "prod-3",
    "name": "Celestial Solitaire Marquise Ring",
    "category": "Rings",
    "price": 3100,
    "rating": 5.0,
    "reviews": 64,
    "description": "A stunning marquise-cut VVS1 diamond claw-set in an ultra-slim platinum band for maximum light interaction.",
    "gemstone": "Diamonds",
    "metal": "Platinum",
    "image": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    "secondaryImage": "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=600",
    "tag": "Eternity Series",
    "sku": "DM-RG-019"
  },
  {
    "id": "prod-4",
    "name": "Mayura Antique Guttapusalu Haram",
    "category": "Necklaces",
    "price": 6800,
    "rating": 4.9,
    "reviews": 112,
    "description": "Traditional south Indian long necklace featuring intricate peacock detailing, clusters of seed pearls, and kundan gem inserts.",
    "gemstone": "Pearls",
    "metal": "22K Yellow Gold",
    "image": "https://images.unsplash.com/photo-1617038227653-b1d62dc7dcf7?auto=format&fit=crop&q=80&w=600",
    "secondaryImage": "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=600",
    "tag": "Temple Heritage",
    "sku": "DM-NC-088"
  },
  {
    "id": "prod-5",
    "name": "Kalyani Polki Cuff Bracelet",
    "category": "Bracelets",
    "price": 2900,
    "rating": 4.7,
    "reviews": 47,
    "description": "A statement solid cuff showcasing raw, uncut Polki diamonds set in gold foil with red and green minakari work on the inner band.",
    "gemstone": "Diamonds",
    "metal": "22K Yellow Gold",
    "image": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
    "secondaryImage": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600",
    "tag": "Imperial Collection",
    "sku": "DM-BR-011"
  },
  {
    "id": "prod-6",
    "name": "Devi Lotus Ruby Studs",
    "category": "Earrings",
    "price": 1200,
    "rating": 4.8,
    "reviews": 39,
    "description": "Petite lotus-shaped studs crafted in 18k rose gold, featuring a central ruby surrounded by brilliant round diamonds.",
    "gemstone": "Rubies",
    "metal": "18K Rose Gold",
    "image": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600",
    "secondaryImage": "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=600",
    "tag": "Floral Petite",
    "sku": "DM-ER-090"
  }
]
```
