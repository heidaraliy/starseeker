-- Table: public.user_sessions

-- DROP TABLE IF EXISTS public.user_sessions;

CREATE TABLE IF NOT EXISTS public.user_sessions
(
    session_id uuid NOT NULL,
    user_id uuid NOT NULL,
    session_created_at timestamp without time zone,
    session_terminated_at timestamp without time zone,
    ip_address text COLLATE pg_catalog."default",
    status text COLLATE pg_catalog."default",
    session_cost_usd numeric(10,2),
    session_compute_time_seconds integer,
    session_data_processed_gb numeric(10,3),
    session_device_type text COLLATE pg_catalog."default",
    auth0_id text COLLATE pg_catalog."default",
    CONSTRAINT sessions_pkey PRIMARY KEY (session_id),
    CONSTRAINT fk_sessions_user FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_sessions
    OWNER to postgres;