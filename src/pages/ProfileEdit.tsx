import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  Save,
  Camera,
  MapPin,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Building2,
  Sparkles,
} from 'lucide-react';

const countries = [
  'Bénin', 'Burkina Faso', 'Cameroun', 'Côte d\'Ivoire', 'Gabon',
  'Ghana', 'Guinée', 'Mali', 'Niger', 'Nigeria', 'Sénégal', 'Togo', 'Autre'
];

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  const { role } = useUserRole();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    bio: '',
    country: '',
    tiktok_username: '',
    tiktok_followers: 0,
    tiktok_avg_views: 0,
    instagram_username: '',
    instagram_followers: 0,
    youtube_username: '',
    youtube_subscribers: 0,
    twitter_username: '',
    twitter_followers: 0,
    facebook_username: '',
    facebook_followers: 0,
    base_price: 0,
    company_name: '',
    company_type: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        country: profile.country || '',
        tiktok_username: profile.tiktok_username || '',
        tiktok_followers: profile.tiktok_followers || 0,
        tiktok_avg_views: profile.tiktok_avg_views || 0,
        instagram_username: profile.instagram_username || '',
        instagram_followers: profile.instagram_followers || 0,
        youtube_username: profile.youtube_username || '',
        youtube_subscribers: profile.youtube_subscribers || 0,
        twitter_username: profile.twitter_username || '',
        twitter_followers: profile.twitter_followers || 0,
        facebook_username: profile.facebook_username || '',
        facebook_followers: profile.facebook_followers || 0,
        base_price: profile.base_price || 0,
        company_name: profile.company_name || '',
        company_type: profile.company_type || '',
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await updateProfile(formData);

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le profil',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Profil mis à jour',
        description: 'Vos modifications ont été enregistrées',
      });
      navigate(`/profile/${user?.id}`);
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const isCreator = role === 'creator';
  const isSeller = role === 'seller';

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="glass rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${isCreator ? 'from-creator to-creator/80' : 'from-seller to-seller/80'} flex items-center justify-center`}>
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name || 'Profil'}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <Users className="w-10 h-10 text-white" />
                  )}
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-foreground">
                  Modifier mon profil
                </h1>
                <p className="text-muted-foreground">
                  {isCreator ? 'Profil créateur' : 'Profil vendeur'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info */}
              <div className="space-y-4">
                <h2 className="text-lg font-display font-semibold text-foreground">
                  Informations générales
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Nom complet</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+229 XX XX XX XX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre pays" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biographie</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Décrivez-vous en quelques mots..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Company Info (for sellers/agencies) */}
              {isSeller && (
                <div className="space-y-4 pt-6 border-t border-border/50">
                  <h2 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Informations entreprise / Agence
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company_name">Nom de l'entreprise</Label>
                      <Input
                        id="company_name"
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_type">Type</Label>
                      <Select
                        value={formData.company_type}
                        onValueChange={(value) => setFormData({ ...formData, company_type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Type d'entreprise" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individuel</SelectItem>
                          <SelectItem value="startup">Startup</SelectItem>
                          <SelectItem value="pme">PME</SelectItem>
                          <SelectItem value="agency">Agence de marketing</SelectItem>
                          <SelectItem value="enterprise">Grande entreprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Social Networks (for creators) */}
              {isCreator && (
                <>
                  <div className="space-y-4 pt-6 border-t border-border/50">
                    <h2 className="text-lg font-display font-semibold text-foreground">
                      Réseaux sociaux
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Vos statistiques seront vérifiées par notre équipe
                    </p>
                    
                    {/* TikTok */}
                    <div className="glass p-4 rounded-xl space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                          </svg>
                        </div>
                        <span className="font-medium text-foreground">TikTok</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Nom d'utilisateur</Label>
                          <Input
                            value={formData.tiktok_username}
                            onChange={(e) => setFormData({ ...formData, tiktok_username: e.target.value })}
                            placeholder="@username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Abonnés</Label>
                          <Input
                            type="number"
                            value={formData.tiktok_followers}
                            onChange={(e) => setFormData({ ...formData, tiktok_followers: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Vues moyennes</Label>
                          <Input
                            type="number"
                            value={formData.tiktok_avg_views}
                            onChange={(e) => setFormData({ ...formData, tiktok_avg_views: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Instagram */}
                    <div className="glass p-4 rounded-xl space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                          <Instagram className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-foreground">Instagram</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nom d'utilisateur</Label>
                          <Input
                            value={formData.instagram_username}
                            onChange={(e) => setFormData({ ...formData, instagram_username: e.target.value })}
                            placeholder="@username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Abonnés</Label>
                          <Input
                            type="number"
                            value={formData.instagram_followers}
                            onChange={(e) => setFormData({ ...formData, instagram_followers: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* YouTube */}
                    <div className="glass p-4 rounded-xl space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                          <Youtube className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-foreground">YouTube</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nom de chaîne</Label>
                          <Input
                            value={formData.youtube_username}
                            onChange={(e) => setFormData({ ...formData, youtube_username: e.target.value })}
                            placeholder="@channel"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Abonnés</Label>
                          <Input
                            type="number"
                            value={formData.youtube_subscribers}
                            onChange={(e) => setFormData({ ...formData, youtube_subscribers: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Twitter */}
                    <div className="glass p-4 rounded-xl space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                          <Twitter className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-foreground">X (Twitter)</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nom d'utilisateur</Label>
                          <Input
                            value={formData.twitter_username}
                            onChange={(e) => setFormData({ ...formData, twitter_username: e.target.value })}
                            placeholder="@username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Abonnés</Label>
                          <Input
                            type="number"
                            value={formData.twitter_followers}
                            onChange={(e) => setFormData({ ...formData, twitter_followers: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Facebook */}
                    <div className="glass p-4 rounded-xl space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                          <Facebook className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-foreground">Facebook</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nom de page</Label>
                          <Input
                            value={formData.facebook_username}
                            onChange={(e) => setFormData({ ...formData, facebook_username: e.target.value })}
                            placeholder="Page name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Abonnés</Label>
                          <Input
                            type="number"
                            value={formData.facebook_followers}
                            onChange={(e) => setFormData({ ...formData, facebook_followers: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-4 pt-6 border-t border-border/50">
                    <h2 className="text-lg font-display font-semibold text-foreground">
                      Tarification
                    </h2>
                    <div className="space-y-2">
                      <Label htmlFor="base_price">Prix de base (XOF)</Label>
                      <Input
                        id="base_price"
                        type="number"
                        value={formData.base_price}
                        onChange={(e) => setFormData({ ...formData, base_price: parseInt(e.target.value) || 0 })}
                        placeholder="Ex: 50000"
                      />
                      <p className="text-sm text-muted-foreground">
                        Ce montant sera affiché comme tarif de départ. Les vendeurs seront notifiés de ce prix lors de la prise de contact.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfileEdit;
