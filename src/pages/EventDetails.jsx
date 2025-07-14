import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Share2, 
  Heart,
  ArrowLeft,
  QrCode,
  DollarSign,
  User,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEvents } from '@/contexts/EventContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const EventDetails = () => {
  const { id } = useParams();
  const { events, registerForEvent } = useEvents();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);

  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Event Not Found</h2>
          <Link to="/events">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground">
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleRegister = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to register for events.",
        variant: "destructive",
      });
      return;
    }

    setIsRegistering(true);
    const success = registerForEvent(event.id, user.id);
    setIsRegistering(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Event link has been copied to clipboard.",
      });
    }
  };

  const handleQRCode = () => {
    toast({
      title: "🚧 QR Code",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleWishlist = () => {
    toast({
      title: "🚧 Wishlist",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const isRegistered = user?.registeredEvents?.includes(event.id);
  const isFull = event.currentAttendees >= event.maxAttendees;

  return (
    <div className="min-h-screen py-8 px-4">
      <Helmet>
        <title>{event.title} - CampusBuzz</title>
        <meta name="description" content={event.description} />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Link to="/events">
            <Button variant="outline" className="border-border text-foreground hover:bg-accent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden">
              <img  
                className="w-full h-64 md:h-80 object-cover"
                alt={`${event.title} event`}
               src="https://images.unsplash.com/photo-1632158707180-d2873939cd20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-2 mb-4">
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
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{event.title}</h1>
                <p className="text-white/80 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Organized by {event.organizer}
                </p>
              </div>
            </div>

            {/* Event Details */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-foreground">About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                  {event.description}
                </p>

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div>
                    <h3 className="text-foreground font-semibold mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Event Info Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-effect border-border">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-purple-400 mr-3" />
                    <div>
                      <h3 className="text-foreground font-semibold">Date & Time</h3>
                      <p className="text-foreground/70">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-foreground/70">{event.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-6 h-6 text-purple-400 mr-3" />
                    <div>
                      <h3 className="text-foreground font-semibold">Location</h3>
                      <p className="text-foreground/70">{event.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Users className="w-6 h-6 text-purple-400 mr-3" />
                    <div>
                      <h3 className="text-foreground font-semibold">Attendees</h3>
                      <p className="text-foreground/70">
                        {event.currentAttendees} / {event.maxAttendees} registered
                      </p>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <DollarSign className="w-6 h-6 text-purple-400 mr-3" />
                    <div>
                      <h3 className="text-foreground font-semibold">Price</h3>
                      <p className="text-foreground/70 text-2xl font-bold">
                        {event.price === 0 ? 'Free' : `$${event.price}`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Registration Card */}
            <Card className="glass-effect border-border sticky top-8">
              <CardHeader>
                <CardTitle className="text-foreground text-center">
                  {event.price === 0 ? 'Free Event' : `$${event.price}`}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user ? (
                  <>
                    {isRegistered ? (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-green-400 font-semibold mb-4">You're registered!</p>
                        <Button 
                          onClick={handleQRCode}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                        >
                          <QrCode className="w-4 h-4 mr-2" />
                          Get QR Code
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={handleRegister}
                        disabled={isRegistering || isFull}
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-primary-foreground"
                      >
                        {isRegistering ? 'Registering...' : isFull ? 'Event Full' : 'Register Now'}
                      </Button>
                    )}
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-foreground/70 mb-4">Login to register for this event</p>
                    <Link to="/login">
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground">
                        Login to Register
                      </Button>
                    </Link>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleWishlist}
                    className="flex-1 border-border text-foreground hover:bg-accent"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="flex-1 border-border text-foreground hover:bg-accent"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                {/* Event Status */}
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between text-sm text-foreground/70 mb-2">
                    <span>Spots Available</span>
                    <span>{event.maxAttendees - event.currentAttendees}</span>
                  </div>
                  <div className="flex justify-between text-sm text-foreground/70">
                    <span>Registration Status</span>
                    <span className={isFull ? 'text-red-400' : 'text-green-400'}>
                      {isFull ? 'Full' : 'Open'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organizer Info */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-semibold">{event.organizer}</h4>
                    <p className="text-foreground/60 text-sm">Event Organizer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">Category</span>
                  <span className="text-foreground capitalize">{event.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">Duration</span>
                  <span className="text-foreground">3 hours</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">Language</span>
                  <span className="text-foreground">English</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">Age Limit</span>
                  <span className="text-foreground">18+</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;