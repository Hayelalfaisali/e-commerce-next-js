'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, getUserById } from '@/data';
import { users } from '@/data';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedUserId = localStorage.getItem('userId');
          if (storedUserId) {
            const foundUser = getUserById(storedUserId);
            if (foundUser) {
              setUser(foundUser);
            } else {
              localStorage.removeItem('userId');
            }
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Add a small delay to ensure the component is mounted
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Find user by email in the users data
      const foundUser = (users.users as User[]).find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser) {
        setIsLoading(false);
        return { success: false, message: 'User not found. Please check your email address.' };
      }

      if (!foundUser.isActive) {
        setIsLoading(false);
        return { success: false, message: 'Your account has been deactivated. Please contact support.' };
      }

      // For demo purposes, we'll use a simple password check
      // In a real app, you'd verify against a hashed password
      const validPasswords: { [key: string]: string } = {
        'john.doe@example.com': 'password123',
        'jane.smith@example.com': 'password123',
        'admin@shophub.com': 'admin123',
        'mike.johnson@example.com': 'password123'
      };

      const expectedPassword = validPasswords[foundUser.email];
      if (!expectedPassword || password !== expectedPassword) {
        setIsLoading(false);
        return { success: false, message: 'Invalid password. Please try again.' };
      }

      // Update last login (in a real app, this would be done on the server)
      foundUser.lastLogin = new Date().toISOString();
      
      // Set user and store in localStorage
      setUser(foundUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('userId', foundUser.id);
      }
      
      setIsLoading(false);
      return { success: true, message: 'Login successful!' };
      
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: 'An error occurred during login. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userId');
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Demo credentials for easy testing
export const DEMO_CREDENTIALS = {
  customer: {
    email: 'john.doe@example.com',
    password: 'password123'
  },
  admin: {
    email: 'admin@shophub.com',
    password: 'admin123'
  }
};
