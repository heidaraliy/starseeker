package handlers

import (
	"backend/go/models"
	"backend/go/repositories"
	sessionService "backend/go/services/session"
	"database/sql"
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
	var jsonPayload struct {
		Sub   string `json:"sub"`
		Email string `json:"email"`
	}

	if err := c.ShouldBindJSON(&jsonPayload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := models.User{
		Auth0ID: sql.NullString{String: jsonPayload.Sub, Valid: jsonPayload.Sub != ""},
		Email:   jsonPayload.Email,
	}

	if err := h.userSessionSignOutService.TerminatingExistingUserSession(c.Request.Context(), user); err != nil {
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
