import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users, TrendingUp, Shield } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 bg-gradient-hero bg-grid-pattern overflow-hidden flex items-center">
      {/* Background decoration - floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] floating" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-info/10 rounded-full blur-[100px] floating" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-foreground">Nouvelle plateforme de marketing d'influence</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-foreground mb-8 animate-fade-up delay-100">
            Connectez vos produits aux{" "}
            <span className="text-gradient">créateurs TikTok</span>
          </h1>

          {/* Subtitle */}
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up delay-200">
            La plateforme qui simplifie la collaboration entre vendeurs et créateurs de contenu. 
            Paiements sécurisés, négociation transparente, résultats mesurables.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-up delay-300">
            <Button variant="hero" className="w-full sm:w-auto shadow-glow">
              Je suis vendeur
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="hero-outline" className="w-full sm:w-auto glass">
              <Play className="w-5 h-5" />
              Je suis créateur
            </Button>
          </div>

          {/* Trust indicators - Glass cards */}
          <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-up delay-400">
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-foreground">2,500+</div>
                <div className="text-xs text-muted-foreground">Créateurs actifs</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass">
              <div className="w-10 h-10 rounded-xl bg-success/15 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-foreground">10M+</div>
                <div className="text-xs text-muted-foreground">Vues générées</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass">
              <div className="w-10 h-10 rounded-xl bg-info/15 flex items-center justify-center">
                <Shield className="w-5 h-5 text-info" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-foreground">100%</div>
                <div className="text-xs text-muted-foreground">Paiements sécurisés</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
