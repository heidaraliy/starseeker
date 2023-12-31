package handlers

import (
	"backend/go/models"
	"backend/go/repositories"
	sessionService "backend/go/services/session"
	"errors"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserSessionSignInHandler struct {
	userSessionSignInService *sessionService.SessionSignInService
}

func NewUserSessionSignInHandler(userSessionSignInService *sessionService.SessionSignInService) *UserSessionSignInHandler {
	return &UserSessionSignInHandler{userSessionSignInService: userSessionSignInService}
}

func (h *UserSessionSignInHandler) UserSessionCreationHandler(c *gin.Context) {
	user, exists := c.Get("user")
	log.Printf("Context 'user' contains: %v", user)
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User context not set."})
		return
	}
	log.Println("Context properly set.")

	userModel, ok := user.(models.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user context."})
		return
	}
	log.Println("Context valid.")

	// Parse request body into user struct -- commenting out for test!
	/*
		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data."})
			return
		}
		log.Println("JSON parsed and bound successfully.")
	*/

	// Prepare a new session model
	session := models.Session{
		UserID:  userModel.UserID,
		Auth0ID: userModel.Auth0ID,
	}

	log.Printf("Received user data for session creation: %+v", user) // Log the received user data

	// Call the service to create a new session
	if err := h.userSessionSignInService.CreateNewUserSession(c.Request.Context(), session, userModel); err != nil {
		// Handle different types of errors accordingly
		if errors.Is(err, repositories.ErrSessionNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Session not found."})
			log.Printf("Session not found: %s", err)
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error."})
			log.Printf("Internal server error: %s", err)
		}
		return
	}

	// If successful, return a success response
	c.JSON(http.StatusOK, gin.H{"message": "User session created successfully."})
}
