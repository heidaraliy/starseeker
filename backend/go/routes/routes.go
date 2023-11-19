// routes/routes.go
package routes

import (
    "net/http"
    "yourapp/handlers"
    "yourapp/middleware"
)

func SetupRoutes(mux *http.ServeMux) {
    mux.Handle("/api/model/create", middleware.AuthMiddleware(http.HandlerFunc(handlers.CreateModelHandler)))
    // Define other routes
}