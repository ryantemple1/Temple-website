export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.templelandscaping.ca/#business",
        name: "Temple Landscaping & Exterior Services",
        url: "https://www.templelandscaping.ca",
        telephone: "+14033908395",
        email: "ryantemplelandscape@gmail.com",
        image: "https://www.templelandscaping.ca/logo-full.png",
        logo: "https://www.templelandscaping.ca/logo-icon.png",
        description:
          "Professional landscaping, lawn care, and exterior cleaning services in Calgary, Alberta. Weekly lawn mowing, seasonal cleanups, landscaping, hedge trimming, weed control, window cleaning, gutter cleaning, driveway sealing, and pressure washing.",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Calgary",
          addressRegion: "AB",
          addressCountry: "CA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "51.0447",
          longitude: "-114.0719",
        },
        areaServed: [
          { "@type": "City", name: "Calgary, Alberta" },
          { "@type": "AdministrativeArea", name: "Southwest Calgary" },
          { "@type": "AdministrativeArea", name: "Aspen Woods, Calgary" },
          { "@type": "AdministrativeArea", name: "Signal Hill, Calgary" },
          { "@type": "AdministrativeArea", name: "Springbank Hill, Calgary" },
          { "@type": "AdministrativeArea", name: "Cougar Ridge, Calgary" },
          { "@type": "AdministrativeArea", name: "West Springs, Calgary" },
          { "@type": "AdministrativeArea", name: "Coach Hill, Calgary" },
          { "@type": "AdministrativeArea", name: "Marda Loop, Calgary" },
          { "@type": "AdministrativeArea", name: "Altadore, Calgary" },
          { "@type": "AdministrativeArea", name: "Elbow Park, Calgary" },
          { "@type": "AdministrativeArea", name: "Mount Royal, Calgary" },
          { "@type": "AdministrativeArea", name: "Killarney, Calgary" },
          { "@type": "AdministrativeArea", name: "Lakeview, Calgary" },
          { "@type": "AdministrativeArea", name: "Garrison Woods, Calgary" },
          { "@type": "AdministrativeArea", name: "Currie, Calgary" },
          { "@type": "AdministrativeArea", name: "Bankview, Calgary" },
          { "@type": "AdministrativeArea", name: "Windsor Park, Calgary" },
          { "@type": "AdministrativeArea", name: "Britannia, Calgary" },
          { "@type": "AdministrativeArea", name: "Eagle Ridge, Calgary" },
          { "@type": "AdministrativeArea", name: "Pump Hill, Calgary" },
          { "@type": "AdministrativeArea", name: "Braeside, Calgary" },
          { "@type": "AdministrativeArea", name: "Cedarbrae, Calgary" },
          { "@type": "AdministrativeArea", name: "Oakridge, Calgary" },
          { "@type": "AdministrativeArea", name: "Haysboro, Calgary" },
          { "@type": "AdministrativeArea", name: "Woodbine, Calgary" },
          { "@type": "AdministrativeArea", name: "Canyon Meadows, Calgary" },
          { "@type": "AdministrativeArea", name: "Lake Bonavista, Calgary" },
          { "@type": "AdministrativeArea", name: "Sundance, Calgary" },
          { "@type": "AdministrativeArea", name: "Midnapore, Calgary" },
          { "@type": "AdministrativeArea", name: "Cranston, Calgary" },
          { "@type": "AdministrativeArea", name: "Walden, Calgary" },
          { "@type": "AdministrativeArea", name: "Legacy, Calgary" },
          { "@type": "AdministrativeArea", name: "Silverado, Calgary" },
          { "@type": "AdministrativeArea", name: "Shawnessy, Calgary" },
          { "@type": "AdministrativeArea", name: "Evergreen, Calgary" },
          { "@type": "AdministrativeArea", name: "Chaparral, Calgary" },
          { "@type": "AdministrativeArea", name: "Somerset, Calgary" },
          { "@type": "AdministrativeArea", name: "Bridlewood, Calgary" },
          { "@type": "AdministrativeArea", name: "Glamorgan, Calgary" },
          {
            "@type": "AdministrativeArea",
            name: "Strathcona Park, Calgary",
          },
          { "@type": "AdministrativeArea", name: "Christie Park, Calgary" },
          { "@type": "AdministrativeArea", name: "Patterson, Calgary" },
          { "@type": "AdministrativeArea", name: "Rosscarrock, Calgary" },
          { "@type": "AdministrativeArea", name: "Glenbrook, Calgary" },
          { "@type": "AdministrativeArea", name: "Glendale, Calgary" },
          { "@type": "AdministrativeArea", name: "Richmond, Calgary" },
          { "@type": "AdministrativeArea", name: "Rutland Park, Calgary" },
          { "@type": "AdministrativeArea", name: "Lincoln Park, Calgary" },
          {
            "@type": "AdministrativeArea",
            name: "North Glenmore Park, Calgary",
          },
          { "@type": "AdministrativeArea", name: "Palliser, Calgary" },
          { "@type": "AdministrativeArea", name: "Southwood, Calgary" },
          { "@type": "AdministrativeArea", name: "Woodlands, Calgary" },
          { "@type": "AdministrativeArea", name: "Queensland, Calgary" },
          { "@type": "AdministrativeArea", name: "Deer Ridge, Calgary" },
          { "@type": "AdministrativeArea", name: "Deer Run, Calgary" },
          { "@type": "AdministrativeArea", name: "Kelvin Grove, Calgary" },
          { "@type": "AdministrativeArea", name: "Elboya, Calgary" },
          { "@type": "AdministrativeArea", name: "South Calgary" },
          { "@type": "AdministrativeArea", name: "Bayview, Calgary" },
          { "@type": "AdministrativeArea", name: "Millrise, Calgary" },
          { "@type": "AdministrativeArea", name: "Shawnee Slopes, Calgary" },
          { "@type": "AdministrativeArea", name: "Northeast Calgary" },
          { "@type": "AdministrativeArea", name: "Northwest Calgary" },
          { "@type": "AdministrativeArea", name: "Southeast Calgary" },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: "108",
          bestRating: "5",
          worstRating: "1",
        },
        review: [
          {
            "@type": "Review",
            author: { "@type": "Person", name: "Greg Tooth" },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            reviewBody:
              "Temple Landscaping does a fantastic job. High quality work, great communication, efficient team. I highly recommend.",
          },
          {
            "@type": "Review",
            author: { "@type": "Person", name: "Cynthia McClare" },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            reviewBody:
              "Ryan came by and did my windows last weekend! He did a great job, gave me a good deal, and was a very personable and kind young man. Definitely recommend his services.",
          },
          {
            "@type": "Review",
            author: { "@type": "Person", name: "Duane Parker" },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            reviewBody:
              "Great quality work with lawn mowing and maintenance. Highly recommend!",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Landscaping & Exterior Services",
          itemListElement: [
            {
              "@type": "OfferCatalog",
              name: "Lawn Care & Landscaping",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Weekly Lawn Mowing",
                    description:
                      "Professional weekly lawn mowing, edge trimming, and sidewalk blowing in Calgary",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Spring & Fall Clean Ups",
                    description:
                      "Seasonal aeration, power raking, leaf removal, and fertilization in Calgary",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Landscaping",
                    description:
                      "Hardscape and softscape landscaping services in Calgary including patios, walkways, retaining walls, sod, garden beds",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Hedge Trimming",
                    description:
                      "Professional hedge and shrub trimming and shaping in Calgary",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Weed Control",
                    description:
                      "Lawn and garden bed weed control treatments in Calgary",
                  },
                },
              ],
            },
            {
              "@type": "OfferCatalog",
              name: "Exterior Cleaning Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Window Cleaning",
                    description:
                      "Professional interior and exterior window cleaning in Calgary",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Gutter Cleaning",
                    description:
                      "Gutter and downspout cleaning and maintenance in Calgary",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Driveway Sealing",
                    description:
                      "Clear coat sealing for exposed aggregate driveways in Calgary",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Pressure Washing",
                    description:
                      "Professional pressure washing for driveways, sidewalks, patios in Calgary",
                  },
                },
              ],
            },
          ],
        },
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.templelandscaping.ca/#website",
        url: "https://www.templelandscaping.ca",
        name: "Temple Landscaping & Exterior Services",
        publisher: {
          "@id": "https://www.templelandscaping.ca/#business",
        },
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What areas of Calgary does Temple Landscaping serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Temple Landscaping serves all quadrants of Calgary with a focus on Southwest Calgary. We serve neighbourhoods including Aspen Woods, Signal Hill, Springbank Hill, Cougar Ridge, West Springs, Coach Hill, Marda Loop, Altadore, Elbow Park, Mount Royal, Killarney, Lakeview, Garrison Woods, Lake Bonavista, Cranston, Walden, Legacy, Silverado, Shawnessy, Evergreen, and many more.",
        },
      },
      {
        "@type": "Question",
        name: "How much does lawn mowing cost in Calgary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lawn mowing prices in Calgary vary based on property size and frequency. Temple Landscaping offers free estimates with no contracts required. Contact us for a personalized quote for your property.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer landscaping services in SW Calgary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Temple Landscaping provides full hardscape and softscape landscaping services throughout Southwest Calgary, including patios, walkways, retaining walls, sod installation, garden beds, mulch installation, and planting.",
        },
      },
      {
        "@type": "Question",
        name: "When should I schedule a spring cleanup in Calgary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Spring cleanups in Calgary are best scheduled in late April to mid May, after the last frost. Services include aeration, power raking, leaf removal, and fertilization to prepare your lawn for the growing season.",
        },
      },
      {
        "@type": "Question",
        name: "Does Temple Landscaping offer window cleaning in Calgary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We offer professional interior and exterior window cleaning across Calgary, including second-story windows. Frames and sills are wiped down with every job for a streak-free finish.",
        },
      },
      {
        "@type": "Question",
        name: "Is Temple Landscaping insured?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Temple Landscaping carries $3 million in liability insurance coverage. We have served over 500 homes in Calgary over 8+ years of operation.",
        },
      },
      {
        "@type": "Question",
        name: "Do you seal exposed aggregate driveways in Calgary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We provide clear coat sealing for exposed aggregate driveways in Calgary. Sealing protects against moisture, UV damage, freeze-thaw cycles, and road salt, extending the life of your driveway.",
        },
      },
      {
        "@type": "Question",
        name: "How often should gutters be cleaned in Calgary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We recommend cleaning gutters at least twice a year in Calgary, once in spring and once in fall. This prevents blockages, water overflow, foundation damage, and ice dams during winter.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
