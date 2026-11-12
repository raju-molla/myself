import type { MetadataRoute } from "next";
import connectMongoDb from "@/libs/mongodb";
import Blog from "@/models/blog";
import OpenSource from "@/models/openSource";

const siteUrl = "https://www.rajumolla.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectMongoDb();

  const [blogs, projects] = await Promise.all([
    Blog.find({ status: "published" }).select("slug updatedAt").lean(),
    OpenSource.find({ status: "published" }).select("slug updatedAt").lean(),
  ]);

  const pages = [
    "/",
    "/east/about",
    "/east/projects",
    "/east/blog",
    "/east/open-source",
    "/east/contact",
    ...blogs.map((blog) => ({
      path: `/east/blog/${blog.slug}`,
      updatedAt: blog.updatedAt,
    })),
    ...projects.map((project) => ({
      path: `/east/open-source/${project.slug}`,
      updatedAt: project.updatedAt,
    })),
  ];

  return pages.map((page) =>
    typeof page === "string"
      ? { url: `${siteUrl}${page}` }
      : {
          url: `${siteUrl}${page.path}`,
          lastModified: page.updatedAt,
        }
  );
}
