import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiUpload, FiCpu, FiTrendingUp, FiShield,
  FiBarChart2, FiFileText, FiUsers, FiZap, FiCheck,
  FiArrowRight, FiPlay
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
    avatar: "SC"
  },
  {
    quote: "The predictions are incredibly accurate. It's like having a data science team on demand.",
    author: "Michael Park",
    role: "Analytics Director",
    avatar: "MP"
  },
  {
    quote: "Reduced our analysis time from days to minutes. Absolutely essential for any business.",
    author: "Emily Rodriguez",
    role: "VP Operations",
    avatar: "ER"
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
    <div className="min-h-screen bg-dark-bg text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How it Works</a>
            <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a>
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
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full filter blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-sm text-primary-400 mb-8">
              <FiZap className="w-4 h-4 mr-2" />
              Powered by Google Gemini AI
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Transform Raw Data into
              <span className="text-gradient block">Smart Decisions</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
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

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16"
          >
            <div className="relative rounded-2xl overflow-hidden bg-dark-card/50 border border-white/10 p-4 max-w-5xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-dark-card to-dark-bg rounded-xl flex items-center justify-center">
                <div className="grid grid-cols-3 gap-6 p-8 w-full max-w-xl">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="aspect-square rounded-xl bg-gradient-to-br from-primary-500/30 to-secondary-500/30"
                    />
                  ))}
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
            >
              Everything You Need for Data Intelligence
            </motion.h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
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
                className="p-6 bg-dark-card/50 border border-white/10 rounded-2xl hover:border-white/20 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-6 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400">Three simple steps to smarter decisions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-500/50 to-transparent -translate-x-8" />
                )}
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
                <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-400">Trusted by businesses worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-dark-card/50 border border-white/10 rounded-2xl"
              >
                <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
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
          className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-white/10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make Smarter Decisions?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join thousands of businesses using AI to drive growth and efficiency
          </p>
          <Link to="/signup">
            <Button size="xl">
              Start Free Trial <FiArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
            <p className="text-sm text-gray-500">
              © 2024 DecisionPilot AI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
