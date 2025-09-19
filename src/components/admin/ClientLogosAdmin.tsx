import { useState } from "react";
import { useClientLogos } from "@/hooks/useClientLogos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ClientLogo } from "@/hooks/useClientLogos";

const ClientLogosAdmin = () => {
  const { data: clientLogos, refetch } = useClientLogos();
  const { toast } = useToast();
  const [editingLogo, setEditingLogo] = useState<ClientLogo | null>(null);
  const [newLogo, setNewLogo] = useState({
    name: "",
    logo_url: "",
    display_order: 0
  });

  const handleAddLogo = async () => {
    if (!newLogo.name || !newLogo.logo_url) return;
    
    const { error } = await supabase
      .from('client_logos')
      .insert([newLogo]);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao adicionar logo", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Logo adicionado com sucesso" });
      setNewLogo({
        name: "",
        logo_url: "",
        display_order: 0
      });
      refetch();
    }
  };

  const handleUpdateLogo = async (logo: ClientLogo) => {
    const { error } = await supabase
      .from('client_logos')
      .update({
        name: logo.name,
        logo_url: logo.logo_url,
        display_order: logo.display_order,
        is_visible: logo.is_visible
      })
      .eq('id', logo.id);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao atualizar logo", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Logo atualizado com sucesso" });
      setEditingLogo(null);
      refetch();
    }
  };

  const handleDeleteLogo = async (id: string) => {
    const { error } = await supabase
      .from('client_logos')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: "Erro", description: "Erro ao deletar logo", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Logo deletado com sucesso" });
      refetch();
    }
  };

  const handleToggleVisibility = async (id: string, isVisible: boolean) => {
    const { error } = await supabase
      .from('client_logos')
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
      {/* Add New Logo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Novo Logo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Nome do cliente"
              value={newLogo.name}
              onChange={(e) => setNewLogo({ ...newLogo, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Ordem de exibição"
              value={newLogo.display_order}
              onChange={(e) => setNewLogo({ ...newLogo, display_order: parseInt(e.target.value) || 0 })}
            />
          </div>
          <Input
            placeholder="URL do logo (ex: https://exemplo.com/logo.png)"
            value={newLogo.logo_url}
            onChange={(e) => setNewLogo({ ...newLogo, logo_url: e.target.value })}
          />
          {newLogo.logo_url && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Preview:</span>
              <img 
                src={newLogo.logo_url} 
                alt="Preview" 
                className="h-12 w-auto object-contain bg-white rounded p-2"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
          <Button onClick={handleAddLogo}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Logo
          </Button>
        </CardContent>
      </Card>

      {/* Logos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientLogos?.map((logo) => (
          <Card key={logo.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{logo.name}</CardTitle>
                <Badge variant={logo.is_visible ? "default" : "secondary"}>
                  {logo.is_visible ? "Visível" : "Oculto"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {logo.logo_url && (
                <div className="flex justify-center">
                  <img 
                    src={logo.logo_url} 
                    alt={logo.name}
                    className="h-16 w-auto object-contain bg-white rounded p-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
              )}
              
              {editingLogo?.id === logo.id ? (
                <div className="space-y-4">
                  <Input
                    placeholder="Nome"
                    value={editingLogo.name}
                    onChange={(e) => setEditingLogo({ ...editingLogo, name: e.target.value })}
                  />
                  <Input
                    placeholder="URL do logo"
                    value={editingLogo.logo_url || ""}
                    onChange={(e) => setEditingLogo({ ...editingLogo, logo_url: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Ordem"
                    value={editingLogo.display_order}
                    onChange={(e) => setEditingLogo({ ...editingLogo, display_order: parseInt(e.target.value) || 0 })}
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={editingLogo.is_visible}
                      onCheckedChange={(checked) => setEditingLogo({ ...editingLogo, is_visible: checked })}
                    />
                    <Label>Visível</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleUpdateLogo(editingLogo)}>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingLogo(null)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Ordem: {logo.display_order}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleVisibility(logo.id, logo.is_visible)}
                    >
                      {logo.is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingLogo(logo)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteLogo(logo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {(!clientLogos || clientLogos.length === 0) && (
        <Card>
          <CardContent className="text-center py-8">
            <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nenhum logo cadastrado ainda</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientLogosAdmin;