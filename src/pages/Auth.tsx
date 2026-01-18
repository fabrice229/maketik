import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Video
} from 'lucide-react';
import { z } from 'zod';

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
type RoleSelection = 'seller' | 'creator' | null;

const Auth = () => {
  const navigate = useNavigate();
  const { user, signUp, signIn, setUserRole } = useAuth();
  const { toast } = useToast();
  
  const [mode, setMode] = useState<AuthMode>('signin');
  const [step, setStep] = useState<'auth' | 'role'>('auth');
  const [selectedRole, setSelectedRole] = useState<RoleSelection>(null);
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user && step === 'auth') {
      setStep('role');
    }
  }, [user, step]);

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
        } else {
          toast({
            title: 'Bienvenue !',
            description: 'Votre compte a été créé avec succès.',
          });
          setStep('role');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: 'Erreur de connexion',
            description: 'Email ou mot de passe incorrect.',
            variant: 'destructive',
          });
        } else {
          setStep('role');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelection = async () => {
    if (!selectedRole) return;
    
    setLoading(true);
    
    try {
      const { error } = await setUserRole(selectedRole);
      if (error) {
        // Role might already exist, which is fine
        if (!error.message.includes('duplicate')) {
          toast({
            title: 'Erreur',
            description: 'Impossible de définir votre rôle.',
            variant: 'destructive',
          });
          return;
        }
      }
      
      navigate(selectedRole === 'seller' ? '/dashboard/seller' : '/dashboard/creator');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero bg-grid-pattern flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] floating" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-info/10 rounded-full blur-[100px] floating" style={{ animationDelay: '2s' }} />
      </div>

      {/* Theme toggle */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-glow">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold text-foreground">CreatorHub</span>
          </div>
          <p className="text-muted-foreground">
            {step === 'auth' 
              ? (mode === 'signin' ? 'Connectez-vous à votre compte' : 'Créez votre compte')
              : 'Choisissez votre profil'
            }
          </p>
        </div>

        {step === 'auth' ? (
          <div className="glass rounded-3xl p-8 shadow-xl">
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
                        className="pl-12 h-12 rounded-xl glass border-border/50 focus:border-primary"
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
                        className="pl-12 h-12 rounded-xl glass border-border/50 focus:border-primary"
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
                    className="pl-12 h-12 rounded-xl glass border-border/50 focus:border-primary"
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
                    className="pl-12 h-12 rounded-xl glass border-border/50 focus:border-primary"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl shadow-glow text-base font-medium"
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
                <span className="text-primary font-medium">
                  {mode === 'signin' ? 'Inscrivez-vous' : 'Connectez-vous'}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="glass rounded-3xl p-8 shadow-xl">
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setSelectedRole('seller')}
                className={`w-full p-6 rounded-2xl transition-all duration-300 flex items-center gap-4 ${
                  selectedRole === 'seller'
                    ? 'bg-primary/15 border-2 border-primary'
                    : 'glass border border-border/50 hover:border-primary/50'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  selectedRole === 'seller' ? 'bg-primary' : 'bg-primary/15'
                }`}>
                  <Store className={`w-7 h-7 ${selectedRole === 'seller' ? 'text-primary-foreground' : 'text-primary'}`} />
                </div>
                <div className="text-left">
                  <h3 className="font-display font-semibold text-lg text-foreground">Je suis vendeur</h3>
                  <p className="text-muted-foreground text-sm">Publiez vos produits et collaborez avec des créateurs</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('creator')}
                className={`w-full p-6 rounded-2xl transition-all duration-300 flex items-center gap-4 ${
                  selectedRole === 'creator'
                    ? 'bg-primary/15 border-2 border-primary'
                    : 'glass border border-border/50 hover:border-primary/50'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  selectedRole === 'creator' ? 'bg-primary' : 'bg-info/15'
                }`}>
                  <Video className={`w-7 h-7 ${selectedRole === 'creator' ? 'text-primary-foreground' : 'text-info'}`} />
                </div>
                <div className="text-left">
                  <h3 className="font-display font-semibold text-lg text-foreground">Je suis créateur</h3>
                  <p className="text-muted-foreground text-sm">Trouvez des campagnes et monétisez votre contenu</p>
                </div>
              </button>
            </div>

            <Button 
              onClick={handleRoleSelection}
              className="w-full h-12 rounded-xl shadow-glow text-base font-medium mt-6"
              disabled={!selectedRole || loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Chargement...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Continuer
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
