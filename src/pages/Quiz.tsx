
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuizQuestion from '@/components/QuizQuestion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, ArrowRight, RotateCcw, Coffee } from 'lucide-react';

// Mock quiz data
const quizMockData = [
  {
    id: "1",
    question: "Which of the following is a proper use of the past perfect tense?",
    options: [
      "I have eaten breakfast this morning.",
      "I had eaten breakfast before she arrived.",
      "I eat breakfast yesterday.",
      "I was eating breakfast when she arrives."
    ],
    correctAnswerIndex: 1,
    explanation: "The past perfect tense is used to describe an action that was completed before another past action. 'I had eaten breakfast before she arrived' correctly uses the past perfect to show that the eating happened before the arrival."
  },
  {
    id: "2",
    question: "Choose the sentence with correct subject-verb agreement:",
    options: [
      "The team are playing well.",
      "The team is playing well.",
      "The team am playing well.",
      "The team be playing well."
    ],
    correctAnswerIndex: 1,
    explanation: "In American English, collective nouns like 'team' are treated as singular, so they take singular verbs. 'The team is playing well' shows correct subject-verb agreement."
  },
  {
    id: "3",
    question: "What does the idiom 'to cost an arm and a leg' mean?",
    options: [
      "To be very expensive",
      "To cause physical injury",
      "To require a lot of effort",
      "To take a long time"
    ],
    correctAnswerIndex: 0,
    explanation: "The idiom 'to cost an arm and a leg' means that something is very expensive or costs a lot of money. For example: 'That new car cost me an arm and a leg!'"
  },
  {
    id: "4",
    question: "Which sentence contains a dangling modifier?",
    options: [
      "Running quickly, John reached the finish line first.",
      "While eating dinner, the phone rang.",
      "The book was read by Sarah in one day.",
      "After finishing the assignment, the TV was turned on."
    ],
    correctAnswerIndex: 3,
    explanation: "A dangling modifier is a phrase that does not clearly or logically modify any word in the sentence. In 'After finishing the assignment, the TV was turned on,' it sounds like the TV finished the assignment, which is illogical."
  },
  {
    id: "5",
    question: "Which of these words is a synonym for 'eloquent'?",
    options: [
      "Silent",
      "Articulate",
      "Confused",
      "Hesitant"
    ],
    correctAnswerIndex: 1,
    explanation: "'Articulate' means able to express thoughts and feelings clearly and effectively, which is synonymous with 'eloquent'."
  }
];

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

  // Timer logic
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && timerActive) {
      finishQuiz();
    }
  }, [timeLeft, timerActive]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimerActive(true);
  };

  const handleAnswer = (isCorrect: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = isCorrect;
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizMockData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizCompleted(true);
    setTimerActive(false);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizCompleted(false);
    setScore(0);
    setTimeLeft(300);
    setQuizStarted(true);
    setTimerActive(true);
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Calculate progress percentage
  const progressPercentage = (currentQuestionIndex / quizMockData.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-english-blue text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">English Quiz</h1>
            <p className="text-xl opacity-90">Test your English knowledge and track your progress</p>
          </div>
        </section>
        
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {!quizStarted ? (
              <div className="max-w-2xl mx-auto text-center bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">Ready to Test Your English?</h2>
                <p className="text-gray-700 mb-8">
                  This quiz contains {quizMockData.length} questions covering grammar, vocabulary, and idioms.
                  You'll have 5 minutes to complete all questions.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button className="btn-primary" onClick={startQuiz}>
                    Start Quiz
                  </Button>
                  <Button variant="outline">
                    Try a Different Quiz
                  </Button>
                </div>
              </div>
            ) : !quizCompleted ? (
              <div className="max-w-3xl mx-auto">
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
                  <div className="mb-4 sm:mb-0">
                    <p className="text-sm text-gray-500 mb-1">Question {currentQuestionIndex + 1} of {quizMockData.length}</p>
                    <Progress value={progressPercentage} className="w-48 h-2" />
                  </div>
                  <div className="flex items-center gap-2 text-lg font-medium">
                    <Coffee size={20} />
                    <span className={`${timeLeft < 60 ? 'text-english-red' : ''}`}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
                
                <QuizQuestion
                  question={quizMockData[currentQuestionIndex].question}
                  options={quizMockData[currentQuestionIndex].options}
                  correctAnswerIndex={quizMockData[currentQuestionIndex].correctAnswerIndex}
                  explanation={quizMockData[currentQuestionIndex].explanation}
                  onAnswer={handleAnswer}
                />
                
                <div className="mt-8 flex justify-end">
                  <Button 
                    onClick={goToNextQuestion}
                    className="bg-english-blue hover:bg-english-blue/90"
                    disabled={answers[currentQuestionIndex] === undefined}
                  >
                    {currentQuestionIndex < quizMockData.length - 1 ? (
                      <>
                        Next Question
                        <ArrowRight size={16} className="ml-2" />
                      </>
                    ) : (
                      'Finish Quiz'
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-english-green/10 flex items-center justify-center">
                    <Award size={48} className="text-english-green" />
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Quiz Completed!</h2>
                
                <div className="py-4 px-6 bg-gray-50 rounded-lg mb-6">
                  <div className="text-4xl font-bold text-english-blue mb-2">
                    {score} / {quizMockData.length}
                  </div>
                  <p className="text-gray-600">
                    {score === quizMockData.length ? 
                      'Perfect score! Excellent work!' : 
                      score >= quizMockData.length / 2 ? 
                        'Good job! Keep practicing to improve further.' : 
                        'Keep practicing! You\'ll get better with time.'}
                  </p>
                </div>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="font-medium mb-2">Time Taken</h3>
                    <p className="text-gray-700">{formatTime(300 - timeLeft)}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Accuracy</h3>
                    <p className="text-gray-700">
                      {Math.round((score / quizMockData.length) * 100)}%
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    className="bg-english-blue hover:bg-english-blue/90"
                    onClick={resetQuiz}
                  >
                    <RotateCcw size={16} className="mr-2" />
                    Try Again
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/lessons">Continue Learning</a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Quiz Suggestions */}
        <section className="py-16 px-4 bg-english-light">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-center">More Quizzes to Explore</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-serif text-xl font-bold mb-3">Grammar Essentials</h3>
                <p className="text-gray-700 mb-4">Test your knowledge of English grammar fundamentals.</p>
                <Button variant="outline" className="w-full">Start Quiz</Button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-serif text-xl font-bold mb-3">Vocabulary Challenge</h3>
                <p className="text-gray-700 mb-4">Expand your vocabulary with advanced words and definitions.</p>
                <Button variant="outline" className="w-full">Start Quiz</Button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-serif text-xl font-bold mb-3">Business English</h3>
                <p className="text-gray-700 mb-4">Practice professional vocabulary and communication skills.</p>
                <Button variant="outline" className="w-full">Start Quiz</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Quiz;
