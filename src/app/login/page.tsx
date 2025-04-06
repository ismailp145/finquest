"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        if(sessionStorage.getItem("userId") !== null) {
            sessionStorage.removeItem("userId");
            sessionStorage.setItem("userId", data.userId);
        }
        else{
            sessionStorage.setItem("userId", data.userId);
        }
        setAuth(data.userId, data.token);
        router.push("/");
      } else {
        alert("Invalid Credentials")
        console.error("Login failed:", data.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-white mb-4">Login</h1>
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
          Login
        </button>
      </form>
    </div>
  );
}