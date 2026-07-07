import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSend, FiUser, FiCpu, FiLoader, FiCopy, FiThumbsUp,
  FiAlertCircle, FiTrendingUp, FiTarget, FiDollarSign
} from 'react-icons/fi';
import { Card, CardBody, Button, Badge } from '../components/ui';
import { useTheme } from '../context/ThemeContext';
import { analyzeData } from '../services/gemini';
import { SAMPLE_QUESTIONS } from '../utils/constants';
import { EXAMPLE_DATASET } from '../utils/constants';

export default function Assistant() {
  const { darkMode } = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await analyzeData(EXAMPLE_DATASET, input);

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Error: ${error.message}`,
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionClick = (question) => {
    setInput(question);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>AI Assistant</h1>
        <p className="mt-1" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>Ask questions about your data and get AI-powered insights</p>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        <div className="flex-1 flex flex-col min-h-0">
          <Card className="flex-1 flex flex-col min-h-0">
            <CardBody className="flex-1 flex flex-col min-h-0 p-0">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center mb-6">
                      <FiCpu className="w-10 h-10 text-primary-400" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>Ask me anything about your data</h2>
                    <p className="max-w-md mb-6" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                      I can analyze patterns, make predictions, and provide actionable recommendations.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {SAMPLE_QUESTIONS.slice(0, 4).map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuestionClick(question)}
                          className="px-4 py-2 text-sm rounded-xl transition-all"
                          style={{
                            color: darkMode ? '#d1d5db' : '#6b7280',
                            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
                            border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'
                          }}
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user'
                            ? 'bg-primary-500/20'
                            : message.isError
                              ? 'bg-danger-500/20'
                              : 'bg-gradient-to-br from-primary-500/20 to-secondary-500/20'
                        }`}>
                          {message.role === 'user' ? (
                            <FiUser className="w-4 h-4 text-primary-400" />
                          ) : message.isError ? (
                            <FiAlertCircle className="w-4 h-4 text-danger-400" />
                          ) : (
                            <FiCpu className="w-4 h-4 text-primary-400" />
                          )}
                        </div>
                        <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                          <div className="inline-block rounded-2xl px-4 py-3" style={{
                            backgroundColor: message.role === 'user'
                              ? 'rgba(59, 130, 246, 0.2)'
                              : message.isError
                                ? 'rgba(239, 68, 68, 0.1)'
                                : (darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)'),
                            border: message.role === 'user'
                              ? '1px solid rgba(59, 130, 246, 0.3)'
                              : message.isError
                                ? '1px solid rgba(239, 68, 68, 0.3)'
                                : (darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)')
                          }}>
                            <div className="text-sm whitespace-pre-wrap" style={{ color: darkMode ? '#d1d5db' : '#6b7280' }}>
                              {message.content}
                            </div>
                          </div>
                          {message.role === 'assistant' && !message.isError && (
                            <div className="flex items-center gap-2 mt-2">
                              <button className="p-1 transition-colors" style={{ color: darkMode ? '#6b7280' : '#9ca3af' }}>
                                <FiCopy className="w-4 h-4" />
                              </button>
                              <button className="p-1 transition-colors" style={{ color: darkMode ? '#6b7280' : '#9ca3af' }}>
                                <FiThumbsUp className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    {loading && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                          <FiLoader className="w-4 h-4 text-primary-400 animate-spin" />
                        </div>
                        <div className="rounded-2xl px-4 py-3" style={{
                          backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
                          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'
                        }}>
                          <div className="flex gap-1">
                            <span className="w-2 h-2 rounded-full animate-bounce" style={{
                              backgroundColor: darkMode ? '#9ca3af' : '#6b7280',
                              animationDelay: '0ms'
                            }} />
                            <span className="w-2 h-2 rounded-full animate-bounce" style={{
                              backgroundColor: darkMode ? '#9ca3af' : '#6b7280',
                              animationDelay: '150ms'
                            }} />
                            <span className="w-2 h-2 rounded-full animate-bounce" style={{
                              backgroundColor: darkMode ? '#9ca3af' : '#6b7280',
                              animationDelay: '300ms'
                            }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              <div className="p-4" style={{ borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)' }}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask a question about your data..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    style={{
                      backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.9)',
                      border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                      color: darkMode ? '#ffffff' : '#0f172a'
                    }}
                    disabled={loading}
                  />
                  <Button onClick={handleSend} loading={loading} disabled={!input.trim()}>
                    <FiSend className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="hidden xl:block w-80">
          <Card className="sticky top-6">
            <CardBody>
              <h3 className="font-semibold mb-4" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>Quick Actions</h3>
              <div className="space-y-2">
                {SAMPLE_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="w-full text-left px-3 py-2 text-sm rounded-lg transition-all"
                    style={{
                      color: darkMode ? '#94a3b8' : '#64748b',
                      backgroundColor: 'transparent'
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6" style={{ borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)' }}>
                <h3 className="font-semibold mb-4" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>Analysis Types</h3>
                <div className="space-y-2">
                  {[
                    { icon: FiTrendingUp, label: 'Trend Analysis', color: 'primary' },
                    { icon: FiTarget, label: 'Prediction', color: 'secondary' },
                    { icon: FiDollarSign, label: 'Revenue Insights', color: 'success' }
                  ].map((item, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all"
                      style={{
                        color: darkMode ? '#94a3b8' : '#64748b',
                        backgroundColor: 'transparent'
                      }}
                    >
                      <item.icon className={`w-4 h-4 text-${item.color}-400`} />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
