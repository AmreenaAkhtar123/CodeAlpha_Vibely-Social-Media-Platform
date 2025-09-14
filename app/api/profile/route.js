import { authenticate } from "@/lib/middleware"; // adjust path if needed
import connectDB from "@/lib/mongodb";
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
