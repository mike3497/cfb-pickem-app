export interface AuthResponseDto {
  accessToken: string;
  user: {
    firstName: string;
    id: string;
    lastName: string;
    username: string;
  };
}
