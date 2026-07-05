import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { Button, Input } from '../ui';
import { Logo } from '../layout/Logo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      navigate(redirectTo);
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Logo className="inline-flex mb-6" size="lg" />
            <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-gray-400">Sign in to your account to continue</p>
          </div>

          <div className="bg-dark-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-danger-500/20 border border-danger-500/30 rounded-xl text-danger-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={FiMail}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={FiLock}
                required
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-dark-card/50 text-primary-500 focus:ring-primary-500/50" />
                  <span className="text-sm text-gray-400">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" loading={loading} className="w-full">
                Sign In <FiArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>

          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 items-center justify-center p-8">
        <div className="max-w-md text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-64 h-64 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl opacity-20 blur-2xl" />
              <div className="relative bg-dark-card/50 rounded-3xl p-8 border border-white/10 backdrop-blur-xl">
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className="w-12 h-12 bg-gradient-to-br from-primary-500/50 to-secondary-500/50 rounded-lg"
                    />
                  ))}
                </div>
                <div className="h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full opacity-60" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Transform Data into Decisions</h2>
            <p className="text-gray-400">Upload your datasets and let AI analyze, predict, and recommend the best actions for your business.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
