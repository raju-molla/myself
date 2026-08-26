"use client";
import { motion } from "framer-motion";
import { Calendar, Building2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useSiteContent } from "@/libs/useSiteContent";
import { SITE_CONTENT_DEFAULTS } from "@/libs/siteContentDefaults";

export default function Experience() {
  const { data: experience } = useSiteContent("experience", SITE_CONTENT_DEFAULTS.experience);
  const experienceData = experience.items || [];

  return (
    <section id="experience" className="py-24 px-6" style={{ background: "var(--bg)" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="experience" title="Professional Experience" />

        <div className="relative mt-16">
          <div
            className="absolute left-[7px] sm:left-1/2 sm:-ml-px top-0 bottom-0 w-px"
            style={{ background: "var(--border)" }}
          />
          <div className="space-y-10">
            {experienceData.map((exp: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start gap-6 ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* node */}
                <span
                  className="absolute left-0 sm:left-1/2 sm:-ml-[7px] top-1.5 w-[15px] h-[15px] rounded-full flex-shrink-0"
                  style={{ background: "var(--bg)", border: "2px solid var(--accent)" }}
                />

                <div className="hidden sm:block sm:w-1/2" />

                <div
                  className="ml-8 sm:ml-0 sm:w-1/2 rounded-xl p-7"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <h3 className="text-xl font-semibold mb-1" style={{ color: "var(--text)" }}>
                    {exp.title}
                  </h3>
                  <p className="font-mono text-sm mb-3" style={{ color: "var(--accent)" }}>
                    {exp.company}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-4 text-xs font-mono" style={{ color: "var(--text-faint)" }}>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} /> {exp.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Building2 size={13} /> {exp.location}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {(exp.description || []).map((item: string, i: number) => (
                      <li key={i} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        <span className="mt-2 h-1 w-1 rounded-full flex-shrink-0" style={{ background: "var(--border-strong)" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
