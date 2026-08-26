"use client";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useSiteContent } from "@/libs/useSiteContent";
import { SITE_CONTENT_DEFAULTS } from "@/libs/siteContentDefaults";

export default function Skills() {
  const { data: skills } = useSiteContent("skills", SITE_CONTENT_DEFAULTS.skills);
  const categories = skills.categories || [];

  return (
    <section id="skills" className="py-24 px-6" style={{ background: "var(--bg-elevated)" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="skills" title="Skills & Technologies" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {categories.map((category: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
              className="rounded-xl p-6"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <h3
                className="font-mono text-xs uppercase tracking-[0.15em] mb-4"
                style={{ color: "var(--accent)" }}
              >
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(category.items || []).map((item: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-sm px-3 py-1.5 rounded-md"
                    style={{
                      background: "var(--surface-2)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
