import { useState } from "react";
import { useAllTestimonials } from "@/hooks/useTestimonials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Testimonial } from "@/hooks/useTestimonials";

const TestimonialsAdmin = () => {
  const { data: testimonials, refetch } = useAllTestimonials();
  const { toast } = useToast();
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    service: "",
    display_order: 0
  });

  const handleAddTestimonial = async () => {
    if (!newTestimonial.name || !newTestimonial.content) return;
    
    const { error } = await supabase
      .from('testimonials')
      .insert([newTestimonial]);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao adicionar depoimento", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Depoimento adicionado com sucesso" });
      setNewTestimonial({
        name: "",
        role: "",
        company: "",
        content: "",
        rating: 5,
        service: "",
        display_order: 0
      });
      refetch();
    }
  };

  const handleUpdateTestimonial = async (testimonial: Testimonial) => {
    const { error } = await supabase
      .from('testimonials')
      .update({
        name: testimonial.name,
        role: testimonial.role,
        company: testimonial.company,
        content: testimonial.content,
        rating: testimonial.rating,
        service: testimonial.service,
        display_order: testimonial.display_order,
        is_visible: testimonial.is_visible
      })
      .eq('id', testimonial.id);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao atualizar depoimento", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Depoimento atualizado com sucesso" });
      setEditingTestimonial(null);
      refetch();
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao deletar depoimento", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Depoimento deletado com sucesso" });
      refetch();
    }
  };

  const handleToggleVisibility = async (id: string, isVisible: boolean) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ is_visible: !isVisible })
      .eq('id', id);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao alterar visibilidade", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Visibilidade alterada com sucesso" });
      refetch();
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Add New Testimonial */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Novo Depoimento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Nome do cliente"
              value={newTestimonial.name}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
            />
            <Input
              placeholder="Cargo"
              value={newTestimonial.role}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
            />
            <Input
              placeholder="Empresa"
              value={newTestimonial.company}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
            />
          </div>
          <Textarea
            placeholder="Conteúdo do depoimento"
            value={newTestimonial.content}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              value={newTestimonial.rating.toString()}
              onValueChange={(value) => setNewTestimonial({ ...newTestimonial, rating: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Avaliação" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    <div className="flex items-center gap-2">
                      {num} <div className="flex">{renderStars(num)}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Serviço relacionado"
              value={newTestimonial.service}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, service: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Ordem de exibição"
              value={newTestimonial.display_order}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, display_order: parseInt(e.target.value) || 0 })}
            />
          </div>
          <Button onClick={handleAddTestimonial}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Depoimento
          </Button>
        </CardContent>
      </Card>

      {/* Testimonials List */}
      <div className="space-y-4">
        {testimonials?.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle>{testimonial.name}</CardTitle>
                  <Badge variant={testimonial.is_visible ? "default" : "secondary"}>
                    {testimonial.is_visible ? "Visível" : "Oculto"}
                  </Badge>
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleVisibility(testimonial.id, testimonial.is_visible)}
                  >
                    {testimonial.is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingTestimonial(testimonial)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {editingTestimonial?.id === testimonial.id && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Nome"
                    value={editingTestimonial.name}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                  />
                  <Input
                    placeholder="Cargo"
                    value={editingTestimonial.role}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                  />
                  <Input
                    placeholder="Empresa"
                    value={editingTestimonial.company}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                  />
                </div>
                <Textarea
                  placeholder="Conteúdo"
                  value={editingTestimonial.content}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })}
                />
                <div className="flex items-center gap-4">
                  <Select
                    value={editingTestimonial.rating.toString()}
                    onValueChange={(value) => setEditingTestimonial({ ...editingTestimonial, rating: parseInt(value) })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} ⭐
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Serviço"
                    value={editingTestimonial.service}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, service: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Ordem"
                    value={editingTestimonial.display_order}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, display_order: parseInt(e.target.value) || 0 })}
                    className="w-32"
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={editingTestimonial.is_visible}
                      onCheckedChange={(checked) => setEditingTestimonial({ ...editingTestimonial, is_visible: checked })}
                    />
                    <Label>Visível</Label>
                  </div>
                  <Button onClick={() => handleUpdateTestimonial(editingTestimonial)}>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={() => setEditingTestimonial(null)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            )}
            <CardContent>
              <p className="text-muted-foreground mb-2">"{testimonial.content}"</p>
              <div className="flex items-center justify-between text-sm">
                <span>{testimonial.role} na {testimonial.company}</span>
                <Badge variant="outline">{testimonial.service}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsAdmin;