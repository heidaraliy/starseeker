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
	// use the context we passed in from the UserUpdateHandler
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

	// use the RequestContext struct to assign IP and UserAgent to the session creation fields
	reqContext := RequestContext{
		IPAddress:  c.ClientIP(),
		DeviceType: c.Request.UserAgent(),
	}

	// prep a new session
	session := models.Session{
		IPAddress:         reqContext.IPAddress,
		SessionDeviceType: reqContext.DeviceType,
	}

	// call sign in service
	if err := h.userSessionSignInService.CreateNewUserSession(c.Request.Context(), session, userModel); err != nil {
		// error handling
		if errors.Is(err, repositories.ErrSessionNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Session not found."})
			log.Printf("Session not found: %s", err)
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error."})
			log.Printf("Internal server error: %s", err)
		}
		return
	}

	// success response on validation/session creation
	c.JSON(http.StatusOK, gin.H{"message": "User validated and session created successfully."})
}
