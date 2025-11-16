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
 * Featured Articles Carousel Component
 *
 * Displays top articles in an auto-playing carousel with:
 * - Hero-style layout with image overlays
 * - Category badges (K-POP/MCU themed)
 * - View/like statistics
 * - Smooth hover interactions
 * - Auto-play every 5 seconds
 *
 * @component
 * @param {FeaturedSectionProps} props - Component props
 * @param {Article[]} props.articles - Array of featured articles to display
 */
const FeaturedSection = ({ articles }: FeaturedSectionProps) => {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 font-display tracking-tight">
            Featured
          </h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {articles.map((article) => (
                <CarouselItem key={article.id}>
                  <Link to={`/article/${article.id}`}>
                    <Card className="border-0 shadow-elegant overflow-hidden hover:shadow-dramatic transition-smooth group">
                      <CardContent className="p-0">
                        <div className="relative aspect-[2.5/1]">
                          <img
                            src={article.thumbnail || "/placeholder.svg"}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                            <Badge
                              className={
                                article.category === "K-POP"
                                  ? "bg-kpop-600 hover:bg-kpop-700 text-white mb-4 font-semibold tracking-wide"
                                  : "bg-mcu-600 hover:bg-mcu-700 text-white mb-4 font-semibold tracking-wide"
                              }
                            >
                              {article.category}
                            </Badge>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight font-display tracking-tight group-hover:text-white/95 transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-base md:text-lg mb-5 text-white/90 line-clamp-2 leading-relaxed max-w-3xl">
                              {article.summary}
                            </p>
                            <div className="flex items-center gap-5 text-sm text-white/80 font-medium">
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
            <CarouselPrevious className="left-4 bg-white/10 hover:bg-white/20 border-white/20 text-white transition-smooth" />
            <CarouselNext className="right-4 bg-white/10 hover:bg-white/20 border-white/20 text-white transition-smooth" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
