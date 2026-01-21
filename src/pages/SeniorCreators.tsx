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
  Trophy,
  CheckCircle,
  Crown,
} from 'lucide-react';

interface Creator {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  country: string | null;
  tiktok_username: string | null;
  tiktok_followers: number;
  tiktok_avg_views: number;
  rating_avg: number;
  rating_count: number;
  missions_won: number;
  is_verified: boolean;
}

const SeniorCreators = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchSeniorCreators() {
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

      // Fetch profiles that meet senior criteria (1M+ followers AND 4.5+ rating)
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .in('user_id', creatorIds)
        .gte('tiktok_followers', 1000000)
        .gte('rating_avg', 4.5)
        .order('tiktok_followers', { ascending: false });

      if (error) {
        console.error('Error:', error);
      } else {
        setCreators(profiles as Creator[]);
      }
      setLoading(false);
    }

    fetchSeniorCreators();
  }, []);

  const filteredCreators = creators.filter((creator) =>
    creator.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.tiktok_username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.round(rating) ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-6">
              <Crown className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Créateurs d'élite</span>
            </div>
            <h1 className="text-title text-foreground mb-4">
              Créateurs Senior
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos créateurs les plus performants avec plus d'1 million d'abonnés et une note exceptionnelle
            </p>
          </div>

          {/* Criteria Banner */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="glass rounded-2xl p-6 border border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-xl font-display font-bold text-foreground">1M+</p>
                  <p className="text-sm text-muted-foreground">Abonnés TikTok</p>
                </div>
                <div className="text-3xl text-muted-foreground">+</div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-2">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-xl font-display font-bold text-foreground">4.5+</p>
                  <p className="text-sm text-muted-foreground">Note moyenne</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un créateur senior..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 rounded-2xl glass border-amber-500/30 text-base"
              />
            </div>
          </div>

          {/* Creators Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Sparkles className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
          ) : filteredCreators.length === 0 ? (
            <div className="text-center py-20 glass rounded-3xl border border-amber-500/20">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                Aucun créateur senior trouvé
              </h3>
              <p className="text-muted-foreground">
                Les créateurs atteignant 1M+ abonnés avec 4.5+ étoiles apparaîtront ici
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCreators.map((creator) => (
                <Link
                  key={creator.id}
                  to={`/profile/${creator.user_id}`}
                  className="glass rounded-3xl p-6 border border-amber-500/20 hover:border-amber-500/50 transition-all group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
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
                      {creator.is_verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-success flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      Senior
                    </span>
                  </div>

                  {/* Info */}
                  <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                    {creator.full_name || 'Créateur'}
                  </h3>
                  {creator.tiktok_username && (
                    <p className="text-sm text-amber-600 dark:text-amber-400 mb-2">
                      @{creator.tiktok_username}
                    </p>
                  )}
                  {creator.country && (
                    <p className="text-sm text-muted-foreground mb-3">
                      📍 {creator.country}
                    </p>
                  )}

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-0.5">
                      {renderStars(creator.rating_avg)}
                    </div>
                    <span className="font-semibold text-foreground">
                      {creator.rating_avg?.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({creator.rating_count} avis)
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 rounded-lg bg-secondary/50">
                      <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 mb-1">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        {formatNumber(creator.tiktok_followers)}
                      </p>
                      <p className="text-xs text-muted-foreground">Abonnés</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-secondary/50">
                      <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 mb-1">
                        <Eye className="w-4 h-4" />
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        {formatNumber(creator.tiktok_avg_views)}
                      </p>
                      <p className="text-xs text-muted-foreground">Vues moy.</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-secondary/50">
                      <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 mb-1">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        {creator.missions_won}
                      </p>
                      <p className="text-xs text-muted-foreground">Missions</p>
                    </div>
                  </div>

                  {/* Bio */}
                  {creator.bio && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-4 pt-4 border-t border-border/50">
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

export default SeniorCreators;
