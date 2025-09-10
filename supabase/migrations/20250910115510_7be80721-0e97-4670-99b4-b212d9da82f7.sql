-- Add welcome notification tracking to profiles table
ALTER TABLE public.profiles 
ADD COLUMN welcome_notification_seen BOOLEAN DEFAULT FALSE;