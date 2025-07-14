
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const EventContext = createContext();

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load mock events
    const mockEvents = [
      {
        id: '1',
        title: 'TechFest 2024',
        description: 'Annual technology festival featuring workshops, competitions, and networking opportunities.',
        category: 'fest',
        date: '2024-03-15',
        time: '09:00',
        location: 'Main Auditorium',
        organizer: 'Tech Club',
        organizerId: '1',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        maxAttendees: 500,
        currentAttendees: 234,
        price: 0,
        tags: ['Technology', 'Innovation', 'Networking'],
        status: 'approved',
        featured: true,
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        title: 'React Workshop',
        description: 'Learn modern React development with hooks, context, and best practices.',
        category: 'workshop',
        date: '2024-03-20',
        time: '14:00',
        location: 'Computer Lab 1',
        organizer: 'Web Dev Society',
        organizerId: '2',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        maxAttendees: 50,
        currentAttendees: 32,
        price: 25,
        tags: ['React', 'JavaScript', 'Frontend'],
        status: 'approved',
        featured: false,
        createdAt: '2024-01-20T15:30:00Z'
      },
      {
        id: '3',
        title: 'HackathonX',
        description: '48-hour coding marathon to build innovative solutions for real-world problems.',
        category: 'hackathon',
        date: '2024-04-05',
        time: '18:00',
        location: 'Innovation Hub',
        organizer: 'Coding Club',
        organizerId: '3',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
        maxAttendees: 200,
        currentAttendees: 156,
        price: 50,
        tags: ['Coding', 'Innovation', 'Competition'],
        status: 'approved',
        featured: true,
        createdAt: '2024-02-01T09:00:00Z'
      }
    ];

    const storedEvents = localStorage.getItem('campusbuzz_events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(mockEvents);
      localStorage.setItem('campusbuzz_events', JSON.stringify(mockEvents));
    }
    setLoading(false);
  }, []);

  const createEvent = (eventData) => {
    const newEvent = {
      id: Date.now().toString(),
      ...eventData,
      currentAttendees: 0,
      status: 'pending',
      featured: false,
      createdAt: new Date().toISOString()
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('campusbuzz_events', JSON.stringify(updatedEvents));

    toast({
      title: "Event created!",
      description: "Your event has been submitted for approval.",
    });

    return newEvent;
  };

  const updateEvent = (eventId, updates) => {
    const updatedEvents = events.map(event =>
      event.id === eventId ? { ...event, ...updates } : event
    );
    setEvents(updatedEvents);
    localStorage.setItem('campusbuzz_events', JSON.stringify(updatedEvents));

    toast({
      title: "Event updated",
      description: "Event has been updated successfully.",
    });
  };

  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem('campusbuzz_events', JSON.stringify(updatedEvents));

    toast({
      title: "Event deleted",
      description: "Event has been deleted successfully.",
    });
  };

  const registerForEvent = (eventId, userId) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return false;

    if (event.currentAttendees >= event.maxAttendees) {
      toast({
        title: "Event full",
        description: "This event has reached maximum capacity.",
        variant: "destructive",
      });
      return false;
    }

    updateEvent(eventId, {
      currentAttendees: event.currentAttendees + 1
    });

    toast({
      title: "Registration successful!",
      description: `You've been registered for ${event.title}`,
    });

    return true;
  };

  const value = {
    events,
    loading,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};
