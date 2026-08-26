"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import SectionHeading from "../component/SectionHeading";
import { useSiteContent } from "@/libs/useSiteContent";
import { SITE_CONTENT_DEFAULTS } from "@/libs/siteContentDefaults";

export default function Projects() {
  const { data: projects } = useSiteContent("projects", SITE_CONTENT_DEFAULTS.projects);
  const projectsData = projects.items || [];

  return (
    <section id="projects" className="py-24 px-6" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="projects" title="Selected Work" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {projectsData.map((project: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="relative h-44 overflow-hidden group flex-shrink-0" style={{ background: "var(--surface-2)" }}>
                {project.image ? (
                  <>
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--surface), transparent 60%)" }} />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--text-faint)" }}>
                      {project.type}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="font-mono text-[11px] uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
                  {project.type}
                </p>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
                  {project.name}
                </h3>
                <p className="text-sm mb-4 flex-1" style={{ color: "var(--text-muted)" }}>
                  {project.description}
                </p>
                <p className="mb-5 flex flex-wrap gap-2">
                  {(project.stack || "").split(",").map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ background: "var(--surface-2)", color: "var(--text-faint)", border: "1px solid var(--border)" }}
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </p>
                <div className="flex gap-4 mt-auto pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                  {project.github && (
                    <Link href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)" }}>
                      <FaGithub size={18} />
                    </Link>
                  )}
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium mt-1"
                      style={{ color: "var(--accent)" }}
                    >
                      Visit <FaExternalLinkAlt size={12} />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
