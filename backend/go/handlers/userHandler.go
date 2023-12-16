package handlers

import (
	"backend/go/models"
	"backend/go/repositories"
	"encoding/json"
	"net/http"
	"time"

	"golang.org/x/crypto/bcrypt"
)

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

type SignUpHandler struct {
	Repo repositories.IUserRepository
}

func NewSignUpHandler(repo repositories.IUserRepository) *SignUpHandler {
	return &SignUpHandler{
		Repo: repo,
	}
}

func (h *SignUpHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var newUser models.User
	if err := json.NewDecoder(r.Body).Decode(&newUser); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	//add validations here to make sure email is valid/correct

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.HashedPassword), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Error while hashing the password", http.StatusInternalServerError)
		return
	}
	newUser.HashedPassword = string(hashedPassword)

	// set creation/update timestamps
	newUser.UserProfileCreatedAt = time.Now()
	newUser.UserProfileUpdatedAt = time.Now()

	//insert new user using userRepo
	if err := repositories.IUserRepository.CreateUser(&newUser); err != nil {
		http.Error(w, "Error creating user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "User created successfully",
		"user_id": newUser.UserID,
	})
}




