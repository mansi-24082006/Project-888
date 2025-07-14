
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('campusbuzz_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock login - in real app, this would be an API call
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : email.includes('organizer') ? 'organizer' : 'student',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        badges: ['Early Adopter', 'Event Enthusiast'],
        interests: ['Technology', 'Music', 'Sports'],
        registeredEvents: [],
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('campusbuzz_user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: "Welcome back!",
        description: `Logged in successfully as ${mockUser.name}`,
      });
      
      return { success: true };
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Mock registration - in real app, this would be an API call
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
        badges: ['New Member'],
        interests: userData.interests || [],
        registeredEvents: [],
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('campusbuzz_user', JSON.stringify(newUser));
      setUser(newUser);
      
      toast({
        title: "Welcome to CampusBuzz!",
        description: "Your account has been created successfully.",
      });
      
      return { success: true };
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('campusbuzz_user');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('campusbuzz_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
