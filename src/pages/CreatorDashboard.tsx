import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useWallet } from '@/hooks/useWallet';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import {
  Zap,
  TrendingUp,
  Users,
  Wallet,
  Star,
  ArrowUpRight,
  LogOut,
  BarChart3,
  Megaphone,
  Eye,
  MessageSquare,
  Trophy,
  CheckCircle,
  Clock,
  XCircle,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
} from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  product_name: string;
  budget: number;
  currency: string;
  status: string;
  deadline: string;
  seller_id: string;
}

interface Application {
  id: string;
  status: string;
  campaign_id: string;
  proposed_price: number;
  created_at: string;
}

interface Transaction {
  id: string;
  amount: number;
  fee_amount: number;
  transaction_type: string;
  status: string;
  created_at: string;
  description: string;
}

const CreatorDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const { wallet } = useWallet();
  const [availableCampaigns, setAvailableCampaigns] = useState<Campaign[]>([]);
  const [myApplications, setMyApplications] = useState<Application[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth/creator');
      return;
    }

    async function fetchData() {
      // Fetch available campaigns
      const { data: campaignsData } = await supabase
        .from('campaigns')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false })
        .limit(6);

      if (campaignsData) setAvailableCampaigns(campaignsData);

      // Fetch my applications
      const { data: appsData } = await supabase
        .from('campaign_applications')
        .select('*')
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (appsData) setMyApplications(appsData);

      // Fetch transactions (earnings)
      const { data: transData } = await supabase
        .from('transactions')
        .select('*')
        .eq('to_user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (transData) setTransactions(transData);

      setLoading(false);
    }

    fetchData();
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const formatCurrency = (amount: number, currency: string = 'XOF') => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' ' + currency;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <span className="badge-success">Acceptée</span>;
      case 'pending':
        return <span className="badge-pending">En attente</span>;
      case 'rejected':
        return <span className="badge-destructive">Refusée</span>;
      case 'completed':
        return <span className="badge-success">Terminée</span>;
      default:
        return <span className="badge-pending">{status}</span>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.round(rating) ? 'text-primary fill-primary' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 glass-strong border-r border-border/30 p-6 hidden lg:block">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-creator to-creator/80 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">CreatorHub</span>
        </div>

        <nav className="space-y-2">
          <Link
            to="/dashboard/creator"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-creator/10 text-creator font-medium"
          >
            <BarChart3 className="w-5 h-5" />
            Tableau de bord
          </Link>
          <Link
            to="/campaigns"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary transition-colors"
          >
            <Megaphone className="w-5 h-5" />
            Campagnes
          </Link>
          <Link
            to="/messages"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            Messages
          </Link>
          <Link
            to="/wallet"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary transition-colors"
          >
            <Wallet className="w-5 h-5" />
            Portefeuille
          </Link>
          <Link
            to={`/profile/${user?.id}`}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary transition-colors"
          >
            <Users className="w-5 h-5" />
            Mon profil
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-72 p-6 lg:p-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-title text-foreground mb-1">
              Bonjour, {profile?.full_name || 'Créateur'} 👋
            </h1>
            <p className="text-muted-foreground">
              Découvrez de nouvelles opportunités et gérez vos missions
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to={`/profile/${user?.id}`}>
              <Button variant="outline" className="border-creator/30 text-creator hover:bg-creator/10">
                Voir mon profil
              </Button>
            </Link>
          </div>
        </header>

        {/* Profile Stats Card */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-creator to-creator/80 flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name || 'Profil'}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Users className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground">
                  {profile?.full_name || 'Créateur'}
                </h2>
                <div className="flex items-center gap-1 mt-1">
                  {renderStars(profile?.rating_avg || 0)}
                  <span className="text-sm text-muted-foreground ml-2">
                    ({profile?.rating_count || 0} avis)
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {profile?.is_verified && (
                <span className="badge-success flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Vérifié
                </span>
              )}
              {(profile?.tiktok_followers || 0) >= 1000000 && (profile?.rating_avg || 0) >= 4.5 && (
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  Senior
                </span>
              )}
            </div>
          </div>

          {/* Social Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <div className="w-10 h-10 rounded-full bg-[#000000] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">
                  {formatNumber(profile?.tiktok_followers || 0)}
                </p>
                <p className="text-xs text-muted-foreground">TikTok</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">
                  {formatNumber(profile?.instagram_followers || 0)}
                </p>
                <p className="text-xs text-muted-foreground">Instagram</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                <Youtube className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">
                  {formatNumber(profile?.youtube_subscribers || 0)}
                </p>
                <p className="text-xs text-muted-foreground">YouTube</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <Twitter className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">
                  {formatNumber(profile?.twitter_followers || 0)}
                </p>
                <p className="text-xs text-muted-foreground">X</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <Facebook className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">
                  {formatNumber(profile?.facebook_followers || 0)}
                </p>
                <p className="text-xs text-muted-foreground">Facebook</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-creator/15 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-creator" />
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
              <div className="w-12 h-12 rounded-xl bg-success/15 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
            <p className="text-2xl font-display font-bold text-foreground mb-1">
              {formatCurrency(profile?.total_earned || 0)}
            </p>
            <p className="text-sm text-muted-foreground">Total gagné</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-info/15 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-info" />
              </div>
            </div>
            <p className="text-2xl font-display font-bold text-foreground mb-1">
              {profile?.missions_won || 0}
            </p>
            <p className="text-sm text-muted-foreground">Missions gagnées</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-display font-bold text-foreground mb-1">
              {formatNumber(profile?.tiktok_avg_views || 0)}
            </p>
            <p className="text-sm text-muted-foreground">Vues moyennes</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Campaigns */}
          <div className="lg:col-span-2 glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Campagnes disponibles
              </h2>
              <Link to="/campaigns" className="text-creator text-sm font-medium hover:underline">
                Voir tout
              </Link>
            </div>

            {availableCampaigns.length === 0 ? (
              <div className="text-center py-12">
                <Megaphone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucune campagne disponible pour le moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableCampaigns.map((campaign) => (
                  <Link
                    key={campaign.id}
                    to={`/campaigns/${campaign.id}`}
                    className="p-4 rounded-xl border border-border/50 hover:border-creator/50 hover:bg-creator/5 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-medium text-foreground line-clamp-1">{campaign.title}</h3>
                      <span className="text-creator font-semibold text-sm">
                        {formatCurrency(campaign.budget, campaign.currency)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{campaign.product_name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>
                        {campaign.deadline
                          ? new Date(campaign.deadline).toLocaleDateString('fr-FR')
                          : 'Sans limite'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* My Applications */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Mes candidatures
              </h2>
            </div>

            {myApplications.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-sm">Aucune candidature</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myApplications.map((app) => (
                  <Link
                    key={app.id}
                    to={`/campaigns/${app.campaign_id}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground mb-1">
                        {formatCurrency(app.proposed_price || 0)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(app.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    {getStatusBadge(app.status)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Earnings History */}
        <div className="mt-8 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold text-foreground">
              Historique des gains
            </h2>
            <p className="text-sm text-muted-foreground">
              Commission plateforme : 5%
            </p>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucune transaction pour le moment</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{tx.description || 'Paiement'}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(tx.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-success">
                      +{formatCurrency(tx.amount - tx.fee_amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Frais: {formatCurrency(tx.fee_amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreatorDashboard;
