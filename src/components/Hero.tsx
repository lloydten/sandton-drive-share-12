import { Button } from "@/components/ui/button";
import { MapPin, Clock, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import heroImage from "@/assets/hero-ev-rental.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleBookingClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <section className="pt-20 pb-16 bg-gradient-hero text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-electric" />
            <span className="text-electric font-medium">Sandton, Johannesburg</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Electric Vehicle 
            <span className="block gradient-text">Rental for Residents</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Convenient, affordable EV rentals for apartment complex residents and their visitors. 
            Choose from small e-cars or golf carts starting from R100/hour.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6" onClick={handleBookingClick}>
              <Zap className="w-5 h-5 mr-2" />
              Start Booking
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
              Learn More
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Clock className="w-6 h-6 text-electric" />
              <div className="text-left">
                <div className="font-semibold">Hourly Rentals</div>
                <div className="text-sm text-white/80">From R100/hour</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Zap className="w-6 h-6 text-electric" />
              <div className="text-left">
                <div className="font-semibold">100% Electric</div>
                <div className="text-sm text-white/80">Eco-friendly fleet</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <MapPin className="w-6 h-6 text-electric" />
              <div className="text-left">
                <div className="font-semibold">Complex Access</div>
                <div className="text-sm text-white/80">Residents only</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;