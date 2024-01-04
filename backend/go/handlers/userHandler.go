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
	log.Printf("User data received.")

	// update the changed (if any) user fields on sign in
	if err := h.userService.UpdateUserDetails(c, user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// set into context for "user" and pass control using Next() to the next handler (session sign in)
	c.Set("user", user)
	c.Next()
}
