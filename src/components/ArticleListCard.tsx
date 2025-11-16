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
 * NEO-BRUTALIST ARTICLE CARD
 *
 * Bold asymmetric design with:
 * - THICK borders (4px solid)
 * - Vibrant category colors
 * - Sharp geometric shapes
 * - Dramatic hover transforms
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
      <article className="group mb-8">
        <Card className="border-4 border-foreground shadow-none bg-card p-0 overflow-hidden hover-pop">
          <div className="grid md:grid-cols-12 gap-0">
            {/* Image Column - 5 columns */}
            <div className="md:col-span-5 order-1 relative">
              <div className="aspect-[4/3] md:aspect-[4/5] overflow-hidden relative cyber-img">
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-full h-full object-cover"
                />

                {/* BOLD color overlay */}
                <div
                  className={cn(
                    "absolute inset-0 mix-blend-multiply opacity-0 group-hover:opacity-40 transition-opacity duration-300",
                    category === "K-POP" ? "bg-kpop-500" : "bg-mcu-500"
                  )}
                />

                {/* Category badge on image */}
                <div className="absolute top-4 left-4">
                  <Badge
                    className={cn(
                      "border-4 text-xs font-bold tracking-wider uppercase px-3 py-1",
                      category === "K-POP"
                        ? "bg-kpop-500 text-white border-kpop-700"
                        : "bg-mcu-500 text-white border-mcu-700"
                    )}
                  >
                    {category}
                  </Badge>
                </div>

                {/* GEOMETRIC ACCENT */}
                <div
                  className={cn(
                    "absolute bottom-0 right-0 w-16 h-16",
                    category === "K-POP" ? "bg-kpop-500" : "bg-mcu-500"
                  )}
                  style={{ clipPath: "polygon(100% 100%, 100% 0, 0 100%)" }}
                />
              </div>
            </div>

            {/* Content Column - 7 columns */}
            <div className="md:col-span-7 order-2 p-6 md:p-8 flex flex-col justify-center space-y-4 bg-background">
              {/* Metadata - MONOSPACE */}
              <div className="flex items-center gap-3 text-xs font-mono font-bold text-muted-foreground uppercase">
                <span>{date}</span>
                <span className="text-foreground/30">|</span>
                <span>{author.name}</span>
              </div>

              {/* Title - LARGE IMPACT with chunky underline */}
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold leading-tight uppercase chunky-underline">
                {title}
              </h3>

              {/* Summary */}
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed line-clamp-3">
                {summary}
              </p>

              {/* Keywords - PILL SHAPE with bold borders */}
              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {keywords.slice(0, 3).map((keyword) => (
                    <span
                      key={keyword}
                      className="text-xs px-3 py-1.5 border-2 border-foreground bg-muted font-bold uppercase tracking-wide"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer stats - BOLD ICONS */}
              <div className="flex items-center gap-6 pt-4 border-t-2 border-foreground/20">
                <span className="flex items-center gap-2 text-sm font-mono font-bold">
                  <Eye className="h-4 w-4" strokeWidth={3} />
                  {views.toLocaleString()}
                </span>
                <span className="flex items-center gap-2 text-sm font-mono font-bold">
                  <Heart className="h-4 w-4" strokeWidth={3} />
                  {likes}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </article>
    </Link>
  );
};

export default ArticleListCard;
