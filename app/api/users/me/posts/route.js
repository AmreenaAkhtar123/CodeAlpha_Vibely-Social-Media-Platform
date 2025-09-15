import {connectDB} from "@/lib/mongodb";
import Post from "@/models/Post";
import { authenticate } from "@/lib/middleware";

export async function GET(req) {
  try {
    const { user, error, status } = await authenticate(req);
    if (error) {
      return new Response(JSON.stringify({ error }), { status });
    }

    await connectDB();

    const posts = await Post.find({ user: user.id })
      .sort({ createdAt: -1 }) // newest first
      .populate("user", "username profilePic"); // populate user data

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.error("User posts fetch error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch posts" }), { status: 500 });
  }
}
