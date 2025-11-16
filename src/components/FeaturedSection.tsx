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
import { cn } from "@/lib/utils";

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
 * CYBER-POP FEATURED SECTION
 *
 * Bold, energetic design with:
 * - MAXIMUM saturation colors
 * - Sharp geometric shapes
 * - Dramatic hover transforms
 * - Zero border radius (brutalist)
 *
 * @component
 */
const FeaturedSection = ({ articles }: FeaturedSectionProps) => {
  return (
    <section className="w-full py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* BOLD SECTION HEADER */}
          <div className="mb-8 border-b-4 border-foreground pb-4">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-foreground">
              // FEATURED_ARTICLES.tsx
            </h2>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 6000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {articles.map((article, index) => (
                <CarouselItem key={article.id}>
                  <Link to={`/article/${article.id}`} className="block">
                    <Card className="border-4 border-foreground shadow-none overflow-hidden hover-pop group bg-card relative">
                      <CardContent className="p-0">
                        {/* Image with CYBER overlay */}
                        <div className="relative aspect-[3/1] overflow-hidden bg-muted cyber-img">
                          <img
                            src={article.thumbnail || "/placeholder.svg"}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />

                          {/* BOLD color overlay based on category */}
                          <div
                            className={cn(
                              "absolute inset-0 mix-blend-multiply opacity-30 group-hover:opacity-50 transition-opacity duration-300",
                              article.category === "K-POP" ? "bg-kpop-500" : "bg-mcu-500"
                            )}
                          />

                          {/* Content overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-foreground/90">
                            {/* Category badge - NEON */}
                            <Badge
                              className={cn(
                                "border-4 text-sm font-bold tracking-wider uppercase px-4 py-1.5 mb-2 hover-skew",
                                article.category === "K-POP"
                                  ? "bg-kpop-500 text-white border-kpop-700 neon-glow"
                                  : "bg-mcu-500 text-white border-mcu-700 neon-glow-blue"
                              )}
                            >
                              {article.category}
                            </Badge>

                            {/* Title - MASSIVE and BOLD */}
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-2 leading-tight text-background uppercase tracking-tight">
                              {article.title}
                            </h3>

                            {/* Summary */}
                            <p className="text-sm md:text-base mb-2 text-background/90 leading-relaxed max-w-3xl">
                              {article.summary}
                            </p>

                            {/* Meta info - MONOSPACE */}
                            <div className="flex items-center gap-6 text-xs text-background/80 font-mono font-bold">
                              <span className="flex items-center gap-2">
                                <Eye className="h-4 w-4" strokeWidth={3} />
                                {article.views.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-2">
                                <Heart className="h-4 w-4" strokeWidth={3} />
                                {article.likes}
                              </span>
                            </div>
                          </div>

                          {/* BOLD CORNER ACCENT */}
                          <div
                            className={cn(
                              "absolute top-0 right-0 w-24 h-24",
                              article.category === "K-POP" ? "bg-kpop-500" : "bg-mcu-500"
                            )}
                            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* BOLD navigation controls */}
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="relative left-0 translate-y-0 bg-foreground hover:bg-primary border-4 border-foreground hover:border-primary text-background h-12 w-12" />
              <CarouselNext className="relative right-0 translate-y-0 bg-foreground hover:bg-primary border-4 border-foreground hover:border-primary text-background h-12 w-12" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
