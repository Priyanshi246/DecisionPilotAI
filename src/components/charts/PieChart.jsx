import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { cn, chartColors } from '../../utils/helpers';

const customTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-dark-card border border-white/10 rounded-lg p-3 shadow-xl">
        <p className="text-sm font-medium text-white">{data.name}</p>
        <p className="text-sm text-primary-400">
          Value: {typeof data.value === 'number' ? data.value.toLocaleString() : data.value}
        </p>
        {data.percentage !== undefined && (
          <p className="text-sm text-gray-400">{data.percentage.toFixed(1)}%</p>
        )}
      </div>
    );
  }
  return null;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChart({
  data,
  height = 300,
  showLegend = true,
  showLabels = true,
  innerRadius = 0,
  outerRadius = 100,
  className
}) {
  const colors = Object.values(chartColors);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: (item.value / total) * 100
  }));

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={dataWithPercentage}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={showLabels ? renderCustomizedLabel : null}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || colors[index % colors.length]}
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip content={customTooltip} />
          {showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
