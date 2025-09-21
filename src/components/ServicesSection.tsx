import { useState } from "react";
import { Play, Eye, TrendingUp, Palette, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useServices } from "@/hooks/useServices";
import { Link } from "react-router-dom";
import MediaRenderer from "@/components/MediaRenderer";
import audiovisualImg from "@/assets/audiovisual-service.jpg";
import marketingImg from "@/assets/marketing-service.jpg";
import designImg from "@/assets/design-service.jpg";

const services = [
  {
    id: "audiovisual",
    title: "Audiovisual",
    icon: Play,
    description: "Transformamos momentos em memórias inesquecíveis",
    subServices: [
      {
        id: "videos-festivos",
        title: "Vídeos Festivos",
        projects: [
          {
            title: "Aniversário Bernardo",
            thumbnail: audiovisualImg,
            type: "video",
            feedback: {
              text: "Amei o vídeo, ficou surpreendente!",
              author: "Juliana"
            }
          },
          {
            title: "Casamento Sarah & João",
            thumbnail: audiovisualImg,
            type: "video",
            feedback: {
              text: "Capturaram cada emoção de forma única!",
              author: "Sarah"
            }
          }
        ]
      },
      {
        id: "videos-corporativos",
        title: "Vídeos Corporativos/Pessoais",
        projects: [
          {
            title: "Institucional TechCorp",
            thumbnail: audiovisualImg,
            type: "video",
            feedback: {
              text: "Profissionalismo e qualidade impressionantes!",
              author: "Carlos Silva"
            }
          },
          {
            title: "Apresentação Pessoal CEO",
            thumbnail: audiovisualImg,
            type: "video",
            feedback: {
              text: "Resultado muito além das expectativas!",
              author: "Marina Costa"
            }
          }
        ]
      },
      {
        id: "filmagens-drone",
        title: "Filmagens com Drone",
        projects: [
          {
            title: "Loteamento Vista Verde",
            thumbnail: audiovisualImg,
            type: "video",
            feedback: {
              text: "Imagens aéreas espetaculares do nosso empreendimento!",
              author: "Roberto Mendes"
            }
          }
        ]
      },
      {
        id: "tour-360",
        title: "Tour Virtual 360º",
        projects: [
          {
            title: "Tour Virtual Imobiliária Premium",
            thumbnail: audiovisualImg,
            type: "360",
            feedback: {
              text: "Tecnologia incrível, nossos clientes adoraram!",
              author: "Ana Imóveis"
            }
          }
        ]
      },
      {
        id: "sites-convite",
        title: "Sites Convite",
        projects: [
          {
            title: "Convite Digital Casamento",
            thumbnail: audiovisualImg,
            type: "website",
            feedback: {
              text: "Convite digital mais lindo que já vi!",
              author: "Casal Rodrigues"
            }
          }
        ]
      }
    ]
  },
  {
    id: "marketing",
    title: "Marketing & Tráfego",
    icon: TrendingUp,
    description: "Resultados reais através de estratégias digitais",
    subServices: [
      {
        id: "trafego-pago",
        title: "Tráfego Pago",
        projects: [
          {
            title: "Campanha Poços Artesianos",
            thumbnail: marketingImg,
            type: "case",
            metrics: [
              { label: "Leads gerados", value: "247", increase: "+340%" },
              { label: "Custo por lead", value: "R$ 12,50", decrease: "-65%" },
              { label: "ROAS", value: "4.2x", increase: "+180%" }
            ],
            feedback: {
              text: "Em apenas 1 mês, triplicamos nossos leads com um custo muito menor!",
              author: "Marcus Silva"
            }
          },
          {
            title: "E-commerce Fashion",
            thumbnail: marketingImg,
            type: "case",
            metrics: [
              { label: "Vendas online", value: "R$ 85k", increase: "+220%" },
              { label: "CTR médio", value: "3.8%", increase: "+150%" },
              { label: "Conversões", value: "1.247", increase: "+190%" }
            ],
            feedback: {
              text: "A Nexus transformou nosso e-commerce, vendas dispararam!",
              author: "Luana Fashion"
            }
          }
        ]
      }
    ]
  },
  {
    id: "design",
    title: "Design & Web",
    icon: Palette,
    description: "Identidades visuais que conectam e convertem",
    subServices: [
      {
        id: "design-grafico",
        title: "Design Gráfico",
        projects: [
          {
            title: "Identidade Visual Café Premium",
            thumbnail: designImg,
            type: "brand",
            feedback: {
              text: "Logo perfeita, representa exatamente nossa essência!",
              author: "Café Premium"
            }
          },
          {
            title: "Material Gráfico Clínica",
            thumbnail: designImg,
            type: "print",
            feedback: {
              text: "Design elegante que transmite confiança aos pacientes!",
              author: "Dr. Santos"
            }
          }
        ]
      },
      {
        id: "criacao-sites",
        title: "Criação de Sites e Landing Pages",
        projects: [
          {
            title: "Site Advocacia Santos",
            thumbnail: designImg,
            type: "website",
            feedback: {
              text: "Site aumentou nossas conversões em 200%!",
              author: "Ana Santos"
            }
          },
          {
            title: "Landing Page SaaS",
            thumbnail: designImg,
            type: "landing",
            feedback: {
              text: "Landing page converteu 5x mais que a anterior!",
              author: "Tech Startup"
            }
          }
        ]
      }
    ]
  }
];

