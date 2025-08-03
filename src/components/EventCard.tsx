import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Heart, ExternalLink } from 'lucide-react';

export interface Event {
  id: string;
  name: string;
  description: string;
  venue: string;
  date: string;
  time: string;
  category: string;
  city: string;
  latitude: number;
  longitude: number;
  distance?: number;
  imageUrl?: string;
  isFavorite?: boolean;
}

interface EventCardProps {
  event: Event;
  onToggleFavorite?: (eventId: string) => void;
  onViewMap?: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onToggleFavorite, onViewMap }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Music': 'bg-purple-100 text-purple-800',
      'Sports': 'bg-green-100 text-green-800',
      'Food': 'bg-orange-100 text-orange-800',
      'Technology': 'bg-blue-100 text-blue-800',
      'Art': 'bg-pink-100 text-pink-800',
      'Business': 'bg-gray-100 text-gray-800',
      'Education': 'bg-indigo-100 text-indigo-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.default;
  };

  return (
    <Card className="group hover:shadow-glow transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      {event.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge className={getCategoryColor(event.category)}>
            {event.category}
          </Badge>
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(event.id)}
              className="p-1 h-auto"
            >
              <Heart 
                className={`h-4 w-4 ${event.isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
              />
            </Button>
          )}
        </div>
        
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{event.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{event.description}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{formatDate(event.date)}</span>
            <Clock className="h-4 w-4 text-primary ml-2" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="line-clamp-1">{event.venue}, {event.city}</span>
          </div>
          
          {event.distance !== undefined && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                ~{event.distance.toFixed(1)} km away
              </span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="default" size="sm" className="flex-1">
          <Calendar className="h-4 w-4" />
          View Details
        </Button>
        {onViewMap && (
          <Button variant="outline" size="sm" onClick={() => onViewMap(event)}>
            <ExternalLink className="h-4 w-4" />
            Map
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;