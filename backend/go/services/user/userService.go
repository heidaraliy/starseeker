package user

import (
	"backend/go/models"
	"backend/go/repositories"
	"context"
	"errors"
	"log"
)

type UserService struct {
	userRepo *repositories.UserRepository
}

func NewUserService(userRepo *repositories.UserRepository) *UserService {
	return &UserService{userRepo: userRepo}
}

func (s *UserService) UpdateUserDetails(ctx context.Context, user models.User) error {
	log.Println("Checking for existing user details for:", user.Email)

	existingUser, err := s.userRepo.FindUserByEmail(ctx, user.Email)
	if err != nil {
		if errors.Is(err, repositories.ErrUserNotFound) {
			// User not found, create new user
			log.Println("User not found, creating new user:", user.Email)
			return s.userRepo.CreateUser(ctx, &user)
		}
		// Other errors
		log.Println("Error finding user:", err)
		return err
	}

	updates := determineUpdates(*existingUser, user)

	if updates.RequiresUpdate() {
		log.Println("Updating existing user:", user.Email)
		return s.userRepo.UpdateUser(ctx, user, updates)
	}

	return nil
}

func determineUpdates(existing, new models.User) repositories.UserUpdate {
	var updates repositories.UserUpdate

	if existing.Email != new.Email {
		updates.Email = true
	}
	if existing.FirstName != new.FirstName || existing.LastName != new.LastName {
		updates.Name = true
	}
	if existing.Role.String != new.Role.String {
		updates.Role = true
	}
	if existing.Status != new.Status {
		updates.Status = true
	}

	if updates.Email || updates.Name || updates.Role || updates.Status {
		updates.ProfileUpdate = true
	}
	return updates
}
