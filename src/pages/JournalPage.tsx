import { Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Heart, Share2, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface JournalPost {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  content: string[];
  tags: string[];
}

const JOURNAL_POSTS: JournalPost[] = [
  {
    id: "post-1",
    title: "One day, it won’t just be jewellery—it will be a memory. ❤️✨",
    subtitle: "Why the most memorable designs speak directly to the heart.",
    date: "July 12, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
    category: "Philosophy",
    content: [
      "Every piece you own carries a story. A celebration, a milestone, a loved one, or a moment you’ll cherish forever. That’s why every SHAS creation begins with more than just a design—it begins with an emotion.",
      "This soft blush pink piece paired with delicate pearls was born from a simple thought: Why not create something refreshingly elegant? The result is a timeless design that feels graceful, unique, and effortlessly beautiful. Because sometimes, the most memorable jewellery isn’t the boldest—it’s the one that speaks to your heart.",
      "Discover jewellery that’s designed to become a part of your story. Visit SHAS, Periyar Nagar, Erode. ❤️"
    ],
    tags: ["designerjewellery", "blushpink", "pearljewellery", "luxuryjewellery", "bridaljewellery", "statementjewellery", "weddingjewellery", "erode", "shasjewellers"]
  },
  {
    id: "post-2",
    title: "The right jewellery doesn’t just complete your outfit—it completes your look. ✨",
    subtitle: "Styling tips to elevate your elegance with the perfect selection.",
    date: "July 08, 2026",
    readTime: "2 min read",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=600",
    category: "Styling Tips",
    content: [
      "Sometimes, it’s not about having more jewellery. It’s about choosing the right piece. The wrong styling choice can take away from your entire look, while the perfect one can elevate it effortlessly.",
      "At SHAS, we believe every jewellery piece has a purpose. Whether it’s a timeless Lakshmi design or a contemporary statement piece, the right styling makes all the difference. Because true elegance lies in knowing what to wear, and when to wear it.",
      "Visit SHAS and let us help you find the jewellery that complements your style perfectly. ❤️"
    ],
    tags: ["jewellerystyling", "stylingtips", "bridaljewellery", "traditionaljewellery", "lakshmijewellery", "goldjewellery", "luxuryjewellery", "erode", "shasjewellers"]
  },
  {
    id: "post-3",
    title: "The greatest reward isn’t just creating beautiful jewellery—it’s knowing it became a part of someone’s story. ❤️✨",
    subtitle: "A heartfelt thank you to everyone who experienced our Erode Bridal Show.",
    date: "July 03, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=600",
    category: "Events",
    content: [
      "Our recent Bridal Show in Erode was filled with moments we’ll always cherish. From hearing how every piece felt thoughtfully curated and deeply personal to seeing so many of you connect with our collections, every conversation reminded us why we do what we do.",
      "What made it even more special was the love that continued beyond the event. So many customers visited us after the show to customize their dream jewellery, and many even travelled from different places to experience SHAS. Your trust, appreciation, and support mean the world to us.",
      "Thank you for making our Bridal Show a beautiful success. We can’t wait to welcome you to SHAS, Athiyar Nagar, Erode, and be a part of your next special moment. ❤️"
    ],
    tags: ["bridalshow", "bridaljewellery", "customizedjewellery", "weddingjewellery", "erode", "luxuryjewellery", "bridalshopping", "southindianbride", "shasjewellers"]
  },
  {
    id: "post-4",
    title: "Success is visible. The struggle behind it rarely is. 💫",
    subtitle: "Founder Deepa Sakthi reflects on entrepreneurship and quietly fought battles.",
    date: "June 27, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    category: "Founder Journey",
    content: [
      "Every entrepreneur’s journey looks different. Some battles are seen, while many are fought quietly behind the scenes. No matter where you come from or what people assume about your journey, building something meaningful takes courage, consistency, and unwavering belief.",
      "The opinions of others will always exist, but they should never define your path. Keep showing up, trust the process, and stay committed to your vision. One step at a time, you’ll find the light at the end of the tunnel.",
      "Keep building. Keep believing. Keep walking. ✨"
    ],
    tags: ["entrepreneurship", "founderjourney", "trusttheprocess", "businessgrowth", "leadership", "consistency", "womenentrepreneurs", "shasjewellers"]
  },
  {
    id: "post-5",
    title: "Getting ready is never just about what you wear, it’s about how you feel. ✨",
    subtitle: "Join Deepa Akka as she styles her favorite classic statement pieces.",
    date: "June 20, 2026",
    readTime: "2 min read",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=600",
    category: "GRWM",
    content: [
      "Join Deepa Akka, Founder of SHAS, as she styles some of her favorite jewellery pieces.",
      "From timeless classics to statement pieces, every choice tells a story and celebrates individuality.",
      "Which look is your favorite? Tell us in the comments below. ✨"
    ],
    tags: ["getreadywithme", "grwm", "jewellerystyling", "shasjewellers", "bridaljewellery", "goldjewellery", "fashionreel", "southindianjewellery"]
  },
  {
    id: "post-6",
    title: "Every piece of jewellery tells a story, but it’s the details that make it unforgettable. ❤️✨",
    subtitle: "Diving deep into the ruby heart of our latest collection.",
    date: "June 15, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
    category: "Ruby Collection",
    content: [
      "The rich ruby at the heart of this design isn’t just a gemstone, it’s the soul of the piece. Its vibrant brilliance adds depth, elegance, and a timeless charm that makes every look feel extraordinary.",
      "Whether you’re the bride or someone celebrating alongside her, this collection is designed to make you feel like the center of every beautiful moment.",
      "Discover the Ruby Collection at SHAS and find the piece that’s made to shine with you. ❤️"
    ],
    tags: ["rubyjewellery", "bridaljewellery", "bridalfashion", "weddingjewellery", "luxuryjewellery", "breadcrumbs", "erode", "shasjewellers"]
  },
  {
    id: "post-7",
    title: "Good things take time, but the best things? They take a little extra care 💎",
    subtitle: "Why we believe in handcrafted timelines instead of rushed promises.",
    date: "June 08, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1617038227653-b1d62dc7dcf7?auto=format&fit=crop&q=80&w=600",
    category: "Craftsmanship",
    content: [
      "We don’t believe in rushed timelines or false promises. Every piece at SHAS is handcrafted by artisans who take the time they need to ensure absolute perfection.",
      "Because when it comes to your special moments, you deserve nothing less than a masterpiece. Each design carries hours of dedication and generation-old casting secrets. 💕"
    ],
    tags: ["ShasJewellery", "HandmadeWithLove", "JewelleryDesign", "ArtisanCrafted", "TraditionalJewellery", "Shas", "Craftsmanship", "PremiumJewellery", "HandcraftedWithCare"]
  },
  {
    id: "post-8",
    title: "What you see is what you get ✨",
    subtitle: "Why we photograph every single piece in authentic natural light.",
    date: "June 01, 2026",
    readTime: "2 min read",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
    category: "Authenticity",
    content: [
      "At Shas Jewellers, we believe true beauty needs no filters. That’s why every piece is photographed in natural light, allowing its colours, craftsmanship, and brilliance to shine exactly as they do in real life. 🧡",
      "From the soft glow of pearls to the rich sparkle of rubies, every detail is captured with honesty so when your jewellery reaches you, it feels just as beautiful as the moment you first saw it. ✨💕",
      "Because at Shas, trust is as important as craftsmanship, and elegance is best experienced in its truest form. ❤️"
    ],
    tags: ["ShasJewellers", "RealBeauty", "NaturalLightJewellery", "AuthenticElegance", "PearlsAndRubies", "TimelessJeweller", "CraftedWithLove", "JewelleryWithEmotion", "FineJewellery", "LuxuryJewellery", "TraditionalMeetsModern", "ShasExperience", "TimelessElegance"]
  }
];

export function JournalPage() {
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + (liked[id] ? -1 : 1)
    }));
  };

  return (
    <div className="relative min-h-[calc(100vh-6rem)] bg-[#F8F6F2] text-[#2A2A2A] py-16 px-6 overflow-hidden mt-6 font-sans">
      
      {/* Visual background decorations */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#C79A3B]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#5C0F24]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto relative z-10 space-y-12">
        {/* Back Link */}
        <div className="text-left">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#805E63] hover:text-[#5C0F24] transition-colors mb-6 group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Boutique</span>
          </Link>
        </div>

        {/* Brand Header */}
        <div className="space-y-4 text-center border-b border-[#E8DECF] pb-10">
          <span className="text-[11px] text-[#805E63] uppercase tracking-[0.25em] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C79A3B]" />
            Heritage in Every Carat
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-light text-[#5C0F24]">
            The SHAS Journal
          </h1>
          <p className="text-sm text-[#805E63] max-w-xl mx-auto leading-relaxed">
            Natural Diamonds + Gold. Experience traditional luxury from our Erode Boutique, designed by Deepa Sakthi.
          </p>
        </div>

        {/* Stories list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {JOURNAL_POSTS.map((post) => (
            <article key={post.id} className="bg-white border border-[#E8DECF] hover:shadow-md transition-all duration-300 flex flex-col p-1">
              {/* Post Header Image */}
              <div className="aspect-[16/10] overflow-hidden bg-muted relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#5C0F24] text-[#F8F6F2] text-[9px] uppercase tracking-wider px-2.5 py-1 font-semibold">
                  {post.category}
                </span>
              </div>

              {/* Post Body details */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4 text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[10px] text-[#805E63]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="font-heading text-lg md:text-xl font-normal text-[#5C0F24] leading-snug">
                    {post.title}
                  </h2>
                  
                  {post.subtitle && (
                    <p className="text-xs font-medium text-[#805E63] italic">
                      {post.subtitle}
                    </p>
                  )}

                  <div className="space-y-3 pt-2 text-[#805E63] text-xs leading-relaxed">
                    {post.content.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                {/* Tags and Action Bar */}
                <div className="pt-4 border-t border-[#F8F6F2] space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[9.5px] text-[#C79A3B] font-medium mr-1.5 hover:underline cursor-pointer">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-[#805E63] pt-2 text-xs">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 transition-colors ${liked[post.id] ? 'text-[#5C0F24]' : 'hover:text-[#5C0F24]'}`}
                    >
                      <Heart className={`w-4 h-4 ${liked[post.id] ? 'fill-[#5C0F24]' : ''}`} />
                      <span>{likes[post.id] || 0} Likes</span>
                    </button>
                    
                    <button className="flex items-center gap-1.5 hover:text-[#5C0F24] transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
