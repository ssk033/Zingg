"use client";

import axios from "axios";
import { useState } from "react";
type AddProps = {
  onClose: () => void;
  onBlogAdded: () => void;
};

export function Add({ onClose, onBlogAdded }: AddProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  };

  const handlePost = async () => {
    setLoading(true);

    try {
      const response = await axios.post("/api/blog", {
        title,
        content,
        authorID: 13, // as per prisma schema
      });

      if (response.status === 201) {
        setLoading(false);
        handleClose();      // close popup
        onBlogAdded();      // auto-refresh blogs in parent (no reload)
      }
    } catch (err) {
      console.log("POST FAILED ❌", err);
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
          title="Close"
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
        />

        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-56 p-3 bg-transparent border border-white/40 text-white rounded-lg mb-8
          focus:border-white focus:shadow-[0_0_20px_white] outline-none transition-all duration-300"
        />

        {loading ? (
          <div className="flex justify-center py-3">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <button
            onClick={handlePost}
            className="w-full py-2.5 text-black font-semibold rounded-full bg-white
            hover:shadow-[0_0_25px_white] hover:scale-[1.05] transition-all duration-300"
          >
            Post
          </button>
        )}
      </div>
    </div>
  );
}
