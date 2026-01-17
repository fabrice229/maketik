import { Upload, Search, MessageCircle, CheckCircle, Banknote } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Publiez votre produit",
    description: "Le vendeur crée une campagne avec les détails du produit et définit son budget.",
    role: "Vendeur",
  },
  {
    number: "02",
    icon: Search,
    title: "Trouvez le bon créateur",
    description: "Parcourez les profils des créateurs et leurs statistiques TikTok pour faire votre choix.",
    role: "Vendeur",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Négociez et validez",
    description: "Discutez des détails et du prix directement via le chat. Les modifications sont notifiées en temps réel.",
    role: "Les deux",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Création du contenu",
    description: "Le créateur réalise la vidéo selon le brief et la soumet pour validation.",
    role: "Créateur",
  },
  {
    number: "05",
    icon: Banknote,
    title: "Paiement sécurisé",
    description: "Une fois la vidéo validée, le paiement est libéré automatiquement de l'escrow.",
    role: "Automatique",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comment ça fonctionne
          </h2>
          <p className="text-lg text-muted-foreground">
            Un processus simple et transparent en 5 étapes pour des collaborations réussies.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative flex gap-6 md:gap-8 pb-12 last:pb-0 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Timeline line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-14 w-0.5 h-[calc(100%-3.5rem)] bg-border" />
              )}
              
              {/* Step number circle */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 card-elevated p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        step.role === "Vendeur" 
                          ? "bg-primary/10 text-primary"
                          : step.role === "Créateur"
                          ? "bg-info/10 text-info"
                          : step.role === "Automatique"
                          ? "bg-success/10 text-success"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {step.role}
                      </span>
                    </div>
                    <p className="text-muted-foreground">
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
