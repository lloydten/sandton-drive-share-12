import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Heart, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNotificationRead: () => void;
}

const NotificationPanel = ({ isOpen, onClose, onNotificationRead }: NotificationPanelProps) => {
  const [hasWelcomeNotification, setHasWelcomeNotification] = useState(false);

  useEffect(() => {
    if (isOpen) {
      checkWelcomeNotificationStatus();
    }
  }, [isOpen]);

  const checkWelcomeNotificationStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('welcome_notification_seen')
        .eq('user_id', user.id)
        .single();

      setHasWelcomeNotification(!profile?.welcome_notification_seen);
    } catch (error) {
      console.error('Error checking notification status:', error);
    }
  };

  const markWelcomeNotificationAsRead = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('profiles')
        .update({ welcome_notification_seen: true })
        .eq('user_id', user.id);

      setHasWelcomeNotification(false);
      onNotificationRead();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-12 right-0 w-80 bg-background border border-border rounded-lg shadow-lg z-50">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold">Notifications</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {hasWelcomeNotification ? (
          <Card className="m-3 border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                Welcome to JeHu EV!
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4">
                🎉 Welcome to the future of sustainable transportation! We're excited to have you join our community.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                You can now book electric vehicles from your residential complex anytime. Enjoy eco-friendly rides with zero emissions!
              </p>
              <div className="flex items-center gap-2 text-sm text-primary mb-4">
                <Heart className="w-4 h-4" />
                <span>Thank you for choosing sustainable transport</span>
              </div>
              <Button 
                onClick={markWelcomeNotificationAsRead} 
                className="w-full"
                size="sm"
              >
                Got it, thanks!
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="p-6 text-center text-muted-foreground">
            <p>No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;