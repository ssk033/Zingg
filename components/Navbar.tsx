"use client";

import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav className="w-full backdrop-blur-lg bg-white/70 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Brand Logo (Click → Signup page) */}
        <div
          onClick={() => router.push("/signup")}
          className="flex items-center cursor-pointer group select-none"
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <span className="bg-black text-white rounded-full w-9 h-9 flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-all duration-300">
              M
            </span>
          </div>

          <h1
            className="ml-3 text-[28px] font-bold group-hover:tracking-widest transition-all duration-300"
          >
            Medium
          </h1>
        </div>

        {/* Right Buttons */}
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

          <button
            onClick={() => router.push("/signup")}
            className="bg-black text-white px-6 py-2 rounded-full font-medium shadow-md 
                       hover:bg-white hover:text-black hover:border-black border transition-all 
                       duration-300 hover:-translate-y-[2px]"
          >
            Sign Up
          </button>
          
        </div>
      </div>
    </nav>
  );
}
