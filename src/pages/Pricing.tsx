import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Check,
  Zap,
  Crown,
  Rocket,
  ArrowRight,
} from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 'Gratuit',
    description: 'Pour commencer et tester la plateforme',
    icon: Zap,
    features: [
      '3 campagnes par mois',
      'Accès aux créateurs de base',
      'Chat intégré',
      'Paiements sécurisés',
      'Support par email',
    ],
    cta: 'Commencer gratuitement',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '29 900',
    period: '/mois',
    description: 'Pour les entreprises en croissance',
    icon: Crown,
    features: [
      'Campagnes illimitées',
      'Accès à tous les créateurs',
      'Statistiques avancées',
      'Chat prioritaire',
      'Support 24/7',
      'Badges vendeur vérifié',
      'Tableau de bord analytics',
    ],
    cta: 'Essai gratuit 14 jours',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Sur mesure',
    description: 'Pour les grandes entreprises',
    icon: Rocket,
    features: [
      'Tout inclus dans Pro',
      'Account manager dédié',
      'API personnalisée',
      'Formation équipe',
      'Intégrations sur mesure',
      'SLA garantie',
      'Facturation personnalisée',
    ],
    cta: 'Contactez-nous',
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-6">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium">Tarification simple et transparente</span>
            </div>
            <h1 className="text-display text-foreground mb-4">
              Choisissez votre plan
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Des tarifs adaptés à tous les besoins. Commencez gratuitement et évoluez selon votre croissance.
            </p>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl p-8 ${
                    plan.highlighted
                      ? 'bg-primary text-primary-foreground shadow-glow scale-105'
                      : 'glass'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-success text-success-foreground text-xs font-medium">
                      Plus populaire
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                      plan.highlighted ? 'bg-primary-foreground/20' : 'bg-primary/15'
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 ${
                        plan.highlighted ? 'text-primary-foreground' : 'text-primary'
                      }`}
                    />
                  </div>

                  {/* Name & Price */}
                  <h3 className="text-xl font-display font-semibold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-display font-bold">{plan.price}</span>
                    {plan.period && (
                      <span
                        className={
                          plan.highlighted ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-sm mb-8 ${
                      plan.highlighted ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            plan.highlighted ? 'bg-primary-foreground/20' : 'bg-success/15'
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${
                              plan.highlighted ? 'text-primary-foreground' : 'text-success'
                            }`}
                          />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link to="/auth">
                    <Button
                      className={`w-full ${
                        plan.highlighted
                          ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90'
                          : ''
                      }`}
                      variant={plan.highlighted ? 'default' : 'outline'}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* FAQ teaser */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground">
              Des questions ?{' '}
              <Link to="/contact" className="text-primary hover:underline">
                Contactez notre équipe
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
