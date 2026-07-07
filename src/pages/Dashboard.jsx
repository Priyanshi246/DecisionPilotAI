import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiDatabase, FiCpu, FiAlertTriangle, FiFileText,
  FiTrendingUp, FiTarget, FiUpload, FiArrowRight, FiRefreshCw,
  FiBarChart2, FiPieChart, FiActivity
} from 'react-icons/fi';
import { LineChart, AreaChart, BarChart, PieChart, StatCard } from '../components/charts';
import { Card, CardBody, CardHeader, Badge, Button } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../services/supabase';
import { getGreeting, formatNumber, formatCurrency } from '../utils/helpers';
import { EXAMPLE_DATASET } from '../utils/constants';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [greeting] = useState(getGreeting());
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRecords: 0,
    datasetsCount: 0,
    predictionsCount: 0,
    alertsCount: 0,
    accuracy: 94.2,
    decisionScore: 87
  });
  const [recentInsights, setRecentInsights] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();

      if (!currentUser) {
        setStats({
          totalRecords: 128479,
          datasetsCount: 12,
          predictionsCount: 342,
          alertsCount: 7,
          accuracy: 94.2,
          decisionScore: 87
        });
        setLoading(false);
        return;
      }

      const [datasetsRes, insightsRes, recommendationsRes, notificationsRes] = await Promise.all([
        supabase.from('datasets').select('*').order('created_at', { ascending: false }),
        supabase.from('insights').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('recommendations').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('notifications').select('*').eq('read', false)
      ]);

      const totalRecords = datasetsRes.data?.reduce((sum, d) => sum + (d.row_count || 0), 0) || 0;
      const datasetsCount = datasetsRes.data?.length || 0;
      const predictionsCount = insightsRes.data?.length || 0;
      const alertsCount = notificationsRes.data?.length || 0;

      setStats({
        totalRecords,
        datasetsCount,
        predictionsCount,
        alertsCount,
        accuracy: 94.2,
        decisionScore: 87
      });

      setDatasets(datasetsRes.data || []);
      setRecentInsights(insightsRes.data || []);
      setRecommendations(recommendationsRes.data || []);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setStats({
        totalRecords: 128479,
        datasetsCount: 12,
        predictionsCount: 342,
        alertsCount: 7,
        accuracy: 94.2,
        decisionScore: 87
      });
    }
    setLoading(false);
  };

  const statCards = [
    {
      title: 'Total Records',
      value: formatNumber(stats.totalRecords),
      subtitle: stats.datasetsCount > 0 ? `Across ${stats.datasetsCount} datasets` : 'No datasets yet',
      icon: FiDatabase,
      color: 'primary',
      trend: stats.totalRecords > 0 ? { value: '12.5%', direction: 'up' } : null
    },
    {
      title: 'AI Queries',
      value: formatNumber(stats.predictionsCount),
      subtitle: 'This month',
      icon: FiCpu,
      color: 'secondary',
      trend: stats.predictionsCount > 0 ? { value: '8.2%', direction: 'up' } : null
    },
    {
      title: 'Decision Score',
      value: `${stats.decisionScore}%`,
      subtitle: 'Overall quality',
      icon: FiTarget,
      color: 'success',
      trend: { value: '3.1%', direction: 'up' }
    },
    {
      title: 'Active Alerts',
      value: stats.alertsCount.toString(),
      subtitle: stats.alertsCount > 3 ? `${Math.min(3, stats.alertsCount)} critical` : 'No critical alerts',
      icon: FiAlertTriangle,
      color: stats.alertsCount > 0 ? 'warning' : 'success'
    }
  ];

  const revenueData = EXAMPLE_DATASET.map(d => ({ name: d.month, value: d.revenue }));
  const customerData = EXAMPLE_DATASET.map(d => ({ name: d.month, customers: d.customers, products: d.products }));
  const pieData = [
    { name: 'Electronics', value: 35, color: '#2563EB' },
    { name: 'Clothing', value: 25, color: '#7C3AED' },
    { name: 'Food', value: 20, color: '#10B981' },
    { name: 'Other', value: 20, color: '#F59E0B' }
  ];

  const demoInsights = [
    { id: 1, title: 'Revenue increased by 23%', type: 'success', description: 'Compared to previous quarter' },
    { id: 2, title: 'Customer churn rate at 4.2%', type: 'warning', description: 'Higher than industry average' },
    { id: 3, title: 'Top product: Widget Pro', type: 'info', description: 'Generated $1.2M revenue' }
  ];

  const displayInsights = recentInsights.length > 0
    ? recentInsights.map(i => ({ id: i.id, title: i.title, type: i.type || 'info', description: i.description }))
    : demoInsights;

  const textColor = darkMode ? '#ffffff' : '#0f172a';
  const mutedColor = darkMode ? '#94a3b8' : '#64748b';
  const cardBg = darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.9)';
  const borderColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';
  const hoverBg = darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: textColor }}>
            {greeting}, {profile?.name || user?.email?.split('@')[0] || 'Guest'}!
          </h1>
          <p style={{ color: mutedColor }} className="mt-1">
            Here's your business intelligence overview
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={loadDashboardData}>
            <FiRefreshCw className="w-4 h-4" /> Refresh
          </Button>
          <Button onClick={() => navigate('/upload')}>
            <FiUpload className="w-5 h-5" /> Upload Dataset
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {statCards.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FiTrendingUp className="w-5 h-5" style={{ color: '#2563eb' }} />
              <h3 className="text-lg font-semibold" style={{ color: textColor }}>Revenue Trend</h3>
            </div>
            <p className="text-sm mt-1" style={{ color: mutedColor }}>Monthly revenue performance</p>
          </CardHeader>
          <CardBody>
            <AreaChart data={revenueData} dataKey="value" height={280} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FiPieChart className="w-5 h-5" style={{ color: '#7c3aed' }} />
              <h3 className="text-lg font-semibold" style={{ color: textColor }}>Product Distribution</h3>
            </div>
          </CardHeader>
          <CardBody>
            <PieChart data={pieData} height={220} showLabels />
          </CardBody>
        </Card>
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FiBarChart2 className="w-5 h-5" style={{ color: '#10b981' }} />
              <h3 className="text-lg font-semibold" style={{ color: textColor }}>Customer Growth</h3>
            </div>
          </CardHeader>
          <CardBody>
            <LineChart
              data={customerData}
              xAxisKey="name"
              lines={[
                { dataKey: 'customers', stroke: '#2563EB', name: 'Customers' },
                { dataKey: 'products', stroke: '#7C3AED', name: 'Products' }
              ]}
              height={220}
            />
          </CardBody>
        </Card>

        {/* Recent Insights */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiActivity className="w-5 h-5" style={{ color: '#f59e0b' }} />
              <h3 className="text-lg font-semibold" style={{ color: textColor }}>Recent Insights</h3>
            </div>
            <Badge variant="primary">Live</Badge>
          </CardHeader>
          <CardBody className="space-y-3">
            {displayInsights.map((insight) => (
              <div
                key={insight.id}
                className="flex items-start gap-3 p-3 rounded-xl transition-colors cursor-pointer"
                style={{ backgroundColor: hoverBg }}
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  insight.type === 'success' ? 'bg-green-500' :
                  insight.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div>
                  <p className="text-sm font-medium" style={{ color: textColor }}>{insight.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: mutedColor }}>{insight.description}</p>
                </div>
              </div>
            ))}
            <button
              onClick={() => navigate('/recommendations')}
              className="w-full text-sm flex items-center justify-center gap-1 mt-2 py-2 rounded-lg transition-colors"
              style={{ color: '#2563eb' }}
            >
              View all insights <FiArrowRight className="w-4 h-4" />
            </button>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold" style={{ color: textColor }}>Quick Actions</h3>
          </CardHeader>
          <CardBody className="space-y-3">
            <button
              onClick={() => navigate('/assistant')}
              className="w-full flex items-center gap-3 p-4 rounded-xl transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(124, 58, 237, 0.1))',
                border: '1px solid rgba(37, 99, 235, 0.3)'
              }}
            >
              <FiCpu className="w-5 h-5" style={{ color: '#2563eb' }} />
              <div className="text-left">
                <p className="text-sm font-medium" style={{ color: textColor }}>Ask AI Assistant</p>
                <p className="text-xs" style={{ color: mutedColor }}>Get instant insights</p>
              </div>
              <FiArrowRight className="w-4 h-4 ml-auto" style={{ color: '#2563eb' }} />
            </button>

            <button
              onClick={() => navigate('/forecast')}
              className="w-full flex items-center gap-3 p-4 rounded-xl transition-all"
              style={{ backgroundColor: hoverBg, border: `1px solid ${borderColor}` }}
            >
              <FiTrendingUp className="w-5 h-5" style={{ color: '#f59e0b' }} />
              <div className="text-left">
                <p className="text-sm font-medium" style={{ color: textColor }}>View Forecasts</p>
                <p className="text-xs" style={{ color: mutedColor }}>Predict future trends</p>
              </div>
              <FiArrowRight className="w-4 h-4 ml-auto" style={{ color: mutedColor }} />
            </button>

            <button
              onClick={() => navigate('/reports')}
              className="w-full flex items-center gap-3 p-4 rounded-xl transition-all"
              style={{ backgroundColor: hoverBg, border: `1px solid ${borderColor}` }}
            >
              <FiFileText className="w-5 h-5" style={{ color: '#10b981' }} />
              <div className="text-left">
                <p className="text-sm font-medium" style={{ color: textColor }}>Generate Report</p>
                <p className="text-xs" style={{ color: mutedColor }}>Export your analysis</p>
              </div>
              <FiArrowRight className="w-4 h-4 ml-auto" style={{ color: mutedColor }} />
            </button>
          </CardBody>
        </Card>
      </div>

      {/* Recent Datasets */}
      {datasets.length > 0 && (
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold" style={{ color: textColor }}>Recent Datasets</h3>
              <p className="text-sm" style={{ color: mutedColor }}>Your uploaded data files</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/datasets')}>
              View All
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <div style={{ borderTop: `1px solid ${borderColor}` }}>
              {datasets.slice(0, 5).map((dataset) => (
                <div
                  key={dataset.id}
                  className="flex items-center justify-between p-4 transition-colors cursor-pointer"
                  style={{ borderBottom: `1px solid ${borderColor}` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(37, 99, 235, 0.1)' }}>
                      <FiDatabase className="w-5 h-5" style={{ color: '#2563eb' }} />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: textColor }}>{dataset.name}</p>
                      <p className="text-xs" style={{ color: mutedColor }}>
                        {formatNumber(dataset.row_count || 0)} rows · {dataset.column_count || 0} columns
                      </p>
                    </div>
                  </div>
                  <Badge variant={dataset.status === 'ready' ? 'success' : 'warning'}>
                    {dataset.status || 'Ready'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
