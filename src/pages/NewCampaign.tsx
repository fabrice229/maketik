import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  ArrowLeft,
  Megaphone,
  Package,
  DollarSign,
  FileText,
  Calendar,
  Tag,
  Sparkles,
  Upload,
} from 'lucide-react';
import { z } from 'zod';

const campaignSchema = z.object({
  title: z.string().min(5, 'Minimum 5 caractères').max(100),
  productName: z.string().min(2, 'Minimum 2 caractères').max(100),
  description: z.string().min(20, 'Minimum 20 caractères').max(2000),
  budget: z.number().min(5000, 'Minimum 5 000 XOF'),
  category: z.string().min(1, 'Sélectionnez une catégorie'),
  requirements: z.string().max(1000).optional(),
});

const NewCampaign = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [title, setTitle] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('');
  const [requirements, setRequirements] = useState('');
  const [deadline, setDeadline] = useState('');

  const categories = [
    { value: 'beaute', label: 'Beauté & Cosmétiques' },
    { value: 'mode', label: 'Mode & Accessoires' },
    { value: 'tech', label: 'Tech & Électronique' },
    { value: 'food', label: 'Food & Boissons' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'sport', label: 'Sport & Fitness' },
    { value: 'autre', label: 'Autre' },
  ];

  const validateForm = () => {
    setErrors({});
    
    try {
      campaignSchema.parse({
        title,
        productName,
        description,
        budget: Number(budget),
        category,
        requirements,
      });
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
    
    if (!user) {
      toast({
        title: 'Non connecté',
        description: 'Vous devez être connecté pour créer une campagne.',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { error } = await supabase.from('campaigns').insert({
        seller_id: user.id,
        title,
        product_name: productName,
        description,
        budget: Number(budget),
        product_category: category,
        requirements,
        deadline: deadline ? new Date(deadline).toISOString() : null,
        status: 'available',
      });

      if (error) throw error;

      toast({
        title: 'Campagne créée !',
        description: 'Votre campagne est maintenant visible par les créateurs.',
      });
      navigate('/campaigns');
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de créer la campagne.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>

          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
              <Megaphone className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-title text-foreground mb-2">Nouvelle campagne</h1>
            <p className="text-muted-foreground">
              Décrivez votre produit et définissez votre budget
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-form flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Titre de la campagne
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-12 rounded-xl glass border-border/50"
                placeholder="Ex: Lancement de notre nouvelle crème hydratante"
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="productName" className="text-form flex items-center gap-2">
                <Package className="w-4 h-4" />
                Nom du produit
              </Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="h-12 rounded-xl glass border-border/50"
                placeholder="Ex: Crème Hydra+ Bio"
              />
              {errors.productName && <p className="text-sm text-destructive">{errors.productName}</p>}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label className="text-form flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Catégorie
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      category === cat.value
                        ? 'bg-primary text-primary-foreground'
                        : 'glass text-muted-foreground hover:text-foreground border border-border/50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-form">
                Description détaillée
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-32 rounded-xl glass border-border/50"
                placeholder="Décrivez votre produit, ses avantages, et ce que vous attendez des créateurs..."
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-form flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Budget (XOF)
              </Label>
              <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="h-12 rounded-xl glass border-border/50"
                placeholder="Ex: 50000"
              />
              {errors.budget && <p className="text-sm text-destructive">{errors.budget}</p>}
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-form flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date limite (optionnel)
              </Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="h-12 rounded-xl glass border-border/50"
              />
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <Label htmlFor="requirements" className="text-form">
                Exigences spécifiques (optionnel)
              </Label>
              <Textarea
                id="requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="min-h-24 rounded-xl glass border-border/50"
                placeholder="Ex: Minimum 10k abonnés, contenu en français, mention du code promo..."
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-14 rounded-xl shadow-glow text-base font-medium"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Création en cours...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5" />
                  Publier la campagne
                </span>
              )}
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewCampaign;
