import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users, TrendingUp, Shield } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
            <span className="text-sm font-medium">Nouvelle plateforme de marketing d'influence</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up delay-100">
            Connectez vos produits aux{" "}
            <span className="text-gradient">créateurs TikTok</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
            La plateforme qui simplifie la collaboration entre vendeurs et créateurs de contenu. 
            Paiements sécurisés, négociation transparente, résultats mesurables.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up delay-300">
            <Button variant="hero" className="w-full sm:w-auto">
              Je suis vendeur
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="hero-outline" className="w-full sm:w-auto">
              <Play className="w-5 h-5" />
              Je suis créateur
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 animate-fade-up delay-400">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">2,500+ Créateurs</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="w-5 h-5 text-success" />
              <span className="text-sm font-medium">10M+ Vues générées</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-5 h-5 text-info" />
              <span className="text-sm font-medium">Paiements sécurisés</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
