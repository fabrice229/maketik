import { DollarSign, Users, Video, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "2,500+",
    label: "Créateurs actifs",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Video,
    value: "15,000+",
    label: "Campagnes réalisées",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: DollarSign,
    value: "€2.5M+",
    label: "Payés aux créateurs",
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Note moyenne",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-background border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="stat-card text-center animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
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
