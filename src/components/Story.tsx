"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { Flame, Heart, Award, MapPin } from "lucide-react";

export function Story() {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: Flame,
      title: "Äkta Smash & Grill",
      desc: "Hög värme, frasig smash-yta och saftigt kött i briochebröd."
    },
    {
      icon: Heart,
      title: "Gjord med Kärlek",
      desc: "Noggrant utvalda råvaror och hemlagade tillbehör från grunden."
    },
    {
      icon: MapPin,
      title: "2 Fasta Platser",
      desc: "Järnvägsgatan 12 i Falköping & Stenportgatan 35 i Lidköping."
    },
    {
      icon: Award,
      title: "780+ Följare",
      desc: "Uppskattad lokal street food-favorit i hela Skaraborg."
    }
  ];

  return (
    <section id="story" className="py-24 bg-zinc-950 relative overflow-hidden border-t border-white/5">
      {/* Background visual flair */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Story Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed"
          >
            <div>
              <span className="text-yellow-400 font-black tracking-widest text-xs uppercase mb-2 inline-block">
                VÅR RESA &bull; VÅR MAT
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
                {t("storyTitle")}
              </h2>
              <div className="h-1.5 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mt-4" />
            </div>
            
            <p className="pt-2">{t("storyP1")}</p>
            <p>{t("storyP2")}</p>
            <p>{t("storyP3")}</p>
            <p>{t("storyP4")}</p>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-400/10 via-amber-400/5 to-transparent border-l-4 border-yellow-400 rounded-r-2xl">
              <p className="text-lg sm:text-xl font-bold text-white italic">
                "{t("storyAmbition")}"
              </p>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-yellow-400/10 text-yellow-400 flex items-center justify-center mb-2">
                      <Icon size={18} />
                    </div>
                    <h4 className="font-bold text-white text-sm uppercase">{item.title}</h4>
                    <p className="text-xs text-zinc-400 mt-1">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Story Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Primary Main Image: Crew / Team */}
            <div className="relative h-[380px] sm:h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <img 
                src="/assets/images/IMG_5805.jpeg" 
                alt="JW Street Food Team"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 rounded-full bg-yellow-400 text-black text-xs font-black uppercase tracking-wider inline-block mb-2">
                  Vårt Lag
                </span>
                <p className="text-white text-xl sm:text-2xl font-black">
                  Människorna bakom maten på JW Street Food
                </p>
                <p className="text-zinc-300 text-xs sm:text-sm mt-1">
                  Alltid redo att servera rykande färska burgare och gourmetkorv!
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
