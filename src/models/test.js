import mongoose, { Schema } from "mongoose";

const testchema = new Schema(
  {
    title: String,
    des: String,
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.models.Test || mongoose.model("Test", testchema);


export default Test;