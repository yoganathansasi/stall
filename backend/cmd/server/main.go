package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"backend/internal/config"
	"backend/internal/handler"
	"backend/internal/repository"
	"backend/internal/service"
)

func main() {
	log.Println("Starting Sasi Maligai Kadai backend server...")

	// 1. Load config
	cfg := config.Load()

	// 2. Initialize repository (with fallback if DB connection fails)
	var repo repository.Repository
	pgRepo, err := repository.NewPostgresRepository(cfg.DatabaseURL)
	if err != nil {
		log.Printf("[Database Connection Error] %v\n", err)
		repo = repository.NewInMemoryRepository()
	} else {
		log.Println("Successfully connected to PostgreSQL database.")
		repo = pgRepo
		defer pgRepo.Close()
	}

	// 3. Initialize services & handler
	svc := service.NewService(repo)
	h := handler.NewHandler(svc, cfg.AllowedCORS)

	// 4. Register routes using Go 1.22+ ServeMux routing capabilities
	mux := http.NewServeMux()
	
	// API Endpoints
	mux.HandleFunc("GET /api/menu", h.GetMenu)
	mux.HandleFunc("OPTIONS /api/menu", h.GetMenu)
	
	mux.HandleFunc("GET /api/groceries", h.GetGroceries)
	mux.HandleFunc("OPTIONS /api/groceries", h.GetGroceries)
	
	mux.HandleFunc("GET /api/info", h.GetInfo)
	mux.HandleFunc("OPTIONS /api/info", h.GetInfo)
	
	mux.HandleFunc("POST /api/contact", h.SubmitContact)
	mux.HandleFunc("OPTIONS /api/contact", h.SubmitContact)

	mux.HandleFunc("GET /api/reviews", h.GetReviews)
	mux.HandleFunc("OPTIONS /api/reviews", h.GetReviews)
	mux.HandleFunc("POST /api/reviews", h.SubmitReview)
	mux.HandleFunc("OPTIONS /api/reviews", h.SubmitReview)

	// Health check
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"healthy","time":"` + time.Now().Format(time.RFC3339) + `"}`))
	})

	// 5. Setup HTTP Server
	server := &http.Server{
		Addr:         ":" + cfg.Port,
		Handler:      mux,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	// 6. Graceful Shutdown Setup
	go func() {
		log.Printf("API Server is running on port %s...\n", cfg.Port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server ListenAndServe failed: %v\n", err)
		}
	}()

	// Signal channel for graceful termination
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	// Block until a signal is received
	<-stop
	log.Println("Shutting down backend server gracefully...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v\n", err)
	}

	log.Println("Backend server stopped.")
}
