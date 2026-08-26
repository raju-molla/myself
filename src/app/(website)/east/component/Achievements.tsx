"use client";
import { motion } from "framer-motion";
import { Trophy, Target, Award, Code2, type LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useSiteContent } from "@/libs/useSiteContent";
import { SITE_CONTENT_DEFAULTS } from "@/libs/siteContentDefaults";

const ICON_MAP: Record<string, LucideIcon> = {
  target: Target,
  code: Code2,
  trophy: Trophy,
  award: Award,
};

export default function Achievements() {
  const { data: achievements } = useSiteContent("achievements", SITE_CONTENT_DEFAULTS.achievements);
  const stats = achievements.stats || [];
  const contests = achievements.contests || [];

  return (
    <section id="achievements" className="py-24 px-6" style={{ background: "var(--bg-elevated)" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="achievements" title="Achievements & Competitive Programming" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">
          {stats.map((stat: any, i: number) => {
            const Icon = ICON_MAP[stat.icon] || Trophy;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl p-6 text-center"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <Icon size={20} style={{ color: "var(--accent)" }} className="mx-auto mb-3" />
                <p className="font-display text-2xl font-semibold" style={{ color: "var(--text)" }}>
                  {stat.value}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--text-faint)" }}>{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 rounded-xl p-8"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <h3 className="font-display text-xl font-semibold mb-5" style={{ color: "var(--text)" }}>
            Competitive Programming Record
          </h3>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {contests.map((c: string, i: number) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                <span className="mt-2 h-1 w-1 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                {c}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
