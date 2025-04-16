
import React from 'react';
import { Button } from './ui/button';
import { useQuiz } from '@/context/QuizContext';
import { formatTime } from '@/utils/quizUtils';
import { ArrowLeft, Clock, Medal, Trophy, User } from 'lucide-react';

const LeaderboardScreen: React.FC = () => {
  const { state, dispatch } = useQuiz();
  const { leaderboard, playerName } = state;

  // Go back to main menu or previous screen
  const handleBack = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'welcome' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="w-full max-w-md animate-zoom-fade">
        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 border-2 border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full"
              onClick={handleBack}
            >
              <ArrowLeft size={20} />
            </Button>
            
            <h1 className="text-xl font-bold flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-ipl-yellow" />
              Leaderboard
            </h1>
            
            <div className="w-9" /> {/* Spacer for centering */}
          </div>
          
          <div className="bg-gradient-to-r from-ipl-blue/10 to-ipl-purple/10 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between text-sm text-gray-600 font-medium mb-2 px-2">
              <div className="w-8 text-center">#</div>
              <div className="flex-1">Player</div>
              <div className="w-16 text-center">Score</div>
              <div className="w-16 text-center">Time</div>
            </div>
            
            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
              {leaderboard.length > 0 ? (
                leaderboard.map((entry, index) => {
                  // Check if this entry belongs to current player
                  const isCurrentPlayer = entry.playerName === playerName;
                  
                  return (
                    <div 
                      key={index}
                      className={`flex items-center p-2 rounded-xl ${
                        isCurrentPlayer 
                          ? 'bg-primary/15 border border-primary/30' 
                          : index % 2 === 0 
                            ? 'bg-gray-50' 
                            : 'bg-white'
                      }`}
                    >
                      <div className="w-8 flex justify-center">
                        {index < 3 ? (
                          <Medal 
                            className={`h-5 w-5 ${
                              index === 0 ? 'text-ipl-yellow fill-ipl-yellow' : 
                              index === 1 ? 'text-gray-400 fill-gray-400' : 
                              'text-ipl-orange fill-ipl-orange/80'
                            }`} 
                          />
                        ) : (
                          <span className="text-gray-500">{index + 1}</span>
                        )}
                      </div>
                      
                      <div className="flex-1 flex items-center">
                        <User className="h-4 w-4 mr-1.5 text-gray-500" />
                        <span className={`truncate ${isCurrentPlayer ? 'font-medium' : ''}`}>
                          {entry.playerName}
                        </span>
                      </div>
                      
                      <div className="w-16 text-center font-semibold">
                        {entry.score}
                      </div>
                      
                      <div className="w-16 flex items-center justify-center text-gray-600 text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(Math.round(entry.timeSpent))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No scores yet. Be the first to play!
                </div>
              )}
            </div>
          </div>
          
          <Button 
            onClick={handleBack}
            className="gradient-btn w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </div>
      </div>
      
      <div className="text-center mt-6 text-sm text-gray-500 animate-slide-up">
        <p>Created by Suyash Chandrakar</p>
        <p>Developed by 2706 Labs</p>
      </div>
    </div>
  );
}

export default LeaderboardScreen;
