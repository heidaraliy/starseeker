package session

import (
	"backend/go/models"
	"backend/go/repositories"
	"context"
	"errors"
	"log"
)

type SessionSignInService struct {
	sessionRepo *repositories.SessionRepository
}

func NewSessionSignInService(sessionRepo *repositories.SessionRepository) *SessionSignInService {
	return &SessionSignInService{sessionRepo: sessionRepo}
}

func (s *SessionSignInService) CreateNewUserSession(ctx context.Context, session models.Session, user models.User) error {
	log.Println("Checking for existing user session for user:", user.Auth0ID)
	log.Printf("User Auth0 ID: %v", user.Auth0ID.String)

	existingUserSession, err := s.sessionRepo.FindSessionByAuth0ID(ctx, user.Auth0ID.String)
	if err != nil {
		if errors.Is(err, repositories.ErrSessionNotFound) {
			log.Println("User session not found, creating new user session for:", user.Email)
			return s.sessionRepo.CreateUserSession(ctx, &session, &user)
		}
		log.Printf("Error finding user session: %v", err)
		return err
	}

	log.Printf("Existing session found for user: %s, session ID: %s", user.Email, existingUserSession.SessionID)

	return nil
}
