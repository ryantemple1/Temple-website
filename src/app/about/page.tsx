import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About Us | Temple Landscaping & Exterior Services Calgary",
  description:
    "Learn about Temple Landscaping & Exterior Services. Calgary born and raised, serving 500+ homes across SW Calgary for over 8 years. $3M insured. Lawn care, landscaping, and exterior cleaning.",
  openGraph: {
    title: "About Us | Temple Landscaping & Exterior Services Calgary",
    description:
      "Learn about Temple Landscaping & Exterior Services. Calgary born and raised, serving 500+ homes across SW Calgary for over 8 years. $3M insured. Lawn care, landscaping, and exterior cleaning.",
    url: "https://www.templelandscaping.ca/about",
    images: [
      {
        url: "/og-logo.png",
        width: 1200,
        height: 630,
        alt: "About Temple Landscaping and Exterior Services in Calgary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Temple Landscaping & Exterior Services Calgary",
    description:
      "Learn about Temple Landscaping & Exterior Services. Calgary born and raised, serving 500+ homes across SW Calgary for over 8 years. $3M insured. Lawn care, landscaping, and exterior cleaning.",
    images: ["/og-logo.png"],
  },
  alternates: {
    canonical: "https://www.templelandscaping.ca/about",
  },
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
