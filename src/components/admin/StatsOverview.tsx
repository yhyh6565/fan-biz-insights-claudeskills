import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Heart, Share2 } from "lucide-react";
import { Area, AreaChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { OverviewData } from "@/types/admin";

interface StatsOverviewProps {
  data: OverviewData;
}

export function StatsOverview({ data }: StatsOverviewProps) {
  const { topViews, topShares, topLikes, weeklyTraffic } = data;

  const chartConfig = {
    visitors: {
      label: "방문자",
      color: "hsl(var(--chart-1))",
    },
  };

  const truncateTitle = (title: string, maxLength: number = 30) => {
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
  };

  return (
    <div className="mb-8 p-6 bg-muted/30 rounded-lg border">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* 조회수 1등 */}
        <Card className="p-4">
          <CardHeader className="p-0 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm font-medium">조회수 1등</CardTitle>
              </div>
              <p className="text-lg font-bold">{topViews.count.toLocaleString()}</p>
            </div>
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-sm font-medium truncate" title={topViews.title}>
              {truncateTitle(topViews.title)}
            </div>
          </CardContent>
        </Card>

        {/* 공유수 1등 */}
        <Card className="p-4">
          <CardHeader className="p-0 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm font-medium">공유수 1등</CardTitle>
              </div>
              <p className="text-lg font-bold">{topShares.count.toLocaleString()}</p>
            </div>
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-sm font-medium truncate" title={topShares.title}>
              {truncateTitle(topShares.title)}
            </div>
          </CardContent>
        </Card>

        {/* 좋아요수 1등 */}
        <Card className="p-4">
          <CardHeader className="p-0 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm font-medium">좋아요 1등</CardTitle>
              </div>
              <p className="text-lg font-bold">{topLikes.count.toLocaleString()}</p>
            </div>
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-sm font-medium truncate" title={topLikes.title}>
              {truncateTitle(topLikes.title)}
            </div>
          </CardContent>
        </Card>

        {/* 최근 7일 트래픽 추이 */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">최근 7일 트래픽 추이</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[80px]">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <AreaChart data={weeklyTraffic}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="hsl(var(--chart-1))"
                    fillOpacity={1}
                    fill="url(#colorVisitors)"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
