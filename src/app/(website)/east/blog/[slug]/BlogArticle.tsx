import CommentThread from "../../component/CommentThread";
import sanitizeBlogContent from "@/libs/sanitizeBlogContent";

type Blog = {
  _id: { toString(): string };
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  tags: string[];
  author: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  views: number;
};

export default function BlogArticle({ blog }: { blog: Blog }) {
  const publishedAt = blog.publishedAt || blog.createdAt;
  const pageUrl = `https://www.rajumolla.com/east/blog/${blog.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    datePublished: publishedAt.toISOString(),
    dateModified: blog.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: blog.author,
    },
    mainEntityOfPage: pageUrl,
    keywords: blog.tags,
  };

  return (
    <>
      <main className="min-h-screen pt-32 pb-24" style={{ background: "var(--bg)" }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <article>
            <p className="font-mono text-xs flex items-center gap-2" style={{ color: "var(--text-faint)" }}>
              <time dateTime={publishedAt.toISOString()}>
                {publishedAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>·</span>
              <span>{blog.author}</span>
              <span>·</span>
              <span>{blog.views ?? 0} views</span>
            </p>
            <h1 className="font-display text-4xl font-semibold mt-3" style={{ color: "var(--text)" }}>
              {blog.title}
            </h1>
            {blog.excerpt && (
              <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {blog.excerpt}
              </p>
            )}
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
              className="article-content mt-10 leading-relaxed"
              style={{ color: "var(--text)" }}
              dangerouslySetInnerHTML={{ __html: sanitizeBlogContent(blog.content) }}
            />
            <CommentThread blogId={blog._id.toString()} />
          </article>
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
