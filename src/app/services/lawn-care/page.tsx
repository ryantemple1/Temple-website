import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCategoryPage from "@/components/ServiceCategoryPage";
import { getCategoryData, getServicesByCategory } from "@/data/services";

export const metadata: Metadata = {
  title: "Lawn Care & Landscaping | Temple Landscaping & Exterior Services Calgary",
  description:
    "Professional lawn care and landscaping services in Calgary. Weekly mowing, seasonal clean-ups, landscaping, hedge trimming, and weed control.",
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
