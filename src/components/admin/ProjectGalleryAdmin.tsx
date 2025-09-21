import { useState } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAllProjectGallery, useCreateGalleryItem, useUpdateGalleryItem, useDeleteGalleryItem, ProjectGalleryItem } from "@/hooks/useProjectGallery";
import { useAllServices } from "@/hooks/useServices";
import MediaRenderer from "@/components/MediaRenderer";

interface EditingItem extends Omit<ProjectGalleryItem, 'id' | 'created_at' | 'updated_at'> {
  id?: string;
}

export default function ProjectGalleryAdmin() {
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  
  const { data: galleryItems = [], isLoading } = useAllProjectGallery(selectedProjectId === "all" ? undefined : selectedProjectId);
  const { data: services = [] } = useAllServices();
  const createMutation = useCreateGalleryItem();
  const updateMutation = useUpdateGalleryItem();
  const deleteMutation = useDeleteGalleryItem();

  // Flatten projects from all services for selection
  const allProjects = services.flatMap(service => 
    service.sub_services.flatMap(subService => 
      subService.projects.map(project => ({
        ...project,
        serviceName: service.title,
        subServiceName: subService.title
      }))
    )
  );

  const handleCreate = () => {
    setEditingItem({
      project_id: "",
      title: "",
      description: "",
      media_url: "",
      media_type: "image",
      display_order: 0,
      is_visible: true,
    });
  };

  const handleEdit = (item: ProjectGalleryItem) => {
    setEditingItem(item);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    try {
      if (editingItem.id) {
        await updateMutation.mutateAsync(editingItem as ProjectGalleryItem);
      } else {
        await createMutation.mutateAsync(editingItem);
      }
      setEditingItem(null);
    } catch (error) {
      console.error("Error saving gallery item:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este item?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleToggleVisibility = async (item: ProjectGalleryItem) => {
    await updateMutation.mutateAsync({
      ...item,
      is_visible: !item.is_visible
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Galeria de Projetos</h2>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Item
        </Button>
      </div>

      {/* Project Filter */}
      <Card className="p-4">
        <div className="space-y-4">
          <label className="text-sm font-medium">Filtrar por Projeto:</label>
          <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um projeto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os projetos</SelectItem>
              {allProjects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.serviceName} / {project.subServiceName} / {project.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Editing Form */}
      {editingItem && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {editingItem.id ? "Editar" : "Criar"} Item da Galeria
              </h3>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setEditingItem(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Projeto</label>
                <Select 
                  value={editingItem.project_id} 
                  onValueChange={(value) => setEditingItem({...editingItem, project_id: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    {allProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.serviceName} / {project.subServiceName} / {project.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Título</label>
                <Input
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                  placeholder="Título do item"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Mídia</label>
                <Select 
                  value={editingItem.media_type} 
                  onValueChange={(value) => setEditingItem({...editingItem, media_type: value as 'image' | 'video'})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Imagem</SelectItem>
                    <SelectItem value="video">Vídeo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">URL da Mídia</label>
                <Input
                  value={editingItem.media_url}
                  onChange={(e) => setEditingItem({...editingItem, media_url: e.target.value})}
                  placeholder="URL da imagem ou vídeo"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Ordem de Exibição</label>
                <Input
                  type="number"
                  value={editingItem.display_order}
                  onChange={(e) => setEditingItem({...editingItem, display_order: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição</label>
              <Textarea
                value={editingItem.description || ""}
                onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                placeholder="Descrição do item"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setEditingItem(null)}
              >
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Gallery Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-video">
              <MediaRenderer
                mediaUrl={item.media_url}
                videoUrl={item.media_type === 'video' ? item.media_url : undefined}
                title={item.title}
              />
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm">{item.title}</h4>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleToggleVisibility(item)}
                    className="h-6 w-6"
                  >
                    {item.is_visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(item)}
                    className="h-6 w-6"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                    className="h-6 w-6 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              {item.description && (
                <p className="text-xs text-gray-500 mb-2">{item.description}</p>
              )}
              
              <div className="flex justify-between text-xs text-gray-400">
                <span>Ordem: {item.display_order}</span>
                <span>{item.media_type}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {galleryItems.length === 0 && (
        <Card className="text-center py-8">
          <p className="text-gray-500">
            {selectedProjectId !== "all" ? "Nenhum item encontrado para este projeto." : "Nenhum item de galeria encontrado."}
          </p>
        </Card>
      )}
    </div>
  );
}