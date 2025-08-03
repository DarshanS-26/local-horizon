import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, SortAsc } from 'lucide-react';

interface EventFiltersProps {
  selectedCategory: string;
  selectedCity: string;
  sortBy: 'date' | 'distance';
  onCategoryChange: (category: string) => void;
  onCityChange: (city: string) => void;
  onSortChange: (sort: 'date' | 'distance') => void;
  availableCategories: string[];
  availableCities: string[];
}

const EventFilters: React.FC<EventFiltersProps> = ({
  selectedCategory,
  selectedCity,
  sortBy,
  onCategoryChange,
  onCityChange,
  onSortChange,
  availableCategories,
  availableCities,
}) => {
  return (
    <Card className="shadow-card">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Filters & Sorting</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {availableCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* City Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">City</label>
            <Select value={selectedCity} onValueChange={onCityChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {availableCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Sort By */}
          <div>
            <label className="text-sm font-medium mb-2 block">Sort By</label>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'date' ? 'default' : 'filter'}
                size="sm"
                onClick={() => onSortChange('date')}
                className="flex-1"
              >
                <SortAsc className="h-4 w-4" />
                Date
              </Button>
              <Button
                variant={sortBy === 'distance' ? 'default' : 'filter'}
                size="sm"
                onClick={() => onSortChange('distance')}
                className="flex-1"
              >
                <SortAsc className="h-4 w-4" />
                Distance
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventFilters;