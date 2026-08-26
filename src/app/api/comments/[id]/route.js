import connectMongoDb from "@/libs/mongodb";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/libs/auth";

// DELETE /api/comments/:id — admin only, also removes any replies to this comment
export async function DELETE(request, { params }) {
  try {
    if (!getAdminFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDb();
    const { id } = await params;

    const comment = await Comment.findById(id);
    if (!comment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 });
    }

    await Comment.deleteMany({ $or: [{ _id: id }, { parent: id }] });

    return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { message: "Failed to delete comment", error: error.message },
      { status: 500 }
    );
  }
}
