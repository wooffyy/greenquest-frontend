// components/PostCards.js
import { useState } from "react";
import Report from "./Report";
import { FiFlag } from "react-icons/fi";
import { likePost, dislikePost } from "@/lib/api_post";

function Like({ liked, setLiked, disliked, setDisliked, postId }) {
  const handleLike = async () => {
    try {
      await likePost(postId);
      setLiked(!liked);
      if (disliked) setDisliked(false);
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  return (
    <button onClick={handleLike} className="flex items-center gap-1">
      <img
        src={liked ? "/liked.svg" : "/like.svg"}
        alt="like icon"
        className="w-4 h-4"
      />
      <span className={liked ? "text-black" : "text-gray-600"}>Likes</span>
    </button>
  );
}

function Dislike({ disliked, setDisliked, liked, setLiked, postId }) {
  const handleDislike = async () => {
    try {
      await dislikePost(postId);
      setDisliked(!disliked);
      if (liked) setLiked(false);
    } catch (err) {
      console.error("Failed to dislike post:", err);
    }
  };

  return (
    <button onClick={handleDislike} className="flex items-center gap-1">
      <FiFlag className="w-4 h-4"/>
      <span className={disliked ? "text-black" : "text-gray-600"}>Dislikes</span>
    </button>
  );
}

function ReportButton({ post }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-sm text-gray-600 flex items-center gap-1">
        <img src="/reportflag.svg" alt="report flag" className="w-4 h-4" />
        Report
      </button>
      {isOpen && (
        <Report
          postId={post.id}
          username={post.user.username}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default function PostCards({ post }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  return (
    <div className="bg-white text-black rounded-xl p-4">
      {/* User Info */}
      <div className="flex items-center gap-2 mb-2">
        <img
          src={post.user.profilePicture}
          alt={post.user.username}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="font-medium">{post.user.username}</span>
        <span className="text-sm text-gray-600 ml-auto right-4"><ReportButton post={post} /></span>
      </div>

      {/* Caption */}
      <p className="mb-4">{post.caption}</p>

      {/* Image */}
      <img
        src={post.imageUrl}
        alt="post"
        className="w-full h-64 object-cover rounded-lg"
      />

      {/* Like/Dislike */}
      <div className="flex gap-6 mt-4 text-sm text-gray-600">
        <Like liked={liked} setLiked={setLiked} disliked={disliked} setDisliked={setDisliked} postId={post.id} />
        <Dislike disliked={disliked} setDisliked={setDisliked} liked={liked} setLiked={setLiked} postId={post.id} />
      </div>
    </div>
  );
}
