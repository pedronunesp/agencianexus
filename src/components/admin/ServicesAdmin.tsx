import { useState } from "react";
import { useAllServices } from "@/hooks/useServices";
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
  const { data: services, refetch } = useAllServices();
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

  // Sub-service handlers
  const handleAddSubService = async () => {
    if (!newSubService.title || !newSubService.service_id) return;
    
    const { error } = await supabase
      .from('sub_services')
      .insert([newSubService]);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao adicionar sub-serviço", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Sub-serviço adicionado com sucesso" });
      setNewSubService({ title: "", service_id: "", display_order: 0 });
      refetch();
    }
  };

  const handleUpdateSubService = async (subService: SubService) => {
    const { error } = await supabase
      .from('sub_services')
      .update({
        title: subService.title,
        display_order: subService.display_order,
        is_visible: subService.is_visible
      })
      .eq('id', subService.id);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao atualizar sub-serviço", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Sub-serviço atualizado com sucesso" });
      setEditingSubService(null);
      refetch();
    }
  };

  const handleDeleteSubService = async (id: string) => {
    const { error } = await supabase
      .from('sub_services')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao deletar sub-serviço", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Sub-serviço deletado com sucesso" });
      refetch();
    }
  };

  const handleToggleSubServiceVisibility = async (id: string, isVisible: boolean) => {
    const { error } = await supabase
      .from('sub_services')
      .update({ is_visible: !isVisible })
      .eq('id', id);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao alterar visibilidade", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Visibilidade alterada com sucesso" });
      refetch();
    }
  };

  // Project handlers
  const handleAddProject = async () => {
    if (!newProject.title || !newProject.sub_service_id) return;
    
    const { error } = await supabase
      .from('projects')
      .insert([newProject]);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao adicionar projeto", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Projeto adicionado com sucesso" });
      setNewProject({ title: "", project_type: "", sub_service_id: "", display_order: 0, thumbnail_url: "" });
      refetch();
    }
  };

  const handleUpdateProject = async (project: Project) => {
    const { error } = await supabase
      .from('projects')
      .update({
        title: project.title,
        project_type: project.project_type,
        thumbnail_url: project.thumbnail_url,
        display_order: project.display_order,
        is_visible: project.is_visible
      })
      .eq('id', project.id);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao atualizar projeto", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Projeto atualizado com sucesso" });
      setEditingProject(null);
      refetch();
    }
  };

  const handleDeleteProject = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao deletar projeto", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Projeto deletado com sucesso" });
      refetch();
    }
  };

  const handleToggleProjectVisibility = async (id: string, isVisible: boolean) => {
    const { error } = await supabase
      .from('projects')
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
          {/* Add New Sub-Service */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Novo Sub-serviço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Título do sub-serviço"
                  value={newSubService.title}
                  onChange={(e) => setNewSubService({ ...newSubService, title: e.target.value })}
                />
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newSubService.service_id}
                  onChange={(e) => setNewSubService({ ...newSubService, service_id: e.target.value })}
                >
                  <option value="">Selecione um serviço</option>
                  {services?.map((service) => (
                    <option key={service.id} value={service.id}>{service.title}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  placeholder="Ordem de exibição"
                  value={newSubService.display_order}
                  onChange={(e) => setNewSubService({ ...newSubService, display_order: parseInt(e.target.value) || 0 })}
                  className="w-32"
                />
                <Button onClick={handleAddSubService}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sub-Services List */}
          <div className="space-y-4">
            {services?.map((service) => (
              service.sub_services?.map((subService) => (
                <Card key={subService.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle>{subService.title}</CardTitle>
                        <Badge variant="outline">{service.title}</Badge>
                        <Badge variant={subService.is_visible ? "default" : "secondary"}>
                          {subService.is_visible ? "Visível" : "Oculto"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleSubServiceVisibility(subService.id, subService.is_visible)}
                        >
                          {subService.is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingSubService(subService)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteSubService(subService.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {editingSubService?.id === subService.id && (
                    <CardContent className="space-y-4">
                      <Input
                        placeholder="Título"
                        value={editingSubService.title}
                        onChange={(e) => setEditingSubService({ ...editingSubService, title: e.target.value })}
                      />
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          placeholder="Ordem"
                          value={editingSubService.display_order}
                          onChange={(e) => setEditingSubService({ ...editingSubService, display_order: parseInt(e.target.value) || 0 })}
                          className="w-32"
                        />
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={editingSubService.is_visible}
                            onCheckedChange={(checked) => setEditingSubService({ ...editingSubService, is_visible: checked })}
                          />
                          <Label>Visível</Label>
                        </div>
                        <Button onClick={() => handleUpdateSubService(editingSubService)}>
                          <Save className="h-4 w-4 mr-2" />
                          Salvar
                        </Button>
                        <Button variant="outline" onClick={() => setEditingSubService(null)}>
                          <X className="h-4 w-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    </CardContent>
                  )}
                  <CardContent>
                    <Badge variant="outline">
                      {subService.projects?.length || 0} projetos
                    </Badge>
                  </CardContent>
                </Card>
              ))
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          {/* Add New Project */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Novo Projeto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Título do projeto"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
                <Input
                  placeholder="Tipo do projeto"
                  value={newProject.project_type}
                  onChange={(e) => setNewProject({ ...newProject, project_type: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newProject.sub_service_id}
                  onChange={(e) => setNewProject({ ...newProject, sub_service_id: e.target.value })}
                >
                  <option value="">Selecione um sub-serviço</option>
                  {services?.map((service) => 
                    service.sub_services?.map((subService) => (
                      <option key={subService.id} value={subService.id}>
                        {service.title} - {subService.title}
                      </option>
                    ))
                  )}
                </select>
                <Input
                  type="number"
                  placeholder="Ordem de exibição"
                  value={newProject.display_order}
                  onChange={(e) => setNewProject({ ...newProject, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <Input
                placeholder="URL da thumbnail (opcional)"
                value={newProject.thumbnail_url}
                onChange={(e) => setNewProject({ ...newProject, thumbnail_url: e.target.value })}
              />
              <Button onClick={handleAddProject}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Projeto
              </Button>
            </CardContent>
          </Card>

          {/* Projects List */}
          <div className="space-y-4">
            {services?.map((service) => 
              service.sub_services?.map((subService) => 
                subService.projects?.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CardTitle>{project.title}</CardTitle>
                          <Badge variant="outline">{service.title} - {subService.title}</Badge>
                          <Badge variant={project.is_visible ? "default" : "secondary"}>
                            {project.is_visible ? "Visível" : "Oculto"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleProjectVisibility(project.id, project.is_visible)}
                          >
                            {project.is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingProject(project)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    {editingProject?.id === project.id && (
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            placeholder="Título"
                            value={editingProject.title}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          />
                          <Input
                            placeholder="Tipo"
                            value={editingProject.project_type}
                            onChange={(e) => setEditingProject({ ...editingProject, project_type: e.target.value })}
                          />
                        </div>
                        <Input
                          placeholder="URL da thumbnail"
                          value={editingProject.thumbnail_url || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, thumbnail_url: e.target.value })}
                        />
                        <div className="flex items-center gap-4">
                          <Input
                            type="number"
                            placeholder="Ordem"
                            value={editingProject.display_order}
                            onChange={(e) => setEditingProject({ ...editingProject, display_order: parseInt(e.target.value) || 0 })}
                            className="w-32"
                          />
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={editingProject.is_visible}
                              onCheckedChange={(checked) => setEditingProject({ ...editingProject, is_visible: checked })}
                            />
                            <Label>Visível</Label>
                          </div>
                          <Button onClick={() => handleUpdateProject(editingProject)}>
                            <Save className="h-4 w-4 mr-2" />
                            Salvar
                          </Button>
                          <Button variant="outline" onClick={() => setEditingProject(null)}>
                            <X className="h-4 w-4 mr-2" />
                            Cancelar
                          </Button>
                        </div>
                      </CardContent>
                    )}
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{project.project_type}</Badge>
                        {project.metrics && project.metrics.length > 0 && (
                          <Badge variant="outline">{project.metrics.length} métricas</Badge>
                        )}
                        {project.feedback && (
                          <Badge variant="outline">Com feedback</Badge>
                        )}
                      </div>
                      {project.thumbnail_url && (
                        <div className="mt-2">
                          <img 
                            src={project.thumbnail_url} 
                            alt={project.title}
                            className="h-20 w-auto object-cover rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesAdmin;