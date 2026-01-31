package database

import (
	"fmt"
	"os"

	"github.com/glebarez/sqlite"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type User struct {
	ID       uint   `gorm:"primaryKey"`
	Email    string `gorm:"uniqueIndex"`
	Password string
	Name     string
}

type TrendAnalysis struct {
	ID          uint `gorm:"primaryKey"`
	UserID      uint
	Category    string
	Period      string
	Budget      float64
	TargetGroup string
	Trend       string
	Confidence  float64
	CreatedAt   string
}

type DashboardData struct {
	ID        uint `gorm:"primaryKey"`
	UserID    uint
	Title     string
	Type      string // 'chart', 'card', 'table'
	Data      string // JSON string
	CreatedAt string
}

func InitDB() (*gorm.DB, error) {
	dbType := os.Getenv("DB_TYPE")
	if dbType == "" {
		dbType = "sqlite" // Default to SQLite for backward compatibility
	}

	var db *gorm.DB
	var err error

	if dbType == "postgres" {
		// PostgreSQL connection
		host := os.Getenv("DB_HOST")
		if host == "" {
			host = "localhost"
		}
		port := os.Getenv("DB_PORT")
		if port == "" {
			port = "5432"
		}
		user := os.Getenv("DB_USER")
		if user == "" {
			user = "tuinsight"
		}
		password := os.Getenv("DB_PASSWORD")
		if password == "" {
			password = "tuinsight_password_2024"
		}
		dbname := os.Getenv("DB_NAME")
		if dbname == "" {
			dbname = "tuinsight_db"
		}

		dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
			host, port, user, password, dbname)

		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			return nil, fmt.Errorf("failed to connect to PostgreSQL: %w", err)
		}
		fmt.Println("✅ Connected to PostgreSQL database")
	} else {
		// SQLite connection (default)
		dbPath := os.Getenv("DB_PATH")
		if dbPath == "" {
			dbPath = "./trends.db"
		}

		db, err = gorm.Open(sqlite.Open(dbPath), &gorm.Config{})
		if err != nil {
			return nil, fmt.Errorf("failed to connect to SQLite: %w", err)
		}
		fmt.Println("✅ Connected to SQLite database")
	}

	// Auto migrate tables
	err = db.AutoMigrate(&User{}, &TrendAnalysis{}, &DashboardData{})
	if err != nil {
		return nil, fmt.Errorf("failed to migrate database: %w", err)
	}

	return db, nil
}
