import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  isSetupRequired: boolean;
  login: (credentials: { email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  setup: (data: { name: string; email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSetupRequired, setIsSetupRequired] = useState<boolean>(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const isSetup = await authService.checkSetupStatus();
        setIsSetupRequired(!isSetup);

        if (authService.isAuthenticated()) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (err) {
        console.error('Failed to initialize auth state:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const res = await authService.login(credentials);
    if (res.success && res.user) {
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error || 'Login failed' };
  };

  const setup = async (data: { name: string; email: string; password: string }) => {
    const res = await authService.setupInitialAdmin(data);
    if (res.success && res.user) {
      setUser(res.user);
      setIsSetupRequired(false);
      return { success: true };
    }
    return { success: false, error: res.error || 'Setup failed' };
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    if (authService.isAuthenticated()) {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isSetupRequired,
        login,
        setup,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
