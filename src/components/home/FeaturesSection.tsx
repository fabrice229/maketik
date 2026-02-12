import { Package, MessageSquare, Wallet, BarChart3, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Publication de produits",
    description: "Publiez vos produits en quelques clics avec un formulaire simple et définissez votre budget de campagne.",
  },
  {
    icon: MessageSquare,
    title: "Négociation en temps réel",
    description: "Discutez directement avec les créateurs et ajustez les prix en toute transparence via le chat intégré.",
  },
  {
    icon: Wallet,
    title: "Paiements sécurisés",
    description: "Vos fonds sont protégés par notre système d'escrow jusqu'à validation de la vidéo par le créateur.",
  },
  {
    icon: BarChart3,
    title: "Statistiques détaillées",
    description: "Suivez les performances de vos campagnes avec des tableaux de bord complets et des analytics.",
  },
  {
    icon: Shield,
    title: "Créateurs vérifiés",
    description: "Tous nos créateurs sont vérifiés avec leurs statistiques TikTok authentiques et historique de campagnes.",
  },
  {
    icon: Zap,
    title: "Processus rapide",
    description: "De la publication à la mise en ligne de la vidéo, notre processus optimisé accélère vos campagnes.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/8 text-small font-medium text-primary mb-6">
            Fonctionnalités
          </span>
          <h2 className="text-foreground mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Une plateforme complète pour gérer vos campagnes de marketing d'influence de A à Z.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card-elevated group animate-fade-up"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/8 flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-110">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-[20px] font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-body leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
