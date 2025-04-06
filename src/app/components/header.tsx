// app/components/Header.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import Leaderboard from "../leaderboard/page"; // Adjust path if needed
import { useEffect, useState } from "react";

export default function Header() {
  const { userId, logout } = useAuth();
  const router = useRouter();
  const [isLogged,setIsLogged] = useState(true);

//   useEffect(()=>{
//     const session=sessionStorage.getItem("userId")
//     if(session){
//         setIsLogged(true);
//     }
//   },[])

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    logout();
    router.push("/login");
  };

  return (
    <header className="w-full px-6 py-4 bg-black/20 backdrop-blur-md shadow-md ">
      <nav className="flex items-center justify-center gap-6 text-sm">
      {userId && (
        <>
        <Link href="/home" className="hover:text-yellow-300 transition">
          Home
        </Link>
        <Link href="/profile" className="hover:text-yellow-300 transition">
          Profile
        </Link>
        <Link href="/leaderboard" className="hover:text-yellow-300 transition">
          Leaderboard
        </Link>
       
          <button
            onClick={handleLogout}
            className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-400 text-white font-bold rounded transition"
          >
            Logout
          </button>
        </>
        )}
      </nav>
    </header>
  );
}
