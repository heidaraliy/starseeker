// main.go
package main

import (
	"backend/backend/go/routes"
	"log"
	"net/http"
)

func main() {
    router := routes.SetupRoutes()

    log.Println("Starting server on http://localhost:8080")
    if err:= http.ListenAndServe(":8080", router); err != nil {
        log.Fatal(err)
    }
}
