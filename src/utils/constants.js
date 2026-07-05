export const APP_NAME = 'DecisionPilot AI';
export const APP_TAGLINE = 'Transform Raw Data into Smart Decisions';

export const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'Dashboard', path: '/dashboard' },
  { id: 'upload', label: 'Upload Data', icon: 'Upload', path: '/upload' },
  { id: 'datasets', label: 'Datasets', icon: 'Database', path: '/datasets' },
  { id: 'assistant', label: 'AI Assistant', icon: 'Chat', path: '/assistant' },
  { id: 'forecast', label: 'Forecast', icon: 'TrendingUp', path: '/forecast' },
  { id: 'recommendations', label: 'Recommendations', icon: 'Lightbulb', path: '/recommendations' },
  { id: 'reports', label: 'Reports', icon: 'FileText', path: '/reports' },
  { id: 'notifications', label: 'Notifications', icon: 'Bell', path: '/notifications' },
  { id: 'profile', label: 'Profile', icon: 'User', path: '/profile' },
  { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' }
];

export const SAMPLE_QUESTIONS = [
  'Why are sales decreasing?',
  'Predict next month\'s revenue',
  'Which products are risky?',
  'What should I do to improve profit?',
  'What are the top performing segments?',
  'Where can I reduce costs?'
];

export const FORECAST_TYPES = [
  { id: 'revenue', label: 'Revenue Forecast', color: 'primary' },
  { id: 'demand', label: 'Demand Forecast', color: 'secondary' },
  { id: 'inventory', label: 'Inventory Forecast', color: 'success' },
  { id: 'customers', label: 'Customer Growth Forecast', color: 'warning' }
];

export const FILE_TYPES = {
  csv: { accept: '.csv', label: 'CSV', icon: 'FileSpreadsheet' },
  excel: { accept: '.xlsx,.xls', label: 'Excel', icon: 'FileSpreadsheet' },
  json: { accept: '.json', label: 'JSON', icon: 'FileCode' },
  pdf: { accept: '.pdf', label: 'PDF', icon: 'FileText' },
  image: { accept: 'image/*', label: 'Images', icon: 'Image' }
};

export const PRIORITY_LEVELS = {
  high: { label: 'High', color: 'danger' },
  medium: { label: 'Medium', color: 'warning' },
  low: { label: 'Low', color: 'success' }
};

export const NOTIFICATION_TYPES = {
  alert: { label: 'Alert', color: 'danger' },
  warning: { label: 'Warning', color: 'warning' },
  info: { label: 'Info', color: 'primary' },
  success: { label: 'Success', color: 'success' }
};

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'zh', label: 'Chinese' }
];

export const EXAMPLE_DATASET = [
  { month: 'Jan', revenue: 45000, expenses: 32000, customers: 234, products: 45 },
  { month: 'Feb', revenue: 52000, expenses: 35000, customers: 267, products: 48 },
  { month: 'Mar', revenue: 48000, expenses: 34000, customers: 245, products: 52 },
  { month: 'Apr', revenue: 61000, expenses: 38000, customers: 289, products: 55 },
  { month: 'May', revenue: 55000, expenses: 36000, customers: 278, products: 58 },
  { month: 'Jun', revenue: 67000, expenses: 42000, customers: 312, products: 62 },
  { month: 'Jul', revenue: 72000, expenses: 45000, customers: 345, products: 65 },
  { month: 'Aug', revenue: 68000, expenses: 43000, customers: 328, products: 68 },
  { month: 'Sep', revenue: 78000, expenses: 48000, customers: 367, products: 72 },
  { month: 'Oct', revenue: 85000, expenses: 52000, customers: 398, products: 78 },
  { month: 'Nov', revenue: 92000, expenses: 56000, customers: 423, products: 82 },
  { month: 'Dec', revenue: 105000, expenses: 62000, customers: 467, products: 90 }
];
