import { ChevronUp, Mail, Phone, MapPin, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-darker-bg border-t border-primary-blue/20">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h3 className="text-4xl font-black font-primary gradient-text mb-4">
                NEXUS DIGITAL
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                Do latim, um ponto que une várias coisas. Somos a conexão entre sua ideia e o sucesso digital.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-text-secondary hover:text-primary-blue transition-colors cursor-pointer">
                <Phone className="w-5 h-5" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary hover:text-primary-blue transition-colors cursor-pointer">
                <Mail className="w-5 h-5" />
                <span>contato@nexusdigital.com.br</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <MapPin className="w-5 h-5" />
                <span>São Paulo, SP • Atendimento Nacional</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-xl font-bold text-primary-blue mb-6">Serviços</h4>
            <ul className="space-y-3">
              {[
                "Vídeos Festivos",
                "Vídeos Corporativos",
                "Filmagens com Drone",  
                "Tour Virtual 360º",
                "Sites Convite",
                "Tráfego Pago",
                "Design Gráfico",
                "Sites e Landing Pages"
              ].map((service) => (
                <li key={service}>
                  <a 
                    href="#" 
                    className="text-text-secondary hover:text-primary-blue transition-colors duration-300"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-xl font-bold text-primary-blue mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {[
                { label: "Início", href: "#" },
                { label: "Serviços", href: "#audiovisual" },
                { label: "Portfólio", href: "#" },
                { label: "Depoimentos", href: "#" },
                { label: "Contato", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Carreiras", href: "#" },
                { label: "Política de Privacidade", href: "#" }
              ].map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-text-secondary hover:text-primary-blue transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & CTA */}
        <div className="border-t border-primary-blue/20 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-6">
              <span className="text-text-secondary font-medium">Siga-nos:</span>
              <div className="flex gap-4">
                {[
                  { Icon: Instagram, href: "#", color: "hover:text-pink-400" },
                  { Icon: Linkedin, href: "#", color: "hover:text-blue-400" },
                  { Icon: Youtube, href: "#", color: "hover:text-red-400" },
                ].map(({ Icon, href, color }, index) => (
                  <a
                    key={index}
                    href={href}
                    className={`p-3 bg-surface border border-primary-blue/30 rounded-lg text-text-secondary ${color} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-blue/20`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Back to Top Button */}
            <Button 
              onClick={scrollToTop}
              variant="outline"
              className="flex items-center gap-2 border-primary-blue/50 text-primary-blue hover:bg-primary-blue hover:text-white transition-all duration-300"
            >
              <ChevronUp className="w-4 h-4" />
              Voltar ao topo
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-blue/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
            <div>
              © {currentYear} Nexus Digital. Todos os direitos reservados.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary-blue transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-primary-blue transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-primary-blue transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Footer Glow */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-blue/50 to-transparent"></div>
    </footer>
  );
}