import type { AuthResponseDto } from '@/models/auth/authResponseDto';
import type { SignInDto } from '@/models/auth/signInDto';
import type { SignUpDto } from '@/models/auth/signUpDto';
import axios from 'axios';

export class AuthService {
  static async signIn(signInDto: SignInDto): Promise<AuthResponseDto> {
    const response = await axios.post<AuthResponseDto>(
      `${import.meta.env.VITE_API_BASE_URL}/auth/sign-in`,
      signInDto
    );

    return response.data;
  }

  static async signUp(signUpDto: SignUpDto): Promise<AuthResponseDto> {
    const response = await axios.post<AuthResponseDto>(
      `${import.meta.env.VITE_API_BASE_URL}/auth/sign-up`,
      signUpDto
    );

    return response.data;
  }
}
