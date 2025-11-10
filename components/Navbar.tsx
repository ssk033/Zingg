"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Add from "@/components/AddBlog";

export default function NavBar() {
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`
          fixed top-0 w-full z-50 transition-transform duration-500
          ${navVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div
          className="
            backdrop-blur-xl bg-[#0B0E10]/50
            border-b border-[#27B4F5]/40
            shadow-[0_0_25px_rgba(39,180,245,0.55)]
            px-6 pt-4 pb-4 flex justify-between items-center
          "
        >
          {/* ================= LOGO ================= */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center cursor-pointer group select-none"
          >
            <img src="/icons/Zschool.svg" className="w-12 h-12 group-hover:scale-110 transition" />

           <h1
  className="
    ml-4 text-[30px] font-extrabold tracking-wider
    transition-all duration-300 group-hover:tracking-[0.35em]
  "
  style={{
    background: "linear-gradient(90deg, #ff005d, #ff8c00, #ffee00, #2aff00, #00eeff, #7a00ff, #ff00b8)",
    backgroundSize: "400% 400%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "rgbGlow 4s linear infinite",
  }}
>
  ZINGG
</h1>


            <img src="/icons/bolt.svg" className="ml-2 h-7 w-7 transition group-hover:scale-110" />
          </div>

          {/* ================= NAV BUTTONS ================= */}
          <div className="flex items-center space-x-6">

            <button className="relative text-[17px] font-medium text-white group">
              Our Story
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#27B4F5] transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              onClick={() => router.push("/blogs")}
              className="relative text-[17px] font-medium text-white group"
            >
              Blogs
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#27B4F5] transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              onClick={() => router.push("/signup")}
              className="
                bg-[#27B4F5]/20 border border-[#27B4F5]/70 text-[#27B4F5]
                px-6 py-2 rounded-full font-semibold shadow-md
                hover:bg-[#27B4F5] hover:text-black hover:border-black transition-all
                duration-300 hover:-translate-y-[2px]
              "
            >
              Sign Up
            </button>

            <img
              src="/icons/prof.svg"
              onClick={() => setOpenSidebar(true)}
              className="w-10 h-10 cursor-pointer hover:scale-110 transition"
            />
          </div>
        </div>

        {/* ✅ RGB ANIMATED LIGHT STRIP */}
        <div className="h-[3px] w-full animate-rgbGlow" />
      </nav>

      {/* ✅ PERFECTLY CENTERED BELOW NAVBAR TOGGLE BUTTON */}
      <button
        onClick={() => setNavVisible(!navVisible)}
        className={`
          fixed left-1/2 -translate-x-1/2 z-[999]
          w-12 h-6 flex justify-center items-center
          rounded-full backdrop-blur-xl
          border border-[#27B4F5]/60 bg-[#27B4F5]/15
          hover:bg-[#27B4F5]/40 transition-all duration-500
          ${navVisible ? "top-[calc(64px+3px)]" : "top-3"}
        `}
      >
        {navVisible ? (
          <span className="text-[#27B4F5] text-lg font-bold">▲</span>
        ) : (
          <span className="text-[#27B4F5] text-lg font-bold">▼</span>
        )}
      </button>


      {/* ================= OVERLAY & SIDEBAR ================= */}
      {openSidebar && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setOpenSidebar(false)} />
      )}

      <div
        className={`
          fixed top-0 right-0 h-full w-72 z-50
          transform transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* blur glass */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-2xl border-l border-white/30 shadow-[0_0_35px_rgba(255,255,255,0.4)]" />

        <div className="relative z-10 p-6 space-y-7 text-white">
          <h2 className="text-3xl font-extrabold drop-shadow-[0_0_10px_white] mb-4">
            Profile Menu
          </h2>

          <button
            onClick={() => {
              setOpenSidebar(false);
              router.push("/profile");
            }}
            className="w-full py-3 rounded-lg font-medium bg-white/10 border border-white/30 text-white hover:bg-white hover:text-black hover:shadow-[0_0_25px_white] transition-all duration-300 flex items-center gap-4 pl-4"
          >
            <img src="/icons/profile.svg" className="w-6 h-6 opacity-90" />
            <span>View Profile</span>
          </button>

          <button
            onClick={() => {
              setOpenSidebar(false);
              router.push("/blogs");
            }}
            className="w-full py-3 rounded-lg font-medium bg-white/10 border border-white/30 text-white hover:bg-white hover:text-black hover:shadow-[0_0_25px_white] transition-all duration-300 flex items-center gap-4 pl-4"
          >
            <img src="/icons/blogs.svg" className="w-6 h-6 opacity-90" />
            <span>Blogs</span>
          </button>

          <button
            onClick={() => {
              setOpenSidebar(false);
              setOpenAddModal(true);
            }}
            className="w-full py-3 rounded-lg font-medium bg-white/10 border border-white/30 text-white hover:bg-white hover:text-black hover:shadow-[0_0_25px_white] transition-all duration-300 flex items-center gap-4 pl-4"
          >
            <img src="/icons/create.svg" className="w-6 h-6 opacity-90" />
            <span>Create Blog</span>
          </button>

          <button
            onClick={() => {
              setOpenSidebar(false);
              router.push("/api/auth/signout");
            }}
            className="w-full py-3 rounded-lg font-medium bg-red-600 hover:bg-red-500 transition-all duration-300 flex items-center gap-4 pl-4"
          >
            <img src="/icons/logout.svg" className="w-6 h-6 opacity-90" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* ✅ BLOG MODAL */}
      {openAddModal && (
        <Add onClose={() => setOpenAddModal(false)} onBlogAdded={() => console.log("Blog added ✅")} />
      )}
    </>
  );
}
