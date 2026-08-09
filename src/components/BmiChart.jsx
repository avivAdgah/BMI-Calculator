import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { BMI_CATEGORIES, getBmiCategory } from '../utils/bmi';

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const bmi = payload[0].value;
  const category = getBmiCategory(bmi);
  return (
    <div className="bmi-chart__tooltip">
      <p className="bmi-chart__tooltip-date">{label}</p>
      <p className="bmi-chart__tooltip-bmi">BMI: {bmi.toFixed(1)}</p>
      <p className="bmi-chart__tooltip-category" style={{ color: category.color }}>
        {category.label}
      </p>
    </div>
  );
}

function Dot(props) {
  const { cx, cy, value } = props;
  const category = getBmiCategory(value);
  return <circle cx={cx} cy={cy} r={4} fill={category.color} stroke="white" strokeWidth={1.5} />;
}

function BmiChart({ history, onClear }) {
  const thresholds = BMI_CATEGORIES.slice(0, -1);

  return (
    <div className="bmi-chart">
      <div className="bmi-chart__header">
        <h2>מעקב היסטוריה</h2>
        {history.length > 0 && (
          <button type="button" className="bmi-chart__clear" onClick={onClear}>
            נקה היסטוריה
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="bmi-chart__empty">עדיין אין נתונים — חשבו את ה-BMI שלכם כדי להתחיל לעקוב</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={history} margin={{ top: 10, right: 16, bottom: 0, left: -16 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--muted)' }} />
            <YAxis tick={{ fontSize: 12, fill: 'var(--muted)' }} domain={['dataMin - 2', 'dataMax + 2']} />
            <Tooltip content={<ChartTooltip />} />
            {thresholds.map((category) => (
              <ReferenceLine
                key={category.key}
                y={category.max}
                stroke={category.color}
                strokeDasharray="4 4"
                strokeOpacity={0.5}
              />
            ))}
            <Line type="monotone" dataKey="bmi" stroke="#8884d8" strokeWidth={2} dot={<Dot />} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default BmiChart;
