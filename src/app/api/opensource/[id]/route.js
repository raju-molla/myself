import connectMongoDb from "@/libs/mongodb";
import OpenSource from "@/models/openSource";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getAdminFromRequest } from "@/libs/auth";

async function findProject(id) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    const byId = await OpenSource.findById(id);
    if (byId) return byId;
  }
  return OpenSource.findOne({ slug: id });
}

// GET /api/opensource/:id
export async function GET(request, { params }) {
  try {
    await connectMongoDb();
    const { id } = await params;

    const project = await findProject(id);
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { message: "Failed to fetch project", error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/opensource/:id
export async function PUT(request, { params }) {
  try {
    if (!getAdminFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDb();
    const { id } = await params;
    const body = await request.json();

    const project = await findProject(id);
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    const updatable = [
      "title", "slug", "description", "readme", "repoUrl", "liveUrl",
      "coverImage", "techStack", "stars", "license", "status", "featured",
    ];
    for (const key of updatable) {
      if (body[key] !== undefined) {
        project[key] = key === "techStack" && !Array.isArray(body[key])
          ? (body[key] || "").split(",").map((t) => t.trim()).filter(Boolean)
          : body[key];
      }
    }

    await project.save();

    return NextResponse.json({ message: "Project updated", project }, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { message: "Failed to update project", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/opensource/:id
export async function DELETE(request, { params }) {
  try {
    if (!getAdminFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDb();
    const { id } = await params;

    const project = await findProject(id);
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    await project.deleteOne();

    return NextResponse.json({ message: "Project deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { message: "Failed to delete project", error: error.message },
      { status: 500 }
    );
  }
}
