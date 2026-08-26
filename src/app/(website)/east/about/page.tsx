"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, BadgeCheck } from "lucide-react";
import SectionHeading from "../component/SectionHeading";
import { useSiteContent } from "@/libs/useSiteContent";
import { SITE_CONTENT_DEFAULTS } from "@/libs/siteContentDefaults";

export default function About() {
  const { data: about } = useSiteContent("about", SITE_CONTENT_DEFAULTS.about);
  const education = about.education || [];
  const keySkills = about.keySkills || [];
  const paragraphs = about.paragraphs || [];

  return (
    <section
      id="about"
      className="w-full py-24 px-6"
      style={{ background: "var(--bg-elevated)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[0.85fr_1.3fr] gap-16 items-start">
          {/* Image + education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div
              className="relative w-full max-w-xs mx-auto md:mx-0 aspect-square rounded-2xl overflow-hidden mb-10"
              style={{ border: "1px solid var(--border-strong)" }}
            >
              <Image
                src={about.photo || "/molla.png"}
                alt="Raju Molla"
                fill
                sizes="(max-width: 768px) 320px, 400px"
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-6">
              {education.map((ed: any, i: number) => (
                <div
                  key={i}
                  className="rounded-xl p-5"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <GraduationCap size={20} style={{ color: "var(--accent)" }} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold" style={{ color: "var(--text)" }}>{ed.school}</p>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{ed.degree}</p>
                    </div>
                  </div>
                  <p className="font-mono text-xs mb-2" style={{ color: "var(--text-faint)" }}>
                    {ed.date} · {ed.location}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {ed.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Text content */}
          <div>
            <SectionHeading eyebrow="about" title={about.heading || "A little about me"} align="left" />

            {paragraphs.map((p: string, i: number) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="mt-8 mb-5 leading-relaxed text-lg"
                style={{ color: "var(--text-muted)" }}
              >
                {p}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <h3
                className="font-display text-xl font-semibold mb-4"
                style={{ color: "var(--text)" }}
              >
                Key skills
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {keySkills.map((skill: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                    <BadgeCheck size={16} style={{ color: "var(--accent)" }} className="mt-0.5 flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
