import connectMongoDb from "@/libs/mongodb";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/libs/auth";

function slugify(str) {
  return str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// GET /api/blogs?status=published&limit=10&page=1
export async function GET(request) {
  try {
    await connectMongoDb();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // "published" | "draft" | null (=all)
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const tag = searchParams.get("tag");

    const query = {};
    if (status) query.status = status;
    if (tag) query.tags = tag;

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Blog.countDocuments(query),
    ]);

    return NextResponse.json(
      { blogs, total, page, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { message: "Failed to fetch blogs", error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/blogs
export async function POST(request) {
  try {
    if (!getAdminFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDb();

    const body = await request.json();
    const { title, excerpt, content, coverImage, tags, author, status } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    let slug = body.slug ? slugify(body.slug) : slugify(title);

    // Ensure slug uniqueness
    let uniqueSlug = slug;
    let counter = 1;
    while (await Blog.exists({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${counter}`;
      counter += 1;
    }

    const blog = await Blog.create({
      title,
      slug: uniqueSlug,
      excerpt,
      content,
      coverImage,
      tags: Array.isArray(tags) ? tags : (tags || "").split(",").map((t) => t.trim()).filter(Boolean),
      author: author || "Raju Molla",
      status: status || "draft",
      publishedAt: status === "published" ? new Date() : undefined,
    });

    return NextResponse.json(
      { message: "Blog created", blog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { message: "Failed to create blog", error: error.message },
      { status: 500 }
    );
  }
}
