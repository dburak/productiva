export interface LoggedUser {
  id: string;
  name: string;
  email: string;
  token: string;
}

export type User = Omit<LoggedUser, 'token'>;

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export type LoginCredentials = Omit<SignupCredentials, 'name'>;

export interface AuthFormValues {
  email: string;
  password: string;
  name: string;
}
