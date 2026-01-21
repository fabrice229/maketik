import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Loader2 } from 'lucide-react';

interface ChatButtonProps {
  sellerId: string;
  creatorId: string;
  campaignId: string;
  applicationId?: string;
  initialPrice: number;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

const ChatButton = ({
  sellerId,
  creatorId,
  campaignId,
  applicationId,
  initialPrice,
  variant = 'default',
  size = 'default',
  className = '',
}: ChatButtonProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [existingConversation, setExistingConversation] = useState<string | null>(null);

  useEffect(() => {
    checkExistingConversation();
  }, [sellerId, creatorId, campaignId]);

  const checkExistingConversation = async () => {
    const { data } = await supabase
      .from('conversations')
      .select('id')
      .eq('seller_id', sellerId)
      .eq('creator_id', creatorId)
      .eq('campaign_id', campaignId)
      .single();

    if (data) {
      setExistingConversation(data.id);
    }
  };

  const handleClick = async () => {
    if (!user) {
      toast({
        title: 'Connexion requise',
        description: 'Veuillez vous connecter pour envoyer un message',
        variant: 'destructive',
      });
      return;
    }

    if (existingConversation) {
      navigate(`/messages?conversation=${existingConversation}`);
      return;
    }

    setLoading(true);

    // Create new conversation
    const { data: conv, error } = await supabase
      .from('conversations')
      .insert({
        campaign_id: campaignId,
        application_id: applicationId,
        seller_id: sellerId,
        creator_id: creatorId,
        current_price: initialPrice,
      })
      .select()
      .single();

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de créer la conversation',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    // Send initial system message
    await supabase.from('messages').insert({
      conversation_id: conv.id,
      sender_id: user.id,
      content: `💬 Nouvelle conversation ouverte pour cette campagne. Prix proposé : ${new Intl.NumberFormat('fr-FR').format(initialPrice)} XOF`,
      message_type: 'system',
    });

    setLoading(false);
    navigate(`/messages?conversation=${conv.id}`);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={loading}
      className={className}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <MessageSquare className="w-4 h-4 mr-2" />
      )}
      {existingConversation ? 'Continuer la discussion' : 'Démarrer une discussion'}
    </Button>
  );
};

export default ChatButton;
