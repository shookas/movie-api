export interface IUserData {
  userId: number;
  name: string;
  role: 'basic' | 'premium';
  iat: string;
  exp: string;
  iss: string;
  sub: string;
}
