
import React from 'react';
import { QuizProvider } from '@/context/QuizContext';
import { useQuiz } from '@/context/QuizContext';
import WelcomeScreen from '@/components/WelcomeScreen';
import QuizScreen from '@/components/QuizScreen';
import ResultScreen from '@/components/ResultScreen';
import LeaderboardScreen from '@/components/LeaderboardScreen';

// Quiz App wrapper component
const QuizApp: React.FC = () => {
  const { state } = useQuiz();
  
  // Render the current screen based on state
  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'quiz':
        return <QuizScreen />;
      case 'result':
        return <ResultScreen />;
      case 'leaderboard':
        return <LeaderboardScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderScreen()}
    </div>
  );
};

// Main component with provider
const Index: React.FC = () => {
  return (
    <QuizProvider>
      <QuizApp />
    </QuizProvider>
  );
};

export default Index;
