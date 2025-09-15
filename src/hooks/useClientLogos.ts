import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ClientLogo {
  id: string;
  name: string;
  logo_url: string | null;
  display_order: number;
  is_visible: boolean;
  created_at: string;
}

export const useClientLogos = () => {
  return useQuery({
    queryKey: ['client-logos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_logos')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as ClientLogo[];
    },
  });
};