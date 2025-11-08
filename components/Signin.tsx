"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Signin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    setErrorMsg("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setErrorMsg("Invalid username or password");
      setLoading(false);
    } else {
      router.push("/blogs");
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-black">
      <div className="backdrop-blur-xl bg-black/30 border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:shadow-[0_0_45px_rgba(255,255,255,0.9)] transition-all duration-300 rounded-2xl p-10 w-[390px]">

        <h2 className="text-4xl font-extrabold text-center mb-6 text-white drop-shadow-[0_0_18px_white]">
          Sign In 🚀
        </h2>

        {errorMsg && <p className="text-red-400 text-sm mb-3 text-center">{errorMsg}</p>}

        <label className="block mb-2 text-sm font-semibold text-gray-200">Username</label>
        <input
          type="text"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 bg-transparent border border-white/30 text-white rounded-lg focus:border-white focus:shadow-[0_0_15px_white] outline-none transition-all duration-300"
        />

        <label className="block mt-4 mb-2 text-sm font-semibold text-gray-200">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 bg-transparent border border-white/30 text-white rounded-lg focus:border-white focus:shadow-[0_0_15px_white] outline-none transition-all duration-300"
        />

        <button
          onClick={handleSignin}
          disabled={loading}
          className="mt-6 w-full py-3 text-black font-semibold rounded-lg bg-white hover:shadow-[0_0_25px_white] hover:scale-[1.03] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-white/20"></div>
          <span className="px-2 text-gray-400 text-sm">or</span>
          <div className="flex-1 border-t border-white/20"></div>
        </div>

        <button
          onClick={() => signIn("google")}
          className="w-full py-2.5 flex items-center justify-center gap-3 rounded-lg font-medium border border-white/40 text-white hover:bg-white hover:text-black hover:shadow-[0_0_25px_white] transition-all duration-300"
        >
          <img src="/icons/google-gmail-svgrepo-com.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <button
          onClick={() => signIn("linkedin")}
          className="w-full py-2.5 flex items-center justify-center gap-3 rounded-lg mt-3 font-medium border border-white/40 text-white hover:bg-white hover:text-black hover:shadow-[0_0_25px_white] transition-all duration-300"
        >
          <img src="/icons/linkedin-svgrepo-com.svg" alt="LinkedIn" className="w-5 h-5" />
          Continue with LinkedIn
        </button>

        <p className="text-sm text-center mt-5 text-gray-300">
          Don't have an account?{" "}
          <Link href="/signup" className="font-semibold underline hover:text-white">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
