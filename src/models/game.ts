export interface Game {
  awayTeam: string;
  awayTeamId: number;
  awayTeamScore?: number | null;
  date: Date;
  homeTeam: string;
  homeTeamId: number;
  homeTeamScore?: number | null;
  id: number;
  season: number;
  week: number;
  winningTeam?: string | null;
  winningTeamId?: number | null;
}
