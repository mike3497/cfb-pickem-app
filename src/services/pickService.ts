import { AxiosHelper } from '@/helpers/axiosHelper';

export class PickService {
  static async fetch(userId: number, year: number, week: number) {
    const response = await AxiosHelper.authorized().get(
      `/picks?userId=${userId}&year=${year}&week=${week}`
    );

    return response.data;
  }

  static async create(gameId: number, teamId: number) {
    const response = await AxiosHelper.authorized().post(`/picks`, {
      gameId,
      teamId
    });

    return response.data;
  }
}
