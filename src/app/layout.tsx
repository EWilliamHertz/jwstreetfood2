import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JW Street Food | Falköping & Lidköping",
  description: "Välkommen till JW Street Food i Falköping (Järnvägsgatan 12) och Lidköping (Stenportgatan 35). Äkta smashburgare, gourmetkörv och dirty fries. Tisdag–lördag 12:00–20:00.",
  openGraph: {
    title: "JW Street Food | En Go' Körv & Burgare",
    description: "Äkta smashburgare & gourmetkorv i Falköping och Lidköping. Tisdag–lördag 12:00–20:00.",
    url: "https://www.facebook.com/profile.php?id=61578509021815",
    siteName: "JW Street Food",
    images: [
      {
        url: "/assets/images/IMG_5799.jpeg",
        width: 1200,
        height: 630,
        alt: "JW Street Food",
      },
    ],
    locale: "sv_SE",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-zinc-950 text-white selection:bg-yellow-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
