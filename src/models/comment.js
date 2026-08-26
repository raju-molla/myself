import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true, index: true },
    parent: { type: Schema.Types.ObjectId, ref: "Comment", default: null, index: true },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, trim: true, maxlength: 120 }, // never exposed publicly
    message: { type: String, required: true, trim: true, maxlength: 2000 },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
