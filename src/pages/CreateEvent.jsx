import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  DollarSign,
  FileText,
  Tag,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEvents } from '@/contexts/EventContext';
import { useAuth } from '@/contexts/AuthContext';

const CreateEvent = () => {
  const { createEvent } = useEvents();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'workshop',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
    price: '',
    tags: '',
    image: ''
  });
  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'workshop', label: 'Workshop' },
    { value: 'fest', label: 'Fest' },
    { value: 'hackathon', label: 'Hackathon' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'competition', label: 'Competition' },
    { value: 'conference', label: 'Conference' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.maxAttendees || formData.maxAttendees < 1) newErrors.maxAttendees = 'Valid max attendees required';
    if (formData.price < 0) newErrors.price = 'Price cannot be negative';
    
    // Check if date is in the future
    const eventDate = new Date(`${formData.date}T${formData.time}`);
    if (eventDate <= new Date()) {
      newErrors.date = 'Event date must be in the future';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    const eventData = {
      ...formData,
      organizerId: user.id,
      organizer: user.name,
      maxAttendees: parseInt(formData.maxAttendees),
      price: parseFloat(formData.price) || 0,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      image: formData.image || 'https://images.unsplash.com/photo-1632158707180-d2873939cd20'
    };
    
    createEvent(eventData);
    setLoading(false);
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <Helmet>
        <title>Create Event - CampusBuzz</title>
        <meta name="description" content="Create and organize amazing college events with CampusBuzz. Reach students and build your community." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">Create New Event</h1>
          <p className="text-foreground/70">Share your amazing event with the campus community</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="glass-effect border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Event Details</CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-foreground">Event Title *</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter event title"
                        className="pl-10 bg-background/70 border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    {errors.title && <p className="text-red-400 text-sm">{errors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-foreground">Category *</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-md bg-background/70 border border-border text-foreground"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value} className="bg-background text-foreground">
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your event in detail..."
                    rows={4}
                    className="bg-background/70 border-border text-foreground placeholder:text-muted-foreground"
                  />
                  {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}
                </div>

                {/* Date & Time */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-foreground">Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="pl-10 bg-background/70 border-border text-foreground"
                      />
                    </div>
                    {errors.date && <p className="text-red-400 text-sm">{errors.date}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-foreground">Time *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="pl-10 bg-background/70 border-border text-foreground"
                      />
                    </div>
                    {errors.time && <p className="text-red-400 text-sm">{errors.time}</p>}
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-foreground">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter event location"
                      className="pl-10 bg-background/70 border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  {errors.location && <p className="text-red-400 text-sm">{errors.location}</p>}
                </div>

                {/* Capacity & Price */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="maxAttendees" className="text-foreground">Max Attendees *</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        id="maxAttendees"
                        name="maxAttendees"
                        type="number"
                        min="1"
                        value={formData.maxAttendees}
                        onChange={handleChange}
                        placeholder="Maximum number of attendees"
                        className="pl-10 bg-background/70 border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    {errors.maxAttendees && <p className="text-red-400 text-sm">{errors.maxAttendees}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-foreground">Price (USD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0.00 (Leave empty for free)"
                        className="pl-10 bg-background/70 border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    {errors.price && <p className="text-red-400 text-sm">{errors.price}</p>}
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-foreground">Tags</Label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="Enter tags separated by commas (e.g., technology, networking, innovation)"
                      className="pl-10 bg-background/70 border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <p className="text-muted-foreground text-sm">Tags help students discover your event</p>
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-foreground">Event Image URL (Optional)</Label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      id="image"
                      name="image"
                      type="url"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="pl-10 bg-background/70 border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <p className="text-muted-foreground text-sm">A default image will be used if none is provided</p>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-primary-foreground"
                  >
                    {loading ? 'Creating Event...' : 'Create Event'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                    className="border-border text-foreground hover:bg-accent"
                  >
                    Cancel
                  </Button>
                </div>

                {/* Info */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-blue-300 text-sm">
                    <strong>Note:</strong> Your event will be submitted for admin approval before being published to the community.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateEvent;