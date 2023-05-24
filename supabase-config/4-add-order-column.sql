-- Add order column for questions and images
ALTER TABLE public.answer
    ADD COLUMN "order" integer;
ALTER TABLE public.question_images
    ADD COLUMN "order" integer;

-- Fill order for null values based on created_at and question id
WITH answer_order AS (
    SELECT id, created_at, question, ROW_NUMBER() OVER (PARTITION BY question ORDER BY created_at) AS row_number
    FROM answer
    WHERE "order" IS NULL
) UPDATE answer
SET "order" = answer_order.row_number
FROM answer_order
WHERE answer.id = answer_order.id;
WITH question_images_order AS (
    SELECT id, created_at, question, ROW_NUMBER() OVER (PARTITION BY question ORDER BY created_at) AS row_number
    FROM question_images
    WHERE "order" IS NULL
) UPDATE question_images
SET "order" = question_images_order.row_number
FROM question_images_order
WHERE question_images.id = question_images_order.id;