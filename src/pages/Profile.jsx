import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiUser, FiMail, FiBriefcase, FiCamera,
  FiSave, FiMoon, FiSun
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Card, CardBody, CardHeader, Input, Button } from '../components/ui';

export default function Profile() {
  const { user, profile, updateProfile } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  const [name, setName] = useState(profile?.name || '');
  const [email] = useState(user?.email || '');
  const [organization, setOrganization] = useState(profile?.organization || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({ name, organization });
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
    setSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="text-gray-400 mt-1">Manage your account settings</p>
      </div>

      <Card>
        <CardBody className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-4xl font-bold">
                  {name?.[0]?.toUpperCase() || 'U'}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-dark-card border border-white/10 flex items-center justify-center hover:bg-dark-cardHover transition-colors">
                  <FiCamera className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <p className="mt-4 text-lg font-semibold text-white">{name || 'User'}</p>
              <p className="text-sm text-gray-400">{email}</p>
            </div>

            <div className="flex-1 space-y-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={FiUser}
                placeholder="Your name"
              />

              <Input
                label="Email"
                value={email}
                disabled
                icon={FiMail}
              />

              <Input
                label="Organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                icon={FiBriefcase}
                placeholder="Your company"
              />

              <Button onClick={handleSave} loading={saving} className="mt-6">
                <FiSave className="w-5 h-5" /> Save Changes
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Preferences</h3>
          <p className="text-sm text-gray-400">Customize your experience</p>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              {darkMode ? <FiMoon className="w-5 h-5 text-gray-400" /> : <FiSun className="w-5 h-5 text-gray-400" />}
              <div>
                <p className="font-medium text-white">Dark Mode</p>
                <p className="text-sm text-gray-400">Toggle dark theme appearance</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-7 rounded-full transition-colors ${
                darkMode ? 'bg-primary-500' : 'bg-gray-600'
              } relative`}
            >
              <div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${
                darkMode ? 'translate-x-8' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Account Stats</h3>
          <p className="text-sm text-gray-400">Your usage overview</p>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Datasets', value: '12' },
              { label: 'Predictions', value: '48' },
              { label: 'Reports', value: '24' },
              { label: 'Days Active', value: '156' }
            ].map((stat) => (
              <div key={stat.label} className="p-4 bg-white/5 rounded-xl text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
