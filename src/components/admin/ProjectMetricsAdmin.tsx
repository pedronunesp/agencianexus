import { useState } from "react";
import { useAllServices } from "@/hooks/useServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Save, X, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProjectMetric {
  id?: string;
  project_id: string;
  label: string;
  value: string;
  change_percentage: string | null;
  change_type: string | null;
  display_order: number;
}

const ProjectMetricsAdmin = () => {
  const { data: services, refetch } = useAllServices();
  const { toast } = useToast();
  const [editingMetric, setEditingMetric] = useState<ProjectMetric | null>(null);
  const [newMetric, setNewMetric] = useState({
    project_id: "",
    label: "",
    value: "",
    change_percentage: "",
    change_type: "positive",
    display_order: 0
  });

  const allProjects = services?.flatMap(service => 
    service.sub_services?.flatMap(subService => 
      subService.projects?.map(project => ({
        ...project,
        serviceName: service.title,
        subServiceName: subService.title
      })) || []
    ) || []
  ) || [];

  const handleAddMetric = async () => {
    if (!newMetric.project_id || !newMetric.label || !newMetric.value) return;
    
    const metricData = {
      ...newMetric,
      change_percentage: newMetric.change_percentage || null,
      change_type: newMetric.change_percentage ? newMetric.change_type : null
    };
    
    const { error } = await supabase
      .from('project_metrics')
      .insert([metricData]);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao adicionar métrica", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Métrica adicionada com sucesso" });
      setNewMetric({
        project_id: "",
        label: "",
        value: "",
        change_percentage: "",
        change_type: "positive",
        display_order: 0
      });
      refetch();
    }
  };

  const handleUpdateMetric = async (metric: ProjectMetric) => {
    const { error } = await supabase
      .from('project_metrics')
      .update({
        label: metric.label,
        value: metric.value,
        change_percentage: metric.change_percentage || null,
        change_type: metric.change_percentage ? metric.change_type : null,
        display_order: metric.display_order
      })
      .eq('id', metric.id);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao atualizar métrica", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Métrica atualizada com sucesso" });
      setEditingMetric(null);
      refetch();
    }
  };

  const handleDeleteMetric = async (id: string) => {
    const { error } = await supabase
      .from('project_metrics')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao deletar métrica", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Métrica deletada com sucesso" });
      refetch();
    }
  };

  const renderChangeIcon = (changeType: string | null) => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Metric */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Nova Métrica
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              value={newMetric.project_id}
              onValueChange={(value) => setNewMetric({ ...newMetric, project_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um projeto" />
              </SelectTrigger>
              <SelectContent>
                {allProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.serviceName} - {project.subServiceName} - {project.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Label da métrica (ex: Conversões)"
              value={newMetric.label}
              onChange={(e) => setNewMetric({ ...newMetric, label: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Valor (ex: 150)"
              value={newMetric.value}
              onChange={(e) => setNewMetric({ ...newMetric, value: e.target.value })}
            />
            <Input
              placeholder="% de mudança (opcional)"
              value={newMetric.change_percentage}
              onChange={(e) => setNewMetric({ ...newMetric, change_percentage: e.target.value })}
            />
            <Select
              value={newMetric.change_type}
              onValueChange={(value) => setNewMetric({ ...newMetric, change_type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de mudança" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="positive">Positiva</SelectItem>
                <SelectItem value="negative">Negativa</SelectItem>
                <SelectItem value="neutral">Neutra</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              placeholder="Ordem de exibição"
              value={newMetric.display_order}
              onChange={(e) => setNewMetric({ ...newMetric, display_order: parseInt(e.target.value) || 0 })}
              className="w-32"
            />
            <Button onClick={handleAddMetric}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Métrica
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Metrics List */}
      <div className="space-y-4">
        {allProjects.map((project) => {
          const metrics = project.metrics || [];
          if (metrics.length === 0) return null;
          
          return (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {project.title}
                  <Badge variant="outline">{project.serviceName} - {project.subServiceName}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics.map((metric) => (
                    <div key={metric.id} className="border rounded-lg p-4">
                      {editingMetric?.id === metric.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              placeholder="Label"
                              value={editingMetric.label}
                              onChange={(e) => setEditingMetric({ ...editingMetric, label: e.target.value })}
                            />
                            <Input
                              placeholder="Valor"
                              value={editingMetric.value}
                              onChange={(e) => setEditingMetric({ ...editingMetric, value: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input
                              placeholder="% de mudança"
                              value={editingMetric.change_percentage || ""}
                              onChange={(e) => setEditingMetric({ ...editingMetric, change_percentage: e.target.value })}
                            />
                            <Select
                              value={editingMetric.change_type || "neutral"}
                              onValueChange={(value) => setEditingMetric({ ...editingMetric, change_type: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="positive">Positiva</SelectItem>
                                <SelectItem value="negative">Negativa</SelectItem>
                                <SelectItem value="neutral">Neutra</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              type="number"
                              placeholder="Ordem"
                              value={editingMetric.display_order}
                              onChange={(e) => setEditingMetric({ ...editingMetric, display_order: parseInt(e.target.value) || 0 })}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleUpdateMetric(editingMetric)}>
                              <Save className="h-4 w-4 mr-2" />
                              Salvar
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingMetric(null)}>
                              <X className="h-4 w-4 mr-2" />
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-medium">{metric.label}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold">{metric.value}</span>
                                {metric.change_percentage && (
                                  <div className="flex items-center gap-1">
                                    {renderChangeIcon(metric.change_type)}
                                    <span className={`text-sm font-medium ${
                                      metric.change_type === 'positive' ? 'text-green-500' :
                                      metric.change_type === 'negative' ? 'text-red-500' : 'text-gray-500'
                                    }`}>
                                      {metric.change_percentage}%
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingMetric(metric)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteMetric(metric.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectMetricsAdmin;