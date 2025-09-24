import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { NextResponse } from "next/server";
import mongoose from "mongoose";  // ✅ add this
import jwt from "jsonwebtoken";

export async function GET(req, context) {
  try {
    await connectDB();
    const { id } = await context.params; // ✅ await required here

    const comments = await Comment.find({ post: id })
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(req, context) {
  try {
    await connectDB();
    const { id } = await context.params; // postId

    // ✅ read token
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // ✅ parse body (only text needed)
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "Comment text is required" }, { status: 400 });
    }

    const newComment = await Comment.create({
      post: id,
      user: decoded.id, // user from JWT
      text,
    });

    // (optional) update Post’s commentsCount if you track it
    await Post.findByIdAndUpdate(id, { $inc: { commentsCount: 1 } });

    return NextResponse.json(newComment, { status: 201 });
  } catch (err) {
    console.error("POST /comments error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
