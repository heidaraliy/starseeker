//honestly might break this up later but will go with single user repo for now
//houses all user backend > db r/w functionality --

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

type IUserRepository interface {
	CreateUser(ctx context.Context, user *models.User) error
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

// error vars
var ErrUserNotFound = errors.New("user not found")
var ErrEmailInUse = errors.New("email already in use")
var ErrPasswordTooShort = errors.New("password too short")

// create a user
func (repo *UserRepository) CreateUser(ctx context.Context, user *models.User) error {
	newUUID, _ := uuid.NewUUID()

	user.UserID = newUUID
	user.UserProfileCreatedAt = time.Now()
	user.UserProfileUpdatedAt = time.Now()

	query := "INSERT INTO users (user_id, email, hashed_password, user_profile_created_at, user_profile_updated_at) VALUES ($1, $2, $3, $4, $5);"

	log.Printf("Executing CreateUser for user: %+v\n", user)

	_, err := repo.DB.ExecContext(ctx, query, user.UserID, user.Email, user.HashedPassword, user.UserProfileCreatedAt, user.UserProfileUpdatedAt)
	if err != nil {
		log.Printf("Error executing query: %v\n", err)
		return err
	}
	return nil
}

// find a user by email
func (repo *UserRepository) FindByEmail(ctx context.Context, email string) (*models.User, error) {
	query := `SELECT user_id, email, hashed_password, user_profile_created_at, user_profile_updated_at, user_profile_deleted_at FROM users WHERE email = $1;`

	log.Printf("Executing FindByEmail for email: %s\n", email)

	var user models.User
	err := repo.DB.QueryRowContext(ctx, query, email).Scan(
		&user.UserID,
		&user.Email,
		&user.HashedPassword,
		&user.UserProfileCreatedAt,
		&user.UserProfileUpdatedAt,
		&user.UserProfileDeletedAt,
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
