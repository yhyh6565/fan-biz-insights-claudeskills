import { FileText, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryStatsProps {
  articles: Array<{
    category: "K-POP" | "MCU";
    likes: number;
  }>;
}

const CategoryStats = ({ articles }: CategoryStatsProps) => {
  const kpopArticles = articles.filter(a => a.category === "K-POP");
  const mcuArticles = articles.filter(a => a.category === "MCU");
  
  const kpopLikes = kpopArticles.reduce((sum, a) => sum + a.likes, 0);
  const mcuLikes = mcuArticles.reduce((sum, a) => sum + a.likes, 0);

  const stats = [
    {
      category: "K-POP",
      articleCount: kpopArticles.length,
      likes: kpopLikes,
      color: "kpop",
    },
    {
      category: "MCU",
      articleCount: mcuArticles.length,
      likes: mcuLikes,
      color: "mcu",
    },
  ];

  return (
    <div className="border-y bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.category}
                className={cn(
                  "flex flex-col gap-3 p-6 rounded-lg border-2 transition-all",
                  stat.color === "kpop"
                    ? "border-kpop-200 bg-kpop-50/50"
                    : "border-mcu-200 bg-mcu-50/50"
                )}
              >
                <h3
                  className={cn(
                    "text-lg font-bold",
                    stat.color === "kpop" ? "text-kpop-700" : "text-mcu-700"
                  )}
                >
                  {stat.category}
                </h3>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">{stat.articleCount}</span>
                    <span className="text-sm text-muted-foreground">개의 글</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">{stat.likes}</span>
                    <span className="text-sm text-muted-foreground">좋아요</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryStats;
