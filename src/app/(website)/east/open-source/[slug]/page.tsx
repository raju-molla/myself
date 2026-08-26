"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Github, ExternalLink, Star } from "lucide-react";
import Navbar from "../../navbar/page";
import Footer from "../../component/Footer";

type Project = {
  title: string;
  description: string;
  readme?: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  stars: number;
  license: string;
  status: string;
};

export default function OpenSourceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/opensource/${slug}`);
        if (!res.ok) {
          setMissing(true);
          return;
        }
        const data = await res.json();
        if (data.project.status !== "published") {
          setMissing(true);
          return;
        }
        setProject(data.project);
      } catch (err) {
        console.error(err);
        setMissing(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24" style={{ background: "var(--bg)" }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          {loading ? (
            <p className="font-mono text-sm" style={{ color: "var(--text-faint)" }}>
              Loading…
            </p>
          ) : missing || !project ? (
            <p className="font-mono text-sm" style={{ color: "var(--signal)" }}>
              Project not found.
            </p>
          ) : (
            <article>
              <h1 className="font-display text-4xl font-semibold" style={{ color: "var(--text)" }}>
                {project.title}
              </h1>
              <p className="mt-3 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {project.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-6 font-mono text-sm">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-md"
                    style={{ background: "var(--accent)", color: "var(--bg)" }}
                  >
                    <Github size={16} /> View Repo
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-md border"
                    style={{ borderColor: "var(--border-strong)", color: "var(--text)" }}
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
                {project.stars > 0 && (
                  <span className="flex items-center gap-1.5" style={{ color: "var(--text-faint)" }}>
                    <Star size={16} /> {project.stars}
                  </span>
                )}
                <span style={{ color: "var(--text-faint)" }}>{project.license}</span>
              </div>

              {project.techStack?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-full"
                      style={{ background: "var(--accent-soft)", color: "var(--accent-strong)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {project.readme && (
                <div
                  className="mt-10 whitespace-pre-wrap leading-relaxed font-mono text-sm"
                  style={{ color: "var(--text)" }}
                >
                  {project.readme}
                </div>
              )}
            </article>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
