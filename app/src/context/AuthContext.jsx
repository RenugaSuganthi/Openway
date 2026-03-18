import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('openway-auth-user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const userWithDefaults = {
      ...userData,
      profileImage: userData.profileImage || null,
      age: userData.age || '',
      dob: userData.dob || '',
      phone: userData.phone || '',
      address: userData.address || '',
      createdAt: userData.createdAt || new Date().toISOString(),
    };
    setUser(userWithDefaults);
    setIsAuthenticated(true);
    localStorage.setItem('openway-auth-user', JSON.stringify(userWithDefaults));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('openway-auth-user');
    // Don't navigate - just clear auth state
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('openway-auth-user', JSON.stringify(updatedUser));
    
    // In production, send to Spring Boot backend
    // await fetch('/api/user/profile', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedUser)
    // });
  };

  const updateProfileImage = (imageData) => {
    updateProfile({ profileImage: imageData });
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateProfile,
    updateProfileImage,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
