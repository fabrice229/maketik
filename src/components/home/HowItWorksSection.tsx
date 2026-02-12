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
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/8 text-small font-medium text-primary mb-6">
            Processus
          </span>
          <h2 className="text-foreground mb-4">
            Comment ça fonctionne
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Un processus simple et transparent en 5 étapes pour des collaborations réussies.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="flex gap-6 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Number */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-small">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 bg-card rounded-[16px] p-6 shadow-card">
                <div className="flex items-center gap-3 mb-2">
                  <step.icon className="w-5 h-5 text-primary" />
                  <h3 className="text-[18px] font-display font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <span className="text-[12px] px-2.5 py-1 rounded-full bg-primary/8 text-primary font-medium">
                    {step.role}
                  </span>
                </div>
                <p className="text-muted-foreground text-body">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
