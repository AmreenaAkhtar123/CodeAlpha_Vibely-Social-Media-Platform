import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().populate("user", "username avatar");
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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

    return NextResponse.json(newPost);
  } catch (err) {
    console.error("Post creation error:", err);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
