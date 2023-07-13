-- Create class-questions bucket
INSERT INTO storage.buckets(id, name, public, avif_autodetection, allowed_mime_types)
VALUES ('class-questions', 'class-questions', true, false, '{image/*}')
ON CONFLICT DO NOTHING;

-- Allow admin to upload to class-questions
DO
$$
    BEGIN
        IF NOT EXISTS(SELECT 1
                      FROM pg_policy
                      WHERE polname = 'allow admin to upload images to class questions'
                        AND polrelid = 'storage.objects'::regclass) THEN
            CREATE POLICY "allow admin to upload images to class questions"
                ON storage.objects
                FOR INSERT TO service_role
                WITH CHECK (bucket_id = 'class-questions');
        END IF;
    END ;
$$;

DO
$$
    BEGIN
        IF NOT EXISTS(SELECT 1
                      FROM pg_policy
                      WHERE polname = 'allow admin to delete images from class questions 2'
                        AND polrelid = 'storage.objects'::regclass) THEN
            CREATE POLICY "allow admin to delete images from class questions"
                ON storage.objects
                FOR DELETE TO service_role
                USING (bucket_id = 'class-questions');
        END IF;
    END ;
$$;
