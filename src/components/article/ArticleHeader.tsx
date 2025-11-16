import { Heart, Share2, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Article } from "@/hooks/useArticles";

interface ArticleHeaderProps {
  article: Article;
  localLikes: number;
  isLiked: boolean;
  onLike: () => void;
  onShare: () => void;
}

export const ArticleHeader = ({
  article,
  localLikes,
  isLiked,
  onLike,
  onShare,
}: ArticleHeaderProps) => {
  return (
    <header className="mb-16">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Mobile: Image First */}
        {article.hero_image && (
          <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full rounded-lg overflow-hidden lg:order-2">
            <img
              src={article.hero_image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="space-y-6 lg:order-1">
          <Badge
            variant="secondary"
            className={cn(
              "font-medium",
              article.category === "K-POP"
                ? "bg-kpop-100 text-kpop-700 hover:bg-kpop-200"
                : "bg-mcu-100 text-mcu-700 hover:bg-mcu-200"
            )}
          >
            {article.category}
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight lg:leading-relaxed">
            {article.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {article.summary}
          </p>

          <div className="flex items-center gap-4 pt-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={article.author_avatar} />
              <AvatarFallback>YD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">By {article.author_name}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(article.published_at).toLocaleDateString('ko-KR')}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {article.views.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button
              variant="outline"
              size="lg"
              onClick={onLike}
              className={cn(
                "gap-2",
                isLiked && "bg-red-50 border-red-300 text-red-600 hover:bg-red-100"
              )}
            >
              <Heart className={cn("h-5 w-5", isLiked && "fill-red-600")} />
              {localLikes}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onShare}
              className="gap-2"
            >
              <Share2 className="h-5 w-5" />
              공유
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
