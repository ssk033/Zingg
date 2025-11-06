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
    <div className="relative min-h-screen w-full bg-black text-white px-10 py-14 flex flex-col items-center">

      <h1
        className="
          text-6xl font-black italic mb-16 tracking-wide select-none z-10
          drop-shadow-[0_0_45px_white]
          transition-all duration-300
          hover:scale-110 hover:drop-shadow-[0_0_85px_white]
        "
      >
        Explore Blogs ✍️
      </h1>

      <div className="flex flex-col gap-10 w-full items-center z-10">
        {blogs.length === 0 ? (
          <div className="text-3xl text-gray-300 italic opacity-60">
            No blogs here yet...
          </div>
        ) : (
          blogs.map((blog) => (
            <Blogcard
              key={blog.id}
              authorname={blog.author.name}
              title={blog.title}
              content={blog.content}
            />
          ))
        )}
      </div>
    </div>
  );
};
