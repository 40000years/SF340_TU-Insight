package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"trendanalysis/database"
	"trendanalysis/routes"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	godotenv.Load()

	// Initialize database
	db, err := database.InitDB()
	if err != nil {
		log.Fatal("Failed to initialize database:", err)
	}

	// Create router
	router := gin.Default()

	// CORS middleware
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", os.Getenv("CORS_ORIGIN"))
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Serve static files (frontend)
	// Try different possible paths (relative to app root)
	var staticPath string
	possiblePaths := []string{
		"../dist/frontend",
		"./dist/frontend",
		"dist/frontend",
		"../frontend/dist",
		"./frontend/dist",
		"frontend/dist",
		"../frontend",
		"./frontend",
		"frontend",
	}

	for _, p := range possiblePaths {
		if _, err := os.Stat(p); err == nil {
			staticPath = p
			break
		}
	}

	if staticPath == "" {
		log.Printf("⚠️  Warning: Frontend not found. API only mode.\n")
		log.Printf("Expected frontend folder at: ../frontend\n")
	} else {
		log.Printf("✅ Serving frontend from: %s\n", staticPath)

		// Serve static files
		router.Static("/assets", filepath.Join(staticPath, "assets"))
		router.StaticFile("/", filepath.Join(staticPath, "index.html"))

		// Fallback to index.html for SPA
		router.NoRoute(func(c *gin.Context) {
			if c.Request.Method == http.MethodGet {
				c.File(filepath.Join(staticPath, "index.html"))
			} else {
				c.JSON(404, gin.H{"error": "not found"})
			}
		})
	}

	// Setup routes
	routes.SetupRoutes(router, db)

	// Run server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server running on :%s\n", port)
	router.Run(":" + port)
}
