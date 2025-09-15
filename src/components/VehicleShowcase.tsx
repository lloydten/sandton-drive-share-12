import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Battery, Clock, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import eCarImage from "@/assets/e-car.jpg";
import eGolfCartImage from "@/assets/e-golf-cart.jpg";

const vehicles = [
  {
    id: 1,
    name: "CitiBug E-Car",
    type: "Small Electric Car",
    image: eCarImage,
    capacity: "2 Seaters",
    range: "80km range",
    price: "R100",
    features: ["Perfect for city trips", "Compact parking", "Easy to drive", "AC included"],
    icon: Zap
  },
  {
    id: 2,
    name: "Electric Golf Cart",
    type: "Community Vehicle",
    image: eGolfCartImage,
    capacity: "4-5 Seaters",
    range: "40km range",
    price: "R120",
    features: ["Family friendly", "Complex navigation", "Weather protection", "Cargo space"],
    icon: Users
  }
];

const VehicleShowcase = () => {
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
    <section id="vehicles" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Choose Your Electric Ride</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Two vehicle options designed for different needs - from quick city trips to family outings
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {vehicle.type}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <vehicle.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{vehicle.name}</h3>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{vehicle.capacity}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Battery className="w-4 h-4" />
                        <span>{vehicle.range}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">{vehicle.price}</div>
                    <div className="text-sm text-muted-foreground">per hour</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button variant="electric" className="w-full" size="lg" onClick={handleBookingClick}>
                  <Clock className="w-4 h-4 mr-2" />
                  Book {vehicle.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleShowcase;