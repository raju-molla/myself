"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { Eye } from "lucide-react";
import Navbar from "../../navbar/page";
import Footer from "../../component/Footer";
import CommentThread from "../../component/CommentThread";

type Blog = {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  tags: string[];
  author: string;
  status: string;
  publishedAt?: string;
  createdAt: string;
  views: number;
};

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        if (!res.ok) {
          setMissing(true);
          return;
        }
        const data = await res.json();
        if (data.blog.status !== "published") {
          setMissing(true);
          return;
        }
        setBlog(data.blog);
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
          ) : missing || !blog ? (
            <p className="font-mono text-sm" style={{ color: "var(--signal)" }}>
              Post not found.
            </p>
          ) : (
            <article>
              <p className="font-mono text-xs flex items-center gap-2" style={{ color: "var(--text-faint)" }}>
                <span>
                  {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>·</span>
                <span>{blog.author}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Eye size={13} /> {blog.views ?? 0} views
                </span>
              </p>
              <h1 className="font-display text-4xl font-semibold mt-3" style={{ color: "var(--text)" }}>
                {blog.title}
              </h1>
              {blog.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded-full"
                      style={{ background: "var(--accent-soft)", color: "var(--accent-strong)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div
                className="mt-10 whitespace-pre-wrap leading-relaxed"
                style={{ color: "var(--text)" }}
              >
                {blog.content}
              </div>

              <CommentThread blogId={blog._id} />
            </article>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
