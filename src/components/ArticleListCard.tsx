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
 * Article List Card Component - Editorial Magazine Style
 *
 * A sophisticated magazine-style card featuring:
 * - Asymmetric, editorial layout
 * - Large, bold typography
 * - Elegant hover interactions
 * - Magazine-inspired spacing and details
 * - Category-specific accent colors
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
      <article className="group cursor-pointer">
        <Card className="border-0 shadow-none hover:shadow-none bg-transparent p-0 overflow-hidden">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 pb-12 border-b border-border/40 group-hover:border-border/60 transition-all duration-500">
            {/* Image Column - 2/5 width */}
            <div className="md:col-span-2 relative overflow-hidden">
              <div className="aspect-[4/5] relative">
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />

                {/* Category badge overlay */}
                <div className="absolute top-4 left-4">
                  <Badge
                    className={cn(
                      "text-xs font-semibold tracking-wider uppercase px-3 py-1.5 backdrop-blur-sm border transition-all duration-300",
                      category === "K-POP"
                        ? "bg-kpop-600/90 text-white border-kpop-400/50 hover:bg-kpop-700"
                        : "bg-mcu-600/90 text-white border-mcu-400/50 hover:bg-mcu-700"
                    )}
                  >
                    {category}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Content Column - 3/5 width */}
            <div className="md:col-span-3 flex flex-col justify-center space-y-6">
              {/* Eyebrow - Date */}
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  {date}
                </span>
                <span className="text-muted-foreground/50">•</span>
                <span className="text-xs text-muted-foreground font-medium">
                  By {author.name}
                </span>
              </div>

              {/* Headline - Large, editorial typography */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-[1.1] tracking-tight group-hover:text-primary/90 transition-colors duration-300 decorative-underline">
                {title}
              </h3>

              {/* Deck - Summary */}
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed line-clamp-3 max-w-2xl">
                {summary}
              </p>

              {/* Keywords */}
              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {keywords.slice(0, 4).map((keyword) => (
                    <span
                      key={keyword}
                      className="text-xs px-3 py-1.5 rounded-sm bg-accent/50 text-foreground/70 border border-border/50 font-medium hover:bg-accent transition-colors"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta Info - Views & Likes */}
              <div className="flex items-center gap-6 pt-4">
                <span className="flex items-center gap-2 text-sm text-muted-foreground font-medium group-hover:text-foreground/80 transition-colors">
                  <Eye className="h-4 w-4" />
                  {views.toLocaleString()}
                </span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground font-medium group-hover:text-foreground/80 transition-colors">
                  <Heart className="h-4 w-4" />
                  {likes}
                </span>
              </div>

              {/* Read more link */}
              <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-foreground/70 group-hover:text-foreground group-hover:gap-4 transition-all">
                <span>Read Article</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Card>
      </article>
    </Link>
  );
};

export default ArticleListCard;
