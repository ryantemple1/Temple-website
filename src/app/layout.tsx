import type { Metadata } from "next";
import { Inter, DM_Serif_Text } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import StructuredData from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSerif = DM_Serif_Text({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.templelandscaping.ca"),
  title: "Lawn Care & Landscaping in Calgary, AB | Temple Landscaping & Exterior Services",
  description:
    "Professional landscaping, lawn care, and exterior cleaning in Calgary. Weekly mowing, seasonal cleanups, hedge trimming, weed control, window cleaning, driveway sealing, and more. 500+ homes served. Free estimates.",
  keywords: [
    "landscaping Calgary",
    "lawn care Calgary",
    "lawn mowing Calgary SW",
    "landscaping SW Calgary",
    "spring cleanup Calgary",
    "fall cleanup Calgary",
    "window cleaning Calgary",
    "driveway sealing Calgary",
    "gutter cleaning Calgary",
    "hedge trimming Calgary",
    "weed control Calgary",
    "pressure washing Calgary",
    "landscaping near me Calgary",
    "lawn care companies Calgary",
    "exterior cleaning Calgary",
    "landscaping contractor Calgary",
  ],
  openGraph: {
    title: "Lawn Care & Landscaping in Calgary, AB | Temple Landscaping & Exterior Services",
    description:
      "Professional landscaping, lawn care, and exterior cleaning in Calgary. Weekly mowing, seasonal cleanups, hedge trimming, weed control, window cleaning, driveway sealing, and more. 500+ homes served. Free estimates.",
    url: "https://www.templelandscaping.ca",
    siteName: "Temple Landscaping & Exterior Services",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/og-logo.png",
        width: 1200,
        height: 630,
        alt: "Professional lawn care and landscaping in Calgary by Temple Landscaping",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lawn Care & Landscaping in Calgary, AB | Temple Landscaping & Exterior Services",
    description:
      "Professional landscaping, lawn care, and exterior cleaning in Calgary. Weekly mowing, seasonal cleanups, hedge trimming, weed control, window cleaning, driveway sealing, and more. 500+ homes served. Free estimates.",
    images: ["/og-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.templelandscaping.ca",
  },
  icons: {
    icon: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
  other: {
    "geo.region": "CA-AB",
    "geo.placename": "Calgary",
    "geo.position": "51.0447;-114.0719",
    "ICBM": "51.0447, -114.0719",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSerif.variable} antialiased`}>
        <SmoothScroll />
        <StructuredData />
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
