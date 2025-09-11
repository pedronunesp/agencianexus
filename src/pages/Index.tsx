import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  const [activeService, setActiveService] = useState<string>("");

  const handleServiceSelect = (service: string) => {
    // Map service names to section IDs
    const serviceMap: { [key: string]: string } = {
      "Vídeos festivos": "audiovisual",
      "Vídeos corporativos/pessoais": "audiovisual", 
      "Filmagens com drone": "audiovisual",
      "Tour virtual 360º": "audiovisual",
      "Sites convite": "audiovisual",
      "Tráfego pago": "marketing",
      "Design gráfico": "design",
      "Criação de sites e landing pages": "design"
    };

    const sectionId = serviceMap[service] || "audiovisual";
    setActiveService(sectionId);

    // Scroll to section with smooth behavior
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);

    // Clear active state after animation
    setTimeout(() => {
      setActiveService("");
    }, 2000);
  };

  // Add scroll reveal animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
        }
      });
    }, observerOptions);

    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-foreground font-cyber">
      <HeroSection onServiceSelect={handleServiceSelect} />
      <ServicesSection activeService={activeService} />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
