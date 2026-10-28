import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Euphoria Café · Koramangala Bengaluru | Waffles, Shakes & Dessert Atelier",
  description:
    "Experience Koramangala's premier dessert destination. Freshly pressed Belgian Liege waffles, artisanal cheesecake waffles, decadent waffle sundaes, celebration cakes, and thick freakshakes served till 1:00 AM.",
  keywords: [
    "Euphoria Cafe",
    "Koramangala waffles",
    "dessert cafe Bengaluru",
    "Belgian waffles Bangalore",
    "cheesecake waffles",
    "waffle cakes",
    "late night desserts Koramangala",
  ],
  icons: {
    icon: "/assets/brand/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-surface text-on-surface antialiased min-h-screen flex flex-col selection:bg-brand-pink selection:text-brand-burgundy">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
