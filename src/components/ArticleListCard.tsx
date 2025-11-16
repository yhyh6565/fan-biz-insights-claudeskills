import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Eye, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Props for the ArticleListCard component
 */
interface ArticleListCardProps {
  id: string;
  title: string;
  summary: string;
  category: "K-POP" | "MCU";
  date: string;
  views: number;
  likes: number;
  keywords: string[];
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
  };
}

/**
 * Article List Card - Modern Web Magazine Style
 *
 * Clean, content-focused design inspired by Medium and Brunch
 * - Optimal readability with Pretendard Variable
 * - Smooth hover interactions
 * - Clear visual hierarchy
 * - Responsive layout
 *
 * @component
 */
const ArticleListCard = ({
  id,
  title,
  summary,
  category,
  date,
  views,
  likes,
  keywords,
  thumbnail,
  author,
}: ArticleListCardProps) => {
  return (
    <Link to={`/article/${id}`} className="block">
      <article className="group">
        <Card className="border-0 border-b border-border/40 rounded-none shadow-none hover:shadow-none bg-transparent p-0 pb-8 md:pb-12">
          <div className="grid md:grid-cols-12 gap-6 md:gap-8">
            {/* Content Column - 7 columns */}
            <div className="md:col-span-7 order-2 md:order-1 flex flex-col justify-center space-y-4">
              {/* Metadata */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-[10px] font-medium tracking-wider uppercase px-2.5 py-0.5",
                    category === "K-POP"
                      ? "bg-kpop-100 text-kpop-700 hover:bg-kpop-200"
                      : "bg-mcu-100 text-mcu-700 hover:bg-mcu-200"
                  )}
                >
                  {category}
                </Badge>
                <span>{date}</span>
              </div>

              {/* Title - Large and readable */}
              <h3 className="text-2xl md:text-3xl font-bold leading-tight hover-underline inline-block group-hover:text-primary/90 transition-colors">
                {title}
              </h3>

              {/* Summary */}
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed line-clamp-2">
                {summary}
              </p>

              {/* Keywords */}
              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {keywords.slice(0, 3).map((keyword) => (
                    <span
                      key={keyword}
                      className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer - Author and stats */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {author.name}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5" />
                    {views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Heart className="h-3.5 w-3.5" />
                    {likes}
                  </span>
                </div>
              </div>
            </div>

            {/* Image Column - 5 columns */}
            <div className="md:col-span-5 order-1 md:order-2">
              <div className="aspect-[16/10] md:aspect-[4/3] overflow-hidden rounded-lg img-container">
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Card>
      </article>
    </Link>
  );
};

export default ArticleListCard;
