import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto rounded-3xl bg-primary overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Rejoignez-nous dès aujourd'hui</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt à booster vos ventes avec TikTok ?
            </h2>
            
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
              Créez votre compte gratuitement et commencez à collaborer avec les meilleurs créateurs de contenu.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="xl" 
                className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 hover:scale-[1.03] active:scale-[0.98] shadow-lg"
              >
                Créer mon compte vendeur
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                size="xl" 
                variant="ghost"
                className="w-full sm:w-auto text-white border-2 border-white/30 hover:bg-white/10"
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
