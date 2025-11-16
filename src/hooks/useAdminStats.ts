import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OverviewData, KpiData, TrafficData, SourceData, KeywordData, ArticleStats } from "@/types/admin";

export const useAdminStats = () => {
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [kpiData, setKpiData] = useState<KpiData[]>([]);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [sourceData, setSourceData] = useState<SourceData[]>([]);
  const [keywordData, setKeywordData] = useState<KeywordData[]>([]);
  const [articles, setArticles] = useState<ArticleStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllStats();
  }, []);

  const fetchAllStats = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchOverviewData(),
        fetchKpiData(),
        fetchTrafficData(),
        fetchSourceData(),
        fetchKeywordData(),
        fetchArticles(),
      ]);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOverviewData = async () => {
    try {
      // Get today's date for comparison
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Fetch all articles
      const { data: allArticles, error: articlesError } = await supabase
        .from("articles")
        .select("id, title, views, shares, likes, published_at")
        .order("published_at", { ascending: false });

      if (articlesError) throw articlesError;

      // Find top articles by views, shares, likes
      const topByViews = allArticles?.reduce((max, article) => 
        article.views > (max?.views || 0) ? article : max
      , allArticles[0]);

      const topByShares = allArticles?.reduce((max, article) => 
        article.shares > (max?.shares || 0) ? article : max
      , allArticles[0]);

      const topByLikes = allArticles?.reduce((max, article) => 
        article.likes > (max?.likes || 0) ? article : max
      , allArticles[0]);

      // Fetch last 7 days analytics
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { data: analyticsData, error: analyticsError } = await supabase
        .from("analytics")
        .select("date, unique_visitors")
        .gte("date", sevenDaysAgo.toISOString().split('T')[0])
        .order("date", { ascending: true });

      if (analyticsError) throw analyticsError;

      // Format weekly traffic data
      const weeklyTraffic = (analyticsData || []).map(item => ({
        date: item.date,
        visitors: item.unique_visitors,
      }));

      setOverviewData({
        topViews: {
          title: topByViews?.title || "No articles yet",
          count: topByViews?.views || 0,
        },
        topShares: {
          title: topByShares?.title || "No articles yet",
          count: topByShares?.shares || 0,
        },
        topLikes: {
          title: topByLikes?.title || "No articles yet",
          count: topByLikes?.likes || 0,
        },
        weeklyTraffic,
      });
    } catch (error) {
      console.error("Error fetching overview data:", error);
    }
  };

  const fetchKpiData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from("analytics")
        .select("*")
        .eq("date", today)
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        setKpiData([
          {
            label: "순방문자수 (UV)",
            value: data.unique_visitors,
            unit: "명",
            change: 0, // Could calculate from yesterday's data
          },
          {
            label: "페이지뷰 (PV)",
            value: data.page_views,
            unit: "회",
            change: 0,
          },
          {
            label: "평균 체류시간",
            value: Math.floor(data.avg_time_seconds / 60),
            unit: "분",
            change: 0,
          },
          {
            label: "이탈률",
            value: Number(data.bounce_rate),
            unit: "%",
            change: 0,
          },
        ]);
      } else {
        // No data for today, set defaults
        setKpiData([
          { label: "순방문자수 (UV)", value: 0, unit: "명", change: 0 },
          { label: "페이지뷰 (PV)", value: 0, unit: "회", change: 0 },
          { label: "평균 체류시간", value: 0, unit: "분", change: 0 },
          { label: "이탈률", value: 0, unit: "%", change: 0 },
        ]);
      }
    } catch (error) {
      console.error("Error fetching KPI data:", error);
    }
  };

  const fetchTrafficData = async () => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data, error } = await supabase
        .from("analytics")
        .select("date, unique_visitors, page_views")
        .gte("date", thirtyDaysAgo.toISOString().split('T')[0])
        .order("date", { ascending: true });

      if (error) throw error;

      setTrafficData((data || []).map(item => ({
        date: item.date,
        uv: item.unique_visitors,
        pv: item.page_views,
      })));
    } catch (error) {
      console.error("Error fetching traffic data:", error);
    }
  };

  const fetchSourceData = async () => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data, error } = await supabase
        .from("traffic_sources")
        .select("source, visitors")
        .gte("date", thirtyDaysAgo.toISOString().split('T')[0]);

      if (error) throw error;

      // Aggregate by source
      const sourceMap = new Map<string, number>();
      (data || []).forEach(item => {
        const current = sourceMap.get(item.source) || 0;
        sourceMap.set(item.source, current + item.visitors);
      });

      const total = Array.from(sourceMap.values()).reduce((sum, val) => sum + val, 0);

      setSourceData(
        Array.from(sourceMap.entries()).map(([source, visitors]) => ({
          source,
          visitors,
          percentage: total > 0 ? (visitors / total) * 100 : 0,
          fill: `var(--color-${source.toLowerCase().replace(/\s+/g, '-')})`,
        }))
      );
    } catch (error) {
      console.error("Error fetching source data:", error);
    }
  };

  const fetchKeywordData = async () => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data, error } = await supabase
        .from("search_keywords")
        .select("keyword, count")
        .gte("date", thirtyDaysAgo.toISOString().split('T')[0]);

      if (error) throw error;

      // Aggregate by keyword
      const keywordMap = new Map<string, number>();
      (data || []).forEach(item => {
        const current = keywordMap.get(item.keyword) || 0;
        keywordMap.set(item.keyword, current + item.count);
      });

      setKeywordData(
        Array.from(keywordMap.entries())
          .map(([keyword, count]) => ({ keyword, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10) // Top 10 keywords
      );
    } catch (error) {
      console.error("Error fetching keyword data:", error);
    }
  };

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, published_at, views, likes, shares, category")
        .order("published_at", { ascending: false });

      if (error) throw error;

      setArticles((data || []).map(article => ({
        id: article.id,
        title: article.title,
        publishedAt: article.published_at,
        views: article.views,
        likes: article.likes,
        shares: article.shares,
        category: article.category,
      })));
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  return {
    overviewData,
    kpiData,
    trafficData,
    sourceData,
    keywordData,
    articles,
    loading,
    refetch: fetchAllStats,
  };
};
