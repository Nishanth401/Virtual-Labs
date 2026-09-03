-- ==============================================================================
-- Virtual Labs Supabase Schema
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Create Profiles Table (User Data, Lab Records, LeetCode Sheet Progress)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  register_number TEXT,
  department TEXT DEFAULT 'Artificial Intelligence & Data Science',
  year_semester TEXT DEFAULT 'Year III / Semester VI',
  completed_experiments TEXT[] DEFAULT ARRAY['bubble-sort', 'stack-operations']::TEXT[],
  completed_problems TEXT[] DEFAULT ARRAY[]::TEXT[],
  starred_problems TEXT[] DEFAULT ARRAY[]::TEXT[],
  problem_notes JSONB DEFAULT '{}'::JSONB,
  quiz_scores JSONB DEFAULT '{}'::JSONB,
  feedbacks JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. Automatic Profile Creation Trigger on Google Sign-In
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    name,
    email,
    register_number,
    created_at,
    last_active
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    UPPER(split_part(NEW.email, '@', 1)),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    last_active = NOW(),
    name = COALESCE(EXCLUDED.name, profiles.name);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Storage Bucket for Lab Records & Files
INSERT INTO storage.buckets (id, name, public)
VALUES ('lab-files', 'lab-files', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Allow authenticated uploads to lab-files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'lab-files' AND (auth.uid() = owner OR auth.uid()::text = (storage.foldername(name))[1]));

CREATE POLICY "Allow public read from lab-files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'lab-files');
