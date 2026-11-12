"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Database,
  Download,
  GraduationCap,
  Mail,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const publications = [
  {
    title: "Hybrid Intrusion Detection System for IoT and Cloud Environments",
    status: "Preprint · Research Square",
    href: "https://doi.org/10.21203/rs.3.rs-10144004/v1",
    note: "DOI: 10.21203/rs.3.rs-10144004/v1",
  },
  {
    title:
      "Beyond Permissions: Multi-Layer Monitoring and Forensic Behaviour Graph Analysis for Detecting Hidden and Collusive Chrome Extensions",
    status: "Preprint · SSRN",
    href: "https://ssrn.com/abstract=6906046",
    note: "SSRN: 6906046",
  },
  {
    title:
      "IoT-CloudSec: A Multi-Protocol, Multi-Context Simulation Benchmark for Leakage-Aware IoT Intrusion Detection Evaluation",
    status: "Under revision · IEEE Access",
    href: null,
    note: "Research benchmark",
  },
];

const projects = [
  {
    index: "01",
    category: "Research · 2025—Present",
    name: "IoT-CloudSec",
    summary:
      "A hybrid intrusion detection framework and multi-context benchmark for IoT, edge and cloud security, combining anomaly-aware modelling with explainability and temporal evaluation.",
    tools: ["Python", "Scikit-learn", "TensorFlow", "SHAP"],
    href: "https://ieee-dataport.org/documents/iot-cloud-sec",
    link: "Explore the dataset",
    articleHref: null,
    icon: Database,
    tone: "lime",
  },
  {
    index: "02",
    category: "Distributed platform · 2024—2025",
    name: "UMIS-v2",
    summary:
      "Scalable backend services, secure APIs and transaction-processing workflows for a multi-country microfinance platform serving communities across East Africa.",
    tools: ["ASP.NET", "Razor Pages", "SQL Server"],
    href: "https://microfin.grapestl.com/",
    link: "View platform",
    articleHref: null,
    icon: Network,
    tone: "coral",
  },
  {
    index: "03",
    category: "Backend engineering · 2024",
    name: "Secure Healthcare APIs",
    summary:
      "Privacy-focused REST APIs for healthcare data, with authentication, authorization and secure patient-information workflows.",
    tools: ["Node.js", "Express.js", "MongoDB"],
    href: null,
    link: null,
    articleHref: null,
    icon: ShieldCheck,
    tone: "blue",
  },
];

const experience = [
  {
    role: "Software Engineer",
    company: "Qtec Solution Limited",
    date: "May 2024 — Jun 2025",
    location: "Dhaka, Bangladesh",
    details: [
      "Built secure backend systems for financial and healthcare applications.",
      "Developed distributed services and APIs, prioritising data integrity and reliability.",
      "Worked with international teams on multi-region deployments.",
    ],
  },
  {
    role: "Software Developer",
    company: "Bimafy Limited",
    date: "Dec 2023 — Apr 2024",
    location: "Dhaka, Bangladesh",
    details: [
      "Developed cross-platform mobile applications with cloud services and OCR.",
      "Integrated secure APIs and real-time application features.",
    ],
  },
  {
    role: "Backend Engineer Intern",
    company: "Bangla Institute",
    date: "Mar 2023 — Jul 2023",
    location: "Remote",
    details: [
      "Built Node.js and Express.js backend services and secure authentication.",
      "Designed scalable data models and improved database performance.",
    ],
  },
];

const skills = [
  {
    label: "Cybersecurity",
    icon: ShieldCheck,
    items: ["Intrusion detection", "Network security", "Cloud & IoT", "Digital forensics", "Browser security"],
  },
  {
    label: "Machine learning",
    icon: Sparkles,
    items: ["Random Forest", "XGBoost", "LSTM", "Anomaly detection", "Explainable AI · SHAP"],
  },
  {
    label: "Engineering",
    icon: Code2,
    items: ["Python", "TypeScript", "Node.js", "React & Next.js", "ASP.NET", "SQL & MongoDB"],
  },
];

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      className="mb-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] sm:text-xs"
      style={{ color: "var(--accent)" }}
    >
      <span className="h-px w-6" style={{ background: "var(--accent)" }} />
      {children}
    </p>
  );
}

type FeaturedProject = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
};

