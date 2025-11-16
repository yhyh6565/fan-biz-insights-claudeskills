import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsOverview } from "./StatsOverview";
import { HomepageStats } from "./HomepageStats";
import { WritingsStats } from "./WritingsStats";
import { useAdminStats } from "@/hooks/useAdminStats";
import { Skeleton } from "@/components/ui/skeleton";

export const StatsDashboard = () => {
  const [activeTab, setActiveTab] = useState("homepage");
  const { overviewData, kpiData, trafficData, sourceData, keywordData, articles, loading } = useAdminStats();

  useEffect(() => {
    // Smooth scroll to top when tab changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {overviewData && <StatsOverview data={overviewData} />}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 sticky top-16 z-10 bg-background">
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="writings">Writings</TabsTrigger>
        </TabsList>
        <TabsContent value="homepage" className="space-y-6 mt-6">
          <HomepageStats 
            kpiData={kpiData}
            trafficData={trafficData}
            sourceData={sourceData}
            keywordData={keywordData}
          />
        </TabsContent>
        <TabsContent value="writings" className="space-y-6 mt-6">
          <WritingsStats articles={articles} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
