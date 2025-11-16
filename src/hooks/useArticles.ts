import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Article {
  id: string;
  article_number: number;
  title: string;
  summary: string;
  content: string;
  category: "K-POP" | "MCU";
  keywords: string[];
  author_name: string;
  author_avatar: string;
  thumbnail: string | null;
  hero_image: string | null;
  views: number;
  likes: number;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export const useArticles = (category?: string, keyword?: string) => {
  return useQuery({
    queryKey: ["articles", category, keyword],
    queryFn: async () => {
      let query = supabase
        .from("articles")
        .select("*")
        .order("published_at", { ascending: false });

      if (category) {
        query = query.eq("category", category);
      }

      if (keyword) {
        query = query.contains("keywords", [keyword]);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Article[];
    },
  });
};

export const useArticle = (id: string) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        // Increment views
        await supabase.rpc("increment_article_views", { article_id: id });
      }
      
      return data as Article | null;
    },
  });
};

export const useRelatedArticles = (currentArticleId: string, category: string, limit = 3) => {
  return useQuery({
    queryKey: ["relatedArticles", currentArticleId, category, limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("category", category)
        .neq("id", currentArticleId)
        .order("published_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Article[];
    },
  });
};
