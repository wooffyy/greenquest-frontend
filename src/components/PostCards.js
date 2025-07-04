import { useState } from "react";
import Report from "./Report";
import {
  incLike,
  decLike,
  incDislike,
  decDislike,
} from "@/lib/api_post";

function LikeButton({ liked, likeCount, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1">
      <img
        src={liked ? "/liked.svg" : "/like.svg"}
        alt="like icon"
        className="w-4 h-4"
      />
      <span className={liked ? "text-black" : "text-gray-600"}>
        {likeCount} Likes
      </span>
    </button>
  );
}

function DislikeButton({ disliked, dislikeCount, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1">
      <img
        src={disliked ? "/disliked.svg" : "/dislike.svg"}
        alt="dislike icon"
        className="w-4 h-4"
      />
      <span className={disliked ? "text-black" : "text-gray-600"}>
        {dislikeCount} Dislikes
      </span>
    </button>
  );
}

function ReportButton({ post, user }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-gray-600 flex items-center gap-1"
      >
        <img src="/reportflag.svg" alt="report flag" className="w-4 h-4" />
        Report
      </button>
      {isOpen && (
        <Report
          postId={post.id}
          username={user?.username}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default function PostCards({ post, user }) {
  // Add this debugging
  console.log('PostCards props:', { post, user });
  console.log('User username:', user?.username);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [dislikeCount, setDislikeCount] = useState(post.dislikes);

  const handleLike = async () => {
    try {
      if (liked) {
        await decLike(post.id);
        setLikeCount((prev) => prev - 1);
        setLiked(false);
      } else {
        await incLike(post.id);
        setLikeCount((prev) => prev + 1);
        setLiked(true);
        if (disliked) {
          await decDislike(post.id);
          setDislikeCount((prev) => prev - 1);
          setDisliked(false);
        }
      }
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  const handleDislike = async () => {
    try {
      if (disliked) {
        await decDislike(post.id);
        setDislikeCount((prev) => prev - 1);
        setDisliked(false);
      } else {
        await incDislike(post.id);
        setDislikeCount((prev) => prev + 1);
        setDisliked(true);
        if (liked) {
          await decLike(post.id);
          setLikeCount((prev) => prev - 1);
          setLiked(false);
        }
      }
    } catch (err) {
      console.error("Failed to dislike post:", err);
    }
  };

  return (
    <div className="bg-white text-black rounded-xl p-4">
    {/* User Info */}
      <div className="flex items-center gap-2 mb-2">
        {user?.photo ? (
          <img
            src={`data:image/jpeg;base64,${user.photo}`}
            alt={user?.username}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <img src="/pfp.svg" className="w-8 h-8 p-2 rounded-full bg-black" />
        )}
        <span className="font-medium text-black">{user?.username}</span>
        <div className="text-sm text-gray-600 ml-auto right-4">
          <ReportButton post={post} user={user} />
        </div>
      </div>

      {/* Caption */}
      <p className="mt-4 mb-4">{post.caption}</p>

      {/* Image */}
      <img
        src={`http://localhost:8000/storage/${post.image_url}`}
        alt="post"
        className="w-[400px] h-[400px] mx-auto object-cover scale-95 hover:scale-100 transition-transform duration-300 rounded-lg"
      />

      {/* Like / Dislike */}
      <div className="flex gap-6 mt-4 text-sm text-gray-600">
        <LikeButton
          liked={liked}
          likeCount={likeCount}
          onClick={handleLike}
        />
        <DislikeButton
          disliked={disliked}
          dislikeCount={dislikeCount}
          onClick={handleDislike}
        />
      </div>
    </div>
  );
}
