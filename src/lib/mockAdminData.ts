import type { OverviewData, KpiData, TrafficData, SourceData, KeywordData, ArticleStats } from "@/types/admin";

export const mockOverviewData: OverviewData = {
  topViews: {
    title: "K-POP 팬덤이 만드는 새로운 비즈니스 모델",
    count: 1234,
  },
  topShares: {
    title: "MCU의 마케팅 전략에서 배우는 팬덤 관리",
    count: 45,
  },
  topLikes: {
    title: "K-POP 팬덤이 만드는 새로운 비즈니스 모델",
    count: 89,
  },
  weeklyTraffic: [
    { date: "1/1", visitors: 120 },
    { date: "1/2", visitors: 150 },
    { date: "1/3", visitors: 180 },
    { date: "1/4", visitors: 140 },
    { date: "1/5", visitors: 200 },
    { date: "1/6", visitors: 170 },
    { date: "1/7", visitors: 190 },
  ],
};

export const mockKpiData: KpiData[] = [
  { label: "순방문자수 (UV)", value: 1234, unit: "명", change: 0 },
  { label: "페이지뷰 (PV)", value: 5678, unit: "회", change: 0 },
  { label: "평균 체류시간", value: 154, unit: "초", change: 0 },
  { label: "이탈률", value: 45.2, unit: "%", change: 0 },
];

export const mockTrafficData: TrafficData[] = [
  { date: "1/1", uv: 120, pv: 340 },
  { date: "1/2", uv: 150, pv: 420 },
  { date: "1/3", uv: 180, pv: 480 },
  { date: "1/4", uv: 140, pv: 380 },
  { date: "1/5", uv: 200, pv: 550 },
  { date: "1/6", uv: 170, pv: 460 },
  { date: "1/7", uv: 190, pv: 520 },
];

export const mockSourceData: SourceData[] = [
  { source: "직접 접속", visitors: 400, percentage: 40, fill: "hsl(var(--chart-1))" },
  { source: "검색 엔진", visitors: 300, percentage: 30, fill: "hsl(var(--chart-2))" },
  { source: "소셜 미디어", visitors: 200, percentage: 20, fill: "hsl(var(--chart-3))" },
  { source: "레퍼럴", visitors: 100, percentage: 10, fill: "hsl(var(--chart-4))" },
];

export const mockKeywordData: KeywordData[] = [
  { keyword: "K-POP 비즈니스", count: 150 },
  { keyword: "MCU 팬덤", count: 120 },
  { keyword: "팬덤 마케팅", count: 100 },
  { keyword: "콘텐츠 전략", count: 80 },
  { keyword: "엔터테인먼트", count: 60 },
];

export const mockArticles: ArticleStats[] = [
  {
    id: "1",
    title: "K-POP 팬덤이 만드는 새로운 비즈니스 모델",
    publishedAt: "2025-01-05",
    views: 1234,
    likes: 89,
    shares: 45,
    category: "K-POP",
  },
  {
    id: "2",
    title: "MCU의 마케팅 전략에서 배우는 팬덤 관리",
    publishedAt: "2025-01-03",
    views: 987,
    likes: 67,
    shares: 34,
    category: "MCU",
  },
  {
    id: "3",
    title: "팬덤 경제의 미래: 웹3와 NFT",
    publishedAt: "2025-01-01",
    views: 756,
    likes: 52,
    shares: 28,
    category: "K-POP",
  },
  {
    id: "4",
    title: "아이돌 그룹의 브랜딩 전략",
    publishedAt: "2024-12-28",
    views: 654,
    likes: 48,
    shares: 22,
    category: "K-POP",
  },
  {
    id: "5",
    title: "마블의 스토리텔링이 만드는 팬덤 충성도",
    publishedAt: "2024-12-25",
    views: 543,
    likes: 41,
    shares: 19,
    category: "MCU",
  },
];
