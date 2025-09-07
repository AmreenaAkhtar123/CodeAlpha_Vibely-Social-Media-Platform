import PostCard from "@/components/PostCard";

const samplePosts = [
  {
    id: "p1",
    username: "meena",
    content: "Hello world! This is my first post 🎉",
    likes: 3,
    comments: 1,
  },
  {
    id: "p2",
    username: "john_doe",
    content: "Beautiful sunset today 🌅",
    likes: 5,
    comments: 2,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-6 mt-6">
      {samplePosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
