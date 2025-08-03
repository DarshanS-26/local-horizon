import { Button } from "@/components/ui/button";
import { MapPin, Calendar } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-hero text-white shadow-glow">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-8 w-8" />
              <h1 className="text-2xl font-bold">EventSpot</h1>
            </div>
          </div>
          
          <nav className="flex items-center gap-4">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Calendar className="h-4 w-4" />
              Events
            </Button>
            <Button variant="secondary" size="sm">
              Admin Login
            </Button>
          </nav>
        </div>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Discover Amazing Events Near You</h2>
          <p className="text-white/90">Find local events happening within 100km of your location</p>
        </div>
      </div>
    </header>
  );
};

export default Header;