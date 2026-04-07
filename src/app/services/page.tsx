import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesIndex from "@/components/ServicesIndex";

export const metadata: Metadata = {
  title: "Our Services | Temple Landscaping & Exterior Services Calgary",
  description:
    "Full range of lawn care, landscaping, and exterior cleaning services for homeowners across Calgary. Weekly mowing, seasonal clean-ups, landscaping, window cleaning, gutter cleaning, and more.",
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
