import { Package, MessageSquare, Wallet, BarChart3, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Publication de produits",
    description: "Publiez vos produits en quelques clics avec un formulaire simple et définissez votre budget de campagne.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MessageSquare,
    title: "Négociation en temps réel",
    description: "Discutez directement avec les créateurs et ajustez les prix en toute transparence via le chat intégré.",
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    icon: Wallet,
    title: "Paiements sécurisés",
    description: "Vos fonds sont protégés par notre système d'escrow jusqu'à validation de la vidéo par le créateur.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: BarChart3,
    title: "Statistiques détaillées",
    description: "Suivez les performances de vos campagnes avec des tableaux de bord complets et des analytics.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Shield,
    title: "Créateurs vérifiés",
    description: "Tous nos créateurs sont vérifiés avec leurs statistiques TikTok authentiques et historique de campagnes.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "Processus rapide",
    description: "De la publication à la mise en ligne de la vidéo, notre processus optimisé accélère vos campagnes.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-lg text-muted-foreground">
            Une plateforme complète pour gérer vos campagnes de marketing d'influence de A à Z.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="card-elevated p-6 hover:border-primary/30 transition-all duration-300 group animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
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
