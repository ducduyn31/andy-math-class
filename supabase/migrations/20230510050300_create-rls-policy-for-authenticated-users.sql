-- Allow authenticated to select themselves
DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM pg_policy
                       WHERE polrelid = 'next_auth.users'::regclass
                         AND polname = 'allow authenticated to only select himself') THEN
            CREATE POLICY "allow authenticated to only select himself"
                ON "next_auth"."users" AS PERMISSIVE FOR SELECT
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
                       WHERE polrelid = 'next_auth.users'::regclass
                         AND polname = 'allow authenticated to only update himself') THEN
            CREATE POLICY "allow authenticated to only update himself"
                ON "next_auth"."users" AS PERMISSIVE FOR UPDATE
                TO authenticated
                USING (email = auth.jwt() ->> 'email') WITH CHECK (email = auth.jwt() ->> 'email');
        END IF;
    END
$$;

-- Allow authenticated to select books they are assigned to
DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM pg_policy
                       WHERE polrelid = 'public.user_books_assignation'::regclass
                         AND polname = 'allow authenticated to only select his assigned books') THEN
            CREATE POLICY "allow authenticated to only select his assigned books" ON "public"."user_books_assignation"
                AS PERMISSIVE FOR SELECT
                TO authenticated
                USING ("public"."user_books_assignation"."user"::text = auth.jwt() ->> 'user_id'::text);
        END IF;
    END
$$;

DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM pg_policy
                       WHERE polrelid = 'public.books'::regclass
                         AND polname = 'allow authenticated to only select his books') THEN
            CREATE POLICY "allow authenticated to only select his books" ON "public"."books"
                AS PERMISSIVE FOR SELECT
                TO authenticated
                USING ("public"."books"."id"::text IN (SELECT "public"."user_books_assignation"."book"::text
                                                       FROM "public"."user_books_assignation"));
        END IF;
    END
$$;

DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM pg_policy
                       WHERE polrelid = 'public.chapters'::regclass
                         AND polname = 'allow authenticated to only select his chapters from books') THEN
            CREATE POLICY "allow authenticated to only select his chapters from books" ON "public"."chapters"
                AS PERMISSIVE FOR SELECT
                TO authenticated
                USING ("public"."chapters"."book"::text IN (SELECT "public"."user_books_assignation"."book"::text
                                                            FROM "public"."user_books_assignation"));
        END IF;
    END
$$;

-- Allow authenticated to select questions and answers from his chapters
DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM pg_policy
                       WHERE polrelid = 'public.questions'::regclass
                         AND polname = 'allow authenticated to only select his questions') THEN
            CREATE POLICY "allow authenticated to only select his questions" ON "public"."questions"
                AS PERMISSIVE FOR SELECT
                TO authenticated
                USING ("public"."questions"."chapter"::text IN (SELECT "public"."chapters"."id"::text
                                                                FROM "public"."chapters"));
        END IF;
    END
$$;

DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM pg_policy
                       WHERE polrelid = 'public.question_images'::regclass
                         AND polname = 'allow authenticated to only select his question images') THEN
            CREATE POLICY "allow authenticated to only select his question images" ON "public"."question_images"
                AS PERMISSIVE FOR SELECT
                TO authenticated
                USING ("public"."question_images"."question"::text IN (SELECT "public"."questions"."id"::text
                                                                       FROM "public"."questions"));
        END IF;
    END
$$;

DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM pg_policy
                       WHERE polrelid = 'public.answer'::regclass
                         AND polname = 'allow authenticated to only select his answer images') THEN
            CREATE POLICY "allow authenticated to only select his answer images" ON "public"."answer"
                AS PERMISSIVE FOR SELECT
                TO authenticated
                USING ("public"."answer"."question"::text IN (SELECT "public"."questions"."id"::text
                                                              FROM "public"."questions"));
        END IF;
    END
$$;
