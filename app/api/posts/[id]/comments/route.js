import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params; // post ID

    const comments = await Comment.find({ post: id })
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
