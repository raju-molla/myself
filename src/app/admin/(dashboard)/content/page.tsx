"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, CheckCircle2, Circle } from "lucide-react";
import PageHeader from "../component/PageHeader";

type Section = { section: string; isCustomized: boolean };

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  about: "About",
  skills: "Skills & Technologies",
  research: "Research & Publications",
  projects: "Selected Work / Projects",
  experience: "Professional Experience",
  achievements: "Achievements & Contests",
  testimonials: "Testimonials",
  contact: "Contact",
};

export default function AdminContentPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/content");
        const data = await res.json();
        setSections(data.sections || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <PageHeader
        title="Site Content"
        description="Edit every section of your homepage — Hero, About, Skills, Research, Projects, Experience, Achievements, Testimonials, and Contact."
      />

      <div className="px-6 sm:px-10 py-8">
        {loading ? (
          <p className="font-mono text-sm" style={{ color: "var(--text-faint)" }}>
            Loading…
          </p>
        ) : (
          <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)" }}>
            {sections.map(({ section, isCustomized }, i) => (
              <Link
                key={section}
                href={`/admin/content/${section}`}
                className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[var(--surface-2)]"
                style={{
                  background: "var(--surface)",
                  borderTop: i === 0 ? "none" : "1px solid var(--border)",
                }}
              >
                <div className="flex items-center gap-3">
                  {isCustomized ? (
                    <CheckCircle2 size={16} style={{ color: "var(--accent)" }} />
                  ) : (
                    <Circle size={16} style={{ color: "var(--text-faint)" }} />
                  )}
                  <div>
                    <p className="font-display font-medium" style={{ color: "var(--text)" }}>
                      {SECTION_LABELS[section] || section}
                    </p>
                    <p className="text-xs font-mono mt-0.5" style={{ color: "var(--text-faint)" }}>
                      {isCustomized ? "Customized" : "Using default content"}
                    </p>
                  </div>
                </div>
                <Pencil size={16} style={{ color: "var(--accent)" }} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
