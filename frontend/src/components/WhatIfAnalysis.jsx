import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts'
import '../styles/whatif.css'

export default function WhatIfAnalysis({ baselineData }) {
    const [variables, setVariables] = useState({
        budget: 100,
        marketingSpend: 50,
        productPrice: 100,
        competitorPrice: 95,
        seasonalFactor: 100
    })

    const [scenarios, setScenarios] = useState([])
    const [activeScenario, setActiveScenario] = useState(null)

    // Calculate impact based on variables
    const calculateImpact = (vars) => {
        const budgetImpact = (vars.budget / 100) * 1.2
        const marketingImpact = (vars.marketingSpend / 100) * 0.8
        const priceImpact = (vars.productPrice / 100) * -0.5 + 1.5
        const competitorImpact = (vars.competitorPrice / 100) * 0.3
        const seasonalImpact = (vars.seasonalFactor / 100)

        const totalImpact = budgetImpact + marketingImpact + priceImpact - competitorImpact + seasonalImpact
        return Math.max(0, totalImpact * 20) // Scale to reasonable range
    }

    // Generate forecast data
    const generateForecast = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        const baseValue = calculateImpact(variables)

        return months.map((month, index) => {
            const growth = 1 + (index * 0.05) // 5% monthly growth
            const variance = (Math.random() - 0.5) * 10 // Random variance
            return {
                month,
                projected: Math.round(baseValue * growth + variance),
                optimistic: Math.round(baseValue * growth * 1.2 + variance),
                pessimistic: Math.round(baseValue * growth * 0.8 + variance)
            }
        })
    }

    const [forecastData, setForecastData] = useState(generateForecast())

    const handleVariableChange = (variable, value) => {
        const newVariables = { ...variables, [variable]: value }
        setVariables(newVariables)
        setForecastData(generateForecast())
    }

    const saveScenario = () => {
        const scenarioName = prompt('Enter scenario name:')
        if (scenarioName) {
            const newScenario = {
                id: Date.now(),
                name: scenarioName,
                variables: { ...variables },
                impact: calculateImpact(variables),
                forecast: generateForecast()
            }
            setScenarios([...scenarios, newScenario])
        }
    }

    const loadScenario = (scenario) => {
        setVariables(scenario.variables)
        setForecastData(scenario.forecast)
        setActiveScenario(scenario.id)
    }

    const resetToBaseline = () => {
        setVariables({
            budget: 100,
            marketingSpend: 50,
            productPrice: 100,
            competitorPrice: 95,
            seasonalFactor: 100
        })
        setForecastData(generateForecast())
        setActiveScenario(null)
    }

    const currentImpact = calculateImpact(variables)

    return (
        <div className="whatif-container">
            <div className="whatif-header">
                <div>
                    <h2>🔮 What-If Scenario Analysis</h2>
                    <p className="whatif-subtitle">Adjust variables to see projected outcomes</p>
                </div>
                <div className="whatif-actions">
                    <button className="btn btn-secondary" onClick={resetToBaseline}>
                        Reset
                    </button>
                    <button className="btn btn-primary" onClick={saveScenario}>
                        💾 Save Scenario
                    </button>
                </div>
            </div>

            <div className="whatif-grid">
                {/* Variables Panel */}
                <div className="variables-panel glass">
                    <h3>📊 Variables</h3>

                    {Object.entries(variables).map(([key, value]) => (
                        <div key={key} className="variable-control">
                            <div className="variable-header">
                                <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                                <span className="variable-value">{value}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="200"
                                value={value}
                                onChange={(e) => handleVariableChange(key, parseInt(e.target.value))}
                                className="variable-slider"
                            />
                            <div className="slider-labels">
                                <span>0%</span>
                                <span>100%</span>
                                <span>200%</span>
                            </div>
                        </div>
                    ))}

                    <div className="impact-indicator">
                        <div className="impact-label">Projected Impact</div>
                        <div className="impact-value" style={{
                            background: currentImpact > 100 ? 'var(--gradient-success)' :
                                currentImpact > 50 ? 'var(--gradient-warning)' : 'var(--gradient-danger)'
                        }}>
                            {currentImpact.toFixed(1)}%
                        </div>
                    </div>
                </div>

                {/* Forecast Chart */}
                <div className="forecast-panel glass">
                    <h3>📈 6-Month Forecast</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={forecastData}>
                            <defs>
                                <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorOptimistic" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPessimistic" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="month" stroke="var(--text-muted)" />
                            <YAxis stroke="var(--text-muted)" />
                            <Tooltip
                                contentStyle={{
                                    background: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px'
                                }}
                            />
                            <Legend />
                            <Area type="monotone" dataKey="optimistic" stroke="#10b981" fillOpacity={1} fill="url(#colorOptimistic)" />
                            <Area type="monotone" dataKey="projected" stroke="#667eea" fillOpacity={1} fill="url(#colorProjected)" />
                            <Area type="monotone" dataKey="pessimistic" stroke="#ef4444" fillOpacity={1} fill="url(#colorPessimistic)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Saved Scenarios */}
            {scenarios.length > 0 && (
                <div className="scenarios-panel glass fade-in">
                    <h3>💾 Saved Scenarios</h3>
                    <div className="scenarios-grid">
                        {scenarios.map((scenario) => (
                            <div
                                key={scenario.id}
                                className={`scenario-card ${activeScenario === scenario.id ? 'active' : ''}`}
                                onClick={() => loadScenario(scenario)}
                            >
                                <div className="scenario-name">{scenario.name}</div>
                                <div className="scenario-impact">
                                    Impact: <span className="impact-badge">{scenario.impact.toFixed(1)}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
