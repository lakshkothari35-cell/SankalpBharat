
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'superadmin' | 'admin' | 'content_manager' | 'volunteer_manager' | 'donation_manager' | 'analytics_viewer';
  name: string;
}

interface AdminAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('sankalp_admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulated authentication based on prompt credentials
    if (email === 'admin@ngoindia.org' && password === 'NGOIndia@2026') {
      const newUser: User = { id: 'admin-1', email, name: 'Admin User', role: 'admin' };
      setUser(newUser);
      localStorage.setItem('sankalp_admin_user', JSON.stringify(newUser));
      return true;
    }
    
    if (email === 'superadmin@ngoindia.org' && password === 'SuperSecure@2026') {
      const newUser: User = { id: 'super-1', email, name: 'Super Admin', role: 'superadmin' };
      setUser(newUser);
      localStorage.setItem('sankalp_admin_user', JSON.stringify(newUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sankalp_admin_user');
  };

  return (
    <AdminAuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
