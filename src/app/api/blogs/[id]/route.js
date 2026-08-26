import connectMongoDb from "@/libs/mongodb";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getAdminFromRequest } from "@/libs/auth";

async function findBlog(id) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    const byId = await Blog.findById(id);
    if (byId) return { blog: byId, matchedBy: "id" };
  }
  const bySlug = await Blog.findOne({ slug: id });
  return { blog: bySlug, matchedBy: "slug" };
}

// GET /api/blogs/:id  (id can be a Mongo _id or a slug)
// Public visits (looked up by slug) increment the view counter once per request.
// Admin edit screens fetch by _id, which never increments views.
export async function GET(request, { params }) {
  try {
    await connectMongoDb();
    const { id } = await params;

    const { blog, matchedBy } = await findBlog(id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    if (matchedBy === "slug" && blog.status === "published") {
      blog.views = (blog.views || 0) + 1;
      await blog.save();
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { message: "Failed to fetch blog", error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/:id
export async function PUT(request, { params }) {
  try {
    if (!getAdminFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDb();
    const { id } = await params;
    const body = await request.json();

    const { blog } = await findBlog(id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const updatable = ["title", "slug", "excerpt", "content", "coverImage", "tags", "author", "status"];
    for (const key of updatable) {
      if (body[key] !== undefined) {
        blog[key] = key === "tags" && !Array.isArray(body[key])
          ? (body[key] || "").split(",").map((t) => t.trim()).filter(Boolean)
          : body[key];
      }
    }

    if (body.status === "published" && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }

    await blog.save();

    return NextResponse.json({ message: "Blog updated", blog }, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { message: "Failed to update blog", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/:id
export async function DELETE(request, { params }) {
  try {
    if (!getAdminFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDb();
    const { id } = await params;

    const { blog } = await findBlog(id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    await blog.deleteOne();

    return NextResponse.json({ message: "Blog deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { message: "Failed to delete blog", error: error.message },
      { status: 500 }
    );
  }
}
