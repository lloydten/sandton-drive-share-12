import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Car, Home } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Your vehicle rental has been confirmed. You should receive a confirmation email shortly.
          </p>
          
          {sessionId && (
            <div className="text-sm text-muted-foreground bg-accent/30 p-3 rounded-lg">
              <p>Transaction ID: {sessionId}</p>
            </div>
          )}

          <div className="space-y-3 pt-4">
            <Link to="/" className="block">
              <Button className="w-full">
                <Car className="w-4 h-4 mr-2" />
                View Your Rentals
              </Button>
            </Link>
            <Link to="/" className="block">
              <Button variant="outline" className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;