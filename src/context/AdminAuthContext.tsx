
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super-admin';
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const savedAdmin = localStorage.getItem('adminUser');
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  useEffect(() => {
    if (admin) {
      localStorage.setItem('adminUser', JSON.stringify(admin));
      localStorage.setItem('adminAuth', 'true');
    } else {
      localStorage.removeItem('adminUser');
      localStorage.removeItem('adminAuth');
    }
  }, [admin]);

  const login = async (email: string, password: string) => {
    // For demo purposes - in production, this would be an API call
    if (email === 'admin@example.com' && password === 'admin123') {
      const mockAdmin: AdminUser = {
        id: '1',
        email,
        name: 'Admin User',
        role: 'admin',
      };
      
      setAdmin(mockAdmin);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
