-- Remove existing user complex selections first
DELETE FROM public.user_complex_selection;

-- Remove existing complexes  
DELETE FROM public.complexes;

-- Add new Dainfern complexes
INSERT INTO public.complexes (name, location, description) VALUES 
('The William', 'Dainfern', 'Premium residential complex in the heart of Dainfern'),
('Helderfontein Estate', 'Dainfern', 'Luxury estate living with modern amenities in Dainfern'),
('The Paddocks', 'Dainfern', 'Contemporary family-friendly complex in Dainfern'),
('The View', 'Dainfern', 'Scenic residential development with stunning views in Dainfern');