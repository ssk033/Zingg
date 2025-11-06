"use client";

import { Blogcard } from "./blogcard";

type Blog = {
  id: string | number;
  author: { name: string };
  title: string;
  content: string;
  createdAt: string;
};

type BlogsProps = {
  blogs: Blog[];
};

export const Blogs = ({ blogs }: BlogsProps) => {
  return (
    <div className="relative min-h-screen w-full bg-black text-white px-10 py-20 flex flex-col items-center overflow-hidden">

      {/* === ✨ Animated Neon Background Grid === */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-[0.2] pointer-events-none">
        {Array.from({ length: 144 }).map((_, i) => (
          <div
            key={i}
            className="border border-white/10 transition-all duration-300"
          ></div>
        ))}
      </div>

      {/* === ✨ Glow Overlay === */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.10),_rgba(0,0,0,1)_70%)]"></div>

      {/* === Header Title === */}
      <h1
        className="
          text-6xl font-bold italic mb-16 tracking-wider select-none z-10
          drop-shadow-[0_0_45px_rgba(255,255,255,1)]
          transition-all duration-300 hover:scale-105
        "
      >
        Explore Blogs ✍️
      </h1>

      {/* === Blogs Container === */}
      <div className="z-10 flex flex-col gap-12 w-full items-center">

        {/* ✅ No Blogs Text (improved design) */}
        {blogs.length === 0 ? (
          <div
            className="
              text-2xl font-semibold italic opacity-70 tracking-wide select-none
              drop-shadow-[0_0_18px_rgba(255,255,255,0.5)]
              py-14
            "
          >
            No blogs here yet...
          </div>
        ) : (
          blogs.map((blog) => (
            <Blogcard
              key={blog.id}
              authorname={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate={new Date(blog.createdAt).toDateString()}
            />
          ))
        )}
      </div>
    </div>
  );
};