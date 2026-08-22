"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import SectionHeading from "../component/SectionHeading";

const projectsData = [
  {
    type: "Research",
    name: "IoT-CloudSec Research Framework",
    description:
      "Hybrid intrusion detection framework combining supervised learning with anomaly-aware sequence modelling, plus SHAP-based explainability and robustness evaluation.",
    stack: "Python, Scikit-learn, TensorFlow, SHAP",
    link: "https://ieee-dataport.org/documents/iot-cloud-sec",
    github: null,
    image: null,
  },
  {
    type: "Web Application",
    name: "UMIS-v2 (Microfinance)",
    description: "Distributed microfinance platform deployed across four countries.",
    stack: "ASP.NET, SQL Server, React.js",
    link: "https://microfin.grapestl.com/",
    github: null,
    image: "/UMIS_v2.png",
  },
  {
    type: "Web Application",
    name: "UMIS — Uganda / Kenya / Zambia / Tanzania",
    description: "Country-specific microfinance deployments serving East African markets.",
    stack: "ASP.NET, Razor Pages, SQL Server, Ajax",
    link: "https://mfug.umoja-international.com/",
    github: null,
    image: "/UMIS.png",
  },
  {
    type: "Web Application",
    name: "JG Healthcare",
    description: "Web platform for healthcare services and patient workflows.",
    stack: "Next.js, Express.js, MongoDB, Bootstrap",
    link: "https://jghealthcare.com/",
    github: null,
    image: "/jg1.png",
  },
  {
    type: "Web Application",
    name: "Visabee",
    description: "Web platform for insurance solutions.",
    stack: "Next.js, Express.js, MongoDB, Bootstrap",
    link: "https://visabee.com.bd/",
    github: null,
    image: "/visabee.png",
  },
  {
    type: "Backend / API",
    name: "Secure Healthcare API System",
    description:
      "Secure RESTful APIs for healthcare data management, with authentication, authorization and protected patient-information workflows.",
    stack: "Node.js, Express.js, MongoDB",
    link: null,
    github: null,
    image: null,
  },
  {
    type: "Mobile App (Android / iOS)",
    name: "Bimafy",
    description: "Mobile app to manage insurance claims, live on Google Play and the App Store.",
    stack: "React Native (Expo), Zustand, React Query",
    link: "https://play.google.com/store/apps/details?id=com.bimafy&hl=en_US",
    github: null,
    image: "/bima.png",
  },
  {
    type: "Mobile App (Android)",
    name: "Bangla Institute",
    description: "Android app for Bangla Institute's mobile services.",
    stack: "Node.js, Express.js, MongoDB",
    link: "https://play.google.com/store/apps/details?id=com.mobile_bangla_institute&hl=en_US",
    github: null,
    image: "/bangla.jpeg",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="projects" title="Selected Work" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {projectsData.map((project, index) => (
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
                  {project.stack.split(",").map((tech, i) => (
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
