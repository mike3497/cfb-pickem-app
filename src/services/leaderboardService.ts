import { AxiosHelper } from '@/helpers/axiosHelper';

export class LeaderboardService {
  static async fetch() {
    const response = await AxiosHelper.authorized().get(`/leaderboard`);

    return response.data;
  }
}
