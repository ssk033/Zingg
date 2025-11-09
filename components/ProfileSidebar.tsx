"use client";

import { useState } from "react";

interface SidebarProps {
  name: string;
  username: string;
  totalBlogs: number;
}

export default function ProfileSidebar({ name, username, totalBlogs }: SidebarProps) {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Slide Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed top-[90px] left-3 z-[9999]
          text-white bg-black/40 backdrop-blur-xl
          border border-white/30 p-2 rounded-full
          hover:bg-white hover:text-black
          transition-all duration-300
        "
      >
        {open ? "←" : "→"}
      </button>

      <div
        className={`
          h-screen w-64 shrink-0 relative overflow-hidden
          transition-transform duration-500 ease-out
          ${open ? "translate-x-0" : "-translate-x-72"}
        `}
      >
        {/* ✅ GLASS BACKGROUND */}
        <div
          className="
            absolute inset-0 
            bg-black/40 backdrop-blur-2xl
          "
          style={{ WebkitBackdropFilter: "blur(25px)" }}
        />

        {/* ✅ WHITE GLOW BORDER */}
        <div
          className="
            absolute inset-0
            border-[2px] border-white/30 rounded-2xl
            shadow-[0_0_30px_rgba(255,255,255,0.35)]
            pointer-events-none
          "
        />

        {/* ✅ CONTENT (starts right under navbar) */}
        <div className="relative z-10 p-8 mt-[8px] text-white">

          <h2 className="text-3xl font-extrabold mb-6 drop-shadow-[0_0_10px_white]">
            Profile
          </h2>

          <div className="mt-6 group">
            <p className="text-gray-400 text-sm group-hover:text-white transition-all">NAME</p>
            <p className="text-xl font-semibold group-hover:scale-[1.03] transition-all">
              {name}
            </p>
          </div>

          <div className="mt-6 group">
            <p className="text-gray-400 text-sm group-hover:text-white transition-all">USERNAME</p>
            <p className="text-xl font-semibold opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all">
              @{username}
            </p>
          </div>

          <div className="mt-6 group">
            <p className="text-gray-400 text-sm group-hover:text-white transition-all">TOTAL BLOGS</p>
            <p className="text-xl font-semibold group-hover:scale-[1.03] transition-all">
              {totalBlogs}
            </p>
          </div>

          {/* ✅ WHITE GLASS BUTTON (matches Signup theme) */}
          <button
            onClick={() => (window.location.href = "/blogs")}
            className="
              mt-10 w-full py-3 rounded-lg font-semibold
              text-black bg-white
              border border-white/40
              hover:shadow-[0_0_25px_white]
              hover:scale-[1.03]
              transition-all duration-300
            "
          >
            View Blogs
          </button>
        </div>
      </div>
    </>
  );
}
