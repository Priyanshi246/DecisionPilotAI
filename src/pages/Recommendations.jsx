import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiStar, FiTrendingUp, FiTarget, FiAlertTriangle,
  FiCheck, FiArrowRight, FiFilter, FiChevronDown
} from 'react-icons/fi';
import { Card, CardBody, CardHeader, Badge, Button, PillTabs } from '../components/ui';

const mockRecommendations = [
  {
    id: 1,
    priority: 'high',
    problem: 'Declining customer retention rate',
    reason: 'Customer retention dropped from 85% to 72% in Q4',
    suggestedAction: 'Implement loyalty program and improve customer support response time',
    expectedOutcome: 'Increase retention by 15-20%',
    estimatedImpact: '$250K annual revenue impact',
    confidence: 92
  },
  {
    id: 2,
    priority: 'high',
    problem: 'Overstocking slow-moving products',
    reason: '20% of inventory has not moved in 90 days',
    suggestedAction: 'Run clearance sales and optimize reorder points',
    expectedOutcome: 'Reduce carrying costs by 25%',
    estimatedImpact: '$80K cost reduction',
    confidence: 88
  },
  {
    id: 3,
    priority: 'medium',
    problem: 'Untapped market segment',
    reason: 'Analysis shows high demand in 18-25 demographic',
    suggestedAction: 'Launch targeted marketing campaign for younger audience',
    expectedOutcome: 'Capture 12% new market share',
    estimatedImpact: '$150K potential revenue',
    confidence: 78
  },
  {
    id: 4,
    priority: 'medium',
    problem: 'Conversion rate below industry average',
    reason: 'Current conversion is 2.3% vs industry average 3.5%',
    suggestedAction: 'A/B test checkout flow and optimize product pages',
    expectedOutcome: 'Improve conversion to 3%',
    estimatedImpact: '$120K additional revenue',
    confidence: 85
  },
  {
    id: 5,
    priority: 'low',
    problem: 'Manual data entry processes',
    reason: 'Staff spends 15+ hours/week on manual entry',
    suggestedAction: 'Automate data workflow with integration tools',
    expectedOutcome: 'Save 15 hours per week',
    estimatedImpact: '$20K annual savings',
    confidence: 95
  }
];

const insights = {
  opportunities: [
    { title: 'Expand to European market', potential: '+$500K', confidence: 75 },
    { title: 'Launch subscription service', potential: '+$200K', confidence: 82 },
    { title: 'Partner with influencers', potential: '+$150K', confidence: 70 }
  ],
  risks: [
    { title: 'Supply chain disruption', severity: 'High', probability: '35%' },
    { title: 'Competitor price war', severity: 'Medium', probability: '45%' },
    { title: 'Regulatory changes', severity: 'Low', probability: '25%' }
  ],
  bestSegment: { name: 'Premium Customers', contribution: '42% revenue', growth: '+8%' },
  worstSegment: { name: 'Small Business', contribution: '12% revenue', growth: '-3%' }
};

export default function Recommendations() {
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const filteredRecommendations = priorityFilter === 'all'
    ? mockRecommendations
    : mockRecommendations.filter(r => r.priority === priorityFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Recommendations</h1>
          <p className="text-gray-400 mt-1">Data-driven insights to improve your business</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Filter by:</span>
          <PillTabs
            tabs={[
              { id: 'all', label: 'All' },
              { id: 'high', label: 'High Priority' },
              { id: 'medium', label: 'Medium' },
              { id: 'low', label: 'Low' }
            ]}
            activeTab={priorityFilter}
            onChange={setPriorityFilter}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success-500/20 to-primary-500/20 flex items-center justify-center">
                <FiTarget className="w-5 h-5 text-success-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Top Opportunity</h3>
                <p className="text-sm text-gray-400">{insights.bestSegment.name} growing at {insights.bestSegment.growth}</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex items-center gap-3">
            <FiTrendingUp className="w-5 h-5 text-success-400" />
            <h3 className="text-lg font-semibold text-white">Opportunities</h3>
          </CardHeader>
          <CardBody className="space-y-3">
            {insights.opportunities.map((opp, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div>
                  <p className="font-medium text-white">{opp.title}</p>
                  <p className="text-sm text-success-400">{opp.potential} potential</p>
                </div>
                <Badge variant="success">{opp.confidence}% confidence</Badge>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-3">
            <FiAlertTriangle className="w-5 h-5 text-warning-400" />
            <h3 className="text-lg font-semibold text-white">Risks</h3>
          </CardHeader>
          <CardBody className="space-y-3">
            {insights.risks.map((risk, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div>
                  <p className="font-medium text-white">{risk.title}</p>
                  <p className="text-sm text-gray-400">{risk.probability} probability</p>
                </div>
                <Badge variant={risk.severity === 'High' ? 'danger' : risk.severity === 'Medium' ? 'warning' : 'neutral'}>
                  {risk.severity}
                </Badge>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Detailed Recommendations</h2>
        {filteredRecommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardBody className="p-0">
                <button
                  onClick={() => setExpandedId(expandedId === rec.id ? null : rec.id)}
                  className="w-full p-6 text-left"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge
                          variant={rec.priority === 'high' ? 'danger' : rec.priority === 'medium' ? 'warning' : 'success'}
                        >
                          {rec.priority.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-400">{rec.confidence}% confidence</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">{rec.problem}</h3>
                      <p className="text-sm text-gray-400">{rec.reason}</p>
                    </div>
                    <FiChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedId === rec.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {expandedId === rec.id && (
                  <div className="px-6 pb-6 border-t border-white/10 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Suggested Action</p>
                        <p className="text-white">{rec.suggestedAction}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Expected Outcome</p>
                        <p className="text-white">{rec.expectedOutcome}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-xs text-gray-500 uppercase mb-1">Estimated Impact</p>
                        <p className="text-success-400 font-semibold">{rec.estimatedImpact}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button size="sm">
                        Implement <FiArrowRight className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
