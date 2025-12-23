-- Create faculty table
CREATE TABLE public.faculty (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  photo_url TEXT,
  qualification TEXT,
  experience TEXT,
  subjects TEXT[],
  about TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create downloads table
CREATE TABLE public.downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  category TEXT NOT NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create gallery table
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create syllabus table
CREATE TABLE public.syllabus (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  exam_type TEXT NOT NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on all tables
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.syllabus ENABLE ROW LEVEL SECURITY;

-- Faculty policies
CREATE POLICY "Anyone can view published faculty" ON public.faculty FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can view all faculty" ON public.faculty FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can insert faculty" ON public.faculty FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update faculty" ON public.faculty FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete faculty" ON public.faculty FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Downloads policies
CREATE POLICY "Anyone can view published downloads" ON public.downloads FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can view all downloads" ON public.downloads FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can insert downloads" ON public.downloads FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update downloads" ON public.downloads FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete downloads" ON public.downloads FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Gallery policies
CREATE POLICY "Anyone can view published gallery" ON public.gallery FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can view all gallery" ON public.gallery FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can insert gallery" ON public.gallery FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update gallery" ON public.gallery FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete gallery" ON public.gallery FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Syllabus policies
CREATE POLICY "Anyone can view published syllabus" ON public.syllabus FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can view all syllabus" ON public.syllabus FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can insert syllabus" ON public.syllabus FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update syllabus" ON public.syllabus FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete syllabus" ON public.syllabus FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Add triggers for updated_at
CREATE TRIGGER update_faculty_updated_at BEFORE UPDATE ON public.faculty FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_downloads_updated_at BEFORE UPDATE ON public.downloads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON public.gallery FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_syllabus_updated_at BEFORE UPDATE ON public.syllabus FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true);

-- Storage policies
CREATE POLICY "Anyone can view uploads" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
CREATE POLICY "Admins can upload files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'uploads' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update files" ON storage.objects FOR UPDATE USING (bucket_id = 'uploads' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete files" ON storage.objects FOR DELETE USING (bucket_id = 'uploads' AND has_role(auth.uid(), 'admin'::app_role));