import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    image: { type: String }, // ✅ add this for base64 or URL
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
