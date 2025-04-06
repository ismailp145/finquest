"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "./context/AuthContext";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem("userId", data.userId);
        setAuth(data.userId, data.token);
        router.push("/");
      } else {
        console.error("Signup failed:", data.error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold tracking-wide text-yellow-200 drop-shadow-md mb-4">🌟 FinQuest</h1>
      <form onSubmit={handleSignup} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-white mb-4">Sign Up</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded mb-4"
        />
        <button type="submit" className="w-full py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition">
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-white">
        Already have an account?{" "}
        <Link href="/login" className="text-yellow-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
