import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Search,
  Users,
  Star,
  TrendingUp,
  Eye,
  Sparkles,
} from 'lucide-react';

interface Creator {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  tiktok_username: string | null;
  tiktok_followers: number;
  tiktok_avg_views: number;
  rating_avg: number;
  rating_count: number;
}

const Creators = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchCreators() {
      // Get all users with creator role
      const { data: roles } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'creator');

      if (!roles || roles.length === 0) {
        setCreators([]);
        setLoading(false);
        return;
      }

      const creatorIds = roles.map(r => r.user_id);

      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .in('user_id', creatorIds)
        .order('rating_avg', { ascending: false });

      if (error) {
        console.error('Error:', error);
      } else {
        setCreators(profiles as Creator[]);
      }
      setLoading(false);
    }

    fetchCreators();
  }, []);

  const filteredCreators = creators.filter((creator) =>
    creator.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.tiktok_username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-6">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Communauté de créateurs</span>
            </div>
            <h1 className="text-title text-foreground mb-4">
              Trouvez le créateur idéal
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez des créateurs de contenu talentueux pour promouvoir vos produits sur TikTok
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un créateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 rounded-2xl glass border-border/50 text-base"
              />
            </div>
          </div>

          {/* Creators Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Sparkles className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : filteredCreators.length === 0 ? (
            <div className="text-center py-20 glass rounded-3xl">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                Aucun créateur trouvé
              </h3>
              <p className="text-muted-foreground">
                Revenez bientôt pour découvrir notre communauté
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCreators.map((creator) => (
                <Link
                  key={creator.id}
                  to={`/creators/${creator.user_id}`}
                  className="card-elevated p-6 text-center group"
                >
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-info mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {creator.avatar_url ? (
                      <img
                        src={creator.avatar_url}
                        alt={creator.full_name || 'Créateur'}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <Users className="w-10 h-10 text-white" />
                    )}
                  </div>

                  {/* Info */}
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {creator.full_name || 'Créateur'}
                  </h3>
                  {creator.tiktok_username && (
                    <p className="text-sm text-primary mb-3">
                      @{creator.tiktok_username}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <span className="font-medium">{creator.rating_avg?.toFixed(1) || '0'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4" />
                      <span>{formatNumber(creator.tiktok_followers)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      <span>{formatNumber(creator.tiktok_avg_views)}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  {creator.bio && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {creator.bio}
                    </p>
                  )}
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

export default Creators;
