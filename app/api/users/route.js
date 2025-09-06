// app/api/users/route.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

// Handle POST (Register User)
export async function POST(req) {
  try {
    await connectDB();

    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({ error: "All fields required" }),
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already exists" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // build clean response (exclude password, __v)
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      bio: newUser.bio,
      profilePic: newUser.profilePic,
      followers: newUser.followers,
      following: newUser.following,
      createdAt: newUser.createdAt,
    };

    return new Response(
      JSON.stringify({ message: "User created", user: userResponse }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

// Handle GET (Fetch all users)
export async function GET() {
  try {
    await connectDB();

    // only select safe fields
    const users = await User.find().select("username email bio profilePic followers following createdAt");

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
