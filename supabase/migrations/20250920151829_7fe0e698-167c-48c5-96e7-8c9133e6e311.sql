-- Enable full admin access for all tables (since there's no auth system, allow all operations)

-- Services table policies
CREATE POLICY "Allow all operations on services" ON public.services FOR ALL USING (true) WITH CHECK (true);

-- Sub-services table policies  
CREATE POLICY "Allow all operations on sub_services" ON public.sub_services FOR ALL USING (true) WITH CHECK (true);

-- Projects table policies
CREATE POLICY "Allow all operations on projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);

-- Project metrics table policies
CREATE POLICY "Allow all operations on project_metrics" ON public.project_metrics FOR ALL USING (true) WITH CHECK (true);

-- Project feedback table policies
CREATE POLICY "Allow all operations on project_feedback" ON public.project_feedback FOR ALL USING (true) WITH CHECK (true);

-- Testimonials table policies
CREATE POLICY "Allow all operations on testimonials" ON public.testimonials FOR ALL USING (true) WITH CHECK (true);

-- Client logos table policies
CREATE POLICY "Allow all operations on client_logos" ON public.client_logos FOR ALL USING (true) WITH CHECK (true);

-- Add foreign key constraints for better data integrity
ALTER TABLE public.sub_services 
ADD CONSTRAINT fk_sub_services_service_id 
FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE CASCADE;

ALTER TABLE public.projects 
ADD CONSTRAINT fk_projects_sub_service_id 
FOREIGN KEY (sub_service_id) REFERENCES public.sub_services(id) ON DELETE CASCADE;

ALTER TABLE public.project_metrics 
ADD CONSTRAINT fk_project_metrics_project_id 
FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;

ALTER TABLE public.project_feedback 
ADD CONSTRAINT fk_project_feedback_project_id 
FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;