import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-28 bg-background relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden">
          {/* Glass card with gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          
          {/* Decorative blurs */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white/20 rounded-full blur-3xl" />

          <div className="relative px-8 py-20 md:px-16 md:py-24 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-sm text-white mb-8">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Rejoignez-nous dès aujourd'hui</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Prêt à booster vos ventes avec TikTok ?
            </h2>
            
            <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-12">
              Créez votre compte gratuitement et commencez à collaborer avec les meilleurs créateurs de contenu.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="xl" 
                className="w-full sm:w-auto bg-white text-primary hover:bg-white/95 hover:scale-[1.02] active:scale-[0.98] shadow-xl transition-all duration-300"
              >
                Créer mon compte vendeur
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                size="xl" 
                variant="ghost"
                className="w-full sm:w-auto text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm"
              >
                S'inscrire comme créateur
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
