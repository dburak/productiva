import axios from 'axios';
import {
  LoginCredentials,
  SignupCredentials,
  User,
  LoggedUser,
} from '../types';

const baseUrl = 'https://productiva-server.onrender.com/api';

const login = async (credentials: LoginCredentials) => {
  const response = await axios.post<LoggedUser>(
    `${baseUrl}/login`,
    credentials
  );
  return response.data;
};

const signup = async (credentials: SignupCredentials) => {
  const response = await axios.post<User>(`${baseUrl}/users`, credentials);
  return response.data;
};

export default { login, signup };
