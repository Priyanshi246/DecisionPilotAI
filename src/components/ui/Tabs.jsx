import { FiSearch, FiFilter, FiDownload } from 'react-icons/fi';
import { cn } from '../../utils/helpers';

export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex items-center gap-1 p-1 bg-dark-card/50 rounded-xl border border-white/10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-lg transition-all',
            activeTab === tab.id
              ? 'bg-primary-500/20 text-white'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={cn(
              'ml-2 px-2 py-0.5 rounded-full text-xs',
              activeTab === tab.id ? 'bg-primary-500/30' : 'bg-white/10'
            )}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export function PillTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-full transition-all border',
            activeTab === tab.id
              ? 'bg-primary-500 text-white border-primary-500'
              : 'bg-transparent text-gray-400 border-white/20 hover:border-white/40 hover:text-white'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
