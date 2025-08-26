import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current session after OAuth callback
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth callback error:", error);
          navigate("/auth");
          return;
        }

        if (session?.user) {
          // Check if user has completed onboarding
          const hasCompletedOnboarding = session.user.user_metadata?.onboarding_completed;
          
          if (hasCompletedOnboarding) {
            // User has completed onboarding, redirect to dashboard
            navigate("/dashboard");
          } else {
            // New user or incomplete onboarding, redirect to multi-step flow
            navigate("/auth/complex");
          }
        } else {
          // No session, redirect to auth
          navigate("/auth");
        }
      } catch (error) {
        console.error("Error in auth callback:", error);
        navigate("/auth");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;