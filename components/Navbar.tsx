"use client";

import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav className="w-full backdrop-blur-lg bg-white/70 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* ✅ ZINGG LOGO (Silver + Black + Lightning SVG) */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center cursor-pointer group select-none"
        >
          {/* Round Silver Icon */}
          <div
            className="
              w-12 h-12 rounded-full flex items-center justify-center
              bg-gradient-to-br from-[#e8e8e8] via-[#bfbfbf] to-[#5a5a5a]
              shadow-[0_0_8px_rgba(0,0,0,0.4)]
              group-hover:shadow-[0_0_14px_rgba(0,0,0,0.6)]
              transition-all duration-300 group-hover:scale-105
            "
          >
            <span className="text-black font-extrabold text-2xl">Z</span>
          </div>

          {/* Brand text */}
          <h1
            className="
              ml-4 text-[30px] font-extrabold tracking-wider
              text-black
              transition-all duration-300 group-hover:tracking-[0.35em]
            "
          >
            ZINGG
          </h1>

          {/* ✅ Metallic Lightning SVG */}
          <svg
            className="ml-2 h-7 w-7 transition-transform duration-300 group-hover:scale-110"
            viewBox="0 0 24 24"
            aria-label="Lightning"
          >
            <defs>
              <linearGradient id="zinggSilver" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e6e6e6" />
                <stop offset="60%" stopColor="#bdbdbd" />
                <stop offset="100%" stopColor="#5a5a5a" />
              </linearGradient>
            </defs>
            <path d="M13 2L3 14h7l-1 8 12-14h-7l1-6z" fill="url(#zinggSilver)" />
          </svg>
        </div>

        {/* Right buttons */}
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
            className="
              bg-black text-white px-6 py-2 rounded-full font-semibold shadow-md
              hover:bg-white hover:text-black hover:border-black border transition-all
              duration-300 hover:-translate-y-[2px]
            "
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
