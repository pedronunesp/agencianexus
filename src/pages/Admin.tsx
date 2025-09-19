import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ServicesAdmin from "@/components/admin/ServicesAdmin";
import TestimonialsAdmin from "@/components/admin/TestimonialsAdmin";
import ClientLogosAdmin from "@/components/admin/ClientLogosAdmin";
import ProjectMetricsAdmin from "@/components/admin/ProjectMetricsAdmin";
import ProjectFeedbackAdmin from "@/components/admin/ProjectFeedbackAdmin";
import { Shield, Settings, Users, Image, Briefcase, BarChart3, MessageSquare } from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("services");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Painel Administrativo</h1>
          </div>
          <p className="text-muted-foreground">
            Gerencie todo o conteúdo do seu site de forma fácil e organizada
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-5">
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Serviços
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Depoimentos
            </TabsTrigger>
            <TabsTrigger value="logos" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Logos
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Métricas
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Feedback
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="services" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Gerenciar Serviços
                  </CardTitle>
                  <CardDescription>
                    Adicione, edite ou remova serviços, sub-serviços e projetos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ServicesAdmin />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Gerenciar Depoimentos
                  </CardTitle>
                  <CardDescription>
                    Adicione, edite ou remova depoimentos de clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TestimonialsAdmin />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logos" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Gerenciar Logos de Clientes
                  </CardTitle>
                  <CardDescription>
                    Adicione, edite ou remova logos de clientes parceiros
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ClientLogosAdmin />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Gerenciar Métricas de Projetos
                  </CardTitle>
                  <CardDescription>
                    Adicione, edite ou remova métricas de desempenho dos projetos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectMetricsAdmin />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Gerenciar Feedback de Projetos
                  </CardTitle>
                  <CardDescription>
                    Adicione, edite ou remova feedback de clientes sobre projetos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectFeedbackAdmin />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;