import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Eye, Heart, Calendar } from "lucide-react";
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
 * Article List Card Component
 *
 * A horizontal card layout for displaying article previews in list format.
 *
 * Features:
 * - Horizontal layout with thumbnail and content
 * - Category-specific theming (K-POP pink / MCU blue)
 * - Hover interactions (shadow, scale, border color)
 * - Author information and metadata
 * - Keyword tags
 * - Responsive design (stacks vertically on mobile)
 *
 * @component
 * @param {ArticleListCardProps} props - Component props
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
    <Link to={`/article/${id}`}>
      <Card className="flex flex-col md:flex-row gap-6 p-6 hover:shadow-elegant transition-smooth group border-border/50 hover:border-primary/20 hover:bg-accent/30">
        {/* Thumbnail */}
        <div className="flex-shrink-0 overflow-hidden rounded-xl">
          <img
            src={thumbnail}
            alt={title}
            className="w-full md:w-56 h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Category Badge */}
          <Badge
            variant="secondary"
            className={cn(
              "w-fit text-xs font-semibold tracking-wide transition-smooth",
              category === "K-POP"
                ? "bg-kpop-100 text-kpop-700 group-hover:bg-kpop-200"
                : "bg-mcu-100 text-mcu-700 group-hover:bg-mcu-200"
            )}
          >
            {category}
          </Badge>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold line-clamp-2 group-hover:text-primary transition-smooth font-display leading-tight tracking-tight">
            {title}
          </h3>

          {/* Author & Date */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="font-semibold">By {author.name}</span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {date}
            </span>
          </div>

          {/* Summary */}
          <p className="text-base text-muted-foreground line-clamp-2 leading-relaxed">
            {summary}
          </p>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mt-2">
            {keywords.slice(0, 3).map((keyword) => (
              <span
                key={keyword}
                className="text-xs px-3 py-1.5 rounded-full bg-muted/50 text-muted-foreground border border-border/50 font-medium transition-smooth group-hover:border-border"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-5 text-sm text-muted-foreground mt-auto pt-3 border-t border-border/30">
            <span className="flex items-center gap-1.5 font-medium">
              <Eye className="h-4 w-4" />
              {views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Heart className="h-4 w-4" />
              {likes}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ArticleListCard;
