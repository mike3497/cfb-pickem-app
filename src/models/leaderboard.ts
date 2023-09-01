import type { User } from '@/models/user';

export interface Leaderboard {
  correctPicks: number;
  correctPicksPercentage: number;
  gamesPlayed: number;
  ranking: number;
  totalPicks: number;
  user: User;
}
