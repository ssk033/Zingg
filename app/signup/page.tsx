"use client";

import Signup from "@/components/Signup";
import { useEffect, useRef } from "react";

export default function SignupPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cells = grid.querySelectorAll(".cell");

    const handleHover = (e: MouseEvent) => {
      const randomColor = `hsl(${Math.random() * 360}, 100%, 70%)`; // 🌈 neon color
      const target = e.target as HTMLElement;

      if (target.classList.contains("cell")) {
        target.style.backgroundColor = randomColor;
        target.style.boxShadow = `0px 0px 25px ${randomColor}, 0px 0px 55px ${randomColor}`; // 🔥 EXTRA BRIGHT

        setTimeout(() => {
          target.style.backgroundColor = "transparent";
          target.style.boxShadow = "none";
        }, 300);
      }
    };

    grid.addEventListener("mousemove", handleHover);
    return () => grid.removeEventListener("mousemove", handleHover);
  }, []);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">

      {/* LEFT SIDE FORM */}
      <div className="w-1/2 flex items-center justify-center border-r border-gray-700">
        <Signup />
      </div>

      {/* RIGHT SIDE INTERACTIVE GRID PANEL */}
      <div className="relative w-1/2 flex items-center justify-center">

        {/* ✅ GRID VISIBILITY IMPROVED */}
        <div
          ref={gridRef}
          className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-[0.35]"  // <-- increased opacity
        >
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className="cell border border-white/25 transition-all duration-75" // <-- white border, visible grid
            ></div>
          ))}
        </div>

        {/* Neon Text */}
        <h1
          className="
            text-7xl font-black italic tracking-wide select-none text-center z-10
            drop-shadow-[0_0_30px_white]
            transition-all duration-300
            hover:drop-shadow-[0_0_60px_white] hover:tracking-widest hover:scale-110
          "
        >
          Create <br /> Your Own Story ✍️
        </h1>
      </div>
    </div>
  );
}
