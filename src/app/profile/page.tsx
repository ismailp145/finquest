'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// TypeScript interfaces for your API responses
interface TreeNode {
  _id: string;
  label: string;
  score: number;
  isChosen: boolean;
  explanation: string;
  children: TreeNode[];
}

interface DecisionTree {
  treeId: string;
  title: string;
  tree: TreeNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  score: number;
  createdAt: string;
}

// Recursive component to render a tree node and its children
const BinaryTreeNode = ({ node }: { node: TreeNode }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`px-4 py-2 border rounded-md text-sm text-center whitespace-pre-wrap ${
          node.isChosen
            ? 'bg-green-200 border-green-600 font-bold text-black'
            : 'bg-gray-100 border-gray-300 text-black'
        }`}
      >
        {node.label}
      </div>
      {node.children && node.children.length > 0 && (
        <div className="flex flex-col items-center mt-2 relative">
          {/* Vertical connector */}
          <div className="w-px h-4 bg-gray-400"></div>
          {/* Horizontal connector and children */}
          <div className="flex justify-between w-full relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full border-t border-gray-400"></div>
            {node.children.map((child) => (
              <div key={child._id} className="flex flex-col items-center px-2">
                <div className="w-px h-4 bg-gray-400"></div>
                <BinaryTreeNode node={child} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function ProfilePage() {
  // Replace "USER_ID" with the actual user's ID or fetch from auth context
  
  const [user, setUser] = useState<User | null>(null);
  const [decisionTrees, setDecisionTrees] = useState<DecisionTree[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = sessionStorage.getItem("userId") || "USER_ID";
    setUserId(id);
  }, []);

  useEffect(() => {
   
    if (!userId) return; // Exit if userId is not set

    async function fetchData() {
      try {
        const userResponse = await fetch(`http://localhost:3001/api/users/${userId}`);
        const userData: User = await userResponse.json();
        setUser(userData);
  
        const treesResponse = await fetch(`http://localhost:3001/api/decisions/trees/all/${userId}`);
        const treesData: DecisionTree[] = await treesResponse.json();
        setDecisionTrees(treesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, [userId]);

  
  console.log("👤 User object:", user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white font-sans grid grid-rows-[auto_1fr_auto]">
      {/* Navigation Bar */}
      <nav className="w-full px-6 py-4 flex items-center justify-center gap-6 text-sm bg-black/20 backdrop-blur-md shadow-md">
        <p className="cursor-pointer hover:text-yellow-300 transition">Home</p>
        <p className="cursor-pointer hover:text-yellow-300 transition">About</p>
        <p className="cursor-pointer hover:text-yellow-300 transition">Help</p>
      </nav>

      {/* Main Content */}
      <main className="px-6 py-12 space-y-10">
        {/* Full-width User Details Card */}
        <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
          {user ? (
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative w-24 h-24">
                  <Image
                    src="/images/profilepic.png"
                    alt="Profile Picture"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p>Email: {user.email}</p>
                  <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              {typeof user.score === 'number' && (
                <div className="mt-4 sm:mt-0 text-right">
                  <p className="font-semibold text-xl">High Score: {user.score}</p>
                </div>
              )}
            </div>
          ) : (
            <p>Loading user details...</p>
          )}
        </div>

        {/* Decision Trees History Card */}
        <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Decision History</h2>
          {loading ? (
            <p>Loading decision trees...</p>
          ) : decisionTrees.length > 0 ? (
            <div className="space-y-8">
              {decisionTrees.map((treeObj) => (
                <div key={treeObj.treeId}>
                  <h3 className="text-xl font-semibold mb-2">{treeObj.title}</h3>
                  <div className="flex justify-center overflow-x-auto">
                    <BinaryTreeNode node={treeObj.tree} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No decision trees found for this user.</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-4 text-center bg-black/20 backdrop-blur-md shadow-md">
        <p className="text-sm">© 2025 FinQuest. All rights reserved.</p>
      </footer>
    </div>
  );
}
