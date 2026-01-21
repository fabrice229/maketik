import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Users,
  Star,
  MapPin,
  CheckCircle,
  Trophy,
  MessageSquare,
  Calendar,
  Eye,
  TrendingUp,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  country: string | null;
  tiktok_username: string | null;
  tiktok_followers: number;
  tiktok_avg_views: number;
  instagram_username: string | null;
  instagram_followers: number;
  youtube_username: string | null;
  youtube_subscribers: number;
  twitter_username: string | null;
  twitter_followers: number;
  facebook_username: string | null;
  facebook_followers: number;
  rating_avg: number;
  rating_count: number;
  missions_completed: number;
  missions_won: number;
  is_verified: boolean;
  base_price: number;
  created_at: string;
}

interface Rating {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  from_user_id: string;
}

const CreatorProfile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSenior, setIsSenior] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      if (!userId) return;

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(profileData as Profile);
        // Check if senior
        setIsSenior(
          (profileData?.tiktok_followers || 0) >= 1000000 &&
          (profileData?.rating_avg || 0) >= 4.5
        );
      }

      // Fetch ratings
      const { data: ratingsData } = await supabase
        .from('ratings')
        .select('*')
        .eq('to_user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (ratingsData) setRatings(ratingsData);

      setLoading(false);
    }

    fetchProfile();
  }, [userId]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' XOF';
  };

  const renderStars = (rating: number, size: string = 'w-5 h-5') => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} ${
          i < Math.round(rating) ? 'text-primary fill-primary' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const isOwnProfile = user?.id === userId;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-creator animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-display font-semibold text-foreground mb-2">
              Profil non trouvé
            </h1>
            <p className="text-muted-foreground mb-6">
              Ce créateur n'existe pas ou son profil n'est pas disponible.
            </p>
            <Link to="/creators">
              <Button>Voir tous les créateurs</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Header */}
              <div className="glass rounded-3xl p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-creator to-creator/80 flex items-center justify-center">
                      {profile.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt={profile.full_name || 'Créateur'}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <Users className="w-16 h-16 text-white" />
                      )}
                    </div>
                    {profile.is_verified && (
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-success flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-display font-bold text-foreground">
                        {profile.full_name || 'Créateur'}
                      </h1>
                      {isSenior && (
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          Senior
                        </span>
                      )}
                    </div>

                    {profile.tiktok_username && (
                      <p className="text-creator font-medium mb-2">
                        @{profile.tiktok_username}
                      </p>
                    )}

                    {profile.country && (
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{profile.country}</span>
                      </div>
                    )}

                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1">
                        {renderStars(profile.rating_avg)}
                      </div>
                      <span className="text-lg font-semibold text-foreground">
                        {profile.rating_avg?.toFixed(1) || '0'}
                      </span>
                      <span className="text-muted-foreground">
                        ({profile.rating_count} avis)
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      {isOwnProfile ? (
                        <Link to="/profile/edit">
                          <Button className="bg-creator hover:bg-creator/90">
                            Modifier mon profil
                          </Button>
                        </Link>
                      ) : (
                        <>
                          <Button className="bg-creator hover:bg-creator/90">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Contacter
                          </Button>
                          <Button variant="outline" className="border-creator/30 text-creator">
                            Proposer une mission
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                {profile.bio && (
                  <div className="mt-6 pt-6 border-t border-border/50">
                    <h3 className="font-display font-semibold text-foreground mb-2">À propos</h3>
                    <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
                  </div>
                )}
              </div>

              {/* Statistics */}
              <div className="glass rounded-3xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-6">
                  Statistiques de performance
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <Trophy className="w-8 h-8 text-creator mx-auto mb-2" />
                    <p className="text-2xl font-display font-bold text-foreground">
                      {profile.missions_won}
                    </p>
                    <p className="text-sm text-muted-foreground">Missions gagnées</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                    <p className="text-2xl font-display font-bold text-foreground">
                      {profile.missions_completed}
                    </p>
                    <p className="text-sm text-muted-foreground">Missions terminées</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <Eye className="w-8 h-8 text-info mx-auto mb-2" />
                    <p className="text-2xl font-display font-bold text-foreground">
                      {formatNumber(profile.tiktok_avg_views)}
                    </p>
                    <p className="text-sm text-muted-foreground">Vues moyennes</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-display font-bold text-foreground">
                      {new Date(profile.created_at).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                    </p>
                    <p className="text-sm text-muted-foreground">Membre depuis</p>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="glass rounded-3xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-6">
                  Avis des vendeurs
                </h3>
                {ratings.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Aucun avis pour le moment
                  </p>
                ) : (
                  <div className="space-y-4">
                    {ratings.map((rating) => (
                      <div
                        key={rating.id}
                        className="p-4 rounded-xl bg-secondary/30"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {renderStars(rating.rating, 'w-4 h-4')}
                          <span className="text-sm text-muted-foreground ml-2">
                            {new Date(rating.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        {rating.comment && (
                          <p className="text-foreground">{rating.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Base Price */}
              <div className="glass rounded-3xl p-6 text-center">
                <h3 className="font-display font-semibold text-foreground mb-2">
                  Tarif de base
                </h3>
                <p className="text-3xl font-display font-bold text-creator">
                  {formatCurrency(profile.base_price || 0)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Prix de départ pour une vidéo
                </p>
                <p className="text-xs text-muted-foreground mt-4 p-3 rounded-lg bg-secondary/50">
                  💡 5% de frais de plateforme seront appliqués sur le montant final
                </p>
              </div>

              {/* Social Networks */}
              <div className="glass rounded-3xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Réseaux sociaux
                </h3>
                <div className="space-y-3">
                  {profile.tiktok_username && (
                    <a
                      href={`https://tiktok.com/@${profile.tiktok_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">TikTok</p>
                          <p className="text-sm text-muted-foreground">
                            {formatNumber(profile.tiktok_followers)} abonnés
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  )}

                  {profile.instagram_username && (
                    <a
                      href={`https://instagram.com/${profile.instagram_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                          <Instagram className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Instagram</p>
                          <p className="text-sm text-muted-foreground">
                            {formatNumber(profile.instagram_followers)} abonnés
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  )}

                  {profile.youtube_username && (
                    <a
                      href={`https://youtube.com/@${profile.youtube_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                          <Youtube className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">YouTube</p>
                          <p className="text-sm text-muted-foreground">
                            {formatNumber(profile.youtube_subscribers)} abonnés
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  )}

                  {profile.twitter_username && (
                    <a
                      href={`https://x.com/${profile.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                          <Twitter className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">X (Twitter)</p>
                          <p className="text-sm text-muted-foreground">
                            {formatNumber(profile.twitter_followers)} abonnés
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  )}

                  {profile.facebook_username && (
                    <a
                      href={`https://facebook.com/${profile.facebook_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                          <Facebook className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Facebook</p>
                          <p className="text-sm text-muted-foreground">
                            {formatNumber(profile.facebook_followers)} abonnés
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  )}
                </div>
              </div>

              {/* Verified Badge */}
              {profile.is_verified && (
                <div className="glass rounded-3xl p-6 text-center border border-success/30">
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    Profil vérifié
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Les statistiques de ce créateur ont été vérifiées par notre équipe
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreatorProfile;
