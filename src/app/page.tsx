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
  const [inputSummary, setInputSummary] = useState("");

  // Function to generate the input summary string (for display purposes only)
  const generateInputSummary = () => {
    let summary = `Name: ${name}, Age: ${age}, Savings: $${savings}, Career: ${career}`;
    
    if (!isStudent && !isUnemployed) {
      summary += `, Job: ${job}, Income: $${income}`;
    }
    
    if (isStudent) {
      summary += `, Major: ${major}`;
    }
    
    summary += `, Hobbies: ${hobbies}`;
    
    setInputSummary(summary);
    return summary;
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Generate summary for display purposes
    generateInputSummary();
    
    // Create a JSON object with all form data
    const formData = {
      name,
      age: parseInt(age) || 0,
      // career,
      job: !isStudent && !isUnemployed ? job : "",
      savings: parseFloat(savings) || 0,
      // income: !isStudent && !isUnemployed ? parseFloat(income) || 0 : 0,
      // isStudent,
      // isUnemployed,
      // major: isStudent ? major : "",
      hobbies,
      previousSummary: inputSummary,
    };
   
    console.log("Submitting to backend:", formData);
    
    // Send the JSON object to the backend
    fetch("http://localhost:8080/api/gemini/decision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), 
    })


    .then(response => response.json())
    .then(data => {
      console.log("Success:", data);
      // Handle the response data here
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white font-sans grid grid-rows-[auto_1fr_auto]">
      {/* NAVIGATION */}
      <nav className="w-full px-6 py-4 flex items-center justify-center gap-6 text-sm bg-black/20 backdrop-blur-md shadow-md">
        <p className="cursor-pointer hover:text-yellow-300 transition">Home</p>
        <p className="cursor-pointer hover:text-yellow-300 transition">About</p>
        <p className="cursor-pointer hover:text-yellow-300 transition">Help</p>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex flex-col items-center justify-center px-6 py-12 gap-15">
        <h1 className="text-5xl font-bold tracking-wide text-yellow-200 drop-shadow-md">
          🌟 FinQuest
        </h1>
        <p className="text-center text-yellow-100 max-w-2xl text-lg">
          Welcome to FinQuest — an interactive journey to sharpen your financial choices!
        </p>

        {/* Glassy Form Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-4xl transition-all duration-300 hover:scale-[1.02]">
          <p className="leading-[3rem] text-white text-lg mb-4">
            Hello, my name is{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="input-field w-36"
            />
            , I am{" "}
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="input-field w-20"
            />{" "}
            years old, with ${" "}
            <input
              type="number"
              value={savings}
              onChange={(e) => setSavings(e.target.value)}
              placeholder="Savings"
              className="input-field w-30"
            />{" "}
            saved in the bank, and I am{" "}
            <select
              title="Career"
              className="select-field w-48"
              value={career}
              onChange={(e) => {
                setCareer(e.target.value);
                setIsStudent(e.target.value === "Student");
                setIsUnemployed(e.target.value === "Unemployed");
                setIncome(e.target.value === "Employed" ? "100000" : "0");
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
                  className="input-field w-60"
                />{" "}
                with an income of ${" "}
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="100000"
                  className="input-field w-28"
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
                  className="input-field w-40"
                />
              </>
            )}
            {" "}and my hobbies are{" "}
            <input
              type="text"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
              placeholder="Reading, Gaming..."
              className="input-field w-52"
            />
            .
          </p>
        </div>

        {/* Confirmation */}
        <p className="text-center text-lime-300 text-lg">
          ✅ Thanks, <span className="font-bold">{name || "Guest"}</span>! You&apos;re ready to begin your financial quest.
        </p>
        
        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
          className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
        >
          Submit to Backend
        </button>
        
        {/* Display the summary (for testing) */}
        {inputSummary && (
          <div className="mt-6 p-4 bg-black/30 rounded-lg max-w-2xl w-full">
            <h3 className="text-yellow-200 font-bold mb-2">Input Summary:</h3>
            <p className="text-sm break-words">{inputSummary}</p>
          </div>
        )}
      </main>
    </div>
  );
}
