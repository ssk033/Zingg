"use client";

import { Blogcard } from "./blogcard";
import axios from "axios";
import { useState } from "react";

type Blog = {
  id: number;
  author: { name: string };
  title: string;
  content: string;
  createdAt: string;
  _count: { likes: number };
};

type BlogsProps = {
  blogs: Blog[];
};

export const Blogs = ({ blogs }: BlogsProps) => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const loadComments = async (blogId: number) => {
    const selected = blogs.find((b: Blog) => b.id === blogId) || null;
    setSelectedBlog(selected);

    setCommentsOpen(true);
    const res = await axios.get(`/api/blog/comment?blogId=${blogId}`);
    setComments(res.data.comments);
  };

  return (
    <div className="relative flex bg-black text-white pt-[95px]">

      {/* LEFT SIDE — BLOGS */}
      <div className="w-[70%] min-h-screen px-10 py-10 flex flex-col items-center gap-6">
        <h1 className="text-6xl font-black italic mb-10 drop-shadow-[0_0_45px_white]">
          Explore Blogs
        </h1>

        {blogs.length === 0 ? (
          <div className="text-3xl text-gray-400 italic">No blogs here yet...</div>
        ) : (
          blogs.map((blog) => (
            <Blogcard
              key={blog.id}
              blogId={blog.id}
              authorname={blog.author.name}
              title={blog.title}
              content={blog.content}
              initialLikes={blog._count.likes}
              onViewComments={() => loadComments(blog.id)}
            />
          ))
        )}
      </div>

      {/* RIGHT SIDE — FLOATING COMMENT CARD */}
      {commentsOpen && selectedBlog && (
        <div
          className="
            fixed right-6 top-[110px]
            w-[350px] h-[540px]
            rounded-xl p-6 z-[100]
            backdrop-blur-2xl bg-[#0B0E10]/70
            border border-[#27B4F5]/50
            shadow-[0_0_40px_rgba(39,180,245,0.7)]
            transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(39,180,245,0.9)]
          "
        >
          {/* BLOG INFO ON TOP */}
          <div className="mb-5 pb-3 border-b border-[#27B4F5]/40">
            <h3 className="text-lg font-bold text-[#27B4F5] leading-tight">
              {selectedBlog.title}
            </h3>
            <p className="text-sm text-gray-300">by {selectedBlog.author.name}</p>
            <p className="text-[11px] text-gray-500">
              {new Date(selectedBlog.createdAt).toLocaleDateString("en-IN")}
            </p>
          </div>

          {/* CARD HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#27B4F5] drop-shadow-[0_0_8px_#27B4F5]">
              Comments 💬
            </h2>
            <button
              onClick={() => setCommentsOpen(false)}
              className="text-lg hover:text-red-400 transition"
            >
              ✖
            </button>
          </div>

          {/* COMMENTS LIST (scrollable inside card) */}
          <div className="h-[390px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-[#27B4F5]/60 scrollbar-track-transparent">
            {comments.length === 0 ? (
              <p className="text-gray-400 text-center mt-6 opacity-75">No comments yet...</p>
            ) : (
              comments.map((comment: any, index) => (
                <div
                  key={index}
                  className="
                    p-3 rounded-lg border border-[#27B4F5]/30 bg-white/10
                    hover:bg-[#27B4F5]/10 hover:shadow-[0_0_15px_rgba(39,180,245,0.6)]
                    transition-all duration-300
                  "
                >
                  <p className="text-sm text-[#27B4F5] font-semibold">
                    @{comment.user.username}
                  </p>
                  <p className="text-gray-200 text-sm">{comment.text}</p>
                  <p className="text-[10px] text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString("en-IN")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
