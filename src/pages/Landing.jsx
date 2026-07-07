import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiUpload, FiCpu, FiTrendingUp, FiShield,
  FiBarChart2, FiFileText, FiUsers, FiZap, FiCheck,
  FiArrowRight, FiPlay, FiDatabase, FiTarget, FiAlertTriangle
} from 'react-icons/fi';
import { Logo } from '../components/layout/Logo';
import { Button } from '../components/ui';

const features = [
  {
    icon: FiUpload,
    title: 'Easy Data Upload',
    description: 'Upload CSV, Excel, JSON files and let AI analyze them automatically'
  },
  {
    icon: FiCpu,
    title: 'AI-Powered Analysis',
    description: 'Get instant insights, predictions, and recommendations from your data'
  },
  {
    icon: FiTrendingUp,
    title: 'Advanced Forecasting',
    description: 'Predict future trends with machine learning models'
  },
  {
    icon: FiShield,
    title: 'Secure & Private',
    description: 'Your data is encrypted and never shared with third parties'
  },
  {
    icon: FiBarChart2,
    title: 'Interactive Dashboards',
    description: 'Beautiful visualizations that bring your data to life'
  },
  {
    icon: FiFileText,
    title: 'Automated Reports',
    description: 'Generate professional reports with one click'
  }
];

const howItWorks = [
  { step: 1, title: 'Upload Data', description: 'Drag and drop your dataset or connect your data source' },
  { step: 2, title: 'AI Analyzes', description: 'Our AI automatically detects patterns and insights' },
  { step: 3, title: 'Get Insights', description: 'Receive predictions, recommendations, and reports' }
];

const testimonials = [
  {
    quote: "DecisionPilot AI transformed how we analyze our data. We've increased revenue by 23%.",
    author: "Sarah Chen",
    role: "CEO, TechVenture",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
  },
  {
    quote: "The predictions are incredibly accurate. It's like having a data science team on demand.",
    author: "Michael Park",
    role: "Analytics Director",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    quote: "Reduced our analysis time from days to minutes. Absolutely essential for any business.",
    author: "Emily Rodriguez",
    role: "VP Operations",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }
];

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '2.5M', label: 'Datasets Analyzed' },
  { value: '94%', label: 'Accuracy' },
  { value: '350+', label: 'Enterprise Clients' }
];

export default function Landing() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="transition-colors" style={{ color: '#94a3b8' }}>Features</a>
            <a href="#how-it-works" className="transition-colors" style={{ color: '#94a3b8' }}>How it Works</a>
            <a href="#testimonials" className="transition-colors" style={{ color: '#94a3b8' }}>Testimonials</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl" style={{ backgroundColor: 'rgba(37, 99, 235, 0.2)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl" style={{ backgroundColor: 'rgba(124, 58, 237, 0.2)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm mb-8" style={{ backgroundColor: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.2)', color: '#60a5fa' }}>
              <FiZap className="w-4 h-4 mr-2" />
              Powered by Google Gemini AI
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight" style={{ color: '#ffffff' }}>
              Transform Raw Data into
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 block">Smart Decisions</span>
            </h1>

            <p className="text-xl max-w-2xl mx-auto mb-10" style={{ color: '#94a3b8' }}>
              Upload your datasets and let AI analyze, predict, and recommend the best actions for your business or organization.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="xl">
                  Get Started Free <FiArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button size="xl" variant="outline">
                <FiPlay className="w-5 h-5" /> Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Realistic Mini Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16"
          >
            <div className="relative rounded-2xl overflow-hidden p-4 max-w-5xl mx-auto" style={{ border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(30, 41, 59, 0.5)' }}>
              <div className="rounded-xl p-6" style={{ backgroundColor: '#0F172A' }}>
                {/* Mini Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>Dashboard Overview</h3>
                    <p className="text-sm" style={{ color: '#64748b' }}>Real-time business intelligence</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>Live</span>
                  </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Total Records', value: '128K', icon: FiDatabase, color: '#2563eb' },
                    { label: 'AI Queries', value: '342', icon: FiCpu, color: '#7c3aed' },
                    { label: 'Decision Score', value: '87%', icon: FiTarget, color: '#10b981' },
                    { label: 'Alerts', value: '7', icon: FiAlertTriangle, color: '#f59e0b' }
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <stat.icon className="w-5 h-5 mb-2" style={{ color: stat.color }} />
                      <p className="text-2xl font-bold" style={{ color: '#ffffff' }}>{stat.value}</p>
                      <p className="text-xs" style={{ color: '#64748b' }}>{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Chart Preview */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Revenue Chart */}
                  <div className="col-span-2 p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                    <p className="text-sm mb-3" style={{ color: '#94a3b8' }}>Revenue Trend</p>
                    <div className="h-32 flex items-end gap-2">
                      {[45, 52, 48, 61, 55, 67, 72, 68, 78, 85, 92, 105].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `linear-gradient(to top, #2563eb, #60a5fa)` }} />
                      ))}
                    </div>
                  </div>

                  {/* Insights */}
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                    <p className="text-sm mb-3" style={{ color: '#94a3b8' }}>Recent Insights</p>
                    <div className="space-y-2">
                      {[
                        { text: 'Revenue +23%', type: 'success' },
                        { text: 'Churn 4.2%', type: 'warning' },
                        { text: 'Growth +12%', type: 'success' }
                      ].map((insight, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
                          <div className={`w-2 h-2 rounded-full ${insight.type === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                          <span className="text-xs" style={{ color: '#cbd5e1' }}>{insight.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: '#ffffff' }}
            >
              Everything You Need for Data Intelligence
            </motion.h2>
            <p className="max-w-2xl mx-auto" style={{ color: '#94a3b8' }}>
              Powerful features to help you make smarter decisions faster
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl transition-all hover:scale-105"
                style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(124, 58, 237, 0.2))' }}>
                  <feature.icon className="w-6 h-6" style={{ color: '#60a5fa' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#ffffff' }}>{feature.title}</h3>
                <p className="text-sm" style={{ color: '#94a3b8' }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-6" style={{ background: 'linear-gradient(to bottom, transparent, rgba(37, 99, 235, 0.05), transparent)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>How It Works</h2>
            <p style={{ color: '#94a3b8' }}>Three simple steps to smarter decisions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative text-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: '#ffffff' }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#ffffff' }}>{item.title}</h3>
                <p style={{ color: '#94a3b8' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">{stat.value}</p>
                <p style={{ color: '#94a3b8' }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>What Our Users Say</h2>
            <p style={{ color: '#94a3b8' }}>Trusted by businesses worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl"
                style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
              >
                <p className="mb-4" style={{ color: '#cbd5e1' }}>"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium" style={{ color: '#ffffff' }}>{testimonial.author}</p>
                    <p className="text-sm" style={{ color: '#64748b' }}>{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center p-12 rounded-3xl"
          style={{ background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(124, 58, 237, 0.2))', border: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>Ready to Make Smarter Decisions?</h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: '#94a3b8' }}>
            Join thousands of businesses using AI to drive growth and efficiency
          </p>
          <Link to="/signup">
            <Button size="xl">
              Start Free Trial <FiArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <footer className="py-12 px-6" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
            <p className="text-sm" style={{ color: '#64748b' }}>
              © 2024 DecisionPilot AI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm transition-colors" style={{ color: '#94a3b8' }}>Privacy</a>
              <a href="#" className="text-sm transition-colors" style={{ color: '#94a3b8' }}>Terms</a>
              <a href="#" className="text-sm transition-colors" style={{ color: '#94a3b8' }}>Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
