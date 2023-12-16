// routes/routes.go
package routes

import (
	"backend/handlers"
	"net/http"
)

func SetupRoutes() *http.ServeMux {
    mux := http.NewServeMux()

    //user routes
    mux.HandleFunc("/api/users/signup", handlers.SignUp)

    return mux
}