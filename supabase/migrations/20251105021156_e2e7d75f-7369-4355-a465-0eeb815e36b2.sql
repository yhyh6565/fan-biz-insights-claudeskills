-- Create articles table
CREATE TABLE articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_number integer NOT NULL UNIQUE,
  title text NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  category text NOT NULL CHECK (category IN ('K-POP', 'MCU')),
  keywords text[] NOT NULL,
  author_name text DEFAULT 'Yeonhee Do',
  author_avatar text DEFAULT '/placeholder.svg',
  thumbnail text,
  hero_image text,
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  published_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_views ON articles(views DESC);
CREATE INDEX idx_articles_likes ON articles(likes DESC);
CREATE INDEX idx_articles_keywords ON articles USING GIN(keywords);
CREATE INDEX idx_articles_number ON articles(article_number);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Anyone can view articles
CREATE POLICY "Anyone can view articles"
  ON articles FOR SELECT
  TO public
  USING (true);

-- Create storage bucket for article images
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true);

-- Storage RLS - anyone can view images
CREATE POLICY "Anyone can view article images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'article-images');

-- Function to increment views
CREATE OR REPLACE FUNCTION increment_article_views(article_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE articles
  SET views = views + 1
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();