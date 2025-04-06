"use client";
import ChoiceCard from "@/components/ChoiceCard";
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
  const [choices, setChoices] = useState("");
  const [choices2, setChoices2] = useState("");
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");


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
  const handleSubmit = async (choice?: string) => {
    if (!choice) {
      // Initial form submission
      generateInputSummary();
      
      const formData = {
        name,
        age: parseInt(age) || 0,
        job: !isStudent && !isUnemployed ? job : "",
        savings: parseFloat(savings) || 0,
        hobbies,
        previousSummary: inputSummary,
      };
     
      console.log("Submitting to backend:", formData);
      
      try {
        const response = await fetch("http://localhost:8080/api/ai/gemini/decision", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), 
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Success:", data);
        setOutputSummary(data.scenario);
        setCount(count + 1);
        setChoices(data.choices[0].label);
        setChoices2(data.choices[1].label);
        setDescription1(data.choices[0].description);
        setDescription2(data.choices[1].description);
        setIsFirstTime(false);
      } catch (error) {
        console.error("Error in fetch:", error);
      }
    } else {
      // Choice selection submission
      try {
        console.log("Submitting choice:", choice);
        const response = await fetch("http://localhost:8080/api/ai/gemini/decision", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ choice }), 
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Choice submitted:", data);
        setOutputSummary(data.scenario);
        setCount(count + 1);
        setChoices(data.choices[0].label);
        setChoices2(data.choices[1].label); 
        setDescription1(data.choices[0].description);
        setDescription2(data.choices[1].description);
      } catch (error) {
        console.error("Error submitting choice:", error);
      }
    }
  };

  // Function to handle button click
  const handleButtonClick = () => {
    handleSubmit();
  };
 
  // TODO send choice to backend to three differnt endpoints 
  const handleChoiceClick = async (choice: string) => {
      try {
        const response = await fetch("http://localhost:8080/api/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ choice }), 
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error submitting choice:", error);
      }
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
          <ChoiceCard
            choice={choices}
            choice2={choices2}
            description1={description1}
            description2={description2}
            onSubmit={handleSubmit}
          />  
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
            onClick={handleButtonClick}
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