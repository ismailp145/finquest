import React from "react";

const InputPrompt = ({ name, setName, age, setAge, savings, setSavings, career, setCareer, isStudent, setIsStudent, isUnemployed, setIsUnemployed, job, setJob, income, setIncome, major, setMajor, hobbies, setHobbies }: InputPromptProps) => {
  return (
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
  )
};

export default InputPrompt;

interface InputPromptProps {
  name: string;
  setName: (name: string) => void;
  age: string;
  setAge: (age: string) => void;
  savings: string;
  setSavings: (savings: string) => void;
  career: string;
  setCareer: (career: string) => void;
  isStudent: boolean;
  setIsStudent: (isStudent: boolean) => void;
  isUnemployed: boolean;
  setIsUnemployed: (isUnemployed: boolean) => void;
  job: string;
  setJob: (job: string) => void;
  income: string;
  setIncome: (income: string) => void;
  major: string;
  setMajor: (major: string) => void;
  hobbies: string;
  setHobbies: (hobbies: string) => void;
}