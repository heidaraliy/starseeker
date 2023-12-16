package db

import (
	"database/sql"
	"fmt"
	"log"
	"sync"

	_ "github.com/lib/pq"
)

var once sync.Once
var instance *sql.DB

// GetDB returns a singleton database instance
func GetDB() *sql.DB {
	once.Do(func() {
		// Replace with your actual database connection details
		const (
			host     = "localhost"
			port     = 5432 // Default port for PostgreSQL
			user     = "postgres"
			password = "123"
			dbname   = "starseeker_dev"
		)
		psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
			"password=%s dbname=%s sslmode=disable",
			host, port, user, password, dbname)

		var err error
		instance, err = sql.Open("postgres", psqlInfo)
		if err != nil {
			log.Fatalf("Unable to connect to database: %v\n", err)
		}

		err = instance.Ping()
		if err != nil {
			log.Fatalf("Unable to ping database: %v\n", err)
		}
	})

	return instance
}
