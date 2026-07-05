import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { Button, Input } from '../ui';
import { Logo } from '../layout/Logo';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, name);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Logo className="inline-flex mb-6" size="lg" />
          <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-gray-400">Start making smarter decisions today</p>
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
              label="Full Name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={FiUser}
              required
            />

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={FiLock}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={FiLock}
              required
            />

            <div className="flex items-start gap-2">
              <input type="checkbox" required className="w-4 h-4 mt-1 rounded border-white/20 bg-dark-card/50 text-primary-500 focus:ring-primary-500/50" />
              <span className="text-sm text-gray-400">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-400 hover:text-primary-300">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-primary-400 hover:text-primary-300">Privacy Policy</Link>
              </span>
            </div>

            <Button type="submit" loading={loading} className="w-full">
              Create Account <FiArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
