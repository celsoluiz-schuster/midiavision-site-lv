import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TrendingUp, Bot, Monitor, Target, Zap, Users, Award, ChevronRight, Mail, ShoppingCart } from 'lucide-react';

const Home = () => {
  const contactEmail = 'midiavision.web@gmail.com';

  const handleContactClick = () => {
    window.location.href = `mailto:${contactEmail}`;
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in-section');
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
          element.classList.add('is-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <nav className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
              <img
                src="/images/logo-midiavision.png"
                alt="MidiaVision Logo"
                className="h-24 w-auto object-contain transition-transform duration-300 hover:scale-105" />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#sobre" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300">Sobre</a>
              <a href="#servicos" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300">Serviços</a>
              <a href="#para-quem" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300">Para Quem</a>
              <a href="#como-funciona" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300">Como Funciona</a>


              <Button
                onClick={handleContactClick}
                className="bg-mv-green hover:bg-mv-green-hover text-primary-foreground font-semibold px-6 py-2 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <Mail className="w-4 h-4 mr-2" />
                Contato
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                onClick={handleContactClick}
                className="bg-mv-green hover:bg-mv-green-hover text-primary-foreground"
                size="sm">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 lg:px-8 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 fade-in-section">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold text-primary leading-tight">
                  Transformamos presença digital em geração real de clientes
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">Sites estratégicos, tráfego pago e automação inteligente para empresas que querem crescer de forma previsível.
                </p>
              </div>

              {/* Produtos em breve */}
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-gray-100 uppercase tracking-wider">Em breve</span>
                    <p className="text-white font-semibold text-sm sm:text-base">Guia Google Meu Negócio para Corretores</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-gray-100 uppercase tracking-wider">Em breve</span>
                    <p className="text-white font-semibold text-sm sm:text-base">Site imobiliário completo de alta conversão</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleContactClick}
                  size="lg"
                  className="bg-mv-green hover:bg-mv-green-hover text-primary-foreground font-semibold px-8 py-6 text-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <Mail className="w-5 h-5 mr-2" />
                  Contato
                </Button>

                <Button
                  onClick={handleContactClick}
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-6 text-lg transition-all duration-300">
                  Solicitar Orçamento
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-6 flex-wrap">
                {[
                { icon: Award, title: "Atendimento", sub: "Personalizado" },
                { icon: Zap, title: "Foco Total", sub: "em Resultados" },
                { icon: Users, title: "Capacidade", sub: "Limitada" }].
                map((item, i) =>
                <div key={i} className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-mv-blue-light to-mv-lime rounded-full flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-primary">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.sub}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="relative fade-in-section">
              <div className="relative z-10">
                <img
                  src="/images/hero-desk.png"
                  alt="Desk setup com laptop mostrando site profissional"
                  className="w-full h-auto rounded-2xl shadow-2xl" />
              </div>
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-to-br from-mv-blue-light to-mv-lime rounded-full opacity-10 blur-3xl -z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-gradient-to-tr from-mv-green to-mv-blue-light rounded-full opacity-10 blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-20 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-6 fade-in-section">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary">
              Sobre a MidiaVision
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-mv-blue-light to-mv-lime mx-auto rounded-full"></div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed pt-8">
              <p>
                A <strong className="text-primary">MidiaVision</strong> nasceu com a missão de transformar a presença digital de empresas em resultados concretos. Ajudamos negócios a conquistarem autoridade online, atraírem clientes qualificados e escalarem suas vendas com estratégia.
              </p>
              <p>
                Como uma empresa em crescimento, nosso <strong className="text-primary">diferencial é o atendimento ultra personalizado</strong>. Trabalhamos com capacidade limitada de clientes para garantir dedicação total a cada projeto. Você não é mais um número - é nosso foco principal.
              </p>
              <p>
                Desenvolvemos soluções completas: sites profissionais de alta conversão, campanhas de tráfego pago otimizadas e automação inteligente. <strong className="text-primary">Seu sucesso é nossa melhor propaganda</strong>, por isso o comprometimento é 100%.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 pt-12">
              {[
              { icon: Users, title: "Atendimento Exclusivo", desc: "Capacidade limitada para garantir dedicação total ao seu projeto" },
              { icon: Zap, title: "Agilidade", desc: "Sem burocracia. Acesso direto aos responsáveis e respostas rápidas" },
              { icon: Award, title: "Compromisso", desc: "Seu sucesso é nossa propaganda. Comprometimento de verdade" }].
              map((item, i) =>
              <Card key={i} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="pt-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-mv-blue-light to-mv-lime rounded-full flex items-center justify-center mx-auto">
                      <item.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Serviços Section */}
      <section id="servicos" className="py-20 px-4 lg:px-8 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto">
          <div className="text-center space-y-6 mb-16 fade-in-section">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary">
              Nossos Serviços
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-mv-blue-light to-mv-lime mx-auto rounded-full"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluções completas para transformar sua presença digital em um canal de geração constante de clientes
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Desenvolvimento de Sites */}
            <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 fade-in-section">
              <CardContent className="p-8 space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-mv-blue-light to-mv-lime rounded-2xl flex items-center justify-center">
                  <Monitor className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-primary">Desenvolvimento de Sites</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Criamos sites profissionais que impressionam e convertem visitantes em clientes
                  </p>
                </div>
                <ul className="space-y-3">
                  {["Sites institucionais modernos", "Landing Pages de alta conversão", "Projetos 100% responsivos", "Design focado em conversão", "Integração com ferramentas de marketing"].map((item, i) =>
                  <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-mv-green flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  )}
                </ul>
                <Button
                  onClick={handleContactClick}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:shadow-lg">
                  Saiba Mais
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Gestão de Tráfego - Featured */}
            <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 fade-in-section bg-gradient-to-br from-primary to-mv-blue-light">
              <CardContent className="p-8 space-y-6">
                <div className="w-20 h-20 bg-primary-foreground/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="space-y-3">
                  <div className="inline-block bg-mv-green text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full">
                    MAIS POPULAR
                  </div>
                  <h3 className="text-2xl font-bold text-primary-foreground">Gestão de Tráfego Pago</h3>
                  <p className="text-primary-foreground/90 leading-relaxed">
                    Campanhas estratégicas que atraem clientes qualificados e maximizam seu ROI
                  </p>
                </div>
                <ul className="space-y-3">
                  {["Google Ads otimizado", "Meta Ads (Facebook e Instagram)", "Estratégia de captação personalizada", "Campanhas orientadas a resultados", "Geração de leads qualificados"].map((item, i) =>
                  <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-mv-green flex-shrink-0 mt-0.5" />
                      <span className="text-primary-foreground/90">{item}</span>
                    </li>
                  )}
                </ul>
                <Button
                  onClick={handleContactClick}
                  className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold transition-all duration-300 hover:shadow-lg">
                  Quero Mais Clientes
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Automação */}
            <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 fade-in-section">
              <CardContent className="p-8 space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-mv-blue-light to-mv-lime rounded-2xl flex items-center justify-center">
                  <Bot className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-primary">Automação de Atendimento</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Automatize seu atendimento e nunca perca uma oportunidade de negócio
                  </p>
                </div>
                <ul className="space-y-3">
                  {["Respostas automáticas inteligentes", "Qualificação automática de leads", "Organização de atendimento", "Agendamento automatizado"].map((item, i) =>
                  <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-mv-green flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  )}
                </ul>
                <Button
                  onClick={handleContactClick}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:shadow-lg">
                  Automatizar Agora
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Para Quem Section */}
      <section id="para-quem" className="py-20 px-4 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center space-y-6 mb-16 fade-in-section">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary">
              Para Quem é Ideal
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-mv-blue-light to-mv-lime mx-auto rounded-full"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A MidiaVision é perfeita para empresas e profissionais que desejam crescer com estratégia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
            { icon: Users, title: "Profissionais Autônomos", desc: "Médicos, dentistas, advogados, arquitetos e consultores" },
            { icon: Monitor, title: "Negócios Físicos", desc: "Lojas, clínicas, estúdios e academias" },
            { icon: Target, title: "Prestadores de Serviço", desc: "Corretores, nutricionistas, psicólogos e fisioterapeutas" },
            { icon: TrendingUp, title: "Empresas", desc: "Negócios que querem escalar com previsibilidade" }].
            map((item, i) =>
            <Card key={i} className="border-2 border-border hover:border-mv-green hover:shadow-lg transition-all duration-300 fade-in-section">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-mv-blue-light to-mv-lime rounded-full flex items-center justify-center mx-auto">
                    <item.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-secondary to-background border-2 border-border rounded-2xl p-8 lg:p-12 fade-in-section">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">
              A MidiaVision é ideal para você se:
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
              "Quer construir autoridade digital no seu segmento",
              "Busca previsibilidade na geração de clientes",
              "Precisa profissionalizar seu marketing digital",
              "Deseja escalar vendas de forma sustentável",
              "Quer otimizar seu atendimento e conversão",
              "Busca resultados mensuráveis e ROI positivo"].
              map((text, i) =>
              <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-mv-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <ChevronRight className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <p className="text-muted-foreground">{text}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section className="py-20 px-4 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center space-y-6 mb-16 fade-in-section">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary">
              O Que Nossos Clientes Dizem
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-mv-blue-light to-mv-lime mx-auto rounded-full"></div>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-primary/10 shadow-xl hover:shadow-2xl transition-all duration-300 fade-in-section">
              <CardContent className="p-8 lg:p-10">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) =>
                    <svg key={star} className="w-6 h-6 fill-current" style={{ color: 'hsl(48, 100%, 50%)' }} viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                  </div>

                  <blockquote className="text-lg lg:text-xl text-muted-foreground italic leading-relaxed">
                    "Trabalhamos com a MidiaVision e o resultado superou nossas expectativas. Atendimento próximo, profissionalismo e entrega de qualidade. Recomendo!"
                  </blockquote>

                  <div className="pt-4">
                    <div className="font-bold text-lg text-primary">Carine Schariff</div>
                    <div className="text-muted-foreground">Nutricionista</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/10 shadow-xl hover:shadow-2xl transition-all duration-300 fade-in-section">
              <CardContent className="p-8 lg:p-10">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) =>
                    <svg key={star} className="w-6 h-6 fill-current" style={{ color: 'hsl(48, 100%, 50%)' }} viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                  </div>

                  <blockquote className="text-lg lg:text-xl text-muted-foreground italic leading-relaxed">
                    "A MidiaVision transformou nossa presença digital. Profissionais comprometidos, criativos e que realmente entendem o mercado imobiliário. Resultado excelente!"
                  </blockquote>

                  <div className="pt-4">
                    <div className="font-bold text-lg text-primary">VisionLar Imóveis</div>
                    <div className="text-muted-foreground">
                      <a href="https://www.visionlarimoveis.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        www.visionlarimoveis.com.br
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="md:col-span-2 text-center pt-4">
              <p className="text-sm text-muted-foreground italic">
                💡 Quer ser nosso próximo case de sucesso? Entre em contato!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section id="como-funciona" className="py-20 px-4 lg:px-8 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto">
          <div className="text-center space-y-6 mb-16 fade-in-section">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary">
              Nossos Diferenciais
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-mv-blue-light to-mv-lime mx-auto rounded-full"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              O que nos torna únicos na entrega de resultados para nossos clientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
            { icon: Users, title: "Atendimento Ultra Personalizado", desc: "Trabalhamos com poucos clientes por vez. Você tem acesso direto aos responsáveis e atenção total ao seu projeto." },
            { icon: Award, title: "Preços Competitivos", desc: "Sem estrutura inchada, oferecemos excelente custo-benefício sem comprometer a qualidade da entrega." },
            { icon: TrendingUp, title: "Foco Total em Resultados", desc: "Seu sucesso é nossa melhor propaganda. Por isso, o comprometimento com resultados reais é 100%." },
            { icon: Zap, title: "Disponibilidade Total", desc: "Sem burocracia ou intermediários. Respostas rápidas e comunicação direta durante todo o processo." },
            { icon: Target, title: "Estratégia Personalizada", desc: "Cada negócio é único. Desenvolvemos soluções sob medida para seus objetivos e realidade específicos." },
            { icon: Bot, title: "Tecnologia Moderna", desc: "Sites rápidos, seguros e preparados para conversão. Tecnologia atual com foco em performance e resultados." }].
            map((item, i) =>
            <Card key={i} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 fade-in-section">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-mv-blue-light to-mv-lime rounded-xl flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6 mb-16 fade-in-section">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary">
              Perguntas Frequentes
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-mv-blue-light to-mv-lime mx-auto rounded-full"></div>
            <p className="text-xl text-muted-foreground">
              Tire suas dúvidas sobre nossos serviços
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4 fade-in-section">
            {[
            { q: "Vocês estão há quanto tempo no mercado?", a: "A MidiaVision é uma empresa em crescimento. Trabalhamos com atendimento personalizado e capacidade limitada de clientes para garantir excelência em cada projeto. Nosso foco é qualidade e resultado, não quantidade." },
            { q: "Por que devo confiar em vocês?", a: "Oferecemos orçamento detalhado sem compromisso. Você só avança se sentir total confiança. Trabalhamos com total transparência durante todo o processo e seu sucesso é nossa melhor propaganda." },
            { q: "Quanto custa um site profissional?", a: "O investimento varia de acordo com a complexidade e funcionalidades necessárias para seu negócio. Trabalhamos com soluções personalizadas e oferecemos orçamento detalhado após entender suas necessidades. Entre em contato para uma proposta sem compromisso." },
            { q: "Quanto tempo leva para ficar pronto?", a: "Um site institucional leva em média de 15 a 30 dias, dependendo da complexidade. Landing pages podem ficar prontas em 7 a 15 dias. O prazo exato é definido após análise do seu projeto. Priorizamos qualidade sem comprometer prazos." },
            { q: "Vocês fazem manutenção após a entrega?", a: "Sim! Oferecemos suporte pós-entrega e ajustes incluídos até sua total satisfação. Também disponibilizamos planos de manutenção mensal para quem deseja atualizações contínuas e suporte técnico permanente." },
            { q: "Como funciona a gestão de tráfego pago?", a: "Criamos e gerenciamos suas campanhas no Google Ads e Meta Ads (Facebook/Instagram). Fazemos toda a estratégia, criação dos anúncios, segmentação do público e otimização contínua para maximizar resultados. Você recebe relatórios periódicos com métricas claras." },
            { q: "Qual o investimento mínimo em anúncios?", a: "Recomendamos um investimento inicial mínimo de R$ 500 a R$ 1.000/mês em anúncios (além da nossa taxa de gestão) para ter volume de dados suficiente e resultados consistentes. Mas podemos ajustar a estratégia de acordo com seu orçamento." },
            { q: "Quantos clientes vocês atendem por vez?", a: "Trabalhamos com capacidade limitada justamente para garantir atendimento personalizado e dedicação total a cada projeto. Isso nos permite entregar resultados superiores e manter comunicação próxima com cada cliente." }].
            map((item, i) =>
            <AccordionItem key={i} value={`item-${i + 1}`} className="border-2 border-border rounded-lg px-6 hover:border-mv-green transition-colors duration-300">
                <AccordionTrigger className="text-lg font-semibold text-primary hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>

          <div className="mt-12 text-center fade-in-section">
            <p className="text-muted-foreground mb-6">Não encontrou sua dúvida?</p>
            <Button
              onClick={handleContactClick}
              className="bg-mv-green hover:bg-mv-green-hover text-primary-foreground font-semibold px-8 py-6 text-lg transition-all duration-300 hover:shadow-xl">
              <Mail className="w-5 h-5 mr-2" />
              Fale Conosco
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-br from-primary to-mv-blue-light">
        <div className="container mx-auto max-w-5xl text-center space-y-10 fade-in-section">
          <div className="inline-block bg-mv-green text-primary-foreground text-sm font-bold px-4 py-2 rounded-full mb-4">
            🎁 CONDIÇÕES ESPECIAIS
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight">
              Seu negócio precisa aparecer.<br />
              Precisa ser encontrado.<br />
              Precisa gerar clientes.
            </h2>

            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Está na hora de transformar sua presença digital em uma máquina de geração de clientes. Vamos conversar sobre como podemos impulsionar seu negócio?
            </p>

            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border-2 border-primary-foreground/20">
              <p className="text-lg font-semibold text-primary-foreground mb-2">✨ Trabalhamos com vagas limitadas</p>
              <p className="text-primary-foreground/90">Atendimento personalizado para garantir excelência em cada projeto</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
            <Button
              onClick={handleContactClick}
              size="lg"
              className="bg-mv-green hover:bg-mv-green-hover text-primary-foreground font-bold px-12 py-8 text-xl transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <Mail className="w-6 h-6 mr-3" />
              Entre em Contato
            </Button>
          </div>

          <div className="pt-8 flex items-center justify-center gap-12 flex-wrap text-primary-foreground/80">
            {["Orçamento sem compromisso", "Atendimento personalizado", "Resposta rápida"].map((text, i) =>
            <div key={i} className="flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-mv-green" />
                <span>{text}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-mv-dark text-primary-foreground py-12 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <div
                className="bg-primary-foreground p-6 rounded-lg inline-block cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={handleLogoClick}>
                <img
                  src="/images/logo-midiavision.png"
                  alt="MidiaVision Logo"
                  className="h-20 w-auto object-contain" />
              </div>
              <p className="text-primary-foreground/60">
                Transformando presença digital em geração real de clientes.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-bold">Links Rápidos</h4>
              <div className="flex flex-col space-y-2">
                <a href="#sobre" className="text-primary-foreground/60 hover:text-mv-green transition-colors duration-300">Sobre</a>
                <a href="#servicos" className="text-primary-foreground/60 hover:text-mv-green transition-colors duration-300">Serviços</a>
                <a href="#para-quem" className="text-primary-foreground/60 hover:text-mv-green transition-colors duration-300">Para Quem</a>
                <a href="#como-funciona" className="text-primary-foreground/60 hover:text-mv-green transition-colors duration-300">Diferenciais</a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-bold">Contato</h4>
              <div className="space-y-3 text-primary-foreground/60">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  midiavision.web@gmail.com
                </p>
              </div>
              <Button
                onClick={handleContactClick}
                className="bg-mv-green hover:bg-mv-green-hover text-primary-foreground font-semibold transition-all duration-300">
                <Mail className="w-4 h-4 mr-2" />
                Fale Conosco
              </Button>
            </div>
          </div>

          <div className="border-t border-primary-foreground/10 pt-8 text-center text-primary-foreground/60">
            <p>&copy; {new Date().getFullYear()} MidiaVision. Todos os direitos reservados.</p>
            <p className="text-sm mt-2">Sites • Tráfego Pago • Automação</p>
          </div>
        </div>
      </footer>

      {/* Floating Contact Button */}
      <button
        onClick={handleContactClick}
        className="fixed bottom-6 right-6 z-50 bg-mv-green hover:bg-mv-green-hover text-primary-foreground p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-bounce"
        aria-label="Entrar em contato">
        <Mail className="w-6 h-6" />
      </button>
    </div>);

};

export default Home;
