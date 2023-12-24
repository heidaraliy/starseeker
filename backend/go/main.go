// main.go
package main

import (
	"backend/go/db"
	"backend/go/handlers"
	"backend/go/repositories"
	signInService "backend/go/services/user/userSignIn"
	signUpService "backend/go/services/user/userSignUp"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true, // for development; specify allowed origins for production
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	dbConn := db.GetDB()

	userRepo := repositories.NewUserRepository(dbConn)
	sessionRepo := repositories.NewSessionRepository(dbConn)

	userSignUpService := signUpService.NewUserSignUpService(userRepo)
	userSignUpHandler := handlers.NewSignUpHandler(userSignUpService)

	userSignInService := signInService.NewUserSignInService(userRepo, sessionRepo)
	userSignInHandler := handlers.NewSignInHandler(userSignInService)

	r.POST("/sign_up", userSignUpHandler.SignUp)
	r.POST("/sign_in", userSignInHandler.SignIn)

	if err := r.Run(); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
