-- adding cost/data expenditure tracking

ALTER TABLE model_events
ADD COLUMN event_cost_usd DECIMAL(10, 2),
ADD COLUMN event_compute_time_seconds INT,
ADD COLUMN data_processed_gb DECIMAL(10, 3);

ALTER TABLE models
ADD COLUMN total_operational_cost_usd DECIMAL(10, 2),
ADD COLUMN total_compute_time_seconds INT,
ADD COLUMN total_data_processed_gb DECIMAL(10, 3);

ALTER TABLE sessions
ADD COLUMN session_cost_usd DECIMAL(10, 2),
ADD COLUMN session_compute_time_seconds INT,
ADD COLUMN session_data_processed_gb DECIMAL(10, 3);