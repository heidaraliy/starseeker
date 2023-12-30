package db

import (
	"database/sql"
	"fmt"
	"sync"

	"backend/go/config"

	_ "github.com/lib/pq"
)

var once sync.Once
var instance *sql.DB
var instanceErr error

func GetDB() (*sql.DB, error) {
	once.Do(func() {
		cfg, err := config.GetConfig()
		if err != nil {
			instanceErr = err
			return
		}

		psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+
			"password=%s dbname=%s sslmode=%s",
			cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.Database, cfg.SSLMode)

		instance, err = sql.Open("postgres", psqlInfo)
		if err != nil {
			instanceErr = fmt.Errorf("Unable to connect to database: %v", err)
			return
		}

		err = instance.Ping()
		if err != nil {
			instanceErr = fmt.Errorf("Unable to ping database: %v", err)
			return
		}
	})

	return instance, instanceErr
}
