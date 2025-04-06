"use client";
import React, { useState } from "react";

interface Choice {
  label: string;
  description: string;
  score?: number;
}

interface ChoiceCardProps {
  choice: Choice;
  choice2: Choice;
  onSubmit: (choice: Choice) => Promise<void>;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({
  choice,
  choice2,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleChoiceClick = async (selected: Choice) => {
    try {
      setIsLoading(true);
      setSelectedChoice(selected.label);
      await onSubmit(selected);
    } catch (error) {
      console.error("Error submitting choice:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row gap-4 w-full max-w-4xl">
      <div
        onClick={() => handleChoiceClick(choice)}
        className={`relative flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:scale-[1.02] cursor-pointer min-h-[200px] flex flex-col ${
          isLoading && selectedChoice === choice.label ? "opacity-50" : ""
        }`}
      >
        <h3 className="text-xl font-semibold text-white mb-2">Choice 1</h3>
        <p className="text-gray-200 text-lg mb-4">{choice.label}</p>
        <p className="text-gray-400 text-sm mt-auto">{choice.description}</p>
        {isLoading && selectedChoice === choice.label && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      <div
        onClick={() => handleChoiceClick(choice2)}
        className={`relative flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:scale-[1.02] cursor-pointer min-h-[200px] flex flex-col ${
          isLoading && selectedChoice === choice2.label ? "opacity-50" : ""
        }`}
      >
        <h3 className="text-xl font-semibold text-white mb-2">Choice 2</h3>
        <p className="text-gray-200 text-lg mb-4">{choice2.label}</p>
        <p className="text-gray-400 text-sm mt-auto">{choice2.description}</p>
        {isLoading && selectedChoice === choice2.label && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChoiceCard;