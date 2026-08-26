"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Send } from "lucide-react";

export type OpenSourceFormValues = {
  _id?: string;
  title: string;
  slug?: string;
  description: string;
  readme?: string;
  repoUrl?: string;
  liveUrl?: string;
  coverImage?: string;
  techStack?: string[] | string;
  stars?: number;
  license?: string;
  status: "draft" | "published";
  featured?: boolean;
};

const inputStyle = {
  background: "var(--surface-2)",
  borderColor: "var(--border)",
  color: "var(--text)",
};

export default function OpenSourceForm({ initial }: { initial?: OpenSourceFormValues }) {
  const router = useRouter();
  const isEdit = !!initial?._id;

  const [values, setValues] = useState<OpenSourceFormValues>({
    title: initial?.title || "",
    slug: initial?.slug || "",
    description: initial?.description || "",
    readme: initial?.readme || "",
    repoUrl: initial?.repoUrl || "",
    liveUrl: initial?.liveUrl || "",
    coverImage: initial?.coverImage || "",
    techStack: Array.isArray(initial?.techStack)
      ? initial?.techStack.join(", ")
      : initial?.techStack || "",
    stars: initial?.stars || 0,
    license: initial?.license || "MIT",
    status: initial?.status || "draft",
    featured: initial?.featured || false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (key: keyof OpenSourceFormValues, value: any) =>
    setValues((v) => ({ ...v, [key]: value }));

  const submit = async (status: "draft" | "published") => {
    setSaving(true);
    setError("");
    try {
      const payload = { ...values, status };
      const res = await fetch(
        isEdit ? `/api/opensource/${initial!._id}` : "/api/opensource",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      router.push("/admin/opensource");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save project");
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
        <Field label="Project title">
          <input
            style={inputStyle}
            className="w-full rounded-md border px-4 py-2.5 outline-none"
            value={values.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="visabee — Visa tracking API"
          />
        </Field>

        <Field label="Slug" hint="Leave blank to auto-generate from title">
          <input
            style={inputStyle}
            className="w-full rounded-md border px-4 py-2.5 outline-none font-mono text-sm"
            value={values.slug}
            onChange={(e) => update("slug", e.target.value)}
            placeholder="visabee"
          />
        </Field>

        <Field label="Short description" hint="Shown on the open source listing card">
          <textarea
            style={inputStyle}
            className="w-full rounded-md border px-4 py-2.5 outline-none resize-none"
            rows={2}
            value={values.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="A lightweight API for tracking visa application status…"
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Repository URL">
            <input
              style={inputStyle}
              className="w-full rounded-md border px-4 py-2.5 outline-none font-mono text-sm"
              value={values.repoUrl}
              onChange={(e) => update("repoUrl", e.target.value)}
              placeholder="https://github.com/…"
            />
          </Field>
          <Field label="Live demo URL">
            <input
              style={inputStyle}
              className="w-full rounded-md border px-4 py-2.5 outline-none font-mono text-sm"
              value={values.liveUrl}
              onChange={(e) => update("liveUrl", e.target.value)}
              placeholder="https://…"
            />
          </Field>
        </div>

        <Field label="Cover image URL">
          <input
            style={inputStyle}
            className="w-full rounded-md border px-4 py-2.5 outline-none font-mono text-sm"
            value={values.coverImage}
            onChange={(e) => update("coverImage", e.target.value)}
            placeholder="/visabee.png or https://…"
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Tech stack" hint="Comma separated">
            <input
              style={inputStyle}
              className="w-full rounded-md border px-4 py-2.5 outline-none font-mono text-sm"
              value={values.techStack as string}
              onChange={(e) => update("techStack", e.target.value)}
              placeholder="Next.js, MongoDB, Tailwind"
            />
          </Field>
          <Field label="License">
            <input
              style={inputStyle}
              className="w-full rounded-md border px-4 py-2.5 outline-none font-mono text-sm"
              value={values.license}
              onChange={(e) => update("license", e.target.value)}
              placeholder="MIT"
            />
          </Field>
        </div>

        <Field label="README / full details" hint="Markdown supported by your renderer of choice">
          <textarea
            style={inputStyle}
            className="w-full rounded-md border px-4 py-2.5 outline-none font-mono text-sm leading-relaxed"
            rows={12}
            value={values.readme}
            onChange={(e) => update("readme", e.target.value)}
            placeholder="## Overview&#10;…"
          />
        </Field>

        <label className="flex items-center gap-2.5 text-sm font-mono cursor-pointer w-fit">
          <input
            type="checkbox"
            checked={!!values.featured}
            onChange={(e) => update("featured", e.target.checked)}
            className="w-4 h-4 accent-[color:var(--accent)]"
          />
          <span style={{ color: "var(--text)" }}>Feature this project</span>
        </label>
      </div>

      <div className="flex items-center gap-3 mt-8">
        <button
          disabled={saving || !values.title || !values.description}
          onClick={() => submit("draft")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-mono text-sm font-medium border disabled:opacity-50"
          style={{ borderColor: "var(--border-strong)", color: "var(--text)" }}
        >
          <Save size={16} />
          Save draft
        </button>
        <button
          disabled={saving || !values.title || !values.description}
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
