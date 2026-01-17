import { Package, MessageSquare, Wallet, BarChart3, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Publication de produits",
    description: "Publiez vos produits en quelques clics avec un formulaire simple et définissez votre budget de campagne.",
    color: "text-primary",
    bgColor: "bg-primary/15",
  },
  {
    icon: MessageSquare,
    title: "Négociation en temps réel",
    description: "Discutez directement avec les créateurs et ajustez les prix en toute transparence via le chat intégré.",
    color: "text-info",
    bgColor: "bg-info/15",
  },
  {
    icon: Wallet,
    title: "Paiements sécurisés",
    description: "Vos fonds sont protégés par notre système d'escrow jusqu'à validation de la vidéo par le créateur.",
    color: "text-success",
    bgColor: "bg-success/15",
  },
  {
    icon: BarChart3,
    title: "Statistiques détaillées",
    description: "Suivez les performances de vos campagnes avec des tableaux de bord complets et des analytics.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/15",
  },
  {
    icon: Shield,
    title: "Créateurs vérifiés",
    description: "Tous nos créateurs sont vérifiés avec leurs statistiques TikTok authentiques et historique de campagnes.",
    color: "text-primary",
    bgColor: "bg-primary/15",
  },
  {
    icon: Zap,
    title: "Processus rapide",
    description: "De la publication à la mise en ligne de la vidéo, notre processus optimisé accélère vos campagnes.",
    color: "text-success",
    bgColor: "bg-success/15",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-28 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-info/5 rounded-full blur-[100px] translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6">
            Fonctionnalités
          </span>
          <h2 className="font-display text-foreground mb-6">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Une plateforme complète pour gérer vos campagnes de marketing d'influence de A à Z.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="card-elevated p-8 group animate-fade-up"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
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
