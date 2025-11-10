"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen w-full text-white flex flex-col items-center justify-start overflow-visible relative"
      style={{
        backgroundImage: "url('/sp1.jpg')",
        backgroundSize: "100% auto",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        imageRendering: "crisp-edges",
      }}
    >
      {/* 🔥 transparent overlay (no blur now, image stays sharp) */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center pt-36 pb-28 px-6 select-none overflow-visible">

        {/* ⭐ MAIN HEADING USING VEGAN FONT */}
        <h1
          style={{ fontFamily: "MightySouly" }}
          className="
            text-5xl sm:text-6xl md:text-7xl lg:text-8xl
            text-[#27B4F5]
            tracking-[0.15em]
            drop-shadow-[0_0_25px_#27B4F5]
            transition-all duration-500
          "
        >
          Welcome to ZINGG
        </h1>

        <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mt-6 max-w-2xl">
          Create Your Own Story. Let's rewrite the past, redesign the present, redefine the future.
        </p>

        {/* CTA BUTTON */}
        <Link href="/signup">
<button
  className="
    rgb-ring
    relative mt-14 px-14 py-5 text-xl font-bold rounded-2xl
    text-black hover:scale-[1.10]
    transition-all duration-300
  "
>
  🚀 Start Blogging Now
</button>


        </Link>

      </section>

      {/* REVIEW CARDS */}
      <section className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 px-8 pb-20">

        {[ 
          "Super clean and fast UI. Feels better than Medium.",
          "Loved the minimal UI. Posting is super easy.",
          "Exactly what I needed for personal content posting!",
        ].map((text, i) => (
          <div
            key={i}
            className="
              border border-[#27B4F5]/50 rounded-xl p-6 w-[330px]
              backdrop-blur-xl bg-[#0B0E10]/70
              shadow-[0_0_30px_rgba(39,180,245,0.6)]
              hover:shadow-[0_0_65px_rgba(39,180,245,1)]
              hover:scale-[1.05] transition-all duration-300
            "
          >
            <p className="text-sm text-gray-300">{text}</p>
            <h3 className="mt-3 font-semibold text-lg text-[#27B4F5]">⭐⭐⭐⭐⭐</h3>
            <p className="text-gray-400 mt-2 text-sm">
              – {["Rohan, Developer", "Sneha, Blogger", "Arjun, UI/UX Designer"][i]}
            </p>
          </div>
        ))}

      </section>
    </div>
  );
}
