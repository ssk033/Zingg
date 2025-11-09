"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import  Add  from "@/components/AddBlog"; // ✅ IMPORT ADD BLOG MODAL

export default function NavBar() {
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = useState(false);

  // ✅ modal ke liye state
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="w-full backdrop-blur-lg bg-white/70 border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* ================= LOGO ================= */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center cursor-pointer group select-none"
          >
            <img
              src="/icons/Zschool.svg"
              alt="Zingg Logo"
              className="w-12 h-12 transition-all duration-300 group-hover:scale-110"
            />

            <h1
              className="
                ml-4 text-[30px] font-extrabold tracking-wider
                text-black transition-all duration-300 
                group-hover:tracking-[0.35em]
              "
            >
              ZINGG
            </h1>

            <img
              src="/icons/bolt.svg"
              alt="Bolt Icon"
              className="ml-2 h-7 w-7 transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* ================= NAV BUTTONS ================= */}
          <div className="flex items-center space-x-6">

            <button className="relative text-[17px] font-medium text-black group">
              Our Story
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              onClick={() => router.push("/blogs")}
              className="relative text-[17px] font-medium text-black group"
            >
              Blogs
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
            </button>

            {/* ✅ SIGN UP BUTTON */}
            <button
              onClick={() => router.push("/signup")}
              className="
                bg-black text-white px-6 py-2 rounded-full font-semibold shadow-md
                hover:bg-white hover:text-black hover:border-black border transition-all
                duration-300 hover:-translate-y-[2px]
              "
            >
              Sign Up
            </button>

            {/* ✅ PROFILE ICON */}
            <img
              src="/icons/prof.svg"
              alt="Profile"
              onClick={() => setOpenSidebar(true)}
              className="w-11 h-11 cursor-pointer hover:scale-110 transition-all"
            />
          </div>
        </div>
      </nav>

      {/* ================= OVERLAY ================= */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      {/* ================= RIGHT SLIDING SIDEBAR ================= */}
      <div
        className={`
          fixed top-0 right-0 h-full w-72 z-50
          transform transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Glass Panel */}
        <div
          className="
            absolute inset-0
            backdrop-blur-2xl bg-black/30
            border-l border-white/30
            shadow-[0_0_35px_rgba(255,255,255,0.4)]
          "
          style={{ WebkitBackdropFilter: "blur(30px)" }}
        />

        {/* Sidebar Content */}
        <div className="relative z-10 p-6 space-y-7 text-white">

          <h2 className="text-3xl font-extrabold drop-shadow-[0_0_10px_white] mb-4">
            Profile Menu
          </h2>

          {/* ✅ VIEW PROFILE */}
          <button
            onClick={() => {
              setOpenSidebar(false);
              router.push("/profile");
            }}
            className="w-full py-3 rounded-lg font-medium bg-white/10 border border-white/30 text-white
            hover:bg-white hover:text-black hover:shadow-[0_0_25px_white] transition-all duration-300
            flex items-center gap-4 pl-4"
          >
            <img src="/icons/profile.svg" className="w-6 h-6 opacity-90" />
            <span>View Profile</span>
          </button>

          {/* ✅ MY BLOGS */}
          <button
            onClick={() => {
              setOpenSidebar(false);
              router.push("/blogs");
            }}
            className="w-full py-3 rounded-lg font-medium bg-white/10 border border-white/30 text-white
            hover:bg-white hover:text-black hover:shadow-[0_0_25px_white] transition-all duration-300
            flex items-center gap-4 pl-4"
          >
            <img src="/icons/blogs.svg" className="w-6 h-6 opacity-90" />
            <span>Blogs</span>
          </button>

          {/* ✅ CREATE BLOG → OPEN AddBlog MODAL */}
          <button
            onClick={() => {
              setOpenSidebar(false);
              setOpenAddModal(true);   // ✅ MODAL OPEN
            }}
            className="w-full py-3 rounded-lg font-medium bg-white/10 border border-white/30 text-white
            hover:bg-white hover:text-black hover:shadow-[0_0_25px_white] transition-all duration-300
            flex items-center gap-4 pl-4"
          >
            <img src="/icons/create.svg" className="w-6 h-6 opacity-90" />
            <span>Create Blog</span>
          </button>

          {/* ✅ LOGOUT */}
          <button
            onClick={() => {
              setOpenSidebar(false);
              router.push("/api/auth/signout");
            }}
            className="w-full py-3 rounded-lg font-medium bg-red-600 hover:bg-red-500 transition-all duration-300
            flex items-center gap-4 pl-4"
          >
            <img src="/icons/logout.svg" className="w-6 h-6 opacity-90" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* ✅ AddBlog MODAL OPEN FROM NAVBAR */}
      {openAddModal && (
        <Add
          onClose={() => setOpenAddModal(false)}
          onBlogAdded={() => console.log("Blog added ✅")}
        />
      )}
    </>
  );
}
