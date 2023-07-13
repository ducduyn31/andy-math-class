-- Add order column for chapters
ALTER TABLE IF EXISTS chapters
    ADD COLUMN IF NOT EXISTS "order" integer;

-- Fill order for null values based on created_at and book id
WITH chapters_with_order AS (
    SELECT id, created_at, book, ROW_NUMBER() OVER (PARTITION BY book, parent ORDER BY created_at) AS "order"
    FROM chapters
    WHERE "order" IS NULL
) UPDATE chapters
SET "order" = chapters_with_order.order
FROM chapters_with_order
WHERE chapters.id = chapters_with_order.id;