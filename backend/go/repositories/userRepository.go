//honestly might break this up later but will go with single user repo for now
//houses all user backend > db r/w functionality --

package repositories

import (
	"backend/go/models"
	"context"
	"database/sql"
	"errors"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/google/uuid"
)

type IUserRepository interface {
	CreateUser(ctx context.Context, user *models.User) error
	UpdateUser(ctx context.Context, user models.User, updates UserUpdate) error
	FindByEmail(ctx context.Context, email string) (*models.User, error)
}

type UserRepository struct {
	DB *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	log.Printf("Database setup: %+v\n", db)
	return &UserRepository{
		DB: db,
	}
}

var _ IUserRepository = &UserRepository{}

// need this for efficient user updates
type UserUpdate struct {
	Email           bool
	Name            bool
	Role            bool
	Status          bool
	ProfileUpdate   bool
	ProfileCreation bool
	Auth0ID         bool
	UserID          bool
}

// error vars
var ErrUserNotFound = errors.New("user not found")
var ErrEmailInUse = errors.New("email already in use")
var ErrPasswordTooShort = errors.New("password too short")
var ErrEmailInvalid = errors.New("invalid email")

// create a user
func (repo *UserRepository) CreateUser(ctx context.Context, user *models.User) error {
	now := time.Now()
	newUUID := uuid.New()
	user.UserProfileCreatedAt = now
	user.UserProfileUpdatedAt = now
	user.UserID = newUUID
	user.Status = "ACTIVE_UNVERIFIED"

	query := "INSERT INTO users (user_id, email, auth0_id, user_profile_created_at, user_profile_updated_at, status) VALUES ($1, $2, $3, $4, $5, $6);"

	log.Printf("Executing CreateUser for user: %+v\n", user)

	_, err := repo.DB.ExecContext(ctx, query, user.UserID, user.Email, user.Auth0ID, now, now, user.Status)
	if err != nil {
		log.Printf("Error executing query: %v\n", err)
		return err
	}
	return nil
}

// find a user by email
func (repo *UserRepository) FindByEmail(ctx context.Context, email string) (*models.User, error) {
	query := `SELECT user_id, email, auth0_id, user_profile_created_at, user_profile_updated_at FROM users WHERE email = $1;`

	log.Printf("Executing FindByEmail for email: %s\n", email)

	var user models.User
	err := repo.DB.QueryRowContext(ctx, query, email).Scan(
		&user.UserID,
		&user.Email,
		&user.Auth0ID,
		&user.UserProfileCreatedAt,
		&user.UserProfileUpdatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			log.Printf("User not found for email: %s\n", email)
			return nil, ErrUserNotFound
		}
		log.Printf("Error executing FindByEmail query for email %s: %v\n", email, err)
		return nil, err
	}

	return &user, nil
}

// update a user: called when user profile changes
func (repo *UserRepository) UpdateUser(ctx context.Context, user models.User, updates UserUpdate) error {
	var setClauses []string
	var args []interface{}
	argID := 1

	if updates.Email {
		setClauses = append(setClauses, fmt.Sprintf("email = $%d", argID))
		args = append(args, user.Email)
		argID++
	}
	if updates.Name {
		setClauses = append(setClauses, fmt.Sprintf("first_name = $%d, last_name = $%d", argID, argID+1))
		args = append(args, user.FirstName, user.LastName)
		argID += 2
	}
	if updates.Role {
		setClauses = append(setClauses, fmt.Sprintf("role = $%d", argID))
		args = append(args, user.Role)
		argID++
	}
	if updates.Status {
		setClauses = append(setClauses, fmt.Sprintf("status = $%d", argID))
		args = append(args, user.Status)
		argID++
	}
	if updates.ProfileUpdate {
		setClauses = append(setClauses, fmt.Sprintf("user_profile_updated_at = $%d", argID))
		args = append(args, time.Now())
		argID++
	}

	if len(setClauses) == 0 {
		return nil
	}

	query := fmt.Sprintf("UPDATE users SET %s WHERE user_id = $%d", strings.Join(setClauses, ", "), argID)
	args = append(args, user.UserID)
	log.Printf("Processing updates for the following fields: %v", setClauses)

	_, err := repo.DB.Exec(query, args...)
	if err != nil {
		log.Printf("Error updating user: %v", err)
		return err
	}

	return nil
}

// returns bool, called in handler to determine whether or not UpdateUser needs to run (efficent!)
func (user UserUpdate) RequiresUpdate() bool {
	return user.Email || user.Name || user.Role || user.Status || user.ProfileUpdate
}
