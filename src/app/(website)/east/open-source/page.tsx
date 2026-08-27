"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, ExternalLink, Github } from "lucide-react";
import Navbar from "../navbar/page";
import Footer from "../component/Footer";

type Project = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  stars: number;
  featured: boolean;
};

export default function OpenSourceListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/opensource?status=published&limit=50");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24" style={{ background: "var(--bg)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <h1 className="font-display text-4xl font-semibold" style={{ color: "var(--text)" }}>
            Open Source
          </h1>
          <p className="mt-3" style={{ color: "var(--text-muted)" }}>
            Tools, libraries, and research code I've published publicly.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {loading ? (
              <p className="font-mono text-sm" style={{ color: "var(--text-faint)" }}>
                Loading…
              </p>
            ) : projects.length === 0 ? (
              <p className="font-mono text-sm" style={{ color: "var(--text-faint)" }}>
                No projects published yet — check back soon.
              </p>
            ) : (
              projects.map((project) => (
                <div
                  key={project._id}
                  className="rounded-lg border p-6 flex flex-col"
                  style={{ background: "var(--surface)", borderColor: "var(--border)" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/east/open-source/${project.slug}`}>
                      <p className="font-display text-lg font-semibold" style={{ color: "var(--text)" }}>
                        {project.title}
                      </p>
                    </Link>
                    {project.featured && (
                      <Star size={16} style={{ color: "var(--signal)" }} fill="var(--signal)" />
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>
                    {project.description}
                  </p>

                  {project.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-2 py-0.5 rounded-full"
                          style={{ background: "var(--accent-soft)", color: "var(--accent-strong)" }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-5 font-mono text-xs" style={{ color: "var(--text-faint)" }}>
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:opacity-80"
                      >
                        <Github size={14} /> Repo
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:opacity-80"
                      >
                        <ExternalLink size={14} /> Live
                      </a>
                    )}
                    {project.stars > 0 && (
                      <span className="flex items-center gap-1.5">
                        <Star size={14} /> {project.stars}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
