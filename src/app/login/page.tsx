"use client";
import GlareHover from "@/components/GlareHover";
import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation"; // 1. IMPORT usePathname

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 2. ADD loading state
  const router = useRouter();
  const pathname = usePathname(); 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && pathname === "/login") {
        router.push("/dashboard"); // Redirect to dashboard, not home
      }
    });
    return () => unsubscribe();
  }, [router, pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    setLoading(true); // Set loading to true
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // 4. ON SUCCESS, redirect to the dashboard
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Failed to sign in. Please check your credentials.");
      setLoading(false); // Set loading to false on error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(to right, #1e1b4b 0%, #000000 65%, #000000 100%)' }}>
      <GlareHover
        glareColor="#ffffff"
        glareOpacity={0.3}
        glareAngle={-30}
        glareSize={300}
        transitionDuration={800}
        playOnce={false}
      >
        <div className="w-full max-w-xs sm:max-w-md p-6 sm:p-8 space-y-4 sm:space-y-6 rounded-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#a5b4fc] custom-font mb-10 sm:mb-15">Login</h1>
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="text-sm sm:text-md font-medium text-gray-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-[#e5e7eb] bg-gray-900 border border-[#2d2f45] rounded-md shadow-sm focus:outline-none focus:border-[#4b5dff]"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm sm:text-md font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-[#e5e7eb] bg-gray-900 border border-[#2d2f45] rounded-md shadow-sm focus:outline-none focus:border-[#4b5dff] password-reveal-icon"
              />
            </div>
            {error && <p className="text-xs sm:text-sm text-red-500">{error}</p>}
            <div className="mt-8 sm:mt-10">
              <button
                type="submit"
                disabled={loading} // Disable button when loading
                className="w-full px-4 py-2 sm:py-3 text-base sm:text-lg font-medium text-white bg-[#4b5dff] border border-transparent rounded-md shadow-sm hover:bg-[#4338ca] focus:bg-[#312e91] disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </GlareHover>
    </div>
  );
};

export default LoginPage;