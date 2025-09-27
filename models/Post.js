import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    image: { type: String }, //  add this for base64 or URL
    //  Store actual user IDs
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],

    //  Keep track of number of comments
    commentsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
