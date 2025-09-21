-- Add media support to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS media_type text DEFAULT 'image' CHECK (media_type IN ('image', 'video'));
ALTER TABLE projects ADD COLUMN IF NOT EXISTS video_url text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS description text;

-- Create project_gallery table for additional work showcase
CREATE TABLE IF NOT EXISTS public.project_gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  display_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on project_gallery
ALTER TABLE public.project_gallery ENABLE ROW LEVEL SECURITY;

-- Create policies for project_gallery
CREATE POLICY "Allow all operations on project_gallery" 
ON public.project_gallery 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Project gallery is publicly readable" 
ON public.project_gallery 
FOR SELECT 
USING (is_visible = true);

-- Create trigger for updated_at
CREATE TRIGGER update_project_gallery_updated_at
BEFORE UPDATE ON public.project_gallery
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();