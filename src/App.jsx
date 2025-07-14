
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { EventProvider } from '@/contexts/EventContext';
import Navbar from '@/components/layout/Navbar';
import Home from '@/pages/Home';
import Events from '@/pages/Events';
import EventDetails from '@/pages/EventDetails';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';
import Dashboard from '@/pages/Dashboard';
import AdminPanel from '@/pages/AdminPanel';
import CreateEvent from '@/pages/CreateEvent';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EventProvider>
          <Router>
            <div className="min-h-screen">
              <Helmet>
                <title>CampusBuzz - College Event Aggregator</title>
                <meta name="description" content="Discover and register for college events, fests, workshops, and hackathons. Connect with your campus community through CampusBuzz." />
              </Helmet>
              
              <Navbar />
              
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                
                <Route path="/dashboard" element={
                  <ProtectedRoute requiredRole="organizer">
                    <Dashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/create-event" element={
                  <ProtectedRoute requiredRole="organizer">
                    <CreateEvent />
                  </ProtectedRoute>
                } />
                
                <Route path="/admin" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPanel />
                  </ProtectedRoute>
                } />
              </Routes>
              
              <Toaster />
            </div>
          </Router>
        </EventProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
