import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Zap, Users, Shield } from "lucide-react";

const pricingFeatures = [
  {
    icon: Clock,
    title: "Flexible Hourly Rates",
    description: "Start from just R100/hour with no long-term commitments"
  },
  {
    icon: Zap,
    title: "All-Inclusive Pricing",
    description: "Insurance, charging, and maintenance included in every rental"
  },
  {
    icon: Users,
    title: "Visitor Bookings",
    description: "Book for your visitors - they just need a valid driver's license"
  },
  {
    icon: Shield,
    title: "Secure & Verified",
    description: "All residents verified with apartment numbers and ID documents"
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Fair Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparent hourly rates with everything included. Perfect for short trips around Sandton.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          <Card className="bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">CitiBug E-Car</CardTitle>
              <p className="text-muted-foreground">Perfect for 1-2 people</p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <div className="text-5xl font-bold text-primary mb-2">R100</div>
                <div className="text-muted-foreground">per hour</div>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>2-seater compact design</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>80km electric range</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Easy city parking</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Air conditioning</span>
                </li>
              </ul>
              <Button variant="electric" className="w-full" size="lg">
                Book E-Car
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Electric Golf Cart</CardTitle>
              <p className="text-muted-foreground">Great for families</p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <div className="text-5xl font-bold text-primary mb-2">R120</div>
                <div className="text-muted-foreground">per hour</div>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>4-5 seater capacity</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>40km electric range</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Weather protection</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Cargo storage space</span>
                </li>
              </ul>
              <Button variant="electric" className="w-full" size="lg">
                Book Golf Cart
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingFeatures.map((feature, index) => (
            <Card key={index} className="text-center bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;