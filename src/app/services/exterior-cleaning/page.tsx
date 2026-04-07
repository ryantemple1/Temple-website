import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCategoryPage from "@/components/ServiceCategoryPage";
import { getCategoryData, getServicesByCategory } from "@/data/services";

export const metadata: Metadata = {
  title: "Exterior Cleaning Services | Temple Landscaping & Exterior Services Calgary",
  description:
    "Exterior cleaning services in Calgary. Professional window cleaning, gutter cleaning, driveway sealing, and pressure washing. One team for all your exterior needs. Free estimates.",
  openGraph: {
    title: "Exterior Cleaning Services | Temple Landscaping & Exterior Services Calgary",
    description:
      "Exterior cleaning services in Calgary. Professional window cleaning, gutter cleaning, driveway sealing, and pressure washing. One team for all your exterior needs. Free estimates.",
    url: "https://www.templelandscaping.ca/services/exterior-cleaning",
    images: [
      {
        url: "/og-logo.png",
        width: 1200,
        height: 630,
        alt: "Professional exterior cleaning services in Calgary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exterior Cleaning Services | Temple Landscaping & Exterior Services Calgary",
    description:
      "Exterior cleaning services in Calgary. Professional window cleaning, gutter cleaning, driveway sealing, and pressure washing. One team for all your exterior needs. Free estimates.",
    images: ["/og-logo.png"],
  },
  alternates: {
    canonical: "https://www.templelandscaping.ca/services/exterior-cleaning",
  },
};

export default function ExteriorCleaningPage() {
  const category = getCategoryData("exterior-cleaning")!;
  const services = getServicesByCategory("exterior-cleaning");

  return (
    <main>
      <Navbar />
      <ServiceCategoryPage category={category} services={services} />
      <Footer />
    </main>
  );
}
