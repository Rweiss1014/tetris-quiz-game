export interface HighScoreEntry {
  id: string;
  playerName: string;
  score: number;
  level: number;
  lines: number;
  date: string;
  timestamp: number;
}

export interface HighScoreStats {
  rank: number;
  isTop3: boolean;
  isNewRecord: boolean;
  totalPlayers: number;
}

const HIGH_SCORE_STORAGE_KEY = 'tetris_high_scores';
const MAX_HIGH_SCORES = 10;

export class HighScoreManager {
  private static instance: HighScoreManager;

  static getInstance(): HighScoreManager {
    if (!HighScoreManager.instance) {
      HighScoreManager.instance = new HighScoreManager();
    }
    return HighScoreManager.instance;
  }

  getHighScores(): HighScoreEntry[] {
    try {
      const stored = localStorage.getItem(HIGH_SCORE_STORAGE_KEY);
      if (!stored) return [];
      return this.sortScores(JSON.parse(stored)).slice(0, MAX_HIGH_SCORES);
    } catch { return []; }
  }

  private saveHighScores(scores: HighScoreEntry[]): void {
    try {
      localStorage.setItem(HIGH_SCORE_STORAGE_KEY, JSON.stringify(this.sortScores(scores).slice(0, MAX_HIGH_SCORES)));
    } catch {}
  }

  private sortScores(scores: HighScoreEntry[]): HighScoreEntry[] {
    return [...scores].sort((a, b) => b.score !== a.score ? b.score - a.score : a.timestamp - b.timestamp);
  }

  addHighScore(playerName: string, score: number, level: number, lines: number) {
    const currentScores = this.getHighScores();
    const timestamp = Date.now();
    const newEntry: HighScoreEntry = {
      id: `${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
      playerName: playerName.trim() || 'Anonymous',
      score, level, lines,
      date: new Date().toLocaleDateString(),
      timestamp
    };
    const sortedScores = this.sortScores([...currentScores, newEntry]);
    const rank = sortedScores.findIndex(e => e.id === newEntry.id) + 1;
    const finalScores = sortedScores.slice(0, MAX_HIGH_SCORES);
    this.saveHighScores(finalScores);
    return {
      entry: newEntry,
      stats: { rank, isTop3: rank <= 3, isNewRecord: rank === 1, totalPlayers: Math.max(currentScores.length + 1, rank) },
      updatedScores: finalScores
    };
  }

  isQualifyingScore(score: number): boolean {
    const scores = this.getHighScores();
    return scores.length < MAX_HIGH_SCORES || score > scores[scores.length - 1].score;
  }

  getScoreRank(score: number): number {
    const scores = this.getHighScores();
    let rank = 1;
    for (const entry of scores) {
      if (score > entry.score) break;
      rank++;
    }
    return rank;
  }

  clearHighScores(): void {
    localStorage.removeItem(HIGH_SCORE_STORAGE_KEY);
  }
}

export const formatScore = (score: number): string => score.toLocaleString();

export const formatRank = (rank: number): string => {
  const last = rank % 10;
  const lastTwo = rank % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return `${rank}th`;
  if (last === 1) return `${rank}st`;
  if (last === 2) return `${rank}nd`;
  if (last === 3) return `${rank}rd`;
  return `${rank}th`;
};
