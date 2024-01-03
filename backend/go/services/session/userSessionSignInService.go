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
	log.Println("Checking for existing user session for user:", user.Auth0ID.String)

	existingUserSession, err := s.sessionRepo.FindSessionByAuth0ID(ctx, user.Auth0ID.String)
	if errors.Is(err, repositories.ErrSessionNotFound) {
		log.Println("No active session found, creating a new one for:", user.Email)
		return s.sessionRepo.CreateUserSession(ctx, &session, &user)
	} else if err != nil {
		log.Printf("Error finding user session: %v", err)
		return err
	} else if existingUserSession.Status == "ACTIVE" {
		log.Printf("Existing session found for user: %s, session ID: %s", user.Email, existingUserSession.SessionID)
		log.Printf("Retrieved session status: %s", existingUserSession.Status)
		log.Printf("Terminating existing session and creating a new one.")
		if err := s.sessionRepo.TerminateUserSession(ctx, existingUserSession, &user); err != nil {
			return err
		}

		if err := s.sessionRepo.CreateUserSession(ctx, &session, &user); err != nil {
			return err
		}

		return nil
	}
	return nil
}
