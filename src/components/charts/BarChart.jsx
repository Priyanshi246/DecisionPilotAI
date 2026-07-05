import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { cn, chartColors } from '../../utils/helpers';

const customTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-card border border-white/10 rounded-lg p-3 shadow-xl">
        <p className="text-sm font-medium text-white mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color || entry.fill }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function BarChart({
  data,
  dataKey = 'value',
  xAxisKey = 'name',
  bars = [],
  height = 300,
  showGrid = true,
  showLegend = false,
  layout = 'vertical',
  className
}) {
  const defaultBars = bars.length > 0
    ? bars
    : [{ dataKey, fill: chartColors.primary, name: 'Value' }];

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={{ top: 10, right: 10, left: layout === 'vertical' ? 80 : -20, bottom: 0 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />}
          {layout === 'vertical' ? (
            <>
              <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis dataKey={xAxisKey} type="category" stroke="#64748b" fontSize={12} tickLine={false} width={70} />
            </>
          ) : (
            <>
              <XAxis dataKey={xAxisKey} stroke="#64748b" fontSize={12} tickLine={false} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tickFormatter={(value) => value.toLocaleString()} />
            </>
          )}
          <Tooltip content={customTooltip} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
          {showLegend && <Legend />}
          {defaultBars.map((bar, index) => (
            <Bar
              key={index}
              dataKey={bar.dataKey}
              fill={bar.fill}
              radius={[4, 4, 0, 0]}
              name={bar.name}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
