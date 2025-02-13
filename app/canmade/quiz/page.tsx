'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Share2 } from 'lucide-react';

// Types
interface Answer {
  answer: string;
  correct: number;
}

interface Question {
  question: string;
  answers: Answer[];
  details: string;
  difficulty: string;
}

interface Quiz {
  quizSlug: string;
  totalQuestions: number;
  questions: Question[];
}

interface QuizData {
  statistics: {
    totalQuizzes: number;
    totalQuestions: number;
    questionsByDifficulty: {
      easy: number;
      medium: number;
      hard: number;
    };
  };
  quizzes: Record<string, Quiz>;
}

enum QuizState {
  WELCOME = 'welcome',
  SASKATCHEWAN_CHALLENGE = 'saskatchewanChallenge',
  QUIZ = 'quiz',
  RESULT = 'result'
}

enum QuizMode {
  PRACTICE = 'practice',
  FULL = 'full'
}

export default function CanadianQuizPage() {
  const [quizState, setQuizState] = useState<QuizState>(QuizState.WELCOME);
  const [quizMode, setQuizMode] = useState<QuizMode>(QuizMode.FULL);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [saskatchewanSpelling, setSaskatchewanSpelling] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Load questions from JSON
    const loadQuestions = async () => {
      try {
        const response = await fetch('/data/all_quizzes.json');
        const data: QuizData = await response.json();
        const allQuestions = Object.values(data.quizzes)
          .flatMap(quiz => quiz.questions);
        setQuestions(allQuestions);
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    if (quizState === QuizState.QUIZ && !timer) {
      const newTimer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      setTimer(newTimer);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [quizState, timer]);

  const startQuiz = (mode: QuizMode) => {
    const questionCount = mode === QuizMode.PRACTICE ? 10 : 100;
    const shuffledQuestions = [...questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, questionCount);
    
    setQuestions(shuffledQuestions);
    setQuizMode(mode);
    setElapsedTime(0);
    setQuizState(QuizState.QUIZ);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const checkSaskatchewanSpelling = () => {
    if (saskatchewanSpelling.toLowerCase() === 'saskatchewan') {
      startQuiz(quizMode);
    }
  };

  const checkAnswer = (selectedIndex: number) => {
    if (isAnswerLocked) return;
    
    setIsAnswerLocked(true);
    setSelectedAnswer(selectedIndex);
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.answers[selectedIndex].correct === 1;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerLocked(false);
      setShowAnswer(false);
    } else {
      endQuiz();
    }
  };

  const endQuiz = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setQuizState(QuizState.RESULT);
  };

  const resetQuiz = () => {
    setQuizState(QuizState.WELCOME);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSaskatchewanSpelling('');
    setSelectedAnswer(null);
    setIsAnswerLocked(false);
    setShowAnswer(false);
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const getResultMessage = (): string => {
    const percentage = score / questions.length;
    if (percentage >= 0.9) return "🍁 True North Strong and Free! You're a Canadian expert!";
    if (percentage >= 0.7) return "Pretty good there, eh? Almost as Canadian as maple syrup!";
    if (percentage >= 0.5) return "Not too shabby! Maybe time for a Tim's run?";
    return "Beauty effort! Time to brush up on your Canadiana!";
  };

  const WelcomeView = () => (
    <div className="max-w-2xl mx-auto text-center space-y-8 p-6">
      <img src="/canada-flag.png" alt="Canadian Flag" className="h-24 mx-auto" />
      <h1 className="text-3xl font-bold">Welcome to the Greatest Canadian Quiz, Eh!</h1>
      <p className="text-xl">
        Do you have maple syrup flowing through your veins?<br />
        Do you have what it takes to prove your Canadian knowledge?
      </p>
      <div className="space-y-4">
        <button
          onClick={() => {
            setQuizMode(QuizMode.FULL);
            setQuizState(QuizState.SASKATCHEWAN_CHALLENGE);
          }}
          className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
        >
          Start Full Quiz (100 Questions)
        </button>
        <button
          onClick={() => {
            setQuizMode(QuizMode.PRACTICE);
            setQuizState(QuizState.SASKATCHEWAN_CHALLENGE);
          }}
          className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
        >
          Practice Mode (10 Questions)
        </button>
      </div>
    </div>
  );

  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  useEffect(() => {
    // Initialize scrambled letters
    const word = "SASKATCHEWAN";
    const letters = word.split('');
    setScrambledLetters(letters.sort(() => Math.random() - 0.5));
  }, []);

  const selectLetter = (letter: string, index: number) => {
    setSelectedLetters([...selectedLetters, letter]);
    setScrambledLetters(scrambledLetters.filter((_, i) => i !== index));
    
    // Check if word is complete
    const newWord = [...selectedLetters, letter].join('');
    if (newWord.toLowerCase() === 'saskatchewan') {
      startQuiz(quizMode);
    }
  };

  const resetLetters = () => {
    const word = "SASKATCHEWAN";
    const letters = word.split('');
    setScrambledLetters(letters.sort(() => Math.random() - 0.5));
    setSelectedLetters([]);
  };

  const SaskatchewanChallengeView = () => (
    <div className="max-w-2xl mx-auto text-center space-y-8 p-6">
      <img src="/saskatchewan.png" alt="Saskatchewan" className="h-48 mx-auto" />
      <h2 className="text-2xl font-bold">Before we begin, prove you&apos;re Canadian!</h2>
      <p className="text-xl mb-8">Arrange the letters to spell this province&apos;s name:</p>
      
      {/* Selected letters display */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {selectedLetters.map((letter, index) => (
          <div
            key={`selected-${index}`}
            className="w-10 h-10 flex items-center justify-center bg-red-600 text-white font-bold rounded"
          >
            {letter}
          </div>
        ))}
        {Array(11 - selectedLetters.length).fill('').map((_, index) => (
          <div
            key={`empty-${index}`}
            className="w-10 h-10 flex items-center justify-center border-2 border-dashed border-gray-300 rounded"
          />
        ))}
      </div>

      {/* Available letters */}
      <div className="flex flex-wrap justify-center gap-2">
        {scrambledLetters.map((letter, index) => (
          <button
            key={`scrambled-${index}`}
            onClick={() => selectLetter(letter, index)}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 font-bold rounded transition-colors"
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Reset button */}
      {scrambledLetters.length < 11 && (
        <button
          onClick={resetLetters}
          className="mt-8 px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
        >
          Reset Letters
        </button>
      )}

      {/* Alternative text input */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-gray-600 mb-4">Or type it directly:</p>
        <input
          type="text"
          value={saskatchewanSpelling}
          onChange={(e) => {
            setSaskatchewanSpelling(e.target.value);
            if (e.target.value.toLowerCase() === 'saskatchewan') {
              startQuiz(quizMode);
            }
          }}
          className="w-full max-w-md mx-auto px-4 py-2 border rounded-lg"
          placeholder="Type here..."
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </div>
  );

  const QuizView = () => {
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
              }}
            />
          </div>
          <div className="ml-4 flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>{formatTime(elapsedTime)}</span>
          </div>
        </div>

        <p className="text-center text-gray-600">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-center">{currentQuestion.question}</h2>
          <p className="text-center text-gray-600">Difficulty: {currentQuestion.difficulty}</p>

          <div className="space-y-4">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(index)}
                disabled={isAnswerLocked}
                className={`w-full p-4 rounded-lg text-left transition-colors ${
                  !showAnswer
                    ? selectedAnswer === index
                      ? 'bg-red-100'
                      : 'bg-gray-50 hover:bg-gray-100'
                    : answer.correct === 1
                    ? 'bg-green-100'
                    : selectedAnswer === index
                    ? 'bg-red-100'
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{answer.answer}</span>
                  {showAnswer && (
                    <span className={answer.correct === 1 ? 'text-green-600' : 'text-red-600'}>
                      {answer.correct === 1 ? '✓' : '✗'}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {showAnswer && (
            <>
              {currentQuestion.details && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>{currentQuestion.details}</p>
                </div>
              )}
              <button
                onClick={nextQuestion}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  const ResultView = () => (
    <div className="max-w-2xl mx-auto text-center space-y-8 p-6">
      <Trophy className="w-16 h-16 text-red-600 mx-auto" />
      <h2 className="text-3xl font-bold">Quiz Complete!</h2>
      <div className="space-y-4">
        <p className="text-xl">Time: {formatTime(elapsedTime)}</p>
        <p className="text-2xl font-bold">
          Score: {score}/{questions.length}
        </p>
        <p className="text-xl">{getResultMessage()}</p>
      </div>
      <div className="space-y-4">
        <button
          onClick={resetQuiz}
          className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
        >
          Take Another Quiz
        </button>
        <button
          onClick={() => {
            const text = `I scored ${score}/${questions.length} on The Greatest Canadian Quiz! Try it yourself at bytesavy.com/canmade`;
            if (navigator.share) {
              navigator.share({ text });
            } else {
              navigator.clipboard.writeText(text);
            }
          }}
          className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center justify-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Share Result</span>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {quizState === QuizState.WELCOME && <WelcomeView />}
        {quizState === QuizState.SASKATCHEWAN_CHALLENGE && <SaskatchewanChallengeView />}
        {quizState === QuizState.QUIZ && <QuizView />}
        {quizState === QuizState.RESULT && <ResultView />}
      </div>
    </div>
  );
}