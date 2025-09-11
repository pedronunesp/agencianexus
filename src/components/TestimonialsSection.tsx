import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah & João",
    role: "Casamento",
    company: "Particular",
    content: "A Nexus capturou cada emoção do nosso casamento de forma única. O resultado superou todas as expectativas! O vídeo ficou cinematográfico.",
    rating: 5,
    service: "Vídeo Festivo"
  },
  {
    id: 2,
    name: "Marcus Silva",
    role: "CEO",
    company: "Poços Artesianos Silva",
    content: "Em apenas 1 mês, triplicamos nossos leads com um custo muito menor. A Nexus entende de resultados! ROI impressionante.",
    rating: 5,
    service: "Tráfego Pago"
  },
  {
    id: 3,
    name: "Ana Santos",
    role: "Advogada",
    company: "Advocacia Santos",
    content: "O site criado pela Nexus aumentou nossas conversões em 200%. Design impecável e funcionalidade perfeita! Recomendo para todos.",
    rating: 5,
    service: "Design & Web"
  },
  {
    id: 4,
    name: "Roberto Lima",
    role: "Diretor",
    company: "TechCorp",
    content: "O vídeo institucional da Nexus elevou nossa marca a outro patamar. Profissionalismo e criatividade em cada detalhe.",
    rating: 5,
    service: "Vídeo Corporativo"
  },
  {
    id: 5,
    name: "Carla Mendes",
    role: "Corretora",
    company: "Imobiliária Vista",
    content: "Os tours virtuais 360º revolucionaram nossa forma de vender. Clientes se encantam antes mesmo de visitar o imóvel!",
    rating: 5,
    service: "Tour Virtual 360º"
  },
  {
    id: 6,
    name: "Felipe Costa",
    role: "Empreendedor",
    company: "StartupX",
    content: "A landing page criada pela Nexus converteu 3x mais que a anterior. Investimento que se pagou em dias!",
    rating: 5,
    service: "Landing Page"
  }
];

const clientLogos = [
  "TechCorp", "Advocacia Santos", "StartupX", "Imobiliária Vista", "Poços Silva", "Café Premium"
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-darker-bg to-dark-bg">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black font-cyber gradient-text mb-6">
            DEPOIMENTOS
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Histórias reais de clientes que transformaram seus negócios conosco
          </p>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-neon-green to-neon-blue mt-8"></div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="p-8 bg-card-bg/80 backdrop-blur-sm border border-neon-green/30 hover:border-neon-green/60 transition-all duration-300 cyber-glow">
                    {/* Rating */}
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-neon-green fill-current" />
                      ))}
                    </div>

                    {/* Content */}
                    <blockquote className="text-xl text-foreground/90 text-center mb-8 italic leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Author */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-neon-green to-neon-blue rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-darker-bg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div className="font-semibold text-neon-green text-lg">{testimonial.name}</div>
                      <div className="text-foreground/70">{testimonial.role} • {testimonial.company}</div>
                      <div className="text-sm text-neon-blue mt-2 font-medium">{testimonial.service}</div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-card-bg/80 border-neon-green/50 text-neon-green hover:bg-neon-green hover:text-darker-bg"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-card-bg/80 border-neon-green/50 text-neon-green hover:bg-neon-green hover:text-darker-bg"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-neon-green shadow-lg shadow-neon-green/50' 
                    : 'bg-foreground/30 hover:bg-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Client Logos */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground/80 mb-8">
            Clientes que confiam na Nexus
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {clientLogos.map((logo, index) => (
              <div 
                key={logo}
                className="px-6 py-3 bg-card-bg/30 rounded-lg border border-neon-green/20 hover:border-neon-green/40 transition-all duration-300 hover:opacity-100"
              >
                <span className="text-foreground/70 font-medium">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}