import { AxiosHelper } from '@/helpers/axiosHelper';

export class GameService {
  static async fetch(year: number, week: number) {
    const response = await AxiosHelper.authorized().get(`/games?year=${year}&week=${week}`);

    return response.data;
  }
}
