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

type RequestContext struct {
	IPAddress  string
	DeviceType string
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

	reqContext := RequestContext{
		IPAddress:  c.ClientIP(),
		DeviceType: c.Request.UserAgent(),
	}

	// Prepare a new session model
	session := models.Session{
		IPAddress:         reqContext.IPAddress,
		SessionDeviceType: reqContext.DeviceType,
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
	c.JSON(http.StatusOK, gin.H{"message": "User validated and session created successfully."})
}
