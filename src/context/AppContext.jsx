import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../services/supabase';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { user } = useAuth();
  const [datasets, setDatasets] = useState([]);
  const [insights, setInsights] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({
    geminiApiKey: '',
    notificationsEnabled: true,
    language: 'en'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      setDatasets([]);
      setInsights([]);
      setRecommendations([]);
      setNotifications([]);
      setLoading(false);
    }
  }, [user]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const [datasetsRes, insightsRes, recsRes, notifsRes, settingsRes] = await Promise.all([
        supabase.from('datasets').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('insights').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('recommendations').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('settings').select('*').eq('user_id', user.id).single()
      ]);

      if (datasetsRes.data) setDatasets(datasetsRes.data);
      if (insightsRes.data) setInsights(insightsRes.data);
      if (recsRes.data) setRecommendations(recsRes.data);
      if (notifsRes.data) setNotifications(notifsRes.data);
      if (settingsRes.data) setSettings(settingsRes.data);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
    setLoading(false);
  };

  const addDataset = async (dataset) => {
    const { data, error } = await supabase
      .from('datasets')
      .insert({ ...dataset, user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    setDatasets(prev => [data, ...prev]);
    return data;
  };

  const updateDataset = async (id, updates) => {
    const { error } = await supabase
      .from('datasets')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
    setDatasets(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const deleteDataset = async (id) => {
    const { error } = await supabase
      .from('datasets')
      .delete()
      .eq('id', id);

    if (error) throw error;
    setDatasets(prev => prev.filter(d => d.id !== id));
  };

  const addNotification = async (notification) => {
    const { data, error } = await supabase
      .from('notifications')
      .insert({ ...notification, user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    setNotifications(prev => [data, ...prev]);
    return data;
  };

  const markNotificationRead = async (id) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);

    if (error) throw error;
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const updateSettings = async (updates) => {
    const { error } = await supabase
      .from('settings')
      .upsert({ ...settings, ...updates, user_id: user.id });

    if (error) throw error;
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <AppContext.Provider value={{
      datasets,
      insights,
      recommendations,
      notifications,
      settings,
      loading,
      addDataset,
      updateDataset,
      deleteDataset,
      addNotification,
      markNotificationRead,
      updateSettings,
      refreshData: loadUserData
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
