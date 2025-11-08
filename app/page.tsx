"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-start overflow-visible">

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center pt-36 pb-28 px-6 select-none overflow-visible">

        {/* ✅ FIXED: Added leading + removed aggressive tracking on hover */}
        <h1
          className="
            text-[42px] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold
            bg-gradient-to-r from-white via-gray-300 to-gray-400 text-transparent bg-clip-text
            drop-shadow-[0_0_35px_rgba(255,255,255,0.6)]
            leading-tight overflow-visible
            transition-all duration-500
            hover:scale-[1.05] hover:drop-shadow-[0_0_60px_white]
          "
          style={{ lineHeight: "1.2" }} // ✅ Prevents 'g' clipping
        >
          Welcome to Your Personal Blogging App
        </h1>

        {/* Subtext */}
        <p
          className="
            text-gray-300 text-base sm:text-lg md:text-xl mt-6 max-w-2xl
            transition-all duration-300
            hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]
          "
        >
          Create posts like Medium, express like Twitter, and build your personal audience.
          Fastest & cleanest blogging experience.
        </p>

        {/* CTA Button */}
        <Link href="/signup">
          <button
            className="
              mt-12 px-14 py-5 text-xl font-bold rounded-2xl
              bg-gradient-to-r from-white via-gray-200 to-gray-400 text-black
              shadow-[0_0_35px_rgba(255,255,255,0.8)]
              hover:shadow-[0_0_65px_rgba(255,255,255,1)]
              hover:scale-[1.05] transition-all duration-300
            "
          >
            ⭐ Start Blogging Now
          </button>
        </Link>

      </section>

      {/* REVIEW CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-8 pb-20 overflow-visible">

        <div className="bg-black/30 border border-white/20 rounded-xl p-6 w-[330px] backdrop-blur-xl shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.05] hover:shadow-[0_0_45px_rgba(255,255,255,0.5)] transition-all duration-300 text-center">
          <p className="text-sm text-gray-300">“Super clean and fast UI. Feels better than Medium.”</p>
          <h3 className="mt-3 font-semibold text-lg text-white">⭐⭐⭐⭐⭐</h3>
          <p className="text-gray-400 mt-2 text-sm">– Rohan, Developer</p>
        </div>

        <div className="bg-black/30 border border-white/20 rounded-xl p-6 w-[330px] backdrop-blur-xl shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.05] hover:shadow-[0_0_45px_rgba(255,255,255,0.5)] transition-all duration-300 text-center">
          <p className="text-sm text-gray-300">“Loved the minimal UI. Posting is super easy.”</p>
          <h3 className="mt-3 font-semibold text-lg text-white">⭐⭐⭐⭐⭐</h3>
          <p className="text-gray-400 mt-2 text-sm">– Sneha, Blogger</p>
        </div>

        <div className="bg-black/30 border border-white/20 rounded-xl p-6 w-[330px] backdrop-blur-xl shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.05] hover:shadow-[0_0_45px_rgba(255,255,255,0.5)] transition-all duration-300 text-center">
          <p className="text-sm text-gray-300">“Exactly what I needed for personal content posting!”</p>
          <h3 className="mt-3 font-semibold text-lg text-white">⭐⭐⭐⭐⭐</h3>
          <p className="text-gray-400 mt-2 text-sm">– Arjun, UI/UX Designer</p>
        </div>

      </section>
    </div>
  );
}
