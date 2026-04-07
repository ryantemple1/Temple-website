import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About Us | Temple Landscaping & Exterior Services Calgary",
  description:
    "Learn about Temple Landscaping & Exterior Services. Who we are, our story, and why Calgary homeowners trust us with their properties.",
};

export default function About() {
  return (
    <main>
      <Navbar />
      <AboutPage />
      <Footer />
    </main>
  );
}
