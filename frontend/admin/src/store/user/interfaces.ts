export interface SignUpPayload {
  password: string;
  login: string;
  name: string;
}

export interface SignInPayload {
  password: string;
  login: string;
}

export interface UserState {
  token?: string;
  login?: string;
  isAuth: boolean;
}
