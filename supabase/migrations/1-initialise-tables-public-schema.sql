-- Table: public.books

-- DROP TABLE IF EXISTS public.books;

CREATE TABLE IF NOT EXISTS public.books
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone DEFAULT now(),
    name text COLLATE pg_catalog."default",
    color text COLLATE pg_catalog."default",
    CONSTRAINT books_pkey PRIMARY KEY (id)
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.books
    OWNER to postgres;

ALTER TABLE IF EXISTS public.books
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.books TO anon;

GRANT ALL ON TABLE public.books TO authenticated;

GRANT ALL ON TABLE public.books TO postgres;

GRANT ALL ON TABLE public.books TO service_role;

-- Table: public.chapters

-- DROP TABLE IF EXISTS public.chapters;

CREATE TABLE IF NOT EXISTS public.chapters
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone DEFAULT now(),
    name text COLLATE pg_catalog."default",
    book uuid,
    parent uuid,
    CONSTRAINT chapters_pkey PRIMARY KEY (id),
    CONSTRAINT chapters_book_fkey FOREIGN KEY (book)
        REFERENCES public.books (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT chapters_parent_fkey FOREIGN KEY (parent)
        REFERENCES public.chapters (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.chapters
    OWNER to postgres;

ALTER TABLE IF EXISTS public.chapters
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.chapters TO anon;

GRANT ALL ON TABLE public.chapters TO authenticated;

GRANT ALL ON TABLE public.chapters TO postgres;

GRANT ALL ON TABLE public.chapters TO service_role;

-- Table: public.questions

-- DROP TABLE IF EXISTS public.questions;

CREATE TABLE IF NOT EXISTS public.questions
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone DEFAULT now(),
    name text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    book uuid,
    chapter uuid,
    CONSTRAINT question_pkey PRIMARY KEY (id),
    CONSTRAINT questions_book_fkey FOREIGN KEY (book)
        REFERENCES public.books (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE SET NULL,
    CONSTRAINT questions_chapter_fkey FOREIGN KEY (chapter)
        REFERENCES public.chapters (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE SET NULL
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.questions
    OWNER to postgres;

ALTER TABLE IF EXISTS public.questions
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.questions TO anon;

GRANT ALL ON TABLE public.questions TO authenticated;

GRANT ALL ON TABLE public.questions TO postgres;

GRANT ALL ON TABLE public.questions TO service_role;

-- Table: public.answer

-- DROP TABLE IF EXISTS public.answer;

CREATE TABLE IF NOT EXISTS public.answer
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone DEFAULT now(),
    name text COLLATE pg_catalog."default",
    question uuid,
    image text COLLATE pg_catalog."default",
    CONSTRAINT answer_pkey PRIMARY KEY (id),
    CONSTRAINT answer_question_fkey FOREIGN KEY (question)
        REFERENCES public.questions (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.answer
    OWNER to postgres;

ALTER TABLE IF EXISTS public.answer
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.answer TO anon;

GRANT ALL ON TABLE public.answer TO authenticated;

GRANT ALL ON TABLE public.answer TO postgres;

GRANT ALL ON TABLE public.answer TO service_role;

-- Table: public.question_images

-- DROP TABLE IF EXISTS public.question_images;

CREATE TABLE IF NOT EXISTS public.question_images
(
    created_at timestamp with time zone DEFAULT now(),
    question uuid,
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    image text COLLATE pg_catalog."default",
    CONSTRAINT question_images_pkey PRIMARY KEY (id),
    CONSTRAINT question_images_question_fkey FOREIGN KEY (question)
        REFERENCES public.questions (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.question_images
    OWNER to postgres;

ALTER TABLE IF EXISTS public.question_images
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.question_images TO anon;

GRANT ALL ON TABLE public.question_images TO authenticated;

GRANT ALL ON TABLE public.question_images TO postgres;

GRANT ALL ON TABLE public.question_images TO service_role;

-- Table: public.user_books_assignation

-- DROP TABLE IF EXISTS public.user_books_assignation;

CREATE TABLE IF NOT EXISTS public.user_books_assignation
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone DEFAULT now(),
    "user" uuid,
    book uuid,
    CONSTRAINT user_books_assignation_pkey PRIMARY KEY (id),
    CONSTRAINT user_books_assignation_book_fkey FOREIGN KEY (book)
        REFERENCES public.books (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT user_books_assignation_user_fkey FOREIGN KEY ("user")
        REFERENCES next_auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_books_assignation
    OWNER to postgres;

ALTER TABLE IF EXISTS public.user_books_assignation
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.user_books_assignation TO anon;

GRANT ALL ON TABLE public.user_books_assignation TO authenticated;

GRANT ALL ON TABLE public.user_books_assignation TO postgres;

GRANT ALL ON TABLE public.user_books_assignation TO service_role;