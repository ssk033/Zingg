"use client";

interface BlogCardProps {
  authorname: string;
  title: string;
  content: string;
}

export const Blogcard = ({ authorname, title, content }: BlogCardProps) => {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="relative w-full max-w-3xl mx-auto group">

      {/* ✅ Neon White Under-Glow */}
      <div
        className="
          absolute -bottom-3 left-1/2 -translate-x-1/2 w-[95%] h-[8px]
          bg-white opacity-30
          blur-xl group-hover:blur-2xl group-hover:opacity-80
          transition-all duration-500 rounded-full
        "
      ></div>

      {/* Card */}
      <div
        className="
          border border-gray-300 p-6 flex flex-col rounded-xl bg-white shadow-lg
          transition-all duration-500 group-hover:shadow-[0px_8px_50px_rgba(255,255,255,0.5)]
          group-hover:scale-[1.03]
        "
      >
        {/* Author */}
        <div className="flex items-center space-x-4">
          <div className="relative inline-flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full shadow-md">
            <span className="font-bold text-gray-700 text-lg">
              {authorname.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="text-md text-gray-600 font-semibold">{authorname}</div>
        </div>

        {/* Title */}
        <div className="text-3xl font-bold text-gray-800 mt-4 group-hover:text-gray-900 transition-all duration-300">
          {title}
        </div>

        {/* Content */}
        <div className="text-base text-gray-600 mt-3 overflow-hidden text-ellipsis line-clamp-3">
          {content}
        </div>

        {/* Date */}
        <div className="text-sm text-gray-500 mt-4">{today}</div>
      </div>
    </div>
  );
};
