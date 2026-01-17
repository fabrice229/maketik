import { Upload, Search, MessageCircle, CheckCircle, Banknote } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Publiez votre produit",
    description: "Le vendeur crée une campagne avec les détails du produit et définit son budget.",
    role: "Vendeur",
    roleColor: "bg-primary/15 text-primary",
  },
  {
    number: "02",
    icon: Search,
    title: "Trouvez le bon créateur",
    description: "Parcourez les profils des créateurs et leurs statistiques TikTok pour faire votre choix.",
    role: "Vendeur",
    roleColor: "bg-primary/15 text-primary",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Négociez et validez",
    description: "Discutez des détails et du prix directement via le chat. Les modifications sont notifiées en temps réel.",
    role: "Les deux",
    roleColor: "bg-muted text-muted-foreground",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Création du contenu",
    description: "Le créateur réalise la vidéo selon le brief et la soumet pour validation.",
    role: "Créateur",
    roleColor: "bg-info/15 text-info",
  },
  {
    number: "05",
    icon: Banknote,
    title: "Paiement sécurisé",
    description: "Une fois la vidéo validée, le paiement est libéré automatiquement de l'escrow.",
    role: "Automatique",
    roleColor: "bg-success/15 text-success",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6">
            Processus
          </span>
          <h2 className="font-display text-foreground mb-6">
            Comment ça fonctionne
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Un processus simple et transparent en 5 étapes pour des collaborations réussies.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative flex gap-6 md:gap-10 pb-12 last:pb-0 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Timeline line */}
              {index < steps.length - 1 && (
                <div className="absolute left-7 top-[4.5rem] w-0.5 h-[calc(100%-3.5rem)] bg-gradient-to-b from-primary/40 to-border" />
              )}
              
              {/* Step number circle */}
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-display font-bold shadow-glow-sm">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 card-elevated p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-lg font-display font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${step.roleColor}`}>
                        {step.role}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
