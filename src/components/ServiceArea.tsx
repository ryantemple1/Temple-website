"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const areas = [
  {
    name: "Northeast Calgary",
    neighborhoods: "Skyview, Saddleridge, Martindale, Taradale",
  },
  {
    name: "Northwest Calgary",
    neighborhoods: "Tuscany, Evanston, Nolan Hill, Sage Hill",
  },
  {
    name: "Southeast Calgary",
    neighborhoods: "Cranston, Auburn Bay, McKenzie Towne, Mahogany",
  },
  {
    name: "Southwest Calgary",
    neighborhoods: "Aspen Woods, Signal Hill, Springbank Hill, Evergreen",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ServiceArea() {
  return (
    <section className="py-32 bg-dark">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-green mb-3">
            Service Area
          </p>
          <h2 className="font-display text-[36px] md:text-[44px] font-bold text-cream tracking-[-0.02em] leading-[1.15]">
            Serving All of Calgary
          </h2>
          <p className="mt-4 mx-auto max-w-[550px] text-[16px] text-cream-muted leading-[1.7]">
            Temple Landscaping &amp; Exterior Services proudly serves Calgary,
            Alberta. We provide services across all areas of the city.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, index) => (
            <motion.div
              key={area.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-xl bg-dark-card p-6 border border-cream-border"
            >
              <div className="h-10 w-10 rounded-xl bg-green-glow flex items-center justify-center mb-4">
                <MapPin className="h-5 w-5 text-green" />
              </div>
              <h3 className="text-[16px] font-bold text-cream mb-2">
                {area.name}
              </h3>
              <p className="text-[14px] text-cream-muted leading-[1.7]">
                {area.neighborhoods}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
