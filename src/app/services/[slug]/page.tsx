import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  services,
  getServiceBySlug,
  getRelatedServices,
} from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageContent from "@/components/ServicePageContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} | Temple Landscaping & Exterior Services Calgary`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const related = getRelatedServices(service);

  return (
    <main>
      <Navbar />
      <ServicePageContent service={service} related={related} />
      <Footer />
    </main>
  );
}
