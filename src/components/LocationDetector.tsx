import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
}

interface LocationDetectorProps {
  onLocationDetected: (location: LocationData) => void;
}

const LocationDetector: React.FC<LocationDetectorProps> = ({ onLocationDetected }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const detectLocation = () => {
    if (!navigator.geolocation) {
      const errorMsg = 'Geolocation is not supported by this browser.';
      setError(errorMsg);
      toast({
        title: "Location Error",
        description: errorMsg,
        variant: "destructive",
      });
      return;
    }

    setIsDetecting(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Try to get city name using reverse geocoding (simplified)
        let city = 'Unknown Location';
        try {
          // For demo purposes, we'll set a placeholder city
          // In a real app, you'd use a geocoding service
          city = 'Current Location';
        } catch (err) {
          console.warn('Could not determine city name');
        }

        const locationData = { latitude, longitude, city };
        setLocation(locationData);
        onLocationDetected(locationData);
        setIsDetecting(false);
        
        toast({
          title: "Location Detected",
          description: `Found your location: ${city}`,
        });
      },
      (error) => {
        let errorMsg = 'Unable to retrieve your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = 'Location access denied. Please enable location permissions.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMsg = 'Location request timed out.';
            break;
        }
        
        setError(errorMsg);
        setIsDetecting(false);
        toast({
          title: "Location Error",
          description: errorMsg,
          variant: "destructive",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  useEffect(() => {
    // Auto-detect location on component mount
    detectLocation();
  }, []);

  return (
    <Card className="p-4 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MapPin className={`h-5 w-5 ${location ? 'text-primary' : 'text-muted-foreground'}`} />
          <div>
            <h3 className="font-semibold">Your Location</h3>
            {location ? (
              <p className="text-sm text-muted-foreground">
                {location.city} • {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {error || 'Detecting your location...'}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          {error && (
            <AlertCircle className="h-5 w-5 text-destructive" />
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={detectLocation}
            disabled={isDetecting}
          >
            {isDetecting ? 'Detecting...' : 'Refresh'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LocationDetector;