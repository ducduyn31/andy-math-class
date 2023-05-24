-- Add order column for questions and images
ALTER TABLE public.answer
    ADD COLUMN "order" integer;
ALTER TABLE public.question_images
    ADD COLUMN "order" integer;
