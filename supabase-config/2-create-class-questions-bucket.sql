-- Create class-questions bucket
INSERT INTO storage.buckets(id, name, public, avif_autodetection, allowed_mime_types)
VALUES ('class-questions', 'class-questions', true, false, '{image/*}');

-- Allow admin to upload to class-questions
CREATE POLICY "allow admin to upload images to class questions" ON storage.objects FOR INSERT TO service_role WITH CHECK (bucket_id = 'class-questions');
CREATE POLICY "allow admin to delete images from class questions" ON storage.objects FOR DELETE TO service_role USING (bucket_id = 'class-questions');