import type { Metadata } from "next";
import { montserrat } from "@/fonts";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { GoogleAds } from "@/components/analytics/GoogleAds";
import { TextReveal } from "@/components/ui/TextReveal";
import { SITE_URL } from "@/constants/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Breinrock",
    template: "%s",
  },
  description: "Modern banking and payment infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <GoogleAds />
        <ScrollToTop />
        <TextReveal />
        {children}
        <Footer />
      </body>
    </html>
  );
}
