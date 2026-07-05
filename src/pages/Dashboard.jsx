import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiDatabase, FiCpu, FiAlertTriangle, FiFileText,
  FiTrendingUp, FiTarget, FiUpload, FiArrowRight
} from 'react-icons/fi';
import { LineChart, AreaChart, BarChart, PieChart, StatCard } from '../components/charts';
import { Card, CardBody, CardHeader, Badge } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { getGreeting, formatNumber, formatCurrency } from '../utils/helpers';
import { EXAMPLE_DATASET } from '../utils/constants';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [greeting] = useState(getGreeting());

  const stats = [
    { title: 'Total Records', value: formatNumber(128479), subtitle: 'Across 12 datasets', icon: FiDatabase, color: 'primary', trend: { value: '12.5%', direction: 'up' } },
    { title: 'Predictions Generated', value: formatNumber(342), subtitle: 'This month', icon: FiCpu, color: 'secondary', trend: { value: '8.2%', direction: 'up' } },
    { title: 'Active Alerts', value: '7', subtitle: '3 critical', icon: FiAlertTriangle, color: 'warning' },
    { title: 'AI Accuracy', value: '94.2%', subtitle: 'Decision confidence', icon: FiTarget, color: 'success', trend: { value: '2.1%', direction: 'up' } }
  ];

  const revenueData = EXAMPLE_DATASET.map(d => ({ name: d.month, value: d.revenue }));
  const customerData = EXAMPLE_DATASET.map(d => ({ name: d.month, customers: d.customers, products: d.products }));
  const pieData = [
    { name: 'Electronics', value: 35, color: '#2563EB' },
    { name: 'Clothing', value: 25, color: '#7C3AED' },
    { name: 'Food', value: 20, color: '#10B981' },
    { name: 'Other', value: 20, color: '#F59E0B' }
  ];

  const recentInsights = [
    { id: 1, title: 'Revenue increased by 23%', type: 'success', description: 'Compared to previous quarter' },
    { id: 2, title: 'Customer churn rate at 4.2%', type: 'warning', description: 'Higher than industry average' },
    { id: 3, title: 'Top product: Widget Pro', type: 'info', description: 'Generated $1.2M revenue' }
  ];

  const recommendations = [
    { id: 1, title: 'Increase marketing budget', priority: 'high', impact: '+$45K/month' },
    { id: 2, title: 'Optimize inventory levels', priority: 'medium', impact: '-$12K waste' },
    { id: 3, title: 'Expand to new regions', priority: 'high', impact: '+30% customers' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{greeting}, {profile?.name || 'User'}!</h1>
          <p className="text-gray-400 mt-1">Here's your business intelligence overview</p>
        </div>
        <button
          onClick={() => navigate('/upload')}
          className="btn btn-primary"
        >
          <FiUpload className="w-5 h-5" /> Upload Dataset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delay={index * 0.1} />
        ))}
      </div>

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

        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Recent Insights</h3>
            </div>
            <Badge variant="primary">Live</Badge>
          </CardHeader>
          <CardBody className="space-y-3">
            {recentInsights.map((insight) => (
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
    </div>
  );
}
