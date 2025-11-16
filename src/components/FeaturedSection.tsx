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
 * Featured Articles Carousel Component - Magazine Cover Style
 *
 * Editorial magazine-inspired hero section featuring:
 * - Large, bold typography with Cormorant Garamond
 * - Asymmetric layout with dramatic imagery
 * - Elegant overlay effects
 * - Sophisticated animations
 * - Full-bleed images with editorial text positioning
 *
 * @component
 * @param {FeaturedSectionProps} props - Component props
 * @param {Article[]} props.articles - Array of featured articles to display
 */
const FeaturedSection = ({ articles }: FeaturedSectionProps) => {
  return (
    <section className="w-full pt-8 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Magazine-style section header */}
          <div className="mb-12 border-b border-border/30 pb-4">
            <h2 className="text-sm font-semibold tracking-[0.3em] uppercase text-muted-foreground">
              Featured Stories
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
                  <Link to={`/article/${article.id}`}>
                    <Card className="border-0 shadow-none overflow-hidden group cursor-pointer">
                      <CardContent className="p-0">
                        <div className="relative h-[75vh] min-h-[600px]">
                          {/* Full-bleed hero image */}
                          <div className="absolute inset-0 overflow-hidden">
                            <img
                              src={article.thumbnail || "/placeholder.svg"}
                              alt={article.title}
                              className="w-full h-full object-cover transition-all duration-[1.5s] ease-out group-hover:scale-105"
                            />
                            {/* Sophisticated gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/35 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                          </div>

                          {/* Editorial content overlay */}
                          <div className="relative h-full flex flex-col justify-end p-8 md:p-16 lg:p-20">
                            {/* Issue number / Category */}
                            <div className="mb-6">
                              <Badge
                                className={
                                  article.category === "K-POP"
                                    ? "bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 mb-4 font-medium tracking-wider text-xs uppercase px-4 py-1.5"
                                    : "bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 mb-4 font-medium tracking-wider text-xs uppercase px-4 py-1.5"
                                }
                              >
                                {article.category}
                              </Badge>
                            </div>

                            {/* Magazine-style headline */}
                            <h3 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-6 leading-[0.95] text-white max-w-5xl tracking-tight overlay-text">
                              {article.title}
                            </h3>

                            {/* Deck / Summary */}
                            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed max-w-3xl font-light overlay-text">
                              {article.summary}
                            </p>

                            {/* Byline and meta */}
                            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-white/80">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                                  <img
                                    src={article.author_avatar}
                                    alt={article.author_name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span className="font-medium text-sm tracking-wide">
                                  BY {article.author_name.toUpperCase()}
                                </span>
                              </div>

                              <div className="flex items-center gap-6 text-sm font-medium">
                                <span className="flex items-center gap-2">
                                  <Eye className="h-4 w-4" />
                                  {article.views.toLocaleString()}
                                </span>
                                <span className="flex items-center gap-2">
                                  <Heart className="h-4 w-4" />
                                  {article.likes}
                                </span>
                              </div>
                            </div>

                            {/* Read more indicator */}
                            <div className="mt-8 inline-flex items-center gap-2 text-white/90 text-sm font-medium tracking-wide group-hover:gap-4 transition-all">
                              <span className="uppercase">Read Story</span>
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Article number - editorial detail */}
                          <div className="absolute top-8 right-8 md:top-16 md:right-16">
                            <span className="text-white/30 font-display text-8xl md:text-9xl font-light leading-none">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Minimal navigation controls */}
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="relative left-0 translate-y-0 bg-primary/90 hover:bg-primary border-0 text-primary-foreground h-12 w-12" />
              <CarouselNext className="relative right-0 translate-y-0 bg-primary/90 hover:bg-primary border-0 text-primary-foreground h-12 w-12" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
