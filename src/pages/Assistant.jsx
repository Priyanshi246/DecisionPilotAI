import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSend, FiUser, FiCpu, FiLoader, FiCopy, FiThumbsUp,
  FiAlertCircle, FiTrendingUp, FiTarget, FiDollarSign
} from 'react-icons/fi';
import { Card, CardBody, Button, Badge } from '../components/ui';
import { analyzeData } from '../services/gemini';
import { SAMPLE_QUESTIONS } from '../utils/constants';
import { EXAMPLE_DATASET } from '../utils/constants';

export default function Assistant() {
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
        <h1 className="text-2xl font-bold text-white">AI Assistant</h1>
        <p className="text-gray-400 mt-1">Ask questions about your data and get AI-powered insights</p>
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
                    <h2 className="text-xl font-semibold text-white mb-2">Ask me anything about your data</h2>
                    <p className="text-gray-400 max-w-md mb-6">
                      I can analyze patterns, make predictions, and provide actionable recommendations.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {SAMPLE_QUESTIONS.slice(0, 4).map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuestionClick(question)}
                          className="px-4 py-2 text-sm text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all"
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
                          <div className={`inline-block rounded-2xl px-4 py-3 ${
                            message.role === 'user'
                              ? 'bg-primary-500/20 border border-primary-500/30'
                              : message.isError
                                ? 'bg-danger-500/10 border border-danger-500/30'
                                : 'bg-white/5 border border-white/10'
                          }`}>
                            <div className="text-sm text-gray-200 whitespace-pre-wrap">
                              {message.content}
                            </div>
                          </div>
                          {message.role === 'assistant' && !message.isError && (
                            <div className="flex items-center gap-2 mt-2">
                              <button className="p-1 text-gray-500 hover:text-white transition-colors">
                                <FiCopy className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-500 hover:text-success-400 transition-colors">
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
                        <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask a question about your data..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 px-4 py-3 bg-dark-card/50 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
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
              <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {SAMPLE_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    {question}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="font-semibold text-white mb-4">Analysis Types</h3>
                <div className="space-y-2">
                  {[
                    { icon: FiTrendingUp, label: 'Trend Analysis', color: 'primary' },
                    { icon: FiTarget, label: 'Prediction', color: 'secondary' },
                    { icon: FiDollarSign, label: 'Revenue Insights', color: 'success' }
                  ].map((item, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
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
