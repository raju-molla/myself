"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageHeader from "../../component/PageHeader";
import OpenSourceForm, { OpenSourceFormValues } from "../../component/OpenSourceForm";

export default function EditOpenSourcePage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<OpenSourceFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/opensource/${id}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setProject(data.project);
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <>
      <PageHeader title="Edit Project" description="Update this open source project" />
      {loading ? (
        <p className="px-6 sm:px-10 py-8 font-mono text-sm" style={{ color: "var(--text-faint)" }}>
          Loading…
        </p>
      ) : notFound || !project ? (
        <p className="px-6 sm:px-10 py-8 font-mono text-sm" style={{ color: "var(--signal)" }}>
          Project not found.
        </p>
      ) : (
        <OpenSourceForm initial={project} />
      )}
    </>
  );
}
