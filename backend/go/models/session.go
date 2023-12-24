package models

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type Session struct {
	SessionID                 uuid.UUID    `json:"session_id" db:"session_id"`
	UserID                    uuid.UUID    `json:"user_id" db:"user_id"`
	CreatedAt                 time.Time    `json:"created_at" db:"created_at"`
	ExpiresAt                 time.Time    `json:"expires_at" db:"expires_at"`
	TerminatedAt              sql.NullTime `json:"terminated_at" db:"terminated_at"`
	IPAddress                 string       `json:"ip_address" db:"ip_address"`
	Status                    string       `json:"status" db:"status"`
	SessionCostUSD            float64      `json:"session_cost_usd" db:"session_cost_usd"`
	SessionComputeTimeSeconds int          `json:"session_compute_time_seconds" db:"session_compute_time_seconds"`
	SessionDataProcessedGB    float64      `json:"session_data_processed_gb" db:"session_data_processed_gb"`
}

func NewSession(userID uuid.UUID, ipAddress string) *Session {
	currentTime := time.Now()
	return &Session{
		SessionID: uuid.New(),
		UserID:    userID,
		CreatedAt: currentTime,
		ExpiresAt: currentTime.Add(24 * time.Hour),
		IPAddress: ipAddress,
		Status:    "ACTIVE",
	}
}
