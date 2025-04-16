
import React, { useState } from 'react';
import { Trophy, Timer, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { useQuiz } from '@/context/QuizContext';

const WelcomeScreen: React.FC = () => {
  const { dispatch } = useQuiz();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);

  const handleStartQuiz = () => {
    if (!name.trim()) {
      setNameError(true);
      return;
    }
    
    dispatch({ type: 'SET_PLAYER_NAME', payload: name });
    dispatch({ type: 'SET_SCREEN', payload: 'quiz' });
  };

  const handleViewLeaderboard = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'leaderboard' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="w-full max-w-md animate-bounce-in">
        <Card className="p-6 sm:p-8 shadow-xl border-2 border-primary/20 bg-white/90 backdrop-blur-sm rounded-3xl">
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-ipl-blue to-ipl-purple flex items-center justify-center mb-4 shadow-lg">
              <Sparkles size={44} className="text-white animate-pulse" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-ipl-blue via-ipl-purple to-ipl-blue">
              IPL Quiz Blitz Mania
            </h1>
            
            <p className="text-gray-600 mt-2 text-center">
              Test your knowledge and challenge the leaderboard!
            </p>
            
            <div className="grid grid-cols-2 gap-4 w-full mt-6">
              <div className="bg-blue-50 p-3 rounded-xl flex flex-col items-center">
                <Timer className="h-6 w-6 text-ipl-blue" />
                <span className="text-sm font-medium mt-1">Timed Challenges</span>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-xl flex flex-col items-center">
                <Trophy className="h-6 w-6 text-ipl-purple" />
                <span className="text-sm font-medium mt-1">Global Leaderboard</span>
              </div>
            </div>
            
            <div className="w-full mt-6 space-y-4">
              <div>
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError(false);
                  }}
                  className={`rounded-xl py-5 ${nameError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                {nameError && (
                  <p className="text-red-500 text-xs mt-1">Please enter your name</p>
                )}
              </div>
              
              <Button 
                onClick={handleStartQuiz}
                className="gradient-btn w-full"
              >
                Start Quiz
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleViewLeaderboard}
                className="w-full rounded-xl border-2 hover:bg-secondary/10"
              >
                View Leaderboard
              </Button>
            </div>
          </div>
        </Card>
        
        <div className="text-center mt-6 text-sm text-gray-500 animate-slide-up">
          <p>Created by Suyash Chandrakar</p>
          <p>Developed by 2706 Labs</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
