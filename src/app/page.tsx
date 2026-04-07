import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import BentoGrid from "@/components/BentoGrid";
import Lifestyle from "@/components/Lifestyle";
import Testimonials from "@/components/Testimonials";
import Portfolio from "@/components/Portfolio";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export const metadata: Metadata = {
  title: "Lawn Care & Landscaping in Calgary, AB | Temple Landscaping & Exterior Services",
  description:
    "Calgary's trusted lawn care and landscaping company. Weekly mowing, spring and fall cleanups, landscaping, hedge trimming, weed control, window cleaning, gutter cleaning, and driveway sealing. Serving SW Calgary and all quadrants. Free estimates.",
  openGraph: {
    title: "Lawn Care & Landscaping in Calgary, AB | Temple Landscaping & Exterior Services",
    description:
      "Calgary's trusted lawn care and landscaping company. Weekly mowing, spring and fall cleanups, landscaping, hedge trimming, weed control, window cleaning, gutter cleaning, and driveway sealing. Serving SW Calgary and all quadrants. Free estimates.",
    url: "https://www.templelandscaping.ca",
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
      "Calgary's trusted lawn care and landscaping company. Weekly mowing, spring and fall cleanups, landscaping, hedge trimming, weed control, window cleaning, gutter cleaning, and driveway sealing. Serving SW Calgary and all quadrants. Free estimates.",
    images: ["/og-logo.png"],
  },
  alternates: {
    canonical: "https://www.templelandscaping.ca",
  },
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BentoGrid />
      <Lifestyle />
      <Testimonials />
      <Portfolio />
      <Contact />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
