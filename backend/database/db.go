package database

import (
	"os"

	"github.com/glebarez/sqlite"
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
	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		dbPath = "./trends.db"
	}

	db, err := gorm.Open(sqlite.Open(dbPath), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	// Auto migrate tables
	db.AutoMigrate(&User{}, &TrendAnalysis{}, &DashboardData{})

	return db, nil
}
