"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { categoryData, getServicesByCategory } from "@/data/services";

export default function ServiceDivisions() {
  return (
    <section id="services" className="py-20 md:py-28 bg-temple-charcoal">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-[14px] font-semibold uppercase tracking-[0.15em] text-temple-green mb-3">
            What We Offer
          </p>
          <h2 className="font-serif text-[36px] md:text-[44px] font-bold text-temple-dark tracking-[-0.02em] leading-[1.15]">
            Two Divisions, One Team
          </h2>
          <p className="mt-4 mx-auto max-w-[550px] text-[16px] text-[#6b7280] leading-[1.7]">
            We offer lawn care and exterior cleaning as two dedicated service
            lines, so you get focused expertise for every job.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {categoryData.map((category, index) => {
            const categoryServices = getServicesByCategory(category.slug);
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Link
                  href={`/services/${category.slug}`}
                  className="group block cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-[15px] h-[420px] md:h-[480px]">
                    <img
                      src={category.heroImage}
                      alt={category.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                      <p className="text-[14px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-2">
                        {categoryServices.length} Services
                      </p>
                      <h3 className="font-serif text-[28px] md:text-[34px] font-bold text-white tracking-[-0.02em] leading-[1.15] mb-4">
                        {category.title}
                      </h3>
                      <ul className="space-y-2 mb-6">
                        {categoryServices.map((s) => (
                          <li
                            key={s.slug}
                            className="text-[15px] text-white/70 flex items-center gap-2"
                          >
                            <span className="h-1 w-1 rounded-full bg-temple-green flex-shrink-0" />
                            {s.title}
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-white group-hover:text-temple-green-light transition-colors duration-200">
                        View Services
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
