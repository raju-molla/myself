"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Send, CornerDownRight } from "lucide-react";

type Comment = {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
  replies: Comment[];
};

const inputStyle = {
  background: "var(--surface-2)",
  borderColor: "var(--border)",
  color: "var(--text)",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function CommentForm({
  onSubmit,
  placeholder = "Add to the discussion…",
  compact = false,
}: {
  onSubmit: (values: { name: string; email: string; message: string }) => Promise<void>;
  placeholder?: string;
  compact?: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSending(true);
    try {
      await onSubmit({ name, email, message });
      setName("");
      setEmail("");
      setMessage("");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      {!compact && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            style={inputStyle}
            className="w-full rounded-md border px-4 py-2.5 outline-none text-sm"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            style={inputStyle}
            className="w-full rounded-md border px-4 py-2.5 outline-none text-sm"
            placeholder="Email (not published)"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      )}
      {compact && (
        <input
          style={inputStyle}
          className="w-full rounded-md border px-3 py-2 outline-none text-sm"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}
      <textarea
        style={inputStyle}
        className="w-full rounded-md border px-4 py-2.5 outline-none text-sm resize-none"
        rows={compact ? 2 : 3}
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={sending || !name.trim() || !message.trim()}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs font-medium disabled:opacity-50"
        style={{ background: "var(--accent)", color: "var(--bg)" }}
      >
        <Send size={13} />
        {sending ? "Posting…" : "Post"}
      </button>
    </form>
  );
}

function CommentItem({
  comment,
  onReply,
}: {
  comment: Comment;
  onReply: (parentId: string, values: { name: string; email: string; message: string }) => Promise<void>;
}) {
  const [replying, setReplying] = useState(false);

  return (
    <div>
      <div
        className="rounded-lg border p-4"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <p className="font-mono text-sm font-semibold" style={{ color: "var(--text)" }}>
            {comment.name}
          </p>
          <span className="text-xs font-mono" style={{ color: "var(--text-faint)" }}>
            {timeAgo(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {comment.message}
        </p>
        <button
          onClick={() => setReplying((r) => !r)}
          className="mt-2 text-xs font-mono flex items-center gap-1.5"
          style={{ color: "var(--accent)" }}
        >
          <CornerDownRight size={12} /> Reply
        </button>

        {replying && (
          <div className="mt-3">
            <CommentForm
              compact
              placeholder="Write a reply…"
              onSubmit={async (values) => {
                await onReply(comment._id, values);
                setReplying(false);
              }}
            />
          </div>
        )}
      </div>

      {comment.replies?.length > 0 && (
        <div className="ml-6 sm:ml-10 mt-3 space-y-3 border-l pl-4" style={{ borderColor: "var(--border)" }}>
          {comment.replies.map((reply) => (
            <CommentItem key={reply._id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentThread({ blogId }: { blogId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const load = async () => {
    try {
      const res = await fetch(`/api/blogs/${blogId}/comments`);
      const data = await res.json();
      setComments(data.comments || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (blogId) load();
  }, [blogId]);

  const postComment = async (values: { name: string; email: string; message: string }, parent?: string) => {
    const res = await fetch(`/api/blogs/${blogId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, parent }),
    });
    if (res.ok) await load();
  };

  return (
    <section className="mt-16">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle size={20} style={{ color: "var(--accent)" }} />
        <h2 className="font-display text-2xl font-semibold" style={{ color: "var(--text)" }}>
          Comments {total > 0 && `(${total})`}
        </h2>
      </div>

      <div className="mb-8">
        <CommentForm onSubmit={(values) => postComment(values)} />
      </div>

      {loading ? (
        <p className="font-mono text-sm" style={{ color: "var(--text-faint)" }}>
          Loading comments…
        </p>
      ) : comments.length === 0 ? (
        <p className="font-mono text-sm" style={{ color: "var(--text-faint)" }}>
          Be the first to comment.
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <CommentItem key={c._id} comment={c} onReply={(parentId, values) => postComment(values, parentId)} />
          ))}
        </div>
      )}
    </section>
  );
}
