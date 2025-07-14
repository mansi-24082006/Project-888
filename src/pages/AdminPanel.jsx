import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  Calendar,
  TrendingUp,
  Eye,
  Settings,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEvents } from '@/contexts/EventContext';
import { useToast } from '@/components/ui/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminPanel = () => {
  const { events, updateEvent } = useEvents();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('overview');

  const pendingEvents = events.filter(event => event.status === 'pending');
  const approvedEvents = events.filter(event => event.status === 'approved');
  const rejectedEvents = events.filter(event => event.status === 'rejected');
  const totalUsers = 2500; // Mock data
  const totalAttendees = events.reduce((sum, event) => sum + event.currentAttendees, 0);

  const handleApproveEvent = (eventId) => {
    updateEvent(eventId, { status: 'approved' });
    toast({
      title: "Event Approved",
      description: "The event has been approved and is now live.",
    });
  };

  const handleRejectEvent = (eventId) => {
    updateEvent(eventId, { status: 'rejected' });
    toast({
      title: "Event Rejected",
      description: "The event has been rejected.",
      variant: "destructive",
    });
  };

  const handleManageUsers = () => {
    toast({
      title: "🚧 User Management",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleSystemSettings = () => {
    toast({
      title: "🚧 System Settings",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const stats = [
    {
      title: 'Total Events',
      value: events.length,
      icon: Calendar,
      color: 'from-purple-500 to-blue-500'
    },
    {
      title: 'Pending Approval',
      value: pendingEvents.length,
      icon: Clock,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Total Attendees',
      value: totalAttendees,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const categoryData = events.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([category, count]) => ({
    name: category,
    value: count
  }));

  const COLORS = ['#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  const monthlyData = [
    { month: 'Jan', events: 12, attendees: 450 },
    { month: 'Feb', events: 15, attendees: 620 },
    { month: 'Mar', events: 18, attendees: 780 },
    { month: 'Apr', events: 22, attendees: 920 },
    { month: 'May', events: 25, attendees: 1100 },
    { month: 'Jun', events: 20, attendees: 850 }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <Helmet>
        <title>Admin Panel - CampusBuzz</title>
        <meta name="description" content="Manage events, users, and system settings with CampusBuzz admin panel." />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center">
              <Shield className="w-8 h-8 mr-3 text-purple-400" />
              Admin Panel
            </h1>
            <p className="text-foreground/70">Manage the CampusBuzz platform and community</p>
          </div>
          <Button 
            onClick={handleSystemSettings}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex space-x-1 mb-8 bg-secondary rounded-lg p-1"
        >
          {['overview', 'events', 'users', 'analytics'].map((tab) => (
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

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="glass-effect border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Monthly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            color: 'hsl(var(--foreground))'
                          }}
                        />
                        <Bar dataKey="events" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Event Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          labelStyle={{ fill: 'hsl(var(--foreground))' }}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                           contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            color: 'hsl(var(--foreground))'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.slice(0, 5).map((event) => (
                    <div key={event.id} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <img  
                          className="w-10 h-10 rounded-lg object-cover"
                          alt={`${event.title} thumbnail`}
                         src="https://images.unsplash.com/photo-1632158707180-d2873939cd20" />
                        <div>
                          <h4 className="text-foreground font-medium">{event.title}</h4>
                          <p className="text-foreground/60 text-sm">by {event.organizer}</p>
                        </div>
                      </div>
                      <Badge className={
                        event.status === 'approved' ? 'bg-green-600 text-white' :
                        event.status === 'pending' ? 'bg-orange-600 text-white' : 'bg-red-600 text-white'
                      }>
                        {event.status}
                      </Badge>
                    </div>
                  ))}
                </div>
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
            {/* Pending Events */}
            {pendingEvents.length > 0 && (
              <Card className="glass-effect border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-orange-400" />
                    Pending Approval ({pendingEvents.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingEvents.map((event) => (
                      <div key={event.id} className="flex flex-col md:flex-row gap-4 p-4 bg-secondary rounded-lg">
                        <div className="md:w-32 flex-shrink-0">
                          <img  
                            className="w-full h-20 object-cover rounded-lg"
                            alt={`${event.title} thumbnail`}
                           src="https://images.unsplash.com/photo-1632158707180-d2873939cd20" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground">
                              {event.category}
                            </Badge>
                            <Badge className="bg-orange-600 text-white">Pending</Badge>
                          </div>
                          
                          <h3 className="text-lg font-bold text-foreground mb-1">{event.title}</h3>
                          <p className="text-foreground/60 text-sm mb-2">by {event.organizer}</p>
                          <p className="text-foreground/70 text-sm line-clamp-2">{event.description}</p>
                          
                          <div className="flex flex-wrap gap-4 text-xs text-foreground/60 mt-2">
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                            <span>{event.location}</span>
                            <span>Max: {event.maxAttendees} attendees</span>
                            <span>{event.price === 0 ? 'Free' : `$${event.price}`}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 md:w-32">
                          <Button
                            size="sm"
                            onClick={() => handleApproveEvent(event.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectEvent(event.id)}
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-400"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Events */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-foreground">All Events ({events.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <img  
                          className="w-12 h-12 rounded-lg object-cover"
                          alt={`${event.title} thumbnail`}
                         src="https://images.unsplash.com/photo-1632158707180-d2873939cd20" />
                        <div>
                          <h4 className="text-foreground font-medium">{event.title}</h4>
                          <p className="text-foreground/60 text-sm">by {event.organizer} • {new Date(event.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-foreground/70 text-sm">{event.currentAttendees} attendees</span>
                        <Badge className={
                          event.status === 'approved' ? 'bg-green-600 text-white' :
                          event.status === 'pending' ? 'bg-orange-600 text-white' : 'bg-red-600 text-white'
                        }>
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Users Tab */}
        {selectedTab === 'users' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="glass-effect border-border">
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-foreground/50" />
                <h3 className="text-2xl font-bold text-foreground mb-2">User Management</h3>
                <p className="text-foreground/70 mb-6">
                  Manage user accounts, roles, and permissions across the platform.
                </p>
                <Button 
                  onClick={handleManageUsers}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
              </CardContent>
            </Card>
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
                  Get detailed insights about platform usage, user engagement, and event performance.
                </p>
                <Button 
                  onClick={() => toast({
                    title: "🚧 Advanced Analytics",
                    description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                  })}
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

export default AdminPanel;