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
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed top-[95px] left-4 z-[9999]
          p-2 rounded-full font-bold
          text-[#27B4F5]
          backdrop-blur-xl bg-[#0B0E10]/70
          border border-[#27B4F5]/60
          hover:bg-[#27B4F5] hover:text-black
          shadow-[0_0_25px_rgba(39,180,245,0.7)]
          hover:shadow-[0_0_40px_rgba(39,180,245,1)]
          transition-all duration-300
        "
      >
        {open ? "←" : "→"}
      </button>

      {/* Sidebar Panel */}
      <div
        className={`
          fixed top-[95px] left-0 h-[calc(100vh-95px)]
          w-64 overflow-y-auto z-[9998]
          transition-transform duration-500
          ${open ? "translate-x-0" : "-translate-x-72"}
        `}
      >
        {/* Glassmorphic Background */}
        <div
          className="
            absolute inset-0 rounded-2xl
            backdrop-blur-2xl bg-[#0B0E10]/70
            border border-[#27B4F5]/40
            shadow-[0_0_50px_rgba(39,180,245,0.6)]
          "
        />

        {/* Sidebar Content */}
        <div className="relative z-10 p-8 text-white flex flex-col justify-between h-full">

          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-extrabold text-[#27B4F5] drop-shadow-[0_0_12px_#27B4F5]">
              Profile
            </h2>

            {/* Name */}
            <div>
              <p className="text-gray-400 text-sm">NAME</p>
              <p className="text-xl font-semibold hover:text-[#27B4F5] transition">
                {name}
              </p>
            </div>

            {/* Username */}
            <div>
              <p className="text-gray-400 text-sm">USERNAME</p>
              <p className="text-xl font-semibold break-words opacity-90 hover:text-[#27B4F5] transition">
                @{username}
              </p>
            </div>

            {/* Total Blogs */}
            <div>
              <p className="text-gray-400 text-sm">TOTAL BLOGS</p>
              <p className="text-xl font-semibold hover:text-[#27B4F5] transition">
                {totalBlogs}
              </p>
            </div>
          </div>

          {/* ✅ View Blogs Button (RESTORED) */}
          <button
            onClick={() => (window.location.href = "/blogs")}
            className="
              w-full py-3 mt-6 rounded-lg font-semibold
              text-black bg-[#27B4F5]
              hover:shadow-[0_0_30px_rgba(39,180,245,0.9)]
              hover:scale-[1.03] transition-all
            "
          >
            View Blogs
          </button>
        </div>
      </div>
    </>
  );
}
