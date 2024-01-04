package config

import (
	"os"

	"github.com/joho/godotenv"
)

// define config struct
type DBConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	Database string
	SSLMode  string
}

var config *DBConfig

// load .env cars
func LoadEnv() error {
	if err := godotenv.Load(); err != nil {
		return err
	}

	// assign .env to struct variables
	config = &DBConfig{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		User:     os.Getenv("DB_USERNAME"),
		Password: os.Getenv("DB_PASSWORD"),
		Database: os.Getenv("DB_DATABASE"),
		SSLMode:  os.Getenv("DB_SSLMODE"),
	}

	// void
	return nil
}

// public GetConfig func to export to db
func GetConfig() (*DBConfig, error) {
	if config == nil {
		if err := LoadEnv(); err != nil {
			return nil, err
		}
	}
	return config, nil
}
