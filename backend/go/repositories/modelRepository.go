package repositories

import (
	"backend/go/models"
	"context"
	"database/sql"
	"errors"
	"log"
	"time"

	"github.com/google/uuid"
)

type IModelRepository interface {
}

type ModelRepository struct {
	DB *sql.DB
}

func NewModelRepository(db *sql.DB) *ModelRepository {
	log.Printf("Database setup: %+v\n", db)
	return &ModelRepository{
		DB: db,
	}
}

var _ IModelRepository = &ModelRepository{}

var ErrModelCreationFailed = errors.New("model creation failed")
var ErrModelDataInconsistent = errors.New("model data inconsistent")
var ErrModelStorageFailed = errors.New("failed to store model data")
var ErrModelValidationFailed = errors.New("model validation failed")
var ErrModelAuthorizationFailed = errors.New("user not authorized to create model")
var ErrModelLimitExceeded = errors.New("user has exceeded the model creation limit")
var ErrModelFormatUnsupported = errors.New("unsupported model format")

func (repo *UserRepository) CreateModel(ctx context.Context, model *models.Model, user *models.User) error {
	// prepare user fields for creation
	now := time.Now()
	newUUID := uuid.New()

	model.ModelID = newUUID
	model.ModelCreatedAt = now
	model.ModelUpdatedAt = sql.NullTime{Time: now, Valid: true}
	model.ModelCreatedByUserID = user.UserID
	model.ModelStatus = "ACTIVE" // models should only ever be in an active, draft, archived, or deleted status

	query := `INSERT INTO models 
	(model_id, model_created_at, model_updated_at, model_created_by_user_id, model_name, model_data_type, model_language, model_packages, model_parameters, model_status) 
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`

	log.Printf("Executing CreateModel for model: %+v\n", model)

	_, err := repo.DB.ExecContext(ctx, query,
		model.ModelID,
		model.ModelCreatedAt,
		model.ModelUpdatedAt,
		model.ModelCreatedByUserID,
		model.ModelName,
		model.ModelDataType,
		model.ModelLanguage,
		model.ModelPackages,
		model.ModelParameters,
		model.ModelStatus,
	)
	if err != nil {
		log.Printf("Error executing CreateModel query: %v\n", err)
		return err
	}
	return nil
}
