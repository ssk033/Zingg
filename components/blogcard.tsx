"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface BlogCardProps {
  blogId: number;
  authorname: string;
  title: string;
  content: string;
  initialLikes: number;
  onViewComments: () => void; // ✅ show comment sidebar
}

export const Blogcard = ({
  blogId,
  authorname,
  title,
  content,
  initialLikes,
  onViewComments,
}: BlogCardProps) => {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const [commentOpen, setCommentOpen] = useState(false); // ✅ comment modal
  const [commentText, setCommentText] = useState("");

  // ✅ check user already liked
  useEffect(() => {
    const checkUserLiked = async () => {
      try {
        const res = await axios.get(`/api/blog/like?blogId=${blogId}`);
        setLiked(res.data.liked);
      } catch (err) {
        console.error("❌ Error checking like:", err);
      }
    };
    checkUserLiked();
  }, [blogId]);

  // ✅ toggle like
  const toggleLike = async () => {
    try {
      const res = await axios.post("/api/blog/like", { blogId });

      if (res.data.liked) {
        setLiked(true);
        setLikes((prev) => prev + 1);
      } else {
        setLiked(false);
        setLikes((prev) => prev - 1);
      }
    } catch (err) {
      console.error("❌ Like toggle error:", err);
    }
  };

  // ✅ post comment
  const submitComment = async () => {
    if (!commentText.trim()) return;

    try {
      await axios.post("/api/blog/comment", {
        blogId,
        content: commentText,
      });

      setCommentText("");
      setCommentOpen(false);
      alert("✅ Comment added!");
    } catch (err) {
      console.error("❌ Comment error:", err);
    }
  };

  return (
    <>
      <div className="relative w-full max-w-3xl mx-auto group">

        {/* glow under card */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[95%] h-[8px]
          bg-white opacity-30 blur-xl group-hover:blur-2xl group-hover:opacity-80 rounded-full transition-all duration-500" />

        <div className="border border-gray-300 p-6 flex flex-col rounded-xl bg-white shadow-lg transition
          group-hover:shadow-[0px_8px_50px_rgba(255,255,255,0.5)] group-hover:scale-[1.03] duration-500">

          {/* Header → Author + 3 dots */}
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="relative inline-flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full shadow-md">
                <span className="font-bold text-gray-700 text-lg">
                  {authorname.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="text-md text-gray-600 font-semibold">{authorname}</div>
            </div>

            {/* ✅ 3 DOTS → OPEN SIDEBAR */}
            <button
              onClick={onViewComments}
              className="p-2 text-gray-600 hover:bg-black hover:text-white rounded-full transition"
            >
              ⋮
            </button>
          </div>

          {/* Title */}
          <div className="text-3xl font-bold text-gray-800 mt-4 group-hover:text-gray-900 transition-all duration-300">
            {title}
          </div>

          {/* Content */}
          <div className="text-base text-gray-600 mt-3 overflow-hidden text-ellipsis line-clamp-3">
            {content}
          </div>

          {/* Footer */}
          <div className="mt-5 flex justify-between items-center">
            <div className="text-sm text-gray-500">{today}</div>

            <div className="flex items-center gap-3">

              {/* ❤️ Like */}
              <button
                onClick={toggleLike}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border
                  ${liked
                    ? "bg-black text-white shadow-[0_0_15px_white]"
                    : "bg-white text-gray-700 hover:bg-black hover:text-white hover:shadow-[0_0_15px_white]"}
                  transition-all duration-300`}
              >
                {liked ? "❤️ Liked" : "🤍 Like"} ({likes})
              </button>

              {/* ✅ 💬 Comment button */}
              <button
                onClick={() => setCommentOpen(true)}
                className="
                  flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg
                  border border-gray-300 text-gray-700 bg-white
                  hover:bg-black hover:text-white hover:shadow-[0_0_15px_white]
                  transition-all duration-300
                "
              >
                💬 Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ ADD COMMENT MODAL */}
      {commentOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex justify-center items-center z-50">
          <div className="bg-white/10 border border-white/40 p-8 rounded-xl w-[450px] text-white shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Add Comment 💬</h2>

            <textarea
              className="w-full h-32 p-3 bg-black/40 border border-white/40 rounded-lg mb-6 outline-none focus:border-white"
              placeholder="Write comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setCommentOpen(false)}
                className="px-4 py-2 rounded-lg border border-white/40 hover:bg-white hover:text-black transition"
              >
                Cancel
              </button>

              <button
                onClick={submitComment}
                className="px-4 py-2 rounded-lg bg-white text-black hover:scale-105 transition"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
