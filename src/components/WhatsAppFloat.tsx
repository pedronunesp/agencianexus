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
                  <p className="text-sm text-foreground/70">Selecione seus interesses</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-foreground/70 hover:text-neon-green"
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
                        : 'border-neon-green/30 bg-card-bg/50 text-foreground/80 hover:border-neon-green/60 hover:text-neon-green'
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
                  className="w-full bg-neon-green text-darker-bg hover:bg-neon-green-glow font-bold cyber-glow"
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
                  className="w-full border-neon-green/50 text-neon-green hover:bg-neon-green hover:text-darker-bg"
                >
                  Conversar sem especificar serviços
                </Button>
              </div>

              <p className="text-xs text-foreground/60 text-center mt-4">
                Você será redirecionado para o WhatsApp
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          className="relative group bg-neon-green text-darker-bg hover:bg-neon-green-glow font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl cyber-glow animate-cyber-float"
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline">Conversar agora</span>
          </div>
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-neon-green opacity-75 animate-ping"></div>
        </Button>

        {/* Tooltip for mobile */}
        <div className="sm:hidden absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-dark-bg text-foreground text-sm px-3 py-2 rounded-lg border border-neon-green/30 whitespace-nowrap">
            Conversar agora
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neon-green/30"></div>
          </div>
        </div>
      </div>
    </>
  );
}