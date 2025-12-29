export interface LoginResponse {
  statusCode: number;
  message: string;
  data: {
    id: number;
    email: string;
    password: string;
  }[];
}