import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiKey, FiBell, FiGlobe, FiShield, FiSave,
  FiEye, FiEyeOff, FiCheck
} from 'react-icons/fi';
import { Card, CardBody, CardHeader, Input, Button, Badge } from '../components/ui';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { settings, updateSettings } = useApp();
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(settings?.notificationsEnabled ?? true);
  const [language, setLanguage] = useState(settings?.language || 'en');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
    { code: 'de', label: 'German' },
    { code: 'zh', label: 'Chinese' }
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings({
        geminiApiKey,
        notificationsEnabled,
        language
      });
      localStorage.setItem('geminiApiKey', geminiApiKey);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
    setSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Configure your application preferences</p>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-3">
          <FiKey className="w-5 h-5 text-primary-400" />
          <div>
            <h3 className="text-lg font-semibold text-white">AI Configuration</h3>
            <p className="text-sm text-gray-400">Configure your Gemini API key for AI features</p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="relative">
            <Input
              label="Gemini API Key"
              type={showApiKey ? 'text' : 'password'}
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
            />
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-9 text-gray-400 hover:text-white transition-colors"
            >
              {showApiKey ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-sm text-gray-400">
            Get your API key from{' '}
            <a
              href="https://makersuite.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              Google AI Studio
            </a>
          </p>
          {geminiApiKey && (
            <Badge variant="success">
              <FiCheck className="w-3 h-3 mr-1" /> API Key Configured
            </Badge>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex items-center gap-3">
          <FiBell className="w-5 h-5 text-warning-400" />
          <div>
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
            <p className="text-sm text-gray-400">Manage how you receive alerts</p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div>
              <p className="font-medium text-white">Enable Notifications</p>
              <p className="text-sm text-gray-400">Receive alerts for important events</p>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-14 h-7 rounded-full transition-colors ${
                notificationsEnabled ? 'bg-primary-500' : 'bg-gray-600'
              } relative`}
            >
              <div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${
                notificationsEnabled ? 'translate-x-8' : 'translate-x-1'
              }`} />
            </button>
          </div>
          {[
            { label: 'Alert Notifications', description: 'Critical system alerts', enabled: true },
            { label: 'Report Notifications', description: 'When reports are ready', enabled: true },
            { label: 'Marketing Updates', description: 'Product news and updates', enabled: false }
          ].map((notif, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="font-medium text-white">{notif.label}</p>
                <p className="text-sm text-gray-400">{notif.description}</p>
              </div>
              <input
                type="checkbox"
                checked={notif.enabled}
                className="w-5 h-5 rounded border-white/20 bg-dark-card/50 text-primary-500 focus:ring-primary-500/50"
                readOnly
              />
            </div>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex items-center gap-3">
          <FiGlobe className="w-5 h-5 text-success-400" />
          <div>
            <h3 className="text-lg font-semibold text-white">Language</h3>
            <p className="text-sm text-gray-400">Select your preferred language</p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-3 rounded-xl text-left transition-all ${
                  language === lang.code
                    ? 'bg-primary-500/20 border-2 border-primary-500'
                    : 'bg-white/5 border-2 border-transparent hover:border-white/20'
                }`}
              >
                <p className="font-medium text-white">{lang.label}</p>
                <p className="text-xs text-gray-400">{lang.code.toUpperCase()}</p>
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex items-center gap-3">
          <FiShield className="w-5 h-5 text-danger-400" />
          <div>
            <h3 className="text-lg font-semibold text-white">Security</h3>
            <p className="text-sm text-gray-400">Manage your account security</p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <Button variant="outline" className="w-full">
            Change Password
          </Button>
          <Button variant="outline" className="w-full">
            Enable Two-Factor Authentication
          </Button>
          <button className="w-full p-3 text-danger-400 hover:bg-danger-500/10 rounded-xl transition-colors text-left">
            Delete Account
          </button>
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} loading={saving}>
          {saved ? <><FiCheck className="w-5 h-5" /> Saved</> : <><FiSave className="w-5 h-5" /> Save Settings</>}
        </Button>
      </div>
    </div>
  );
}
