-- Fix analytics tables RLS policies to restrict to admin users only

-- Drop existing public SELECT policies
DROP POLICY IF EXISTS "Anyone can view analytics" ON analytics;
DROP POLICY IF EXISTS "Anyone can view traffic sources" ON traffic_sources;
DROP POLICY IF EXISTS "Anyone can view search keywords" ON search_keywords;

-- Create admin-only SELECT policies
CREATE POLICY "Admins can view analytics"
ON analytics
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view traffic sources"
ON traffic_sources
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view search keywords"
ON search_keywords
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));