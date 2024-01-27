package handlers

import (
	"backend/go/models"
	userRepository "backend/go/repositories"
	modelService "backend/go/services/model"
	"bytes"
	"errors"
	"io"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ModelCreationHandler struct {
	modelCreationService *modelService.ModelCreationService
	userRespository      *userRepository.UserRepository
}

func NewModelCreationHandler(modelCreationService *modelService.ModelCreationService, userRepository *userRepository.UserRepository) *ModelCreationHandler {
	return &ModelCreationHandler{
		modelCreationService: modelCreationService,
		userRespository:      userRepository,
	}
}

func (h *ModelCreationHandler) ModelCreationHandler(c *gin.Context) {
	bodyBytes, err := io.ReadAll(c.Request.Body)
	if err != nil {
		log.Printf("Error reading request body: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error reading request body"})
		return
	}

	log.Printf("Raw Request Body: %s", string(bodyBytes))

	c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))

	var jsonPayload struct {
		ModelName       string                 `json:"model_name"`
		ModelDataType   string                 `json:"model_data_type"`
		ModelLanguage   string                 `json:"model_language"`
		ModelPackages   []string               `json:"model_packages"`
		ModelParameters map[string]interface{} `json:"model_parameters"`
		Email           string                 `json:"email"`
	}

	if err := c.ShouldBindJSON(&jsonPayload); err != nil {
		log.Printf("Error binding JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if jsonPayload.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email is required"})
		return
	}

	log.Printf("Received request body: %+v", jsonPayload)

	model := models.Model{
		ModelName:       jsonPayload.ModelName,
		ModelDataType:   jsonPayload.ModelDataType,
		ModelLanguage:   jsonPayload.ModelLanguage,
		ModelPackages:   jsonPayload.ModelPackages,
		ModelParameters: jsonPayload.ModelParameters,
	}

	log.Println("Finding user.")
	user, err := h.userRespository.FindUserByEmail(c.Request.Context(), jsonPayload.Email)
	if err != nil {
		if errors.Is(err, userRepository.ErrUserNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	log.Println("Model:", model)
	log.Println("User:", user)

	if err := h.modelCreationService.CreateNewModel(c.Request.Context(), model, *user); err != nil {
	}
}
