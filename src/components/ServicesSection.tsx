import { Play, Eye, TrendingUp, Palette } from "lucide-react";
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
    image: audiovisualImg,
    description: "Transformamos momentos em memórias inesquecíveis",
    services: [
      "Vídeos festivos",
      "Vídeos corporativos/pessoais", 
      "Filmagens com drone",
      "Tour virtual 360º",
      "Sites convite"
    ],
    portfolioItems: [
      { type: "video", title: "Casamento Sarah & João", thumbnail: audiovisualImg },
      { type: "video", title: "Institucional TechCorp", thumbnail: audiovisualImg },
      { type: "drone", title: "Loteamento Vista Verde", thumbnail: audiovisualImg },
      { type: "360", title: "Tour Virtual Imobiliária", thumbnail: audiovisualImg }
    ],
    testimonial: {
      text: "A Nexus capturou cada emoção do nosso casamento de forma única. O resultado superou todas as expectativas!",
      author: "Sarah & João",
      role: "Clientes"
    }
  },
  {
    id: "marketing",
    title: "Marketing & Tráfego",
    icon: TrendingUp,
    image: marketingImg,
    description: "Resultados reais através de estratégias digitais",
    services: [
      "Tráfego pago Google Ads",
      "Meta Ads (Facebook/Instagram)",
      "Análise de conversão",
      "Otimização de campanhas"
    ],
    case: {
      title: "Poço Artesiano - Resultados em 30 dias",
      metrics: [
        { label: "Leads gerados", value: "247", increase: "+340%" },
        { label: "Custo por lead", value: "R$ 12,50", decrease: "-65%" },
        { label: "ROAS", value: "4.2x", increase: "+180%" }
      ]
    },
    testimonial: {
      text: "Em apenas 1 mês, triplicamos nossos leads com um custo muito menor. A Nexus entende de resultados!",
      author: "Marcus Silva",
      role: "Poços Artesianos Silva"
    }
  },
  {
    id: "design",
    title: "Design & Web",
    icon: Palette,
    image: designImg,
    description: "Identidades visuais que conectam e convertem",
    services: [
      "Design gráfico",
      "Criação de sites",
      "Landing pages",
      "Identidade visual"
    ],
    portfolioItems: [
      { type: "website", title: "Site Advocacia Santos", thumbnail: designImg },
      { type: "brand", title: "Identidade Visual Café Premium", thumbnail: designImg },
      { type: "landing", title: "Landing Page SaaS", thumbnail: designImg }
    ],
    testimonial: {
      text: "O site criado pela Nexus aumentou nossas conversões em 200%. Design impecável e funcionalidade perfeita!",
      author: "Ana Santos",
      role: "Advocacia Santos"
    }
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

        {/* Services Grid */}
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
                <div className="flex items-center gap-6 mb-12">
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

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Left: Image + Services */}
                  <div>
                    <div className="relative group mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-neon-blue/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                      <img 
                        src={service.image}
                        alt={service.title}
                        className="relative w-full h-64 object-cover rounded-xl border border-neon-green/30"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent rounded-xl"></div>
                    </div>

                    {/* Services List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.services.map((item) => (
                        <div 
                          key={item}
                          className="p-3 bg-card-bg/50 rounded-lg border border-neon-green/20 hover:border-neon-green/50 transition-all duration-300 group"
                        >
                          <span className="text-foreground/90 group-hover:text-neon-green transition-colors">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Portfolio/Case */}
                  <div>
                    {/* Marketing Case */}
                    {service.id === 'marketing' && service.case && (
                      <Card className="p-8 bg-card-bg border border-neon-green/30 mb-8">
                        <h4 className="text-2xl font-bold text-neon-green mb-6">{service.case.title}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          {service.case.metrics.map((metric) => (
                            <div key={metric.label} className="text-center">
                              <div className="text-3xl font-black text-foreground mb-2">{metric.value}</div>
                              <div className="text-sm text-foreground/70 mb-1">{metric.label}</div>
                              {metric.increase && (
                                <div className="text-xs text-neon-green font-medium">{metric.increase}</div>
                              )}
                              {metric.decrease && (
                                <div className="text-xs text-neon-blue font-medium">{metric.decrease}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}

                    {/* Portfolio Grid */}
                    {service.portfolioItems && (
                      <div className="mb-8">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {service.portfolioItems.slice(0, 4).map((item, idx) => (
                            <div key={idx} className="group cursor-pointer">
                              <div className="relative overflow-hidden rounded-lg border border-neon-green/20 hover:border-neon-green/60 transition-all duration-300">
                                <img 
                                  src={item.thumbnail}
                                  alt={item.title}
                                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-dark-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                  <Eye className="w-6 h-6 text-neon-green" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-dark-bg to-transparent">
                                  <div className="text-sm text-foreground font-medium">{item.title}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full border-neon-green/50 text-neon-green hover:bg-neon-green hover:text-darker-bg"
                        >
                          Ver todo portfólio
                        </Button>
                      </div>
                    )}

                    {/* Testimonial */}
                    <Card className="p-6 bg-card-bg/50 border border-neon-green/20">
                      <div className="text-lg text-foreground/90 mb-4 italic">
                        "{service.testimonial.text}"
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-neon-green to-neon-blue rounded-full flex items-center justify-center">
                          <span className="text-darker-bg font-bold">
                            {service.testimonial.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-neon-green">{service.testimonial.author}</div>
                          <div className="text-sm text-foreground/70">{service.testimonial.role}</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}