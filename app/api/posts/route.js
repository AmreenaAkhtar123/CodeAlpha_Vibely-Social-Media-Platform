import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { authenticate } from "@/lib/middleware";

export async function POST(req) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    if (auth.error) {
      return new Response(JSON.stringify({ error: auth.error }), { status: auth.status });
    }

    const { caption, image } = await req.json();

    const newPost = await Post.create({
      caption,
      image,
      user: auth.user.id,
    });

    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
