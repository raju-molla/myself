"use client";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const skillsData = [
  {
    category: "Cybersecurity",
    items: [
      "Intrusion Detection Systems",
      "Network Security",
      "Cloud & IoT Security",
      "Threat Detection & Analysis",
      "Digital Forensics",
      "OWASP Top 10",
    ],
  },
  {
    category: "Machine Learning & AI",
    items: [
      "Random Forest",
      "XGBoost",
      "LightGBM",
      "LSTM Autoencoders",
      "Anomaly Detection",
      "Explainable AI (SHAP)",
      "Feature Engineering",
    ],
  },
  {
    category: "Security Tooling",
    items: ["Kali Linux", "Burp Suite", "Nmap", "Metasploit", "SQLMap", "FTK Imager"],
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "React Native", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend & Languages",
    items: ["Node.js", "Express.js", "ASP.NET", "Python", "TypeScript", "C / C++ / C#"],
  },
  {
    category: "Data & Infrastructure",
    items: ["MongoDB", "SQL Server", "MySQL", "Docker", "Git", "Google Cloud"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6" style={{ background: "var(--bg-elevated)" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="skills" title="Skills & Technologies" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {skillsData.map((category, index) => (
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
                {category.items.map((item, idx) => (
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
