-- Allow authenticated to select themselves
CREATE POLICY "allow authenticated to only select himself"
    ON "next_auth"."users" AS PERMISSIVE FOR SELECT
    TO authenticated
    USING (email = auth.jwt() ->> 'email');

-- Allow authenticated to select books they are assigned to
CREATE POLICY "allow authenticated to only select his assigned books" ON "public"."user_books_assignation"
    AS PERMISSIVE FOR SELECT
    TO authenticated
    USING ("public"."user_books_assignation"."user"::text = auth.jwt() ->> 'user_id'::text);

CREATE POLICY "allow authenticated to only select his books" ON "public"."books"
    AS PERMISSIVE FOR SELECT
    TO authenticated
    USING ("public"."books"."id"::text IN (SELECT "public"."user_books_assignation"."book"::text
                                           FROM "public"."user_books_assignation"));

CREATE POLICY "allow authenticated to only select his chapters from books" ON "public"."chapters"
    AS PERMISSIVE FOR SELECT
    TO authenticated
    USING ("public"."chapters"."book"::text IN (SELECT "public"."user_books_assignation"."book"::text
                                                FROM "public"."user_books_assignation"));

-- Allow authenticated to select questions and answers from his chapters
CREATE POLICY "allow authenticated to only select his questions" ON "public"."questions"
    AS PERMISSIVE FOR SELECT
    TO authenticated
    USING ("public"."questions"."chapter"::text IN (SELECT "public"."chapters"."id"::text
                                                    FROM "public"."chapters"));

CREATE POLICY "allow authenticated to only select his question images" ON "public"."question_images"
    AS PERMISSIVE FOR SELECT
    TO authenticated
    USING ("public"."question_images"."question"::text IN (SELECT "public"."questions"."id"::text
                                                           FROM "public"."questions"));

CREATE POLICY "allow authenticated to only select his answer images" ON "public"."answer"
    AS PERMISSIVE FOR SELECT
    TO authenticated
    USING ("public"."answer"."question"::text IN (SELECT "public"."questions"."id"::text
                                                  FROM "public"."questions"));
