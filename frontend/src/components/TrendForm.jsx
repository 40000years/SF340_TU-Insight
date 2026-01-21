import { useState } from 'react'
import { trendAPI } from '../api'
import '../styles/components.css'

export default function TrendForm({ onTrendAdded }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [formData, setFormData] = useState({
    category: '',
    period: '',
    budget: '',
    targetGroup: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await trendAPI.analyze(
        formData.category,
        formData.period,
        parseFloat(formData.budget),
        formData.targetGroup
      )
      setResult(response.data)
      setFormData({ category: '', period: '', budget: '', targetGroup: '' })
      onTrendAdded()
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h2>Trend Analysis Form</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Market Category *</label>
          <input
            type="text"
            name="category"
            placeholder="e.g., Tech, Fashion, Food, Digital"
            value={formData.category}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Analysis Period *</label>
          <select
            name="period"
            value={formData.period}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Select period</option>
            <option value="short-term">Short Term (1-3 months)</option>
            <option value="medium-term">Medium Term (3-12 months)</option>
            <option value="long-term">Long Term (1+ years)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Marketing Budget ($) *</label>
          <input
            type="number"
            name="budget"
            placeholder="e.g., 25000"
            value={formData.budget}
            onChange={handleChange}
            required
            min="0"
            step="100"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Target Group *</label>
          <input
            type="text"
            name="targetGroup"
            placeholder="e.g., Young professionals, Gen Z, Families"
            value={formData.targetGroup}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Analyzing...' : 'Analyze Trend'}
        </button>
      </form>

      {result && (
        <div className="result-card">
          <h3>Analysis Result</h3>
          <div className="result-content">
            <div className="result-item">
              <span className="label">Predicted Trend:</span>
              <span className={`trend-badge ${result.trend.toLowerCase()}`}>
                {result.trend}
              </span>
            </div>
            <div className="result-item">
              <span className="label">Confidence:</span>
              <span className="value">{(result.confidence * 100).toFixed(1)}%</span>
            </div>
            <div className="result-item full">
              <span className="label">Details:</span>
              <p className="details">{result.details}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
