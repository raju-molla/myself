import Link from "next/link";
import { Eye } from "lucide-react";
import Navbar from "../navbar/page";
import connectMongoDb from "@/libs/mongodb";
import Blog from "@/models/blog";

export const dynamic = "force-dynamic";

export default async function BlogListPage() {
  await connectMongoDb();
  const blogs = await Blog.find({ status: "published" })
    .sort({ publishedAt: -1, createdAt: -1 })
    .lean();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24" style={{ background: "var(--bg)" }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <h1 className="font-display text-4xl font-semibold" style={{ color: "var(--text)" }}>
            Blog
          </h1>
          <p className="mt-3" style={{ color: "var(--text-muted)" }}>
            Write-ups on cybersecurity research, AI, and software engineering.
          </p>

          <div className="mt-12 space-y-6">
            {blogs.length === 0 ? (
              <p className="font-mono text-sm" style={{ color: "var(--text-faint)" }}>
                No posts published yet — check back soon.
              </p>
            ) : (
              blogs.map((blog) => (
                <Link
                  key={String(blog._id)}
                  href={`/east/blog/${blog.slug}`}
                  className="block rounded-lg border p-6 transition-colors hover:border-[var(--border-strong)]"
                  style={{ background: "var(--surface)", borderColor: "var(--border)" }}
                >
                  <p className="font-display text-xl font-semibold" style={{ color: "var(--text)" }}>
                    {blog.title}
                  </p>
                  {blog.excerpt && (
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {blog.excerpt}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-3 font-mono text-xs" style={{ color: "var(--text-faint)" }}>
                    <span>
                      {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    {blog.tags?.length > 0 && (
                      <span style={{ color: "var(--accent)" }}>{blog.tags.join(" · ")}</span>
                    )}
                    <span className="flex items-center gap-1 ml-auto">
                      <Eye size={13} /> {blog.views ?? 0}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
