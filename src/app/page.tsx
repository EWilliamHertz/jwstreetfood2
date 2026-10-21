import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { MenuSection } from "@/components/MenuSection";
import { Gallery } from "@/components/Gallery";
import { LocationSchedule } from "@/components/LocationSchedule";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { LanguageProvider } from "@/components/LanguageContext";
import { query } from "@/lib/db";

export default async function Home() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const daysSv = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];
  
  let locationData = {
    type: "today",
    text: "Falköping (Järnvägsgatan 12) & Lidköping (Stenportgatan 35) • Tis–Lör 12:00–20:00"
  };
  let fullSchedule: any[] = [];
  let menuItems: any[] = [];
  let reviews: any[] = [];

  try {
    const scheduleRes = await query("SELECT * FROM weekly_schedule ORDER BY id ASC");
    fullSchedule = scheduleRes.rows;

    const stockholmDate = new Date().toLocaleString("en-US", { timeZone: "Europe/Stockholm" });
    const now = new Date(stockholmDate);
    const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, 2 is Tuesday...

    if (dayOfWeek >= 2 && dayOfWeek <= 6) {
      locationData = {
        type: "today",
        text: "Öppet idag 12:00–20:00 i både Falköping (Järnvägsgatan 12) & Lidköping (Stenportgatan 35)!"
      };
    } else {
      locationData = {
        type: "future",
        text: "Öppet Tisdag–Lördag 12:00–20:00 på båda adresserna i Falköping & Lidköping"
      };
    }

    const menuRes = await query("SELECT * FROM menu_items ORDER BY id ASC");
    menuItems = menuRes.rows;

    const reviewsRes = await query("SELECT * FROM reviews ORDER BY id DESC");
    reviews = reviewsRes.rows;
  } catch (e) {
    console.error("Error fetching data:", e);
  }

  return (
    <LanguageProvider>
      <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-400 selection:text-black">
        <Navigation locationData={locationData} />
        <Hero />
        <Story />
        <MenuSection menuItems={menuItems} />
        <LocationSchedule scheduleData={fullSchedule} />
        <ReviewsCarousel reviews={reviews} />
        <Gallery />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
