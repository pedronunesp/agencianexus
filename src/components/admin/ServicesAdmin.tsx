import { useState } from "react";
import { useServices } from "@/hooks/useServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Service, SubService, Project } from "@/hooks/useServices";

const ServicesAdmin = () => {
  const { data: services, refetch } = useServices();
  const { toast } = useToast();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingSubService, setEditingSubService] = useState<SubService | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newService, setNewService] = useState({ title: "", description: "", icon: "", display_order: 0 });
  const [newSubService, setNewSubService] = useState({ title: "", service_id: "", display_order: 0 });
  const [newProject, setNewProject] = useState({ title: "", project_type: "", sub_service_id: "", display_order: 0, thumbnail_url: "" });

  const handleAddService = async () => {
    if (!newService.title || !newService.description) return;
    
    const { error } = await supabase
      .from('services')
      .insert([newService]);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao adicionar serviço", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Serviço adicionado com sucesso" });
      setNewService({ title: "", description: "", icon: "", display_order: 0 });
      refetch();
    }
  };

  const handleUpdateService = async (service: Service) => {
    const { error } = await supabase
      .from('services')
      .update({
        title: service.title,
        description: service.description,
        icon: service.icon,
        display_order: service.display_order,
        is_visible: service.is_visible
      })
      .eq('id', service.id);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao atualizar serviço", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Serviço atualizado com sucesso" });
      setEditingService(null);
      refetch();
    }
  };

  const handleDeleteService = async (id: string) => {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao deletar serviço", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Serviço deletado com sucesso" });
      refetch();
    }
  };

  const handleToggleVisibility = async (id: string, isVisible: boolean) => {
    const { error } = await supabase
      .from('services')
      .update({ is_visible: !isVisible })
      .eq('id', id);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao alterar visibilidade", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Visibilidade alterada com sucesso" });
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="subservices">Sub-serviços</TabsTrigger>
          <TabsTrigger value="projects">Projetos</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          {/* Add New Service */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Novo Serviço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Título do serviço"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                />
                <Input
                  placeholder="Ícone (ex: Video)"
                  value={newService.icon}
                  onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                />
              </div>
              <Textarea
                placeholder="Descrição do serviço"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              />
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  placeholder="Ordem de exibição"
                  value={newService.display_order}
                  onChange={(e) => setNewService({ ...newService, display_order: parseInt(e.target.value) || 0 })}
                  className="w-32"
                />
                <Button onClick={handleAddService}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Services List */}
          <div className="space-y-4">
            {services?.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle>{service.title}</CardTitle>
                      <Badge variant={service.is_visible ? "default" : "secondary"}>
                        {service.is_visible ? "Visível" : "Oculto"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleVisibility(service.id, service.is_visible)}
                      >
                        {service.is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingService(service)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {editingService?.id === service.id && (
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Título"
                        value={editingService.title}
                        onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                      />
                      <Input
                        placeholder="Ícone"
                        value={editingService.icon}
                        onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                      />
                    </div>
                    <Textarea
                      placeholder="Descrição"
                      value={editingService.description}
                      onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    />
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        placeholder="Ordem"
                        value={editingService.display_order}
                        onChange={(e) => setEditingService({ ...editingService, display_order: parseInt(e.target.value) || 0 })}
                        className="w-32"
                      />
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingService.is_visible}
                          onCheckedChange={(checked) => setEditingService({ ...editingService, is_visible: checked })}
                        />
                        <Label>Visível</Label>
                      </div>
                      <Button onClick={() => handleUpdateService(editingService)}>
                        <Save className="h-4 w-4 mr-2" />
                        Salvar
                      </Button>
                      <Button variant="outline" onClick={() => setEditingService(null)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                    </div>
                  </CardContent>
                )}
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                  <div className="mt-2">
                    <Badge variant="outline">
                      {service.sub_services?.length || 0} sub-serviços
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subservices" className="space-y-4">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Gerenciamento de sub-serviços em desenvolvimento</p>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Gerenciamento de projetos em desenvolvimento</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesAdmin;