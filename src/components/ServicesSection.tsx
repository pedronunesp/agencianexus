import { Play, Eye, TrendingUp, Palette, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  return (
    <section className="py-20 bg-gradient-to-b from-dark-bg to-darker-bg">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black font-cyber gradient-text mb-6">
            O QUE FAZEMOS
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Dividimos nossa expertise em 3 pilares fundamentais para transformar sua presença digital
          </p>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-neon-green to-neon-blue mt-8"></div>
        </div>

        {/* Services */}
        <div className="space-y-32">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeService === service.id;
            
            return (
              <div 
                key={service.id} 
                id={service.id}
                className={`${isActive ? 'animate-glow-pulse' : ''}`}
              >
                {/* Service Header */}
                <div className="flex items-center gap-6 mb-16">
                  <div className="p-4 bg-card-bg border border-neon-green/30 rounded-xl cyber-glow">
                    <Icon className="w-8 h-8 text-neon-green" />
                  </div>
                  <div>
                    <h3 className="text-4xl md:text-5xl font-bold text-foreground neon-text">
                      {service.title}
                    </h3>
                    <p className="text-xl text-foreground/70 mt-2">{service.description}</p>
                  </div>
                </div>

                {/* Sub-services */}
                <div className="space-y-20">
                  {service.subServices.map((subService, subIndex) => (
                    <div key={subService.id} className="ml-8">
                      {/* Sub-service Title */}
                      <div className="flex items-center gap-4 mb-8">
                        <ChevronRight className="w-6 h-6 text-neon-green" />
                        <h4 className="text-2xl md:text-3xl font-bold text-neon-green">
                          {subService.title}
                        </h4>
                      </div>

                      {/* Projects */}
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ml-8">
                        {subService.projects.map((project, projectIndex) => (
                          <Card key={projectIndex} className="bg-card-bg border border-neon-green/20 overflow-hidden hover:border-neon-green/50 transition-all duration-300 group">
                            {/* Project Thumbnail */}
                            <div className="relative cursor-pointer">
                              <img 
                                src={project.thumbnail}
                                alt={project.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              
                              {/* Play Overlay */}
                              <div className="absolute inset-0 bg-dark-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="w-16 h-16 bg-neon-green/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                  <Play className="w-8 h-8 text-neon-green ml-1" />
                                </div>
                              </div>
                              
                              {/* Project Title Overlay */}
                              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent">
                                <h5 className="text-lg font-semibold text-foreground">{project.title}</h5>
                              </div>
                            </div>

                            <div className="p-6">
                              {/* Metrics for Marketing cases */}
                              {project.type === 'case' && project.metrics && (
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                  {project.metrics.map((metric, metricIndex) => (
                                    <div key={metricIndex} className="text-center">
                                      <div className="text-lg font-bold text-foreground">{metric.value}</div>
                                      <div className="text-xs text-foreground/70">{metric.label}</div>
                                      {metric.increase && (
                                        <div className="text-xs text-neon-green font-medium">{metric.increase}</div>
                                      )}
                                      {metric.decrease && (
                                        <div className="text-xs text-neon-blue font-medium">{metric.decrease}</div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* See All Work Button */}
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="w-full mb-4 border-neon-green/30 text-neon-green hover:bg-neon-green hover:text-darker-bg"
                              >
                                Ver todo trabalho
                              </Button>

                              {/* Feedback */}
                              <div className="border-t border-neon-green/20 pt-4">
                                <p className="text-sm text-foreground/80 italic mb-2">
                                  "{project.feedback.text}"
                                </p>
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-gradient-to-r from-neon-green to-neon-blue rounded-full flex items-center justify-center">
                                    <span className="text-xs text-darker-bg font-bold">
                                      {project.feedback.author.charAt(0)}
                                    </span>
                                  </div>
                                  <span className="text-sm font-medium text-neon-green">
                                    {project.feedback.author}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
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