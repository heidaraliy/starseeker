package services_test

import (
	"backend/go/repositories"
	services "backend/go/services/user/userSignIn"
	"context"
	"database/sql"
	"log"
	"testing"
	"time"

	"github.com/google/uuid"
	_ "github.com/lib/pq"
	"github.com/stretchr/testify/require"
	"golang.org/x/crypto/bcrypt"
)

func TestSignInServiceIntegration(t *testing.T) {
	log.Println("Initiating userSignInService integration test database connection, repos, and services...")
	//connect postgres
	db, err := sql.Open("postgres", "postgres://postgres:123@localhost:5432/starseeker_dev?sslmode=disable")
	require.NoError(t, err)
	defer db.Close()

	//init userRepo obj and connect to db (for real!!)
	userRepo := repositories.NewUserRepository(db)
	sessionRepo := repositories.NewSessionRepository(db)

	//create signUp service with real repo
	signInService := services.NewUserSignInService(userRepo, sessionRepo)

	//test user data
	userID := uuid.New()
	sessionID := uuid.New()
	email := "johnsonbobtim@example.com"
	password := "testPass123!"
	ipAddress := "0.0.0.0"
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	userProfileCreatedAt := time.Now()
	userProfileUpdatedAt := time.Now()
	sessionCreatedAt := time.Now()
	sessionExpiresAt := time.Now().Add(24 * time.Hour)

	//insert test user
	insertUserQuery := `INSERT INTO users (user_id, email, hashed_password, user_profile_created_at, user_profile_updated_at) VALUES ($1, $2, $3, $4, $5);`
	_, err = db.Exec(insertUserQuery, userID, email, string(hashedPassword), userProfileCreatedAt, userProfileUpdatedAt)
	require.NoError(t, err)

	// insert test session
	insertSessionQuery := "INSERT INTO sessions (session_id, user_id, created_at, expires_at, ip_address) VALUES ($1, $2, $3, $4, $5);"
	_, err = db.Exec(insertSessionQuery, sessionID, userID, sessionCreatedAt, sessionExpiresAt, ipAddress)
	require.NoError(t, err)

	err = signInService.SignIn(context.Background(), email, password, ipAddress)
	require.NoError(t, err)

	// clean it
	cleanupSessionQuery := `DELETE FROM sessions WHERE user_id  = $1;`
	_, err = db.Exec(cleanupSessionQuery, userID)
	require.NoError(t, err, "Failed to clean up test session data.")

	cleanupUserQuery := `DELETE FROM users WHERE email = $1;`
	_, err = db.Exec(cleanupUserQuery, email)
	require.NoError(t, err, "Failed to clean up test user data.")

}
