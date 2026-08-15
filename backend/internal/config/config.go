package config

import (
	"os"
)

type Config struct {
	Port        string
	DatabaseURL string
	AllowedCORS string
}

func Load() *Config {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		// Default development connection string
		dbURL = "postgres://postgres:postgres@localhost:5432/sasi_maligai_kadai?sslmode=disable"
	}

	allowedCORS := os.Getenv("ALLOWED_CORS")
	if allowedCORS == "" {
		allowedCORS = "http://localhost:3000"
	}

	return &Config{
		Port:        port,
		DatabaseURL: dbURL,
		AllowedCORS: allowedCORS,
	}
}
