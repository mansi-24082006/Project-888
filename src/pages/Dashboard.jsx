import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  Plus, 
  Calendar, 
  Users, 
  TrendingUp, 
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEvents } from '@/contexts/EventContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { events, deleteEvent } = useEvents();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('overview');

  const myEvents = events.filter(event => event.organizerId === user?.id);
  const pendingEvents = myEvents.filter(event => event.status === 'pending');
  const approvedEvents = myEvents.filter(event => event.status === 'approved');
  const totalAttendees = myEvents.reduce((sum, event) => sum + event.currentAttendees, 0);

  const chartData = myEvents.map(event => ({
    name: event.title.substring(0, 10) + '...',
    attendees: event.currentAttendees,
    capacity: event.maxAttendees
  }));

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventId);
    }
  };

  const handleAnalytics = () => {
    toast({
      title: "🚧 Advanced Analytics",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const stats = [
    {
      title: 'Total Events',
      value: myEvents.length,
      icon: Calendar,
      color: 'from-purple-500 to-blue-500'
    },
    {
      title: 'Total Attendees',
      value: totalAttendees,
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },{
      title: 'Pending Approval',
      value: pendingEvents.length,
      icon: Clock,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Approved Events',
      value: approvedEvents.length,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <Helmet>
        <title>Organizer Dashboard - CampusBuzz</title>
        <meta name="description" content="Manage your events, track analytics, and grow your audience with CampusBuzz organizer dashboard." />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Organizer Dashboard</h1>
            <p className="text-foreground/70">Welcome back, {user?.name}! Manage your events and track performance.</p>
          </div>
          <Link to="/create-event">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-primary-foreground mt-4 md:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </Link>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex space-x-1 mb-8 bg-secondary rounded-lg p-1"
        >
          {['overview', 'events', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === tab
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-foreground/70 text-sm">{stat.title}</p>
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Chart */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Event Attendance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--foreground))'
                        }}
                      />
                      <Bar dataKey="attendees" fill="url(#gradient)" />
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Events */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Events</CardTitle>
              </CardHeader>
              <CardContent>
                {myEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <img  
                        className="w-12 h-12 rounded-lg object-cover"
                        alt={`${event.title} thumbnail`}
                       src="https://images.unsplash.com/photo-1632158707180-d2873939cd20" />
                      <div>
                        <h4 className="text-foreground font-medium">{event.title}</h4>
                        <p className="text-foreground/60 text-sm">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={
                        event.status === 'approved' ? 'bg-green-600 text-white' :
                        event.status === 'pending' ? 'bg-orange-600 text-white' : 'bg-red-600 text-white'
                      }>
                        {event.status}
                      </Badge>
                      <span className="text-foreground/70 text-sm">{event.currentAttendees} attendees</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Events Tab */}
        {selectedTab === 'events' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {myEvents.length > 0 ? (
              <div className="grid gap-6">
                {myEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="glass-effect border-border">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-48 flex-shrink-0">
                            <img  
                              className="w-full h-32 object-cover rounded-lg"
                              alt={`${event.title} thumbnail`}
                             src="https://images.unsplash.com/photo-1632158707180-d2873939cd20" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-wrap gap-2 mb-2">
                              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground">
                                {event.category}
                              </Badge>
                              <Badge className={
                                event.status === 'approved' ? 'bg-green-600 text-white' :
                                event.status === 'pending' ? 'bg-orange-600 text-white' : 'bg-red-600 text-white'
                              }>
                                {event.status}
                              </Badge>
                            </div>
                            
                            <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                            <p className="text-foreground/70 mb-4 line-clamp-2">{event.description}</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-foreground/60 mb-4">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(event.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {event.currentAttendees}/{event.maxAttendees}
                              </div>
                              <div className="flex items-center">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                {((event.currentAttendees / event.maxAttendees) * 100).toFixed(0)}% full
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Link to={`/events/${event.id}`}>
                                <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-accent">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </Button>
                              </Link>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-border text-foreground hover:bg-accent"
                                onClick={handleAnalytics}
                              >
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Analytics
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-400"
                                onClick={() => handleDeleteEvent(event.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="glass-effect border-border">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-foreground/50" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">No Events Yet</h3>
                  <p className="text-foreground/70 mb-6">
                    Start creating amazing events for your community!
                  </p>
                  <Link to="/create-event">
                    <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Event
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}

        {/* Analytics Tab */}
        {selectedTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="glass-effect border-border">
              <CardContent className="p-12 text-center">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-foreground/50" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Advanced Analytics</h3>
                <p className="text-foreground/70 mb-6">
                  Get detailed insights about your events, audience engagement, and performance metrics.
                </p>
                <Button 
                  onClick={handleAnalytics}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;