import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const services = [
  "Vídeos festivos",
  "Vídeos corporativos/pessoais", 
  "Filmagens com drone",
  "Tour virtual 360º",
  "Sites convite",
  "Tráfego pago",
  "Design gráfico",
  "Criação de sites e landing pages"
];

export default function CTASection() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio (aqui você integraria com seu backend/API)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Preparar mensagem para WhatsApp
    const whatsappMessage = `Olá! Gostaria de solicitar um orçamento:

*Nome:* ${formData.name}
*Email:* ${formData.email}
*Telefone:* ${formData.phone}

*Serviços de interesse:*
${selectedServices.map(service => `• ${service}`).join('\n')}

*Mensagem:*
${formData.message}`;

    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Solicitação enviada!",
      description: "Você será redirecionado para o WhatsApp para finalizar o contato.",
    });

    setIsSubmitting(false);
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
    setSelectedServices([]);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-dark-bg to-darker-bg relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,255,120,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(100,200,255,0.3),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black font-cyber gradient-text mb-6">
            TRANSFORME SUA IDEIA
          </h2>
          <p className="text-2xl md:text-3xl text-foreground/90 mb-4">
            Quer transformar sua ideia em resultado?
          </p>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Conte-nos sobre seu projeto e receba um orçamento personalizado em até 24 horas
          </p>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-neon-green to-neon-blue mt-8"></div>
        </div>

        {/* CTA Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-card-bg/80 backdrop-blur-sm border border-neon-green/30 cyber-glow">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Services Selection */}
              <div>
                <h3 className="text-2xl font-bold text-neon-green mb-6">
                  Selecione os serviços de interesse:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                        selectedServices.includes(service)
                          ? 'border-neon-green bg-neon-green/10 text-neon-green'
                          : 'border-neon-green/30 bg-card-bg/50 text-foreground/80 hover:border-neon-green/60 hover:text-neon-green'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{service}</span>
                        {selectedServices.includes(service) && (
                          <CheckCircle className="w-5 h-5" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-foreground/90 font-medium mb-2">
                    Nome completo *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-darker-bg/50 border-neon-green/30 text-foreground focus:border-neon-green"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-foreground/90 font-medium mb-2">
                    E-mail *
                  </label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-darker-bg/50 border-neon-green/30 text-foreground focus:border-neon-green"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-foreground/90 font-medium mb-2">
                    WhatsApp *
                  </label>
                  <Input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-darker-bg/50 border-neon-green/30 text-foreground focus:border-neon-green"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-foreground/90 font-medium mb-2">
                    Conte-nos sobre seu projeto
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="bg-darker-bg/50 border-neon-green/30 text-foreground focus:border-neon-green min-h-[120px]"
                    placeholder="Descreva seu projeto, objetivos, prazos e qualquer informação relevante..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || selectedServices.length === 0 || !formData.name || !formData.email || !formData.phone}
                  className="px-12 py-4 bg-neon-green text-darker-bg hover:bg-neon-green-glow font-bold text-lg cyber-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-darker-bg/30 border-t-darker-bg rounded-full animate-spin"></div>
                      Enviando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Solicitar Orçamento Agora
                    </div>
                  )}
                </Button>
                
                <p className="text-sm text-foreground/60 mt-4">
                  * Campos obrigatórios • Resposta garantida em até 24h
                </p>
              </div>
            </form>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
          <div className="p-6">
            <div className="text-4xl font-black text-neon-green mb-2">+200</div>
            <div className="text-foreground/80">Projetos Entregues</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-black text-neon-blue mb-2">24h</div>
            <div className="text-foreground/80">Resposta Garantida</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-black text-neon-purple mb-2">100%</div>
            <div className="text-foreground/80">Satisfação do Cliente</div>
          </div>
        </div>
      </div>
    </section>
  );
}