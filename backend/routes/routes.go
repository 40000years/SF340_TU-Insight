package routes

import (
	"net/http"
	"strconv"
	"strings"
	"time"

	"trendanalysis/auth"
	"trendanalysis/database"
	"trendanalysis/trends"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type RegisterRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	Name     string `json:"name" binding:"required"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type AuthResponse struct {
	Token string   `json:"token"`
	User  UserInfo `json:"user"`
}

type UserInfo struct {
	ID    uint   `json:"id"`
	Email string `json:"email"`
	Name  string `json:"name"`
}

type TrendRequest struct {
	Category    string  `json:"category" binding:"required"`
	Period      string  `json:"period" binding:"required"`
	Budget      float64 `json:"budget" binding:"required,gt=0"`
	TargetGroup string  `json:"target_group" binding:"required"`
}

type TrendResponse struct {
	ID         uint    `json:"id"`
	Trend      string  `json:"trend"`
	Confidence float64 `json:"confidence"`
	Details    string  `json:"details"`
}

type DashboardMetrics struct {
	TotalAnalyses  int64            `json:"total_analyses"`
	AverageTrend   string           `json:"average_trend"`
	HighConfidence int64            `json:"high_confidence"`
	Categories     []string         `json:"categories"`
	TrendBreakdown map[string]int64 `json:"trend_breakdown"`
}

type SaveDashboardRequest struct {
	Title string      `json:"title" binding:"required"`
	Type  string      `json:"type" binding:"required"`
	Data  interface{} `json:"data" binding:"required"`
}

func SetupRoutes(router *gin.Engine, db *gorm.DB) {
	// Public routes
	public := router.Group("/api/auth")
	{
		public.POST("/register", Register(db))
		public.POST("/login", Login(db))
	}

	// Protected routes
	protected := router.Group("/api")
	protected.Use(AuthMiddleware())
	{
		// Trend routes
		protected.POST("/trends/analyze", AnalyzeTrend(db))
		protected.GET("/trends/history", GetTrendHistory(db))
		protected.GET("/trends/:id", GetTrendByID(db))

		// Dashboard routes
		protected.GET("/dashboard/metrics", GetDashboardMetrics(db))
		protected.POST("/dashboard/widgets", SaveDashboardWidget(db))
		protected.GET("/dashboard/widgets", GetDashboardWidgets(db))
	}

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})
}

// AuthMiddleware - protect routes with JWT
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing authorization header"})
			c.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		claims, err := auth.VerifyToken(tokenString)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.Set("userID", claims.UserID)
		c.Set("email", claims.Email)
		c.Next()
	}
}

// Register handler
func Register(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req RegisterRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Check if user exists
		var existingUser database.User
		if err := db.Where("email = ?", req.Email).First(&existingUser).Error; err == nil {
			c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
			return
		}

		// Hash password
		hashedPassword, err := auth.HashPassword(req.Password)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
			return
		}

		// Create user
		user := database.User{
			Email:    req.Email,
			Password: hashedPassword,
			Name:     req.Name,
		}

		if err := db.Create(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
			return
		}

		// Generate token
		token, err := auth.GenerateToken(user.ID, user.Email)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
			return
		}

		c.JSON(http.StatusCreated, AuthResponse{
			Token: token,
			User: UserInfo{
				ID:    user.ID,
				Email: user.Email,
				Name:  user.Name,
			},
		})
	}
}

// Login handler
func Login(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req LoginRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var user database.User
		if err := db.Where("email = ?", req.Email).First(&user).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
			return
		}

		if !auth.VerifyPassword(user.Password, req.Password) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
			return
		}

		token, err := auth.GenerateToken(user.ID, user.Email)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
			return
		}

		c.JSON(http.StatusOK, AuthResponse{
			Token: token,
			User: UserInfo{
				ID:    user.ID,
				Email: user.Email,
				Name:  user.Name,
			},
		})
	}
}

// AnalyzeTrend handler
func AnalyzeTrend(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, _ := c.Get("userID")
		userIDValue := userID.(uint)

		var req TrendRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Run trend analysis
		trendResult := trends.AnalyzeTrend(req.Category, req.Period, req.Budget, req.TargetGroup)

		// Save to database
		analysis := database.TrendAnalysis{
			UserID:      userIDValue,
			Category:    req.Category,
			Period:      req.Period,
			Budget:      req.Budget,
			TargetGroup: req.TargetGroup,
			Trend:       trendResult.Trend,
			Confidence:  trendResult.Confidence,
			CreatedAt:   time.Now().Format(time.RFC3339),
		}

		if err := db.Create(&analysis).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save analysis"})
			return
		}

		c.JSON(http.StatusCreated, TrendResponse{
			ID:         analysis.ID,
			Trend:      analysis.Trend,
			Confidence: analysis.Confidence,
			Details:    trendResult.Details,
		})
	}
}

// GetTrendHistory handler
func GetTrendHistory(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, _ := c.Get("userID")
		userIDValue := userID.(uint)

		var analyses []database.TrendAnalysis
		if err := db.Where("user_id = ?", userIDValue).Order("created_at DESC").Find(&analyses).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch history"})
			return
		}

		c.JSON(http.StatusOK, analyses)
	}
}

// GetTrendByID handler
func GetTrendByID(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, _ := c.Get("userID")
		userIDValue := userID.(uint)

		id := c.Param("id")
		trendID, _ := strconv.ParseUint(id, 10, 32)

		var analysis database.TrendAnalysis
		if err := db.Where("id = ? AND user_id = ?", uint(trendID), userIDValue).First(&analysis).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Trend not found"})
			return
		}

		c.JSON(http.StatusOK, analysis)
	}
}

// GetDashboardMetrics handler
func GetDashboardMetrics(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, _ := c.Get("userID")
		userIDValue := userID.(uint)

		var totalAnalyses int64
		db.Model(&database.TrendAnalysis{}).Where("user_id = ?", userIDValue).Count(&totalAnalyses)

		var highConfidence int64
		db.Model(&database.TrendAnalysis{}).Where("user_id = ? AND confidence > ?", userIDValue, 0.7).Count(&highConfidence)

		var analyses []database.TrendAnalysis
		db.Where("user_id = ?", userIDValue).Find(&analyses)

		// Calculate categories and trend breakdown
		categoryMap := make(map[string]bool)
		trendBreakdown := make(map[string]int64)

		for _, a := range analyses {
			categoryMap[a.Category] = true
			trendBreakdown[a.Trend]++
		}

		categories := make([]string, 0)
		for cat := range categoryMap {
			categories = append(categories, cat)
		}

		metrics := DashboardMetrics{
			TotalAnalyses:  totalAnalyses,
			AverageTrend:   "GROWTH",
			HighConfidence: highConfidence,
			Categories:     categories,
			TrendBreakdown: trendBreakdown,
		}

		c.JSON(http.StatusOK, metrics)
	}
}

// SaveDashboardWidget handler
func SaveDashboardWidget(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, _ := c.Get("userID")
		userIDValue := userID.(uint)

		var req SaveDashboardRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Convert data to JSON string
		dataStr := ""
		if req.Data != nil {
			// Simple conversion
			dataStr = req.Title
		}

		widget := database.DashboardData{
			UserID:    userIDValue,
			Title:     req.Title,
			Type:      req.Type,
			Data:      dataStr,
			CreatedAt: time.Now().Format(time.RFC3339),
		}

		if err := db.Create(&widget).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save widget"})
			return
		}

		c.JSON(http.StatusCreated, widget)
	}
}

// GetDashboardWidgets handler
func GetDashboardWidgets(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, _ := c.Get("userID")
		userIDValue := userID.(uint)

		var widgets []database.DashboardData
		if err := db.Where("user_id = ?", userIDValue).Find(&widgets).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch widgets"})
			return
		}

		c.JSON(http.StatusOK, widgets)
	}
}
