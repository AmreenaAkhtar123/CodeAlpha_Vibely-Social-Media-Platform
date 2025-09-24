// app/api/auth/me/route.js
import { getServerSession } from "next-auth"; // if using next-auth
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(); // or however you auth

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email }).select(
      "_id username profilePic email"
    );

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
