import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PromoPopupLoader from "@/components/PromoPopupLoader";
import { getSiteSettings } from "@/lib/site-settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sightseeing Bike Tours | Guided Bike Tours in Dublin",
  description:
    "Explore Dublin on two wheels with guided bicycle and e-bike tours.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { logoUrl } = await getSiteSettings();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <PromoPopupLoader />
        <Navbar logoUrl={logoUrl} />
        <main className="flex-1">{children}</main>
        <Footer logoUrl={logoUrl} />
      </body>
    </html>
  );
}
