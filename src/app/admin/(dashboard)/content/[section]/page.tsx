"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save, RotateCcw, AlertTriangle } from "lucide-react";
import PageHeader from "../../component/PageHeader";

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

export default function EditContentSectionPage() {
  const { section } = useParams<{ section: string }>();
  const router = useRouter();

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isCustomized, setIsCustomized] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/content/${section}`);
      if (!res.ok) throw new Error("Section not found");
      const data = await res.json();
      setText(JSON.stringify(data.data, null, 2));
      setIsCustomized(data.isCustomized);
    } catch (err: any) {
      setError(err.message || "Failed to load section");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (section) load();
  }, [section]);

  const handleSave = async () => {
    setError("");
    setSuccess("");
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      setError("That's not valid JSON — check for a missing comma or bracket.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/content/${section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save");
      setSuccess("Saved — the live site will reflect this immediately.");
      setIsCustomized(true);
    } catch (err: any) {
      setError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm("Reset this section back to its original default content? Your edits will be lost.")) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/content/${section}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reset");
      setText(JSON.stringify(data.data, null, 2));
      setIsCustomized(false);
      setSuccess("Reset to default content.");
    } catch (err: any) {
      setError(err.message || "Failed to reset");
    } finally {
      setSaving(false);
    }
  };

  const label = SECTION_LABELS[section] || section;

  return (
    <>
      <PageHeader
        title={`Edit: ${label}`}
        description="This is the raw content data rendered by this section. Edit the values (not the field names) and save."
      />

      <div className="px-6 sm:px-10 py-8 max-w-4xl">
        {loading ? (
          <p className="font-mono text-sm" style={{ color: "var(--text-faint)" }}>
            Loading…
          </p>
        ) : (
          <>
            <div
              className="flex items-start gap-2.5 mb-5 px-4 py-3 rounded-md text-sm"
              style={{ background: "var(--accent-soft)", color: "var(--text-muted)" }}
            >
              <AlertTriangle size={16} style={{ color: "var(--accent)" }} className="mt-0.5 shrink-0" />
              <p>
                This is a structured JSON editor — it edits exactly what the "{label}" section on your
                homepage renders. Keep the same field names (the text in quotes before each colon); only
                change the values. {isCustomized ? "This section has custom content." : "This section is currently using the built-in default content."}
              </p>
            </div>

            {error && (
              <div
                className="mb-5 px-4 py-3 rounded-md text-sm font-mono"
                style={{ background: "var(--signal-soft)", color: "var(--signal)" }}
              >
                {error}
              </div>
            )}
            {success && (
              <div
                className="mb-5 px-4 py-3 rounded-md text-sm font-mono"
                style={{ background: "var(--accent-soft)", color: "var(--accent-strong)" }}
              >
                {success}
              </div>
            )}

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
              rows={28}
              className="w-full rounded-md border px-4 py-3 outline-none font-mono text-sm leading-relaxed"
              style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text)" }}
            />

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-mono text-sm font-medium disabled:opacity-50"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
              >
                <Save size={16} />
                {saving ? "Saving…" : "Save changes"}
              </button>
              <button
                onClick={handleReset}
                disabled={saving || !isCustomized}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-mono text-sm font-medium border disabled:opacity-50"
                style={{ borderColor: "var(--border-strong)", color: "var(--text)" }}
              >
                <RotateCcw size={16} />
                Reset to default
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
