
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super-admin';
  lastLogin?: string;
  permissions?: string[];
  phone?: string;
  jobTitle?: string;
  department?: string;
  avatar?: string;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile?: (updates: Partial<AdminUser>) => Promise<void>;
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
    // When connecting to Supabase or another backend, this would be updated to:
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });
    
    if (email === 'admin@example.com' && password === 'admin123') {
      const mockAdmin: AdminUser = {
        id: '1',
        email,
        name: 'Admin User',
        role: 'admin',
        lastLogin: new Date().toISOString(),
        permissions: ['read:all', 'write:all', 'delete:all'],
        phone: '+1 (555) 123-4567',
        jobTitle: 'Store Manager',
        department: 'Operations',
      };
      
      setAdmin(mockAdmin);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const updateProfile = async (updates: Partial<AdminUser>) => {
    // This is a placeholder for future integration with a backend
    if (!admin) return;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // When connected to Supabase, this would be:
    // const { data, error } = await supabase
    //   .from('admins')
    //   .update(updates)
    //   .eq('id', admin.id)
    //   .single();
    
    // For now, just update the local state
    setAdmin({
      ...admin,
      ...updates,
    });
  };

  const logout = () => {
    // When connecting to Supabase or another backend, this would be updated to:
    // await supabase.auth.signOut();
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        login,
        logout,
        updateProfile,
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
