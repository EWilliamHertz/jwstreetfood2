"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { ExternalLink, ThumbsUp, MessageCircle, Share2, MapPin, CheckCircle2, X, Maximize2 } from "lucide-react";
import { FacebookIcon } from "./FacebookIcon";

export interface FacebookPost {
  id: string;
  author: string;
  timeAgo: string;
  title: string;
  content: string;
  imageUrl: string;
  likes: string;
  comments: string;
  shares: string;
  location: string;
  postUrl: string;
}

const facebookPosts: FacebookPost[] = [
  {
    id: "post-1",
    author: "JW Streetfood",
    timeAgo: "Falköping & Lidköping",
    title: "Smashburgare med närproducerat kött & Wagyu 🔥",
    content: "Vi kompromissar aldrig med kvaliteten! Köttet i våra smashburgare är 100% närproducerat från en lokal gård nära Askersund med inslag av svensk wagyu. Detta ger den där oslagbara saftigheten och krispiga ytan när vi smashar på den glödheta stekhällen! Serveras i fluffigt briochebröd med dubbel smält cheddarost, karamelliserad lök och vår hemliga signaturdressing. Varmt välkomna in till oss!",
    imageUrl: "/assets/images/IMG_5803.jpeg",
    likes: "214",
    comments: "38",
    shares: "19",
    location: "Järnvägsgatan 12 & Stenportgatan 35",
    postUrl: "https://www.facebook.com/61578509021815/photos/122122804400950300/"
  },
  {
    id: "post-2",
    author: "JW Streetfood",
    timeAgo: "Lidköping & Falköping",
    title: "Gourmet Körven på Stenportgatan & Järnvägsgatan 🌭",
    content: "En go körv slår aldrig fel! Vår gourmetkörv serveras i ett gyllenrostat briochebröd, toppad med krispig rostad lök, sötstark hantverkssenap och husets egna picklade rödlök. En riktig storfavorit bland våra gäster som vill ha något snabbt, mättande och galet gott till lunch eller kvällsmat. Öppet 12:00–20:00!",
    imageUrl: "/assets/images/IMG_5802.jpeg",
    likes: "186",
    comments: "24",
    shares: "12",
    location: "Stenportgatan 35 & Järnvägsgatan 12",
    postUrl: "https://www.facebook.com/61578509021815/photos/122122545776950300/"
  },
  {
    id: "post-3",
    author: "JW Streetfood",
    timeAgo: "Skaraborg",
    title: "Dirty Fries Supreme – Vår mest smaskiga tallrik! 🍟",
    content: "Har du provat våra Dirty Fries än? En krispig pommestallrik som toppas med nystekt saftig slicead smashburgare, tapas-style körvbitar, smält cheddarostsås, mos och jalapeños för lite sting. Perfekt att dela med en vän eller njuta av helt själv! Finns på båda våra restauranger i Falköping och Lidköping.",
    imageUrl: "/assets/images/IMG_5801.jpeg",
    likes: "295",
    comments: "47",
    shares: "31",
    location: "Falköping & Lidköping",
    postUrl: "https://www.facebook.com/61578509021815/photos/122118009014950300/"
  },
  {
    id: "post-4",
    author: "JW Streetfood",
    timeAgo: "Västgöta Klassiker",
    title: "Klassisk Halvspecial & Hälta Hälta med Hemlagat Mos 🥔",
    content: "En riktig västgötaklassiker! Vi kokar och gör vårt potatismos själva från grunden varje dag med äkta smör och grädde för den oslagbara krämigheten. Välj mellan grillad eller kokt kvalitetskorv, med bröd eller pommes. Husmanskost och street food i perfekt harmoni. Kom in och smaka!",
    imageUrl: "/assets/images/IMG_5800.jpeg",
    likes: "172",
    comments: "19",
    shares: "9",
    location: "Järnvägsgatan 12, Falköping",
    postUrl: "https://www.facebook.com/61578509021815/photos/122122545776950300/"
  },
  {
    id: "post-5",
    author: "JW Streetfood",
    timeAgo: "Lidköping Nyhet",
    title: "Nu Lidköping! Renovering & Nyöppning på Stenportgatan 35 🎥",
    content: "Nu Lidköping, nu är det riktigt nära! Vi har bytt el, ventilation och installerat sprillans nya stekhällar för att leverera samma höga kvalitet som i Falköping. Hela gänget är supertaggade. Kika in videon från lokalen och följ oss inför öppningsdagen!",
    imageUrl: "/assets/images/IMG_5805.jpeg",
    likes: "348",
    comments: "62",
    shares: "28",
    location: "Stenportgatan 35, Lidköping",
    postUrl: "https://www.facebook.com/61578509021815/videos/nu-lidk%C3%B6ping-nu-%C3%A4r-det-n%C3%A4ra-att-vi-%C3%B6ppnar-det-vi-har-gjort-i-denna-lokal-%C3%A4r-bytt/1352426266828124/"
  },
  {
    id: "post-6",
    author: "JW Streetfood",
    timeAgo: "Menyfavorit",
    title: "JW Bacon & Smoke Cheese Burgare 🥓🧀",
    content: "Dubbel smashad biff med krispigt rökigt bacon, rökig BBQ-glaze, smält cheddar och picklad rödlök i ett rostat briochebröd. När suget sätter in finns det helt enkelt inget bättre. Takeaway eller slå dig ner hos oss – öppet 12:00 till 20:00 tisdag till lördag!",
    imageUrl: "/assets/images/IMG_5799.jpeg",
    likes: "263",
    comments: "31",
    shares: "15",
    location: "Stenportgatan 35 & Järnvägsgatan 12",
    postUrl: "https://www.facebook.com/61578509021815/photos/122118009014950300/"
  }
];

