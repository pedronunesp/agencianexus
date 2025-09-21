import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ProjectGalleryItem {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  media_url: string;
  media_type: 'image' | 'video';
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export const useProjectGallery = (projectId: string) => {
  return useQuery({
    queryKey: ["project-gallery", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_gallery")
        .select("*")
        .eq("project_id", projectId)
        .eq("is_visible", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as ProjectGalleryItem[];
    },
    enabled: !!projectId,
  });
};

export const useAllProjectGallery = (projectId?: string) => {
  return useQuery({
    queryKey: ["all-project-gallery", projectId],
    queryFn: async () => {
      let query = supabase
        .from("project_gallery")
        .select("*");
      
      if (projectId) {
        query = query.eq("project_id", projectId);
      }
      
      const { data, error } = await query.order("display_order", { ascending: true });

      if (error) throw error;
      return data as ProjectGalleryItem[];
    },
  });
};

export const useCreateGalleryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: Omit<ProjectGalleryItem, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("project_gallery")
        .insert([item])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-gallery"] });
      queryClient.invalidateQueries({ queryKey: ["all-project-gallery"] });
      toast.success("Item da galeria criado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar item da galeria");
    },
  });
};

export const useUpdateGalleryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ProjectGalleryItem> & { id: string }) => {
      const { data, error } = await supabase
        .from("project_gallery")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-gallery"] });
      queryClient.invalidateQueries({ queryKey: ["all-project-gallery"] });
      toast.success("Item da galeria atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar item da galeria");
    },
  });
};

export const useDeleteGalleryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("project_gallery")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-gallery"] });
      queryClient.invalidateQueries({ queryKey: ["all-project-gallery"] });
      toast.success("Item da galeria removido com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao remover item da galeria");
    },
  });
};