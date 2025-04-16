import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { iplQuizQuestions, initialLeaderboard, LeaderboardEntry } from '../data/quizQuestions';
import { getLocalLeaderboard, saveLocalLeaderboard } from '../utils/quizUtils';

// Define the state type
interface QuizState {
  currentScreen: 'welcome' | 'quiz' | 'result' | 'leaderboard';
  questions: typeof iplQuizQuestions;
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  score: number;
  playerName: string;
  timeRemaining: number;
  totalTimeSpent: number;
  isAnswerSubmitted: boolean;
  leaderboard: LeaderboardEntry[];
}

// Define the action types
type QuizAction =
  | { type: 'SET_SCREEN'; payload: QuizState['currentScreen'] }
  | { type: 'NEXT_QUESTION' }
  | { type: 'SELECT_ANSWER'; payload: number }
  | { type: 'SUBMIT_ANSWER' }
  | { type: 'UPDATE_TIME'; payload: number }
  | { type: 'SET_PLAYER_NAME'; payload: string }
  | { type: 'UPDATE_SCORE'; payload: number }
  | { type: 'RESET_QUIZ' }
  | { type: 'UPDATE_LEADERBOARD'; payload: LeaderboardEntry };

// Initial state
const initialState: QuizState = {
  currentScreen: 'welcome',
  questions: iplQuizQuestions,
  currentQuestionIndex: 0,
  selectedAnswer: null,
  score: 0,
  playerName: '',
  timeRemaining: iplQuizQuestions[0]?.timeLimit || 15,
  totalTimeSpent: 0,
  isAnswerSubmitted: false,
  leaderboard: initialLeaderboard,
};

// Create the context
const QuizContext = createContext<{
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Reducer function
const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, currentScreen: action.payload };
    
    case 'NEXT_QUESTION':
      // If we've reached the end of questions, go to result screen
      if (state.currentQuestionIndex === state.questions.length - 1) {
        return {
          ...state,
          currentScreen: 'result',
          selectedAnswer: null,
          isAnswerSubmitted: false,
        };
      }
      
      // Otherwise, go to next question
      const nextIndex = state.currentQuestionIndex + 1;
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        isAnswerSubmitted: false,
        timeRemaining: state.questions[nextIndex].timeLimit,
      };
    
    case 'SELECT_ANSWER':
      return {
        ...state,
        selectedAnswer: action.payload,
      };
    
    case 'SUBMIT_ANSWER':
      return {
        ...state,
        isAnswerSubmitted: true,
      };
    
    case 'UPDATE_TIME':
      const newTimeRemaining = state.timeRemaining - action.payload;
      
      // If time is up and answer not submitted, auto-submit
      if (newTimeRemaining <= 0 && !state.isAnswerSubmitted) {
        return {
          ...state,
          timeRemaining: 0,
          totalTimeSpent: state.totalTimeSpent + state.timeRemaining,
          isAnswerSubmitted: true,
        };
      }
      
      return {
        ...state,
        timeRemaining: Math.max(0, newTimeRemaining),
        totalTimeSpent: state.isAnswerSubmitted 
          ? state.totalTimeSpent 
          : state.totalTimeSpent + action.payload,
      };
    
    case 'SET_PLAYER_NAME':
      return {
        ...state,
        playerName: action.payload,
      };
    
    case 'UPDATE_SCORE':
      return {
        ...state,
        score: state.score + action.payload,
      };
    
    case 'RESET_QUIZ':
      return {
        ...initialState,
        leaderboard: state.leaderboard,
      };
      
    case 'UPDATE_LEADERBOARD':
      const updatedLeaderboard = [...state.leaderboard, action.payload]
        .sort((a, b) => b.score - a.score || a.timeSpent - b.timeSpent)
        .slice(0, 10); // Keep only top 10
      
      // Save to localStorage
      saveLocalLeaderboard(updatedLeaderboard);
      
      return {
        ...state,
        leaderboard: updatedLeaderboard,
      };
      
    default:
      return state;
  }
};

// Provider component
export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  
  // Load leaderboard from localStorage on initial load
  useEffect(() => {
    const localLeaderboard = getLocalLeaderboard();
    if (localLeaderboard && localLeaderboard.length > 0) {
      // Initialize with a merged and sorted leaderboard
      const mergedLeaderboard = [...initialLeaderboard, ...localLeaderboard]
        .sort((a, b) => b.score - a.score || a.timeSpent - b.timeSpent)
        .slice(0, 10); // Keep only top 10
      
      saveLocalLeaderboard(mergedLeaderboard);
      dispatch({ type: 'UPDATE_LEADERBOARD', payload: {} as LeaderboardEntry });
    }
  }, []);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

// Custom hook to use the quiz context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
