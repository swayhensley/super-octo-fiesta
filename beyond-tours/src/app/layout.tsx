import type { Metadata } from "next";
import "./globals.css";
import "./style.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimationProvider from "@/components/providers/AnimationProvider";

export const metadata: Metadata = {
  title: "Beyond Tours | Kenya Travel Agency",
  description: "Authentic Safaris. Coastal Escapes. Urban Adventures. Explore Kenya with Beyond Tours - your trusted travel partner for unforgettable experiences.",
  keywords: ["Kenya tours", "safari", "Maasai Mara", "Nairobi", "travel agency", "Mombasa", "Naivasha"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AnimationProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AnimationProvider>
      </body>
    </html>
  );
}

