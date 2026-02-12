import { DollarSign, Users, Video, Star } from "lucide-react";

const stats = [
  { icon: Users, value: "2,500+", label: "Créateurs actifs" },
  { icon: Video, value: "15,000+", label: "Campagnes réalisées" },
  { icon: DollarSign, value: "€2.5M+", label: "Payés aux créateurs" },
  { icon: Star, value: "4.9/5", label: "Note moyenne" },
];

const StatsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card text-center animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/8 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-display-number text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-small text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
