// main.go
package main

import (
    "log"
    "net/http"
    "yourapp/routes"
)

func main() {
    mux := http.NewServeMux()
    
    routes.SetupRoutes(mux)
    
    log.Println("Server starting on :8080")
    err := http.ListenAndServe(":8080", mux)
    if err != nil {
        log.Fatalf("Server failed to start: %v", err)
    }
}
