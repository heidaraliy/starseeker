package routes

import (
	"backend/go/handlers"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine, userHandler *handlers.UserHandler, userSessionSignInHandler *handlers.UserSessionSignInHandler) {
	setupCORS(router)
	setupUserRoutes(router, userHandler, userSessionSignInHandler)
}

func setupCORS(router *gin.Engine) {
	config := cors.DefaultConfig()
	config.AllowAllOrigins = false
	config.AllowOrigins = []string{"http://localhost:5173"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}

	router.Use(cors.New(config))
}

func setupUserRoutes(router *gin.Engine, userHandler *handlers.UserHandler, userSessionSignInHandler *handlers.UserSessionSignInHandler) {
	users := router.Group("")

	{
		log.Println("Setting up API routes!")
		users.POST("/api/user/auth", userHandler.UserUpdateHandler, userSessionSignInHandler.UserSessionCreationHandler)
		// api routes
	}
}
