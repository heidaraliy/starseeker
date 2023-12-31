package handlers

import (
	"backend/go/models"
	userServices "backend/go/services/user"
	"database/sql"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	userService *userServices.UserService
}

func NewUserHandler(userService *userServices.UserService) *UserHandler {
	return &UserHandler{userService: userService}
}

func (h *UserHandler) UserUpdateHandler(c *gin.Context) {
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

	log.Printf("Received user data for user creation and update: %+v", user) // Log the received user data

	if err := h.userService.UpdateUserDetails(c, user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Instead of sending a response, set user data in context and call next
	c.Set("user", user) // Set the user object in context for the next handler to use
	c.Next()            // This will pass control to the next handler in the chain
}
