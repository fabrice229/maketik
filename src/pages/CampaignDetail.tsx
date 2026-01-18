import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RatingModal from '@/components/ratings/RatingModal';
import {
  ArrowLeft,
  Megaphone,
  DollarSign,
  Clock,
  Users,
  Star,
  CheckCircle,
  XCircle,
  MessageSquare,
  Send,
  Sparkles,
  Tag,
  FileText,
} from 'lucide-react';

interface Campaign {
  id: string;
  seller_id: string;
  title: string;
  description: string | null;
  product_name: string;
  product_category: string | null;
  budget: number;
  currency: string;
  requirements: string | null;
  deadline: string | null;
  status: string;
  created_at: string;
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
    rating_avg: number;
    rating_count: number;
  };
}

interface Application {
  id: string;
  creator_id: string;
  status: string;
  proposed_price: number | null;
  message: string | null;
  created_at: string;
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
    rating_avg: number;
    tiktok_followers: number;
  };
}

const CampaignDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role } = useUserRole();
  const { toast } = useToast();

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [myApplication, setMyApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingTarget, setRatingTarget] = useState<{ userId: string; name: string } | null>(null);

  const [applicationMessage, setApplicationMessage] = useState('');
  const [proposedPrice, setProposedPrice] = useState('');

  const isOwner = user && campaign?.seller_id === user.id;

  useEffect(() => {
    if (!id) return;

    async function fetchCampaign() {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error:', error);
        navigate('/campaigns');
        return;
      }

      // Fetch seller profile separately
      const { data: sellerProfile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url, rating_avg, rating_count')
        .eq('user_id', data.seller_id)
        .maybeSingle();

      setCampaign({ ...data, profiles: sellerProfile } as Campaign);

      // Fetch applications
      const { data: appsData } = await supabase
        .from('campaign_applications')
        .select('*')
        .eq('campaign_id', id)
        .order('created_at', { ascending: false });

      if (appsData) {
        // Fetch creator profiles for each application
        const appsWithProfiles = await Promise.all(
          appsData.map(async (app) => {
            const { data: creatorProfile } = await supabase
              .from('profiles')
              .select('full_name, avatar_url, rating_avg, tiktok_followers')
              .eq('user_id', app.creator_id)
              .maybeSingle();
            return { ...app, profiles: creatorProfile } as Application;
          })
        );
        setApplications(appsWithProfiles);
        if (user) {
          const myApp = appsWithProfiles.find((app) => app.creator_id === user.id);
          setMyApplication(myApp || null);
        }
      }

      setLoading(false);
    }

    fetchCampaign();
  }, [id, user, navigate]);

  const handleApply = async () => {
    if (!user || !campaign) return;

    setApplying(true);

    try {
      const { error } = await supabase.from('campaign_applications').insert({
        campaign_id: campaign.id,
        creator_id: user.id,
        message: applicationMessage,
        proposed_price: proposedPrice ? Number(proposedPrice) : null,
        status: 'pending',
      });

      if (error) throw error;

      toast({
        title: 'Candidature envoyée !',
        description: 'Le vendeur va examiner votre profil.',
      });

      // Refresh applications
      const { data: newApp } = await supabase
        .from('campaign_applications')
        .select('*')
        .eq('campaign_id', campaign.id)
        .eq('creator_id', user.id)
        .single();

      setMyApplication(newApp as Application);
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de postuler.',
        variant: 'destructive',
      });
    } finally {
      setApplying(false);
    }
  };

  const handleApplicationAction = async (applicationId: string, action: 'accepted' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('campaign_applications')
        .update({ status: action })
        .eq('id', applicationId);

      if (error) throw error;

      toast({
        title: action === 'accepted' ? 'Candidature acceptée' : 'Candidature refusée',
      });

      // Refresh
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: action } : app
        )
      );
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const openRatingModal = (userId: string, name: string) => {
    setRatingTarget({ userId, name });
    setShowRatingModal(true);
  };

  const formatCurrency = (amount: number, currency: string = 'XOF') => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' ' + currency;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!campaign) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Campaign header */}
              <div className="glass rounded-3xl p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <Megaphone className="w-10 h-10 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-display font-bold text-foreground mb-2">
                      {campaign.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        {formatCurrency(campaign.budget, campaign.currency)}
                      </span>
                      {campaign.deadline && (
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {new Date(campaign.deadline).toLocaleDateString('fr-FR')}
                        </span>
                      )}
                      {campaign.product_category && (
                        <span className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          {campaign.product_category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Description
                    </h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {campaign.description}
                    </p>
                  </div>

                  {campaign.requirements && (
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Exigences</h3>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {campaign.requirements}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Applications (for seller) */}
              {isOwner && (
                <div className="glass rounded-3xl p-8">
                  <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                    Candidatures ({applications.length})
                  </h2>

                  {applications.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Aucune candidature pour le moment</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((app) => (
                        <div
                          key={app.id}
                          className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
                                <Users className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium text-foreground">
                                  {app.profiles?.full_name || 'Créateur'}
                                </h4>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-primary fill-primary" />
                                    {app.profiles?.rating_avg?.toFixed(1) || '0'}
                                  </span>
                                  <span>
                                    {app.profiles?.tiktok_followers?.toLocaleString() || '0'} abonnés
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {app.status === 'pending' ? (
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleApplicationAction(app.id, 'accepted')}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Accepter
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleApplicationAction(app.id, 'rejected')}
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Refuser
                                </Button>
                              </div>
                            ) : app.status === 'accepted' ? (
                              <div className="flex items-center gap-2">
                                <span className="badge-success">Accepté</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openRatingModal(app.creator_id, app.profiles?.full_name || 'Créateur')}
                                >
                                  <Star className="w-4 h-4 mr-1" />
                                  Noter
                                </Button>
                              </div>
                            ) : (
                              <span className="badge-pending">Refusé</span>
                            )}
                          </div>

                          {app.message && (
                            <p className="text-sm text-muted-foreground bg-background/50 rounded-lg p-3">
                              {app.message}
                            </p>
                          )}

                          {app.proposed_price && (
                            <p className="text-sm text-primary mt-2">
                              Prix proposé: {formatCurrency(app.proposed_price)}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Seller info */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Vendeur</h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {campaign.profiles?.full_name || 'Vendeur'}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      {campaign.profiles?.rating_avg?.toFixed(1) || '0'}
                      <span>({campaign.profiles?.rating_count || 0} avis)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Apply section (for creators) */}
              {role === 'creator' && !isOwner && campaign.status === 'available' && (
                <div className="glass rounded-2xl p-6">
                  {myApplication ? (
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                      <h3 className="font-display font-semibold text-foreground mb-2">
                        Candidature envoyée
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Statut: {myApplication.status === 'pending' ? 'En attente' : 
                                 myApplication.status === 'accepted' ? 'Acceptée' : 'Refusée'}
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-display font-semibold text-foreground mb-4">
                        Postuler à cette campagne
                      </h3>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Présentez-vous et expliquez pourquoi vous êtes le bon créateur pour cette campagne..."
                          value={applicationMessage}
                          onChange={(e) => setApplicationMessage(e.target.value)}
                          className="min-h-24 rounded-xl glass border-border/50"
                        />
                        <Input
                          type="number"
                          placeholder="Prix proposé (optionnel)"
                          value={proposedPrice}
                          onChange={(e) => setProposedPrice(e.target.value)}
                          className="h-12 rounded-xl glass border-border/50"
                        />
                        <Button
                          onClick={handleApply}
                          className="w-full shadow-glow"
                          disabled={applying || !applicationMessage.trim()}
                        >
                          {applying ? (
                            <Sparkles className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              Envoyer ma candidature
                            </>
                          )}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {!user && (
                <div className="glass rounded-2xl p-6 text-center">
                  <p className="text-muted-foreground mb-4">
                    Connectez-vous pour postuler à cette campagne
                  </p>
                  <Link to="/auth">
                    <Button className="w-full">Se connecter</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Rating Modal */}
      {showRatingModal && ratingTarget && campaign && (
        <RatingModal
          isOpen={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          campaignId={campaign.id}
          toUserId={ratingTarget.userId}
          toUserName={ratingTarget.name}
        />
      )}
    </div>
  );
};

export default CampaignDetail;
