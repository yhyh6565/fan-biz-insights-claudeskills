import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

/**
 * Article data structure
 */
interface Article {
  id: string;
  title: string;
  summary: string;
  category: "K-POP" | "MCU";
  published_at: string;
  views: number;
  likes: number;
  keywords: string[];
  thumbnail: string | null;
  author_name: string;
  author_avatar: string;
}

interface FeaturedSectionProps {
  articles: Article[];
}

/**
 * Featured Articles Carousel - Modern Web Magazine Style
 *
 * Clean, readable design inspired by Medium and Brunch
 * - Optimized typography with Pretendard Variable
 * - Smooth 60fps animations
 * - Focus on content readability
 * - Minimal, elegant interactions
 *
 * @component
 */
const FeaturedSection = ({ articles }: FeaturedSectionProps) => {
  return (
    <section className="w-full py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header - Clean and minimal */}
          <div className="mb-12">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-8">
              Featured
            </h2>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 7000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {articles.map((article) => (
                <CarouselItem key={article.id}>
                  <Link to={`/article/${article.id}`} className="block">
                    <Card className="border border-border/50 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group bg-card">
                      <CardContent className="p-0">
                        {/* Image container with aspect ratio */}
                        <div className="relative aspect-[21/9] overflow-hidden bg-muted">
                          <img
                            src={article.thumbnail || "/placeholder.svg"}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Gradient overlay for text readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                          {/* Content overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                            {/* Category badge */}
                            <Badge
                              className={
                                article.category === "K-POP"
                                  ? "bg-kpop-600 hover:bg-kpop-700 text-white border-0 mb-4 text-xs font-medium tracking-wide"
                                  : "bg-mcu-600 hover:bg-mcu-700 text-white border-0 mb-4 text-xs font-medium tracking-wide"
                              }
                            >
                              {article.category}
                            </Badge>

                            {/* Title */}
                            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight text-white max-w-4xl">
                              {article.title}
                            </h3>

                            {/* Summary */}
                            <p className="text-base md:text-lg mb-4 text-white/90 leading-relaxed max-w-2xl line-clamp-2">
                              {article.summary}
                            </p>

                            {/* Meta info */}
                            <div className="flex items-center gap-4 text-sm text-white/80">
                              <span className="flex items-center gap-1.5">
                                <Eye className="h-4 w-4" />
                                {article.views.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Heart className="h-4 w-4" />
                                {article.likes}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation controls */}
            <div className="flex justify-center gap-3 mt-8">
              <CarouselPrevious className="relative left-0 translate-y-0 bg-primary hover:bg-primary/90 border-0 text-primary-foreground h-10 w-10" />
              <CarouselNext className="relative right-0 translate-y-0 bg-primary hover:bg-primary/90 border-0 text-primary-foreground h-10 w-10" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
