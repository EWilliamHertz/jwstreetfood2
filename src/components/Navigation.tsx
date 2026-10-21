"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { Menu, X, MapPin } from "lucide-react";
import { FacebookIcon } from "./FacebookIcon";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

export function Navigation({ locationData }: { locationData?: { type: string, text: string } | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const getHref = (hash: string) => isHome ? hash : `/${hash}`;

  const navLinks = [
    { name: t("navHome"), href: getHref("#home") },
    { name: t("navMenu"), href: getHref("#menu") },
    { name: t("navLocation"), href: getHref("#location") },
    { name: t("navGallery"), href: getHref("#gallery") },
    { name: t("navStory"), href: getHref("#story") },
  ];

  const getPrefix = () => {
    if (!locationData) return "";
    if (locationData.type === "today") {
      return lang === "SV" ? "📍 Dagens Plats:" : "📍 Today's Location:";
    } else if (locationData.type === "tomorrow") {
      return lang === "SV" ? "📍 Imorgon:" : "📍 Tomorrow:";
    } else {
      return lang === "SV" ? "📍 Nästa Plats:" : "📍 Next Location:";
    }
  };

  const prefix = getPrefix();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-black/95 backdrop-blur-md shadow-2xl border-b border-white/5" : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
      )}
    >
      {/* Top Location Banner if open today */}
      {locationData && (
        <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 text-black py-1.5 px-4 text-center text-xs sm:text-sm font-black tracking-wide shadow-inner">
          <a href={getHref("#location")} className="hover:underline flex items-center justify-center gap-2">
            <span className="font-extrabold">{prefix}</span>
            <span>{locationData.text}</span>
          </a>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <motion.a
          href={getHref("#home")}
          className="text-white hover:opacity-95 transition-opacity"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Logo />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-7">
          <ul className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <motion.li key={link.name} whileHover={{ y: -2 }}>
                <a
                  href={link.href}
                  className="text-zinc-200 hover:text-yellow-400 font-semibold tracking-wide text-sm transition-colors uppercase"
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Social Link to Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61578509021815"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 font-bold text-xs uppercase tracking-wider transition-all"
          >
            <FacebookIcon size={14} />
            <span>Följ oss på Facebook</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="https://www.facebook.com/profile.php?id=61578509021815"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 p-2 rounded-full bg-blue-500/10"
            aria-label="Facebook"
          >
            <FacebookIcon size={20} />
          </a>
          <motion.button
            className="text-white p-2 rounded-lg bg-white/5 border border-white/10"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 80px)" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-zinc-950 border-t border-white/10 overflow-y-auto px-6 py-8 flex flex-col justify-between"
          >
            <div className="flex flex-col space-y-6 text-center pt-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black text-white uppercase tracking-wider hover:text-yellow-400 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 pb-8 border-t border-white/10 pt-6">
              <a
                href="https://www.facebook.com/profile.php?id=61578509021815"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide w-full justify-center shadow-lg"
              >
                <FacebookIcon size={18} />
                <span>Följ oss på Facebook</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
