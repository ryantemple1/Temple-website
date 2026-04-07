import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCategoryPage from "@/components/ServiceCategoryPage";
import { getCategoryData, getServicesByCategory } from "@/data/services";

export const metadata: Metadata = {
  title: "Exterior Cleaning Services | Temple Landscaping & Exterior Services Calgary",
  description:
    "Professional exterior cleaning services in Calgary. Window cleaning, gutter cleaning, and exposed aggregate driveway sealing.",
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
