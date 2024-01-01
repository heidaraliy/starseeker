package session

import (
	"backend/go/models"
	"backend/go/repositories"
	"context"
	"errors"
	"log"
)

type SessionSignOutService struct {
	sessionRepo *repositories.SessionRepository
}

func NewSessionSignOutService(sessionRepo *repositories.SessionRepository) *SessionSignOutService {
	return &SessionSignOutService{sessionRepo: sessionRepo}
}

func (s *SessionSignOutService) TerminatingExistingUserSession(ctx context.Context, session models.Session, user models.User) error {
	log.Println("Checking for existing user session for user:", user.Auth0ID)
	log.Printf("User Auth0 ID: %v", user.Auth0ID.String)

	existingUserSession, err := s.sessionRepo.FindSessionByAuth0ID(ctx, user.Auth0ID.String)
	if err != nil {
		if errors.Is(err, repositories.ErrSessionNotFound) {
			log.Println("User session not found -- no session to terminate for: ", user.Email)
			return nil
		}
		log.Printf("Error finding user session: %v", err)
		return err
	}

	log.Printf("User session found for user: %s, session ID: %s", user.Email, existingUserSession.SessionID)

	return s.sessionRepo.TerminateUserSession(ctx, &session, &user)
}
