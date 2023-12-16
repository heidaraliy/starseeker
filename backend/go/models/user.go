package models

import "time"

type User struct {
    UserID              int64     `json:"user_id" db:"user_id"`
    Username            string    `json:"username" db:"username"`
    Email               string    `json:"email" db:"email"`
    FirstName           string    `json:"first_name" db:"first_name"`
    LastName            string    `json:"last_name" db:"last_name"`
    HashedPassword      string    `json:"-" db:"hashed_password"` // '-' in JSON tag to not expose the hashed password
    UserProfileCreatedAt time.Time `json:"user_profile_created_at" db:"user_profile_created_at"`
    UserProfileUpdatedAt time.Time `json:"user_profile_updated_at" db:"user_profile_updated_at"`
    LastLoginTimestamp  time.Time `json:"last_login_timestamp" db:"last_login_timestamp"`
    LastEventID         int64     `json:"last_event_id" db:"last_event_id"`
    LastEventTimestamp  time.Time `json:"last_event_timestamp" db:"last_event_timestamp"`
    LastEventType       string    `json:"last_event_type" db:"last_event_type"`
    Role                string    `json:"role" db:"role"`
    Status              string    `json:"status" db:"status"`
}

func NewUser(username, email, firstName, lastName, hashedPassword string) *User {
    return &User{
        Username:            username,
        Email:               email,
        FirstName:           firstName,
        LastName:            lastName,
        HashedPassword:      hashedPassword,
        UserProfileCreatedAt: time.Now(),
        UserProfileUpdatedAt: time.Now(),
        // The rest of the fields are initialized as zero-values.
    }
}