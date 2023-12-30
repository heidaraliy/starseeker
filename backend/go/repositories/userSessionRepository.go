package repositories

import (
	"backend/go/models"
	"context"
	"database/sql"
	"errors"
	"log"
	"time"

	"github.com/google/uuid"
)

type ISessionRepository interface {
	CreateUserSession(ctx context.Context, session *models.Session) error
}

type SessionRepository struct {
	DB *sql.DB
}

func NewSessionRepository(db *sql.DB) *SessionRepository {
	log.Printf("Database setup: %+v\n", db)
	return &SessionRepository{
		DB: db,
	}
}

var _ ISessionRepository = &SessionRepository{}

// error vars
var ErrSessionNotFound = errors.New("session not found")
var ErrSessionDeletionFailed = errors.New("session deletion failed")
var ErrSessionUpdateFailed = errors.New("session update failed")

// create a user session
func (repo *SessionRepository) CreateUserSession(ctx context.Context, session *models.Session) error {
	// set session vars
	session.SessionID = uuid.New()
	session.SessionCreatedAt = time.Now()
	session.Status = "ACTIVE"

	// db insert
	query := "INSERT INTO user_sessions (session_id, user_id, auth0_id, created_at, ip_address, session_device_type) VALUES ($1, $2, $3, $4, $5, $6);"
	log.Printf("Executing CreateUserSession for session: %+v\n", session)

	// handle errors
	_, err := repo.DB.ExecContext(ctx, query, session.SessionID, session.UserID, session.Auth0ID, session.SessionCreatedAt, session.IPAddress, session.SessionDeviceType)
	if err != nil {
		log.Printf("Error executing CreateSession query: %v\n", err)
		return err
	}

	return nil
}
