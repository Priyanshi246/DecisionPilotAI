import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiDatabase, FiCpu, FiAlertTriangle, FiFileText,
  FiTrendingUp, FiTarget, FiUpload, FiArrowRight, FiRefreshCw
} from 'react-icons/fi';
import { LineChart, AreaChart, BarChart, PieChart, StatCard } from '../components/charts';
import { Card, CardBody, CardHeader, Badge, Button } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';
import { getGreeting, formatNumber, formatCurrency } from '../utils/helpers';
import { EXAMPLE_DATASET } from '../utils/constants';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [greeting] = useState(getGreeting());
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRecords: 0,
    datasetsCount: 0,
    predictionsCount: 0,
    alertsCount: 0,
    accuracy: 94.2
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
        // Use demo data for unauthenticated users
        setStats({
          totalRecords: 128479,
          datasetsCount: 12,
          predictionsCount: 342,
          alertsCount: 7,
          accuracy: 94.2
        });
        setLoading(false);
        return;
      }

      // Fetch real data from Supabase
      const [datasetsRes, insightsRes, recommendationsRes, notificationsRes] = await Promise.all([
        supabase.from('datasets').select('*').order('created_at', { ascending: false }),
        supabase.from('insights').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('recommendations').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('notifications').select('*').eq('read', false)
      ]);

      // Calculate stats
      const totalRecords = datasetsRes.data?.reduce((sum, d) => sum + (d.row_count || 0), 0) || 0;
      const datasetsCount = datasetsRes.data?.length || 0;
      const predictionsCount = insightsRes.data?.length || 0;
      const alertsCount = notificationsRes.data?.length || 0;

      setStats({
        totalRecords,
        datasetsCount,
        predictionsCount,
        alertsCount,
        accuracy: 94.2
      });

      setDatasets(datasetsRes.data || []);
      setRecentInsights(insightsRes.data || []);
      setRecommendations(recommendationsRes.data || []);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Use fallback demo data
      setStats({
        totalRecords: 128479,
        datasetsCount: 12,
        predictionsCount: 342,
        alertsCount: 7,
        accuracy: 94.2
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
      title: 'Predictions Generated',
      value: formatNumber(stats.predictionsCount),
      subtitle: 'This month',
      icon: FiCpu,
      color: 'secondary',
      trend: stats.predictionsCount > 0 ? { value: '8.2%', direction: 'up' } : null
    },
    {
      title: 'Active Alerts',
      value: stats.alertsCount.toString(),
      subtitle: stats.alertsCount > 3 ? `${Math.min(3, stats.alertsCount)} critical` : 'No critical alerts',
      icon: FiAlertTriangle,
      color: stats.alertsCount > 0 ? 'warning' : 'success'
    },
    {
      title: 'AI Accuracy',
      value: `${stats.accuracy}%`,
      subtitle: 'Decision confidence',
      icon: FiTarget,
      color: 'success',
      trend: { value: '2.1%', direction: 'up' }
    }
  ];

  // Sample chart data
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

  const demoRecommendations = [
    { id: 1, title: 'Increase marketing budget', priority: 'high', impact: '+$45K/month' },
    { id: 2, title: 'Optimize inventory levels', priority: 'medium', impact: '-$12K waste' },
    { id: 3, title: 'Expand to new regions', priority: 'high', impact: '+30% customers' }
  ];

  const displayInsights = recentInsights.length > 0
    ? recentInsights.map(i => ({ id: i.id, title: i.title, type: i.type || 'info', description: i.description }))
    : demoInsights;

  const displayRecommendations = recommendations.length > 0
    ? recommendations.map(r => ({ id: r.id, title: r.problem, priority: r.priority, impact: r.estimated_impact }))
    : demoRecommendations;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{greeting}, {profile?.name || user?.email?.split('@')[0] || 'Guest'}!</h1>
          <p className="text-gray-400 mt-1">Here's your business intelligence overview</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
            <p className="text-sm text-gray-400">Monthly revenue performance</p>
          </CardHeader>
          <CardBody>
            <AreaChart data={revenueData} dataKey="value" height={300} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Product Distribution</h3>
          </CardHeader>
          <CardBody>
            <PieChart data={pieData} height={250} showLabels />
          </CardBody>
        </Card>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Customer Growth</h3>
          </CardHeader>
          <CardBody>
            <LineChart
              data={customerData}
              xAxisKey="name"
              lines={[
                { dataKey: 'customers', stroke: '#2563EB', name: 'Customers' },
                { dataKey: 'products', stroke: '#7C3AED', name: 'Products' }
              ]}
              height={250}
            />
          </CardBody>
        </Card>

        {/* Recent Insights */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Recent Insights</h3>
            </div>
            <Badge variant="primary">Live</Badge>
          </CardHeader>
          <CardBody className="space-y-3">
            {displayInsights.map((insight) => (
              <div key={insight.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  insight.type === 'success' ? 'bg-success-400' :
                  insight.type === 'warning' ? 'bg-warning-400' : 'bg-primary-400'
                }`} />
                <div>
                  <p className="text-sm font-medium text-white">{insight.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{insight.description}</p>
                </div>
              </div>
            ))}
            <button
              onClick={() => navigate('/recommendations')}
              className="w-full text-sm text-primary-400 hover:text-primary-300 flex items-center justify-center gap-1 mt-2"
            >
              View all insights <FiArrowRight className="w-4 h-4" />
            </button>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
          </CardHeader>
          <CardBody className="space-y-3">
            <button
              onClick={() => navigate('/assistant')}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30 hover:border-primary-500/50 transition-all"
            >
              <FiCpu className="w-5 h-5 text-primary-400" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">Ask AI Assistant</p>
                <p className="text-xs text-gray-400">Get instant insights</p>
              </div>
              <FiArrowRight className="w-4 h-4 text-primary-400 ml-auto" />
            </button>

            <button
              onClick={() => navigate('/forecast')}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <FiTrendingUp className="w-5 h-5 text-warning-400" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">View Forecasts</p>
                <p className="text-xs text-gray-400">Predict future trends</p>
              </div>
              <FiArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </button>

            <button
              onClick={() => navigate('/reports')}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <FiFileText className="w-5 h-5 text-success-400" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">Generate Report</p>
                <p className="text-xs text-gray-400">Export your analysis</p>
              </div>
              <FiArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </button>
          </CardBody>
        </Card>
      </div>

      {/* Recent Datasets */}
      {datasets.length > 0 && (
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Recent Datasets</h3>
              <p className="text-sm text-gray-400">Your uploaded data files</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/datasets')}>
              View All
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-white/5">
              {datasets.slice(0, 5).map((dataset) => (
                <div key={dataset.id} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                      <FiDatabase className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{dataset.name}</p>
                      <p className="text-xs text-gray-400">
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
