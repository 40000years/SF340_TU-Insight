import { useState, useEffect } from 'react'
import { trendAPI, dashboardAPI } from '../api'
import { useAuth } from '../context/AuthContext'
import TrendForm from '../components/TrendForm'
import TrendChart from '../components/TrendChart'
import MetricsCard from '../components/MetricsCard'
import '../styles/dashboard.css'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [metrics, setMetrics] = useState(null)
  const [trends, setTrends] = useState([])
  const [activeTab, setActiveTab] = useState('analyze')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      setLoading(true)
      const [metricsRes, trendsRes] = await Promise.all([
        dashboardAPI.getMetrics(),
        trendAPI.getHistory(),
      ])
      setMetrics(metricsRes.data)
      setTrends(trendsRes.data || [])
    } catch (error) {
      console.error('Failed to load dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTrendAdded = () => {
    loadDashboard()
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>📊 Marketing Trend Analysis</h1>
          <p className="welcome">Welcome, {user?.name || 'User'}</p>
        </div>
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </header>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'analyze' ? 'active' : ''}`}
          onClick={() => setActiveTab('analyze')}
        >
          Analyze Trend
        </button>
        <button
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {activeTab === 'analyze' && (
            <section className="section">
              <TrendForm onTrendAdded={handleTrendAdded} />
            </section>
          )}

          {activeTab === 'dashboard' && (
            <section className="section">
              <h2>Dashboard Metrics</h2>
              {metrics && (
                <div className="metrics-grid">
                  <MetricsCard
                    title="Total Analyses"
                    value={metrics.total_analyses}
                    icon="📈"
                  />
                  <MetricsCard
                    title="High Confidence"
                    value={metrics.high_confidence}
                    icon="✓"
                  />
                  <MetricsCard
                    title="Categories"
                    value={metrics.categories?.length || 0}
                    icon="📂"
                  />
                  <MetricsCard
                    title="Primary Trend"
                    value={metrics.average_trend}
                    icon="🎯"
                  />
                </div>
              )}
              {metrics && <TrendChart metrics={metrics} />}
            </section>
          )}

          {activeTab === 'history' && (
            <section className="section">
              <h2>Analysis History</h2>
              <div className="history-table">
                {trends.length === 0 ? (
                  <p className="no-data">No analyses yet. Start by analyzing a trend!</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Period</th>
                        <th>Budget</th>
                        <th>Target Group</th>
                        <th>Trend</th>
                        <th>Confidence</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trends.map((trend) => (
                        <tr key={trend.id}>
                          <td>{trend.category}</td>
                          <td>{trend.period}</td>
                          <td>${trend.budget}</td>
                          <td>{trend.target_group}</td>
                          <td>
                            <span className={`trend-badge ${trend.trend.toLowerCase()}`}>
                              {trend.trend}
                            </span>
                          </td>
                          <td>{(trend.confidence * 100).toFixed(0)}%</td>
                          <td>{new Date(trend.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
