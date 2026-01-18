import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Wallet {
  id: string;
  user_id: string;
  available_balance: number;
  locked_balance: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export function useWallet() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWallet() {
      if (!user) {
        setWallet(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching wallet:', error);
        setWallet(null);
      } else {
        setWallet(data as Wallet);
      }
      setLoading(false);
    }

    fetchWallet();
  }, [user]);

  return { wallet, loading };
}
