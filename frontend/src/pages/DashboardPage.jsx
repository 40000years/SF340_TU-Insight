import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { trendAPI, dashboardAPI } from '../api'
import { useAuth } from '../context/AuthContext'
import TrendForm from '../components/TrendForm'
import TrendChart from '../components/TrendChart'
import MetricsCard from '../components/MetricsCard'
import '../styles/dashboard.css'
import logo from '../../logo_prod.png'

export default function DashboardPage({ theme, onToggleTheme }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [metrics, setMetrics] = useState(null)
  const [trends, setTrends] = useState([])
  const [filteredTrends, setFilteredTrends] = useState([])
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTrend, setFilterTrend] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  useEffect(() => {
    loadDashboard()
  }, [])

  useEffect(() => {
    filterAndSortTrends()
  }, [trends, searchQuery, filterTrend, sortBy])

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

  const filterAndSortTrends = () => {
    let filtered = trends.filter((trend) => {
      if (!trend || !trend.category || !trend.target_group) return false
      
      const matchesSearch = 
        trend.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trend.target_group.toLowerCase().includes(searchQuery.toLowerCase())
      
      const trendValue = trend.trend ? trend.trend.toLowerCase() : ''
      const matchesTrend = filterTrend === 'all' || trendValue === filterTrend.toLowerCase()
      
      return matchesSearch && matchesTrend
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'confidence':
          return (b.confidence || 0) - (a.confidence || 0)
        case 'budget':
          return (b.budget || 0) - (a.budget || 0)
        case 'date':
        default:
          return new Date(b.created_at || 0) - new Date(a.created_at || 0)
      }
    })

    setFilteredTrends(filtered)
  }

  const handleTrendAdded = () => {
    loadDashboard()
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const exportToCSV = () => {
    const csv = [
      ['Category', 'Period', 'Budget', 'Target Group', 'Trend', 'Confidence', 'Date'],
      ...trends.map((t) => [
        t.category,
        t.period,
        t.budget,
        t.target_group,
        t.trend,
        (t.confidence * 100).toFixed(0) + '%',
        new Date(t.created_at).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `trends-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return '#10b981'
    if (confidence >= 0.6) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <img src={logo} alt="TU Insight logo" className="dashboard-logo" />
          <div>
            <h1>TU Insight Dashboard</h1>
            <p className="welcome">Welcome, {user?.name || 'User'}</p>
          </div>
        </div>
        <div className="header-actions">
          <button type="button" className="theme-toggle" onClick={onToggleTheme}>
            {theme === 'light' ? '🌙 Night' : '☀️ Light'}
          </button>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </header>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Overview
        </button>
        <button
          className={`tab ${activeTab === 'analyze' ? 'active' : ''}`}
          onClick={() => setActiveTab('analyze')}
        >
          🔍 Analyze
        </button>
        <button
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          📈 History
        </button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          Loading your dashboard...
        </div>
      ) : (
        <>
          {activeTab === 'dashboard' && (
            <section className="section">
              {metrics && (
                <>
                  {/* Quick Stats */}
                  <div className="quick-stats">
                    <div className="stat-item">
                      <div className="stat-value">{metrics.total_analyses}</div>
                      <div className="stat-label">Total Analyses</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">{metrics.high_confidence}</div>
                      <div className="stat-label">High Confidence</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">{metrics.categories?.length || 0}</div>
                      <div className="stat-label">Categories</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value" style={{ color: 'var(--primary)' }}>
                        {metrics.average_trend || 'N/A'}
                      </div>
                      <div className="stat-label">Primary Trend</div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <h2 className="section-title">Key Metrics</h2>
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

                  {/* Trend Chart */}
                  <h2 className="section-title">Trend Analysis</h2>
                  <TrendChart metrics={metrics} />

                  {/* Trend Distribution */}
                  {metrics.trend_breakdown && (
                    <>
                      <h2 className="section-title">Trend Distribution</h2>
                      <div className="trend-distribution">
                        {Object.entries(metrics.trend_breakdown).map(([trend, count]) => {
                          const total = metrics.total_analyses || 1
                          const percentage = (count / total) * 100
                          return (
                            <div key={trend} className="distribution-item">
                              <div className="distribution-header">
                                <span className="distribution-label">{trend}</span>
                                <span className="distribution-count">{count}</span>
                              </div>
                              <div className="distribution-bar">
                                <div
                                  className="distribution-fill"
                                  style={{
                                    width: `${percentage}%`,
                                    backgroundColor:
                                      trend.toLowerCase() === 'upward'
                                        ? '#10b981'
                                        : trend.toLowerCase() === 'downward'
                                        ? '#ef4444'
                                        : '#f59e0b',
                                  }}
                                ></div>
                              </div>
                              <span className="distribution-percentage">{percentage.toFixed(0)}%</span>
                            </div>
                          )
                        })}
                      </div>
                    </>
                  )}
                </>
              )}
            </section>
          )}

          {activeTab === 'analyze' && (
            <section className="section">
              <h2 className="section-title">🔍 Analyze New Trend</h2>
              <TrendForm onTrendAdded={handleTrendAdded} />
            </section>
          )}

          {activeTab === 'history' && (
            <section className="section">
              <div className="history-header">
                <h2 className="section-title">📈 Analysis History</h2>
                <button className="btn btn-primary" onClick={exportToCSV}>
                  📥 Export CSV
                </button>
              </div>

              {/* Filters */}
              <div className="filters">
                <input
                  type="text"
                  placeholder="🔍 Search by category or target group..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <select value={filterTrend} onChange={(e) => setFilterTrend(e.target.value)} className="filter-select">
                  <option value="all">All Trends</option>
                  <option value="upward">📈 Upward</option>
                  <option value="downward">📉 Downward</option>
                  <option value="stable">➡️ Stable</option>
                </select>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
                  <option value="date">Sort by Date</option>
                  <option value="confidence">Sort by Confidence</option>
                  <option value="budget">Sort by Budget</option>
                </select>
              </div>

              {/* Data Table */}
              <div className="history-table">
                {filteredTrends.length === 0 ? (
                  <p className="no-data">
                    {trends.length === 0
                      ? 'No analyses yet. Start by analyzing a trend!'
                      : 'No results match your filters.'}
                  </p>
                ) : (
                  <>
                    <div className="table-info">
                      Showing {filteredTrends.length} of {trends.length} analyses
                    </div>
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
                        {filteredTrends.map((trend) => (
                          <tr key={trend.id} className="trend-row">
                            <td>{trend.category}</td>
                            <td>{trend.period}</td>
                            <td className="budget-cell">${trend.budget.toFixed(2)}</td>
                            <td>{trend.target_group}</td>
                            <td>
                              <span className={`trend-badge ${trend.trend.toLowerCase()}`}>
                                {trend.trend === 'upward' && '📈'}
                                {trend.trend === 'downward' && '📉'}
                                {trend.trend === 'stable' && '➡️'} {trend.trend}
                              </span>
                            </td>
                            <td>
                              <div className="confidence-cell">
                                <div className="confidence-bar">
                                  <div
                                    className="confidence-fill"
                                    style={{
                                      width: `${trend.confidence * 100}%`,
                                      backgroundColor: getConfidenceColor(trend.confidence),
                                    }}
                                  ></div>
                                </div>
                                <span className="confidence-text">{(trend.confidence * 100).toFixed(0)}%</span>
                              </div>
                            </td>
                            <td>{new Date(trend.created_at).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
