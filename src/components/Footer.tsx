"use client";

import { useLanguage } from "./LanguageContext";
import { MapPin, Phone, Mail, Heart } from "lucide-react";
import { FacebookIcon } from "./FacebookIcon";
import { Logo } from "./Logo";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Logo />
            <p className="text-zinc-400 text-sm leading-relaxed">
              Äkta street food från hjärtat av Falköping och Lidköping. Smashade kvalitetsburgare och gourmetkorv gjord med kärlek och hantverk.
            </p>
            <div className="pt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61578509021815"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 font-bold text-xs uppercase tracking-wider transition-all"
              >
                <FacebookIcon size={16} />
                <span>Följ oss på Facebook</span>
              </a>
            </div>
          </div>

          {/* Location 1: Falköping */}
          <div className="space-y-3">
            <h4 className="text-yellow-400 font-black uppercase text-sm tracking-wider flex items-center gap-2">
              <MapPin size={16} />
              <span>Falköping</span>
            </h4>
            <p className="text-white font-bold text-base">Järnvägsgatan 12</p>
            <p className="text-zinc-400 text-sm">521 47 Falköping, Sweden</p>
            <p className="text-zinc-400 text-xs font-semibold">
              Tis–Lör: 12:00–20:00<br />
              Sön–Mån: Stängt
            </p>
          </div>

          {/* Location 2: Lidköping */}
          <div className="space-y-3">
            <h4 className="text-yellow-400 font-black uppercase text-sm tracking-wider flex items-center gap-2">
              <MapPin size={16} />
              <span>Lidköping</span>
            </h4>
            <p className="text-white font-bold text-base">Stenportgatan 35</p>
            <p className="text-zinc-400 text-sm">531 30 Lidköping, Sweden</p>
            <p className="text-zinc-400 text-xs font-semibold">
              Tis–Lör: 12:00–20:00<br />
              Sön–Mån: Stängt
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-yellow-400 font-black uppercase text-sm tracking-wider">
              Snabblänkar
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <a href="#menu" className="hover:text-yellow-400 transition-colors">Vår Meny</a>
              </li>
              <li>
                <a href="#location" className="hover:text-yellow-400 transition-colors">Hitta Hit (2 Restauranger)</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-yellow-400 transition-colors">Facebook Inlägg</a>
              </li>
              <li>
                <a href="#story" className="hover:text-yellow-400 transition-colors">Om Oss & Vårt Lag</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>&copy; {new Date().getFullYear()} JW Street Food. {t("footerText")}</p>
          <p className="flex items-center gap-1">
            Gjord med <Heart size={12} className="text-red-500 fill-current" /> för street food-älskare i Skaraborg
          </p>
        </div>
      </div>
    </footer>
  );
}
