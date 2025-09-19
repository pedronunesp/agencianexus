import { useState } from "react";
import { useServices } from "@/hooks/useServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Save, X, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProjectFeedback {
  id?: string;
  project_id: string;
  feedback_text: string;
  author_name: string;
}

const ProjectFeedbackAdmin = () => {
  const { data: services, refetch } = useServices();
  const { toast } = useToast();
  const [editingFeedback, setEditingFeedback] = useState<ProjectFeedback | null>(null);
  const [newFeedback, setNewFeedback] = useState({
    project_id: "",
    feedback_text: "",
    author_name: ""
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

  const handleAddFeedback = async () => {
    if (!newFeedback.project_id || !newFeedback.feedback_text || !newFeedback.author_name) return;
    
    const { error } = await supabase
      .from('project_feedback')
      .insert([newFeedback]);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao adicionar feedback", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Feedback adicionado com sucesso" });
      setNewFeedback({
        project_id: "",
        feedback_text: "",
        author_name: ""
      });
      refetch();
    }
  };

  const handleUpdateFeedback = async (feedback: ProjectFeedback) => {
    const { error } = await supabase
      .from('project_feedback')
      .update({
        feedback_text: feedback.feedback_text,
        author_name: feedback.author_name
      })
      .eq('id', feedback.id);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao atualizar feedback", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Feedback atualizado com sucesso" });
      setEditingFeedback(null);
      refetch();
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    const { error } = await supabase
      .from('project_feedback')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao deletar feedback", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Feedback deletado com sucesso" });
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Novo Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={newFeedback.project_id}
            onValueChange={(value) => setNewFeedback({ ...newFeedback, project_id: value })}
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
            placeholder="Nome do autor"
            value={newFeedback.author_name}
            onChange={(e) => setNewFeedback({ ...newFeedback, author_name: e.target.value })}
          />
          <Textarea
            placeholder="Texto do feedback"
            value={newFeedback.feedback_text}
            onChange={(e) => setNewFeedback({ ...newFeedback, feedback_text: e.target.value })}
            rows={4}
          />
          <Button onClick={handleAddFeedback}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Feedback
          </Button>
        </CardContent>
      </Card>

      {/* Feedback List */}
      <div className="space-y-4">
        {allProjects.map((project) => {
          if (!project.feedback) return null;
          
          return (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  {project.title}
                  <Badge variant="outline">{project.serviceName} - {project.subServiceName}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4">
                  {editingFeedback?.id === project.feedback.id ? (
                    <div className="space-y-4">
                      <Input
                        placeholder="Nome do autor"
                        value={editingFeedback.author_name}
                        onChange={(e) => setEditingFeedback({ ...editingFeedback, author_name: e.target.value })}
                      />
                      <Textarea
                        placeholder="Texto do feedback"
                        value={editingFeedback.feedback_text}
                        onChange={(e) => setEditingFeedback({ ...editingFeedback, feedback_text: e.target.value })}
                        rows={4}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleUpdateFeedback(editingFeedback)}>
                          <Save className="h-4 w-4 mr-2" />
                          Salvar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingFeedback(null)}>
                          <X className="h-4 w-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Por: {project.feedback.author_name}</p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingFeedback(project.feedback!)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteFeedback(project.feedback!.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                        "{project.feedback.feedback_text}"
                      </blockquote>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {allProjects.filter(p => p.feedback).length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nenhum feedback cadastrado ainda</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectFeedbackAdmin;