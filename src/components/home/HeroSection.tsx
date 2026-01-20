import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Store, Video, Zap, CheckCircle } from "lucide-react";
import heroAbstract from "@/assets/hero-abstract.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-24 pb-20 overflow-hidden flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroAbstract} 
          alt="" 
          className="w-full h-full object-cover opacity-40 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-seller/20 rounded-full blur-[120px] floating" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-creator/20 rounded-full blur-[120px] floating" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-8 animate-fade-up">
            <Zap className="w-4 h-4 text-seller" />
            <span className="text-sm font-medium text-foreground">Plateforme tout-en-un pour le marketing TikTok</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-foreground mb-8 animate-fade-up delay-100">
            Vendez plus avec les{" "}
            <span className="bg-gradient-to-r from-seller via-primary to-creator bg-clip-text text-transparent">créateurs TikTok</span>
          </h1>

          {/* Subtitle */}
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up delay-200">
            La plateforme africaine qui connecte vendeurs et créateurs de contenu. 
            Paiements Mobile Money, escrow sécurisé, résultats mesurables.
          </p>

          {/* CTA Buttons - Two distinct paths */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up delay-300">
            <Link to="/auth/seller">
              <Button size="xl" className="w-full sm:w-auto bg-seller hover:bg-seller/90 shadow-lg hover:shadow-xl transition-all">
                <Store className="w-5 h-5 mr-2" />
                Je suis vendeur
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/auth/creator">
              <Button size="xl" variant="outline" className="w-full sm:w-auto border-2 border-creator text-creator hover:bg-creator hover:text-white">
                <Video className="w-5 h-5 mr-2" />
                Je suis créateur
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-up delay-400">
            <div className="flex items-center justify-center gap-3 p-4 rounded-2xl glass">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm text-foreground">Inscription gratuite</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-2xl glass">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm text-foreground">Paiement Mobile Money</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-2xl glass">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm text-foreground">Escrow sécurisé</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default HeroSection;
