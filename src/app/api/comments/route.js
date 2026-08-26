import connectMongoDb from "@/libs/mongodb";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/libs/auth";

// GET /api/comments — admin only, all comments across all blogs, newest first
export async function GET(request) {
  try {
    if (!getAdminFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDb();

    const comments = await Comment.find({})
      .populate("blog", "title slug")
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching all comments:", error);
    return NextResponse.json(
      { message: "Failed to fetch comments", error: error.message },
      { status: 500 }
    );
  }
}
