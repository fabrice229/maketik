import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useToast } from '@/hooks/use-toast';
import {
  MessageSquare,
  Send,
  Users,
  ArrowLeft,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Zap,
  Sparkles,
} from 'lucide-react';

interface Conversation {
  id: string;
  campaign_id: string;
  seller_id: string;
  creator_id: string;
  current_price: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: string;
  price_change: number | null;
  is_read: boolean;
  created_at: string;
}

interface ConversationWithDetails extends Conversation {
  other_user_name: string;
  other_user_avatar: string | null;
  campaign_title: string;
  unread_count: number;
}

const Messages = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { role } = useUserRole();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState<ConversationWithDetails[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationWithDetails | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [showPriceChange, setShowPriceChange] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const isSeller = role === 'seller';

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    fetchConversations();

    // Subscribe to new messages
    const channel = supabase
      .channel('messages-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const newMsg = payload.new as Message;
          if (selectedConversation && newMsg.conversation_id === selectedConversation.id) {
            setMessages((prev) => [...prev, newMsg]);
            scrollToBottom();
          }
          // Refresh conversations to update unread count
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, navigate, selectedConversation?.id]);

  const fetchConversations = async () => {
    if (!user) return;

    const { data: convData, error } = await supabase
      .from('conversations')
      .select('*')
      .or(`seller_id.eq.${user.id},creator_id.eq.${user.id}`)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching conversations:', error);
      return;
    }

    // Fetch additional details for each conversation
    const conversationsWithDetails: ConversationWithDetails[] = await Promise.all(
      (convData || []).map(async (conv) => {
        const otherUserId = conv.seller_id === user.id ? conv.creator_id : conv.seller_id;

        // Get other user's profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('user_id', otherUserId)
          .single();

        // Get campaign title
        const { data: campaignData } = await supabase
          .from('campaigns')
          .select('title')
          .eq('id', conv.campaign_id)
          .single();

        // Get unread count
        const { count } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .eq('conversation_id', conv.id)
          .neq('sender_id', user.id)
          .eq('is_read', false);

        return {
          ...conv,
          other_user_name: profileData?.full_name || 'Utilisateur',
          other_user_avatar: profileData?.avatar_url,
          campaign_title: campaignData?.title || 'Campagne',
          unread_count: count || 0,
        };
      })
    );

    setConversations(conversationsWithDetails);
    setLoading(false);

    // Auto-select conversation from URL params
    const conversationId = searchParams.get('conversation');
    if (conversationId) {
      const conv = conversationsWithDetails.find((c) => c.id === conversationId);
      if (conv) {
        selectConversation(conv);
      }
    }
  };

  const selectConversation = async (conv: ConversationWithDetails) => {
    setSelectedConversation(conv);

    // Fetch messages
    const { data: messagesData } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conv.id)
      .order('created_at', { ascending: true });

    if (messagesData) {
      setMessages(messagesData);
      scrollToBottom();
    }

    // Mark messages as read
    await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('conversation_id', conv.id)
      .neq('sender_id', user!.id);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || !user) return;

    setSending(true);

    const { error } = await supabase.from('messages').insert({
      conversation_id: selectedConversation.id,
      sender_id: user.id,
      content: newMessage,
      message_type: 'text',
    });

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le message',
        variant: 'destructive',
      });
    } else {
      setNewMessage('');
    }

    setSending(false);
  };

  const sendPriceChange = async () => {
    if (!newPrice || !selectedConversation || !user || !isSeller) return;

    const priceValue = parseFloat(newPrice);
    if (isNaN(priceValue) || priceValue <= 0) {
      toast({
        title: 'Erreur',
        description: 'Veuillez entrer un prix valide',
        variant: 'destructive',
      });
      return;
    }

    setSending(true);

    // Send price change message
    const { error: msgError } = await supabase.from('messages').insert({
      conversation_id: selectedConversation.id,
      sender_id: user.id,
      content: `💰 Proposition de prix modifiée : ${new Intl.NumberFormat('fr-FR').format(priceValue)} XOF`,
      message_type: 'price_change',
      price_change: priceValue,
    });

    if (!msgError) {
      // Update conversation price
      await supabase
        .from('conversations')
        .update({ current_price: priceValue })
        .eq('id', selectedConversation.id);

      setSelectedConversation({ ...selectedConversation, current_price: priceValue });
      setNewPrice('');
      setShowPriceChange(false);

      toast({
        title: 'Prix modifié',
        description: 'Le créateur a été notifié du nouveau prix',
      });
    }

    setSending(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' XOF';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Conversation List */}
      <aside className={`w-full md:w-80 lg:w-96 glass-strong border-r border-border/30 flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${isSeller ? 'bg-gradient-to-br from-seller to-seller/80' : 'bg-gradient-to-br from-creator to-creator/80'} flex items-center justify-center`}>
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-foreground">Messages</span>
            </div>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-6 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucune conversation</p>
            </div>
          ) : (
            <div className="divide-y divide-border/30">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => selectConversation(conv)}
                  className={`w-full p-4 text-left hover:bg-secondary/50 transition-colors ${
                    selectedConversation?.id === conv.id ? 'bg-secondary/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                        {conv.other_user_avatar ? (
                          <img
                            src={conv.other_user_avatar}
                            alt={conv.other_user_name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <Users className="w-6 h-6 text-white" />
                        )}
                      </div>
                      {conv.unread_count > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-xs text-primary-foreground flex items-center justify-center font-medium">
                          {conv.unread_count}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground truncate">
                          {conv.other_user_name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(conv.updated_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conv.campaign_title}
                      </p>
                      <p className="text-xs text-primary font-medium mt-1">
                        {formatCurrency(conv.current_price)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Chat Area */}
      <main className={`flex-1 flex flex-col ${selectedConversation ? 'flex' : 'hidden md:flex'}`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <header className="p-4 border-b border-border/30 glass-strong">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="md:hidden p-2 hover:bg-secondary rounded-lg"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    {selectedConversation.other_user_avatar ? (
                      <img
                        src={selectedConversation.other_user_avatar}
                        alt={selectedConversation.other_user_name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <Users className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {selectedConversation.other_user_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.campaign_title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Prix actuel</p>
                    <p className="font-semibold text-primary">
                      {formatCurrency(selectedConversation.current_price)}
                    </p>
                  </div>
                  {isSeller && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPriceChange(!showPriceChange)}
                      className="border-seller/30 text-seller"
                    >
                      <DollarSign className="w-4 h-4 mr-1" />
                      Modifier le prix
                    </Button>
                  )}
                </div>
              </div>

              {/* Price Change Form */}
              {showPriceChange && isSeller && (
                <div className="mt-4 p-4 rounded-xl bg-seller/10 border border-seller/30">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-seller" />
                    <span className="text-sm text-foreground">
                      Modifier le prix de la mission
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="Nouveau prix (XOF)"
                      className="flex-1"
                    />
                    <Button
                      onClick={sendPriceChange}
                      disabled={sending}
                      className="bg-seller hover:bg-seller/90"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Confirmer
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    5% de frais seront appliqués pour vous et le créateur
                  </p>
                </div>
              )}
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => {
                const isOwn = msg.sender_id === user?.id;
                const isPriceChange = msg.message_type === 'price_change';

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-3 ${
                        isPriceChange
                          ? 'bg-gradient-to-r from-seller/20 to-primary/20 border border-primary/30 text-center'
                          : isOwn
                          ? 'bg-primary text-primary-foreground'
                          : 'glass'
                      }`}
                    >
                      {isPriceChange && (
                        <DollarSign className="w-5 h-5 mx-auto mb-1 text-primary" />
                      )}
                      <p className={isPriceChange ? 'font-medium text-foreground' : ''}>
                        {msg.content}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}
                      >
                        {new Date(msg.created_at).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="p-4 border-t border-border/30 glass-strong">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1"
                />
                <Button type="submit" disabled={sending || !newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                Sélectionnez une conversation
              </h2>
              <p className="text-muted-foreground">
                Choisissez une conversation dans la liste pour commencer à discuter
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;
