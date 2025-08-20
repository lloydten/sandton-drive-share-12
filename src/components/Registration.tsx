import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CreditCard, Mail, Home, UserCheck } from "lucide-react";

const Registration = () => {
  return (
    <section id="register" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Quick Registration</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes. Only residents can register and book for themselves or visitors with valid licenses.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl mb-2">Resident Registration</CardTitle>
              <p className="text-muted-foreground">Complete your profile to start booking</p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <UserCheck className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" placeholder="Enter your full name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+27 XX XXX XXXX" />
                    </div>
                    <div>
                      <Label htmlFor="apartment">Apartment Number</Label>
                      <Input id="apartment" placeholder="e.g., A-204" />
                      <p className="text-sm text-muted-foreground mt-1">Required for resident verification</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Upload className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">Documents & Payment</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Photo ID Upload</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-accent transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium">Click to upload ID document</p>
                        <p className="text-xs text-muted-foreground">Supports JPG, PNG (max 5MB)</p>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="cardNumber">Credit/Debit Card</Label>
                      <Input id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="XXX" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" size="lg" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Register with Gmail
                  </Button>
                  <Button variant="electric" size="lg" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Complete Registration
                  </Button>
                </div>
                
                <p className="text-center text-sm text-muted-foreground mt-4">
                  By registering, you agree to our terms of service and privacy policy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Registration;