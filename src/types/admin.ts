export interface Article {
  id: string;
  title: string;
  publishedAt: string;
  views: number;
  likes: number;
  shares: number;
  category: string;
}

export interface ArticleStats {
  id: string;
  title: string;
  publishedAt: string;
  views: number;
  likes: number;
  shares: number;
  category: string;
}

export interface TopArticle {
  title: string;
  date: string;
  count: number;
  previousTitle: string;
  previousDate: string;
}

export interface OverviewData {
  topViews: {
    title: string;
    count: number;
  };
  topShares: {
    title: string;
    count: number;
  };
  topLikes: {
    title: string;
    count: number;
  };
  weeklyTraffic: { date: string; visitors: number }[];
}

export interface KpiData {
  label: string;
  value: number;
  unit: string;
  change: number;
}

export interface TrafficData {
  date: string;
  uv: number;
  pv: number;
}

export interface SourceData {
  source: string;
  visitors: number;
  percentage: number;
  fill: string;
}

export interface KeywordData {
  keyword: string;
  count: number;
}
