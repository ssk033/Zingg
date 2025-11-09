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
  const [commentsSidebarOpen, setCommentsSidebarOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  const loadComments = async (blogId: number) => {
    setSelectedBlogId(blogId);
    setCommentsSidebarOpen(true);

    const res = await axios.get(`/api/blog/comment?blogId=${blogId}`);
    setComments(res.data.comments);
  };

  return (
    <div className="relative flex w-full bg-black text-white">

      {/* LEFT: BLOG LIST */}
      <div className="w-[70%] min-h-screen px-10 py-14 flex flex-col items-center gap-10">
        <h1 className="text-6xl font-black italic mb-12 drop-shadow-[0_0_45px_white]">
          Explore Blogs ✍️
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
              onViewComments={() => loadComments(blog.id)}   // ✅ passing callback
            />
          ))
        )}
      </div>

      {/* RIGHT: COMMENT SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[28%] bg-white text-black shadow-xl border-l border-gray-300 transition-transform duration-300
        ${commentsSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Comments 💬</h2>
          <button className="text-xl" onClick={() => setCommentsSidebarOpen(false)}>✖</button>
        </div>

        {/* LIST OF COMMENTS */}
        <div className="px-6 py-4 space-y-4 overflow-y-auto max-h-full">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center">No comments yet...</p>
          ) : (
            comments.map((comment: any, index) => (
              <div key={index} className="border-b pb-2">
                <p className="text-sm font-semibold">@{comment.user.username}</p>
                <p className="text-gray-800">{comment.text}</p>
                <p className="text-[11px] text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
