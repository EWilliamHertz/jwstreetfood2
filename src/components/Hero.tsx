"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { ArrowRight, MapPin, Sparkles, Clock } from "lucide-react";
import { FacebookIcon } from "./FacebookIcon";
import { useRef } from "react";

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section 
      id="home" 
      ref={ref}
      className="relative min-h-[92svh] md:min-h-[98svh] flex items-center justify-center overflow-hidden bg-zinc-950 pt-28 pb-14 px-4 sm:px-6"
    >
      {/* Background Hero Image with Parallax & Dark Aesthetic */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-zinc-950 z-10" />
        <img 
          src="/assets/images/IMG_5799.jpeg" 
          alt="JW Street Food Burgers"
          className="w-full h-full object-cover object-center scale-105 filter brightness-90 contrast-105"
        />
      </motion.div>

      {/* Hero Content Container - Mobile First */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 0.7, 
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.1
          }}
          className="flex flex-col items-center w-full"
        >
          {/* Eyebrow Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/15 border border-yellow-400/40 text-yellow-400 font-black tracking-[0.2em] text-[11px] sm:text-xs uppercase mb-5 backdrop-blur-md shadow-lg shadow-yellow-500/10"
          >
            <Sparkles size={13} className="text-yellow-400 animate-pulse" />
            <span>Falköping &bull; Lidköping</span>
          </motion.div>
          
          {/* Main Title - Mobile Optimized */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-4 drop-shadow-2xl uppercase"
          >
            JW STREET
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 drop-shadow-[0_4px_25px_rgba(251,191,36,0.35)]">
              FOOD
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-xl md:text-2xl text-zinc-200 font-semibold max-w-xl mb-3 leading-snug drop-shadow"
          >
            En Go' Körv & Burgare
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-xs sm:text-sm md:text-base text-zinc-400 max-w-lg mb-8 leading-relaxed"
          >
            Smashburgare med närproducerat svenskt wagyu-kött, gourmetkörv och dirty fries på två fysiska restauranger i Falköping och Lidköping.
          </motion.p>

          {/* Hours Highlight Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-yellow-400/30 text-yellow-400 text-xs sm:text-sm font-black mb-8 backdrop-blur-md"
          >
            <Clock size={16} />
            <span>Öppet Tisdag–Lördag: 12:00 – 20:00</span>
          </motion.div>

          {/* Action Buttons - Mobile friendly tap targets */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-3.5 w-full max-w-md sm:max-w-none justify-center"
          >
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-black text-base uppercase tracking-wider rounded-full shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:shadow-[0_0_45px_rgba(250,204,21,0.6)] transition-all min-h-[52px]"
            >
              <span>{t("heroCta")}</span>
              <ArrowRight size={18} />
            </motion.a>

            <motion.a
              href="#location"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base uppercase tracking-wider rounded-full border border-white/20 backdrop-blur-md transition-all min-h-[52px]"
            >
              <MapPin size={18} className="text-yellow-400" />
              <span>Hitta Våra Restauranger</span>
            </motion.a>
          </motion.div>

          {/* Two Physical Locations Quick Cards */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl text-left"
          >
            <a 
              href="https://www.google.com/maps/search/?api=1&query=J%C3%A4rnv%C3%A4gsgatan+12%2C+521+47+Falk%C3%B6ping" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-black/50 border border-white/10 hover:border-yellow-400/40 backdrop-blur-md transition-all flex items-start gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-black shrink-0 text-xs">
                1
              </div>
              <div className="min-w-0">
                <span className="text-[11px] uppercase tracking-wider text-yellow-400 font-extrabold block">Restaurang Falköping</span>
                <span className="text-sm font-bold text-white block truncate">Järnvägsgatan 12</span>
                <span className="text-xs text-zinc-400">521 47 Falköping &bull; Tis–Lör 12–20</span>
              </div>
            </a>

            <a 
              href="https://www.google.com/maps/search/?api=1&query=Stenportgatan+35%2C+531+30+Lidk%C3%B6ping" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-black/50 border border-white/10 hover:border-yellow-400/40 backdrop-blur-md transition-all flex items-start gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-black shrink-0 text-xs">
                2
              </div>
              <div className="min-w-0">
                <span className="text-[11px] uppercase tracking-wider text-yellow-400 font-extrabold block">Restaurang Lidköping</span>
                <span className="text-sm font-bold text-white block truncate">Stenportgatan 35</span>
                <span className="text-xs text-zinc-400">531 30 Lidköping &bull; Tis–Lör 12–20</span>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative ambient glowing orbs */}
      <div className="absolute -bottom-10 right-10 w-44 h-44 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-full blur-[90px] opacity-25 pointer-events-none" />
      <div className="absolute top-20 -left-10 w-48 h-48 bg-yellow-400 rounded-full blur-[100px] opacity-20 pointer-events-none" />
    </section>
  );
}
