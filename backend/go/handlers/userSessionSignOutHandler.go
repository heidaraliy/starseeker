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

type UserSessionSignOutHandler struct {
	userSessionSignOutService *sessionService.SessionSignOutService
}

func NewUserSessionSignOutHandler(userSessionSignOutService *sessionService.SessionSignOutService) *UserSessionSignOutHandler {
	return &UserSessionSignOutHandler{userSessionSignOutService: userSessionSignOutService}
}

func (h *UserSessionSignOutHandler) UserSessionTerminationHandler(c *gin.Context) {
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

	// prepare the session, fields already set in our repo
	session := models.Session{}

	log.Printf("Received user data for session termination: %+v", user) // Log the received user data

	// Call the service to create a new session
	if err := h.userSessionSignOutService.TerminatingExistingUserSession(c.Request.Context(), session, userModel); err != nil {
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
	c.JSON(http.StatusOK, gin.H{"message": "User session terminated successfully."})
}
