"use client";
import { motion } from "framer-motion";
import { FileText, ExternalLink, Database } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useSiteContent } from "@/libs/useSiteContent";
import { SITE_CONTENT_DEFAULTS } from "@/libs/siteContentDefaults";

export default function Research() {
  const { data: research } = useSiteContent("research", SITE_CONTENT_DEFAULTS.research);
  const interests = research.interests || [];
  const current = research.current || {};
  const highlights = current.highlights || [];
  const publications = research.publications || [];

  return (
    <section id="research" className="w-full py-24 px-6" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="research" title="Research & Publications" />

        {/* Research interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex flex-wrap justify-center gap-2.5"
        >
          {interests.map((tag: string) => (
            <span
              key={tag}
              className="font-mono text-xs px-3 py-1.5 rounded-full"
              style={{ border: "1px solid var(--border-strong)", color: "var(--text-muted)" }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 mt-16">
          {/* Current research */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Database size={18} style={{ color: "var(--accent)" }} />
              <h3 className="font-display text-xl font-semibold" style={{ color: "var(--text)" }}>
                {current.title}
              </h3>
            </div>
            <p className="font-mono text-xs mb-6" style={{ color: "var(--text-faint)" }}>
              {current.meta}
            </p>
            <ul className="space-y-4">
              {highlights.map((h: string, i: number) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  <span className="mt-2 h-1 w-1 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                  {h}
                </li>
              ))}
            </ul>
            {current.datasetUrl && (
              <a
                href={current.datasetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-6 font-mono text-sm transition-colors hover:underline"
                style={{ color: "var(--accent)" }}
              >
                {current.datasetLabel} <ExternalLink size={14} />
              </a>
            )}
          </motion.div>

          {/* Publications */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="font-display text-xl font-semibold mb-6" style={{ color: "var(--text)" }}>
              Publications
            </h3>
            <div className="space-y-4">
              {publications.map((pub: any, i: number) => (
                <div
                  key={i}
                  className="rounded-xl p-6"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <div className="flex items-start gap-3">
                    <FileText size={18} style={{ color: "var(--signal)" }} className="mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium leading-snug mb-1.5" style={{ color: "var(--text)" }}>
                        {pub.title}
                      </p>
                      <p className="font-mono text-xs mb-1" style={{ color: "var(--text-faint)" }}>
                        {pub.status}
                      </p>
                      {pub.href ? (
                        <a
                          href={pub.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-xs transition-colors hover:underline"
                          style={{ color: "var(--accent)" }}
                        >
                          {pub.meta} <ExternalLink size={12} />
                        </a>
                      ) : (
                        pub.meta && (
                          <p className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>
                            {pub.meta}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
