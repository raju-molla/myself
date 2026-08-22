"use client";
import { motion } from "framer-motion";
import { Trophy, Target, Award, Code2 } from "lucide-react";
import SectionHeading from "./SectionHeading";

const stats = [
  { icon: Target, value: "Top 3%", label: "TryHackMe, Global" },
  { icon: Code2, value: "130+", label: "Offensive & defensive security labs" },
  { icon: Trophy, value: "ICPC 2023", label: "Dhaka Regional participant" },
  { icon: Award, value: "37th & 38th", label: "Eastern University contests — Champion" },
];

const contests = [
  "ICPC Dhaka Regional Contest 2023",
  "CEFALO SUST Inter-University Contest 2023",
  "EU 38th Intra-Faculty Contest (2022) — Champion",
  "EU 37th Intra-Faculty Contest (2022) — Champion",
  "BUET Inter-University Programming Contest 2022",
  "EU 36th Intra-Faculty Contest (2022) — 1st Runner-up",
  "ICPC Preliminary Contest 2021",
  "EU 34th Intra Contest (2021) — 6th Place",
  "EU 33rd Intra Contest (2021) — 7th Place",
  "Varendra Univ. Inter Contest (2019) — 36th Place",
  "EU Intra Contest (2019) — 9th Place",
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6" style={{ background: "var(--bg-elevated)" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="achievements" title="Achievements & Competitive Programming" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">
          {stats.map(({ icon: Icon, value, label }, i) => (
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
                {value}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-faint)" }}>{label}</p>
            </motion.div>
          ))}
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
            {contests.map((c, i) => (
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
