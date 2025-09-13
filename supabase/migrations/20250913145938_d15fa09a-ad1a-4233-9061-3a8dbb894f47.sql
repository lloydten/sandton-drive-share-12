-- Fix the security warning by setting search_path for the function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$;

-- Also update existing profiles with metadata from auth users where first_name and last_name are null
DO $$
DECLARE
    user_record RECORD;
BEGIN
    FOR user_record IN 
        SELECT au.id, au.raw_user_meta_data
        FROM auth.users au
        JOIN public.profiles p ON au.id = p.user_id
        WHERE (p.first_name IS NULL OR p.last_name IS NULL)
        AND au.raw_user_meta_data IS NOT NULL
    LOOP
        UPDATE public.profiles 
        SET 
            first_name = COALESCE(first_name, user_record.raw_user_meta_data->>'first_name'),
            last_name = COALESCE(last_name, user_record.raw_user_meta_data->>'last_name'),
            updated_at = NOW()
        WHERE user_id = user_record.id;
    END LOOP;
END;
$$;