package handlers

import (
	"backend/go/models"
	services "backend/go/services/user/userSignIn"
	"backend/go/utils"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type SignInHandler struct {
	UserSignInService *services.UserSignInService
}

func NewSignInHandler(UserSignInService *services.UserSignInService) *SignInHandler {
	return &SignInHandler{
		UserSignInService: UserSignInService,
	}
}

func (h *SignInHandler) SignIn(c *gin.Context) {
	log.Println("SignInHandler called.")

	var input models.SignInInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ipAddress := utils.GetIPFromRequest(c.Request)
	if err := h.UserSignInService.SignIn(c.Request.Context(), input.Email, input.Password, ipAddress); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User signed in successfully.",
	})
}
