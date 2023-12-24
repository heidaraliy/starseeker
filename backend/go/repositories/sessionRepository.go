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
	// no session id? make a new one
	if session.SessionID == uuid.Nil {
		session.SessionID = uuid.New()
	}

	// set creation ts
	session.CreatedAt = time.Now()
	session.ExpiresAt = session.CreatedAt.Add(24 * time.Hour)

	// db insert
	query := "INSERT INTO sessions (session_id, user_id, created_at, expires_at, ip_address) VALUES ($1, $2, $3, $4, $5);"
	log.Printf("Executing CreateSession for session: %+v\n", session)

	// handle errors
	_, err := repo.DB.ExecContext(ctx, query, session.SessionID, session.UserID, session.CreatedAt, session.ExpiresAt, session.IPAddress)
	if err != nil {
		log.Printf("Error executing CreateSession query: %v\n", err)
		return err
	}

	return nil
}

// get a user session
// func (repo *UserRepository) GetUserSession(ctx context.Context, userID uuid.UUID, ipAddress string) error {}

// update a user session
// func (repo *UserRepository) UpdateUserSession(ctx context.Context, userID uuid.UUID, ipAddress string) error {}

// delete a user session
// func (repo *UserRepository) GetUserSession(ctx context.Context, userID uuid.UUID, ipAddress string) error {}
