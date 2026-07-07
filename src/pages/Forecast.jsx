import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiTrendingUp, FiDollarSign, FiPackage, FiUsers,
  FiCalendar, FiRefreshCw
} from 'react-icons/fi';
import { LineChart, AreaChart, BarChart, StatCard } from '../components/charts';
import { Card, CardBody, CardHeader, Badge, Button, Tabs } from '../components/ui';
import { useTheme } from '../context/ThemeContext';

const forecastTypes = [
  { id: 'revenue', label: 'Revenue', icon: FiDollarSign, color: 'primary' },
  { id: 'demand', label: 'Demand', icon: FiPackage, color: 'secondary' },
  { id: 'inventory', label: 'Inventory', icon: FiPackage, color: 'success' },
  { id: 'customers', label: 'Customers', icon: FiUsers, color: 'warning' }
];

const forecastData = [
  { period: 'Jan', actual: 45000, predicted: null, lower: null, upper: null },
  { period: 'Feb', actual: 52000, predicted: null, lower: null, upper: null },
  { period: 'Mar', actual: 48000, predicted: null, lower: null, upper: null },
  { period: 'Apr', actual: 61000, predicted: null, lower: null, upper: null },
  { period: 'May', actual: 55000, predicted: null, lower: null, upper: null },
  { period: 'Jun', actual: 67000, predicted: null, lower: null, upper: null },
  { period: 'Jul', actual: 72000, predicted: null, lower: null, upper: null },
  { period: 'Aug', actual: 68000, predicted: null, lower: null, upper: null },
  { period: 'Sep', actual: 78000, predicted: null, lower: null, upper: null },
  { period: 'Oct', actual: 85000, predicted: null, lower: null, upper: null },
  { period: 'Nov', actual: 92000, predicted: null, lower: null, upper: null },
  { period: 'Dec', actual: 105000, predicted: null, lower: null, upper: null },
  { period: 'Jan (F)', actual: null, predicted: 112000, lower: 98000, upper: 126000 },
  { period: 'Feb (F)', actual: null, predicted: 118000, lower: 102000, upper: 134000 },
  { period: 'Mar (F)', actual: null, predicted: 125000, lower: 108000, upper: 142000 },
  { period: 'Apr (F)', actual: null, predicted: 132000, lower: 112000, upper: 152000 },
  { period: 'May (F)', actual: null, predicted: 138000, lower: 118000, upper: 158000 },
  { period: 'Jun (F)', actual: null, predicted: 145000, lower: 125000, upper: 165000 },
];

export default function Forecast() {
  const { darkMode } = useTheme();
  const [activeType, setActiveType] = useState('revenue');
  const [loading, setLoading] = useState(false);

  const chartData = forecastData.map(d => ({
    name: d.period,
    actual: d.actual || undefined,
    predicted: d.predicted || undefined
  }));

  const stats = [
    { title: 'Next Month Forecast', value: '$112K', icon: FiDollarSign, color: 'primary', trend: { value: '6.7%', direction: 'up' } },
    { title: 'Projected Growth', value: '+42%', icon: FiTrendingUp, color: 'success' },
    { title: 'Confidence Level', value: '87%', icon: FiCalendar, color: 'secondary' },
    { title: 'Last Updated', value: '2h ago', icon: FiRefreshCw, color: 'warning' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>Forecast</h1>
          <p className="mt-1" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>AI-powered predictions for your business metrics</p>
        </div>
        <Button onClick={() => setLoading(true)}>
          <FiRefreshCw className="w-5 h-5" /> Refresh Forecasts
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {forecastTypes.map((type) => (
          <Card
            key={type.id}
            className={`cursor-pointer transition-all ${
              activeType === type.id ? 'ring-2 ring-primary-500' : ''
            }`}
            onClick={() => setActiveType(type.id)}
          >
            <CardBody className="flex items-center gap-3 p-4">
              <div className={`w-10 h-10 rounded-lg bg-${type.color}-500/20 flex items-center justify-center`}>
                <type.icon className={`w-5 h-5 text-${type.color}-400`} />
              </div>
              <div>
                <p className="text-xs uppercase" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{type.label} Forecast</p>
                <p className="text-lg font-semibold" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>
                  {type.id === 'revenue' && '$145K'}
                  {type.id === 'demand' && '2,340 units'}
                  {type.id === 'inventory' && '89% optimal'}
                  {type.id === 'customers' && '+23%'}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delay={index * 0.1} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>
                {forecastTypes.find(t => t.id === activeType)?.label} Forecast
              </h3>
              <p className="text-sm" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>6-month prediction with confidence intervals</p>
            </div>
            <Badge variant="success">High Accuracy</Badge>
          </div>
        </CardHeader>
        <CardBody>
          <LineChart
            data={chartData}
            xAxisKey="name"
            lines={[
              { dataKey: 'actual', stroke: '#2563EB', name: 'Actual' },
              { dataKey: 'predicted', stroke: '#7C3AED', name: 'Predicted' }
            ]}
            height={350}
          />
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>Key Insights</h3>
          </CardHeader>
          <CardBody className="space-y-4">
            {[
              { title: 'Upward Trend', description: 'Revenue expected to grow 42% over next 6 months', type: 'success' },
              { title: 'Seasonal Peak', description: 'Q4 typically sees 35% higher demand', type: 'info' },
              { title: 'Risk Factor', description: 'Economic uncertainty may impact projections', type: 'warning' }
            ].map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.9)' }}>
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  insight.type === 'success' ? 'bg-success-400' :
                  insight.type === 'warning' ? 'bg-warning-400' : 'bg-primary-400'
                }`} />
                <div>
                  <p className="font-medium" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>{insight.title}</p>
                  <p className="text-sm mt-1" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{insight.description}</p>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>Forecast Confidence</h3>
          </CardHeader>
          <CardBody>
            <BarChart
              data={[
                { name: 'Jan', confidence: 92 },
                { name: 'Feb', confidence: 89 },
                { name: 'Mar', confidence: 87 },
                { name: 'Apr', confidence: 84 },
                { name: 'May', confidence: 81 },
                { name: 'Jun', confidence: 78 }
              ]}
              dataKey="confidence"
              xAxisKey="name"
              height={200}
              bars={[{ dataKey: 'confidence', fill: '#2563EB' }]}
            />
            <p className="text-center text-sm mt-4" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
              Confidence decreases further into the future
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
