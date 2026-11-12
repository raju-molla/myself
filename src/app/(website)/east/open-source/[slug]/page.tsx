import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Github, ExternalLink, Star } from "lucide-react";
import Navbar from "../../navbar/page";
import Footer from "../../component/Footer";
import connectMongoDb from "@/libs/mongodb";
import OpenSource from "@/models/openSource";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

type ProjectRecord = {
  title: string;
  slug: string;
  description: string;
  readme?: string;
  resourceType?: string;
  repoUrl?: string;
  liveUrl?: string;
  coverImage?: string;
  techStack: string[];
  stars: number;
  license?: string;
};

export const dynamic = "force-dynamic";

async function findPublishedProject(slug: string): Promise<ProjectRecord | null> {
  await connectMongoDb();
  return OpenSource.findOne({ slug, status: "published" })
    .lean<ProjectRecord>()
    .exec();
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await findPublishedProject(slug);

  if (!project) {
    return { title: "Project not found | Raju Molla" };
  }

  const url = `https://www.rajumolla.com/east/open-source/${project.slug}`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.description,
      url,
      siteName: "Raju Molla",
      images: project.coverImage ? [project.coverImage] : undefined,
    },
    twitter: {
      card: project.coverImage ? "summary_large_image" : "summary",
      title: project.title,
      description: project.description,
      images: project.coverImage ? [project.coverImage] : undefined,
    },
  };
}

export default async function OpenSourceDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await findPublishedProject(slug);

  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24" style={{ background: "var(--bg)" }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <article>
            <h1 className="font-display text-4xl font-semibold" style={{ color: "var(--text)" }}>
              {project.title}
            </h1>
            <p className="mt-3 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {project.description}
            </p>

            {project.resourceType && (
              <p
                className="mt-3 font-mono text-xs uppercase tracking-widest"
                style={{ color: "var(--accent)" }}
              >
                {project.resourceType}
              </p>
            )}

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
                  <ExternalLink size={16} />{" "}
                  {project.resourceType?.toLowerCase().includes("publication")
                    ? "Read Publication"
                    : project.resourceType
                      ? "Visit Website"
                      : "Live Demo"}
                </a>
              )}
              {project.stars > 0 && (
                <span className="flex items-center gap-1.5" style={{ color: "var(--text-faint)" }}>
                  <Star size={16} /> {project.stars}
                </span>
              )}
              {project.license && (
                <span style={{ color: "var(--text-faint)" }}>{project.license}</span>
              )}
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
        </div>
      </main>
      <Footer />
    </>
  );
}
