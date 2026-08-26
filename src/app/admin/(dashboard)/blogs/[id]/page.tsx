"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageHeader from "../../component/PageHeader";
import BlogForm, { BlogFormValues } from "../../component/BlogForm";

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setBlog(data.blog);
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
      <PageHeader title="Edit Blog Post" description="Update and republish this article" />
      {loading ? (
        <p className="px-6 sm:px-10 py-8 font-mono text-sm" style={{ color: "var(--text-faint)" }}>
          Loading…
        </p>
      ) : notFound || !blog ? (
        <p className="px-6 sm:px-10 py-8 font-mono text-sm" style={{ color: "var(--signal)" }}>
          Post not found.
        </p>
      ) : (
        <BlogForm initial={blog} />
      )}
    </>
  );
}