export function Gallery() {
  const { t } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<FacebookPost | null>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPost(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-zinc-950 relative overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 sm:mb-16 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-blue-600/25 text-white"
          >
            <FacebookIcon size={26} />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-3"
          >
            Direkt från Facebook
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-sm sm:text-base mb-6 leading-relaxed"
          >
            Klicka på valfritt inlägg för att förstora och läsa mer.
          </motion.p>

          <a
            href="https://www.facebook.com/profile.php?id=61578509021815"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all"
          >
            <FacebookIcon size={15} />
            <span>Följ @JWStreetfood (780+ Följare)</span>
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Facebook Posts Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {facebookPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: index * 0.07 }}
              onClick={() => setSelectedPost(post)}
              className="bg-[#121214] border border-white/10 hover:border-yellow-400/50 rounded-3xl overflow-hidden shadow-2xl transition-all flex flex-col justify-between group cursor-pointer hover:shadow-yellow-400/5 hover:-translate-y-1"
            >
              <div>
                {/* Facebook Post Author Header */}
                <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/5 bg-zinc-900/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-black font-black text-sm shrink-0 shadow-md">
                      JW
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-white text-sm">JW Streetfood</span>
                        <CheckCircle2 size={14} className="text-blue-400 fill-blue-400/20" />
                      </div>
                      <span className="text-[11px] text-zinc-400 block">{post.timeAgo}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 group-hover:text-yellow-400 transition-colors p-1" title="Klicka för att förstora">
                      <Maximize2 size={16} />
                    </span>
                    <a
                      href={post.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-zinc-400 hover:text-blue-400 transition-colors p-1"
                      aria-label="Öppna Facebook"
                    >
                      <FacebookIcon size={18} />
                    </a>
                  </div>
                </div>

                {/* Post Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-yellow-400 font-bold bg-black/70 px-2 py-1 rounded backdrop-blur-sm">
                    <MapPin size={11} />
                    <span>{post.location}</span>
                  </div>

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-yellow-400 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                    <Maximize2 size={12} />
                    <span>Förstora</span>
                  </div>
                </div>

                {/* Post Content Body */}
                <div className="p-5">
                  <h3 className="text-base sm:text-lg font-black text-white mb-2 leading-snug group-hover:text-yellow-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line mb-4 font-normal line-clamp-3">
                    {post.content}
                  </p>

                  <span className="text-yellow-400 text-xs font-bold block mb-4 group-hover:underline">
                    Klicka för att läsa hela inlägget &rarr;
                  </span>

                  {/* Facebook Interaction Metrics */}
                  <div className="flex items-center gap-4 text-xs text-zinc-400 py-2 border-y border-white/5">
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={13} className="text-blue-400" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={13} />
                      <span>{post.comments} kommentarer</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 size={13} />
                      <span>{post.shares}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Button Linking directly to Facebook */}
              <div className="p-4 sm:p-5 pt-0">
                <a
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all min-h-[44px]"
                >
                  <FacebookIcon size={16} />
                  <span>Se Inlägget på Facebook</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Expand Post Lightbox Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div 
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-zinc-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl my-auto"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-zinc-950/80">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-black font-black text-base shrink-0 shadow-md">
                    JW
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-white text-base">JW Streetfood</span>
                      <CheckCircle2 size={16} className="text-blue-400 fill-blue-400/20" />
                    </div>
                    <span className="text-xs text-zinc-400 block">{selectedPost.timeAgo} &bull; {selectedPost.location}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedPost(null)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Stäng inlägg"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Modal Full Image */}
              <div className="relative w-full max-h-[50vh] overflow-hidden bg-black flex items-center justify-center">
                <img 
                  src={selectedPost.imageUrl} 
                  alt={selectedPost.title}
                  className="w-full h-full object-contain max-h-[50vh]"
                />
              </div>

              {/* Modal Body with Full Content */}
              <div className="p-5 sm:p-7 space-y-4">
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {selectedPost.title}
                </h3>

                <p className="text-zinc-200 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
                  {selectedPost.content}
                </p>

                {/* Facebook Interaction Metrics */}
                <div className="flex items-center gap-5 text-xs text-zinc-400 py-3 border-y border-white/10">
                  <span className="flex items-center gap-1.5 font-bold">
                    <ThumbsUp size={15} className="text-blue-400" />
                    <span>{selectedPost.likes} gilla-markeringar</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <MessageCircle size={15} />
                    <span>{selectedPost.comments} kommentarer</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <Share2 size={15} />
                    <span>{selectedPost.shares} delningar</span>
                  </span>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={selectedPost.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all"
                  >
                    <FacebookIcon size={18} />
                    <span>Öppna Originalinlägget på Facebook</span>
                    <ExternalLink size={16} />
                  </a>

                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm transition-colors"
                  >
                    Stäng
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
