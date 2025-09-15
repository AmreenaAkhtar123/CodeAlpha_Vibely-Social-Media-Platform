import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    // ✅ Populate user data with profilePic + username
    const posts = await Post.find()
      .populate("user", "username profilePic") // only fetch these fields
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.error("Posts fetch error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch posts" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Parse formData
    const formData = await req.formData();
    const content = formData.get("content");
    const file = formData.get("image");

    let imageBase64 = null;

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      imageBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;
    }

    const newPost = await Post.create({
      user: decoded.id,
      content,
      image: imageBase64,
    });

    // ✅ populate before sending back
    const populatedPost = await newPost.populate("user", "username avatar");

    return NextResponse.json(populatedPost);
  } catch (err) {
    console.error("Post creation error:", err);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
