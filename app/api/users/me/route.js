import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { authenticate } from "@/lib/middleware";

// ✅ GET: Fetch logged-in user profile
export async function GET(req) {
  try {
    const { user, error, status } = await authenticate(req);
    if (error) {
      return new Response(JSON.stringify({ error }), { status });
    }

    await connectDB();
    const dbUser = await User.findById(user.id).select("-password");

    if (!dbUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(dbUser), { status: 200 });
  } catch (err) {
    console.error("Profile GET error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

// ✅ PUT: Update profile (bio, avatar)
export async function PUT(req) {
  try {
    const { user, error, status } = await authenticate(req);
    if (error) {
      return new Response(JSON.stringify({ error }), { status });
    }

    await connectDB();

    const body = await req.json();
    const { bio, avatar } = body;

    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      { bio, avatar },
      { new: true }
    ).select("-password"); // don’t return password

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    console.error("Profile update error:", err);
    return new Response(JSON.stringify({ error: "Failed to update profile" }), { status: 500 });
  }
}