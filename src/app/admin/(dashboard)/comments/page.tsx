"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, MessageSquare, CornerDownRight } from "lucide-react";
import PageHeader from "../component/PageHeader";

type Comment = {
  _id: string;
  name: string;
  message: string;
  parent: string | null;
  createdAt: string;
  blog: { _id: string; title: string; slug: string } | null;
};

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/comments");
      const data = await res.json();
      setComments(data.comments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this comment? Any replies to it will also be removed.")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/comments/${id}`, { method: "DELETE" });
      setComments((c) => c.filter((x) => x._id !== id && x.parent !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <PageHeader title="Comments" description="Moderate comments and replies across all posts" />

      <div className="px-6 sm:px-10 py-8">
        {loading ? (
          <p className="font-mono text-sm" style={{ color: "var(--text-faint)" }}>
            Loading…
          </p>
        ) : comments.length === 0 ? (
          <div
            className="rounded-lg border border-dashed p-12 text-center"
            style={{ borderColor: "var(--border)" }}
          >
            <MessageSquare size={28} className="mx-auto mb-3" style={{ color: "var(--text-faint)" }} />
            <p className="font-display text-lg" style={{ color: "var(--text)" }}>
              No comments yet
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Comments left on your blog posts will show up here.
            </p>
          </div>
        ) : (
          <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)" }}>
            {comments.map((comment, i) => (
              <div
                key={comment._id}
                className="flex items-start justify-between gap-4 px-5 py-4"
                style={{
                  background: "var(--surface)",
                  borderTop: i === 0 ? "none" : "1px solid var(--border)",
                }}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {comment.parent && (
                      <CornerDownRight size={13} style={{ color: "var(--text-faint)" }} />
                    )}
                    <p className="font-mono text-sm font-medium" style={{ color: "var(--text)" }}>
                      {comment.name}
                    </p>
                    <span className="text-xs font-mono" style={{ color: "var(--text-faint)" }}>
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {comment.message}
                  </p>
                  {comment.blog && (
                    <Link
                      href={`/east/blog/${comment.blog.slug}`}
                      target="_blank"
                      className="inline-block mt-2 text-xs font-mono hover:underline"
                      style={{ color: "var(--accent)" }}
                    >
                      on "{comment.blog.title}"
                    </Link>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(comment._id)}
                  disabled={deletingId === comment._id}
                  className="p-2 rounded-md shrink-0 disabled:opacity-50"
                  style={{ color: "var(--signal)" }}
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
