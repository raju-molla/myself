"use client";
import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={align === "center" ? "text-center" : "text-left"}
    >
      <p
        className="font-mono text-sm tracking-[0.25em] uppercase mb-3"
        style={{ color: "var(--accent)" }}
      >
        <span className="opacity-70">&gt;</span> {eyebrow}
      </p>
      <h2
        className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold"
        style={{ color: light ? "#ffffff" : "var(--text)" }}
      >
        {title}
      </h2>
      <div
        className={`h-px w-16 mt-6 ${align === "center" ? "mx-auto" : ""}`}
        style={{ background: "var(--border-strong)" }}
      />
    </motion.div>
  );
}
