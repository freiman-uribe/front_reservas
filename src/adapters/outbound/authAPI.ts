import httpClient from '../../infrastructure/http/httpClient';

export const getUsers = () => {
  return httpClient.get('/auth/users');
};

export const login = (email: string, password: string) => {
  return httpClient.post('/auth/login', { email, password });
};

export const register = (name: string, email: string, password: string) => {
  return httpClient.post('/auth/register', { nombre: name, email, password });
};