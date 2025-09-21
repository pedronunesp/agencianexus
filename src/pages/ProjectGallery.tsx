import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MediaRenderer from "@/components/MediaRenderer";
import { useProjectGallery } from "@/hooks/useProjectGallery";

export default function ProjectGallery() {
  const { projectId } = useParams();
  const { data: galleryItems = [], isLoading } = useProjectGallery(projectId!);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-neon-green">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary">
      {/* Header */}
      <div className="border-b border-neon-green/20 bg-card-bg/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-neon-green mb-2">
            Galeria do Projeto
          </h1>
          <p className="text-text-secondary">
            Explore todos os trabalhos relacionados a este projeto
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div className="container mx-auto px-4 py-12">
        {galleryItems.length === 0 ? (
          <Card className="text-center py-12 bg-card-bg/50 border-neon-green/20">
            <p className="text-text-secondary">
              Nenhum trabalho encontrado para este projeto.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <Card key={item.id} className="bg-card-bg/50 border-neon-green/20 overflow-hidden">
                <div className="aspect-video">
                  <MediaRenderer
                    mediaUrl={item.media_url}
                    videoUrl={item.media_type === 'video' ? item.media_url : undefined}
                    title={item.title}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-neon-green mb-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-text-secondary text-sm">
                      {item.description}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}