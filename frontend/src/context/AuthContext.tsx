import React, { createContext, useContext, useState } from 'react';
import { User, AuthState } from '../types/auth';
import { authService } from '../services/api';
import toast from 'react-hot-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: string) => Promise<void>;
  logout: () => void;
  updateUserData: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return {
      user: user ? JSON.parse(user) : null,
      isAuthenticated: !!token,
      isLoading: false,
    };
  });

  const updateUserData = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthState(prev => ({
      ...prev,
      user: userData
    }));
  };

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const { user, token } = await authService.login(email, password);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      toast.success('Login successful!');
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      toast.error('Login failed. Please check your credentials.');
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string, role: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const { user, token } = await authService.register(email, password, name, role);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      toast.success('Registration successful!');
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      toast.error('Registration failed. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};