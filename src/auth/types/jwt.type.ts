export interface IJWT {
  sub: number; // id
  email: string;
  iat: number;
  exp: number;
  iss: string;
  refresh_token?: string;
}
