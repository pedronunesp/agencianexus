import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
  sub_services: SubService[];
}

export interface SubService {
  id: string;
  service_id: string;
  title: string;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
  projects: Project[];
}

export interface Project {
  id: string;
  sub_service_id: string;
  title: string;
  thumbnail_url: string | null;
  project_type: string;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
  metrics?: ProjectMetric[];
  feedback?: ProjectFeedback;
}

export interface ProjectMetric {
  id: string;
  project_id: string;
  label: string;
  value: string;
  change_percentage: string | null;
  change_type: string | null;
  display_order: number;
  created_at: string;
}

export interface ProjectFeedback {
  id: string;
  project_id: string;
  feedback_text: string;
  author_name: string;
  created_at: string;
}

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      // Fetch services
      const { data: services, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });

      if (servicesError) throw servicesError;

      // Fetch sub-services
      const { data: subServices, error: subServicesError } = await supabase
        .from('sub_services')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });

      if (subServicesError) throw subServicesError;

      // Fetch projects
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });

      if (projectsError) throw projectsError;

      // Fetch project metrics
      const { data: metrics, error: metricsError } = await supabase
        .from('project_metrics')
        .select('*')
        .order('display_order', { ascending: true });

      if (metricsError) throw metricsError;

      // Fetch project feedback
      const { data: feedback, error: feedbackError } = await supabase
        .from('project_feedback')
        .select('*');

      if (feedbackError) throw feedbackError;

      // Organize data hierarchically
      const organizedServices: Service[] = services.map(service => ({
        ...service,
        sub_services: subServices
          .filter(sub => sub.service_id === service.id)
          .map(subService => ({
            ...subService,
            projects: projects
              .filter(project => project.sub_service_id === subService.id)
              .map(project => ({
                ...project,
                metrics: metrics.filter(metric => metric.project_id === project.id),
                feedback: feedback.find(fb => fb.project_id === project.id)
              }))
          }))
      }));

      return organizedServices;
    },
  });
};

// Hook for admin panel (all items, including hidden ones)
export const useAllServices = () => {
  return useQuery({
    queryKey: ['all-services'],
    queryFn: async () => {
      // Fetch ALL services (including hidden)
      const { data: services, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (servicesError) throw servicesError;

      // Fetch ALL sub-services (including hidden)
      const { data: subServices, error: subServicesError } = await supabase
        .from('sub_services')
        .select('*')
        .order('display_order', { ascending: true });

      if (subServicesError) throw subServicesError;

      // Fetch ALL projects (including hidden)
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (projectsError) throw projectsError;

      // Fetch ALL project metrics
      const { data: metrics, error: metricsError } = await supabase
        .from('project_metrics')
        .select('*')
        .order('display_order', { ascending: true });

      if (metricsError) throw metricsError;

      // Fetch ALL project feedback
      const { data: feedback, error: feedbackError } = await supabase
        .from('project_feedback')
        .select('*');

      if (feedbackError) throw feedbackError;

      // Organize data hierarchically
      const organizedServices: Service[] = services.map(service => ({
        ...service,
        sub_services: subServices
          .filter(sub => sub.service_id === service.id)
          .map(subService => ({
            ...subService,
            projects: projects
              .filter(project => project.sub_service_id === subService.id)
              .map(project => ({
                ...project,
                metrics: metrics.filter(metric => metric.project_id === project.id),
                feedback: feedback.find(fb => fb.project_id === project.id)
              }))
          }))
      }));

      return organizedServices;
    },
  });
};