interface ServicesSectionProps {
  activeService?: string;
}

export default function ServicesSection({ activeService }: ServicesSectionProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const { data: services, isLoading, error } = useServices();

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'Play': return Play;
      case 'TrendingUp': return TrendingUp;
      case 'Palette': return Palette;
      default: return Play;
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-dark-bg to-darker-bg">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-surface rounded-lg mx-auto mb-4 max-w-md"></div>
              <div className="h-6 bg-surface rounded-lg mx-auto max-w-lg"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !services) {
    return (
      <section className="py-20 bg-gradient-to-b from-dark-bg to-darker-bg">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-text-secondary">Erro ao carregar serviços.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-dark-bg to-darker-bg">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black font-primary gradient-text mb-6">
            O QUE FAZEMOS
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Dividimos nossa expertise em 3 pilares fundamentais para transformar sua presença digital
          </p>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary-blue to-accent-cyan mt-8"></div>
        </div>

        {/* Services */}
        <div className="space-y-32">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);
            const isActive = activeService === service.id;
            
            return (
              <div 
                key={service.id} 
                id={service.id}
                className={`${isActive ? 'animate-glow-pulse' : ''}`}
              >
                {/* Service Header */}
                <div className="flex items-center gap-6 mb-16">
                  <div className="p-4 bg-surface border border-neon-green/30 rounded-xl tech-glow">
                    <Icon className="w-8 h-8 text-neon-green" />
                  </div>
                  <div>
                    <h3 className="text-4xl md:text-5xl font-bold text-foreground neon-text">
                      {service.title}
                    </h3>
                    <p className="text-xl text-text-secondary mt-2">{service.description}</p>
                  </div>
                </div>

                {/* Sub-services */}
                <div className="space-y-8">
                  {service.sub_services.map((subService, subIndex) => (
                    <div key={subService.id} className="ml-4 md:ml-8">
                      <Collapsible 
                        open={openSections[subService.id]} 
                        onOpenChange={() => toggleSection(subService.id)}
                      >
                        <CollapsibleTrigger className="w-full">
            <div className="flex items-center gap-4 mb-4 group hover:bg-neon-green/5 p-4 rounded-lg transition-all duration-300">
              {openSections[subService.id] ? (
                <ChevronDown className="w-6 h-6 text-neon-green transition-transform duration-300" />
              ) : (
                <ChevronRight className="w-6 h-6 text-neon-green transition-transform duration-300" />
              )}
              <h4 className="text-xl md:text-2xl font-bold text-neon-green text-left group-hover:text-accent-cyan transition-colors duration-300">
                {subService.title}
              </h4>
            </div>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="ml-4 md:ml-8">
                          {/* Projects */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {subService.projects.map((project, projectIndex) => (
                              <Card key={project.id} className="surface-card overflow-hidden hover:border-primary-blue/50 transition-all duration-300 group">
                              {/* Project Thumbnail */}
                              <div className="relative cursor-pointer h-48">
                                <MediaRenderer
                                  mediaUrl={project.thumbnail_url || audiovisualImg}
                                  videoUrl={project.video_url}
                                  title={project.title}
                                  className="group-hover:scale-105 transition-transform duration-300"
                                  showPreview={true}
                                />
                                  
                                  {/* Project Title Overlay */}
                                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent">
                                    <h5 className="text-lg font-semibold text-foreground">{project.title}</h5>
                                  </div>
                                </div>

                                <div className="p-4 md:p-6">
                                  {/* Metrics for Marketing cases */}
                                  {project.project_type === 'case' && project.metrics && project.metrics.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                      {project.metrics.map((metric, metricIndex) => (
                                        <div key={metricIndex} className="text-center">
                                          <div className="text-lg font-bold text-foreground">{metric.value}</div>
                                          <div className="text-xs text-text-muted">{metric.label}</div>
                                          {metric.change_percentage && metric.change_type === 'increase' && (
                                            <div className="text-xs text-neon-green font-medium">{metric.change_percentage}</div>
                                          )}
                                          {metric.change_percentage && metric.change_type === 'decrease' && (
                                            <div className="text-xs text-accent-cyan font-medium">{metric.change_percentage}</div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* See All Work Button */}
                                  <Link to={`/project/${project.id}/gallery`}>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="w-full mb-4 border-neon-green/30 text-neon-green hover:bg-neon-green hover:text-dark-bg"
                                    >
                                      Ver todo trabalho
                                    </Button>
                                  </Link>

                                  {/* Feedback */}
                                  {project.feedback && (
                                    <div className="border-t border-neon-green/20 pt-4">
                                      <p className="text-sm text-text-secondary italic mb-2">
                                        "{project.feedback.feedback_text}"
                                      </p>
                                      <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-gradient-to-r from-neon-green to-accent-cyan rounded-full flex items-center justify-center">
                                          <span className="text-xs text-dark-bg font-bold">
                                            {project.feedback.author_name.charAt(0)}
                                          </span>
                                        </div>
                                        <span className="text-sm font-medium text-neon-green">
                                          {project.feedback.author_name}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </Card>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}