
import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  mobile?: string;
  addresses: Address[];
}

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    // For the demo, we'll simulate a successful login with a mock user
    const mockUser: User = {
      id: '1',
      email,
      name: 'John Doe',
      mobile: '',
      addresses: [],
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
  };

  const register = async (email: string, password: string, name: string) => {
    // In a real app, this would make an API call
    // For the demo, we'll simulate a successful registration
    const mockUser: User = {
      id: '1',
      email,
      name,
      mobile: '',
      addresses: [],
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (!user) return;
    
    const newAddress: Address = {
      ...address,
      id: Math.random().toString(36).substring(2, 11),
    };
    
    // If this is the first address or marked as default, make it default
    if (user.addresses.length === 0 || newAddress.isDefault) {
      // Mark all other addresses as non-default
      user.addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }
    
    const updatedUser = {
      ...user,
      addresses: [...user.addresses, newAddress],
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      ...updates,
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        addAddress,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
