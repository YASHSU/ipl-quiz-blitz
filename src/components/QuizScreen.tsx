
import React, { useEffect, useState } from 'react';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { useQuiz } from '@/context/QuizContext';
import { calculateTimeBasedScore } from '@/utils/quizUtils';
import { ArrowRight, Clock, AlertCircle } from 'lucide-react';

const QuizScreen: React.FC = () => {
  const { state, dispatch } = useQuiz();
  const { 
    questions, 
    currentQuestionIndex, 
    selectedAnswer, 
    timeRemaining, 
    isAnswerSubmitted 
  } = state;
  
  const currentQuestion = questions[currentQuestionIndex];
  const [progressValue, setProgressValue] = useState(100);
  
  // Timer effect
  useEffect(() => {
    if (!isAnswerSubmitted && timeRemaining > 0) {
      const timer = setInterval(() => {
        dispatch({ type: 'UPDATE_TIME', payload: 0.1 });
      }, 100);
      
      return () => clearInterval(timer);
    }
  }, [timeRemaining, isAnswerSubmitted, dispatch]);
  
  // Update progress bar
  useEffect(() => {
    const percentage = (timeRemaining / currentQuestion.timeLimit) * 100;
    setProgressValue(percentage);
  }, [timeRemaining, currentQuestion.timeLimit]);
  
  // Handle option selection
  const handleOptionSelect = (optionIndex: number) => {
    if (!isAnswerSubmitted) {
      dispatch({ type: 'SELECT_ANSWER', payload: optionIndex });
    }
  };
  
  // Submit answer
  const handleSubmitAnswer = () => {
    dispatch({ type: 'SUBMIT_ANSWER' });
    
    // Calculate score if answer is correct
    if (selectedAnswer === currentQuestion.correctAnswer) {
      const timeSpent = currentQuestion.timeLimit - timeRemaining;
      const pointsEarned = calculateTimeBasedScore(
        currentQuestion.points,
        currentQuestion.timeLimit,
        timeSpent
      );
      
      dispatch({ type: 'UPDATE_SCORE', payload: pointsEarned });
    }
  };
  
  // Move to next question
  const handleNextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };
  
  // Get option class based on state
  const getOptionClass = (index: number) => {
    let className = "option-btn ";
    
    if (isAnswerSubmitted) {
      if (index === currentQuestion.correctAnswer) {
        className += "correct ";
      } else if (index === selectedAnswer) {
        className += "incorrect ";
      }
    } else if (index === selectedAnswer) {
      className += "selected ";
    }
    
    return className;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="w-full max-w-3xl animate-zoom-fade">
        <div className="quiz-container bg-white/90 backdrop-blur-sm">
          {/* Quiz header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-700">
                Question {currentQuestionIndex + 1}/{questions.length}
              </h2>
              <p className="text-sm text-gray-500">
                Points: {currentQuestion.points} 
                {isAnswerSubmitted && selectedAnswer === currentQuestion.correctAnswer && (
                  <span className="text-green-600">
                    + {calculateTimeBasedScore(
                        currentQuestion.points,
                        currentQuestion.timeLimit,
                        currentQuestion.timeLimit - timeRemaining
                      ) - currentQuestion.points} bonus
                  </span>
                )}
              </p>
            </div>
            
            <div className="timer-ring">
              <div className="h-14 w-14 rounded-full border-4 border-primary flex items-center justify-center">
                <Clock className={`h-6 w-6 ${timeRemaining < 5 ? 'text-red-500 animate-pulse' : 'text-primary'}`} />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold">
                {Math.ceil(timeRemaining)}
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <Progress 
            value={progressValue} 
            className="h-2 mb-6"
            color={progressValue < 30 ? "bg-red-500" : progressValue < 70 ? "bg-yellow-500" : "bg-green-500"}
          />
          
          {/* Question */}
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">
              {currentQuestion.question}
            </h3>
          </div>
          
          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={getOptionClass(index)}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswerSubmitted}
              >
                <div className="flex items-center">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                </div>
                
                {isAnswerSubmitted && index === currentQuestion.correctAnswer && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-end">
            {!isAnswerSubmitted ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="gradient-btn"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="gradient-btn"
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* Time up warning */}
          {timeRemaining === 0 && !isAnswerSubmitted && (
            <div className="mt-4 p-3 bg-red-50 rounded-xl flex items-center text-red-700">
              <AlertCircle className="h-5 w-5 mr-2" />
              Time's up! Please submit your answer.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizScreen;
