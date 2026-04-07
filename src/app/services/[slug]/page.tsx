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

  const title = `${service.title} in Calgary, AB | Temple Landscaping`;
  const description = `${service.shortDescription} Serving Calgary and SW neighbourhoods. Free estimates. 500+ homes served.`;
  const url = `https://www.templelandscaping.ca/services/${service.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: "/og-logo.png",
          width: 1200,
          height: 630,
          alt: `${service.title} in Calgary by Temple Landscaping`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-logo.png"],
    },
    alternates: {
      canonical: url,
    },
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
