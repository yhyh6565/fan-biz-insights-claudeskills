import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  id: string;
  title: string;
  summary: string;
  category: "K-POP" | "MCU";
  date: string;
  views: number;
  likes: number;
  keywords?: string[];
  thumbnail?: string;
}

const ArticleCard = ({ id, title, summary, category, date, views, likes, keywords = [], thumbnail }: ArticleCardProps) => {
  return (
    <Link to={`/article/${id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="flex gap-6 p-6">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 rounded-lg overflow-hidden bg-muted">
              {thumbnail ? (
                <img 
                  src={thumbnail} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={cn(
                  "w-full h-full flex items-center justify-center text-4xl font-bold",
                  category === "K-POP" ? "bg-kpop-100 text-kpop-600" : "bg-mcu-100 text-mcu-600"
                )}>
                  {category === "K-POP" ? "K" : "M"}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Category Badge */}
            <Badge
              variant="secondary"
              className={cn(
                "w-fit font-medium",
                category === "K-POP"
                  ? "bg-kpop-100 text-kpop-700 hover:bg-kpop-200"
                  : "bg-mcu-100 text-mcu-700 hover:bg-mcu-200"
              )}
            >
              {category}
            </Badge>

            {/* Title */}
            <h3 className={cn(
              "text-2xl font-bold leading-tight line-clamp-2",
              category === "K-POP" ? "text-kpop-700" : "text-mcu-700"
            )}>
              {title}
            </h3>

            {/* Keywords */}
            {keywords.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className={cn(
                      "text-xs px-3 py-1 rounded-full border font-medium transition-colors",
                      category === "K-POP"
                        ? "border-kpop-300 text-kpop-700 hover:bg-kpop-50"
                        : "border-mcu-300 text-mcu-700 hover:bg-mcu-50"
                    )}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}

            {/* Summary */}
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
              {summary}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {date}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {likes}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ArticleCard;
