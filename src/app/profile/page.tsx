'use client';

import Image from 'next/image';
import React from 'react';

interface DecisionNode {
  decision: string;
  chosen: boolean;
  children?: DecisionNode[];
}

interface GameDecisionTree {
  game: string;
  tree: DecisionNode;
}

// Sample data: two games with binary decision trees
const decisionHistory: GameDecisionTree[] = [
  {
    game: "Game 1",
    tree: {
      decision: "Invest in College Fund",
      chosen: true,
      children: [
        {
          decision: "Buy a New Phone",
          chosen: false,
        },
        {
          decision: "Reinvest in Stocks",
          chosen: true,
          children: [
            {
              decision: "Sell Some Shares",
              chosen: false,
            },
            {
              decision: "Hold Position",
              chosen: true,
            },
          ],
        },
      ],
    },
  },
  {
    game: "Game 2",
    tree: {
      decision: "Start a Side Hustle",
      chosen: true,
      children: [
        {
          decision: "Invest in Equipment",
          chosen: true,
        },
        {
          decision: "Market on Social Media",
          chosen: true,
          children: [
            {
              decision: "Hire an Influencer",
              chosen: false,
            },
            {
              decision: "DIY Marketing",
              chosen: true,
            },
          ],
        },
      ],
    },
  },
];

// Recursive component to render a binary tree node
const BinaryTreeNode = ({ node }: { node: DecisionNode }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Node */}
      <div
        className={`px-4 py-2 border rounded-md text-sm text-center whitespace-pre-wrap ${
          node.chosen
            ? 'bg-green-200 border-green-600 font-bold text-black'
            : 'bg-gray-100 border-gray-300 text-black'
        }`}
      >
        {node.decision}
      </div>

      {node.children && node.children.length > 0 && (
        <div className="flex flex-col items-center mt-2 relative">
          {/* Vertical connector from this node to children */}
          <div className="w-px h-4 bg-gray-400"></div>
          {/* Horizontal connector */}
          <div className="flex justify-between w-full relative">
            {/* Draw a horizontal line spanning between the first and last child's center */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full border-t border-gray-400"></div>
            {node.children.map((child, index) => (
              <div key={index} className="flex flex-col items-center px-2">
                {/* Child node connector (a small vertical line from the horizontal line to the child) */}
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
  const user = {
    name: 'Alice',
    age: 20,
    goals: 'Save for tuition, invest wisely',
    hobbies: 'Painting, reading',
    money: 450,
    photoUrl: '/images/profilepic.png',
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-r from-green-200 to-blue-300">
      {/* Profile Card */}
      <div className="w-full bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
          <div className="relative w-32 h-32 mb-4 sm:mb-0">
            <Image
              src={user.photoUrl}
              alt="Profile Picture"
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div className="text-black text-center sm:text-left">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p>Age: {user.age}</p>
            <p>Goals: {user.goals}</p>
            <p>Hobbies: {user.hobbies}</p>
            <p className="font-semibold">Current Money: ${user.money}</p>
          </div>
        </div>
      </div>

      {/* Decision History Card */}
      <div className="w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-black">Decision History</h2>
        <div className="space-y-8">
          {decisionHistory.map((game, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-2 text-black">
                {game.game}
              </h3>
              <div className="flex justify-center overflow-x-auto">
                <BinaryTreeNode node={game.tree} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
