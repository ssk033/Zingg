// app/profile/page.tsx
import ProfileSidebar from "@/components/ProfileSidebar";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await prisma.user.findUnique({
    where: { username: session.user?.username },
    include: { blogs: true },
  });

  if (!user) redirect("/signin");

  return (
    <div className="flex bg-black min-h-screen text-white pt-[95px]">

      {/* ✅ Sidebar (NO onToggle prop now) */}
      <ProfileSidebar
        name={user.name ?? ""}
        username={user.username}
        totalBlogs={user.blogs.length}
      />

      {/* ✅ Page Content */}
      <main className="flex-1 px-10 py-14 ml-64 transition-all duration-500">

        <div
          className="
            rounded-2xl p-10
            backdrop-blur-2xl bg-[#0B0E10]/70
            border border-[#27B4F5]/40
            shadow-[0_0_45px_rgba(39,180,245,0.6)]
            hover:shadow-[0_0_65px_rgba(39,180,245,0.9)]
            transition-all
          "
        >
          <h1 className="text-4xl font-extrabold text-[#27B4F5] drop-shadow-[0_0_10px_#27B4F5]">
            Welcome, {user.name}
          </h1>

          <p className="text-gray-400 mt-1 text-lg">@{user.username}</p>

          <h2 className="text-2xl mt-10 font-semibold border-b border-[#27B4F5]/30 pb-2">
            Your Blogs
          </h2>

          <div className="mt-6 space-y-4">
            {user.blogs.length === 0 ? (
              <p className="text-gray-500 italic">You haven’t posted any blogs yet.</p>
            ) : (
              user.blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="
                    p-5 rounded-xl cursor-pointer
                    border border-[#27B4F5]/40 bg-[#0B0E10]/40
                    hover:border-[#27B4F5] hover:bg-[#27B4F5]/10
                    shadow-[0_0_20px_rgba(39,180,245,0.4)]
                    hover:shadow-[0_0_35px_rgba(39,180,245,0.8)]
                    transition-all
                  "
                >
                  <h3 className="text-xl font-semibold">{blog.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(blog.createdAt!).toLocaleDateString("en-IN")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
