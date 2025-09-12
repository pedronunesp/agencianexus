import { useState, useEffect } from "react";
import { Search, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

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

interface HeroSectionProps {
  onServiceSelect: (service: string) => void;
}

export default function HeroSection({ onServiceSelect }: HeroSectionProps) {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (searchValue) {
      onServiceSelect(searchValue);
    } else {
      onServiceSelect(services[currentServiceIndex]);
    }
  };

  const handleServiceClick = (service: string) => {
    setSearchValue(service);
    setIsTyping(false);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-dark-bg/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-transparent to-dark-bg/50"></div>
      </div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-transparent to-neon-blue/10"></div>
        <div className="h-full w-full bg-[linear-gradient(rgba(120,255,120,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(120,255,120,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Logo placeholder - você pode substituir por logo real */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black font-cyber gradient-text mb-4 animate-slide-up">
            NEXUS
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-neon-green to-neon-blue animate-glow-pulse"></div>
        </div>

        {/* Main Quote */}
        <p className="text-2xl md:text-3xl text-foreground/90 mb-12 font-light animate-fade-in" 
           style={{ animationDelay: '0.3s' }}>
          <em>"Nexus: do latim, um ponto que une várias coisas."</em>
        </p>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
          {/* Question Text */}
          <h3 className="text-xl md:text-2xl text-foreground/90 mb-6 font-medium">
            O que você precisa da gente?
          </h3>

          {/* Fake Search Bar */}
          <div className="relative group mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-neon-blue/20 rounded-lg blur-sm group-hover:blur-none transition-all duration-300"></div>
            <div className="relative flex items-center bg-card-bg/80 backdrop-blur-sm border border-neon-green/30 rounded-lg p-4 hover:border-neon-green/60 transition-all duration-300">
              <Search className="w-6 h-6 text-neon-green mr-4 animate-neon-pulse" />
              <div className="flex-1 text-left">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={isTyping ? services[currentServiceIndex] : "Digite o serviço desejado..."}
                  className="w-full bg-transparent text-foreground placeholder-muted-foreground outline-none text-lg font-medium"
                  onFocus={() => setIsTyping(false)}
                />
              </div>
              <Button 
                onClick={handleSearch}
                variant="default"
                className={`ml-4 bg-neon-green text-darker-bg hover:bg-neon-green-glow font-bold px-8 cyber-glow transition-all duration-300 ${searchValue ? 'animate-pulse shadow-lg shadow-neon-green/50 scale-105' : ''}`}
              >
                Ir
              </Button>
            </div>
          </div>

          {/* All Services Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {services.map((service, index) => (
              <button
                key={service}
                onClick={() => handleServiceClick(service)}
                className="px-3 py-3 text-sm bg-card-bg/50 text-foreground/80 rounded-lg border border-neon-green/20 hover:border-neon-green/60 hover:text-neon-green transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/20 hover:bg-neon-green/5 text-center"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}