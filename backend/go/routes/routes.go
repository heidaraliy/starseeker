package routes

import (
	"backend/go/handlers"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine, userHandler *handlers.UserHandler, userSessionSignInHandler *handlers.UserSessionSignInHandler, userSessionSignOutHandler *handlers.UserSessionSignOutHandler) {
	setupCORS(router)
	setupUserRoutes(router, userHandler, userSessionSignInHandler, userSessionSignOutHandler)
}

func setupCORS(router *gin.Engine) {
	config := cors.DefaultConfig()
	config.AllowAllOrigins = false
	config.AllowOrigins = []string{"http://localhost:5173"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}

	router.Use(cors.New(config))
}

func setupUserRoutes(router *gin.Engine, userHandler *handlers.UserHandler, userSessionSignInHandler *handlers.UserSessionSignInHandler, userSessionSignOutHandler *handlers.UserSessionSignOutHandler) {
	users := router.Group("")

	{
		log.Println("Setting up API routes!")
		users.POST("/api/user/auth", userHandler.UserUpdateHandler, userSessionSignInHandler.UserSessionCreationHandler)
		users.POST("/api/user/sign_out", userSessionSignOutHandler.UserSessionTerminationHandler)
		users.POST("/api/model/create")
		// api routes
	}
}
