package routes

import (
	"backend/go/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(signUpHandler *handlers.SignUpHandler) *gin.Engine {
    router := gin.Default()

    //setup cors with our config'd settings
    setupCORS(router)

    //housing different routes here -- cleaner integration
    setupUserRoutes(router, signUpHandler)

    //add new routes here!

    return router
}

//cors setup -- straightforward
func setupCORS(router *gin.Engine) {
    config := cors.DefaultConfig()
    config.AllowAllOrigins = false
    config.AllowOrigins = []string{"http://frontenddomain.com"}
    config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
    config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}

    router.Use(cors.New(config))
}

//house all user routes here -- see commented code below to reference syntax
func setupUserRoutes(router *gin.Engine, signUpHandler *handlers.SignUpHandler) {
    users := router.Group("")
    {
        users.POST("/sign_up", signUpHandler.SignUp)
        // users.POST("/sign_in", signInHandler.SignIn)
        // Other user-related routes...
    }
}
