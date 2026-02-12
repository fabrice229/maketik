import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useWallet } from '@/hooks/useWallet';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import Logo from '@/components/ui/Logo';
import {
  Zap,
  Plus,
  TrendingUp,
  Users,
  Wallet,
  Lock,
  Star,
  ArrowUpRight,
  MoreHorizontal,
  LogOut,
  BarChart3,
  Megaphone,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  product_name: string;
  budget: number;
  currency: string;
  status: string;
  created_at: string;
}

interface Application {
  id: string;
  status: string;
  creator_id: string;
  campaign_id: string;
  created_at: string;
  profiles: {
    full_name: string;
    avatar_url: string | null;
    rating_avg: number;
  } | null;
  campaigns: {
    title: string;
  } | null;
}

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const { wallet } = useWallet();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth/seller');
      return;
    }

    async function fetchData() {
      // Fetch campaigns
      const { data: campaignsData } = await supabase
        .from('campaigns')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (campaignsData) setCampaigns(campaignsData);

      // Fetch applications for seller's campaigns
      const { data: appsData } = await supabase
        .from('campaign_applications')
        .select(`
          id,
          status,
          creator_id,
          campaign_id,
          created_at,
          profiles:creator_id(full_name, avatar_url, rating_avg),
          campaigns:campaign_id(title)
        `)
        .in('campaign_id', campaignsData?.map(c => c.id) || [])
        .order('created_at', { ascending: false })
        .limit(5);

      if (appsData) setApplications(appsData as unknown as Application[]);
      setLoading(false);
    }

    fetchData();
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="badge-success">Disponible</span>;
      case 'in_progress':
        return <span className="badge-info">En cours</span>;
      case 'completed':
        return <span className="badge-success">Terminée</span>;
      case 'paused':
        return <span className="badge-pending">En pause</span>;
      default:
        return <span className="badge-pending">{status}</span>;
    }
  };

  const formatCurrency = (amount: number, currency: string = 'XOF') => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' ' + currency;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-[260px] bg-card border-r border-border p-6 hidden lg:flex flex-col">
        <Link to="/" className="flex items-center gap-3 mb-8">
          <Logo size="md" />
        </Link>

        <nav className="space-y-1 flex-1">
          {[
            { to: "/dashboard/seller", icon: BarChart3, label: "Tableau de bord", active: true },
            { to: "/campaigns", icon: Megaphone, label: "Mes campagnes", active: false },
            { to: "/creators", icon: Users, label: "Créateurs", active: false },
            { to: "/wallet", icon: Wallet, label: "Portefeuille", active: false },
          ].map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-[12px] text-sidebar transition-colors ${
                item.active
                  ? 'bg-primary/8 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-secondary'
              }`}
            >
              <item.icon className="w-5 h-5" strokeWidth={1.5} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border pt-4">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-2.5 rounded-[12px] text-sidebar text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" strokeWidth={1.5} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-[260px] p-6 lg:p-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-title text-foreground mb-1">
              Bonjour, {profile?.full_name || 'Vendeur'} 👋
            </h1>
            <p className="text-muted-foreground">
              Gérez vos campagnes et suivez vos performances
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/campaigns/new">
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                Nouvelle campagne
              </Button>
            </Link>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-success" />
            </div>
            <p className="text-2xl font-display font-bold text-foreground mb-1">
              {formatCurrency(wallet?.available_balance || 0)}
            </p>
            <p className="text-sm text-muted-foreground">Solde disponible</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-info/15 flex items-center justify-center">
                <Lock className="w-6 h-6 text-info" />
              </div>
            </div>
            <p className="text-2xl font-display font-bold text-foreground mb-1">
              {formatCurrency(wallet?.locked_balance || 0)}
            </p>
            <p className="text-sm text-muted-foreground">Fonds en escrow</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-success/15 flex items-center justify-center">
                <Megaphone className="w-6 h-6 text-success" />
              </div>
            </div>
            <p className="text-2xl font-display font-bold text-foreground mb-1">
              {campaigns.length}
            </p>
            <p className="text-sm text-muted-foreground">Campagnes actives</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-display font-bold text-foreground mb-1">
              {formatCurrency(profile?.total_spent || 0)}
            </p>
            <p className="text-sm text-muted-foreground">Total dépensé</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Campaigns */}
          <div className="lg:col-span-2 glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Campagnes récentes
              </h2>
              <Link to="/campaigns" className="text-primary text-sm font-medium hover:underline">
                Voir tout
              </Link>
            </div>

            {campaigns.length === 0 ? (
              <div className="text-center py-12">
                <Megaphone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Aucune campagne pour le moment</p>
                <Link to="/campaigns/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Créer une campagne
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <Link
                    key={campaign.id}
                    to={`/campaigns/${campaign.id}`}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Megaphone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{campaign.title}</h3>
                        <p className="text-sm text-muted-foreground">{campaign.product_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium text-foreground">
                          {formatCurrency(campaign.budget, campaign.currency)}
                        </p>
                        {getStatusBadge(campaign.status)}
                      </div>
                      <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recent Applications */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Candidatures
              </h2>
            </div>

            {applications.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-sm">
                  Aucune candidature en attente
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {app.profiles?.full_name || 'Créateur'}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {app.campaigns?.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <span className="text-sm font-medium">
                        {app.profiles?.rating_avg?.toFixed(1) || '0'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
