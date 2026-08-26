import connectMongoDb from "@/libs/mongodb";
import Comment from "@/models/comment";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

async function resolveBlogId(idOrSlug) {
  if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
    const byId = await Blog.findById(idOrSlug).select("_id");
    if (byId) return byId._id;
  }
  const bySlug = await Blog.findOne({ slug: idOrSlug }).select("_id");
  return bySlug?._id || null;
}

function buildTree(comments) {
  const byId = new Map(comments.map((c) => [String(c._id), { ...c, replies: [] }]));
  const roots = [];
  for (const c of byId.values()) {
    if (c.parent) {
      const parent = byId.get(String(c.parent));
      if (parent) parent.replies.push(c);
      else roots.push(c); // orphaned reply (parent deleted) — surface at top level
    } else {
      roots.push(c);
    }
  }
  return roots;
}

// GET /api/blogs/:id/comments — public, nested by parent/reply
export async function GET(request, { params }) {
  try {
    await connectMongoDb();
    const { id } = await params;

    const blogId = await resolveBlogId(id);
    if (!blogId) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const comments = await Comment.find({ blog: blogId })
      .select("-email")
      .sort({ createdAt: 1 })
      .lean();

    const tree = buildTree(comments);

    return NextResponse.json({ comments: tree, total: comments.length }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { message: "Failed to fetch comments", error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/blogs/:id/comments — public, anyone can comment or reply
export async function POST(request, { params }) {
  try {
    await connectMongoDb();
    const { id } = await params;
    const { name, email, message, parent } = await request.json();

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { message: "Name and message are required" },
        { status: 400 }
      );
    }

    const blogId = await resolveBlogId(id);
    if (!blogId) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    let parentId = null;
    if (parent) {
      if (!mongoose.Types.ObjectId.isValid(parent)) {
        return NextResponse.json({ message: "Invalid parent comment" }, { status: 400 });
      }
      const parentComment = await Comment.findOne({ _id: parent, blog: blogId });
      if (!parentComment) {
        return NextResponse.json({ message: "Parent comment not found" }, { status: 404 });
      }
      parentId = parentComment._id;
    }

    const comment = await Comment.create({
      blog: blogId,
      parent: parentId,
      name: name.trim().slice(0, 80),
      email: (email || "").trim().slice(0, 120),
      message: message.trim().slice(0, 2000),
    });

    const { email: _omit, ...safeComment } = comment.toObject();

    return NextResponse.json(
      { message: "Comment posted", comment: { ...safeComment, replies: [] } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error posting comment:", error);
    return NextResponse.json(
      { message: "Failed to post comment", error: error.message },
      { status: 500 }
    );
  }
}
