package services_test

import (
	"backend/go/models"
	"backend/go/repositories"
	services "backend/go/services/user/userSignUp"
	"context"
	"database/sql"
	"log"
	"testing"

	_ "github.com/lib/pq"
	"github.com/stretchr/testify/require"
)

func TestSignUpServiceIntegration(t *testing.T) {
	log.Println("Initiating userSignUpService integration test database connection, repos, and services...")
	//connect postgres
	db, err := sql.Open("postgres", "postgres://postgres:123@localhost:5432/starseeker_dev?sslmode=disable")
	require.NoError(t, err)
	defer db.Close()

	//init userRepo obj and connect to db (for real!!)
	userRepo := repositories.NewUserRepository(db)

	//create signUp service with real repo
	signUpService := services.NewUserSignUpService(userRepo)

	//test user data
	email := "newuser@example.com"
	password := "testPass123!"

	//call signUp func
	err = signUpService.SignUp(context.Background(), &models.User{
		Email:    email,
		Password: password,
	})
	require.NoError(t, err)

	//did user get added?
	var userID string
	var hashedPassword string
	query := `SELECT user_id, hashed_password FROM users WHERE email = $1;`
	err = db.QueryRow(query, email).Scan(&userID, &hashedPassword)
	require.NoError(t, err)
	require.NotEmpty(t, userID, "User ID should not be empty.")
	require.NotEqual(t, password, hashedPassword, "Stored password should be hashed and not equal to plaintext password.")

	//clean it
	cleanupQuery := `DELETE FROM users WHERE email = $1;`
	_, err = db.Exec(cleanupQuery, email)
	require.NoError(t, err, "Failed to clean up test data.")

}
