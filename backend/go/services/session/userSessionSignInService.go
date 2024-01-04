package session

import (
	"backend/go/models"
	"backend/go/repositories"
	"context"
	"log"
)

type SessionSignInService struct {
	sessionRepo *repositories.SessionRepository
}

func NewSessionSignInService(sessionRepo *repositories.SessionRepository) *SessionSignInService {
	return &SessionSignInService{sessionRepo: sessionRepo}
}

func (s *SessionSignInService) CreateNewUserSession(ctx context.Context, session models.Session, user models.User) error {
	log.Println("Checking for existing user session for user:", user.Auth0ID.String)

	existingUserSession, err := s.sessionRepo.FindSessionByAuth0ID(ctx, user.Auth0ID.String)
	log.Printf("User session details: %v", existingUserSession)
	if existingUserSession.Status == "TERMINATED" {
		log.Println("No active session found, creating a new one for:", user.Email)
		return s.sessionRepo.CreateUserSession(ctx, &session, &user)
	} else if err != nil {
		log.Printf("Error when attempting to find user session: %v", err)
		return err
	} else if existingUserSession.Status == "ACTIVE" {
		log.Printf("Existing session found for user: %s, session ID: %s", user.Email, existingUserSession.SessionID)
		log.Printf("Retrieved session status: %s", existingUserSession.Status)
		log.Printf("No action needed.")

		return nil
	}
	return nil
}
