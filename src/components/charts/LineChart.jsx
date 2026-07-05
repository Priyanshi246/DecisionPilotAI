import {
  LineChart as RechartsLineChart,
  Line,
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
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function LineChart({
  data,
  dataKey = 'value',
  xAxisKey = 'name',
  lines = [],
  height = 300,
  showGrid = true,
  showLegend = true,
  className
}) {
  const defaultLines = lines.length > 0
    ? lines
    : [{ dataKey, stroke: chartColors.primary, name: 'Value' }];

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />}
          <XAxis
            dataKey={xAxisKey}
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <YAxis
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={customTooltip} />
          {showLegend && <Legend />}
          {defaultLines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: line.stroke }}
              name={line.name}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
