CREATE TABLE "users" (
  "user_id" text PRIMARY KEY NOT NULL,
  "username" text UNIQUE,
  "email" text UNIQUE,
  "first_name" text,
  "last_name" text,
  "hashed_password" text,
  "user_profile_created_at" timestamp,
  "user_profile_updated_at" timestamp,
  "last_login_timestamp" timestamp,
  "last_event_id" text,
  "last_event_timestamp" timestamp,
  "last_event_type" text,
  "role" text,
  "status" text
);

CREATE TABLE "user_events" (
  "user_event_id" text PRIMARY KEY NOT NULL,
  "user_id" text,
  "user_event_type" text,
  "user_event_description" text,
  "user_event_timestamp" timestamp
);

CREATE TABLE "models" (
  "model_id" text PRIMARY KEY NOT NULL,
  "model_created_at" timestamp,
  "model_updated_at" timestamp,
  "model_created_by_user_id" text,
  "model_name" text,
  "model_data_type" text,
  "model_language" text,
  "model_packages" JSON,
  "model_parameters" JSON
);

CREATE TABLE "model_events" (
  "model_event_id" text PRIMARY KEY NOT NULL,
  "model_id" text,
  "model_event_type" text,
  "model_event_description" text,
  "model_event_timestamp" timestamp,
  "model_event_created_by_user_id" text
);

ALTER TABLE "user_events" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "models" ADD FOREIGN KEY ("model_created_by_user_id") REFERENCES "users" ("user_id");

ALTER TABLE "model_events" ADD FOREIGN KEY ("model_id") REFERENCES "models" ("model_id");

ALTER TABLE "model_events" ADD FOREIGN KEY ("model_event_created_by_user_id") REFERENCES "users" ("user_id");
