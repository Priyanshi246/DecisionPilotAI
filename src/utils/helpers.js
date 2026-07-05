import { clsx } from 'clsx';

export function cn(...inputs) {
  return clsx(inputs);
}

export function formatNumber(num) {
  if (num === null || num === undefined) return '-';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
}

export function formatCurrency(num, currency = 'USD') {
  if (num === null || num === undefined) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(num);
}

export function formatPercent(num) {
  if (num === null || num === undefined) return '-';
  return num.toFixed(1) + '%';
}

export function formatDate(date) {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatDateTime(date) {
  if (!date) return '-';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function truncate(str, length = 50) {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function randomId() {
  return Math.random().toString(36).substring(2, 9);
}

export function getFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getFileExtension(filename) {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function calculateTrend(current, previous) {
  if (!previous || previous === 0) return { value: 0, direction: 'neutral' };
  const change = ((current - previous) / previous) * 100;
  return {
    value: Math.abs(change).toFixed(1),
    direction: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'
  };
}

export function getConfidenceLevel(score) {
  if (score >= 80) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}

export const chartColors = {
  primary: '#2563EB',
  secondary: '#7C3AED',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  cyan: '#06B6D4',
  pink: '#EC4899',
  orange: '#F97316'
};

export const getChartColor = (index) => {
  const colors = Object.values(chartColors);
  return colors[index % colors.length];
};
