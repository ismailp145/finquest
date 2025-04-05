"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [savings, setSavings] = useState("");
  const [career, setCareer] = useState("");
  const [major, setMajor] = useState("");
  const [isStudent, setIsStudent] = useState(false);

  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">     
       {/* NAVIGATION (Optional) */}
      <nav className="w-full px-6 py-3 flex items-center justify-center gap-6 text-sm">
        <p className="cursor-pointer hover:text-gray-300">Name</p>
        <p className="cursor-pointer hover:text-gray-300">Age</p>
        <p className="cursor-pointer hover:text-gray-300">Income</p>
        <p className="cursor-pointer hover:text-gray-300">Career</p>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex flex-col items-center justify-center gap-8 p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold tracking-wide">FinQuest</h1>
        {/* Short sentence */}
        <p className="text-center text-gray-300 max-w-md">
          An interactive journey to sharpen your financial choices!
        </p>

        {/* SINGLE SCENARIO BOX (replaces the fill-in form + scenario) */}
        <div className="bg-black rounded-lg p-6 w-full max-w-lg">
          <p className="mb-4 font-semibold text-lg">Your Starting Scenario:</p>

          {/* USER INPUT FIELDS */}
          <div className="flex flex-col gap-3 mb-6">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Name</label>
              <input
                type="text"
                className="w-full rounded-md px-3 py-2 text-gray-800"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Age */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Age</label>
              <input
                type="number"
                className="w-full rounded-md px-3 py-2 text-gray-800"
                placeholder="e.g. 25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            {/* Savings */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Savings (in $)
              </label>
              <input
                type="number"
                className="w-full rounded-md px-3 py-2 text-gray-800"
                placeholder="e.g. 1000"
                value={savings}
                onChange={(e) => setSavings(e.target.value)}
              />
            </div>
            {/* Career */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Career</label>
              <select
                title="Select career"
                className="w-full rounded-md px-3 py-2 text-gray-800"
                value={career}
                onChange={(e) => {
                  setCareer(e.target.value);
                  setIsStudent(e.target.value === "Student");
                }}
              >
                <option value="">Select career</option>
                <option value="Employed">Employed</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Student">Student</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>
            {/* Major (Conditional) */}
            {isStudent && (
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Major
                </label>
                <input
                  type="text"
                  className="w-full rounded-md px-3 py-2 text-gray-800"
                  placeholder="e.g. Finance"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* SCENARIO TEXT USING USER INPUT */}
          <p className="mb-6">
            Hello{" "}
            <span className="font-bold">
              {name || "Stranger"}
            </span>
            , you’re{" "}
            <span className="font-bold">
              {age ? `${age} years old` : "___ years old"}
            </span>
            . Currently, you have{" "}
            <span className="font-bold">
              {savings || "___"}
            </span>{" "}
            dollars in your bank account, and you’re{" "}
            {isStudent ? (
              <span className="font-bold">
                a student majoring in {major || "___"}.
              </span>
            ) : (
              <span className="font-bold">
                {career || "___"}.
              </span>
            )}{" "}
            You’re about to face your first big financial decision—choose wisely!
          </p>

          {/* TWO CHOICES */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-gray-700 rounded-md p-4 text-center cursor-pointer hover:bg-gray-600 transition-colors">
              Use your savings on a dream vacation
            </div>
            <div className="flex-1 bg-gray-700 rounded-md p-4 text-center cursor-pointer hover:bg-gray-600 transition-colors">
              Invest in an index fund
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
