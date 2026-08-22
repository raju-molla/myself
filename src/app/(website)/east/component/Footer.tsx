"use client";
import React from "react";
import { Facebook, Linkedin, Github, TerminalSquare } from "lucide-react";
import { SiCodechef, SiCodeforces, SiHackerrank, SiHackerearth, SiStopstalk } from "react-icons/si";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }} className="pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
        {/* About */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <TerminalSquare size={18} style={{ color: "var(--accent)" }} />
            <span className="font-display text-lg font-semibold" style={{ color: "var(--text)" }}>
              Raju Molla
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-faint)" }}>
            AI-for-cybersecurity researcher and full-stack engineer, based in London, UK.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h3 className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
            Navigate
          </h3>
          <button onClick={() => scrollToSection("research")} className="text-left text-sm transition-colors" style={{ color: "var(--text-faint)" }}>
            Research
          </button>
          <button onClick={() => scrollToSection("projects")} className="text-left text-sm transition-colors" style={{ color: "var(--text-faint)" }}>
            Projects
          </button>
          <button onClick={() => scrollToSection("about")} className="text-left text-sm transition-colors" style={{ color: "var(--text-faint)" }}>
            About
          </button>
          <button onClick={() => scrollToSection("contact")} className="text-left text-sm transition-colors" style={{ color: "var(--text-faint)" }}>
            Contact
          </button>
          <a href="/Raju_Molla_Update_Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors" style={{ color: "var(--text-faint)" }}>
            Download CV
          </a>
        </div>

        {/* Social */}
        <div className="flex flex-col gap-3">
          <h3 className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
            Connect
          </h3>
          <div className="flex gap-4">
            <a href="https://web.facebook.com/raju.molla.85134" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-faint)" }}>
              <Facebook size={19} />
            </a>
            <a href="https://www.linkedin.com/in/raju-molla-7574bb193/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-faint)" }}>
              <Linkedin size={19} />
            </a>
            <a href="https://github.com/raju-molla" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-faint)" }}>
              <Github size={19} />
            </a>
          </div>
        </div>

        {/* Competitive profiles */}
        <div className="flex flex-col gap-3">
          <h3 className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
            Competitive Profiles
          </h3>
          <div className="flex flex-wrap gap-4">
            <a href="https://codeforces.com/profile/raju_molla56" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-faint)" }}>
              <SiCodeforces size={19} />
            </a>
            <a href="https://www.codechef.com/users/raju_molla" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-faint)" }}>
              <SiCodechef size={19} />
            </a>
            <a href="https://www.hackerrank.com/profile/EU_DRAGONS" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-faint)" }}>
              <SiHackerrank size={19} />
            </a>
            <a href="https://www.hackerearth.com/@raju634/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-faint)" }}>
              <SiHackerearth size={19} />
            </a>
            <a href="https://www.stopstalk.com/user/profile/raju56" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-faint)" }}>
              <SiStopstalk size={19} />
            </a>
          </div>
        </div>
      </div>

      <div
        className="max-w-6xl mx-auto text-center mt-14 pt-6 text-xs font-mono"
        style={{ borderTop: "1px solid var(--border)", color: "var(--text-faint)" }}
      >
        © {year} Raju Molla. All rights reserved.
      </div>
    </footer>
  );
}
