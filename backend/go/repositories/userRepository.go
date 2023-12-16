package repositories

import (
	"backend/go/db"
	"backend/go/models"
	"context"
	"database/sql"
)

type IUserRepository interface {
	CreateUser(ctx context.Context, user *models.User) error
}

type UserRepository struct {
	DB *sql.DB
}

func NewUserRepository() *UserRepository {
	return &UserRepository{
		DB: db.GetDB(),
	}
}

var _ IUserRepository = &UserRepository{}

func (repo *UserRepository) CreateUser(ctx context.Context, user *models.User) error {
	query := `
	INSERT INTO users (username, email, first_name, last_name, hashed_password, user_profile_created_at, user_profile_updated_at, last_login_timestamp, last_event_id, last_event_timestamp, last_event_type, role, status)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
	RETURNING user_id;`

	err := repo.DB.QueryRowContext(ctx, query,
		user.Username,
		user.Email,
		user.FirstName,
		user.LastName,
		user.HashedPassword,
		user.UserProfileCreatedAt,
		user.UserProfileUpdatedAt,
		user.LastLoginTimestamp,
		user.LastEventID,
		user.LastEventTimestamp,
		user.LastEventType,
		user.Role,
		user.Status).Scan(&user.UserID)
	if err != nil {
		return err
	}
	return nil
}
 
