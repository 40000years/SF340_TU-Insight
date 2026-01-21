package trends

import (
	"fmt"
	"strings"
)

type TrendResult struct {
	Trend      string
	Confidence float64
	Details    string
}

func AnalyzeTrend(category, period string, budget float64, targetGroup string) TrendResult {
	trend := "STABLE"
	confidence := 0.6
	details := ""

	// Rule-based trend analysis
	categoryLower := strings.ToLower(category)
	periodLower := strings.ToLower(period)
	targetGroupLower := strings.ToLower(targetGroup)

	// Budget impact
	if budget > 50000 {
		trend = "GROWTH"
		confidence = 0.85
	} else if budget < 10000 {
		trend = "DECLINE"
		confidence = 0.7
	}

	// Category rules
	if strings.Contains(categoryLower, "tech") || strings.Contains(categoryLower, "digital") {
		trend = "GROWTH"
		confidence = 0.9
	}
	if strings.Contains(categoryLower, "traditional") || strings.Contains(categoryLower, "print") {
		trend = "DECLINE"
		confidence = 0.8
	}

	// Period rules
	if strings.Contains(periodLower, "short") || strings.Contains(periodLower, "week") {
		confidence += 0.05
	}
	if strings.Contains(periodLower, "long") || strings.Contains(periodLower, "year") {
		confidence -= 0.1
	}

	// Target group rules
	if strings.Contains(targetGroupLower, "young") || strings.Contains(targetGroupLower, "gen") {
		trend = "GROWTH"
		confidence = 0.92
	}
	if strings.Contains(targetGroupLower, "senior") || strings.Contains(targetGroupLower, "older") {
		trend = "STABLE"
		confidence = 0.75
	}

	// Ensure confidence is within bounds
	if confidence > 1.0 {
		confidence = 1.0
	}
	if confidence < 0.0 {
		confidence = 0.0
	}

	// Generate details
	details = generateDetails(category, period, budget, targetGroup, trend, confidence)

	return TrendResult{
		Trend:      trend,
		Confidence: confidence,
		Details:    details,
	}
}

func generateDetails(category string, period string, budget float64, targetGroup string, trend string, confidence float64) string {
	return fmt.Sprintf(
		"Analysis for %s market targeting %s over %s with budget $%.2f. Predicted trend: %s (confidence: %.0f%%). "+
			"This trend is based on market category characteristics, budget allocation, and target demographic analysis.",
		category, targetGroup, period, budget, trend, confidence*100,
	)
}
