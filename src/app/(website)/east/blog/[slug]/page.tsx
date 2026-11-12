import type { Metadata } from "next";
import { notFound } from "next/navigation";
import connectMongoDb from "@/libs/mongodb";
import Blog from "@/models/blog";
import BlogArticle from "./BlogArticle";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

type BlogRecord = {
  _id: { toString(): string };
  title: string;
  slug: string;
  excerpt?: string;
  tags: string[];
  author: string;
  coverImage?: string;
  content: string;
  status: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  views: number;
};

export const dynamic = "force-dynamic";

async function findPublishedBlog(slug: string): Promise<BlogRecord | null> {
  await connectMongoDb();
  return Blog.findOne({ slug, status: "published" }).lean<BlogRecord>().exec();
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await findPublishedBlog(slug);

  if (!blog) {
    return { title: "Blog post not found | Raju Molla" };
  }

  const url = `https://www.rajumolla.com/east/blog/${blog.slug}`;
  return {
    title: blog.title,
    description: blog.excerpt || blog.title,
    keywords: blog.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.excerpt || blog.title,
      url,
      siteName: "Raju Molla",
      publishedTime: blog.publishedAt?.toISOString(),
      modifiedTime: blog.updatedAt?.toISOString(),
      authors: [blog.author],
      tags: blog.tags,
      images: blog.coverImage ? [blog.coverImage] : undefined,
    },
    twitter: {
      card: blog.coverImage ? "summary_large_image" : "summary",
      title: blog.title,
      description: blog.excerpt || blog.title,
      images: blog.coverImage ? [blog.coverImage] : undefined,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await findPublishedBlog(slug);

  if (!blog) notFound();

  return <BlogArticle blog={blog} />;
}
