
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  points: number;
  timeLimit: number; // in seconds
}

// Mock IPL quiz questions data
export const iplQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which team won the first ever IPL tournament in 2008?",
    options: [
      "Chennai Super Kings",
      "Mumbai Indians", 
      "Rajasthan Royals", 
      "Kolkata Knight Riders"
    ],
    correctAnswer: 2,
    points: 10,
    timeLimit: 15
  },
  {
    id: 2,
    question: "Who holds the record for the most runs in IPL history?",
    options: [
      "Virat Kohli", 
      "Rohit Sharma", 
      "Suresh Raina", 
      "MS Dhoni"
    ],
    correctAnswer: 0,
    points: 10,
    timeLimit: 15
  },
  {
    id: 3,
    question: "Which bowler has taken the most wickets in IPL history?",
    options: [
      "Lasith Malinga", 
      "Yuzvendra Chahal", 
      "Dwayne Bravo", 
      "Jasprit Bumrah"
    ],
    correctAnswer: 1,
    points: 15,
    timeLimit: 15
  },
  {
    id: 4,
    question: "Which player scored the fastest century in IPL history?",
    options: [
      "Chris Gayle", 
      "AB de Villiers", 
      "David Warner", 
      "Yusuf Pathan"
    ],
    correctAnswer: 0,
    points: 20,
    timeLimit: 20
  },
  {
    id: 5,
    question: "Which IPL team has won the most titles?",
    options: [
      "Chennai Super Kings", 
      "Mumbai Indians", 
      "Kolkata Knight Riders", 
      "Royal Challengers Bangalore"
    ],
    correctAnswer: 1,
    points: 10,
    timeLimit: 15
  },
  {
    id: 6,
    question: "Who hit the longest six in IPL history?",
    options: [
      "MS Dhoni", 
      "Chris Gayle", 
      "Albie Morkel", 
      "Praveen Kumar"
    ],
    correctAnswer: 0,
    points: 15,
    timeLimit: 20
  },
  {
    id: 7,
    question: "Which player has captained the most matches in IPL history?",
    options: [
      "Rohit Sharma", 
      "MS Dhoni", 
      "Gautam Gambhir", 
      "Virat Kohli"
    ],
    correctAnswer: 1,
    points: 15,
    timeLimit: 15
  },
  {
    id: 8,
    question: "Which team holds the record for the highest team total in IPL history?",
    options: [
      "Royal Challengers Bangalore", 
      "Rajasthan Royals", 
      "Kolkata Knight Riders", 
      "Chennai Super Kings"
    ],
    correctAnswer: 0,
    points: 20,
    timeLimit: 20
  },
  {
    id: 9,
    question: "Which player has won the most 'Player of the Match' awards in IPL history?",
    options: [
      "Rohit Sharma", 
      "AB de Villiers", 
      "Chris Gayle", 
      "MS Dhoni"
    ],
    correctAnswer: 2,
    points: 15,
    timeLimit: 15
  },
  {
    id: 10,
    question: "Which team won the IPL in 2023?",
    options: [
      "Mumbai Indians", 
      "Chennai Super Kings", 
      "Gujarat Titans", 
      "Rajasthan Royals"
    ],
    correctAnswer: 1,
    points: 10,
    timeLimit: 15
  }
];

export interface LeaderboardEntry {
  playerName: string;
  score: number;
  timeSpent: number; // in seconds
  date: string;
}

// Mock leaderboard data
export const initialLeaderboard: LeaderboardEntry[] = [
  { playerName: "Dhoni Fan", score: 95, timeSpent: 128, date: "2023-06-12" },
  { playerName: "CricketMaster", score: 90, timeSpent: 145, date: "2023-06-15" },
  { playerName: "IPLKing", score: 85, timeSpent: 150, date: "2023-06-10" },
  { playerName: "SixerHitter", score: 75, timeSpent: 132, date: "2023-06-17" },
  { playerName: "BoomBoom", score: 70, timeSpent: 160, date: "2023-06-14" }
];
