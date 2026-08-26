"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, TerminalSquare, Home, User, FlaskConical, Folder, Mail, Newspaper, GitBranch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/east/about", label: "About", icon: User },
  { href: "/#research", label: "Research", icon: FlaskConical },
  { href: "/east/projects", label: "Projects", icon: Folder },
  { href: "/east/blog", label: "Blog", icon: Newspaper },
  { href: "/east/open-source", label: "Open Source", icon: GitBranch },
  { href: "/east/contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed w-full z-30 transition-colors duration-300"
      style={{
        height: "68px",
        background: scrolled ? "rgba(10, 16, 20, 0.92)" : "rgba(10, 16, 20, 0.55)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${scrolled ? "var(--border-strong)" : "transparent"}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex justify-between items-center h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <TerminalSquare
            size={22}
            style={{ color: "var(--accent)" }}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="font-display text-xl font-semibold text-white">
            Raju Molla
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="relative flex items-center gap-2 group"
            >
              <Icon
                size={16}
                className="transition-colors"
                style={{ color: isActive(href) ? "var(--accent)" : "var(--text-faint)" }}
              />
              <span
                className="transition-colors tracking-wide"
                style={{ color: isActive(href) ? "var(--text)" : "var(--text-muted)" }}
              >
                {label}
              </span>
              <span
                className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ background: "var(--accent)" }}
              />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X size={26} style={{ color: "var(--text)" }} />
          ) : (
            <Menu size={26} style={{ color: "var(--text)" }} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t"
            style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
          >
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-8 py-4 font-mono text-sm"
                style={{ color: isActive(href) ? "var(--accent)" : "var(--text-muted)" }}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={16} />
                <span>{label}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
