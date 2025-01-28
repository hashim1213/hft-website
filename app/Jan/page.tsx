'use client';

import React, { useState } from 'react';
import { Heart, Trophy, X } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  specialQuestion?: boolean;
}

const Page: React.FC = () => {
  const questions: Question[] = [
    {
      question: "When was the first time we met?",
      options: ["1st of December", "3rd of December", "5th of December", "7th of December"],
      correctAnswer: "3rd of December"
    },
    {
      question: "What was the first thing I 3D printed for you but never gave it to you initially?",
      options: ["A cat", "A heart", "The word SLAY", "A butterfly"],
      correctAnswer: "The word SLAY"
    },
    {
      question: "Where was our first kiss?",
      options: ["Queen Elezibeth Park", "Dinsdale Park", "Parking Lot of Keystone", "The Oval"],
      correctAnswer: "Parking Lot of Keystone"
    },
    {
      question: "What class did we have together?",
      options: ["Solar Systems", "English", "Institutions and Processes", "Criminology"],
      correctAnswer: "Institutions and Processes"
    },
    {
      question: "Who is funnier?",
      options: ["Hashim", "Jan"],
      correctAnswer: "Hashim",
      specialQuestion: true
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [showProposal, setShowProposal] = useState<boolean>(false);
  const [showFinal, setShowFinal] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [janButtonPosition, setJanButtonPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [showJanPopup, setShowJanPopup] = useState<boolean>(false);

  const handleAnswerClick = (answer: string): void => {
    if (questions[currentQuestion].specialQuestion && answer === "Jan") {
      setShowJanPopup(true);
      return;
    }

    setSelectedAnswer(answer);
    setIsCorrect(answer === questions[currentQuestion].correctAnswer);
    setShowFeedback(true);

    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const moveJanButton = (): void => {
    const newX = Math.random() * 80;
    const newY = Math.random() * 80;
    setJanButtonPosition({ x: newX, y: newY });
  };

  const handleProposalClick = (): void => {
    setShowProposal(true);
  };

  const handleYesClick = (): void => {
    setShowFinal(true);
  };

  const moveNoButton = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const btn = e.target as HTMLButtonElement;
    const maxWidth = window.innerWidth - btn.offsetWidth;
    const maxHeight = window.innerHeight - btn.offsetHeight;
    const newX = Math.random() * maxWidth;
    const newY = Math.random() * maxHeight;
    btn.style.position = 'fixed';
    btn.style.left = `${newX}px`;
    btn.style.top = `${newY}px`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 p-4 sm:p-6">
      <div className="w-full max-w-lg mx-auto relative">
        {!showScore && !showProposal && !showFinal && (
          <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8 transform hover:scale-105 transition-all">
            <div className="text-2xl sm:text-3xl font-bold text-pink-600 mb-4 sm:mb-8">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            
            <div className="text-xl sm:text-2xl text-gray-700 mb-6 sm:mb-8">
              {questions[currentQuestion].question}
            </div>

            <div className="space-y-3 sm:space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-3 sm:p-4 text-left rounded-lg text-base sm:text-lg font-medium transition-all
                    ${selectedAnswer === option 
                      ? showFeedback
                        ? isCorrect
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-pink-500 text-white'
                      : 'bg-pink-100 text-pink-800 hover:bg-pink-200'
                    }`}
                  onClick={() => handleAnswerClick(option)}
                  onMouseEnter={() => {
                    if (questions[currentQuestion].specialQuestion && option === "Jan") {
                      moveJanButton();
                    }
                  }}
                  style={questions[currentQuestion].specialQuestion && option === "Jan" 
                    ? {
                        position: 'absolute',
                        left: `${janButtonPosition.x}%`,
                        top: `${janButtonPosition.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }
                    : {}
                  }
                  disabled={showFeedback}
                >
                  {option}
                </button>
              ))}
            </div>

            {showFeedback && (
              <div className={`mt-4 text-lg sm:text-xl font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                {isCorrect ? '✨ Correct! ✨' : '❌ Not quite! ❌'}
              </div>
            )}
          </div>
        )}

        {showScore && !showProposal && (
          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 text-center animate-fadeIn">
            <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500 mx-auto mb-4" />
            <div className="text-3xl sm:text-4xl font-bold text-pink-600 mb-4">
              Quiz Complete!
            </div>
            <div className="text-xl sm:text-2xl text-gray-700 mb-6 sm:mb-8">
              You scored {score} out of {questions.length}!
            </div>
            <button
              onClick={handleProposalClick}
              className="bg-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-bold hover:bg-pink-600 transform hover:scale-110 transition-all"
            >
              Claim Your Prize! 🎁
            </button>
          </div>
        )}

        {showProposal && !showFinal && (
          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 text-center animate-fadeIn">
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-pink-500 mx-auto mb-4 animate-pulse" />
            <div className="text-3xl sm:text-4xl font-bold text-pink-600 mb-6 sm:mb-8">
              Will you be my Valentine? 💝
            </div>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={handleYesClick}
                className="bg-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-bold hover:bg-pink-600 transform hover:scale-110 transition-all"
              >
                Yes! 🥰
              </button>
              <button 
                onMouseEnter={moveNoButton}
                className="bg-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-bold transition-all"
              >
                No 😢
              </button>
            </div>
          </div>
        )}

        {showFinal && (
          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 text-center animate-bounce">
            <div className="text-4xl sm:text-6xl font-bold text-pink-600 animate-bounce">
              YAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
            </div>
          </div>
        )}

        {/* Jan Popup */}
        {showJanPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full relative animate-fadeIn">
              <button 
                onClick={() => setShowJanPopup(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-xl font-bold text-pink-600 mb-4">
                Oops! Wrong Answer! 😅
              </div>
              <div className="text-gray-700 mb-4">
                Please read the question carefully and select the correct answer.
              </div>
              <button
                onClick={() => setShowJanPopup(false)}
                className="bg-pink-500 text-white px-4 py-2 rounded-full text-lg font-bold hover:bg-pink-600 w-full"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;