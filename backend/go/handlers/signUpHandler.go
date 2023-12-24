package handlers

import (
	"backend/go/models"
	services "backend/go/services/user/userSignUp"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type SignUpHandler struct {
	UserSignUpService *services.UserSignUpService
}

func NewSignUpHandler(userSignUpService *services.UserSignUpService) *SignUpHandler {
	return &SignUpHandler{
		UserSignUpService: userSignUpService,
	}
}

func (h *SignUpHandler) SignUp(c *gin.Context) {
	log.Println("SignUpHandler called.")

	var input models.SignUpInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := models.User{
		Email:    input.Email,
		Password: input.Password,
	}

	err := h.UserSignUpService.SignUp(c.Request.Context(), &user)
	if err != nil {
		log.Printf("SignUp error: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "User created successfully.",
		"user_id": user.UserID,
	})
}
