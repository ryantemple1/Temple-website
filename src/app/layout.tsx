import type { Metadata } from "next";
import { Inter, DM_Serif_Text } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

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
  title: "Temple Landscaping & Exterior Services | Calgary",
  description:
    "Professional landscaping, lawn care, and exterior cleaning services throughout Calgary. Weekly lawn mowing, seasonal clean-ups, landscaping projects, and more.",
  keywords: [
    "landscaping Calgary",
    "lawn care Calgary",
    "lawn mowing Calgary",
    "spring cleanup Calgary",
    "window cleaning Calgary",
    "driveway sealing Calgary",
    "gutter cleaning Calgary",
    "hedge trimming Calgary",
    "weed control Calgary",
  ],
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
        {children}
      </body>
    </html>
  );
}
