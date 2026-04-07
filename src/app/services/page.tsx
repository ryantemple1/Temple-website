import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesIndex from "@/components/ServicesIndex";

export const metadata: Metadata = {
  title: "Our Services | Temple Landscaping & Exterior Services Calgary",
  description:
    "Explore Temple Landscaping's full range of services in Calgary. Lawn care, landscaping, hedge trimming, weed control, window cleaning, gutter cleaning, driveway sealing, and pressure washing. Serving all Calgary neighbourhoods.",
  openGraph: {
    title: "Our Services | Temple Landscaping & Exterior Services Calgary",
    description:
      "Explore Temple Landscaping's full range of services in Calgary. Lawn care, landscaping, hedge trimming, weed control, window cleaning, gutter cleaning, driveway sealing, and pressure washing. Serving all Calgary neighbourhoods.",
    url: "https://www.templelandscaping.ca/services",
    images: [
      {
        url: "/og-logo.png",
        width: 1200,
        height: 630,
        alt: "Landscaping and exterior cleaning services in Calgary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | Temple Landscaping & Exterior Services Calgary",
    description:
      "Explore Temple Landscaping's full range of services in Calgary. Lawn care, landscaping, hedge trimming, weed control, window cleaning, gutter cleaning, driveway sealing, and pressure washing. Serving all Calgary neighbourhoods.",
    images: ["/og-logo.png"],
  },
  alternates: {
    canonical: "https://www.templelandscaping.ca/services",
  },
};

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <ServicesIndex />
      <Footer />
    </main>
  );
}
