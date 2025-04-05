"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [savings, setSavings] = useState("");
  const [career, setCareer] = useState("");
  const [job, setJob] = useState("");
  const [isUnemployed, setIsUnemployed] = useState(false);
  const [income, setIncome] = useState("");

  const [major, setMajor] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  const [hobbies, setHobbies] = useState("");
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-[#202020] text-white font-[family-name:var(--font-geist-sans)]">
      {/* NAVIGATION (Optional) */}
      <nav className="w-full px-6 py-3 flex items-center justify-center gap-6 text-sm">
        {/* Example placeholders – remove or replace as needed */}
        <p className="cursor-pointer hover:text-gray-300">Home</p>
        <p className="cursor-pointer hover:text-gray-300">About</p>
        <p className="cursor-pointer hover:text-gray-300">Help</p>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex flex-col items-center justify-center p-8 gap-8">
        {/* Title */}
        <h1 className="text-3xl font-bold">FinQuest</h1>
        {/* Short explanation */}
        <p className="text-center text-gray-300 max-w-xl">
          Welcome to FinQuest—an interactive journey to sharpen your financial
          choices! Please fill out your details in-line below.
        </p>

        {/* Inline Input Section */}
        <div className="text-gray-200 leading-7 max-w-xl">
          <p className="mb-4">
            Hello, my name is{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="inline-block w-36 rounded-md px-2 py-1 text-white"
            />
            , I am{" "}
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="inline-block w-15 rounded-md px-2 py-1 text-white"
            />
            {" "}years old, I have ${" "}
            <input
              type="number"
              value={savings}
              onChange={(e) => setSavings(e.target.value)}
              placeholder="Savings"
              className="inline-block w-20 rounded-md px-2 py-1 text-white"
            />
            {" "}saved in the bank, and I am{" "}
            <select
              title="Select career"
              className="inline-block w-48 rounded-md px-2 py-1 text-white"
              value={career}
              onChange={(e) => {
                setCareer(e.target.value);
                setIsStudent(e.target.value === "Student");
                setIsUnemployed(e.target.value === "Unemployed");
                setIncome(e.target.value === "Employed" ? "$100,000" : "$0");
              }}
            >
              <option value="">Select</option>
              <option value="Employed">Employed</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Student">Student</option>
              <option value="Unemployed">Unemployed</option>
            </select>
              {!isStudent && !isUnemployed && (
              <>
                {" "}working as a{" "}
                <input
                  type="text"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  placeholder="Software Engineer"
                  className="inline-block w-24 rounded-md px-2 py-1 text-white"
                />
                {" "}with an income of ${" "}
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="50,000"
                />
              </>
            )}
            {isStudent && (
              <>
                {" "}majoring in{" "}
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  placeholder="e.g. Finance"
                  className="inline-block w-24 rounded-md px-2 py-1 text-white"
                />
              </>
            )}
            {" "}and my hobbies are{" "}
            <input
              type="text"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
              placeholder="Reading, Cooking, etc." 
              className="inline-block w-32 rounded-md px-2 py-1 text-white"
            />
          </p>
          
          
          <p>
            Thank you for providing your information,{" "}
            <span className="font-bold">
              {name || "Guest"}
            </span>
            ! Stay tuned for your next financial decision.
          </p>


        </div>
      </main>

    </div>
  );
}
