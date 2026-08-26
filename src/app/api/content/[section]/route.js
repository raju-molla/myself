import connectMongoDb from "@/libs/mongodb";
import SiteContent from "@/models/siteContent";
import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/libs/auth";
import { SITE_CONTENT_DEFAULTS } from "@/libs/siteContentDefaults";

// GET /api/content/:section — public, falls back to defaults if not customized yet
export async function GET(request, { params }) {
  try {
    await connectMongoDb();
    const { section } = await params;

    const doc = await SiteContent.findOne({ section }).lean();
    const data = doc?.data ?? SITE_CONTENT_DEFAULTS[section];

    if (data === undefined) {
      return NextResponse.json({ message: "Unknown section" }, { status: 404 });
    }

    return NextResponse.json(
      { section, data, isCustomized: !!doc },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching content section:", error);
    return NextResponse.json(
      { message: "Failed to fetch content", error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/content/:section — admin only. Upserts the full `data` blob for a section.
export async function PUT(request, { params }) {
  try {
    if (!getAdminFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDb();
    const { section } = await params;
    const { data } = await request.json();

    if (data === undefined) {
      return NextResponse.json({ message: "Missing data payload" }, { status: 400 });
    }

    const doc = await SiteContent.findOneAndUpdate(
      { section },
      { $set: { data } },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: "Content updated", section, data: doc.data }, { status: 200 });
  } catch (error) {
    console.error("Error updating content section:", error);
    return NextResponse.json(
      { message: "Failed to update content", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/content/:section — admin only. Resets a section back to the built-in default.
export async function DELETE(request, { params }) {
  try {
    if (!getAdminFromRequest(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDb();
    const { section } = await params;

    await SiteContent.deleteOne({ section });

    return NextResponse.json(
      { message: "Section reset to default", section, data: SITE_CONTENT_DEFAULTS[section] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting content section:", error);
    return NextResponse.json(
      { message: "Failed to reset content", error: error.message },
      { status: 500 }
    );
  }
}
