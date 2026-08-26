"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Send } from "lucide-react";

export type BlogFormValues = {
  _id?: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  tags?: string[] | string;
  status: "draft" | "published";
};

const inputStyle = {
  background: "var(--surface-2)",
  borderColor: "var(--border)",
  color: "var(--text)",
};

export default function BlogForm({ initial }: { initial?: BlogFormValues }) {
  const router = useRouter();
  const isEdit = !!initial?._id;

  const [values, setValues] = useState<BlogFormValues>({
    title: initial?.title || "",
    slug: initial?.slug || "",
    excerpt: initial?.excerpt || "",
    content: initial?.content || "",
    coverImage: initial?.coverImage || "",
    tags: Array.isArray(initial?.tags) ? initial?.tags.join(", ") : initial?.tags || "",
    status: initial?.status || "draft",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (key: keyof BlogFormValues, value: string) =>
    setValues((v) => ({ ...v, [key]: value }));

  const submit = async (status: "draft" | "published") => {
    setSaving(true);
    setError("");
    try {
      const payload = { ...values, status };
      const res = await fetch(
        isEdit ? `/api/blogs/${initial!._id}` : "/api/blogs",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      router.push("/admin/blogs");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-6 sm:px-10 py-8 max-w-3xl">
      {error && (
        <div
          className="mb-6 px-4 py-3 rounded-md text-sm font-mono"
          style={{ background: "var(--signal-soft)", color: "var(--signal)" }}
        >
          {error}
        </div>
      )}

      <div className="space-y-6">
        <Field label="Title">
          <input
            style={inputStyle}
            className="w-full rounded-md border px-4 py-2.5 outline-none"
            value={values.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="How I built an intrusion detection system"
          />
        </Field>

        <Field label="Slug" hint="Leave blank to auto-generate from title">
          <input
            style={inputStyle}
            className="w-full rounded-md border px-4 py-2.5 outline-none font-mono text-sm"
            value={values.slug}
            onChange={(e) => update("slug", e.target.value)}
            placeholder="how-i-built-an-ids"
          />
        </Field>

        <Field label="Excerpt" hint="Short summary shown on the blog listing">
          <textarea
            style={inputStyle}
            className="w-full rounded-md border px-4 py-2.5 outline-none resize-none"
            rows={2}
            value={values.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            placeholder="A quick overview of the project and what I learned…"
          />
        </Field>

        <Field label="Cover image URL">
          <input
            style={inputStyle}
            className="w-full rounded-md border px-4 py-2.5 outline-none font-mono text-sm"
            value={values.coverImage}
            onChange={(e) => update("coverImage", e.target.value)}
            placeholder="/my-cover.png or https://…"
          />
        </Field>

        <Field label="Tags" hint="Comma separated">
          <input
            style={inputStyle}
            className="w-full rounded-md border px-4 py-2.5 outline-none font-mono text-sm"
            value={values.tags as string}
            onChange={(e) => update("tags", e.target.value)}
            placeholder="cybersecurity, AI, IDS"
          />
        </Field>

        <Field label="Content" hint="Markdown supported by your renderer of choice">
          <textarea
            style={inputStyle}
            className="w-full rounded-md border px-4 py-2.5 outline-none font-mono text-sm leading-relaxed"
            rows={16}
            value={values.content}
            onChange={(e) => update("content", e.target.value)}
            placeholder="Write your post here…"
          />
        </Field>
      </div>

      <div className="flex items-center gap-3 mt-8">
        <button
          disabled={saving || !values.title || !values.content}
          onClick={() => submit("draft")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-mono text-sm font-medium border disabled:opacity-50"
          style={{ borderColor: "var(--border-strong)", color: "var(--text)" }}
        >
          <Save size={16} />
          Save draft
        </button>
        <button
          disabled={saving || !values.title || !values.content}
          onClick={() => submit("published")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-mono text-sm font-medium disabled:opacity-50"
          style={{ background: "var(--accent)", color: "var(--bg)" }}
        >
          <Send size={16} />
          Publish
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-mono mb-1.5" style={{ color: "var(--text)" }}>
        {label}
      </label>
      {children}
      {hint && (
        <p className="text-xs mt-1" style={{ color: "var(--text-faint)" }}>
          {hint}
        </p>
      )}
    </div>
  );
}
