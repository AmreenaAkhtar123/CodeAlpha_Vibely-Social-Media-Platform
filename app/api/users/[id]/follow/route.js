import { connectDB } from "@/lib/mongodb.js";
import User from "@/models/User";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params; // the user to be followed/unfollowed
    const { currentUserId } = await req.json();

    if (!currentUserId) {
      return new Response(JSON.stringify({ error: "Current user ID required" }), { status: 400 });
    }

    if (currentUserId === id) {
      return new Response(JSON.stringify({ error: "You cannot follow yourself" }), { status: 400 });
    }

    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow || !currentUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Toggle follow/unfollow
    if (userToFollow.followers.includes(currentUserId)) {
      // Unfollow
      userToFollow.followers.pull(currentUserId);
      currentUser.following.pull(id);
      await userToFollow.save();
      await currentUser.save();

      return new Response(JSON.stringify({ message: "Unfollowed user" }), { status: 200 });
    } else {
      // Follow
      userToFollow.followers.push(currentUserId);
      currentUser.following.push(id);
      await userToFollow.save();
      await currentUser.save();

      return new Response(JSON.stringify({ message: "Followed user" }), { status: 200 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
