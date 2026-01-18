import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Plus,
  Search,
  Filter,
  Megaphone,
  Clock,
  DollarSign,
  Users,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  description: string | null;
  product_name: string;
  product_category: string | null;
  budget: number;
  currency: string;
  status: string;
  deadline: string | null;
  created_at: string;
  seller_id: string;
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

const Campaigns = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role } = useUserRole();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'Toutes' },
    { value: 'beaute', label: 'Beauté' },
    { value: 'mode', label: 'Mode' },
    { value: 'tech', label: 'Tech' },
    { value: 'food', label: 'Food' },
    { value: 'lifestyle', label: 'Lifestyle' },
  ];

  useEffect(() => {
    async function fetchCampaigns() {
      let query = supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (role === 'seller' && user) {
        query = query.eq('seller_id', user.id);
      } else {
        query = query.eq('status', 'available');
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching campaigns:', error);
      } else if (data) {
        // Fetch seller profiles separately
        const campaignsWithProfiles = await Promise.all(
          data.map(async (campaign) => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('full_name, avatar_url')
              .eq('user_id', campaign.seller_id)
              .maybeSingle();
            return { ...campaign, profiles: profile } as Campaign;
          })
        );
        setCampaigns(campaignsWithProfiles);
      }
      setLoading(false);
    }

    fetchCampaigns();
  }, [user, role]);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || campaign.product_category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount: number, currency: string = 'XOF') => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' ' + currency;
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-title text-foreground mb-2">
                {role === 'seller' ? 'Mes campagnes' : 'Campagnes disponibles'}
              </h1>
              <p className="text-muted-foreground">
                {role === 'seller'
                  ? 'Gérez vos campagnes publicitaires'
                  : 'Trouvez des opportunités de collaboration'}
              </p>
            </div>
            {role === 'seller' && (
              <Link to="/campaigns/new">
                <Button className="shadow-glow">
                  <Plus className="w-5 h-5 mr-2" />
                  Nouvelle campagne
                </Button>
              </Link>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une campagne..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 rounded-xl glass border-border/50"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === cat.value
                      ? 'bg-primary text-primary-foreground'
                      : 'glass text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Campaigns Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Sparkles className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : filteredCampaigns.length === 0 ? (
            <div className="text-center py-20 glass rounded-3xl">
              <Megaphone className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                Aucune campagne trouvée
              </h3>
              <p className="text-muted-foreground mb-6">
                {role === 'seller'
                  ? 'Créez votre première campagne pour commencer'
                  : 'Revenez bientôt pour découvrir de nouvelles opportunités'}
              </p>
              {role === 'seller' && (
                <Link to="/campaigns/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Créer une campagne
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <Link
                  key={campaign.id}
                  to={`/campaigns/${campaign.id}`}
                  className="card-elevated p-6 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Megaphone className="w-7 h-7 text-primary" />
                    </div>
                    {getStatusBadge(campaign.status)}
                  </div>

                  <h3 className="text-lg font-display font-semibold text-foreground mb-2 line-clamp-1">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {campaign.description || campaign.product_name}
                  </p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      {formatCurrency(campaign.budget, campaign.currency)}
                    </div>
                    {campaign.deadline && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {new Date(campaign.deadline).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {campaign.profiles?.full_name || 'Vendeur'}
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Campaigns;
