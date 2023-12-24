package services

import (
	"backend/go/models"
	"backend/go/repositories"
	"context"
	"errors"
	"log"

	"golang.org/x/crypto/bcrypt"
)

type UserSignInService struct {
	UserRepo    repositories.IUserRepository
	SessionRepo repositories.ISessionRepository
}

func NewUserSignInService(userRepo repositories.IUserRepository, sessionRepo repositories.ISessionRepository) *UserSignInService {
	return &UserSignInService{
		UserRepo:    userRepo,
		SessionRepo: sessionRepo,
	}
}

func (s *UserSignInService) SignIn(ctx context.Context, email, password, ipAddress string) error {
	log.Println("UserSignInService.SignIn called.")

	//user exists?
	log.Println("Checking if user exists.")
	user, err := s.UserRepo.FindByEmail(ctx, email)
	if err != nil {
		if errors.Is(err, repositories.ErrUserNotFound) {
			log.Println("User not found.")
			return errors.New("invalid credentials")
		}
		return err
	}

	// provided pass == hashed pass?
	log.Println("Comparing passwords.")
	if err := bcrypt.CompareHashAndPassword([]byte(user.HashedPassword), []byte(password)); err != nil {
		log.Println("Invalid password.")
		return errors.New("invalid credentials")
	}

	session := models.Session{
		UserID:    user.UserID,
		IPAddress: ipAddress,
	}
	if err = s.SessionRepo.CreateUserSession(ctx, &session); err != nil {
		log.Printf("Error creating session: %v\n", err)
		return err
	}

	log.Println("User signed in and session created successfully.")
	return nil
}
