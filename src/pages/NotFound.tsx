import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-dark-bg text-foreground font-cyber flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-transparent to-neon-blue/10"></div>
        <div className="h-full w-full bg-[linear-gradient(rgba(120,255,120,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(120,255,120,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      <div className="text-center relative z-10 max-w-2xl mx-auto px-6">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-black gradient-text mb-4 animate-slide-up">
            404
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-neon-green to-neon-blue animate-glow-pulse"></div>
        </div>

        {/* Error Message */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Página não encontrada
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Oops! A página que você está procurando não existe ou foi movida.
            <br />
            <span className="text-neon-green font-medium">"{location.pathname}"</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            size="lg"
            className="flex items-center gap-2 border-neon-green/50 text-neon-green hover:bg-neon-green hover:text-darker-bg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'}
            size="lg"
            className="flex items-center gap-2 bg-neon-green text-darker-bg hover:bg-neon-green-glow font-bold cyber-glow"
          >
            <Home className="w-5 h-5" />
            Ir para início
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-16 p-6 bg-card-bg/50 rounded-lg border border-neon-green/20 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <p className="text-foreground/80 mb-4">
            Precisa de ajuda? Entre em contato conosco:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neon-green hover:text-neon-green-glow transition-colors font-medium"
            >
              WhatsApp: (11) 99999-9999
            </a>
            <span className="hidden sm:inline text-foreground/50">•</span>
            <a 
              href="mailto:contato@nexusdigital.com.br"
              className="text-neon-blue hover:text-neon-cyan transition-colors font-medium"
            >
              contato@nexusdigital.com.br
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
