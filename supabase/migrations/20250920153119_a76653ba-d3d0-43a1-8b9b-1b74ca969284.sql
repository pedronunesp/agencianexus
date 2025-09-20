-- Insert sample data for complete functionality

-- Services
INSERT INTO public.services (title, description, icon, display_order, is_visible) VALUES
('Design Gráfico', 'Criação de identidades visuais marcantes e materiais gráficos profissionais', 'Palette', 1, true),
('Marketing Digital', 'Estratégias completas para aumentar sua presença online e gerar mais vendas', 'TrendingUp', 2, true),
('Audiovisual', 'Produção de vídeos profissionais, edição e motion graphics', 'Video', 3, true);

-- Sub-services (get service IDs first)
WITH service_ids AS (
  SELECT id, title FROM public.services WHERE title IN ('Design Gráfico', 'Marketing Digital', 'Audiovisual')
)
INSERT INTO public.sub_services (service_id, title, display_order, is_visible) 
SELECT 
  s.id,
  sub.title,
  sub.display_order,
  sub.is_visible
FROM service_ids s
CROSS JOIN (VALUES
  ('Design Gráfico', 'Identidade Visual', 1, true),
  ('Design Gráfico', 'Material Impresso', 2, true),
  ('Marketing Digital', 'Redes Sociais', 1, true),
  ('Marketing Digital', 'Google Ads', 2, true),
  ('Audiovisual', 'Produção de Vídeos', 1, true),
  ('Audiovisual', 'Motion Graphics', 2, true)
) AS sub(service_title, title, display_order, is_visible)
WHERE s.title = sub.service_title;

-- Projects (get sub-service IDs first)
WITH sub_service_ids AS (
  SELECT ss.id, ss.title, s.title as service_title 
  FROM public.sub_services ss 
  JOIN public.services s ON ss.service_id = s.id
)
INSERT INTO public.projects (sub_service_id, title, project_type, display_order, is_visible)
SELECT 
  ss.id,
  p.title,
  p.project_type,
  p.display_order,
  p.is_visible
FROM sub_service_ids ss
CROSS JOIN (VALUES
  ('Identidade Visual', 'Logo Empresa Tech', 'Branding', 1, true),
  ('Identidade Visual', 'Rebranding Startup', 'Branding', 2, true),
  ('Material Impresso', 'Catálogo de Produtos', 'Print', 1, true),
  ('Redes Sociais', 'Campanha Black Friday', 'Social Media', 1, true),
  ('Redes Sociais', 'Conteúdo para E-commerce', 'Social Media', 2, true),
  ('Google Ads', 'Campanha Leads Imobiliária', 'Paid Ads', 1, true),
  ('Produção de Vídeos', 'Vídeo Institucional', 'Video', 1, true),
  ('Motion Graphics', 'Animação Logo 3D', 'Animation', 1, true)
) AS p(sub_service_title, title, project_type, display_order, is_visible)
WHERE ss.title = p.sub_service_title;

-- Project Metrics (get project IDs)
WITH project_ids AS (
  SELECT p.id, p.title FROM public.projects p
)
INSERT INTO public.project_metrics (project_id, label, value, change_type, change_percentage, display_order)
SELECT 
  p.id,
  m.label,
  m.value,
  m.change_type,
  m.change_percentage,
  m.display_order
FROM project_ids p
CROSS JOIN (VALUES
  ('Logo Empresa Tech', 'Reconhecimento da Marca', '+85%', 'increase', '85', 1),
  ('Logo Empresa Tech', 'Engajamento', '+120%', 'increase', '120', 2),
  ('Rebranding Startup', 'Conversões', '+65%', 'increase', '65', 1),
  ('Catálogo de Produtos', 'Vendas', '+40%', 'increase', '40', 1),
  ('Campanha Black Friday', 'Alcance', '2.5M', 'neutral', '', 1),
  ('Campanha Black Friday', 'Vendas', '+380%', 'increase', '380', 2),
  ('Conteúdo para E-commerce', 'Engajamento', '+150%', 'increase', '150', 1),
  ('Campanha Leads Imobiliária', 'CPL', '-45%', 'decrease', '45', 1),
  ('Campanha Leads Imobiliária', 'Conversões', '+230%', 'increase', '230', 2),
  ('Vídeo Institucional', 'Visualizações', '500K+', 'neutral', '', 1),
  ('Animação Logo 3D', 'Tempo de Visualização', '+90%', 'increase', '90', 1)
) AS m(project_title, label, value, change_type, change_percentage, display_order)
WHERE p.title = m.project_title;

-- Project Feedback
WITH project_ids AS (
  SELECT p.id, p.title FROM public.projects p
)
INSERT INTO public.project_feedback (project_id, author_name, feedback_text)
SELECT 
  p.id,
  f.author_name,
  f.feedback_text
FROM project_ids p
CROSS JOIN (VALUES
  ('Logo Empresa Tech', 'Carlos Silva', 'O trabalho ficou excepcional! A identidade visual realmente reflete os valores da nossa empresa de tecnologia. Superou nossas expectativas.'),
  ('Campanha Black Friday', 'Marina Oliveira', 'A campanha foi um sucesso absoluto! Conseguimos bater nossa meta de vendas em apenas 3 dias. Equipe muito profissional.'),
  ('Vídeo Institucional', 'Roberto Santos', 'Ficamos impressionados com a qualidade da produção. O vídeo transmite exatamente a mensagem que queríamos passar aos nossos clientes.')
) AS f(project_title, author_name, feedback_text)
WHERE p.title = f.project_title;

-- Testimonials
INSERT INTO public.testimonials (name, role, company, content, rating, service, display_order, is_visible) VALUES
('Ana Paula Costa', 'Diretora de Marketing', 'TechFlow Solutions', 'Trabalho excepcional em nossa identidade visual. A equipe entendeu perfeitamente nossa visão e entregou um resultado que superou nossas expectativas.', 5, 'Design Gráfico', 1, true),
('Fernando Lima', 'CEO', 'StartupX', 'A estratégia de marketing digital desenvolvida triplicou nosso faturamento em apenas 6 meses. Profissionalismo e resultado garantidos!', 5, 'Marketing Digital', 2, true),
('Juliana Mendes', 'Proprietária', 'Boutique Elegance', 'Os vídeos produzidos aumentaram significativamente o engajamento nas nossas redes sociais. Recomendo a todos!', 5, 'Audiovisual', 3, true);

-- Client Logos
INSERT INTO public.client_logos (name, logo_url, display_order, is_visible) VALUES
('TechFlow Solutions', 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=TechFlow', 1, true),
('StartupX', 'https://via.placeholder.com/150x80/059669/FFFFFF?text=StartupX', 2, true),
('Boutique Elegance', 'https://via.placeholder.com/150x80/DC2626/FFFFFF?text=Boutique', 3, true),
('Digital Corp', 'https://via.placeholder.com/150x80/7C3AED/FFFFFF?text=Digital', 4, true),
('Creative Agency', 'https://via.placeholder.com/150x80/EA580C/FFFFFF?text=Creative', 5, true),
('Innovation Labs', 'https://via.placeholder.com/150x80/0891B2/FFFFFF?text=Innovation', 6, true);