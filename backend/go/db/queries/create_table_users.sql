-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    user_id uuid NOT NULL,
    email character varying(254) COLLATE pg_catalog."default",
    first_name character varying(255) COLLATE pg_catalog."default",
    last_name character varying(255) COLLATE pg_catalog."default",
    user_profile_created_at timestamp without time zone,
    user_profile_updated_at timestamp without time zone,
    role text COLLATE pg_catalog."default",
    status text COLLATE pg_catalog."default",
    auth0_id text COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT users_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
-- Index: unique_email_on_active_users

-- DROP INDEX IF EXISTS public.unique_email_on_active_users;

CREATE UNIQUE INDEX IF NOT EXISTS unique_email_on_active_users
    ON public.users USING btree
    (email COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default
    WHERE status <> 'deleted'::text;