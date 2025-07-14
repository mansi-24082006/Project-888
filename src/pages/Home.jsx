import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  Calendar, 
  Users, 
  Trophy, 
  Zap, 
  ArrowRight,
  Star,
  MapPin,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEvents } from '@/contexts/EventContext';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { events } = useEvents();
  const { user } = useAuth();
  
  const featuredEvents = events.filter(event => event.featured).slice(0, 3);
  const stats = [
    { icon: Calendar, label: 'Events', value: events.length },
    { icon: Users, label: 'Students', value: '2.5K+' },
    { icon: Trophy, label: 'Competitions', value: '50+' },
    { icon: Zap, label: 'Workshops', value: '100+' }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>CampusBuzz - Discover Amazing College Events</title>
        <meta name="description" content="Join the ultimate college event platform. Discover fests, workshops, hackathons and connect with your campus community." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 dark:from-purple-900/30 dark:to-blue-900/30"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              CampusBuzz
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover amazing college events, connect with your community, and make unforgettable memories
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/events">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-8 py-3 text-primary-foreground">
                  Explore Events
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              {!user && (
                <Link to="/register">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-border text-foreground hover:bg-accent">
                    Join Community
                  </Button>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 floating-animation">
          <div className="w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
        </div>
        <div className="absolute bottom-20 right-10 floating-animation" style={{ animationDelay: '1s' }}>
          <div className="w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="glass-effect rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-foreground/60">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Events</h2>
            <p className="text-foreground/60 text-lg">Don't miss these amazing upcoming events</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="event-card h-full">
                  <div className="relative">
                    <img  
                      className="w-full h-48 object-cover rounded-t-lg"
                      alt={`${event.title} event`}
                     src="https://images.unsplash.com/photo-1632158707180-d2873939cd20" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{event.category}</Badge>
                      <span className="text-sm text-foreground/60">{event.organizer}</span>
                    </div>
                    <CardTitle className="text-foreground">{event.title}</CardTitle>
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
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/60">
                        {event.currentAttendees}/{event.maxAttendees} attending
                      </span>
                      <Link to={`/events/${event.id}`}>
                        <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/events">
              <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-accent">
                View All Events
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-effect rounded-3xl p-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-foreground/70 mb-8">
              Join thousands of students discovering amazing events every day
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <>
                  <Link to="/register">
                    <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-8 py-3 text-primary-foreground">
                      Sign Up Now
                    </Button>
                  </Link>
                  <Link to="/events">
                    <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-border text-foreground hover:bg-accent">
                      Browse Events
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/events">
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-8 py-3 text-primary-foreground">
                    Discover Events
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;