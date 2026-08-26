import mongoose, { Schema } from "mongoose";

const openSourceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, required: true, trim: true, maxlength: 400 },
    readme: { type: String, trim: true },
    repoUrl: { type: String, trim: true },
    liveUrl: { type: String, trim: true },
    coverImage: { type: String, trim: true },
    techStack: { type: [String], default: [] },
    stars: { type: Number, default: 0 },
    license: { type: String, default: "MIT" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

openSourceSchema.index({ slug: 1 });
openSourceSchema.index({ status: 1, featured: -1, createdAt: -1 });

const OpenSource =
  mongoose.models.OpenSource || mongoose.model("OpenSource", openSourceSchema);

export default OpenSource;
