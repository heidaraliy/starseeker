-- Table: public.user_events

-- DROP TABLE IF EXISTS public.user_events;

CREATE TABLE IF NOT EXISTS public.user_events
(
    user_event_id uuid NOT NULL,
    user_id uuid,
    user_event_type text COLLATE pg_catalog."default",
    user_event_description text COLLATE pg_catalog."default",
    user_event_timestamp timestamp without time zone,
    CONSTRAINT user_events_pkey PRIMARY KEY (user_event_id),
    CONSTRAINT fk_user_events_user FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_events
    OWNER to postgres;