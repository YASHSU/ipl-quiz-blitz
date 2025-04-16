
/**
 * Calculate the time-based score
 * @param basePoints Base points for the question
 * @param totalTime Total time allowed for the question
 * @param timeSpent Time spent answering the question
 * @returns Final score with time bonus
 */
export const calculateTimeBasedScore = (basePoints: number, totalTime: number, timeSpent: number): number => {
  // Ensure timeSpent doesn't exceed totalTime
  const validTimeSpent = Math.min(timeSpent, totalTime);

  // Calculate time bonus: faster answers give higher bonus
  const timeLeftPercentage = (totalTime - validTimeSpent) / totalTime;
  const timeBonus = Math.round(basePoints * 0.5 * timeLeftPercentage);

  return basePoints + timeBonus;
};

/**
 * Format time in seconds to MM:SS format
 * @param seconds Total seconds
 * @returns Formatted time string
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param array Array to shuffle
 * @returns Shuffled copy of the array
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get the local leaderboard from localStorage
 * @returns Array of leaderboard entries or empty array if none found
 */
export const getLocalLeaderboard = (): any[] => {
  try {
    const leaderboardString = localStorage.getItem('iplQuizLeaderboard');
    return leaderboardString ? JSON.parse(leaderboardString) : [];
  } catch (error) {
    console.error("Failed to retrieve leaderboard:", error);
    return [];
  }
};

/**
 * Save the leaderboard to localStorage
 * @param leaderboard Leaderboard entries to save
 */
export const saveLocalLeaderboard = (leaderboard: any[]): void => {
  try {
    localStorage.setItem('iplQuizLeaderboard', JSON.stringify(leaderboard));
  } catch (error) {
    console.error("Failed to save leaderboard:", error);
  }
};
