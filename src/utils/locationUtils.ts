/**
 * Calculate the distance between two points using the Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point  
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  
  // Convert degrees to radians
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

/**
 * Filter events within a specified radius from user location
 * @param events Array of events
 * @param userLat User's latitude
 * @param userLon User's longitude
 * @param radiusKm Radius in kilometers (default: 100)
 * @returns Filtered events with distance calculated
 */
export function filterEventsByRadius(
  events: any[],
  userLat: number,
  userLon: number,
  radiusKm: number = 100
) {
  return events
    .map(event => ({
      ...event,
      distance: calculateDistance(userLat, userLon, event.latitude, event.longitude)
    }))
    .filter(event => event.distance <= radiusKm);
}

/**
 * Sort events by distance or date
 * @param events Array of events
 * @param sortBy Sort criteria: 'distance' | 'date'
 * @returns Sorted events array
 */
export function sortEvents(events: any[], sortBy: 'distance' | 'date') {
  return [...events].sort((a, b) => {
    if (sortBy === 'distance') {
      return (a.distance || 0) - (b.distance || 0);
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });
}