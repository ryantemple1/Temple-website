import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCategoryPage from "@/components/ServiceCategoryPage";
import { getCategoryData, getServicesByCategory } from "@/data/services";

export const metadata: Metadata = {
  title: "Lawn Care & Landscaping | Temple Landscaping & Exterior Services Calgary",
  description:
    "Professional lawn care and landscaping services in Calgary. Weekly mowing, spring and fall cleanups, hedge trimming, weed control, and full landscaping projects. Serving SW Calgary and surrounding areas.",
  openGraph: {
    title: "Lawn Care & Landscaping | Temple Landscaping & Exterior Services Calgary",
    description:
      "Professional lawn care and landscaping services in Calgary. Weekly mowing, spring and fall cleanups, hedge trimming, weed control, and full landscaping projects. Serving SW Calgary and surrounding areas.",
    url: "https://www.templelandscaping.ca/services/lawn-care",
    images: [
      {
        url: "/og-logo.png",
        width: 1200,
        height: 630,
        alt: "Professional lawn care and landscaping services in Calgary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lawn Care & Landscaping | Temple Landscaping & Exterior Services Calgary",
    description:
      "Professional lawn care and landscaping services in Calgary. Weekly mowing, spring and fall cleanups, hedge trimming, weed control, and full landscaping projects. Serving SW Calgary and surrounding areas.",
    images: ["/og-logo.png"],
  },
  alternates: {
    canonical: "https://www.templelandscaping.ca/services/lawn-care",
  },
};

export default function LawnCarePage() {
  const category = getCategoryData("lawn-care")!;
  const services = getServicesByCategory("lawn-care");

  return (
    <main>
      <Navbar />
      <ServiceCategoryPage category={category} services={services} />
      <Footer />
    </main>
  );
}
