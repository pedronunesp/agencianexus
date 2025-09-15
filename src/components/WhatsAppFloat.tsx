import { useState } from "react";
import { MessageCircle, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleWhatsAppRedirect = () => {
    const servicesText = selectedServices.length > 0 
      ? selectedServices.join(', ')
      : 'Informações gerais';
    
    const message = `Olá! Tenho interesse em: ${servicesText}.`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setSelectedServices([]);
  };

  return (
    <>
      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-card-bg/90 backdrop-blur-sm border border-neon-green/30 animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neon-green/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neon-green/20 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neon-green">Conversar agora</h3>
                  <p className="text-sm text-text-secondary">Selecione seus interesses</p>
                </div>
              </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-text-muted hover:text-neon-green"
                >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Services Selection */}
            <div className="p-6">
              <div className="space-y-3 mb-6">
                {services.map((service) => (
                  <button
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`w-full p-3 rounded-lg border transition-all duration-300 text-left ${
                      selectedServices.includes(service)
                        ? 'border-neon-green bg-neon-green/10 text-neon-green'
                        : 'border-neon-green/30 bg-surface/50 text-text-secondary hover:border-neon-green/60 hover:text-neon-green'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{service}</span>
                      {selectedServices.includes(service) && (
                        <CheckCircle className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleWhatsAppRedirect}
                  className="w-full bg-neon-green text-dark-bg hover:bg-neon-green-dark font-bold tech-glow"
                >
                  <div className="flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Enviar para WhatsApp
                  </div>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedServices([]);
                    handleWhatsAppRedirect();
                  }}
                  className="w-full border-neon-green/50 text-neon-green hover:bg-neon-green hover:text-dark-bg"
                >
                  Conversar sem especificar serviços
                </Button>
              </div>

              <p className="text-xs text-text-muted text-center mt-4">
                Você será redirecionado para o WhatsApp
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Floating Button */}
      <div className="fixed bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          className="group bg-neon-green text-dark-bg hover:bg-neon-green-dark font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl tech-glow transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6" />
            <span className="text-lg font-black">Conversar agora</span>
          </div>
        </Button>
      </div>
    </>
  );
}