import { AxiosHelper } from '@/helpers/axiosHelper';

export class UserService {
  static async fetchById(id: number) {
    const response = await AxiosHelper.authorized().get(`/users/${id}`);

    return response.data;
  }
}
