-- Add a table to store chapters select states
CREATE TABLE IF NOT EXISTS
    public.chapters_select_state
(
    id         uuid                     not null default uuid_generate_v4(),
    created_at timestamp with time zone null     default now(),
    email      text                     null,
    state      jsonb                    null,
    constraint chapters_select_states_pkey primary key (id),
    constraint chapters_select_states_email_fkey foreign key (email) references next_auth.users (email) on delete cascade
) tablespace pg_default;

ALTER TABLE IF EXISTS public.chapters_select_state
    OWNER to postgres;

ALTER TABLE IF EXISTS public.chapters_select_state
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.questions TO anon;
GRANT ALL ON TABLE public.questions TO authenticated;
GRANT ALL ON TABLE public.chapters_select_state TO postgres;
GRANT ALL ON TABLE public.chapters_select_state TO service_role;

-- Create RLS to allow users to only see their state
DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM pg_policy
                       WHERE polrelid = 'public.chapters_select_state'::regclass
                         AND polname = 'allow authenticated to only see his selected chapters') THEN
            CREATE POLICY "allow authenticated to only see his selected chapters"
                ON "public"."chapters_select_state" AS PERMISSIVE FOR SELECT
                TO authenticated
                USING (email = auth.jwt() ->> 'email');
        END IF;
    END
$$;

DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM pg_policy
                       WHERE polrelid = 'public.chapters_select_state'::regclass
                         AND polname = 'allow authenticated to save his selected chapters') THEN
            CREATE POLICY "allow authenticated to save his selected chapters"
                ON "public"."chapters_select_state" AS PERMISSIVE FOR INSERT
                TO authenticated
                WITH CHECK (email = auth.jwt() ->> 'email');
        END IF;
    END
$$;
