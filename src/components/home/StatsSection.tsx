import { DollarSign, Users, Video, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "2,500+",
    label: "Créateurs actifs",
    color: "text-primary",
    bgColor: "bg-primary/15",
  },
  {
    icon: Video,
    value: "15,000+",
    label: "Campagnes réalisées",
    color: "text-success",
    bgColor: "bg-success/15",
  },
  {
    icon: DollarSign,
    value: "€2.5M+",
    label: "Payés aux créateurs",
    color: "text-info",
    bgColor: "bg-info/15",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Note moyenne",
    color: "text-amber-500",
    bgColor: "bg-amber-500/15",
  },
];

const StatsSection = () => {
  return (
    <section className="py-24 bg-background relative">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="stat-card text-center group animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
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
