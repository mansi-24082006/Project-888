import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Clock, 
  Users,
  Star,
  Grid,
  List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEvents } from '@/contexts/EventContext';
import { useToast } from '@/components/ui/use-toast';

const Events = () => {
  const { events } = useEvents();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');

  const categories = ['all', 'fest', 'workshop', 'hackathon', 'seminar', 'competition'];

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      return matchesSearch && matchesCategory && event.status === 'approved';
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'popularity':
          return b.currentAttendees - a.currentAttendees;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [events, searchTerm, selectedCategory, sortBy]);

  const handleFilter = () => {
    toast({
      title: "🚧 Advanced Filters",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <Helmet>
        <title>Events - CampusBuzz</title>
        <meta name="description" content="Browse and discover amazing college events including fests, workshops, hackathons, and more." />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Discover Events</h1>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Find amazing events happening around your campus and beyond
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-effect rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search events, organizers, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/70 border-border text-foreground placeholder:text-muted-foreground w-full"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-md bg-background/70 border border-border text-foreground w-full lg:w-auto"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-background text-foreground">
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-md bg-background/70 border border-border text-foreground w-full lg:w-auto"
            >
              <option value="date" className="bg-background text-foreground">Sort by Date</option>
              <option value="popularity" className="bg-background text-foreground">Sort by Popularity</option>
              <option value="name" className="bg-background text-foreground">Sort by Name</option>
            </select>

            {/* View Mode */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="border-border"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="border-border"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Advanced Filter */}
            <Button
              variant="outline"
              onClick={handleFilter}
              className="border-border text-foreground hover:bg-accent"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-foreground/70">
            Showing {filteredAndSortedEvents.length} event{filteredAndSortedEvents.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Events Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={
            viewMode === 'grid' 
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredAndSortedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              {viewMode === 'grid' ? (
                <Card className="event-card h-full">
                  <div className="relative">
                    <img  
                      className="w-full h-48 object-cover rounded-t-lg"
                      alt={`${event.title} event`}
                     src="https://images.unsplash.com/photo-1632158707180-d2873939cd20" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground">
                        {event.category}
                      </Badge>
                    </div>
                    {event.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-primary-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-foreground">{event.title}</CardTitle>
                    <p className="text-foreground/60 text-sm">{event.organizer}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-foreground/70 mb-4 line-clamp-2">{event.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-foreground/60">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-foreground/60">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-foreground/60">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-foreground/60">
                        <Users className="w-4 h-4 mr-2" />
                        {event.currentAttendees}/{event.maxAttendees} attending
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-purple-400">
                        {event.price === 0 ? 'Free' : `$${event.price}`}
                      </span>
                      <Link to={`/events/${event.id}`}>
                        <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="event-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-48 flex-shrink-0">
                        <img  
                          className="w-full h-32 md:h-24 object-cover rounded-lg"
                          alt={`${event.title} event`}
                         src="https://images.unsplash.com/photo-1632158707180-d2873939cd20" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground">
                            {event.category}
                          </Badge>
                          {event.featured && (
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-primary-foreground">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                        <p className="text-foreground/60 text-sm mb-2">{event.organizer}</p>
                        <p className="text-foreground/70 mb-4 line-clamp-2">{event.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-foreground/60 mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {event.currentAttendees}/{event.maxAttendees}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-purple-400">
                            {event.price === 0 ? 'Free' : `$${event.price}`}
                          </span>
                          <Link to={`/events/${event.id}`}>
                            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredAndSortedEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="glass-effect rounded-2xl p-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-foreground/50" />
              <h3 className="text-2xl font-bold text-foreground mb-2">No Events Found</h3>
              <p className="text-foreground/70 mb-6">
                Try adjusting your search criteria or check back later for new events.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground"
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Events;