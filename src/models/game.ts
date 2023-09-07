export interface Game {
  awayTeam: string;
  awayTeamId: number;
  awayTeamRank: number | null;
  awayTeamScore: number | null;
  date: Date;
  homeTeam: string;
  homeTeamId: number;
  homeTeamRank: number | null;
  homeTeamScore: number | null;
  id: number;
  season: number;
  week: number;
  winningTeam: string | null;
  winningTeamId: number | null;
}
