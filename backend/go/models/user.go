package models

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type User struct {
	UserID               uuid.UUID      `json:"user_id" db:"user_id"`
	Username             sql.NullString `json:"username" db:"username"`
	Email                string         `json:"email" db:"email"`
	FirstName            sql.NullString `json:"first_name" db:"first_name"`
	LastName             sql.NullString `json:"last_name" db:"last_name"`
	Auth0ID              sql.NullString `json:"auth0_id" db:"auth0_id"`
	UserProfileCreatedAt time.Time      `json:"user_profile_created_at" db:"user_profile_created_at"`
	UserProfileUpdatedAt time.Time      `json:"user_profile_updated_at" db:"user_profile_updated_at"`
	Role                 sql.NullString `json:"role" db:"role"`
	Status               string         `json:"status" db:"status"`
}
