import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../application/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token) {
      setUser({ token, dataUser: JSON.parse(userData) });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { token, user } = await loginUser(email, password);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser({token, dataUser: user});
      return user.rol
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const register = async (name, email, password) => {
    try {
      await registerUser(name, email, password);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
