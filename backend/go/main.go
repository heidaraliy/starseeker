package main

import (
	"backend/go/db"
	"backend/go/handlers"
	"backend/go/repositories"
	"backend/go/routes"
	services "backend/go/services/user"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	dbConn, err := db.GetDB()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	userRepository := repositories.NewUserRepository(dbConn)

	// Setup services
	userService := services.NewUserService(userRepository)

	// Setup handlers
	userHandler := handlers.NewUserHandler(userService)

	routes.SetupRoutes(r, userHandler)

	port := ":8080"

	if err := r.Run(port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
