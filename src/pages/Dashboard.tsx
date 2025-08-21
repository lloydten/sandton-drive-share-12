import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Car, Clock, Battery, Users, MapPin, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for the complex and cars
const complexData = {
  name: "Green Valley Residential Complex",
  image: "/api/placeholder/800/300",
  location: "Johannesburg, South Africa"
};

const availableCars = [
  {
    id: 1,
    name: "CitiBug E-Car",
    type: "Small Electric Car",
    image: "/api/placeholder/400/300",
    capacity: "2 Seaters",
    range: "80km",
    pricePerHour: 100,
    features: ["AC included", "Perfect for city trips", "Compact parking"],
    available: true,
    battery: 85
  },
  {
    id: 2,
    name: "Electric Golf Cart",
    type: "Community Vehicle", 
    image: "/api/placeholder/400/300",
    capacity: "4-5 Seaters",
    range: "40km",
    pricePerHour: 120,
    features: ["Family friendly", "Weather protection", "Cargo space"],
    available: true,
    battery: 92
  },
  {
    id: 3,
    name: "Urban E-Hatchback",
    type: "Compact Electric Car",
    image: "/api/placeholder/400/300", 
    capacity: "4 Seaters",
    range: "120km",
    pricePerHour: 150,
    features: ["Long range", "Fast charging", "Premium interior"],
    available: false,
    battery: 20
  }
];

const Dashboard = () => {
  const [selectedCar, setSelectedCar] = useState<typeof availableCars[0] | null>(null);
  const [hours, setHours] = useState([2]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { toast } = useToast();

  const handleBooking = (car: typeof availableCars[0]) => {
    setSelectedCar(car);
    setIsBookingOpen(true);
  };

  const calculateTotal = () => {
    if (!selectedCar) return 0;
    return selectedCar.pricePerHour * hours[0];
  };

  const handlePayment = () => {
    toast({
      title: "Redirecting to Payment",
      description: "Taking you to Yoco payment gateway...",
    });
    // Here you would integrate with Yoco payment gateway
    // window.location.href = "yoco-payment-url";
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Complex Cover Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={complexData.image}
          alt={complexData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5" />
            <span className="text-sm opacity-90">{complexData.location}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">{complexData.name}</h1>
        </div>
      </div>

      {/* Available Cars Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Available Vehicles</h2>
          <p className="text-muted-foreground">
            Choose from our electric vehicle fleet - perfect for your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCars.map((car) => (
            <Card key={car.id} className="overflow-hidden bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant={car.available ? "default" : "secondary"}>
                    {car.available ? "Available" : "In Use"}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <Battery className="w-5 h-5 text-primary" />
                  <span className="text-xs font-medium ml-1">{car.battery}%</span>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{car.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{car.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">R{car.pricePerHour}</div>
                    <div className="text-xs text-muted-foreground">per hour</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{car.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Battery className="w-4 h-4" />
                    <span>{car.range}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-1 mb-4">
                  {car.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Dialog open={isBookingOpen && selectedCar?.id === car.id} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="electric"
                      className="w-full"
                      disabled={!car.available}
                      onClick={() => handleBooking(car)}
                    >
                      <Car className="w-4 h-4 mr-2" />
                      {car.available ? "Book Now" : "Unavailable"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Car className="w-5 h-5 text-primary" />
                        Book {selectedCar?.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="text-center">
                        <img
                          src={selectedCar?.image}
                          alt={selectedCar?.name}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <Badge variant="outline">{selectedCar?.type}</Badge>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <label className="text-sm font-medium">Duration</label>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary" />
                              <span className="font-bold">{hours[0]} hour{hours[0] !== 1 ? 's' : ''}</span>
                            </div>
                          </div>
                          <Slider
                            value={hours}
                            onValueChange={setHours}
                            max={12}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>1 hour</span>
                            <span>12 hours</span>
                          </div>
                        </div>

                        <div className="bg-accent/30 border border-accent rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Total Cost:</span>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">R{calculateTotal()}</div>
                              <div className="text-xs text-muted-foreground">
                                R{selectedCar?.pricePerHour}/hour × {hours[0]} hour{hours[0] !== 1 ? 's' : ''}
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={handlePayment}
                          className="w-full"
                          size="lg"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay R{calculateTotal()} with Yoco
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;