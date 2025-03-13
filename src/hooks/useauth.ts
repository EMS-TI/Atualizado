import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, login, logout, register } from '../lib/auth';
import type { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogin = (username: string, password: string) => {
    const success = login(username, password);
    if (success) {
      setUser({ username, isLoggedIn: true });
      navigate('/deposits');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/login');
  };

  const handleRegister = (username: string, password: string) => {
    const success = register(username, password);
    if (success) {
      navigate('/login');
      return true;
    }
    return false;
  };

  return {
    user,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };
}