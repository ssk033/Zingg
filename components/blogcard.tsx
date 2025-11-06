"use client";

interface BlogCardProps {
  authorname: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const Blogcard = ({
  authorname,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div
      className="
        w-full max-w-3xl   /* ✅ increased width */
        mx-auto border-2 border-gray-300 p-6 flex flex-col rounded-xl bg-white shadow-lg
        hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]
      "
    >
      {/* Author */}
      <div className="flex items-center space-x-4">
        <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-200 rounded-full">
          <span className="font-bold text-gray-700 text-lg">
            {authorname.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <div className="text-md text-gray-600 font-semibold">{authorname}</div>
      </div>

      {/* Title */}
      <div className="text-3xl font-bold text-black mt-4">{title}</div>

      {/* Content with overflow fix */}
      <div className="text-base text-gray-500 mt-3 overflow-hidden text-ellipsis line-clamp-3">
        {content}
      </div>

      {/* Published Date */}
      <div className="text-sm text-gray-500 mt-4">{publishedDate}</div>
    </div>
  );
};
