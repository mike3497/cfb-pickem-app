import type { SignInDto } from '@/models/auth/signInDto';
import type { SignUpDto } from '@/models/auth/signUpDto';
import axios from 'axios';

export class AuthService {
  static async signIn(signInDto: SignInDto) {
    return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/sign-in`, signInDto);
  }

  static async signUp(signUpDto: SignUpDto) {
    return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/sign-up`, signUpDto);
  }
}
