"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "EN" | "SV";

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  navHome: { EN: "Home", SV: "Hem" },
  navStory: { EN: "Our Story", SV: "Om Oss" },
  navMenu: { EN: "Menu", SV: "Meny" },
  navGallery: { EN: "Facebook Feed", SV: "Facebook Inlägg" },
  navLocation: { EN: "Locations", SV: "Hitta Hit" },
  navCatering: { EN: "Catering", SV: "Catering" },
  heroTagline: {
    EN: "EN GO' KÖRV & BURGARE",
    SV: "EN GO' KÖRV & BURGARE",
  },
  heroSubtitle: {
    EN: "Authentic street food from the heart of Falköping & Lidköping.",
    SV: "Äkta street food från hjärtat av Falköping & Lidköping.",
  },
  heroCta: { EN: "View Menu", SV: "Se Vår Meny" },
  heroFindUs: { EN: "Find Us", SV: "Hitta Hit" },
  galleryTitle: {
    EN: "Footage & Community",
    SV: "JW Streetfood i Bild & Film",
  },
  gallerySubtitle: {
    EN: "Footage, updates and delicious moments directly from our Facebook page.",
    SV: "Klipp, nyheter och goda stunder direkt från vår Facebook-sida.",
  },
  locationTitle: {
    EN: "Our Locations",
    SV: "Här Hittar Du Oss",
  },
  locationSubtitle: {
    EN: "Falköping & Lidköping",
    SV: "Falköping & Lidköping",
  },
  footerText: {
    EN: "JW Street Food. All rights reserved.",
    SV: "JW Street Food. Alla rättigheter reserverade.",
  },
  storyTitle: { EN: "Our Passion for Street Food", SV: "Vår Passion för Street Food" },
  storyP1: {
    EN: "At JW Street Food, we are passionate about serving food made with dedication, pride, and top-tier ingredients. We believe in the unbeatable perfection of a properly smashed burger and the nostalgia of a classic, flame-grilled sausage with homemade sides.",
    SV: "På JW Street Food brinner vi för att servera mat gjord med kärlek, stolthet och förstklassiga råvaror. Vi tror på den perfekta balansen i en riktigt saftig smashburgare och den oslagbara smaken av en klassisk, välgrillad korv med hemgjorda tillbehör.",
  },
  storyP2: {
    EN: "Proudly serving Skaraborg with our regular spots in Falköping at Järnvägsgatan 12 and in Lidköping at Stenportgatan 35. You'll always be greeted with a warm smile and freshly prepared food.",
    SV: "Vi är stolta över att servera Skaraborg med våra fasta platser i Falköping på Järnvägsgatan 12 och i Lidköping på Stenportgatan 35. Hos oss möts du alltid av ett varmt leende och nylagad mat från grillen.",
  },
  storyP3: {
    EN: "Whether you crave our gourmet dog, loaded dirty fries with sliced smash patty and cheese, or a double cheddar bacon burger, we guarantee a street food experience that brings you back for more.",
    SV: "Oavsett om du är sugen på vår gourmetkörv, dirty fries toppad med saftig slicead smashburgare och ost, eller en dubbel cheddar bacon-burgare, lovar vi en smakupplevelse som får dig att komma tillbaka.",
  },
  storyP4: {
    EN: "Follow us on Facebook for daily updates, special dishes, and weekend events across Västra Götaland!",
    SV: "Följ oss på Facebook för dagliga uppdateringar, veckans specialare och helgevent runt om i Skaraborg!",
  },
  storyAmbition: {
    EN: "Authentic, freshly grilled street food – made with love from scratch.",
    SV: "En go' körv & burgare – gjord med kärlek från grunden.",
  },
  cateringTitle: { EN: "Catering & Private Events", SV: "Catering & Bokning" },
  cateringDesc: { 
    EN: "Want JW Street Food at your next event? We cater private parties, corporate lunches, weddings, and festivals across Falköping, Lidköping, and beyond. Book our food truck to delight your guests with fresh smash burgers and gourmet dogs.",
    SV: "Vill du ha JW Street Food på ditt nästa event? Vi erbjuder catering för företagsevent, bröllop, födelsedagar och festivaler i Falköping, Lidköping och hela Skaraborg. Boka vår vagn för en oförglömlig street food-upplevelse!"
  },
  cateringCta: { EN: "Send Catering Request", SV: "Skicka Förfrågan" },
  bookingFormTitle: { EN: "Book Our Food Truck", SV: "Boka Vår Vagn" },
  bookingSuccess: { EN: "Inquiry Sent! We will contact you shortly.", SV: "Tack för din förfrågan! Vi återkommer inom kort." },
  formSelectDate: { EN: "Select Date", SV: "Välj Datum" },
  formSelectTime: { EN: "Select Time", SV: "Välj Tid" },
  formName: { EN: "Name", SV: "Namn" },
  formNamePlaceholder: { EN: "Your name", SV: "Ditt namn" },
  formEmail: { EN: "Email", SV: "E-post" },
  formEmailPlaceholder: { EN: "your@email.com", SV: "din@epost.se" },
  formPhone: { EN: "Phone Number", SV: "Telefonnummer" },
  formPhonePlaceholder: { EN: "Your phone number", SV: "Ditt telefonnummer" },
  formGuests: { EN: "Estimated Guests", SV: "Uppskattat Antal Gäster" },
  formSubmit: { EN: "Send Booking Request", SV: "Skicka Bokningsförfrågan" },
  formProcessing: { EN: "Sending...", SV: "Skickar..." },
  tabCatering: { EN: "Event Catering", SV: "Catering / Företagsevent" },
  tabPreorder: { EN: "Group Pre-order", SV: "Gruppbeställning" },
  formDetails: { EN: "Event Details / Location", SV: "Information om Event & Önskemål" },
  formDetailsCateringPlaceholder: { EN: "Event type, location, date preferences, dietary wishes...", SV: "Eventtyp, adress/plats, önskemål om meny, allergier..." },
  formDetailsPreorderPlaceholder: { EN: "What would you like to pre-order and when?", SV: "Vad önskar ni beställa och vilken tid hämtar ni?" },
  liveLocationBanner: { EN: "📍 Today's Location", SV: "📍 Dagens Plats" },
  menuTitle: { EN: "Our Menu", SV: "Vår Meny" },
  menuSubtitle: { EN: "Craft Burgers & Gourmet Dogs", SV: "Hantverksburgare & Gourmetkörv" },
  noSchedule: { EN: "Check our Facebook page for live location updates today!", SV: "Kolla vår Facebook-sida för dagens aktuella tider och plats!" }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("SV"); // Default Swedish
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = (key: keyof typeof translations): string => {
    return translations[key]?.SV || String(key);
  };

  return (
    <LanguageContext.Provider value={{ lang: "SV", setLang: () => {}, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
