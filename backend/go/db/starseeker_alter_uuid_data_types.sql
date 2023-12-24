-- uuid data type change (-_-) 
-- execute step-by-step:

-- drop fkeys for text to uuid migration
ALTER TABLE user_events DROP CONSTRAINT user_events_user_id_fkey;
ALTER TABLE sessions DROP CONSTRAINT sessions_user_id_fkey;
ALTER TABLE models DROP CONSTRAINT models_model_created_by_user_id_fkey;
ALTER TABLE model_events DROP CONSTRAINT model_events_model_event_created_by_user_id_fkey;

-- alter from text to uuid
ALTER TABLE model_events ALTER COLUMN model_event_id TYPE UUID USING model_event_id::UUID;
ALTER TABLE model_events ALTER COLUMN model_id TYPE UUID USING model_id::UUID;
ALTER TABLE models ALTER COLUMN model_id TYPE UUID USING model_id::UUID;
ALTER TABLE models ALTER COLUMN model_created_by_user_id TYPE UUID USING model_created_by_user_id::UUID;
ALTER TABLE sessions ALTER COLUMN session_id TYPE UUID USING session_id::UUID;
ALTER TABLE sessions ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE user_events ALTER COLUMN user_event_id TYPE UUID USING user_event_id::UUID;
ALTER TABLE user_events ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE users ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE users ALTER COLUMN previous_user_id TYPE UUID USING previous_user_id::UUID;
ALTER TABLE users ALTER COLUMN last_event_id TYPE UUID USING last_event_id::UUID;

