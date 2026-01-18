import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Star, Sparkles, X } from 'lucide-react';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: string;
  toUserId: string;
  toUserName: string;
}

const RatingModal = ({ isOpen, onClose, campaignId, toUserId, toUserName }: RatingModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!user || rating === 0) return;

    setLoading(true);

    try {
      const { error } = await supabase.from('ratings').insert({
        campaign_id: campaignId,
        from_user_id: user.id,
        to_user_id: toUserId,
        rating,
        comment: comment.trim() || null,
      });

      if (error) {
        if (error.message.includes('duplicate')) {
          toast({
            title: 'Déjà noté',
            description: 'Vous avez déjà noté cet utilisateur pour cette campagne.',
            variant: 'destructive',
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: 'Merci !',
          description: 'Votre évaluation a été enregistrée.',
        });
        onClose();
      }
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible d\'enregistrer l\'évaluation.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md glass rounded-3xl p-8 animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-display font-semibold text-foreground mb-1">
            Noter {toUserName}
          </h2>
          <p className="text-muted-foreground text-sm">
            Comment s'est passée cette collaboration ?
          </p>
        </div>

        {/* Stars */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-10 h-10 transition-colors ${
                  star <= (hoveredRating || rating)
                    ? 'text-primary fill-primary'
                    : 'text-muted-foreground'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Comment */}
        <Textarea
          placeholder="Laissez un commentaire (optionnel)..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-24 rounded-xl glass border-border/50 mb-6"
        />

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 glass"
          >
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 shadow-glow"
            disabled={rating === 0 || loading}
          >
            {loading ? (
              <Sparkles className="w-5 h-5 animate-spin" />
            ) : (
              'Envoyer'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
