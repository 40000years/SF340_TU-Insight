import { useState } from 'react'
import '../styles/insights.css'

export default function InsightCard({ insights = [] }) {
    const [expanded, setExpanded] = useState({})

    const toggleExpand = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
    }

    // Generate auto-insights if none provided
    const defaultInsights = [
        {
            id: 1,
            icon: '📈',
            type: 'trend',
            title: 'Upward Trend Detected',
            summary: 'Your market analysis shows a 15% increase in positive trends over the last quarter.',
            details: 'This growth is primarily driven by increased consumer confidence and seasonal factors. Consider capitalizing on this momentum by increasing marketing spend in high-performing categories.',
            action: 'Increase budget allocation to trending categories',
            priority: 'high'
        },
        {
            id: 2,
            icon: '💡',
            type: 'recommendation',
            title: 'Optimization Opportunity',
            summary: 'Budget reallocation could improve ROI by 12%.',
            details: 'Analysis shows that shifting 20% of budget from underperforming segments to high-confidence categories could yield significant returns. Historical data supports this strategy.',
            action: 'Review budget distribution across categories',
            priority: 'medium'
        },
        {
            id: 3,
            icon: '⚠️',
            type: 'warning',
            title: 'Competitor Activity Alert',
            summary: 'Increased competition detected in 3 key categories.',
            details: 'Market data indicates new competitors entering your primary segments. Price sensitivity has increased by 8%. Consider defensive strategies or differentiation tactics.',
            action: 'Conduct competitive analysis and adjust pricing',
            priority: 'high'
        },
        {
            id: 4,
            icon: '🎯',
            type: 'opportunity',
            title: 'New Market Segment',
            summary: 'Emerging opportunity in untapped demographic.',
            details: 'Data reveals growing interest from a previously overlooked customer segment. Early entry could establish market leadership with minimal competition.',
            action: 'Explore expansion into new demographic',
            priority: 'medium'
        }
    ]

    const displayInsights = insights.length > 0 ? insights : defaultInsights

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'var(--gradient-danger)'
            case 'medium':
                return 'var(--gradient-warning)'
            case 'low':
                return 'var(--gradient-info)'
            default:
                return 'var(--gradient-primary)'
        }
    }

    return (
        <div className="insights-container">
            <div className="insights-header">
                <h2>🤖 AI-Powered Insights</h2>
                <p className="insights-subtitle">Actionable recommendations based on your data</p>
            </div>

            <div className="insights-grid">
                {displayInsights.map((insight) => (
                    <div key={insight.id} className="insight-card glass">
                        <div className="insight-header">
                            <div className="insight-icon">{insight.icon}</div>
                            <div className="insight-title-section">
                                <h3>{insight.title}</h3>
                                <span
                                    className="priority-badge"
                                    style={{ background: getPriorityColor(insight.priority) }}
                                >
                                    {insight.priority}
                                </span>
                            </div>
                        </div>

                        <p className="insight-summary">{insight.summary}</p>

                        {expanded[insight.id] && (
                            <div className="insight-details fade-in">
                                <p className="insight-detail-text">{insight.details}</p>
                                <div className="insight-action">
                                    <strong>Recommended Action:</strong>
                                    <p>{insight.action}</p>
                                </div>
                            </div>
                        )}

                        <button
                            className="expand-btn"
                            onClick={() => toggleExpand(insight.id)}
                        >
                            {expanded[insight.id] ? '▲ Show Less' : '▼ Show More'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
