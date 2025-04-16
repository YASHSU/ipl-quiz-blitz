
import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { useQuiz } from '@/context/QuizContext';
import { formatTime } from '@/utils/quizUtils';
import { Award, Clock, Home, List, Star, Trophy } from 'lucide-react';

const ResultScreen: React.FC = () => {
  const { state, dispatch } = useQuiz();
  const { score, playerName, totalTimeSpent, questions } = state;
  
  // Get max possible score
  const maxScore = questions.reduce((total, q) => total + q.points, 0);

  // Add to leaderboard on component mount
  useEffect(() => {
    // Add player's score to leaderboard
    dispatch({
      type: 'UPDATE_LEADERBOARD',
      payload: {
        playerName,
        score,
        timeSpent: totalTimeSpent,
        date: new Date().toISOString().split('T')[0],
      },
    });
  }, [dispatch, playerName, score, totalTimeSpent]);

  // Calculate performance metrics
  const percentageScore = Math.round((score / maxScore) * 100);
  const averageTimePerQuestion = totalTimeSpent / questions.length;
  
  // Performance rating based on score percentage
  const getRating = () => {
    if (percentageScore >= 90) return { label: "Cricket Legend", stars: 5 };
    if (percentageScore >= 70) return { label: "IPL Expert", stars: 4 };
    if (percentageScore >= 50) return { label: "Cricket Fan", stars: 3 };
    if (percentageScore >= 30) return { label: "Casual Watcher", stars: 2 };
    return { label: "Beginner", stars: 1 };
  };
  
  const rating = getRating();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="w-full max-w-md animate-bounce-in">
        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 border-2 border-primary/20">
          {/* Confetti animation effect */}
          <div className="relative flex justify-center mb-6">
            <div className="absolute -top-10 w-full">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${-Math.random() * 100}px`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    backgroundColor: ['#FFD700', '#FF6347', '#1A73E8', '#7E69AB', '#40C4FF'][
                      Math.floor(Math.random() * 5)
                    ],
                    width: `${4 + Math.random() * 6}px`,
                    height: `${10 + Math.random() * 20}px`,
                    opacity: 0,
                    animation: `confetti-fade-in 0.3s ease forwards ${Math.random() * 0.5}s, 
                              confetti-fall ${1 + Math.random() * 2}s ease-in forwards ${Math.random() * 0.5}s`
                  }}
                />
              ))}
            </div>
            
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4 shadow-lg">
              <Trophy size={44} className="text-white animate-pulse" />
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Quiz Completed!</h1>
            <p className="text-gray-600">Well done, {playerName}!</p>
          </div>
          
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-5 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{score}</div>
              <div className="text-sm text-gray-600">out of {maxScore} points</div>
            </div>
            
            <div className="flex justify-center mt-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-6 w-6 ${i < rating.stars ? 'text-ipl-yellow fill-ipl-yellow' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <div className="text-center mt-2 font-medium text-primary">
              {rating.label}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-xl flex flex-col items-center">
              <Clock className="h-6 w-6 text-ipl-blue mb-1" />
              <span className="text-xs text-gray-500">Total Time</span>
              <span className="font-medium">{formatTime(Math.round(totalTimeSpent))}</span>
            </div>
            
            <div className="bg-purple-50 p-3 rounded-xl flex flex-col items-center">
              <Award className="h-6 w-6 text-ipl-purple mb-1" />
              <span className="text-xs text-gray-500">Accuracy</span>
              <span className="font-medium">{percentageScore}%</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => dispatch({ type: 'RESET_QUIZ' })}
              className="gradient-btn w-full"
            >
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'leaderboard' })}
              className="w-full rounded-xl border-2 hover:bg-secondary/10"
            >
              <List className="mr-2 h-4 w-4" />
              View Leaderboard
            </Button>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-6 text-sm text-gray-500 animate-slide-up">
        <p>Created by Suyash Chandrakar</p>
        <p>Developed by 2706 Labs</p>
      </div>
    </div>
  );
}

export default ResultScreen;
