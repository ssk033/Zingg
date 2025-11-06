"use client";

import { Blogcard } from "./blogcard";

export const Blogs = () => {
  return (
    <div className="relative min-h-screen w-full bg-black text-white px-10 py-14 flex flex-col items-center overflow-hidden">

      {/* ✅ Background neon spotlight effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),_rgba(0,0,0,1)_60%)] blur-[80px]"></div>

      {/* ✅ Optional subtle moving fog effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(255,255,255,0.06),_transparent)] animate-pulse opacity-30"></div>

      {/* ✅ Page Heading */}
      <h1
        className="
          text-6xl font-black italic mb-16 tracking-wider select-none z-10
          drop-shadow-[0_0_45px_white]
          transition-all duration-300
          hover:scale-110 hover:drop-shadow-[0_0_85px_white]
        "
      >
        Explore Blogs ✍️
      </h1>

      {/* ✅ Center Blog Card (NO UI CHANGE TO CARD ITSELF) */}
      <div
        className="
          animate-[fadeIn_0.8s_ease-out]
          z-10
        "
      >
        <Blogcard
          authorname="Sanidhya Singh"
          title="Motivation"
          content="Growth happens when you step outside your comfort zone. It doesn’t matter how fast you move, what matters is that you don't stop. Every small step forward counts as progress. The only person you should compete with is the person you were yesterday."
          publishedDate="6th Nov 2025"
        />
      </div>
    </div>
  );
};
