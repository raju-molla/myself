import connectMongoDb from "@/libs/mongodb";
import SiteContent from "@/models/siteContent";
import { NextResponse } from "next/server";
import { SITE_CONTENT_DEFAULTS, SITE_CONTENT_SECTIONS } from "@/libs/siteContentDefaults";

// GET /api/content — returns every section, using saved data where it exists
// and falling back to the built-in defaults otherwise. Public (read-only).
export async function GET() {
  try {
    await connectMongoDb();

    const saved = await SiteContent.find({}).lean();
    const savedBySection = Object.fromEntries(saved.map((s) => [s.section, s.data]));

    const sections = SITE_CONTENT_SECTIONS.map((section) => ({
      section,
      data: savedBySection[section] ?? SITE_CONTENT_DEFAULTS[section],
      isCustomized: section in savedBySection,
    }));

    return NextResponse.json({ sections }, { status: 200 });
  } catch (error) {
    console.error("Error fetching site content:", error);
    return NextResponse.json(
      { message: "Failed to fetch site content", error: error.message },
      { status: 500 }
    );
  }
}
