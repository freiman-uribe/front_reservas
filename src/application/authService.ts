import { login, register, getUsers } from '../adapters/outbound/authAPI';

export const fetchUsers = async () => {
  const response = await getUsers();
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await login(email, password);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await register(name, email, password);
  return response.data;
};
