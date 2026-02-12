import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto rounded-[20px] bg-primary p-12 md:p-16 text-center relative overflow-hidden">
          {/* Subtle decorative blur */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-[36px] md:text-[40px] font-display font-bold text-white mb-4 leading-tight">
              Prêt à booster vos ventes avec TikTok ?
            </h2>

            <p className="text-[17px] text-white/80 max-w-xl mx-auto mb-10">
              Créez votre compte gratuitement et commencez à collaborer avec les meilleurs créateurs de contenu.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="xl"
                className="w-full sm:w-auto bg-white text-primary hover:bg-white/95 active:scale-[0.98]"
                asChild
              >
                <a href="/auth/seller">
                  Créer mon compte vendeur
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button
                size="xl"
                variant="ghost"
                className="w-full sm:w-auto text-white border border-white/25 hover:bg-white/10"
                asChild
              >
                <a href="/auth/creator">
                  S'inscrire comme créateur
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
