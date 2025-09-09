// app/api/posts/route.js
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function POST(req) {
  try {
    await connectDB();
    const { userId, user, text, image } = await req.json();

    // prefer userId, fallback to user
    const userRef = userId || user;
    if (!userRef || !text) {
      return new Response(
        JSON.stringify({ error: "user and text are required" }),
        { status: 400 }
      );
    }

    const newPost = await Post.create({ user: userRef, text, image });
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().populate("user", "username profilePic");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
