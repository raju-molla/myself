import mongoose, { Schema } from "mongoose";

// Generic content store: one document per site "section" (hero, about, skills, …).
// `data` is intentionally schemaless (Mixed) so the admin Content Manager can
// edit the shape of any section without a migration every time a field is added.
const siteContentSchema = new Schema(
  {
    section: { type: String, required: true, unique: true, trim: true, lowercase: true },
    data: { type: Schema.Types.Mixed, required: true, default: {} },
  },
  {
    timestamps: true,
  }
);

const SiteContent =
  mongoose.models.SiteContent || mongoose.model("SiteContent", siteContentSchema);

export default SiteContent;
