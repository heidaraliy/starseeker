package models

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type Model struct {
	ModelID              uuid.UUID      `json:"model_id" db:"model_id"`
	ModelCreatedAt       time.Time      `json:"model_created_at" db:"model_created_at"`
	ModelUpdatedAt       sql.NullTime   `json:"model_updated_at" db:"model_updated_at"`
	ModelCreatedByUserID uuid.UUID      `json:"model_created_by_user_id" db:"model_created_by_user_id"`
	ModelName            string         `json:"model_name" db:"model_name"`
	ModelDataType        string         `json:"model_data_type" db:"model_data_type"`
	ModelLanguage        string         `json:"model_language" db:"model_language"`
	ModelPackages        sql.NullString `json:"model_packages" db:"model_packages"`
	ModelParameters      sql.NullString `json:"model_parameters" db:"model_parameters"`
	OperationalCostUSD   float64        `json:"total_operational_cost_usd" db:"total_operational_cost_usd"`
	ComputeTimeSeconds   int            `json:"total_compute_time_seconds" db:"total_compute_time_seconds"`
	DataProcessedGB      float64        `json:"total_data_processed_gb" db:"total_data_processed_gb"`
	ModelStatus          string         `json:"model_status" db:"model_status"`
}
