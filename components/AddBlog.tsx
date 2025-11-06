"use client"; // Mark this component as a client component
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";

export function Add() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow">
        <div className="text-3xl font-extrabold text-center mb-6">Add Blog</div>
        
        {/* Title Input */}
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-[80%] h-[15%] p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-auto"
          />
        </div>

        {/* Content Input */}
        <div className="mb-6">
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-[80%] h-[75%] p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-auto"
          />
        </div>

        {/* Post Button */}
        <div className="flex justify-start">
          <button 
            onClick={async () => {
              const response = await axios.post("http://localhost:3000/api/blogs", {
                title,
                content,
              });
              if (response.status === 200) {
                router.push("/"); // Navigate to the home page after successful post
              }
            }}
            type="button"
            className="w-32 py-2.5 text-white bg-black rounded-full hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
