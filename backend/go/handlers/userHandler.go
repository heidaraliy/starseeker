package handlers

import (
	"backend/go/models"
	services "backend/go/services/user"
	"database/sql"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	userService *services.UserService
}

func NewUserHandler(userService *services.UserService) *UserHandler {
	return &UserHandler{userService: userService}
}

func (h *UserHandler) UserUpdateHandler(c *gin.Context) {
	var jsonPayload struct {
		Sub   string `json:"sub"`
		Email string `json:"email"`
		// Include other fields from the payload as needed
	}

	if err := c.ShouldBindJSON(&jsonPayload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := models.User{
		Auth0ID: sql.NullString{String: jsonPayload.Sub, Valid: jsonPayload.Sub != ""},
		Email:   jsonPayload.Email,
	}

	log.Printf("Received user data: %+v", user) // Log the received user data

	if err := h.userService.UpdateUserDetails(c, user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Send a success response back
	c.JSON(http.StatusOK, user)
}
