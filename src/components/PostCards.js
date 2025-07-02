import { useState } from "react";
import Report from "./Report";

function Like({ liked, setLiked, disliked, setDisliked }) {
  return (
    <button
      onClick={() => {
        setLiked(!liked);
        if (disliked) setDisliked(false); // turn off dislike if like is clicked
      }}
      className="flex items-center gap-1"
    >
      <img
        src={liked ? "/liked.svg" : "/like.svg"}
        alt="like icon"
        className="w-4 h-4"
      />
      <span className={liked ? "text-black" : "text-gray-600"}>Likes</span>
    </button>
  );
}

function Dislike({ disliked, setDisliked, liked, setLiked }) {
  return (
    <button
      onClick={() => {
        setDisliked(!disliked);
        if (liked) setLiked(false); // turn off like if dislike is clicked
      }}
      className="flex items-center gap-1"
    >
      <img
        src={disliked ? "/disliked.svg" : "/dislike.svg"}
        alt="dislike icon"
        className="w-4 h-4"
      />
      <span className={disliked ? "text-black" : "text-gray-600"}>Dislikes</span>
    </button>
  );
}

function ReportButton({ report }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button onClick={handleClick} className="text-sm text-gray-600 flex items-center gap-1">
        <img src="/reportflag.svg" alt="report flag" className="w-4 h-4" />
        Report
      </button>
      {isOpen && <Report isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
}

export default function PostCards() {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  return (
    <div className="bg-white text-black rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-[#89F336] text-black flex items-center justify-center font-semibold">B</div>
        <span className="font-medium">Bobby</span>
        <span className="text-sm text-gray-600 ml-auto right-4"><ReportButton /></span>
      </div>
      <p className="mb-4">Today I turn off the lights to save energy</p>
      
      <div className="w-full h-32 bg-blue-100 rounded-lg flex items-end justify-center" />
      <div className="flex gap-6 mt-4 text-sm text-gray-600">
        <Like liked={liked} setLiked={setLiked} disliked={disliked} setDisliked={setDisliked} />
        <Dislike disliked={disliked} setDisliked={setDisliked} liked={liked} setLiked={setLiked} />
      </div>
    </div>
  );
}
