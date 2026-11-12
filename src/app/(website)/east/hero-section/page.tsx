"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  MapPin,
  Network,
  Sparkles,
} from "lucide-react";

const expertise = [
  "AI for cybersecurity",
  "Adaptive intrusion detection",
  "Federated learning",
  "Full-stack engineering",
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <>
      <section
        id="home"
        className="hero-section relative isolate min-h-[min(900px,100svh)] overflow-hidden px-6 pb-16 pt-28 sm:px-8 sm:pt-32"
        style={{ background: "var(--bg)" }}
      >
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />

        <div className="mx-auto grid min-h-[min(700px,calc(100svh-8rem))] max-w-7xl items-center gap-12 lg:grid-cols-[1.13fr_0.87fr] lg:gap-4">
          <div className="relative z-10 max-w-3xl">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] sm:text-xs"
              style={{
                color: "var(--accent-strong)",
                borderColor: "var(--border-strong)",
                background: "var(--surface)",
              }}
            >
              <span className="live-dot" />
              PhD researcher · Computer Science
            </motion.div>

            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
              className="max-w-4xl font-display text-[clamp(3.35rem,8vw,7.4rem)] font-medium leading-[0.91] tracking-[-0.075em]"
              style={{ color: "var(--text)" }}
            >
              Making
              <br />
              <span className="hero-title-accent">intelligence</span>
              <br />
              work for a
              <br />
              safer world<span style={{ color: "var(--accent)" }}>.</span>
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: "easeOut" }}
              className="mt-7 max-w-xl text-base leading-7 sm:text-lg sm:leading-8"
              style={{ color: "var(--text-muted)" }}
            >
              I&apos;m Raju Molla, a PhD researcher in Computer Science at Keele
              University. I work at the intersection of AI, cybersecurity, and
              software engineering—turning complex research into systems people
              can rely on.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.36, ease: "easeOut" }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#research"
                className="hero-primary-link inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Explore my research <ArrowRight size={16} />
              </a>
              <a
                href="/Raju_Molla_Update_Resume.pdf"
                download
                className="hero-secondary-link inline-flex items-center gap-2 rounded-full border px-5 py-3.5 text-sm font-medium"
              >
                <Download size={15} /> Download CV
              </a>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-xs"
              style={{ color: "var(--text-faint)" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} /> London, United Kingdom
              </span>
              <span className="hidden h-1 w-1 rounded-full sm:block" style={{ background: "var(--border-strong)" }} />
              <a
                className="hero-social-link inline-flex items-center gap-1.5"
                href="https://github.com/raju-molla"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={14} /> GitHub <ArrowUpRight size={11} />
              </a>
              <a
                className="hero-social-link inline-flex items-center gap-1.5"
                href="https://www.linkedin.com/in/raju-molla-7574bb193/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={14} /> LinkedIn <ArrowUpRight size={11} />
              </a>
              <a
                className="hero-social-link inline-flex items-center gap-1.5"
                href="https://scholar.google.co.uk/citations?user=dXT2AXIAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GraduationCap size={14} /> Google Scholar <ArrowUpRight size={11} />
              </a>
              <a
                className="hero-social-link inline-flex items-center gap-1.5"
                href="https://www.researchgate.net/profile/Raju-Molla-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Network size={14} /> ResearchGate <ArrowUpRight size={11} />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="hero-portrait-scene relative mx-auto mt-3 aspect-square w-full max-w-[500px] lg:ml-auto lg:mt-0"
          >
            <div className="hero-orbit hero-orbit-outer" aria-hidden="true" />
            <div className="hero-orbit hero-orbit-inner" aria-hidden="true" />
            <div className="hero-orbit-dot" aria-hidden="true" />

            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, -9, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="hero-portrait-frame absolute inset-[13%] overflow-hidden rounded-[48%_48%_44%_44%] border"
            >
              <div className="hero-portrait-backdrop absolute inset-0" />
              <Image
                src="/raju_molla_img.jpg"
                alt="Portrait of Raju Molla"
                fill
                priority
                sizes="(max-width: 768px) 75vw, 440px"
                className="hero-portrait-image object-cover"
              />
              <div className="hero-portrait-shade absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-7">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/75">
                  Research · Build · Repeat
                </span>
                <Sparkles size={17} className="text-[var(--accent)]" />
              </div>
            </motion.div>

            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, 7, 0], rotate: [0, -1.5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="hero-float-card hero-float-card-top absolute right-0 top-[16%] rounded-2xl border p-4 sm:right-[-2%] sm:p-5"
            >
              <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--text-faint)" }}>
                Currently
              </span>
              <span className="block font-display text-lg font-medium" style={{ color: "var(--text)" }}>
                Keele University
              </span>
              <span className="mt-1 block text-xs" style={{ color: "var(--text-muted)" }}>
                PhD · Computer Science
              </span>
            </motion.div>

            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, -7, 0], rotate: [0, 1.5, 0] }}
              transition={{ duration: 5.5, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
              className="hero-float-card hero-float-card-bottom absolute bottom-[13%] left-0 flex items-center gap-3 rounded-2xl border p-4 sm:left-[-3%] sm:p-5"
            >
              <span className="hero-stat-icon flex h-10 w-10 items-center justify-center rounded-full">
                <Sparkles size={17} />
              </span>
              <span>
                <span className="block font-display text-xl font-semibold" style={{ color: "var(--text)" }}>
                  Top 3%
                </span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: "var(--text-faint)" }}>
                  TryHackMe · Global
                </span>
              </span>
            </motion.div>

            <span className="hero-scene-index absolute bottom-[4%] right-[8%] font-mono text-[10px] tracking-[0.2em]" style={{ color: "var(--text-faint)" }}>
              RM / 01
            </span>
          </motion.div>
        </div>

        <a
          href="#about"
          className="hero-scroll-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] sm:flex"
          style={{ color: "var(--text-faint)" }}
        >
          Scroll to explore <ArrowDown size={12} />
        </a>
      </section>

      <div className="expertise-marquee overflow-hidden border-y py-4" aria-label="Areas of expertise">
        <div className="expertise-marquee-track flex w-max items-center gap-8 whitespace-nowrap">
          {[0, 1].map((repeat) => (
            <div
              key={repeat}
              className="flex items-center gap-8"
              aria-hidden={repeat === 1}
            >
              {expertise.map((item) => (
                <span
                  key={`${repeat}-${item}`}
                  className="inline-flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.2em] sm:text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item}
                  <span className="text-base" style={{ color: "var(--accent)" }}>✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
