-- adding pkeys
ALTER TABLE model_events ADD PRIMARY KEY (model_event_id);
ALTER TABLE models ADD PRIMARY KEY (model_id);
ALTER TABLE sessions ADD PRIMARY KEY (session_id);
ALTER TABLE user_events ADD PRIMARY KEY (user_event_id);
ALTER TABLE users ADD PRIMARY KEY (user_id);

-- adding fkeys
ALTER TABLE model_events ADD CONSTRAINT fk_model_events_model FOREIGN KEY (model_id) REFERENCES models (model_id);
ALTER TABLE models ADD CONSTRAINT fk_models_user FOREIGN KEY (model_created_by_user_id) REFERENCES users (user_id);
ALTER TABLE sessions ADD CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES users (user_id);
ALTER TABLE user_events ADD CONSTRAINT fk_user_events_user FOREIGN KEY (user_id) REFERENCES users (user_id);
ALTER TABLE users ADD CONSTRAINT fk_users_previous_user FOREIGN KEY (previous_user_id) REFERENCES users (user_id);

-- this is a special fkey -- last_event_id can reference many fkeys in an event table (forecast_events, model_events, etc.)
ALTER TABLE users ADD CONSTRAINT fk_users_last_event FOREIGN KEY (last_event_id) REFERENCES model_events (model_event_id);
