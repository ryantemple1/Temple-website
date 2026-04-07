"use client";

const partners = [
  "Husqvarna",
  "STIHL",
  "John Deere",
  "Scotts",
  "Honda Power",
  "Toro",
  "Rain Bird",
  "SealMaster",
];

export default function LogoMarquee() {
  return (
    <section className="py-8 bg-dark border-y border-cream-border overflow-hidden">
      <div className="flex items-center justify-center mb-4">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-cream-faint">
          Trusted Brands &amp; Partners
        </span>
      </div>

      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

        <div className="flex marquee-scroll whitespace-nowrap">
          {[...partners, ...partners, ...partners].map((partner, i) => (
            <span
              key={`${partner}-${i}`}
              className="mx-10 flex-shrink-0 text-lg font-semibold text-cream-faint hover:text-cream-subtle transition-colors duration-300 select-none"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .marquee-scroll {
          animation: marquee 20s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
