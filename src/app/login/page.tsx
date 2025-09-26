"use client";
import GlareHover from "@/components/GlareHover";
import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { setLoginTime } from "@/lib/session";
import NavBar from "../navbar/NavBar";

const LoginPage = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔑 Redirect if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/dashboard"); // skip login
      } else {
        setCheckingAuth(false); // show login form
      }
    });
    return unsubscribe;
  }, [router]);

  // 🔑 Show loader while checking Firebase session
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Checking session...
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Set session persistence before login
      await setPersistence(auth, browserSessionPersistence);

      // Login
      await signInWithEmailAndPassword(auth, email, password);

      // Mark login time for custom expiry check
      setLoginTime();

      router.replace("/dashboard"); // 🚀 use replace so login page isn’t in history
    } catch (error) {
      console.log(error);
      setError("Failed to sign in. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#1A1A1A] items-center justify-center min-h-screen">
      <NavBar />
      <GlareHover
        glareColor="#ffffff"
        glareOpacity={0.3}
        glareAngle={-30}
        glareSize={300}
        transitionDuration={800}
        playOnce={false}
      >
        <div className="w-full max-w-xs sm:max-w-md p-6 sm:p-8 space-y-4 sm:space-y-6 rounded-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#a5b4fc] custom-font mb-10 sm:mb-15">
            Login
          </h1>
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-sm sm:text-md font-medium text-gray-300"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-[#e5e7eb] bg-gray-900 border border-[#2d2f45] rounded-md shadow-sm focus:outline-none focus:border-[#4b5dff]"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm sm:text-md font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-[#e5e7eb] bg-gray-900 border border-[#2d2f45] rounded-md shadow-sm focus:outline-none focus:border-[#4b5dff] password-reveal-icon"
              />
            </div>
            {error && (
              <p className="text-xs sm:text-sm text-red-500">{error}</p>
            )}
            <div className="mt-8 sm:mt-10">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 sm:py-3 text-base sm:text-lg font-medium text-white bg-[#4b5dff] border border-transparent rounded-md shadow-sm hover:bg-[#4338ca] focus:bg-[#312e91] disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="bg-neutral-500 hover:bg-neutral-600 focus:bg-neutral-700 px-6 py-3 rounded-full text-white font-semibold mt-10 mx-auto flex items-center justify-center"
              >
                <FiArrowLeft className="text-3xl pr-2" />
                Go to Home
              </button>
            </div>
          </form>
        </div>
      </GlareHover>
    </div>
  );
};

export default LoginPage;
