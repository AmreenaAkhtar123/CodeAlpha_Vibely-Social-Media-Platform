import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params; // post ID
    const { userId } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID required" }), { status: 400 });
    }

    const post = await Post.findById(id);
    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    // Toggle like
    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    return new Response(JSON.stringify({ message: "Like updated", likes: post.likes.length }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
