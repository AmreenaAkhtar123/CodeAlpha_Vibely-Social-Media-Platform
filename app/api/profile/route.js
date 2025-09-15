import { authenticate } from "@/lib/middleware"; // adjust path if needed
import {connectDB} from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
  try {
    // 🔑 Authenticate request
    const { user, error, status } = await authenticate(req);

    if (error) {
      return new Response(JSON.stringify({ error }), { status });
    }

    // ✅ Connect DB
    await connectDB();

    // 🧑 Fetch user by decoded ID
    const dbUser = await User.findById(user.id).select("-password"); // exclude password

    if (!dbUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ user: dbUser }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
export async function PUT(req) {
  try {
    const { user, error, status } = await authenticate(req);
    if (error) {
      return new Response(JSON.stringify({ error }), { status });
    }

    await connectDB();
    const body = await req.json();
    const { bio, profilePic } = body;

    // ✅ update bio and profilePic
    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      {
        bio: bio ?? undefined,
        profilePic: profilePic ?? undefined,
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ user: updatedUser }), { status: 200 });
  } catch (err) {
    console.error("Profile update error:", err);
    return new Response(JSON.stringify({ error: "Failed to update profile" }), { status: 500 });
  }
}
