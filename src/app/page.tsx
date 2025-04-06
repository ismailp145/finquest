"use client";
import ChoiceCard from "@/components/ChoiceCard";
import InputPrompt from "@/components/InputPrompt";
import { useState } from "react";

interface Choice {
  label: string;
  description: string;
  score?: number;
}

export default function Home() {
  const apiUrl = "http://localhost:3001/api";

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
  const [choices, setChoices] = useState<Choice[]>([]);
  const [score, setScore] = useState(0);

  const [parentId, setParentId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const addDecisionTree = async () => {
    const decisionTree = {
      userId:"67f1d68a0532f594b700172e",
      title:"Decision Tree",
    };

    try {
      const response = await fetch(`${apiUrl}/decisions/trees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(decisionTree),
      });

      const data = await response.json();

      const decisionTreeId = data._id;
       // Assuming the response contains the ID of the created decision tree

      const rootNodeResponse = await fetch(`${apiUrl}/decisions/nodes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: "Start",
          explaination: "Initial Decision",
          score: 0,
          parentId: null,
        }),
      }); 

      const rootNodeData = await rootNodeResponse.json();
      const rootNodeId = rootNodeData._id;

      await fetch(`${apiUrl}/decisions/userDecision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          decisionId: decisionTreeId,
          rootId: rootNodeId,
          decisionLabel: "User Decision",
        }),
      });

      setParentId(rootNodeId); // Store the parentId for future use

      console.log("Decision Tree:", data);
    } catch (error) {
      console.error("Error adding decision tree:", error);
    }
  }

  const handleCreatingNodes =  async (matched)=>{
   choices.forEach(async (choice) => {
    const res=await fetch(`${apiUrl}/decisions/nodes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: choice.label,
        explanation: choice.description,
        score: choice.score || 0,
        parentId: parentId, // Use the stored parentId here
      }),
    });
    const data = await res.json();
    const nodeId = data._id;
    if(matched.label === choice.label){
      setParentId(nodeId); // Update parentId for the next node creation
    }
   }
  );
  }

  const generateInputSummary = async (choice?: Choice) => {
    if (!choice || !choice.label) return;

    const summaryInput = {
      name,
      age,
      income:income,
      occupation: career,
      job: job,
      currentMoney: savings,
      hobbies,
      decisions: [choice],
    };

    try {
      const response = await fetch(`${apiUrl}/ai/gemini/summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(summaryInput),
      });
      const data = await response.json();
      setInputSummary(data.summary);
    } catch (error) {
      console.error("Error generating input summary:", error);
    }
  };
  const handleInitialSubmit = async () => {
    const formData = {
      name,
      age: parseInt(age) || 0,
      job: !isStudent && !isUnemployed ? job : "",
      savings: parseFloat(savings) || 0,
      hobbies,
      income: income,
      occupation: career,
      previousSummary: inputSummary,
    };
  
    try {
      const response = await fetch(`${apiUrl}/ai/gemini/decision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const data = await response.json();
  
      setOutputSummary(data.scenario);
      setChoices(data.choices);
      setCount(prev => prev + 1);
      setIsFirstTime(false);
    } catch (error) {
      console.error("Error submitting initial decision:", error);
    }
  };
  
  const handleChoiceSubmit = async (choice: Choice) => {
    const matched = choices.find((c: Choice) =>
      c.label.trim().toLowerCase() === choice.label.trim().toLowerCase()
    );
  
    await handleCreatingNodes(matched);

    console.log("🎯 Matching Choice:", matched);
  
    if (matched) {
      setScore(prev => prev + (matched.score || 0));
      await generateInputSummary(matched);
      await handleInitialSubmit(); // fetch next scenario
    } else {
      console.warn("❌ No matching choice found.");
      console.log("Submitted:", choice.label);
      console.log("Available:", choices.map(c => c.label));
    }

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Hide the popup after 3 second
  };
  
  async function initGame(){
   await addDecisionTree();
   await handleInitialSubmit();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white font-sans grid grid-rows-[auto_1fr_auto]">
      <nav className="w-full px-6 py-4 flex items-center justify-center gap-6 text-sm bg-black/20 backdrop-blur-md shadow-md">
        <p className="cursor-pointer hover:text-yellow-300 transition">Home</p>
        <p className="cursor-pointer hover:text-yellow-300 transition">About</p>
        <p className="cursor-pointer hover:text-yellow-300 transition">Help</p>
      </nav>
      {/* {!isFirstTime && (
        <button
          onClick={() => window.location.reload()}
          className="mt-8 px-6 py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
        >
          🔚 End Game
        </button>
    )} */}
    {showPopup && (
      <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce z-50">
        ✅ Decisions have been saved to your profile!
      </div>
    )}
      <main className="flex flex-col items-center justify-center px-6 py-12 gap-10">
        <h1 className="text-5xl font-bold tracking-wide text-yellow-200 drop-shadow-md">🌟 FinQuest</h1>
        
        <h2 className="text-2xl text-green-300 font-semibold mt-2">🧮 Score: {Math.floor(score*100)}</h2>
        {
          !isFirstTime && window && (
            <div className="h-full flex justify-center items-center">
            <button
              onClick={() => window.location.reload()}
              className="h-fit px-4 py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-xl shadow-md transition-all duration-300 hover:scale-105"
            >
              🔚 End Game
            </button>
          </div>
          )
        }
        <p className="text-center text-yellow-100 max-w-2xl text-lg">
          Welcome to FinQuest — an interactive journey to sharpen your financial choices!
        </p>
        
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-4xl transition-all duration-300 hover:scale-[1.02]">
          {isFirstTime ? (
            <InputPrompt
              name={name} setName={setName}
              age={age} setAge={setAge}
              savings={savings} setSavings={setSavings}
              career={career} setCareer={setCareer}
              isStudent={isStudent} setIsStudent={setIsStudent}
              isUnemployed={isUnemployed} setIsUnemployed={setIsUnemployed}
              job={job} setJob={setJob}
              income={income} setIncome={setIncome}
              major={major} setMajor={setMajor}
              hobbies={hobbies} setHobbies={setHobbies}
            />
          ) : (
            <div>
              <h3 className="text-yellow-200 font-bold mb-2">Scenario {count}</h3>
              <p>{outputSummary}</p>
            </div>
          )}
        </div>

        {!isFirstTime && choices.length === 2 && (
          <ChoiceCard
          choice={choices[0]}
          choice2={choices[1]}
          onSubmit={handleChoiceSubmit}
        />
        )}

        {isFirstTime && (
          <>
            <p className="text-center text-lime-300 text-lg mt-4">
              ✅ Thanks, <span className="font-bold">{name || "Guest"}</span>! You&apos;re ready to begin your financial quest.
            </p>
            <button
              onClick={initGame}
              className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            >
              Submit & Start Quest
            </button>
          </>
        )}

        {/* {inputSummary && (
          <div className="mt-6 p-4 bg-black/30 rounded-lg max-w-2xl w-full">
            <h3 className="text-yellow-200 font-bold mb-2">Input Summary:</h3>
            <p className="text-sm break-words">{inputSummary}</p>
          </div>
        )} */}
      </main>
    </div>
  );
}
