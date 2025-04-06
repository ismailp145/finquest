"use client";
import { useEffect, useState } from "react";

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch("http://localhost:3001/api/users/user/leaderboard");
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }
        const data: LeaderboardEntry[] = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setError("Failed to fetch leaderboard");
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white font-sans grid grid-rows-[auto_1fr_auto]">
      <main className="flex flex-col items-center justify-center px-6 py-12 gap-10">
        <h1 className="text-5xl font-bold tracking-wide text-yellow-200 drop-shadow-md">Leaderboard</h1>
        {error && <p className="text-red-500 text-lg">{error}</p>}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-4xl transition-all duration-300 hover:scale-[1.02]">
          <div className="grid grid-cols-3 gap-4 text-xl font-bold mb-4">
            <div className="text-white">Rank</div>
            <div className="text-white">Name</div>
            <div className="text-white text-right">Score</div>
          </div>
          {leaderboard.length > 0 ? (
            <div className="space-y-4">
              {leaderboard.map((entry, idx) => (
                <div key={entry.id} className="grid grid-cols-3 gap-4 text-lg">
                  <div className="text-white">{idx + 1}</div>
                  <div className="text-white truncate">{entry.name}</div>
                  <div className="text-white text-right">{entry.score}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white">No leaderboard data available.</p>
          )}
        </div>
      </main>

    </div>
  );
}
