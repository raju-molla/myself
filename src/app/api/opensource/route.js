import connectMongoDb from "@/libs/mongodb";
import OpenSource from "@/models/openSource";
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

// GET /api/opensource?status=published&featured=true
export async function GET(request) {
  try {
    await connectMongoDb();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);

    const query = {};
    if (status) query.status = status;
    if (featured === "true") query.featured = true;

    const [projects, total] = await Promise.all([
      OpenSource.find(query)
        .sort({ featured: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      OpenSource.countDocuments(query),
    ]);

    return NextResponse.json(
      { projects, total, page, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching open source projects:", error);
    return NextResponse.json(
      { message: "Failed to fetch projects", error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/opensource
export async function POST(request) {
  try {
    if (!getAdminFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDb();

    const body = await request.json();
    const {
      title,
      description,
      readme,
      repoUrl,
      liveUrl,
      coverImage,
      techStack,
      stars,
      license,
      status,
      featured,
    } = body;

    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required" },
        { status: 400 }
      );
    }

    let slug = body.slug ? slugify(body.slug) : slugify(title);
    let uniqueSlug = slug;
    let counter = 1;
    while (await OpenSource.exists({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${counter}`;
      counter += 1;
    }

    const project = await OpenSource.create({
      title,
      slug: uniqueSlug,
      description,
      readme,
      repoUrl,
      liveUrl,
      coverImage,
      techStack: Array.isArray(techStack)
        ? techStack
        : (techStack || "").split(",").map((t) => t.trim()).filter(Boolean),
      stars: stars || 0,
      license: license || "MIT",
      status: status || "draft",
      featured: !!featured,
    });

    return NextResponse.json(
      { message: "Project created", project },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { message: "Failed to create project", error: error.message },
      { status: 500 }
    );
  }
}