function FeaturedProjectCards() {
  const [projects, setProjects] = useState<FeaturedProject[]>([]);

  useEffect(() => {
    fetch("/api/opensource?status=published&featured=true&limit=4")
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load featured projects (${response.status})`);
        return response.json();
      })
      .then((data) => setProjects(data.projects || []))
      .catch((error) => console.error("Failed to load featured projects:", error));
  }, []);

  if (projects.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.18em]" style={{ color: "var(--text-faint)" }}>
        Featured projects and resources
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project._id}
            className="rounded-3xl border p-6 sm:p-8"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <Link
              href={`/east/open-source/${project.slug}`}
              className="font-display text-2xl font-medium"
              style={{ color: "var(--text)" }}
            >
              {project.title}
            </Link>
            <p className="mt-3 text-sm leading-6" style={{ color: "var(--text-muted)" }}>
              {project.description}
            </p>
            {project.techStack?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border px-2.5 py-1 font-mono text-[9px]"
                    style={{ borderColor: "var(--border-strong)", color: "var(--text-faint)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-xs font-medium"
                style={{ color: "var(--accent)" }}
              >
                Visit project <ArrowUpRight size={14} />
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioSections() {
  return (
    <>
      <section
        id="about"
        className="scroll-mt-20 px-6 py-24 sm:px-8 sm:py-32"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <Reveal>
            <Eyebrow>01 / About</Eyebrow>
            <h2
              className="max-w-xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.05em] sm:text-6xl"
              style={{ color: "var(--text)" }}
            >
              Curious about what happens{" "}
              <span className="hero-title-accent">beneath the surface.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-lg leading-8" style={{ color: "var(--text-muted)" }}>
              I&apos;m a PhD researcher in Computer Science at Keele University,
              working across AI for cybersecurity, adaptive intrusion detection,
              explainable and federated learning, and trustworthy machine
              learning.
            </p>
            <p className="mt-5 text-base leading-7" style={{ color: "var(--text-faint)" }}>
              Before starting my PhD, I completed an MSc in Cybersecurity and
              Digital Forensics with Distinction and built software for finance,
              healthcare and mobile products. That engineering experience keeps
              my research grounded in systems people actually use.
            </p>

            <div className="mt-9 grid grid-cols-3 gap-3">
              {[
                { value: "PhD", label: "Computer Science" },
                { value: "MSc", label: "Distinction" },
                { value: "130+", label: "Security labs" },
              ].map((stat) => (
                <div
                  key={stat.value}
                  className="rounded-2xl border p-4 sm:p-5"
                  style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                >
                  <p className="font-display text-2xl font-medium sm:text-3xl" style={{ color: "var(--accent)" }}>
                    {stat.value}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase leading-4 tracking-[0.12em] sm:text-[10px]" style={{ color: "var(--text-faint)" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="research"
        className="scroll-mt-20 px-6 py-24 sm:px-8 sm:py-32"
        style={{ background: "var(--bg)" }}
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <Eyebrow>02 / Research</Eyebrow>
            <h2
              className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.05em] sm:text-6xl"
              style={{ color: "var(--text)" }}
            >
              Threats evolve.
              <br />
              <span className="hero-title-accent">Defences should too.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7" style={{ color: "var(--text-muted)" }}>
              I explore how intelligent, explainable and privacy-aware systems can
              help protect connected environments as threats and data change.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Database,
                title: "See the whole system",
                text: "Multi-context security research across IoT telemetry, edge metrics and cloud infrastructure.",
              },
              {
                icon: Sparkles,
                title: "Make AI explainable",
                text: "SHAP-based analysis and temporal evaluation to make detection behaviour easier to inspect.",
              },
              {
                icon: ShieldCheck,
                title: "Keep privacy in view",
                text: "Federated and privacy-preserving learning for cyber defence across distributed environments.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.08}>
                  <article
                    className="h-full rounded-2xl border p-6 sm:p-7"
                    style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                  >
                    <span className="mb-7 inline-flex h-11 w-11 items-center justify-center rounded-full" style={{ color: "var(--accent)", background: "var(--accent-soft)" }}>
                      <Icon size={20} />
                    </span>
                    <h3 className="font-display text-xl font-medium" style={{ color: "var(--text)" }}>{item.title}</h3>
                    <p className="mt-3 text-sm leading-6" style={{ color: "var(--text-muted)" }}>{item.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-16">
            <div className="mb-5 flex items-center gap-3">
              <BookOpen size={16} style={{ color: "var(--signal)" }} />
              <h3 className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: "var(--text-faint)" }}>
                Selected publications
              </h3>
            </div>
            <div className="divide-y" style={{ borderColor: "var(--border)" }}>
              {publications.map((publication, index) => (
                <article
                  key={publication.title}
                  className="grid gap-3 py-5 sm:grid-cols-[56px_1fr_auto] sm:items-center sm:gap-6"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
                    0{index + 1}
                  </span>
                  <div>
                    <h4 className="max-w-3xl text-sm font-medium leading-6 sm:text-base" style={{ color: "var(--text)" }}>
                      {publication.title}
                    </h4>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: "var(--text-faint)" }}>
                      {publication.status}
                    </p>
                  </div>
                  {publication.href ? (
                    <a
                      href={publication.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs transition-colors hover:text-[var(--accent-strong)]"
                      style={{ color: "var(--accent)" }}
                    >
                      {publication.note} <ArrowUpRight size={13} />
                    </a>
                  ) : (
                    <span className="font-mono text-[10px]" style={{ color: "var(--text-faint)" }}>{publication.note}</span>
                  )}
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="projects"
        className="scroll-mt-20 px-6 py-24 sm:px-8 sm:py-32"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>03 / Selected work</Eyebrow>
              <h2 className="font-display text-4xl font-medium tracking-[-0.05em] sm:text-6xl" style={{ color: "var(--text)" }}>
                From ideas to impact.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6" style={{ color: "var(--text-faint)" }}>
              Research, infrastructure and secure products—built to solve
              meaningful problems.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <Reveal key={project.name} delay={index * 0.08}>
                  <article className={`project-card project-card-${project.tone} group relative flex h-full min-h-[410px] flex-col overflow-hidden rounded-3xl border p-6 sm:p-8`}>
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-xs tracking-[0.16em]" style={{ color: "var(--text-faint)" }}>
                        {project.index}
                      </span>
                      <span className="project-icon flex h-12 w-12 items-center justify-center rounded-full border">
                        <Icon size={21} />
                      </span>
                    </div>
                    <div className="mt-auto">
                      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.17em]" style={{ color: "var(--accent)" }}>
                        {project.category}
                      </p>
                      <h3 className="font-display text-3xl font-medium tracking-[-0.04em]" style={{ color: "var(--text)" }}>
                        {project.name}
                      </h3>
                      <p className="mt-4 text-sm leading-6" style={{ color: "var(--text-muted)" }}>
                        {project.summary}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <span key={tool} className="rounded-full border px-2.5 py-1 font-mono text-[9px]" style={{ borderColor: "var(--border-strong)", color: "var(--text-faint)" }}>
                            {tool}
                          </span>
                        ))}
                      </div>
                      {project.href && project.link && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex items-center gap-2 text-xs font-medium"
                          style={{ color: "var(--accent)" }}
                        >
                          {project.link} <ArrowUpRight size={14} />
                        </a>
                      )}
                      {project.articleHref && (
                        <Link
                          href={project.articleHref}
                          className="mt-3 inline-flex items-center gap-2 text-xs font-medium"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Read the project story <ArrowRight size={13} />
                        </Link>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <FeaturedProjectCards />
        </div>
      </section>

      <section
        id="experience"
        className="scroll-mt-20 px-6 py-24 sm:px-8 sm:py-32"
        style={{ background: "var(--bg)" }}
      >
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <Reveal>
            <Eyebrow>04 / Experience</Eyebrow>
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.05em] sm:text-6xl" style={{ color: "var(--text)" }}>
              Built in the real world.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7" style={{ color: "var(--text-muted)" }}>
              A foundation in software engineering informs how I approach
              research: with practical constraints, people and deployment in
              mind.
            </p>
            <a
              href="/Raju_Molla_Update_Resume.pdf"
              download
              className="hero-secondary-link mt-7 inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium"
            >
              <Download size={15} /> Full experience in my CV
            </a>
          </Reveal>

          <div className="relative">
            <div className="absolute bottom-8 left-[5px] top-3 w-px" style={{ background: "var(--border-strong)" }} />
            <div className="space-y-8">
              {experience.map((job, index) => (
                <Reveal key={job.company} delay={index * 0.08} className="relative pl-8 sm:pl-10">
                  <span className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2" style={{ borderColor: "var(--accent)", background: "var(--bg)" }} />
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="font-display text-xl font-medium" style={{ color: "var(--text)" }}>{job.role}</h3>
                      <p className="mt-1 text-sm" style={{ color: "var(--accent)" }}>{job.company}</p>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: "var(--text-faint)" }}>{job.date}</span>
                  </div>
                  <p className="mt-2 font-mono text-[10px]" style={{ color: "var(--text-faint)" }}>{job.location}</p>
                  <ul className="mt-4 space-y-2">
                    {job.details.map((detail) => (
                      <li key={detail} className="flex gap-3 text-sm leading-6" style={{ color: "var(--text-muted)" }}>
                        <span className="mt-[9px] h-1 w-1 flex-none rounded-full" style={{ background: "var(--accent)" }} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="education"
        className="scroll-mt-20 px-6 py-24 sm:px-8 sm:py-28"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow>05 / Education</Eyebrow>
            <h2 className="font-display text-4xl font-medium tracking-[-0.05em] sm:text-5xl" style={{ color: "var(--text)" }}>
              A foundation for what&apos;s next.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                degree: "PhD · Computer Science",
                school: "Keele University",
                date: "Nov 2026 — Present",
                location: "Keele, United Kingdom",
                icon: GraduationCap,
              },
              {
                degree: "MSc · Cybersecurity & Digital Forensics",
                school: "University of Wales Trinity Saint David",
                date: "Jun 2025 — Jun 2026",
                location: "Distinction · London, United Kingdom",
                icon: BookOpen,
              },
              {
                degree: "BSc · Computer Science & Engineering",
                school: "Eastern University",
                date: "Oct 2018 — Feb 2023",
                location: "GPA 3.74 / 4.00 · Dhaka, Bangladesh",
                icon: Code2,
              },
            ].map((education, index) => {
              const Icon = education.icon;
              return (
                <Reveal key={education.school} delay={index * 0.08}>
                  <article className="h-full rounded-2xl border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                    <Icon size={20} style={{ color: "var(--accent)" }} />
                    <p className="mt-7 font-mono text-[9px] uppercase tracking-[0.13em]" style={{ color: "var(--text-faint)" }}>{education.date}</p>
                    <h3 className="mt-2 font-display text-xl font-medium leading-snug" style={{ color: "var(--text)" }}>{education.degree}</h3>
                    <p className="mt-3 text-sm" style={{ color: "var(--accent)" }}>{education.school}</p>
                    <p className="mt-2 text-xs leading-5" style={{ color: "var(--text-faint)" }}>{education.location}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="scroll-mt-20 px-6 py-24 sm:px-8 sm:py-28"
        style={{ background: "var(--bg)" }}
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow>06 / Toolkit</Eyebrow>
            <h2 className="font-display text-4xl font-medium tracking-[-0.05em] sm:text-5xl" style={{ color: "var(--text)" }}>
              Tools for the hard problems.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {skills.map((group, index) => {
              const Icon = group.icon;
              return (
                <Reveal key={group.label} delay={index * 0.08}>
                  <article className="h-full rounded-2xl border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                    <div className="flex items-center gap-3">
                      <Icon size={18} style={{ color: "var(--accent)" }} />
                      <h3 className="font-display text-lg font-medium" style={{ color: "var(--text)" }}>{group.label}</h3>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <span key={skill} className="rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-20 px-6 py-20 sm:px-8 sm:py-28"
        style={{ background: "var(--bg-elevated)" }}
      >
        <Reveal className="mx-auto max-w-7xl">
          <div className="contact-banner relative overflow-hidden rounded-[2rem] border p-8 sm:p-14 lg:p-16">
            <span className="contact-orbit" aria-hidden="true" />
            <div className="relative z-10 max-w-3xl">
              <Eyebrow>07 / Get in touch</Eyebrow>
              <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.05em] sm:text-6xl" style={{ color: "var(--text)" }}>
                Good ideas get better when they&apos;re shared.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7" style={{ color: "var(--text-muted)" }}>
                Interested in cybersecurity research, collaboration or building
                something useful? I&apos;d love to hear from you.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:rajumolla.tech@gmail.com"
                  className="hero-primary-link inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  <Mail size={15} /> Say hello <ArrowRight size={15} />
                </a>
                <a
                  href="https://www.linkedin.com/in/raju-molla-7574bb193/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-secondary-link inline-flex items-center gap-2 rounded-full border px-5 py-3.5 text-sm font-medium"
                >
                  Connect on LinkedIn <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
            <BriefcaseBusiness className="contact-watermark absolute -bottom-12 -right-6 h-56 w-56" aria-hidden="true" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
