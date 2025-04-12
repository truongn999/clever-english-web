
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  correctAnswerIndex,
  explanation,
  onAnswer,
}) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleOptionClick = (index: number) => {
    if (selectedAnswerIndex !== null) return; // Prevent changing answer
    
    setSelectedAnswerIndex(index);
    const isCorrect = index === correctAnswerIndex;
    
    // Show explanation after selecting an answer
    setShowExplanation(true);
    
    // Call the callback with the result
    onAnswer(isCorrect);
  };

  const getOptionClassName = (index: number) => {
    if (selectedAnswerIndex === null) {
      return "border-2 border-gray-200 hover:border-english-blue";
    }

    if (index === correctAnswerIndex) {
      return "border-2 border-english-green bg-english-green/10";
    }

    if (index === selectedAnswerIndex && selectedAnswerIndex !== correctAnswerIndex) {
      return "border-2 border-english-red bg-english-red/10";
    }

    return "border-2 border-gray-200 opacity-70";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h3 className="text-xl font-serif font-medium text-english-dark">{question}</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full p-4 text-left rounded-lg transition-all ${getOptionClassName(index)}`}
            onClick={() => handleOptionClick(index)}
            disabled={selectedAnswerIndex !== null}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center rounded-full border mr-3 border-gray-300">
                {selectedAnswerIndex !== null && index === correctAnswerIndex && (
                  <CheckCircle className="w-5 h-5 text-english-green" />
                )}
                {selectedAnswerIndex === index && index !== correctAnswerIndex && (
                  <XCircle className="w-5 h-5 text-english-red" />
                )}
                {selectedAnswerIndex === null && (
                  <span>{String.fromCharCode(65 + index)}</span>
                )}
              </div>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </CardContent>
      
      {showExplanation && (
        <CardFooter className="flex flex-col items-start">
          <div className="mt-4 p-4 bg-gray-50 rounded-lg w-full">
            <h4 className="font-medium text-english-dark mb-2">Explanation:</h4>
            <p className="text-gray-700">{explanation}</p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default QuizQuestion;
