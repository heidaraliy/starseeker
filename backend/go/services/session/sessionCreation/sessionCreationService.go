package services

import (
	"backend/go/models"
	"backend/go/repositories"
	"context"
	"log"
)

type UserSessionCreationService struct {
	Repo repositories.ISessionRepository
}

func NewUserSessionCreationService(repo repositories.ISessionRepository) *UserSessionCreationService {
	return &UserSessionCreationService{
		Repo: repo,
	}
}

func (s *UserSessionCreationService) CreateUserSession(ctx context.Context, session *models.Session) error {
	log.Println("UserSessionCreationService.CreateUserSession called.")

	err := s.Repo.CreateUserSession(ctx, session)
	if err != nil {
		log.Printf("Error creating user session: %v\n", err)
		return err
	}

	log.Println("User session created successfully.")
	return nil

}
