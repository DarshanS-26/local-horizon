import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import LocationDetector from '@/components/LocationDetector';
import EventFilters from '@/components/EventFilters';
import EventCard, { Event } from '@/components/EventCard';
import { sampleEvents } from '@/data/sampleEvents';
import { filterEventsByRadius, sortEvents } from '@/utils/locationUtils';
import { useToast } from '@/hooks/use-toast';

interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
}

const Index = () => {
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'distance'>('date');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Get unique categories and cities for filters
  const availableCategories = [...new Set(sampleEvents.map(event => event.category))];
  const availableCities = [...new Set(sampleEvents.map(event => event.city))];

  useEffect(() => {
    // Initialize events with favorites
    const eventsWithFavorites = sampleEvents.map(event => ({
      ...event,
      isFavorite: favorites.has(event.id)
    }));
    setEvents(eventsWithFavorites);
  }, [favorites]);

  useEffect(() => {
    let filtered = [...events];

    // Filter by location if user location is available
    if (userLocation) {
      filtered = filterEventsByRadius(
        filtered,
        userLocation.latitude,
        userLocation.longitude,
        100 // 100km radius
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filter by city
    if (selectedCity !== 'all') {
      filtered = filtered.filter(event => event.city === selectedCity);
    }

    // Sort events
    filtered = sortEvents(filtered, sortBy);

    setFilteredEvents(filtered);
  }, [events, userLocation, selectedCategory, selectedCity, sortBy]);

  const handleLocationDetected = (location: LocationData) => {
    setUserLocation(location);
  };

  const handleToggleFavorite = (eventId: string) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(eventId)) {
      newFavorites.delete(eventId);
      toast({
        title: "Removed from favorites",
        description: "Event removed from your favorites list",
      });
    } else {
      newFavorites.add(eventId);
      toast({
        title: "Added to favorites",
        description: "Event added to your favorites list",
      });
    }
    setFavorites(newFavorites);
  };

  const handleViewMap = (event: Event) => {
    // For demo purposes, open Google Maps
    const mapsUrl = `https://www.google.com/maps?q=${event.latitude},${event.longitude}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Location Detection */}
        <div className="mb-6">
          <LocationDetector onLocationDetected={handleLocationDetected} />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <EventFilters
            selectedCategory={selectedCategory}
            selectedCity={selectedCity}
            sortBy={sortBy}
            onCategoryChange={setSelectedCategory}
            onCityChange={setSelectedCity}
            onSortChange={setSortBy}
            availableCategories={availableCategories}
            availableCities={availableCities}
          />
        </div>

        {/* Results Summary */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">
            {filteredEvents.length > 0 ? `Found ${filteredEvents.length} Events` : 'No Events Found'}
          </h2>
          {userLocation && (
            <p className="text-muted-foreground">
              Showing events within 100km of your location
            </p>
          )}
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onToggleFavorite={handleToggleFavorite}
                onViewMap={handleViewMap}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-muted rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-2">No Events Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or check back later for new events.
              </p>
              {!userLocation && (
                <p className="text-sm text-muted-foreground">
                  Enable location access to see events near you.
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
