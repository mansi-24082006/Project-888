import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Edit, 
  Save, 
  X,
  Trophy,
  Heart,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useEvents } from '@/contexts/EventContext';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { events } = useEvents();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    interests: user?.interests || []
  });

  const registeredEvents = events.filter(event => 
    user?.registeredEvents?.includes(event.id)
  );

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      location: user?.location || '',
      interests: user?.interests || []
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleQRCode = () => {
    toast({
      title: "🚧 QR Code",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleSettings = () => {
    toast({
      title: "🚧 Settings",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <Helmet>
        <title>Profile - CampusBuzz</title>
        <meta name="description" content="Manage your CampusBuzz profile, view registered events, and track your achievements." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-foreground/70">Manage your account and track your event journey</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="glass-effect border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-foreground">Profile Information</CardTitle>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancel} className="border-border">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" onClick={() => setIsEditing(true)} className="bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <img  
                      className="w-20 h-20 rounded-full object-cover"
                      alt="Profile avatar"
                     src="https://images.unsplash.com/photo-1652841190565-b96e0acbae17" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{user?.name}</h3>
                    <p className="text-foreground/60 capitalize">{user?.role}</p>
                    <Badge className="mt-1 bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground">
                      Member since {new Date(user?.createdAt).getFullYear()}
                    </Badge>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-background/70 border-border text-foreground"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 text-foreground/80">
                        <User className="w-4 h-4" />
                        <span>{user?.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <div className="flex items-center space-x-2 text-foreground/80">
                      <Mail className="w-4 h-4" />
                      <span>{user?.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-foreground">Location</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter your location"
                        className="bg-background/70 border-border text-foreground"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 text-foreground/80">
                        <MapPin className="w-4 h-4" />
                        <span>{user?.location || 'Not specified'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground">Member Since</Label>
                    <div className="flex items-center space-x-2 text-foreground/80">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-foreground">Bio</Label>
                  {isEditing ? (
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                      rows={3}
                      className="w-full px-3 py-2 rounded-md bg-background/70 border border-border text-foreground placeholder:text-muted-foreground"
                    />
                  ) : (
                    <p className="text-foreground/80 p-3 bg-secondary rounded-md">
                      {user?.bio || 'No bio added yet.'}
                    </p>
                  )}
                </div>

                {/* Interests */}
                <div className="space-y-2">
                  <Label className="text-foreground">Interests</Label>
                  <div className="flex flex-wrap gap-2">
                    {user?.interests?.map((interest, index) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                    {(!user?.interests || user.interests.length === 0) && (
                      <span className="text-foreground/60">No interests added yet.</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Badges */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {user?.badges?.map((badge, index) => (
                    <Badge key={index} className="bg-gradient-to-r from-orange-500 to-red-500 w-full justify-center text-white">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={handleQRCode}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground"
                >
                  Generate QR Code
                </Button>
                <Button 
                  onClick={handleSettings}
                  variant="outline" 
                  className="w-full border-border text-foreground hover:bg-accent"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-foreground">My Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground/70">Events Attended</span>
                  <span className="text-foreground font-bold">{registeredEvents.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/70">Badges Earned</span>
                  <span className="text-foreground font-bold">{user?.badges?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/70">Interests</span>
                  <span className="text-foreground font-bold">{user?.interests?.length || 0}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Registered Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <Card className="glass-effect border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                My Registered Events ({registeredEvents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {registeredEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {registeredEvents.map((event) => (
                    <div key={event.id} className="p-4 bg-secondary rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">{event.title}</h4>
                      <p className="text-foreground/60 text-sm mb-2">{event.organizer}</p>
                      <div className="flex items-center text-sm text-foreground/60">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-foreground/50" />
                  <p className="text-foreground/70">No events registered yet.</p>
                  <p className="text-muted-foreground text-sm">Start exploring events to join the fun!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;