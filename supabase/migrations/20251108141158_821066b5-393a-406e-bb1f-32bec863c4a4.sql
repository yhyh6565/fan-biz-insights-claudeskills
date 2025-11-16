-- Add shares column to articles table
ALTER TABLE public.articles 
ADD COLUMN shares integer NOT NULL DEFAULT 0;

-- Create analytics table for tracking visitor statistics
CREATE TABLE public.analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date date NOT NULL,
  unique_visitors integer NOT NULL DEFAULT 0,
  page_views integer NOT NULL DEFAULT 0,
  avg_time_seconds integer NOT NULL DEFAULT 0,
  bounce_rate numeric(5,2) NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(date)
);

-- Create traffic_sources table for tracking where visitors come from
CREATE TABLE public.traffic_sources (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date date NOT NULL,
  source text NOT NULL,
  visitors integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(date, source)
);

-- Create search_keywords table for tracking popular search terms
CREATE TABLE public.search_keywords (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date date NOT NULL,
  keyword text NOT NULL,
  count integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(date, keyword)
);

-- Enable RLS on new tables
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traffic_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_keywords ENABLE ROW LEVEL SECURITY;

-- RLS policies for analytics (public read, admin write)
CREATE POLICY "Anyone can view analytics"
ON public.analytics
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert analytics"
ON public.analytics
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update analytics"
ON public.analytics
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for traffic_sources
CREATE POLICY "Anyone can view traffic sources"
ON public.traffic_sources
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert traffic sources"
ON public.traffic_sources
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for search_keywords
CREATE POLICY "Anyone can view search keywords"
ON public.search_keywords
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert search keywords"
ON public.search_keywords
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for analytics updated_at
CREATE TRIGGER update_analytics_updated_at
BEFORE UPDATE ON public.analytics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to increment article shares
CREATE OR REPLACE FUNCTION public.increment_article_shares(article_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE articles
  SET shares = shares + 1
  WHERE id = article_id;
END;
$function$;