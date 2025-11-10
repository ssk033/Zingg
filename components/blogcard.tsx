"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface BlogCardProps {
  blogId: number;
  authorname: string;
  title: string;
  content: string;
  initialLikes: number;
  onViewComments: () => void;
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

  const [commentOpen, setCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  // Menu state for hover popup
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ check already liked
  useEffect(() => {
    axios
      .get(`/api/blog/like?blogId=${blogId}`)
      .then((res) => setLiked(res.data.liked))
      .catch((err) => console.error("❌ Error checking like:", err));
  }, [blogId]);

  // ✅ Optimistic like update
  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));

    axios
      .post("/api/blog/like", { blogId })
      .then((res) => setLiked(!!res.data.liked))
      .catch((err) => {
        setLiked((prev) => !prev);
        setLikes((prev) => (liked ? prev + 1 : prev - 1));
      });
  };

  const submitComment = () => {
    if (!commentText.trim()) return;

    axios
      .post("/api/blog/comment", {
        blogId,
        content: commentText,
      })
      .then(() => {
        setCommentText("");
        setCommentOpen(false);
        alert("✅ Comment added!");
      });
  };

  return (
    <>
      <div className="relative w-full max-w-3xl mx-auto group">

        {/* ⭐ Neon behind card */}
        <div className="pointer-events-none absolute inset-0 -z-10 blur-3xl flex justify-center">
          <div
            className="w-[90%] h-[90%] opacity-40 rounded-3xl group-hover:opacity-90 transition"
            style={{
              background: "radial-gradient(circle, rgba(39,180,245,0.35), transparent 70%)",
              filter: "blur(55px)",
            }}
          />
        </div>

        {/* ⭐ Card */}
        <div
          className="
            border p-7 rounded-2xl
            shadow-lg transition-transform duration-500
            group-hover:shadow-[0_0_50px_rgba(39,180,245,0.8)]
            group-hover:scale-[1.03]
          "
          style={{
            backgroundColor: "#0B0E10",
            borderColor: "#27B4F5",
          }}
        >

          {/* ================= HEADER ================= */}
          <div className="flex justify-between items-start relative">

            {/* LEFT → AUTHOR */}
            <div className="flex items-center space-x-4">
              <div
                className="
                  inline-flex items-center justify-center
                  w-12 h-12 rounded-full bg-[#0B0E10]
                  ring-2 ring-[#27B4F5]
                  shadow-[0_0_25px_rgba(39,180,245,0.6)]
                "
              >
                <span className="font-semibold text-white tracking-wide">
                  {authorname.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="text-sm text-gray-300">{authorname}</div>
            </div>

            {/* RIGHT → 3 DOTS MENU */}
            <div
              className="relative"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                className="px-2 py-1 text-[#27B4F5] hover:bg-[#27B4F5]/20 rounded-full transition"
              >
                ⋮
              </button>

              {/* ⭐ POPUP MENU (glassmorphic) */}
              {menuOpen && (
                <div
                  className="
                    absolute right-0 top-6 w-40 rounded-xl px-3 py-2 z-50
                    backdrop-blur-xl
                    bg-[#0B0E10]/80
                    border border-[#27B4F5]/40
                    shadow-[0_0_20px_rgba(39,180,245,0.6)]
                    animate-fadeSlideIn
                  "
                >
                  <button
                    onClick={() => {
                      onViewComments();
                      setMenuOpen(false); // auto close
                    }}
                    className="
                      w-full text-left px-3 py-2 rounded-lg text-gray-200
                      hover:bg-[#27B4F5] hover:text-black transition
                    "
                  >
                    Show Comments 💬
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ================= TITLE ================= */}
          <h2 className="text-3xl font-bold text-white mt-5 group-hover:text-[#27B4F5] transition">
            {title}
          </h2>

          {/* ================= CONTENT ================= */}
          <p className="text-base text-gray-400 mt-3 line-clamp-3">
            {content}
          </p>

          {/* ================= FOOTER ================= */}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-xs text-gray-500">{today}</div>

            <div className="flex items-center gap-3">
              {/* ❤️ LIKE */}
              <button
                onClick={toggleLike}
                className={`
                  flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg border
                  ${
                    liked
                      ? "bg-[#27B4F5] text-black shadow-[0_0_20px_rgba(39,180,245,0.8)] border-transparent"
                      : "bg-[#0B0E10] text-gray-200 border-[#27B4F5] hover:bg-[#27B4F5] hover:text-black"
                  }
                `}
              >
                {liked ? "❤️ Liked" : "🤍 Like"} ({likes})
              </button>

              {/* 💬 COMMENT SVG BUTTON */}
              <button
                onClick={() => setCommentOpen(true)}
                className="
                  flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg
                  border border-[#27B4F5] text-gray-200
                  hover:bg-[#27B4F5] hover:text-black transition
                "
              >
                <img src="/icons/comment.svg" className="w-5 h-5" />
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COMMENT MODAL ================= */}
      {commentOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50">
          <div
            className="p-8 rounded-xl w-[450px]"
            style={{
              backgroundColor: "#0B0E10",
              border: "1px solid #27B4F5",
              boxShadow: "0 0 45px rgba(39,180,245,0.5)",
            }}
          >
            <h2 className="text-2xl font-bold text-white">Add Comment 💬</h2>

            <textarea
              className="
                w-full h-32 mt-5 p-4 text-gray-200 rounded-lg outline-none
                bg-transparent border border-[#27B4F5]/40
                focus:border-[#27B4F5] focus:shadow-[0_0_12px_rgba(39,180,245,0.6)]
              "
              placeholder="Write comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <div className="flex justify-end gap-4 mt-5">
              <button
                onClick={() => setCommentOpen(false)}
                className="px-4 py-2 rounded-lg border border-[#27B4F5]/50 text-gray-300 hover:bg-[#27B4F5]/20 transition"
              >
                Cancel
              </button>

              <button
                onClick={submitComment}
                className="px-4 py-2 rounded-lg bg-[#27B4F5] text-black font-semibold hover:scale-105 transition"
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
