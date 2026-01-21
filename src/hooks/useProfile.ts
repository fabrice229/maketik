import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  bio: string | null;
  country: string | null;
  tiktok_username: string | null;
  tiktok_followers: number;
  tiktok_avg_views: number;
  instagram_username: string | null;
  instagram_followers: number;
  youtube_username: string | null;
  youtube_subscribers: number;
  twitter_username: string | null;
  twitter_followers: number;
  facebook_username: string | null;
  facebook_followers: number;
  total_earned: number;
  total_spent: number;
  rating_avg: number;
  rating_count: number;
  missions_completed: number;
  missions_won: number;
  is_verified: boolean;
  base_price: number;
  company_name: string | null;
  company_type: string | null;
  created_at: string;
  updated_at: string;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
      } else {
        setProfile(data as Profile);
      }
      setLoading(false);
    }

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('User not authenticated') };

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', user.id);

    if (!error) {
      setProfile(prev => prev ? { ...prev, ...updates } : null);
    }

    return { error };
  };

  return { profile, loading, updateProfile };
}
