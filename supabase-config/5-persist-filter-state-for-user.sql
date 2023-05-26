-- Add a table to store filters
CREATE TABLE IF NOT EXISTS
    public.filter_states
(
    id         uuid                     not null default uuid_generate_v4(),
    created_at timestamp with time zone null     default now(),
    email      text                     null,
    category   text                     null,
    state      jsonb                    null,
    constraint filter_states_pkey primary key (id),
    constraint filter_states_email_fkey foreign key (email) references next_auth.users (email) on delete cascade
) tablespace pg_default;

ALTER TABLE IF EXISTS public.filter_states
    OWNER to postgres;

ALTER TABLE IF EXISTS public.filter_states
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.filter_states TO postgres;
GRANT ALL ON TABLE public.filter_states TO service_role;