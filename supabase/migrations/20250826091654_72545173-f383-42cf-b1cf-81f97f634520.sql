-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name TEXT,
  phone TEXT,
  apartment_number TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create complexes table for available residential complexes
CREATE TABLE public.complexes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_complex_selection table to store user's complex choice
CREATE TABLE public.user_complex_selection (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  complex_id UUID NOT NULL REFERENCES public.complexes(id),
  selected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_documents table to store document upload metadata
CREATE TABLE public.user_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('selfie', 'id_document')),
  file_name TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  storage_path TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, document_type)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complexes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_complex_selection ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for complexes (readable by all authenticated users)
CREATE POLICY "Authenticated users can view complexes" 
ON public.complexes 
FOR SELECT 
TO authenticated
USING (true);

-- Create RLS policies for user_complex_selection
CREATE POLICY "Users can view their own complex selection" 
ON public.user_complex_selection 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own complex selection" 
ON public.user_complex_selection 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own complex selection" 
ON public.user_complex_selection 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for user_documents
CREATE POLICY "Users can view their own documents" 
ON public.user_documents 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents" 
ON public.user_documents 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents" 
ON public.user_documents 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates on profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample complexes data
INSERT INTO public.complexes (name, location, description) VALUES
  ('Green Valley Residences', 'Downtown District', 'Modern apartments with electric vehicle charging stations and premium amenities for sustainable living.'),
  ('Sunrise Gardens', 'North Hills', 'Family-friendly complex with spacious units and dedicated EV parking with fast charging capabilities.'),
  ('Metro Heights', 'Business District', 'High-rise apartments perfect for professionals, featuring smart home integration and EV infrastructure.'),
  ('Oakwood Commons', 'Riverside', 'Community-focused living with shared spaces, gardens, and comprehensive electric vehicle support.'),
  ('The Plaza Apartments', 'City Center', 'Luxury urban living with concierge services and state-of-the-art EV charging facilities.');

-- Create storage bucket for user documents
INSERT INTO storage.buckets (id, name, public) VALUES ('user-documents', 'user-documents', false);

-- Create storage policies for user documents
CREATE POLICY "Users can upload their own documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'user-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'user-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own documents" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'user-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own documents" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'user-documents' AND auth.uid()::text = (storage.foldername(name))[1]);