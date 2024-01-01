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
	CreateUserSession(ctx context.Context, session *models.Session, user *models.User) error
	FindUserByAuth0ID(ctx context.Context, auth0ID string) (*models.User, error)
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
func (repo *SessionRepository) CreateUserSession(ctx context.Context, session *models.Session, user *models.User) error {
	log.Printf("Finding user by Auth0 ID: %s", user.Auth0ID.String)
	// init user model
	// Use a different variable name for the user returned by FindUserByAuth0ID
	foundUser, err := repo.FindUserByAuth0ID(ctx, user.Auth0ID.String)
	if err != nil {
		log.Printf("Failure to find user by Auth0ID: %s", err)
		return err
	}

	log.Println("Setting session creation fields.")
	// set session vars
	session.SessionID = uuid.New()
	session.UserID = foundUser.UserID
	session.Auth0ID = foundUser.Auth0ID
	session.SessionCreatedAt = time.Now()
	session.Status = "ACTIVE"

	// db insert
	log.Printf("Executing CreateUserSession for session: %+v\n", session)
	query := `INSERT INTO user_sessions (session_id, user_id, auth0_id, session_created_at, ip_address, session_device_type) VALUES ($1, $2, $3, $4, $5, $6);`

	// handle errors
	_, err = repo.DB.ExecContext(ctx, query, session.SessionID, session.UserID, session.Auth0ID, session.SessionCreatedAt, session.IPAddress, session.SessionDeviceType)
	if err != nil {
		log.Printf("Error executing CreateSession query: %v\n", err)
		return err
	}

	return nil
}

// create a user session
func (repo *SessionRepository) TerminateUserSession(ctx context.Context, session *models.Session, user *models.User) error {
	log.Printf("Terminating session for user with Auth0 ID: %s", user.Auth0ID.String)

	log.Printf("Finding user by Auth0 ID: %s", user.Auth0ID.String)
	// init user model
	// Use a different variable name for the user returned by FindUserByAuth0ID
	_, err := repo.FindSessionByAuth0ID(ctx, user.Auth0ID.String)
	if err != nil {
		log.Printf("Failure to find user by Auth0ID: %s", err)
		return err
	}

	log.Println("Setting session creation fields.")
	// set session vars
	currentTime := time.Now()
	session.SessionTerminatedAt = sql.NullTime{Time: currentTime, Valid: true}
	session.Status = "TERMINATED"

	// db insert
	log.Printf("Executing TerminateUserSession for session: %+v\n", session)
	query := `UPDATE user_sessions SET session_terminated_at = $1, status = $2 WHERE user_id = $3 AND auth0_id = $4 AND status != 'TERMINATED';`

	// handle errors
	res, err := repo.DB.ExecContext(ctx, query, currentTime, session.Status, user.UserID, user.Auth0ID.String)
	if err != nil {
		log.Printf("Error executing TerminateUserSession query: %v\n", err)
		return err
	}

	// Optional: Check if any rows were actually updated
	rowsAffected, err := res.RowsAffected()
	if err != nil {
		log.Printf("Error checking rows affected: %v\n", err)
		return err
	}
	if rowsAffected == 0 {
		log.Println("No session found to terminate.")
		return errors.New("no session found to terminate")
	}

	log.Println("Session terminated successfully.")
	return nil
}

// find user by auth0 -- called when creating or terminating a session: auth0 is the link between the clientside user payload and a session.
func (repo *SessionRepository) FindUserByAuth0ID(ctx context.Context, auth0ID string) (*models.User, error) {
	var user models.User
	query := `SELECT user_id, auth0_id FROM users WHERE auth0_id = $1;`

	err := repo.DB.QueryRowContext(ctx, query, auth0ID).Scan(
		&user.UserID,
		&user.Auth0ID,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrUserNotFound
		}
		return nil, err
	}

	return &user, nil
}

// find session by auth0 -- called when determining session creation logic.
func (repo *SessionRepository) FindSessionByAuth0ID(ctx context.Context, auth0ID string) (*models.Session, error) {
	var session models.Session
	query := `SELECT session_id, auth0_id FROM user_sessions WHERE auth0_id = $1;`

	err := repo.DB.QueryRowContext(ctx, query, auth0ID).Scan(
		&session.SessionID,
		&session.Auth0ID,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrSessionNotFound
		}
		return nil, err
	}

	return &session, nil
}
