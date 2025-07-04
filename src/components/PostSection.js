"use client";
import PostCards from "./PostCards";

export default function PostSection({ posts = [], isMobile = false }) {
  if (isMobile) {
    return (
      <div className="px-4">
        <div className="bg-[#2a2a2a] rounded-2xl p-4 flex flex-col gap-4">
          {posts.length === 0 ? (
            <p className="text-sm text-gray-400 text-center">No posts yet.</p>
          ) : (
            posts.map((post) => <PostCards key={post.id} post={post} />)
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-4 bg-[#2a2929] rounded-xl p-4 flex flex-col gap-4 hover:bg-[#323232] hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
      {posts.length === 0 ? (
        <p className="text-sm text-gray-400 text-center">No posts yet.</p>
      ) : (
        posts.map((post) => <PostCards key={post.id} post={post} />)
      )}
    </div>
  );
}
