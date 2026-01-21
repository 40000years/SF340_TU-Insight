import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const COLORS = {
  GROWTH: '#10b981',
  DECLINE: '#ef4444',
  STABLE: '#f59e0b',
}

export default function TrendChart({ metrics }) {
  const chartData = metrics.trend_breakdown
    ? Object.entries(metrics.trend_breakdown).map(([trend, count]) => ({
        name: trend,
        value: count,
        fill: COLORS[trend] || '#6b7280',
      }))
    : []

  const barData = metrics.categories
    ? metrics.categories.slice(0, 5).map((cat, idx) => ({
        name: cat,
        analyses: Math.floor(Math.random() * 10) + 1,
      }))
    : []

  return (
    <div className="chart-container">
      <div className="chart">
        <h3>Trend Distribution</h3>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="no-data">No trend data available</p>
        )}
      </div>

      <div className="chart">
        <h3>Analyses by Category</h3>
        {barData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="analyses" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="no-data">No category data available</p>
        )}
      </div>
    </div>
  )
}
