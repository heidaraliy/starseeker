package model

import (
	"backend/go/models"
	"backend/go/repositories"
	"context"
	"log"
)

type ModelCreationService struct {
	modelRepo *repositories.ModelRepository
}

func NewModelCreationService(modelRepo *repositories.ModelRepository) *ModelCreationService {
	return &ModelCreationService{modelRepo: modelRepo}
}

func (s *ModelCreationService) CreateNewModel(ctx context.Context, model models.Model, user models.User) error {
	log.Printf("Creating new model: %+v", model)
	return s.modelRepo.CreateModel(ctx, &model, &user)
}
