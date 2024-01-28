-- Table: public.model_events

-- DROP TABLE IF EXISTS public.model_events;

CREATE TABLE IF NOT EXISTS public.model_events
(
    model_event_id uuid NOT NULL,
    model_id uuid,
    model_event_type text COLLATE pg_catalog."default",
    model_event_description text COLLATE pg_catalog."default",
    model_event_timestamp timestamp without time zone,
    model_event_created_by_user_id uuid,
    event_cost_usd numeric(10,2),
    event_compute_time_seconds integer,
    event_data_processed_gb numeric(10,3),
    CONSTRAINT model_events_pkey PRIMARY KEY (model_event_id),
    CONSTRAINT fk_model_events_model FOREIGN KEY (model_id)
        REFERENCES public.models (model_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.model_events
    OWNER to postgres;