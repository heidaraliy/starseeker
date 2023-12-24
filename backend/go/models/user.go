package models

import (
	"database/sql"
	"log"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	UserID               uuid.UUID      `json:"user_id" db:"user_id"`
	Username             sql.NullString `json:"username" db:"username"`
	Email                string         `json:"email" db:"email"`
	FirstName            string         `json:"first_name" db:"first_name"`
	LastName             string         `json:"last_name" db:"last_name"`
	Password             string         `json:"-"`             // '-' in JSON tag so as to not expose the hashed password
	HashedPassword       string         `db:"hashed_password"` //stored as hash in db
	UserProfileCreatedAt time.Time      `json:"user_profile_created_at" db:"user_profile_created_at"`
	UserProfileUpdatedAt time.Time      `json:"user_profile_updated_at" db:"user_profile_updated_at"`
	LastLoginTimestamp   sql.NullTime   `json:"last_login_timestamp" db:"last_login_timestamp"`
	Role                 sql.NullString `json:"role" db:"role"`
	Status               string         `json:"status" db:"status"`
	UserProfileDeletedAt sql.NullTime   `json:"user_profile_deleted_at" db:"user_profiled_deleted_at"`
	PreviousUserID       *uuid.UUID     `json:"previous_user_id,omitempty" db:"previous_user_id"`
}

type SignUpInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignInInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func NewUser(email, password string) *User {
	newUUID, _ := uuid.NewUUID()

	//hash pw instantly
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Println("Error generating hashed password:", err)
		return nil
	}

	return &User{
		UserID:               newUUID,
		Email:                email,
		HashedPassword:       string(hashedPassword),
		UserProfileCreatedAt: time.Now(),
		UserProfileUpdatedAt: time.Now(),
		Status:               "UNVERIFIED_ACTIVE",
		// rest of fields are init as non-zero values
	}
}
