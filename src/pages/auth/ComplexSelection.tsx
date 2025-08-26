import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Building2, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Complex {
  id: string;
  name: string;
  location: string;
  description: string;
}

const ComplexSelection = () => {
  const [selectedComplex, setSelectedComplex] = useState("");
  const [complexes, setComplexes] = useState<Complex[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchComplexes();
  }, []);

  const fetchComplexes = async () => {
    try {
      const { data, error } = await supabase
        .from('complexes')
        .select('*')
        .order('name');

      if (error) throw error;
      setComplexes(data || []);
    } catch (error) {
      console.error('Error fetching complexes:', error);
      toast({
        title: "Error",
        description: "Failed to load complexes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (selectedComplex) {
      try {
        const user = await supabase.auth.getUser();
        if (!user.data.user) {
          throw new Error('User not authenticated');
        }

        // Save complex selection
        const { error } = await supabase
          .from('user_complex_selection')
          .upsert({
            user_id: user.data.user.id,
            complex_id: selectedComplex,
          });

        if (error) throw error;

        navigate("/auth/documents");
      } catch (error) {
        console.error('Error saving complex selection:', error);
        toast({
          title: "Error",
          description: "Failed to save selection. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">Step 1 of 2</span>
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>
          <CardTitle className="text-2xl font-bold">Select Your Complex</CardTitle>
          <p className="text-muted-foreground">
            Choose the residential complex where you'll be using JeHu EV services
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading complexes...</p>
            </div>
          ) : (
            <RadioGroup value={selectedComplex} onValueChange={setSelectedComplex}>
              {complexes.map((complex) => (
                <div key={complex.id} className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={complex.id} id={complex.id} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={complex.id} className="cursor-pointer">
                      <div className="font-semibold text-foreground">{complex.name}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3" />
                        {complex.location}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {complex.description}
                      </div>
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          )}
          
          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleNext}
              disabled={!selectedComplex}
              className="min-w-32"
            >
              Next Step
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplexSelection;