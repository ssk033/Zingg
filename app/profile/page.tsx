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
    <div className="flex bg-black min-h-screen text-white">

      {/* ✅ Sidebar */}
      <ProfileSidebar
        name={user.name ?? ""}
        username={user.username}
        totalBlogs={user.blogs.length}
      />

      {/* ✅ Page Content Glass Panel */}
      <div className="flex-1 p-10">

        {/* Glass card - same style as Signup card */}
        <div className="
          backdrop-blur-xl bg-black/30 border border-white/20
          shadow-[0_0_25px_rgba(255,255,255,0.35)]
          hover:shadow-[0_0_45px_rgba(255,255,255,0.55)]
          transition-all duration-300 rounded-2xl p-10
        ">

          <h1 className="text-4xl font-extrabold drop-shadow-[0_0_15px_white]">
            Welcome, {user.name}
          </h1>
          <p className="text-gray-400 mt-1 text-lg">@{user.username}</p>

          <h2 className="text-2xl mt-10 font-semibold border-b border-white/30 pb-2">
            Your Blogs
          </h2>

          <div className="mt-6 space-y-4">
            {user.blogs.length === 0 ? (
              <p className="text-gray-400">You haven’t posted any blogs yet.</p>
            ) : (
              user.blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="
                    p-5 rounded-xl cursor-pointer
                    border border-white/20
                    hover:border-white hover:bg-white/10
                    transition-all
                  "
                >
                  <h3 className="text-xl font-semibold">{blog.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(blog.createdAt!).toDateString()}
                  </p>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
