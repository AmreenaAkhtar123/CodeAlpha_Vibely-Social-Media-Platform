import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PUT(req, context) {
  try {
    await connectDB();

    // ✅ Await params in Next.js 15
    const { id } = await context.params;

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id || decoded._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    post.likes = post.likes || [];
    const objectId = new mongoose.Types.ObjectId(userId);

    const alreadyLiked = post.likes.some((likeId) => likeId.equals(objectId));
    if (alreadyLiked) {
      post.likes = post.likes.filter((likeId) => !likeId.equals(objectId));
    } else {
      post.likes.push(objectId);
    }

    await post.save();

    return NextResponse.json({
      message: "Like updated",
      likes: post.likes.length,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

