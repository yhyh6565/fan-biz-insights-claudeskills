import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { KpiData, TrafficData, SourceData, KeywordData } from "@/types/admin";

interface HomepageStatsProps {
  kpiData: KpiData[];
  trafficData: TrafficData[];
  sourceData: SourceData[];
  keywordData: KeywordData[];
}

export const HomepageStats = ({ kpiData, trafficData, sourceData, keywordData }: HomepageStatsProps) => {
  const [period, setPeriod] = useState("30days");

  const trafficChartConfig = {
    uv: {
      label: "순방문자수 (UV)",
      color: "hsl(var(--chart-1))",
    },
    pv: {
      label: "페이지뷰 (PV)",
      color: "hsl(var(--chart-2))",
    },
  };

  const sourceChartConfig = {
    visitors: {
      label: "방문자",
    },
  };

  const keywordChartConfig = {
    count: {
      label: "검색 횟수",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <div className="space-y-6">
      {/* 기간 선택 */}
      <div className="flex justify-end">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="기간 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">최근 7일</SelectItem>
            <SelectItem value="30days">최근 30일</SelectItem>
            <SelectItem value="90days">최근 90일</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI 요약 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpi.value.toLocaleString()}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  {kpi.unit}
                </span>
              </div>
              {kpi.change !== 0 && (
                <p className={`text-xs ${kpi.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.change > 0 ? '+' : ''}{kpi.change}% vs 어제
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 트래픽 추이 */}
      <Card>
        <CardHeader>
          <CardTitle>트래픽 추이</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={trafficChartConfig} className="h-[300px] w-full">
            <AreaChart data={trafficData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                dataKey="uv"
                type="monotone"
                fill="var(--color-uv)"
                fillOpacity={0.4}
                stroke="var(--color-uv)"
                strokeWidth={2}
              />
              <Area
                dataKey="pv"
                type="monotone"
                fill="var(--color-pv)"
                fillOpacity={0.4}
                stroke="var(--color-pv)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 유입 경로 분석 & 주요 검색 키워드 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>유입 경로 분석</CardTitle>
          </CardHeader>
          <CardContent>
          <ChartContainer config={sourceChartConfig} className="h-[300px] w-full">
            <PieChart>
              <Pie data={sourceData} dataKey="visitors" nameKey="source" cx="50%" cy="50%" innerRadius={60} outerRadius={100} label>
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>주요 검색 키워드</CardTitle>
          </CardHeader>
          <CardContent>
          <ChartContainer config={keywordChartConfig} className="h-[300px] w-full">
            <BarChart data={keywordData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="keyword"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
