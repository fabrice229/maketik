import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useToast } from '@/hooks/use-toast';
import { 
  Zap, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowRight, 
  Sparkles,
  Store,
  CheckCircle,
  TrendingUp,
  Shield,
  ArrowLeft
} from 'lucide-react';
import { z } from 'zod';
import sellerHero from '@/assets/seller-hero.jpg';

const signUpSchema = z.object({
  email: z.string().email('Email invalide').max(255),
  password: z.string().min(6, 'Minimum 6 caractères').max(100),
  fullName: z.string().min(2, 'Minimum 2 caractères').max(100),
  phone: z.string().min(8, 'Numéro invalide').max(20),
});

const signInSchema = z.object({
  email: z.string().email('Email invalide').max(255),
  password: z.string().min(1, 'Mot de passe requis').max(100),
});

type AuthMode = 'signin' | 'signup';

const features = [
  { icon: TrendingUp, text: "Boostez vos ventes avec TikTok" },
  { icon: Shield, text: "Paiements 100% sécurisés" },
  { icon: CheckCircle, text: "Créateurs vérifiés" },
];

const AuthSeller = () => {
  const navigate = useNavigate();
  const { signUp, signIn, setUserRole } = useAuth();
  const { toast } = useToast();
  
  const [mode, setMode] = useState<AuthMode>('signin');
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    setErrors({});
    
    try {
      if (mode === 'signup') {
        signUpSchema.parse({ email, password, fullName, phone });
      } else {
        signInSchema.parse({ email, password });
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await signUp(email, password, fullName, phone);
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: 'Compte existant',
              description: 'Un compte existe déjà avec cet email. Connectez-vous.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Erreur d\'inscription',
              description: error.message,
              variant: 'destructive',
            });
          }
          return;
        }
        
        // Set role as seller
        await setUserRole('seller');
        
        toast({
          title: 'Bienvenue !',
          description: 'Votre compte vendeur a été créé avec succès.',
        });
        navigate('/dashboard/seller');
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: 'Erreur de connexion',
            description: 'Email ou mot de passe incorrect.',
            variant: 'destructive',
          });
        } else {
          navigate('/dashboard/seller');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24 bg-background relative">
        {/* Header */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Retour</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="mb-10">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-seller to-seller/80 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-display font-bold text-foreground block">Espace Vendeur</span>
                <span className="text-xs text-muted-foreground">MakeTik</span>
              </div>
            </Link>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              {mode === 'signin' ? 'Bon retour !' : 'Créez votre boutique'}
            </h1>
            <p className="text-muted-foreground">
              {mode === 'signin' 
                ? 'Connectez-vous pour accéder à votre tableau de bord' 
                : 'Rejoignez des milliers de vendeurs sur MakeTik'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-form">Nom complet</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-12 h-12 rounded-xl border-border focus:border-seller focus:ring-seller/30"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-form">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-12 h-12 rounded-xl border-border focus:border-seller focus:ring-seller/30"
                      placeholder="+225 07 00 00 00"
                    />
                  </div>
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-form">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 rounded-xl border-border focus:border-seller focus:ring-seller/30"
                  placeholder="vous@exemple.com"
                />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-form">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-12 rounded-xl border-border focus:border-seller focus:ring-seller/30"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl text-base font-medium bg-seller hover:bg-seller/90"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Chargement...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {mode === 'signin' ? 'Se connecter' : 'Créer mon compte'}
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-muted-foreground hover:text-foreground transition-colors text-form"
            >
              {mode === 'signin' ? 'Pas de compte ? ' : 'Déjà un compte ? '}
              <span className="text-seller font-medium">
                {mode === 'signin' ? 'Inscrivez-vous' : 'Connectez-vous'}
              </span>
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <Link to="/auth/creator" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-creator transition-colors">
              <Zap className="w-4 h-4" />
              <span>Vous êtes créateur ? Connectez-vous ici</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Image & Features */}
      <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-seller/10 via-seller/5 to-background overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        
        {/* Floating shapes */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-seller/20 rounded-full blur-[100px] floating" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-seller/10 rounded-full blur-[80px] floating" style={{ animationDelay: '2s' }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center p-12 xl:p-20">
          {/* Image */}
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 rounded-3xl" />
            <img 
              src={sellerHero} 
              alt="Vendeur utilisant CreatorHub" 
              className="w-full max-w-lg rounded-3xl shadow-2xl object-cover aspect-[4/5]"
            />
          </div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl glass animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-seller/15 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-seller" />
                </div>
                <span className="text-foreground font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSeller;
