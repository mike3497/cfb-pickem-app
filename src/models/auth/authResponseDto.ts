export interface AuthResponseDto {
  accessToken: string;
  user: {
    firstName: string;
    id: number;
    lastName: string;
    username: string;
  };
}
