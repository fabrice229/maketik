import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/hooks/useWallet';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  Lock,
  Clock,
  CheckCircle,
  XCircle,
  Sparkles,
  Plus,
  CreditCard,
} from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  fee_amount: number;
  transaction_type: string;
  status: string;
  created_at: string;
  description: string | null;
}

const Wallet = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { wallet, loading: walletLoading } = useWallet();
  const { role } = useUserRole();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    async function fetchTransactions() {
      const { data } = await supabase
        .from('transactions')
        .select('*')
        .or(`from_user_id.eq.${user.id},to_user_id.eq.${user.id}`)
        .order('created_at', { ascending: false })
        .limit(50);

      if (data) setTransactions(data);
      setLoading(false);
    }

    fetchTransactions();
  }, [user, navigate]);

  const formatCurrency = (amount: number, currency: string = 'XOF') => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' ' + currency;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="w-5 h-5 text-success" />;
      case 'payment':
      case 'withdrawal':
        return <ArrowUpRight className="w-5 h-5 text-destructive" />;
      case 'earning':
        return <TrendingUp className="w-5 h-5 text-success" />;
      default:
        return <WalletIcon className="w-5 h-5 text-primary" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-xs text-success">
            <CheckCircle className="w-3 h-3" />
            Terminé
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-xs text-primary">
            <Clock className="w-3 h-3" />
            En attente
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 text-xs text-destructive">
            <XCircle className="w-3 h-3" />
            Échoué
          </span>
        );
      default:
        return <span className="text-xs text-muted-foreground">{status}</span>;
    }
  };

  if (loading || walletLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const isCreator = role === 'creator';

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-6">
              <WalletIcon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Mon Portefeuille</span>
            </div>
            <h1 className="text-title text-foreground mb-4">
              Gérez vos fonds
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {isCreator 
                ? 'Suivez vos gains et effectuez des retraits vers Mobile Money' 
                : 'Gérez votre solde et rechargez votre compte pour lancer des campagnes'}
            </p>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-success/15 flex items-center justify-center">
                  <WalletIcon className="w-6 h-6 text-success" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-success" />
              </div>
              <p className="text-3xl font-display font-bold text-foreground mb-1">
                {formatCurrency(wallet?.available_balance || 0)}
              </p>
              <p className="text-muted-foreground">Solde disponible</p>
              <div className="mt-4 flex gap-3">
                {isCreator ? (
                  <Button className="flex-1 shadow-glow">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Retirer
                  </Button>
                ) : (
                  <Button className="flex-1 shadow-glow">
                    <Plus className="w-4 h-4 mr-2" />
                    Recharger
                  </Button>
                )}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-info/15 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-info" />
                </div>
              </div>
              <p className="text-3xl font-display font-bold text-foreground mb-1">
                {formatCurrency(wallet?.locked_balance || 0)}
              </p>
              <p className="text-muted-foreground">
                {isCreator ? 'Gains en attente' : 'Fonds en escrow'}
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                {isCreator 
                  ? 'Ces fonds seront libérés une fois les missions validées'
                  : 'Ces fonds sont réservés pour les campagnes en cours'}
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="glass rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">
              Moyens de paiement
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Mobile Money</p>
                    <p className="text-sm text-muted-foreground">Orange, MTN, Moov, Wave</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Configurer
                </Button>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-display font-semibold text-foreground mb-6">
              Historique des transactions
            </h2>

            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <WalletIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Aucune transaction pour le moment
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                        {getTransactionIcon(tx.transaction_type)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {tx.description || tx.transaction_type}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(tx.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        tx.transaction_type === 'earning' || tx.transaction_type === 'deposit'
                          ? 'text-success'
                          : 'text-foreground'
                      }`}>
                        {tx.transaction_type === 'earning' || tx.transaction_type === 'deposit' ? '+' : '-'}
                        {formatCurrency(tx.amount)}
                      </p>
                      {tx.fee_amount > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Frais: {formatCurrency(tx.fee_amount)}
                        </p>
                      )}
                      {getStatusBadge(tx.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wallet;
