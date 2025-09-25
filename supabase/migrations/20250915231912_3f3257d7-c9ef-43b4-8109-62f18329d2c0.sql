-- Create content management tables for services, testimonials and other dynamic content

-- Services table
CREATE TABLE public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Sub-services table
CREATE TABLE public.sub_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Projects table
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sub_service_id UUID REFERENCES public.sub_services(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  thumbnail_url TEXT,
  project_type TEXT NOT NULL, -- video, case, brand, website, etc
  display_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Project metrics table (for marketing cases)
CREATE TABLE public.project_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  change_percentage TEXT,
  change_type TEXT CHECK (change_type IN ('increase', 'decrease', 'neutral')),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Project feedback table
CREATE TABLE public.project_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  feedback_text TEXT NOT NULL,
  author_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  service TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Client logos table
CREATE TABLE public.client_logos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sub_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_logos ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is a public website)
CREATE POLICY "Services are publicly readable" ON public.services FOR SELECT USING (is_visible = true);
CREATE POLICY "Sub-services are publicly readable" ON public.sub_services FOR SELECT USING (is_visible = true);
CREATE POLICY "Projects are publicly readable" ON public.projects FOR SELECT USING (is_visible = true);
CREATE POLICY "Project metrics are publicly readable" ON public.project_metrics FOR SELECT USING (true);
CREATE POLICY "Project feedback is publicly readable" ON public.project_feedback FOR SELECT USING (true);
CREATE POLICY "Testimonials are publicly readable" ON public.testimonials FOR SELECT USING (is_visible = true);
CREATE POLICY "Client logos are publicly readable" ON public.client_logos FOR SELECT USING (is_visible = true);

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sub_services_updated_at BEFORE UPDATE ON public.sub_services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data
INSERT INTO public.services (title, description, icon, display_order) VALUES
('Audiovisual', 'Transformamos momentos em memórias inesquecíveis', 'Play', 1),
('Marketing & Tráfego', 'Resultados reais através de estratégias digitais', 'TrendingUp', 2),
('Design & Web', 'Identidades visuais que conectam e convertem', 'Palette', 3);

-- Insert sub-services
INSERT INTO public.sub_services (service_id, title, display_order) 
SELECT s.id, 'Vídeos Festivos', 1 FROM public.services s WHERE s.title = 'Audiovisual';

INSERT INTO public.sub_services (service_id, title, display_order) 
SELECT s.id, 'Vídeos Corporativos/Pessoais', 2 FROM public.services s WHERE s.title = 'Audiovisual';

INSERT INTO public.sub_services (service_id, title, display_order) 
SELECT s.id, 'Filmagens com Drone', 3 FROM public.services s WHERE s.title = 'Audiovisual';

INSERT INTO public.sub_services (service_id, title, display_order) 
SELECT s.id, 'Tour Virtual 360º', 4 FROM public.services s WHERE s.title = 'Audiovisual';

INSERT INTO public.sub_services (service_id, title, display_order) 
SELECT s.id, 'Sites Convite', 5 FROM public.services s WHERE s.title = 'Audiovisual';

INSERT INTO public.sub_services (service_id, title, display_order) 
SELECT s.id, 'Tráfego Pago', 1 FROM public.services s WHERE s.title = 'Marketing & Tráfego';

INSERT INTO public.sub_services (service_id, title, display_order) 
SELECT s.id, 'Design Gráfico', 1 FROM public.services s WHERE s.title = 'Design & Web';

INSERT INTO public.sub_services (service_id, title, display_order) 
SELECT s.id, 'Criação de Sites e Landing Pages', 2 FROM public.services s WHERE s.title = 'Design & Web';

-- Insert testimonials
INSERT INTO public.testimonials (name, role, company, content, rating, service, display_order) VALUES
('Sarah & João', 'Casamento', 'Particular', 'A Nexus capturou cada emoção do nosso casamento de forma única. O resultado superou todas as expectativas! O vídeo ficou cinematográfico.', 5, 'Vídeo Festivo', 1),
('Marcus Silva', 'CEO', 'Poços Artesianos Silva', 'Em apenas 1 mês, triplicamos nossos leads com um custo muito menor. A Nexus entende de resultados! ROI impressionante.', 5, 'Tráfego Pago', 2),
('Ana Santos', 'Advogada', 'Advocacia Santos', 'O site criado pela Nexus aumentou nossas conversões em 200%. Design impecável e funcionalidade perfeita! Recomendo para todos.', 5, 'Design & Web', 3),
('Roberto Lima', 'Diretor', 'TechCorp', 'O vídeo institucional da Nexus elevou nossa marca a outro patamar. Profissionalismo e criatividade em cada detalhe.', 5, 'Vídeo Corporativo', 4),
('Carla Mendes', 'Corretora', 'Imobiliária Vista', 'Os tours virtuais 360º revolucionaram nossa forma de vender. Clientes se encantam antes mesmo de visitar o imóvel!', 5, 'Tour Virtual 360º', 5),
('Felipe Costa', 'Empreendedor', 'StartupX', 'A landing page criada pela Nexus converteu 3x mais que a anterior. Investimento que se pagou em dias!', 5, 'Landing Page', 6);

-- Insert client logos
INSERT INTO public.client_logos (name, display_order) VALUES
('TechCorp', 1),
('Advocacia Santos', 2),
('StartupX', 3),
('Imobiliária Vista', 4),
('Poços Silva', 5),
('Café Premium', 6);