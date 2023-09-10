import type { AdminResponseDto } from '@/models/admin/adminResponseDto';
import axios from 'axios';

export class AdminService {
  static async fetchGames(year: number, week: number): Promise<AdminResponseDto> {
    const response = await axios.post<AdminResponseDto>(
      `${import.meta.env.VITE_API_BASE_URL}/admin/games`,
      {
        year,
        week
      }
    );

    return response.data;
  }

  static async updateGames(year: number, week: number): Promise<AdminResponseDto> {
    const response = await axios.put<AdminResponseDto>(
      `${import.meta.env.VITE_API_BASE_URL}/admin/games`,
      {
        year,
        week
      }
    );

    return response.data;
  }

  static async fetchRankings(year: number, week: number): Promise<AdminResponseDto> {
    const response = await axios.post<AdminResponseDto>(
      `${import.meta.env.VITE_API_BASE_URL}/admin/rankings`,
      {
        year,
        week
      }
    );

    return response.data;
  }
}
