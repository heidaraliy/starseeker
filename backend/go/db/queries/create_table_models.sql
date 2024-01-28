-- Table: public.models

-- DROP TABLE IF EXISTS public.models;

CREATE TABLE IF NOT EXISTS public.models
(
    model_id uuid NOT NULL,
    model_created_at timestamp without time zone,
    model_updated_at timestamp without time zone,
    model_created_by_user_id uuid,
    model_name text COLLATE pg_catalog."default",
    model_data_type text COLLATE pg_catalog."default",
    model_language text COLLATE pg_catalog."default",
    model_packages json,
    model_parameters json,
    total_operational_cost_usd numeric(10,2),
    total_compute_time_seconds integer,
    total_data_processed_gb numeric(10,3),
    model_status text COLLATE pg_catalog."default",
    CONSTRAINT models_pkey PRIMARY KEY (model_id),
    CONSTRAINT fk_models_user FOREIGN KEY (model_created_by_user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.models
    OWNER to postgres;