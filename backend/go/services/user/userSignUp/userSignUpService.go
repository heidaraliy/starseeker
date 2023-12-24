package services

import (
	"backend/go/models"
	"backend/go/repositories"
	"context"
	"errors"
	"log"
	"net/mail"
	"time"

	"github.com/google/uuid"
)

type UserSignUpService struct {
	Repo repositories.IUserRepository
}

func NewUserSignUpService(repo repositories.IUserRepository) *UserSignUpService {
	return &UserSignUpService{
		Repo: repo,
	}
}

func (s *UserSignUpService) SignUp(ctx context.Context, user *models.User) error {
	log.Println("UserSignUpService.SignUp called.")

	//validate email
	log.Println("Parsing and validating email.")
	if _, err := mail.ParseAddress(user.Email); err != nil {
		return repositories.ErrEmailInUse
	}

	log.Println("Email valid. Continuing to password validation.")
	//validate JSON parsed pw
	if len(user.Password) < 8 {
		log.Println("Password length too short.")
		return repositories.ErrPasswordTooShort
	}

	log.Println("Password valid. Continuing to existing or deleted user check.")
	//check deleted/existing user
	log.Println("Checking for a deleted or existing user.")
	existingUser, err := s.Repo.FindByEmail(ctx, user.Email)
	if err != nil {
		if errors.Is(err, repositories.ErrUserNotFound) {
		} else {
			return err
		}
	}

	if existingUser != nil {
		switch existingUser.Status {
		case "DELETED":
			log.Println("Deleted user account found. Switching to re-registration function.")
			return s.handleDeletedAccountReRegistration(ctx, user)
		case "UNVERIFIED_ACTIVE", "VERIFIED_ACTIVE":
			log.Println("Email in use.")
			return repositories.ErrEmailInUse
		}
	}
	log.Println("Calling processNewUserSignUp.")
	return s.processNewUserSignUp(ctx, user)
}

func (s *UserSignUpService) handleDeletedAccountReRegistration(ctx context.Context, newUser *models.User) error {
	log.Println("Processing and handling re-registration of a deleted account.")
	previousUser, err := s.Repo.FindByEmail(ctx, newUser.Email)
	if err != nil {
		log.Println("handleDeletedAccountReRegistration failed.")
		return err
	}

	if previousUser != nil && previousUser.Status == "DELETED" {
		newUser.PreviousUserID = &previousUser.UserID
	}

	//generate a new account for the re-registered user.
	newUUID, _ := uuid.NewUUID()

	newUser.UserID = newUUID
	newUser.UserProfileCreatedAt = time.Now()
	newUser.UserProfileUpdatedAt = time.Now()
	newUser.Status = "UNVERIFIED_ACTIVE"

	//save user
	err = s.Repo.CreateUser(ctx, newUser)
	if err != nil {
		log.Printf("Error in UserService SignUp: %v\n", err)
		return err
	}
	log.Println("User re-registration success!")
	return nil
}

func (s *UserSignUpService) processNewUserSignUp(ctx context.Context, user *models.User) error {

	//save user
	err := s.Repo.CreateUser(ctx, user)
	if err != nil {
		log.Printf("Error in UserService SignUp: %v\n", err)
		return err
	}
	log.Println("User creation success!")
	return nil
}
