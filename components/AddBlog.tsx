"use client";

import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";

type AddProps = {
  onClose: () => void;
  onBlogAdded: () => void;
};

export default function Add({ onClose, onBlogAdded }: AddProps) {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 250);
  };

  const handlePost = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and Content are required");
      return;
    }

    if (!session?.user?.id) {
      alert("You must be logged in to post a blog.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/blog", {
        title,
        content,
        authorID: session.user.id, // ✅ STRING id jaa rahi hai
      });

      console.log("✅ SERVER RESPONSE:", res.data);

      if (res.status === 201) {
        onBlogAdded();
        handleClose();
        setTitle("");
        setContent("");
      }
    } catch (error: any) {
      console.log("❌ POST ERROR:", error?.response?.data || error?.message);
      alert(error?.response?.data?.error || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/70 backdrop-blur-xl flex justify-center items-center z-50 
      transition-all duration-300 ${isClosing ? "opacity-0 translate-y-5" : "opacity-100"}`}
    >
      <div
        className={`relative w-full max-w-2xl p-8 bg-black/40 border border-white/25 rounded-2xl
        shadow-[0_0_35px_rgba(255,255,255,0.4)] backdrop-blur-xl transition-all duration-300
        ${isClosing ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-white text-2xl hover:scale-125 transition"
        >
          ✖
        </button>

        <div className="text-4xl font-black italic text-center mb-8 text-white drop-shadow-[0_0_25px_white]">
          Add Blog ✍️
        </div>

        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 bg-transparent border border-white/40 text-white rounded-lg mb-6
          focus:border-white focus:shadow-[0_0_20px_white] outline-none transition-all duration-300"
          disabled={loading}
          required
        />

        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-56 p-3 bg-transparent border border-white/40 text-white rounded-lg mb-8
          focus:border-white focus:shadow-[0_0_20px_white] outline-none transition-all duration-300"
          disabled={loading}
          required
        />

        {loading ? (
          <div className="flex justify-center py-3">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <button
            onClick={handlePost}
            className="w-full py-2.5 text-black font-semibold rounded-full bg-white
            hover:shadow-[0_0_25px_white] hover:scale-[1.05] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Post
          </button>
        )}
      </div>
    </div>
  );
}
