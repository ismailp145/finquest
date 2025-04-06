"use client";
import InputPrompt from "@/components/InputPrompt";
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
  const [outputSummary, setOutputSummary] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [count, setCount] = useState(0);
  const [choices, setChoices] = useState([]);
  const [choices2, setChoices2] = useState([]);


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
    fetch("http://localhost:8080/api/ai/gemini/decision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), 
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Success:", data);
      setOutputSummary(data.scenario);
      setCount(count + 1);
      setChoices(data.choices[0].label);
      setChoices2(data.choices[1].label);

      setIsFirstTime(false);

      // Handle the response data here
    })
    .catch(error => {

      console.error("Error in fetch:", error);
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

          {/* Input Prompt */}
          {isFirstTime && (
            <InputPrompt
              name={name}
              setName={setName}
              age={age}
              setAge={setAge}
              savings={savings}
              setSavings={setSavings}
              career={career}
              setCareer={setCareer}
              isStudent={isStudent}
              setIsStudent={setIsStudent}
              isUnemployed={isUnemployed}
              setIsUnemployed={setIsUnemployed}
              job={job}
              setJob={setJob}
              income={income}
              setIncome={setIncome}
              major={major}
              setMajor={setMajor}
              hobbies={hobbies}
              setHobbies={setHobbies}
            />
          )}
          {!isFirstTime && (
            <div className="">
              <h3 className="text-yellow-200 font-bold mb-2">Scenario {count}</h3>
              <p className="">{outputSummary}</p>
            </div>
          )}

        </div>
        {/* Choices */}
        {!isFirstTime && (
          <div className="">
            <h3 className="text-yellow-200 font-bold mb-2">Choices</h3>
            <p className="">{choices}</p>
            <p className="">{choices2}</p>
          </div>
        )}

        {/* Confirmation */}
        {isFirstTime && (
          <p className="text-center text-lime-300 text-lg">
            ✅ Thanks, <span className="font-bold">{name || "Guest"}</span>! You&apos;re ready to begin your financial quest.
          </p>
        )}
        
        {/* Submit Button */}
        {isFirstTime && (
          <button 
            onClick={handleSubmit}
            className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
        >
          Submit to Backend
        </button>
        )}
        
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