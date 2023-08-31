import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { useAuthStore } from '../stores/authStore';

export class AxiosHelper {
  static authorized(): AxiosInstance {
    const authStore = useAuthStore();

    const axiosInstance: AxiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });

    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: any) => {
        if (error.response && error.response.status === 401) {
          authStore.signOut();
        }
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }
}
