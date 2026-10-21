"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { MapPin, Clock, Navigation, ExternalLink, Calendar } from "lucide-react";
import { FacebookIcon } from "./FacebookIcon";

export function LocationSchedule({ scheduleData }: { scheduleData: any[] }) {
  const { t } = useLanguage();

  const activeDays = scheduleData && scheduleData.length > 0 ? scheduleData.filter(d => d.is_active) : [];

  const locations = [
    {
      city: "Falköping",
      address: "Järnvägsgatan 12",
      postal: "521 47 Falköping, Sweden",
      note: "Vår fasta station vid järnvägsstationen i Falköping.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=J%C3%A4rnv%C3%A4gsgatan+12%2C+521+47+Falk%C3%B6ping",
      tag: "Flaggskeppsplats"
    },
    {
      city: "Lidköping",
      address: "Stenportgatan 35",
      postal: "531 30 Lidköping, Sweden",
      note: "Centralt i Lidköping med smidig parkering och takeaway.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Stenportgatan+35%2C+531+30+Lidk%C3%B6ping",
      tag: "Turné & Veckoplats"
    }
  ];

  return (
    <section id="location" className="py-24 bg-gradient-to-b from-yellow-400 via-amber-400 to-yellow-500 text-black relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-14 h-14 bg-black text-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl"
          >
            <MapPin size={28} />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-3"
          >
            {t("locationTitle")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-black/80 text-lg font-bold uppercase tracking-widest"
          >
            {t("locationSubtitle")}
          </motion.p>
        </div>

        {/* 2 Flagship Location Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
              className="bg-black text-white p-8 rounded-3xl shadow-2xl border border-black/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-yellow-400 text-black text-xs font-black uppercase tracking-wider">
                    {loc.tag}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-yellow-400 font-bold">
                    <MapPin size={14} />
                    <span>Skaraborg</span>
                  </div>
                </div>

                <h3 className="text-3xl font-black text-white uppercase tracking-wide mb-1">
                  {loc.city}
                </h3>
                <p className="text-xl font-bold text-yellow-400 mb-2">
                  {loc.address}
                </p>
                <p className="text-zinc-400 text-sm mb-3">
                  {loc.postal}
                </p>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-wider mb-1">
                    <Clock size={14} />
                    <span>Öppettider</span>
                  </div>
                  <p className="text-white font-extrabold text-sm">Tisdag – Lördag: 12:00 – 20:00</p>
                  <p className="text-zinc-400 text-xs">Söndag & Måndag: Stängt</p>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  {loc.note}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm uppercase tracking-wide transition-all shadow-md"
                >
                  <Navigation size={16} />
                  <span>Vägbeskrivning</span>
                  <ExternalLink size={14} />
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61578509021815"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/10"
                >
                  <FacebookIcon size={14} />
                  <span>Tider</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weekly Schedule Section */}
        <div className="bg-black/95 text-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-black/20">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
            <Calendar className="text-yellow-400" size={24} />
            <div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-white">
                Veckoschema & Öppettider
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm">
                Följ oss på Facebook för dagsaktuella tider vid event och festivaler!
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {activeDays.length === 0 ? (
              <div className="text-center text-zinc-300 font-bold p-8 bg-white/5 rounded-2xl">
                {t("noSchedule")}
              </div>
            ) : (
              activeDays.map((item, index) => (
                <div 
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/5 hover:border-yellow-400/40 transition-colors gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shrink-0" />
                    <div>
                      <span className="font-black text-white text-base uppercase tracking-wider block sm:inline mr-3">
                        {item.day_of_week}
                      </span>
                      <span className="text-zinc-300 text-sm">
                        {item.location_name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-yellow-400 text-sm font-black pl-5 sm:pl-0">
                    <Clock size={14} />
                    <span>{item.time_range}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
