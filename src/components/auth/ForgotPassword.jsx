import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { Button, Input } from '../ui';
import { Logo } from '../layout/Logo';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <Logo className="inline-flex mb-6" size="lg" />
          <div className="bg-dark-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="w-16 h-16 rounded-full bg-success-500/20 flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-8 h-8 text-success-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Check your email</h2>
            <p className="text-gray-400 mb-6">
              We've sent a password reset link to <span className="text-white">{email}</span>
            </p>
            <Link to="/login">
              <Button variant="outline" className="w-full">
                <FiArrowLeft className="w-4 h-4" /> Back to Login
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Logo className="inline-flex mb-6" size="lg" />
          <h1 className="text-2xl font-bold text-white mb-2">Reset your password</h1>
          <p className="text-gray-400">Enter your email and we'll send you a reset link</p>
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

            <Button type="submit" loading={loading} className="w-full">
              Send Reset Link
            </Button>
          </form>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors inline-flex items-center gap-2">
            <FiArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
